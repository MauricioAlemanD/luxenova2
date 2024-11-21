from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

def create_connection():
    """Create a database connection to the MySQL database"""
    connection = None
    try:
        connection = mysql.connector.connect(
            host="mysql+pymysql://admin:O-nt6051{fv@proyectoluxenova.cfsgec4e4óso.us-east-1.rds.amazonaws.com/Luxenova",  # Usualmente es localhost o 127.0.0.1 para XAMPP
            user="root",  # Usuario por defecto en XAMPP
            password="",  # Contraseña por defecto es vacía
            database="luxenova"
        )
        if connection.is_connected():
            print("Connection to MySQL database successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

def login_user(email, password):
    """Verify user credentials"""
    connection = create_connection()
    if connection:
        cursor = connection.cursor(dictionary=True)
        query = "SELECT * FROM users WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password,))
        user = cursor.fetchone()
        cursor.close()
        connection.close()
        return user
    return None

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = login_user(email, password)
    if user:
        response = {
            "user": {
                "email": user["email"]
                # Add more fields if needed
            },
            "role": "user_role",  # You can get this from the database if you have a role field
            "token": "dummy_token"  # Generate and return a real token here
        }
        return jsonify(response), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
