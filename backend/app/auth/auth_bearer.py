from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer

from app.auth.jwt_handler import verify_access_token

class JWTBearer(HTTPBearer):

    async def __call__(self, request: Request):

        credentials = await super().__call__(request)

        token = credentials.credentials

        payload = verify_access_token(token)

        if not payload:
            raise HTTPException(
                status_code=403,
                detail="Invalid or expired token"
            )

        return payload