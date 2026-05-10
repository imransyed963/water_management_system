from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.auth.hash_password import hash_password
from app.models.user import User
from app.schemas.user_schema import UserCreate
from app.config.db import get_db
from app.schemas.user_schema import UserLogin
from app.auth.hash_password import verify_password
from app.auth.jwt_handler import create_access_token

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

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


@router.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(User).all()

    return users

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        return {
            "message": "Invalid email"
        }

    if not verify_password(
        user.password,
        existing_user.password
    ):
        return {
            "message": "Invalid password"
        }

    token = create_access_token({
        "sub": existing_user.email
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

