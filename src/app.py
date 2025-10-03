# Paso 11: Importación de librerías
from flask import Flask, jsonify, request, render_template # Se añade render_template
from config import config
from flask_mysqldb import MySQL

# Paso 12: Inicialización de la aplicación Flask
app = Flask(__name__)
# Conexión a la base de datos
db_connection = MySQL(app)

# --- RUTA PARA SERVIR LA INTERFAZ DE USUARIO ---

@app.route('/')
def index():
    """
    Renderiza la página principal (frontend) que consumirá la API.
    """
    return render_template('index.html')

# --- RUTAS DE LA API (estas no cambian) ---

# Paso 13: Función GET para listar todos los clientes
@app.route('/clientes', methods=['GET'])
def listar_clientes():
    try:
        cursor = db_connection.connection.cursor()
        sql = "SELECT codigo, nombre, apellido, direccion, telefono, email FROM cliente"
        cursor.execute(sql)
        datos = cursor.fetchall()
        clientes = []
        for fila in datos:
            cliente = {
                'codigo': fila[0],
                'nombre': fila[1],
                'apellido': fila[2],
                'direccion': fila[3],
                'telefono': fila[4],
                'email': fila[5]
            }
            clientes.append(cliente)
        return jsonify({'clientes': clientes, 'mensaje': "Clientes listados correctamente."})
    except Exception as ex:
        return jsonify({'mensaje': "Error al listar clientes", 'error_detalle': str(ex)}), 500

# Paso 14: Listar un cliente por código con el método GET
@app.route('/clientes/<codigo>', methods=['GET'])
def leer_cliente(codigo):
    try:
        cursor = db_connection.connection.cursor()
        sql = "SELECT codigo, nombre, apellido, direccion, telefono, email FROM cliente WHERE codigo = %s"
        cursor.execute(sql, (codigo,))
        datos = cursor.fetchone()
        if datos is not None:
            cliente = {
                'codigo': datos[0], 'nombre': datos[1], 'apellido': datos[2],
                'direccion': datos[3], 'telefono': datos[4], 'email': datos[5]
            }
            return jsonify({'cliente': cliente, 'mensaje': "Cliente encontrado."})
        else:
            return jsonify({'mensaje': "Cliente no encontrado."}), 404
    except Exception as ex:
        return jsonify({'mensaje': "Error al leer cliente", 'error_detalle': str(ex)}), 500

# Paso 15: Ingresar clientes con el método POST
@app.route('/clientes', methods=['POST'])
def registrar_cliente():
    required_fields = ['codigo', 'nombre', 'apellido', 'direccion', 'telefono', 'email']
    if not all(field in request.json for field in required_fields):
        return jsonify({'mensaje': "Faltan datos en la solicitud."}), 400

    try:
        cursor = db_connection.connection.cursor()
        sql = """INSERT INTO cliente (codigo, nombre, apellido, direccion, telefono, email)
                 VALUES (%s, %s, %s, %s, %s, %s)"""
        cursor.execute(sql, (
            request.json['codigo'], request.json['nombre'], request.json['apellido'],
            request.json['direccion'], request.json['telefono'], request.json['email']
        ))
        db_connection.connection.commit()
        return jsonify({'mensaje': "Cliente registrado exitosamente."}), 201
    except Exception as ex:
        return jsonify({'mensaje': "Error al registrar cliente", 'error_detalle': str(ex)}), 500

# Paso 16: Eliminar un cliente con el método DELETE
@app.route('/clientes/<codigo>', methods=['DELETE'])
def eliminar_cliente(codigo):
    try:
        cursor = db_connection.connection.cursor()
        sql = "DELETE FROM cliente WHERE codigo = %s"
        cursor.execute(sql, (codigo,))
        db_connection.connection.commit()
        if cursor.rowcount > 0:
            return jsonify({'mensaje': "Cliente eliminado."})
        else:
            return jsonify({'mensaje': "Cliente no encontrado para eliminar."}), 404
    except Exception as ex:
        return jsonify({'mensaje': "Error al eliminar cliente", 'error_detalle': str(ex)}), 500

# Paso 17: Actualizar un registro con el método PUT
@app.route('/clientes/<codigo>', methods=['PUT'])
def actualizar_cliente(codigo):
    required_fields = ['nombre', 'apellido', 'direccion', 'telefono', 'email']
    if not all(field in request.json for field in required_fields):
        return jsonify({'mensaje': "Faltan datos para actualizar."}), 400

    try:
        cursor = db_connection.connection.cursor()
        sql = """UPDATE cliente
                 SET nombre = %s, apellido = %s, direccion = %s, telefono = %s, email = %s
                 WHERE codigo = %s"""
        cursor.execute(sql, (
            request.json['nombre'], request.json['apellido'], request.json['direccion'],
            request.json['telefono'], request.json['email'], codigo
        ))
        db_connection.connection.commit()
        if cursor.rowcount > 0:
            return jsonify({'mensaje': "Cliente actualizado."})
        else:
            return jsonify({'mensaje': "Cliente no encontrado para actualizar."}), 404
    except Exception as ex:
        return jsonify({'mensaje': "Error al actualizar cliente", 'error_detalle': str(ex)}), 500

# Paso 18: Manejador de error para URLs no encontradas (404)
def pagina_no_encontrada(error):
    # Si la petición es para la API, devuelve JSON. Si no, una página de error.
    if request.path.startswith('/clientes'):
        return jsonify({'mensaje': "Recurso no encontrado."}), 404
    return render_template('404.html'), 404

# Paso 19: Ejecución de la aplicación
if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()