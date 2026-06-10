from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.models.water_supply_model import WaterSupply
from app.auth.role_checker import admin_only

from app.schemas.water_supply_schema import (
    WaterSupplyCreate,
    WaterSupplyResponse
)

from app.config.db import get_db

router = APIRouter()


@router.post("/water-supply")
def create_water_supply(
    water: WaterSupplyCreate,
    admin = Depends(admin_only),
    db: Session = Depends(get_db)
):

    new_water = WaterSupply(
        area_id=water.area_id,
        water_type=water.water_type,
        supply_time=water.supply_time,
        status=water.status
    )

    db.add(new_water)

    db.commit()

    db.refresh(new_water)

    return {
        "message": f"Water updated added by admin {admin.name}"
    }


@router.get(
    "/water-supply",
    response_model=list[WaterSupplyResponse]
)

def get_water_supply(
    db: Session = Depends(get_db)
):

    water_data = db.query(
        WaterSupply
    ).all()

    return water_data


@router.delete("/water-supply/{id}")
def delete_water_supply(
    id: int,
    admin = Depends(admin_only),
    db: Session = Depends(get_db)
):

    water = db.query(
        WaterSupply
    ).filter(
        WaterSupply.id == id
    ).first()

    if not water:

        return {
            "message": "Record not found"
        }

    db.delete(water)

    db.commit()

    return {
        "message": "Water supply deleted"
    }

@router.put("/water-supply/{id}")
def update_water_supply(
    id: int,
    water: WaterSupplyCreate,
    admin = Depends(admin_only),
    db: Session = Depends(get_db)
):

    water_record = db.query(
        WaterSupply
    ).filter(
        WaterSupply.id == id
    ).first()

    if not water_record:

        return {
            "message": "Record not found"
        }

    water_record.area_id = water.area_id
    water_record.water_type = water.water_type
    water_record.supply_time = water.supply_time
    water_record.status = water.status

    db.commit()

    return {
        "message": "Water supply updated"
    }