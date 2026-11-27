# src/backend/apis/auth_api.py
"""Endpoints de autenticación (registro y login).

- POST /api/auth/registro  -> crea usuario y devuelve JWT.
- POST /api/auth/login    -> valida credenciales y devuelve JWT.
"""

from fastapi import APIRouter, HTTPException, status
from src.backend.schemas.auth import UsuarioRegistro, UsuarioLogin, Token
from src.backend.services.auth_service import AuthService

router = APIRouter(prefix="/api/auth", tags=["Autenticación"])

_auth_service = AuthService()

@router.post("/registro", response_model=Token, status_code=status.HTTP_201_CREATED)
def registro(usuario: UsuarioRegistro):
    try:
        token = _auth_service.registrar(usuario)
        return token
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al registrar usuario")

@router.post("/login", response_model=Token)
def login(credenciales: UsuarioLogin):
    try:
        token = _auth_service.login(credenciales)
        return token
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error interno al iniciar sesión")
