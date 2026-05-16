from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base

class Area(Base):

    __tablename__ = "areas"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(100),
        unique=True
    )

    district = Column(String(100))

    water_supply = relationship(
        "WaterSupply",
        back_populates="area"
    )

    maintenance = relationship(
        "Maintenance",
        back_populates="area"
    )