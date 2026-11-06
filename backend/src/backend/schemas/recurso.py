# src/backend/schemas/recurso.py
from pydantic import BaseModel
from typing import Optional

# Esquema base con los campos comunes
class RecursoBase(BaseModel):
    titulo: str
    universidad: str
    asignatura: str
    categoria: str
    descripcion: str
    url: str
    autor: str
    tipo: Optional[str] = "PDF"

# Esquema para CREAR (sin id, porque lo genera el sistema)
class RecursoCreate(RecursoBase):
    pass

# Esquema para ACTUALIZAR (todos los campos opcionales)
class RecursoUpdate(BaseModel):
    titulo: Optional[str] = None
    universidad: Optional[str] = None
    asignatura: Optional[str] = None
    categoria: Optional[str] = None
    descripcion: Optional[str] = None
    url: Optional[str] = None
    autor: Optional[str] = None
    tipo: Optional[str] = None

# Esquema completo (con id, para respuestas)
class Recurso(RecursoBase):
    id: int
    
    class Config:
        from_attributes = True