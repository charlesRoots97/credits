from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'flaskcontacts'
mysql = MySQL(app)

app.secret_key = 'mysecret'

@app.route('/')
def Index():
    return render_template('index.html')

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

@app.route('/simulator')
def simulator():
    return render_template('simulator.html')

if __name__ == '__main__':
    app.run(port = 3000, debug = True)