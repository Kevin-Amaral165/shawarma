from flask import Flask, jsonify

from models.user import db
from models.menu_item import MenuItem
from models.order import Order

from controllers.auth_controller import login, register
from controllers.menu_item_controller import get_menu_items
from controllers.order_controller import create_order, get_orders


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/login', methods=['POST'])
def login_route():
    return login()

@app.route('/api/register', methods=['POST'])
def register_route():
    return register()

@app.route('/api/admin/dashboard')
def admin_dashboard():
    return jsonify({'message': 'Welcome Admin'})

@app.route('/api/customer/dashboard')
def customer_dashboard():
    return jsonify({'message': 'Welcome Customer'})

@app.route('/api/menu-items', methods=['GET'])
def get_menu_items_route():
    return get_menu_items()

@app.route('/api/orders', methods=['POST'])
def create_order_route():
    return create_order()

@app.route('/api/orders', methods=['GET'])
def get_orders_route():
    return get_orders()

if __name__ == '__main__':
    app.run(debug=True)
