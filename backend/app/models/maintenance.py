from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)
from sqlalchemy.orm import relationship
from app.database import Base

class Maintenance(Base):

    __tablename__ = "maintenance"

    id = Column(
        Integer,
        primary_key=True
    )

    area_id = Column(
        Integer,
        ForeignKey("areas.id")
    )

    issue = Column(String(255))

    status = Column(String(50))

    expected_completion = Column(
        String(100)
    )

    area = relationship(
        "Area",
        back_populates="maintenance"
    )

   