from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'dbseguros'
mysql = MySQL(app)

app.secret_key = 'mysecret'

@app.route('/')
def Index():
    return render_template('index.html')

## INICIO LALO ##

@app.route('/indexSeguro')
def indexSeguro():
    return render_template('indexSeguro.html')

@app.route('/requisito')
def Requisito():
    return render_template('requisito.html')

@app.route('/observacion')
def Observacion():
    return render_template('observacion.html')

@app.route('/objetivo')
def Objetivo():
    return render_template('objetivo.html')

@app.route('/banco')
def banco():
    return render_template('banco.html')

@app.route('/terminos')
def terminos():
    return render_template('terminos.html')

@app.route('/privacidad')
def privacidad():
    return render_template('privacidad.html')

@app.route('/verificacion_edad')
def verificacion_edad():
    return render_template('verificacion_edad.html')

@app.route('/seguro')
def seguro():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM tbl_seguro')
    data = cur.fetchall()
    print(data)
    return render_template('seguro.html', contacts = data)

@app.route('/beneficiario/<id>/<secure>')
def beneficiario(id, secure):

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM tbl_parentesco')
    data = cur.fetchall()

    dtTitular = mysql.connection.cursor()
    # dtTitular.execute(("""SELECT id_usuario_cotiza, nombre, apellido_paterno, apellido_materno, CURP, telefono, email, tbl_cat_seguro.precio, tbl_seguro.nombre_seguro 
    #                      FROM tbl_usuario 
    #                      INNER JOIN tbl_cat_seguro ON tbl_cat_seguro.id_cat_seguro = tbl_usuario.tbl_cat_seguro_id_cat_seguro
    #                      INNER JOIN tbl_seguro ON tbl_seguro.id_seguro = tbl_cat_seguro.tbl_seguro_id_seguro
    #                      WHERE id_usuario_cotiza = {} LIMIT 1 """).format(secure))
    # datos = dtTitular.fetchall()
    dtTitular.execute("""SELECT id_usuario_cotiza, nombre, apellido_paterno, apellido_materno, CURP, telefono, email, tbl_cat_seguro.precio, tbl_seguro.nombre_seguro 
                         FROM tbl_usuario 
                         INNER JOIN tbl_cat_seguro ON tbl_cat_seguro.id_cat_seguro = tbl_usuario.tbl_cat_seguro_id_cat_seguro
                         INNER JOIN tbl_seguro ON tbl_seguro.id_seguro = tbl_cat_seguro.tbl_seguro_id_seguro
                         WHERE id_usuario_cotiza = {} """.format(str(id)))
    datos = dtTitular.fetchall()
    print(datos)

    titular = mysql.connection.cursor()
    titular.execute('SELECT * FROM tbl_usuario LIMIT 1')
    titularData = titular.fetchone()

    seguro = mysql.connection.cursor()
    seguro.execute(('SELECT tbl_cat_seguro.*, tbl_seguro.nombre_seguro AS secure_name FROM tbl_cat_seguro INNER JOIN tbl_seguro ON tbl_seguro.id_seguro = tbl_cat_seguro.tbl_seguro_id_seguro WHERE id_cat_seguro = {} LIMIT 1').format(secure))
    seguroData = seguro.fetchone()
    # print(seguroData)

    return render_template('beneficiario.html', parentesco = data, seguro = seguroData, titular = titularData, datoTitular = datos)

