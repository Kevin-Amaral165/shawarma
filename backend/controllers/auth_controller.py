from flask import request, jsonify
from backend.models.user import User
from werkzeug.security import check_password_hash

def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful', 'role': user.role}), 200

    return jsonify({'message': 'Invalid credentials'}), 401
