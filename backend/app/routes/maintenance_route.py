from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.models.maintenance import Maintenance

from app.schemas.maintenance_schema import (
    MaintenanceCreate,
    MaintenanceResponse
)

from app.config.db import get_db

from app.auth.role_checker import admin_only

router = APIRouter()


@router.post("/maintenance")
def create_maintenance(
    maintenance: MaintenanceCreate,
    admin = Depends(admin_only),
    db: Session = Depends(get_db)
):

    new_maintenance = Maintenance(
        area_id=maintenance.area_id,
        issue=maintenance.issue,
        status=maintenance.status,
        expected_completion=maintenance.expected_completion
    )

    db.add(new_maintenance)

    db.commit()

    db.refresh(new_maintenance)

    return {
        "message": f"Maintenance update added by {admin.name}"
    }


@router.get(
    "/maintenance",
    response_model=list[MaintenanceResponse]
)

def get_maintenance(
    db: Session = Depends(get_db)
):

    maintenance_data = db.query(
        Maintenance
    ).all()

    return maintenance_data