@app.route('/verseguro/<id>', methods=['GET'])
def pagina3(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT tbl_cat_seguro.*, tbl_seguro.img_seguro, tbl_seguro.id_seguro FROM tbl_cat_seguro INNER JOIN tbl_seguro ON tbl_cat_seguro.tbl_seguro_id_seguro = tbl_seguro.id_seguro WHERE tbl_seguro_id_seguro = {}'.format(str(id)))
    seguros = cur.fetchall()
    data = []
    for seguro in seguros:
        print('******')
        print(seguro)
        print('******')
        json_data = {
            'id_cat_seguro':seguro[0],
            'nombre_cat':seguro[1],
            'precio':seguro[2],
            'descripcion':seguro[3],
            'fk_seguro':seguro[4],
            'img_seguro':seguro[5],
            'id_seguro':seguro[6]
            }
        data.append(json_data)

    response = {'seguros':data}
    return jsonify(response)

@app.route('/titular/<id>', methods=['GET'])
def cotizar(id):

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM tbl_genero')
    data = cur.fetchall()

    curs = mysql.connection.cursor()
    curs.execute('SELECT * FROM tbl_profesion')
    datas = curs.fetchall()

    cursr = mysql.connection.cursor()
    cursr.execute('SELECT * FROM tbl_cat_seguro WHERE id_cat_seguro = {}'.format(str(id)))
    datasr = cursr.fetchall()
    return render_template('titular.html', cotiz = data, prof = datas, seguro_id = datasr[0], id_seguro = id)

@app.route('/add_titular', methods=["POST","GET"])
def add_titular():
    if request.method == 'POST':
        nombre = request.form['nombre'].upper()
        apellido_paterno = request.form['apellido_paterno'].upper()
        apellido_materno = request.form['apellido_materno'].upper()
        sexo = request.form['sexo'].upper()
        email = request.form['email'].upper()
        telefono = request.form['telefono']
        profesion = request.form['profesion'].upper()
        fecha_nacimiento = request.form['fecha_nacimiento']
        curp = request.form['curp'].upper()
        precio_seguro = request.form['precio_seguro']

        verifyTitular = mysql.connection.cursor()
        verifyTitular.execute(("SELECT * FROM tbl_usuario WHERE CURP = '{}'").format(curp))
        verifyTitular = verifyTitular.fetchall()
        existsTitular = len(verifyTitular)

        if(existsTitular > 0):
            json_data = {'id':0}
            return jsonify(json_data)
        
        cur = mysql.connection.cursor()

        cur.execute('INSERT INTO tbl_usuario (nombre, apellido_paterno, apellido_materno, fecha_nacimiento, telefono, email, CURP, tbl_genero_id_genero, tbl_profesion_id_profesion, tbl_cat_seguro_id_cat_seguro) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)',
        (nombre, apellido_paterno, apellido_materno, fecha_nacimiento, telefono, email, curp, sexo, profesion, precio_seguro))
        mysql.connection.commit()

        extractTitular = mysql.connection.cursor()
        extractTitular.execute(("SELECT id_usuario_cotiza FROM tbl_usuario WHERE CURP = '{}'").format(curp))
        extractTitular = extractTitular.fetchall()
        idTitular = extractTitular[0][0]
        idTitular = str(idTitular)
        json_data = {'id':idTitular}
        return jsonify(json_data)

@app.route('/verdtatitular/<id>', methods=['POST'])
def verdtatitular(id):
    titular = id
    # CURL to generate payment order n' show url to pay
    response = requests.post('https://api.conekta.io/checkouts',headers={'Accept':'application/vnd.conekta-v2.0.0+json','Content-Type':'application/json','Authorization':'Basic a2V5X3FiSzZ6ZmVIdEFIU1hKeHNNSGNpTHc='}, json={
        "name": request.form['product_name'],
        "type": "PaymentLink",
        "recurrent": False,
        "expires_at": request.form['expires_at'],
        "allowed_payment_methods": ["card"],
        "needs_shipping_contact": True,
        "monthly_installments_enabled": False,
        "order_template": {
            "line_items": [{
                "name": request.form['product_name'],
                "unit_price": request.form['secure_price'],
                "quantity": 1
            }],
            "currency": "MXN",
            "customer_info": {
                "name": request.form['titular_name'],
                "email": request.form['titular_email'],
                "phone": request.form['titular_phone']
            }
        }
    })
    json_response = response.json()
    return jsonify(json_response)
    # Hasta aquí se realiza la generación de orden de PAGO POR TARJETA
    # Debes continuar tu proceso por aquí con el o los beneficiarios aquí

    # Me marcaba error y lo realice por aparte, es el que está aquí abajo
    # cur = mysql.connection.cursor()
    # cur.execute(""" SELECT tbl_usuario.*, tbl_cat_seguro.nombre_cat, tbl_cat_seguro.precio, tbl_seguro.img_seguro 
    #                 FROM tbl_usuario 
    #                 INNER JOIN tbl_cat_seguro ON tbl_usuario.tbl_cat_seguro_id_cat_seguro = tbl_cat_seguro.id_cat_seguro 
    #                 INNER JOIN tbl_seguro ON tbl_cat_seguro.tbl_seguro_id_seguro = tbl_seguro.id_seguro WHERE CURP = %s """, (id,))
    # datas = cur.fetchall()

    # data = []
    # for seguro in datas:
    #     print('******')
    #     # print(seguro)
    #     print('******')
    #     json_data = {
    #         'id_usuario_cotiza':seguro[0],
    #         'nombre':seguro[1],
    #         'apellido_paterno':seguro[2],
    #         'apellido_materno':seguro[3],
    #         'precio':seguro[13],
    #         'img_seguro':seguro[14],
    #         'CURP':seguro[8]
    #         }
    #     data.append(json_data)
    # responses = {'datas':data}
    # return jsonify(responses)
@app.route('/verdtatitu/<id>', methods=['POST'])
def verdtatitu(id):
    titular = id


    cur = mysql.connection.cursor()
    cur.execute(""" SELECT tbl_usuario.*, tbl_cat_seguro.nombre_cat, tbl_cat_seguro.precio, tbl_seguro.img_seguro 
                    FROM tbl_usuario 
                    INNER JOIN tbl_cat_seguro ON tbl_usuario.tbl_cat_seguro_id_cat_seguro = tbl_cat_seguro.id_cat_seguro 
                    INNER JOIN tbl_seguro ON tbl_cat_seguro.tbl_seguro_id_seguro = tbl_seguro.id_seguro WHERE CURP = %s """, (id,))
    datas = cur.fetchall()

    data = []
    for seguro in datas:
        print('******')
        # print(seguro)
        print('******')
        json_data = {
            'id_usuario_cotiza':seguro[0],
            'nombre':seguro[1],
            'apellido_paterno':seguro[2],
            'apellido_materno':seguro[3],
            'precio':seguro[13],
            'img_seguro':seguro[14],
            'CURP':seguro[8]
            }
        data.append(json_data)
    responses = {'datas':data}
    return responses


@app.route('/add_beneficiario', methods=["POST"])
def add_beneficiario():
    if request.method == 'POST':
        
        nombre_beneficiario = request.form['nombre_beneficiario'].upper()
        apellido_p_beneficiario = request.form['apellido_p_beneficiario'].upper()
        apellido_m_beneficiario = request.form['apellido_m_beneficiario'].upper()
        porcentaje_beneficiario = request.form['porcentaje_beneficiario'].upper()
        parentesco_beneficiario = request.form['parentesco_beneficiario'].upper()
        titular_veri = request.form['titular_veri']

        nombre_beneficiario_dina = request.form['nombre_beneficiario_dina'].upper()
        apellido_p_beneficiario_dina = request.form['apellido_p_beneficiario_dina'].upper()
        apellido_m_beneficiario_dina = request.form['apellido_m_beneficiario_dina'].upper()
        porcentaje_beneficiario_dina = request.form['porcentaje_beneficiario_dina'].upper()
        parentesco_beneficiario_dina = request.form['parentesco_beneficiario_dina'].upper()

        nombre_beneficiario_dina3 = request.form['nombre_beneficiario_dina3'].upper()
        apellido_p_beneficiario_dina3 = request.form['apellido_p_beneficiario_dina3'].upper()
        apellido_m_beneficiario_dina3 = request.form['apellido_m_beneficiario_dina3'].upper()
        parentesco_beneficiario_dina3 = request.form['parentesco_beneficiario_dina3'].upper()
        porcentaje_beneficiario_dina3 = request.form['porcentaje_beneficiario_dina3'].upper() 

        nombre_beneficiario_dina4 = request.form['nombre_beneficiario_dina4'].upper()
        apellido_p_beneficiario_dina4 = request.form['apellido_p_beneficiario_dina4'].upper()
        apellido_m_beneficiario_dina4 = request.form['apellido_m_beneficiario_dina4'].upper()
        parentesco_beneficiario_dina4 = request.form['parentesco_beneficiario_dina4'].upper()
        porcentaje_beneficiario_dina4 = request.form['porcentaje_beneficiario_dina4'].upper() 
        
        
        if nombre_beneficiario_dina == "" and apellido_p_beneficiario_dina == "" and apellido_m_beneficiario_dina == "" and porcentaje_beneficiario_dina != "" and parentesco_beneficiario_dina != "":      
            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario, apellido_p_beneficiario, apellido_m_beneficiario, porcentaje_beneficiario, parentesco_beneficiario, titular_veri))
            mysql.connection.commit()
            return render_template('banco.html')


        elif nombre_beneficiario_dina3 == "" and apellido_p_beneficiario_dina3 == "" and apellido_m_beneficiario_dina3 == "" and porcentaje_beneficiario_dina3 != "" and parentesco_beneficiario_dina3 != "":    
            curd = mysql.connection.cursor()
            curd.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario_dina, apellido_p_beneficiario_dina, apellido_m_beneficiario_dina, porcentaje_beneficiario_dina, parentesco_beneficiario_dina, titular_veri))
            mysql.connection.commit()

            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario, apellido_p_beneficiario, apellido_m_beneficiario, porcentaje_beneficiario, parentesco_beneficiario, titular_veri))
            mysql.connection.commit()
            return render_template('banco.html')

        elif nombre_beneficiario_dina4 == "" and apellido_p_beneficiario_dina4 == "" and apellido_m_beneficiario_dina4 == "" and porcentaje_beneficiario_dina4 != "" and parentesco_beneficiario_dina4 != "":
            curdn = mysql.connection.cursor()
            curdn.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario_dina3, apellido_p_beneficiario_dina3, apellido_m_beneficiario_dina3, porcentaje_beneficiario_dina3, parentesco_beneficiario_dina3, titular_veri))
            mysql.connection.commit()

            curd = mysql.connection.cursor()
            curd.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario_dina, apellido_p_beneficiario_dina, apellido_m_beneficiario_dina, porcentaje_beneficiario_dina, parentesco_beneficiario_dina, titular_veri))
            mysql.connection.commit()

            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario, apellido_p_beneficiario, apellido_m_beneficiario, porcentaje_beneficiario, parentesco_beneficiario, titular_veri))
            mysql.connection.commit()
            return render_template('banco.html')

        elif nombre_beneficiario_dina4 != "" and apellido_p_beneficiario_dina4 != "" and apellido_m_beneficiario_dina4 != "" and porcentaje_beneficiario_dina4 != 0 and parentesco_beneficiario_dina4 != 0:
            # else:
            curdni = mysql.connection.cursor()
            curdni.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario_dina4, apellido_p_beneficiario_dina4, apellido_m_beneficiario_dina4, porcentaje_beneficiario_dina4, parentesco_beneficiario_dina4, titular_veri))
            mysql.connection.commit()

            curdn = mysql.connection.cursor()
            curdn.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario_dina3, apellido_p_beneficiario_dina3, apellido_m_beneficiario_dina3, porcentaje_beneficiario_dina3, parentesco_beneficiario_dina3, titular_veri))
            mysql.connection.commit()

            curd = mysql.connection.cursor()
            curd.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario_dina, apellido_p_beneficiario_dina, apellido_m_beneficiario_dina, porcentaje_beneficiario_dina, parentesco_beneficiario_dina, titular_veri))
            mysql.connection.commit()

            cur = mysql.connection.cursor()
            cur.execute('INSERT INTO tbl_beneficiario (nombre, apellido_paterno, apellido_materno, porcentaje, tbl_parentesco_id_parentesco, tbl_usuario_id_usuario_cotiza) VALUES (%s, %s, %s, %s, %s, %s)',
            (nombre_beneficiario, apellido_p_beneficiario, apellido_m_beneficiario, porcentaje_beneficiario, parentesco_beneficiario, titular_veri))
            mysql.connection.commit()
            return render_template('banco.html')


