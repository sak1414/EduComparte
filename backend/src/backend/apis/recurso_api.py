# src/backend/apis/recurso_api.py
from fastapi import APIRouter, HTTPException
from src.backend.schemas.recurso import Recurso, RecursoCreate
from src.backend.services.recurso_service import RecursoService
from typing import List

router = APIRouter(prefix="/api/recursos", tags=["Recursos Educativos"])
recurso_service = RecursoService()

@router.get("/", response_model=List[Recurso])
async def obtener_todos_los_recursos():
    """Obtiene todos los recursos educativos (READ)"""
    return recurso_service.obtener_recursos()

@router.get("/{id}", response_model=Recurso)
async def obtener_recurso(id: int):
    """Obtiene un recurso específico por su ID (READ)"""
    recurso = recurso_service.obtener_recurso_por_id(id)
    if recurso is None:
        raise HTTPException(status_code=404, detail="Recurso no encontrado")
    return recurso

@router.post("/", response_model=Recurso, status_code=201)
async def crear_recurso(recurso: RecursoCreate):
    """Crea un nuevo recurso educativo (CREATE)"""
    recurso_creado = recurso_service.guardar_recurso(recurso)
    if recurso_creado is None:
        raise HTTPException(status_code=500, detail="Error al crear el recurso")
    return recurso_creado

@router.put("/{id}", response_model=Recurso)
async def actualizar_recurso(id: int, recurso: RecursoCreate):
    """Actualiza un recurso existente (UPDATE)"""
    recurso_actualizado = recurso_service.actualizar_recurso(id, recurso)
    if recurso_actualizado is None:
        raise HTTPException(status_code=404, detail="Recurso no encontrado")
    return recurso_actualizado

@router.delete("/{id}")
async def eliminar_recurso(id: int):
    """Elimina un recurso educativo (DELETE)"""
    if recurso_service.eliminar_recurso(id):
        return {"message": "Recurso eliminado correctamente"}
    raise HTTPException(status_code=404, detail="Recurso no encontrado")