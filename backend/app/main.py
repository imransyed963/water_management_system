from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models.user import User
from app.routes.user_route import router as user_router
from app.models.area import Area
from app.routes.area_route import (router as area_router)
from app.models.water_supply_model import WaterSupply
from app.routes.water_supply_routes import (router as water_router)
from app.models.maintenance import Maintenance
from app.routes.maintenance_route import (router as maintenance_router)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(area_router)
app.include_router(water_router)
app.include_router(maintenance_router)

@app.get("/")
def home():
    return {"message": "Water Management API"}
