# src/backend/services/auth_service.py
"""Servicio de autenticación.

- registrar: crea un nuevo usuario con contraseña hash.
- login: verifica credenciales y devuelve JWT.
"""

import os
import jwt
from datetime import datetime, timedelta
from argon2 import PasswordHasher
from pydantic import BaseModel
from typing import Optional

from src.backend.schemas.auth import UsuarioRegistro, UsuarioLogin, Token
from src.backend.repositorio.usuario_repositorio import UsuarioRepositorio

# Cargar secret key (hardcoded fallback)
SECRET_KEY = os.getenv("SECRET_KEY", "mi_secreto_de_prueba")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 día

ph = PasswordHasher()

class AuthService:
    def __init__(self):
        self._repositorio = UsuarioRepositorio()

    def _crear_token(self, data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    def registrar(self, registro: UsuarioRegistro) -> Optional[Token]:
        """Registra un nuevo usuario.
        - Verifica que el correo no exista.
        - Hash de la contraseña.
        - Inserta en la base y devuelve JWT.
        """
        # Verificar correo duplicado
        if self._repositorio.buscar_por_correo(registro.correo):
            raise ValueError("El correo ya está registrado")
        # Hash contraseña
        hashed = ph.hash(registro.contrasena)
        # Crear objeto sencillo para inserción
        class _UsuarioTmp(BaseModel):
            nombre: str
            correo: str
            contrasena: str
            universidad: str
            rol: str
            fecha_registro: datetime
        usuario_tmp = _UsuarioTmp(
            nombre=registro.nombre,
            correo=registro.correo,
            contrasena=hashed,
            universidad=registro.universidad,
            rol=registro.rol,
            fecha_registro=datetime.utcnow(),
        )
        user_id = self._repositorio.crear_usuario(usuario_tmp)
        if not user_id:
            raise RuntimeError("Error al crear el usuario")
        access_token = self._crear_token({"sub": registro.correo, "uid": user_id})
        return Token(access_token=access_token)

    def login(self, login: UsuarioLogin) -> Optional[Token]:
        """Valida credenciales y devuelve JWT.
        """
        fila = self._repositorio.buscar_por_correo(login.correo)
        if not fila:
            raise ValueError("Credenciales inválidas")
        hashed = fila["contrasena"]
        try:
            ph.verify(hashed, login.contrasena)
        except Exception:
            raise ValueError("Credenciales inválidas")
        access_token = self._crear_token({"sub": login.correo, "uid": fila["id"]})
        return Token(access_token=access_token)
