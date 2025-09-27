# ACTIVIDAD-SERVICIOS-REST
ACTIVIDAD SERVICIOS REST PYTHON FLASK, MYSQL



¡Hola! Veo que tienes una API Flask corriendo en http://127.0.0.1:5000/ y necesitas consumirla usando Thunder Client. El código que proporcionas define varios endpoints para gestionar clientes, incluyendo listado, consulta individual, registro, eliminación y actualización.

Para que lo hagas correctamente, debes entender cómo mapear cada operación (GET, POST, PUT, DELETE) a la URL base http://127.0.0.1:5000/clientes y cómo enviar los datos necesarios.

Estructura para Consumir la API con Thunder Client
Aquí te indico cómo debes estructurar tus peticiones en Thunder Client (o cualquier cliente REST) para interactuar con tu API.

1. Listar Todos los Clientes (GET)
Lógica: Usas el método GET en la ruta base para obtener todos los registros.

Método: GET

URL: http://127.0.0.1:5000/clientes

Body (Cuerpo): No necesitas enviar ningún cuerpo.

Resultado Esperado: Un JSON con una lista de clientes y el mensaje "Clientes regisrados".

2. Leer un Cliente por Código (GET)
Lógica: Usas el método GET e incluyes el código del cliente en la URL.

Método: GET

URL: http://127.0.0.1:5000/clientes/C001 (Sustituye C001 por el código real del cliente).

Body (Cuerpo): No necesitas enviar ningún cuerpo.

Resultado Esperado: Un JSON con los detalles del cliente encontrado o el mensaje "Cliente no encontrado.".

3. Registrar un Nuevo Cliente (POST)
Lógica: Usas el método POST en la ruta base y envías los datos del nuevo cliente en formato JSON.

Método: POST

URL: http://127.0.0.1:5000/clientes

Body (Cuerpo): Selecciona el tipo JSON y envía la información requerida. Importante: Según tu código, el campo para el teléfono tiene un error tipográfico (telenono), pero el input esperado del JSON es telefono. Debes enviar el JSON con la clave correcta que esperas en request.json['telefono'] para que funcione.

JSON

{
    "codigo": "C001",
    "nombre": "Juan",
    "apellido": "Pérez",
    "direccion": "Calle Falsa 123",
    "telefono": "555-1234",
    "email": "juan.perez@ejemplo.com"
}


¡Hola! Veo que tienes una API Flask corriendo en http://127.0.0.1:5000/ y necesitas consumirla usando Thunder Client. El código que proporcionas define varios endpoints para gestionar clientes, incluyendo listado, consulta individual, registro, eliminación y actualización.

Para que lo hagas correctamente, debes entender cómo mapear cada operación (GET, POST, PUT, DELETE) a la URL base http://127.0.0.1:5000/clientes y cómo enviar los datos necesarios.

Estructura para Consumir la API con Thunder Client
Aquí te indico cómo debes estructurar tus peticiones en Thunder Client (o cualquier cliente REST) para interactuar con tu API.

1. Listar Todos los Clientes (GET)
Lógica: Usas el método GET en la ruta base para obtener todos los registros.

Método: GET

URL: http://127.0.0.1:5000/clientes

Body (Cuerpo): No necesitas enviar ningún cuerpo.

Resultado Esperado: Un JSON con una lista de clientes y el mensaje "Clientes regisrados".

2. Leer un Cliente por Código (GET)
Lógica: Usas el método GET e incluyes el código del cliente en la URL.

Método: GET

URL: http://127.0.0.1:5000/clientes/C001 (Sustituye C001 por el código real del cliente).

Body (Cuerpo): No necesitas enviar ningún cuerpo.

Resultado Esperado: Un JSON con los detalles del cliente encontrado o el mensaje "Cliente no encontrado.".

3. Registrar un Nuevo Cliente (POST)
Lógica: Usas el método POST en la ruta base y envías los datos del nuevo cliente en formato JSON.

Método: POST

URL: http://127.0.0.1:5000/clientes

Body (Cuerpo): Selecciona el tipo JSON y envía la información requerida. Importante: Según tu código, el campo para el teléfono tiene un error tipográfico (telenono), pero el input esperado del JSON es telefono. Debes enviar el JSON con la clave correcta que esperas en request.json['telefono'] para que funcione.

JSON

{
    "codigo": "C001",
    "nombre": "Juan",
    "apellido": "Pérez",
    "direccion": "Calle Falsa 123",
    "telefono": "555-1234",
    "email": "juan.perez@ejemplo.com"
}
Resultado Esperado: El mensaje "Cliente registrado." o "Error.".

4. Eliminar un Cliente (DELETE)
Lógica: Usas el método DELETE e incluyes el código del cliente a eliminar en la URL.

Método: DELETE

URL: http://127.0.0.1:5000/clientes/C001 (Sustituye C001 por el código del cliente).

Body (Cuerpo): No necesitas enviar ningún cuerpo.

Resultado Esperado: El mensaje "Cliente Eliminado." o "Error.".

5. Actualizar un Cliente (PUT)
Lógica: Usas el método PUT e incluyes el código del cliente a actualizar en la URL. Envías todos los campos a actualizar en formato JSON.

Método: PUT

URL: http://127.0.0.1:5000/clientes/C001 (Sustituye C001 por el código del cliente).

Body (Cuerpo): Selecciona el tipo JSON y envía todos los campos a modificar.

JSON

{
    "nombre": "Javier",
    "apellido": "Gómez",
    "direccion": "Avenida Siempre Viva",
    "telefono": "555-5678",
    "email": "javier.gomez@ejemplo.com"
}


/////////////////////////////////////////////////////////////////////////////////////////////
requeriments for instalations and project in univercity 


apt install python3-virtualenv

virtualenv -p python env 


source env/bin/activate // in windows env\Scripts\activate


pip install flask flask_mysqldb


python src/app.py



SI NO SE DEJA INSTALAR EL FLASK EN LINUX 

# Actualizar lista de paquetes
sudo apt update

# Instalar dependencias necesarias
sudo apt install pkg-config libmysqlclient-dev build-essential python3-dev






 python.exe -m pip install --upgrade pip



 pip install Flask-MySQLdb
