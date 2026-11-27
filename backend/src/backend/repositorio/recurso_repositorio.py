# src/backend/repositorio/recurso_repositorio.py
"""Repositorio para acceder a la tabla Recursos en SQL Server."""

import os
from contextlib import contextmanager
from pathlib import Path
from typing import List, Optional

import pyodbc
from dotenv import load_dotenv

from src.backend.schemas.recurso import Recurso


COLUMNAS = (
    "id, titulo, universidad, asignatura, categoria, "
    "descripcion, url, autor, tipo"
)


class RecursoRepositorio:
    def __init__(self) -> None:
        """Carga la configuracion y prepara la cadena de conexion."""
        # recurso_repositorio.py -> repositorio -> backend -> src -> backend (raiz)
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
        """Abre una conexion, confirma al terminar bien, revierte si hay error
        y siempre la cierra."""
        conn = pyodbc.connect(self._conn_str)
        try:
            yield conn
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            conn.close()

    @staticmethod
    def _fila_a_recurso(row) -> Recurso:
        return Recurso(
            id=row.id,
            titulo=row.titulo,
            universidad=row.universidad,
            asignatura=row.asignatura,
            categoria=row.categoria,
            descripcion=row.descripcion,
            url=row.url,
            autor=row.autor,
            tipo=row.tipo,
        )

    def obtener_todos(self) -> List[Recurso]:
        """Devuelve todos los recursos."""
        try:
            with self._connect() as conn:
                cursor = conn.cursor()
                cursor.execute(f"SELECT {COLUMNAS} FROM Recursos")
                return [self._fila_a_recurso(row) for row in cursor.fetchall()]
        except Exception as e:
            print(f"Error al obtener todos los recursos: {e}")
            return []

    def obtener_por_id(self, id: int) -> Optional[Recurso]:
        """Obtiene un recurso por su id."""
        try:
            with self._connect() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    f"SELECT {COLUMNAS} FROM Recursos WHERE id = ?",
                    (id,),
                )
                row = cursor.fetchone()
                if not row:
                    return None
                return self._fila_a_recurso(row)
        except Exception as e:
            print(f"Error al obtener recurso por id {id}: {e}")
            return None

    def guardar(self, recurso: Recurso) -> Optional[Recurso]:
        """Inserta un recurso y devuelve el objeto con su ID generado."""
        try:
            with self._connect() as conn:
                cursor = conn.cursor()

                # OUTPUT INSERTED.id devuelve el ID en la misma sentencia,
                # sin depender de SCOPE_IDENTITY() en una segunda consulta.
                cursor.execute(
                    "INSERT INTO Recursos (titulo, universidad, asignatura, "
                    "categoria, descripcion, url, autor, tipo) "
                    "OUTPUT INSERTED.id "
                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    (
                        recurso.titulo,
                        recurso.universidad,
                        recurso.asignatura,
                        recurso.categoria,
                        recurso.descripcion,
                        recurso.url,
                        recurso.autor,
                        recurso.tipo,
                    ),
                )

                # Leer el ID antes de que se confirme la transaccion
                row = cursor.fetchone()
                recurso.id = int(row[0])
                print(f"Recurso guardado con ID: {recurso.id}")
                return recurso
        except Exception as e:
            print(f"Error al guardar recurso: {e}")
            return None

    def actualizar(self, id: int, recurso: Recurso) -> Optional[Recurso]:
        """Actualiza un recurso existente."""
        try:
            with self._connect() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "UPDATE Recursos SET titulo = ?, universidad = ?, "
                    "asignatura = ?, categoria = ?, descripcion = ?, "
                    "url = ?, autor = ?, tipo = ? "
                    "WHERE id = ?",
                    (
                        recurso.titulo,
                        recurso.universidad,
                        recurso.asignatura,
                        recurso.categoria,
                        recurso.descripcion,
                        recurso.url,
                        recurso.autor,
                        recurso.tipo,
                        id,
                    ),
                )
                if cursor.rowcount == 0:
                    return None
                recurso.id = id
                return recurso
        except Exception as e:
            print(f"Error al actualizar recurso id {id}: {e}")
            return None

    def eliminar(self, id: int) -> bool:
        """Elimina un recurso por id."""
        try:
            with self._connect() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM Recursos WHERE id = ?", (id,))
                return cursor.rowcount > 0
        except Exception as e:
            print(f"Error al eliminar recurso id {id}: {e}")
            return False