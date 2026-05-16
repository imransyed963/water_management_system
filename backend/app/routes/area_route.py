from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.role_checker import admin_only

from app.models.area import Area
from app.schemas.area_schema import (
    AreaCreate,
    AreaResponse
)
from app.config.db import get_db

router = APIRouter()

@router.post("/areas")
def create_area(
    area: AreaCreate,
    admin = Depends(admin_only),
    db: Session = Depends(get_db)
):

    new_area = Area(
        name=area.name,
        district=area.district
    )

    db.add(new_area)
    db.commit()
    db.refresh(new_area)

    return {
        "message": "Area created successfully"
    }


@router.get(
    "/areas",
    response_model=list[AreaResponse]
)
def get_areas(
    db: Session = Depends(get_db)
):

    areas = db.query(Area).all()

    return areas