## FIN LALO ##

@app.route('/producto/1')
def productoOne():
    return render_template('producto1.html')

@app.route('/producto/2')
def productoTwo():
    return render_template('producto2.html')

@app.route('/producto/3')
def productoThree():
    return render_template('producto3.html')

@app.route('/producto/4')
def productoFour():
    return render_template('producto4.html')

@app.route('/producto/5')
def productoFive():
    return render_template('producto5.html')

@app.route('/producto/6')
def productoSix():
    return render_template('producto6.html')

@app.route('/producto/7')
def productoSeven():
    return render_template('producto7.html')


@app.route('/conocer_producto/1')
def ConocerproductoOne():
    return render_template('conocer_producto1.html')
    
@app.route('/conocer_producto/2')
def ConocerproductoTwo():
    return render_template('conocer_producto2.html')

@app.route('/conocer_producto/3')
def ConocerproductoThree():
    return render_template('conocer_producto3.html')

@app.route('/conocer_producto/4')
def ConocerproductoFour():
    return render_template('conocer_producto4.html')

@app.route('/conocer_producto/5')
def ConocerproductoFive():
    return render_template('conocer_producto5.html')

@app.route('/conocer_producto/6')
def ConocerproductoSix():
    return render_template('conocer_producto6.html')

@app.route('/conocer_producto/7')
def ConocerproductoSeven():
    return render_template('conocer_producto7.html')

@app.route('/sucursales')
def sucursales():
    return render_template('sucursales.html')


@app.route('/simulator')
def simulator():
    return render_template('simulator.html')

if __name__ == '__main__':
    app.run(port = 3000, debug = True)