# src/backend/repositorio/usuario_repositorio.py
"""Repositorio para la tabla Usuarios en SQL Server.

- buscar_por_correo(correo) -> Optional[dict] (row as dict)
- crear_usuario(usuario) -> Optional[int] (id generado)
"""

import os
from contextlib import contextmanager
from pathlib import Path
from typing import Optional, Dict

import pyodbc
from dotenv import load_dotenv

# Reusar la estructura de conexión de RecursoRepositorio

class UsuarioRepositorio:
    def __init__(self) -> None:
        env_path = Path(__file__).resolve().parents[3] / ".env"
        load_dotenv(dotenv_path=env_path)
        driver = os.getenv("DB_DRIVER")
        server = os.getenv("DB_SERVER")
        database = os.getenv("DB_NAME")
        trusted = os.getenv("DB_TRUSTED", "yes")
        self._conn_str = (
            f"DRIVER={driver};"
            f"SERVER={server};"
            f"DATABASE={database};"
            f"Trusted_Connection={trusted};"
        )

    @contextmanager
    def _connect(self):
        conn = pyodbc.connect(self._conn_str)
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()

    def buscar_por_correo(self, correo: str) -> Optional[Dict]:
        """Devuelve la fila del usuario con el correo dado o None."""
        try:
            with self._connect() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT id, nombre, correo, contrasena, universidad, rol, fecha_registro FROM Usuarios WHERE correo = ?", (correo,))
                row = cursor.fetchone()
                if row:
                    columns = [c[0] for c in cursor.description]
                    return dict(zip(columns, row))
                return None
        except Exception as e:
            print(f"Error al buscar usuario por correo {correo}: {e}")
            return None

    def crear_usuario(self, usuario) -> Optional[int]:
        """Inserta un nuevo usuario y devuelve el id generado.
        `usuario` debe tener atributos: nombre, correo, contrasena (hashed), universidad, rol, fecha_registro.
        """
        try:
            with self._connect() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO Usuarios (nombre, correo, contrasena, universidad, rol, fecha_registro) "
                    "OUTPUT INSERTED.id VALUES (?, ?, ?, ?, ?, ?)",
                    (
                        usuario.nombre,
                        usuario.correo,
                        usuario.contrasena,
                        usuario.universidad,
                        usuario.rol,
                        usuario.fecha_registro,
                    ),
                )
                row = cursor.fetchone()
                return int(row[0]) if row else None
        except Exception as e:
            print(f"Error al crear usuario {usuario.correo}: {e}")
            return None
