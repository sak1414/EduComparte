def __init__(self) -> None:
    """Carga la configuración y prepara la cadena de conexión."""
    # Cargar variables de entorno desde backend/.env
    env_path = Path(__file__).resolve().parents[2] / ".env"
    load_dotenv(dotenv_path=env_path)
    
    driver = os.getenv("DB_DRIVER", "{ODBC Driver 17 for SQL Server}")
    server = os.getenv("DB_SERVER", "DESKTOP-J2N2AC5\\SQLEXPRESS")
    database = os.getenv("DB_NAME", "EduComparteDB")
    trusted = os.getenv("DB_TRUSTED", "yes")
    
    #  CORRECCIÓN: driver ya viene con llaves del .env, no agregar más
    self._conn_str = (
        f"DRIVER={driver};"
        f"SERVER={server};"
        f"DATABASE={database};"
        f"Trusted_Connection={trusted};"
    )
    
    # 🔍 Log para verificar (puedes borrarlo después)
    print(f" Cadena de conexión construida: {self._conn_str}")