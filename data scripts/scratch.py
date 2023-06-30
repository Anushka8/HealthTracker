from flask import Flask, jsonify, request, session
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session encryption
CORS(app, supports_credentials=True, resources=r'/api/*')


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('email')
    password = data.get('password')

    # Perform authentication logic here
    # ...

    # Assuming authentication is successful
    session['user_id'] = 123
    session['username'] = username

    return jsonify({'message': 'Login successful'})


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    session.pop('username', None)
    return jsonify({'message': 'Logout successful'})


@app.route('/user', methods=['GET'])
def get_user():
    user_id = session.get('user_id')
    username = session.get('username')
    print(session)
    if user_id and username:
        # Fetch user data based on user_id or username
        # ...
        user_data = {'id': user_id, 'name': 'John Doe'}
        return jsonify(user_data)

    return jsonify({'message': 'User not found'})


if __name__ == '__main__':
    app.run()
