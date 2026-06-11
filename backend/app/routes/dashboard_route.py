from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.config.db import get_db
from app.models.user import User
from app.models.area import Area
from app.models.water_supply_model import WaterSupply
from app.models.maintenance import Maintenance

router = APIRouter(tags=["Dashboard"])


@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):

    total_users = db.query(User).count()

    total_areas = db.query(Area).count()

    total_water_supply = db.query(
        WaterSupply
    ).count()

    total_maintenance = db.query(
        Maintenance
    ).count()

    return {
        "users": total_users,
        "areas": total_areas,
        "water_supply": total_water_supply,
        "maintenance": total_maintenance
    }