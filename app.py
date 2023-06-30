import json
import os
import uuid

from flask import Flask, jsonify, request, session, send_from_directory
from cassandra.cluster import Cluster
from passlib.hash import bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from cassandra.query import SimpleStatement, named_tuple_factory

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_SAMESITE'] = None
CORS(app, supports_credentials=True)
cluster = Cluster()  # create a cluster object
cassandra_session = cluster.connect(keyspace='health_tracker')  # connect to

Session(app)


# keyspace

@app.route('/login', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def login():
    if request.method == 'POST':
        data = request.get_json()
        username = data.get('email')
        password = data.get('password')

        # Retrieve user data from Cassandra
        # Retrieve the hashed password from Cassandra
        result = cassandra_session.execute("""
                SELECT * FROM user WHERE email = '{}' ALLOW 
                FILTERING 
            """.format(username))
        user_email = result.one()

        # Retrieve the hashed password from Cassandra
        result = cassandra_session.execute("""
                    SELECT * FROM user WHERE username = '{}' ALLOW 
                    FILTERING 
                """.format(username))
        user_username = result.one()

        if user_email or user_username:
            user = user_email if user_email else user_username
            session['user_id'] = str(user.user_id)
            session.modified = True
            hashed_password = user.password_hash

            if bcrypt.verify(password, hashed_password):
                response = {'message': 'Login successful'}
            else:
                response = {'message': 'Login failed'}
        else:
            # Invalid username or password
            response = {'message': 'Login failed'}
        print(session)
        return jsonify(response)


@app.route('/data')
@cross_origin(supports_credentials=True)
def dashboard():
    print(session)
    # Retrieve the UUID from the Flask session
    cassandra_uuid_str = session.get('user_id')

    # Convert the string UUID to a uuid.UUID object
    cassandra_uuid = uuid.UUID(cassandra_uuid_str)

    # Retrieve user information
    user_row = cassandra_session.execute("SELECT * FROM user WHERE "
                                         "user_id = %s",
                                         [cassandra_uuid]).one()

    # Retrieve activity data
    activity_rows = cassandra_session.execute("SELECT * FROM activity WHERE "
                                              "user_id = %s",
                                              [cassandra_uuid]).all()

    # Retrieve heart rate data
    heart_rate_rows = cassandra_session.execute(
        "SELECT * FROM heart_rate WHERE "
        "user_id = %s", [cassandra_uuid]).all()

    # Retrieve sleep data
    sleep_rows = cassandra_session.execute("SELECT * FROM sleep WHERE "
                                           "user_id = %s",
                                           [cassandra_uuid]).all()

    # Retrieve weight data
    weight_rows = cassandra_session.execute("SELECT * FROM weight WHERE "
                                            "user_id = %s",
                                            [cassandra_uuid]).all()

    activity_rows = [row._replace(activity_id=str(row.activity_id)) for row in
                     activity_rows]
    heart_rate_rows = [row._replace(heart_rate_id=str(row.heart_rate_id)) for
                       row in heart_rate_rows]
    sleep_rows = [row._replace(sleep_id=str(row.sleep_id)) for row in
                  sleep_rows]
    weight_rows = [row._replace(weight_id=str(row.weight_id)) for row in
                   weight_rows]

    user_row = user_row._replace(user_id=str(user_row.user_id))
    user_row = user_row._replace(dob=str(user_row.dob))
    activity_rows = [row._replace(user_id=str(row.user_id)) for row in
                     activity_rows]
    heart_rate_rows = [row._replace(user_id=str(row.user_id)) for
                       row in heart_rate_rows]
    sleep_rows = [row._replace(user_id=str(row.user_id)) for row in
                  sleep_rows]
    weight_rows = [row._replace(user_id=str(row.user_id)) for row in
                   weight_rows]

    # Create a dictionary to store the results
    result = {
        'user': user_row._asdict(),
        'activity': [row._asdict() for row in activity_rows],
        'heart_rate': [row._asdict() for row in heart_rate_rows],
        'sleep': [row._asdict() for row in sleep_rows],
        'weight': [row._asdict() for row in weight_rows]
    }

    # Return the JSON response
    return jsonify(result)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("frontend/build/" + path):
        return send_from_directory("frontend/build", path)
    else:
        return send_from_directory("frontend/build", "index.html")


if __name__ == '__main__':
    app.secret_key = 'your_secret_key'
    app.run()
