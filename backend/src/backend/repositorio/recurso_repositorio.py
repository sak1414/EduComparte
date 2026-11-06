# src/backend/repositorio/recurso_repositorio.py
from src.backend.schemas.recurso import Recurso
from typing import List, Optional

class RecursoRepositorio:
    def __init__(self):
        # Lista privada (doble guión bajo) simulando base de datos
        self.__recursos_db: List[Recurso] = []
    
    def guardar(self, recurso: Recurso) -> Recurso:
        """Guarda un nuevo recurso en la 'base de datos'"""
        try:
            self.__recursos_db.append(recurso)
            return recurso
        except Exception as e:
            print(f"Error al guardar recurso: {e}")
            return None
    
    def obtener_todos(self) -> List[Recurso]:
        """Obtiene todos los recursos"""
        try:
            return self.__recursos_db
        except Exception as e:
            print(f"Error al obtener recursos: {e}")
            return []
    
    def obtener_por_id(self, id: int) -> Optional[Recurso]:
        """Obtiene un recurso por su ID"""
        try:
            for recurso in self.__recursos_db:
                if recurso.id == id:
                    return recurso
            return None
        except Exception as e:
            print(f"Error al obtener recurso por ID: {e}")
            return None
    
    def actualizar(self, id: int, recurso_actualizado: Recurso) -> Optional[Recurso]:
        """Actualiza un recurso existente usando enumerate (índice y valor)"""
        try:
            for i, recurso in enumerate(self.__recursos_db):
                if recurso.id == id:
                    self.__recursos_db[i] = recurso_actualizado
                    return recurso_actualizado
            return None
        except Exception as e:
            print(f"Error al actualizar recurso: {e}")
            return None
    
    def eliminar(self, id: int) -> bool:
        """Elimina un recurso usando pop (por índice)"""
        try:
            for i, recurso in enumerate(self.__recursos_db):
                if recurso.id == id:
                    self.__recursos_db.pop(i)
                    return True
            return False
        except Exception as e:
            print(f"Error al eliminar recurso: {e}")
            return False