def __init__(self) -> None:
    """Carga la configuración y prepara la cadena de conexión."""
    # CORRECCIÓN: parents[3] en lugar de parents[2] para llegar a backend/
    env_path = Path(__file__).resolve().parents[3] / ".env"
    
    print(f"🔍 Buscando .env en: {env_path}")
    print(f"🔍 ¿Existe el archivo? {env_path.exists()}")
    
    load_dotenv(dotenv_path=env_path)
    
    driver = os.getenv("DB_DRIVER")
    server = os.getenv("DB_SERVER")
    database = os.getenv("DB_NAME")
    trusted = os.getenv("DB_TRUSTED")
    
    print(f"🔍 Valores leídos del .env:")
    print(f"   Driver: {driver}")
    print(f"   Server: {server}")
    print(f"   Database: {database}")
    print(f"   Trusted: {trusted}")
    
    # Construir la cadena de conexión
    self._conn_str = (
        f"DRIVER={driver};"
        f"SERVER={server};"
        f"DATABASE={database};"
        f"Trusted_Connection={trusted};"
    )
    
    print(f"✅ Cadena de conexión: {self._conn_str}")