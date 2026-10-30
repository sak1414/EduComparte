
from typing import List, Optional
from src.backend.schemas.recurso import Recurso, RecursoCreate  # <-- Corregido

class RecursoService:
    def __init__(self):
        self.__recurso_db: List[Recurso] = [
            Recurso(
                id=1,
                titulo="Cálculo Diferencial - Solucionario Parcial 2024-1",
                universidad="UNCP",
                asignatura="Matemáticas",
                categoria="Ciencias Exactas",
                descripcion="Recopilación de ejercicios paso a paso resueltos.",
                url="https://ejemplo.com/calculo.pdf",
                autor="Lucía Canchanya",
                tipo="PDF",
                fecha="Hace 2 días"
            ),
            Recurso(
                id=2,
                titulo="Guía Completa de Microcontroladores ESP32 & IoT",
                universidad="Universidad Continental",
                asignatura="Programación",
                categoria="Tecnología",
                descripcion="Laboratorios integrales con código en C++/Arduino.",
                url="https://ejemplo.com/esp32.zip",
                autor="Javier Palomino",
                tipo="ZIP",
                fecha="Hace 4 días"
            )
        ]
        self.__next_id = 3

    def obtener_recursos(self) -> List[Recurso]:
        return self.__recurso_db

    def obtener_recurso_por_id(self, id: int) -> Optional[Recurso]:
        for recurso in self.__recurso_db:
            if recurso.id == id:
                return recurso
        return None

    def guardar_recurso(self, recurso: RecursoCreate) -> Recurso:
        nuevo_recurso = Recurso(id=self.__next_id, **recurso.model_dump())
        self.__recurso_db.append(nuevo_recurso)
        self.__next_id += 1
        return nuevo_recurso

    def actualizar_recurso(self, id: int, recurso: RecursoCreate) -> Optional[Recurso]:
        for i, r in enumerate(self.__recurso_db):
            if r.id == id:
                self.__recurso_db[i] = Recurso(id=id, **recurso.model_dump())
                return self.__recurso_db[i]
        return None

    def eliminar_recurso(self, id: int) -> bool:
        for i, r in enumerate(self.__recurso_db):
            if r.id == id:
                del self.__recurso_db[i]
                return True
        return False