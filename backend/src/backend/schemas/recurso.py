
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
    fecha: Optional[str] = None

# Esquema para CREAR (sin id, porque lo genera el sistema)
class RecursoCreate(RecursoBase):
    pass

# Esquema completo (con id, para respuestas)
class Recurso(RecursoBase):
    id: int

    class Config:
        from_attributes = True