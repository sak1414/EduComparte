# src/backend/schemas/auth.py
"""Pydantic schemas for authentication endpoints.

- UsuarioRegistro: datos necesarios para registrar un nuevo usuario.
- UsuarioLogin: credenciales para iniciar sesión.
- Token: respuesta que contiene el JWT generado.
"""

from pydantic import BaseModel, EmailStr
from datetime import datetime

class UsuarioRegistro(BaseModel):
    nombre: str
    correo: EmailStr
    contrasena: str
    universidad: str
    # Opcional: rol del usuario, por defecto 'estudiante'
    rol: str = "estudiante"

class UsuarioLogin(BaseModel):
    correo: EmailStr
    contrasena: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
