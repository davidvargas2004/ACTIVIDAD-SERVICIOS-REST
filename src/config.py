class DevelopmentConfig():
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = '' # Por defecto, la contraseña de root en XAMPP es vacía.
    MYSQL_DB = 'dbrest' # <-- ¡IMPORTANTE! Reemplaza esto con el nombre de tu base de datos.
    MYSQL_PORT = 3307 # Puerto por defecto de MySQL en XAMPP

config = {
    'development': DevelopmentConfig
}
