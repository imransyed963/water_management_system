from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)
from sqlalchemy.orm import relationship
from app.database import Base

class WaterSupply(Base):

    __tablename__ = "water_supply"

    id = Column(Integer, primary_key=True)

    area_id = Column(
        Integer,
        ForeignKey("areas.id")
    )

    water_type = Column(String(50))

    supply_time = Column(String(100))

    status = Column(String(50))

    area= relationship (
        "Area",
        back_populates="water_supply"
    )