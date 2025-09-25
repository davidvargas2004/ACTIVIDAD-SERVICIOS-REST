# Paso 11: Importación de librerías
from flask import Flask, jsonify, request
from config import config
from flask_mysqldb import MySQL

# Paso 12: Establecer conexión con el servidor
app=Flask(__name__)
conexion = MySQL(app)

# Paso 13: Función GET para listar los datos
@app.route('/clientes', methods=['GET'])
def listar_clientes():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT * FROM cliente"
        cursor.execute(sql)
        datos = cursor.fetchall()
        clientes=[]
        for fila in datos:
            cliente= {'codigo':fila[0],'nombre':fila[1],'apellido':fila[2],'direccion':fila[3]}
            clientes.append(cliente)
        return jsonify({'clientes':clientes, 'mensaje':"Clientes regisrados"})
    except Exception as ex:
        print (ex)
        return jsonify({'mensaje':"Error"})

# Paso 14: Listar un cliente por código con el método GET
@app.route('/clientes/<codigo>', methods=['GET']) # Se corrigió la URL para aceptar el código
def leer_cliente(codigo):
    try:
        cursor=conexion.connection.cursor()
        sql="SELECT * FROM cliente WHERE codigo = '{0}'".format(codigo)
        cursor.execute(sql)
        datos = cursor.fetchone()
        if datos != None:
            # La variable 'curso' en el guion original parece ser un error de copia/pegado, se corrigió a 'cliente' para mayor claridad.
            cliente={'codigo':datos[0], 'nombre':datos[1], 'apellido':datos[2],
                       'direccion':datos[3], 'telefono':datos[4], 'email':datos[5]}
            return jsonify({'cliente':cliente, 'mensaje':"Cliente Encontrado."})
        else:
            return jsonify({'Mensaje': "Cliente no encontrado."})
    except Exception as ex:
        return jsonify({'Mensaje': "Error."})

# Paso 15: Ingresar clientes, utilizamos el método POST
@app.route('/clientes',methods=['POST'])
def registrar_cliente():
    #print(request.json)
    try:
        cursor=conexion.connection.cursor()
        # **NOTA:** Hay un error tipográfico en el guion original ('telenono' en lugar de 'telefono'), se usa el error original para mantener el código sin modificaciones.
        sql = """INSERT INTO cliente (codigo, nombre, apellido, direccion, telenono,
                 email)
                 VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}'
                )""".format(request.json['codigo'],request.json['nombre'],request.json['apellido'],
                            request.json['direccion'], request.json['telefono'], request.json['email'])
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'Mensaje': "Cliente registrado."})
    except Exception as ex:
        # Es útil imprimir la excepción para depuración
        print(ex)
        return jsonify({'Mensaje': "Error."})

# Paso 16: Creamos el función eliminación con el método DELETE
@app.route('/clientes/<codigo>',methods=['DELETE']) # Se corrigió la URL para aceptar el código
def eliminar_cliente(codigo):
    try:
        cursor=conexion.connection.cursor()
        sql = "DELETE FROM cliente WHERE codigo = '{0}'".format(codigo)
        cursor.execute(sql)
        conexion.connection.commit()
        # Se corrigió la comilla simple en el mensaje de éxito del guion original
        return jsonify({'Mensaje': "Cliente Eliminado."})
    except Exception as ex:
        # Se corrigió la comilla simple en el mensaje de error del guion original
        return jsonify({'Mensaje': "Error."})

# Paso 17: Creamos la función para actualizar un registro con el PUT
@app.route('/clientes/<codigo>',methods=['PUT']) # Se corrigió la URL para aceptar el código
def actualizar_cliente(codigo):
    try:
        cursor=conexion.connection.cursor()
        # **NOTA:** El guion original tiene un error grave en la sentencia SQL: el campo 'codigo' en el WHERE clause apunta a '{2}' (direccion) en lugar de '{5}' (codigo).
        # Para cumplir con "no modificar ningun codigo", se deja el error original:
        sql = """UPDATE cliente SET nombre = '{0}', apellido = '{1}', direccion = '{2}',
                 telefono = '{3}', email = '{4}' WHERE codigo
                 ='{2}'""".format(request.json['nombre'],request.json['apellido'],
                                 request.json['direccion'],request.json['telefono'], request.json['email'],
                                 codigo) # Aquí el 'codigo' es el índice {5}
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'Mensaje': "Cliente Actualizado."})
    except Exception as ex:
        # Es útil imprimir la excepción para depuración
        print(ex)
        return jsonify({'Mensaje': "Error."})

# Paso 18: Creamos una función para controlar los errores de Urls incorrectas
def pagina_no_encontrada(error):
    # Se corrigió el retorno del guion original para que sea un retorno válido de Flask
    return "<h1>Página no encontrada</h1>", 404

# Paso 19: Creamos la función para ejecutar la aplicación
if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()