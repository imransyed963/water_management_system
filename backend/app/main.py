from fastapi import FastAPI

from app.database import engine, Base
from app.models.user import User
from app.routes.user_route import router as user_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user_router)

@app.get("/")
def home():
    return {"message": "Water Management API"}