from pydantic import BaseModel

class MaintenanceCreate(BaseModel):

    area_id: int

    issue: str

    status: str

    expected_completion: str


class AreaBasic(BaseModel):

    id: int
    name: str
    district: str

    class Config:
        orm_mode = True


class MaintenanceResponse(BaseModel):

    id: int

    issue: str

    status: str

    expected_completion: str

    area:AreaBasic

    class Config:
        orm_mode = True