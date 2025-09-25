class DevelopmentConfig():
    DEBUG = True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = '' # Deja esto vacío si no tienes contraseña en MySQL/MariaDB
    MYSQL_DB = 'dbrest' # **NOTA: En el paso 8 creaste 'dbpersonal', pero el código usa 'dbrest'. Asegúrate de que la DB que uses aquí coincida con la que creaste.**

config = {
    'development':DevelopmentConfig
}