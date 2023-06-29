import os
from flask import Flask, jsonify, request, render_template, redirect, url_for, send_from_directory
from cassandra.cluster import Cluster
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
cluster = Cluster()                                 # create a cluster object
session = cluster.connect(keyspace='mykeyspace')    # connect to keyspace 

@app.route('/')
def hello():
    return jsonify({'message': 'Hello, world!'})

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Retrieve user data from Cassandra
        user_data = session.execute("SELECT * FROM user_table WHERE username = %s ALLOW FILTERING", (username, ))
        user = user_data.one()
        print(user)
        # if user and check_password_hash(user.password, password):
        if user:
            # Successful login
            return redirect(url_for('dashboard'))
        else:
            # Invalid username or password
            return render_template('login.html', error='Invalid username or password')

    return render_template('login.html', error=None)

@app.route('/dashboard')
def dashboard():
    return jsonify({'message': 'Health Tracker!'})

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("frontend/build/" + path):
        return send_from_directory("frontend/build", path)
    else:
        return send_from_directory("frontend/build", "index.html")

if __name__ == '__main__':
    app.run()
