from fastapi import APIRouter, Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.auth.hash_password import hash_password
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.config.db import get_db
from app.schemas.user_schema import UserLogin
from app.auth.hash_password import verify_password
from app.auth.jwt_handler import create_access_token
from app.schemas.user_schema import UserResponse
from fastapi import Security
from app.auth.auth_bearer import JWTBearer
from app.auth.current_user import get_current_user
from app.auth.role_checker import admin_only


router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        return {
            "message": "Email already registered"
        }

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }


@router.get("/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="Invalid email")

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(status_code=400, detail="Invalid password")

    token = create_access_token({"sub": existing_user.email,"role": existing_user.role})

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": existing_user.role
    }

@router.get("/profile")
def profile(current_user: User = Security(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }

@router.get("/admin-dashboard")
def admin_dashboard(admin_user: User = Depends(admin_only)):
    return {
        "message": f"Welcome, Admin!{admin_user.name}"
    }