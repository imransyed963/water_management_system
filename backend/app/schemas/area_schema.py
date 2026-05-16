from pydantic import BaseModel

class AreaCreate(BaseModel):
    name: str
    district: str

class AreaResponse(BaseModel):
    id: int
    name: str
    district: str

    class Config:
        orm_mode = True