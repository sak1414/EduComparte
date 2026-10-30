
from fastapi import APIRouter, HTTPException
from typing import List
from src.backend.schemas.recurso import Recurso, RecursoCreate          # <-- Corregido
from src.backend.services.recurso_service import RecursoService         # <-- Corregido

router = APIRouter(prefix="/api/recursos", tags=["Recursos Educativos"])
recurso_service = RecursoService()

@router.get("/", response_model=List[Recurso])
async def obtener_todos_los_recursos():
    return recurso_service.obtener_recursos()

@router.get("/{id}", response_model=Recurso)
async def obtener_recurso(id: int):
    recurso = recurso_service.obtener_recurso_por_id(id)
    if recurso is None:
        raise HTTPException(status_code=404, detail="Recurso no encontrado")
    return recurso

@router.post("/", response_model=Recurso, status_code=201)
async def crear_recurso(recurso: RecursoCreate):
    return recurso_service.guardar_recurso(recurso)

@router.put("/{id}", response_model=Recurso)
async def actualizar_recurso(id: int, recurso: RecursoCreate):
    recurso_actualizado = recurso_service.actualizar_recurso(id, recurso)
    if recurso_actualizado is None:
        raise HTTPException(status_code=404, detail="Recurso no encontrado")
    return recurso_actualizado

@router.delete("/{id}")
async def eliminar_recurso(id: int):
    if recurso_service.eliminar_recurso(id):
        return {"message": "Recurso eliminado correctamente"}
    raise HTTPException(status_code=404, detail="Recurso no encontrado")