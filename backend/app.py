from flask import Flask, jsonify
from backend.models.user import db
from backend.controllers.auth_controller import login

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/users.db'
db.init_app(app)

@app.route('/api/login', methods=['POST'])
def login_route():
    return login()

@app.route('/api/admin/dashboard')
def admin_dashboard():
    return jsonify({'message': 'Welcome Admin'})

@app.route('/api/customer/dashboard')
def customer_dashboard():
    return jsonify({'message': 'Welcome Customer'})

if __name__ == '__main__':
    app.run(debug=True)
