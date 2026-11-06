# src/backend/services/recurso_service.py
from src.backend.schemas.recurso import Recurso, RecursoCreate
from src.backend.repositorio.recurso_repositorio import RecursoRepositorio
from typing import List, Optional

class RecursoService:
    def __init__(self):
        # Delegación: el servicio NO conoce cómo se guardan los datos
        self.__repositorio = RecursoRepositorio()
        self.__next_id = 1
        # Cargar datos de prueba al iniciar
        self.__cargar_datos_iniciales()
    
    def __cargar_datos_iniciales(self):
        """Carga datos de prueba al iniciar el servicio"""
        datos_iniciales = [
            RecursoCreate(
                titulo="Cálculo Diferencial - Solucionario Parcial 2024-1",
                universidad="UNCP",
                asignatura="Matemáticas",
                categoria="Ciencias Exactas",
                descripcion="Recopilación de ejercicios paso a paso resueltos.",
                url="https://ejemplo.com/calculo.pdf",
                autor="Lucía Canchanya",
                tipo="PDF"
            ),
            RecursoCreate(
                titulo="Guía Completa de Microcontroladores ESP32 & IoT",
                universidad="Universidad Continental",
                asignatura="Programación",
                categoria="Tecnología",
                descripcion="Laboratorios integrales con código en C++/Arduino.",
                url="https://ejemplo.com/esp32.zip",
                autor="Javier Palomino",
                tipo="ZIP"
            )
        ]
        
        for recurso in datos_iniciales:
            self.guardar_recurso(recurso)
    
    def guardar_recurso(self, recurso: RecursoCreate) -> Recurso:
        """Crea un nuevo recurso"""
        try:
            nuevo_recurso = Recurso(id=self.__next_id, **recurso.model_dump())
            self.__next_id += 1
            return self.__repositorio.guardar(nuevo_recurso)
        except Exception as e:
            print(f"Error en servicio al guardar: {e}")
            return None
    
    def obtener_recursos(self) -> List[Recurso]:
        """Obtiene todos los recursos"""
        try:
            return self.__repositorio.obtener_todos()
        except Exception as e:
            print(f"Error en servicio al obtener: {e}")
            return []
    
    def obtener_recurso_por_id(self, id: int) -> Optional[Recurso]:
        """Obtiene un recurso por ID"""
        try:
            return self.__repositorio.obtener_por_id(id)
        except Exception as e:
            print(f"Error en servicio al obtener por ID: {e}")
            return None
    
    def actualizar_recurso(self, id: int, recurso: RecursoCreate) -> Optional[Recurso]:
        """Actualiza un recurso existente"""
        try:
            recurso_actualizado = Recurso(id=id, **recurso.model_dump())
            return self.__repositorio.actualizar(id, recurso_actualizado)
        except Exception as e:
            print(f"Error en servicio al actualizar: {e}")
            return None
    
    def eliminar_recurso(self, id: int) -> bool:
        """Elimina un recurso"""
        try:
            return self.__repositorio.eliminar(id)
        except Exception as e:
            print(f"Error en servicio al eliminar: {e}")
            return False