# src/backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.backend.apis.recurso_api import router as recurso_router

# Configuración de la aplicación
app = FastAPI(
    title="EduComparte Huancayo - API",
    description="API REST para la plataforma de intercambio de recursos educativos",
    version="1.0.0"
)

# Configuración de CORS (Cross-Origin Resource Sharing)
# Esto permite que el frontend (Angular) se comunique con el backend (FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",  # Angular en desarrollo
        "http://127.0.0.1:4200",  # Alternativa
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Permite todos los headers
)

# Incluir el router de recursos
app.include_router(recurso_router)

# Ruta raíz (opcional, para verificar que funciona)
@app.get("/")
async def root():
    return {
        "message": "Bienvenido a la API de EduComparte Huancayo",
        "documentacion": "/docs",
        "redoc": "/redoc"
    }