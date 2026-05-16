from pydantic import BaseModel

class WaterSupplyCreate(BaseModel):

    area_id: int

    water_type: str

    supply_time: str

    status: str


class AreaBasic(BaseModel):

    id: int
    name: str
    district: str

    class Config:
        orm_mode = True    


class WaterSupplyResponse(BaseModel):

    id: int

    water_type: str

    supply_time: str

    status: str

    area:AreaBasic

    class Config:
        orm_mode = True



