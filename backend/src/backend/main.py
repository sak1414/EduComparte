# src/backend/main.py
from fastapi import FastAPI
from src.backend.apis.recurso_api import router as recurso_router  # <-- Ruta completa corregida

app = FastAPI(
    title="EduComparte Huancayo - API",
    description="API REST para la plataforma de intercambio de recursos educativos",
    version="1.0.0"
)

app.include_router(recurso_router)

@app.get("/")
async def root():
    return {
        "message": "Bienvenido a la API de EduComparte Huancayo",
        "documentacion": "/docs",
        "redoc": "/redoc"
    }