from app import app
from models.user import db, User
from models.menu_item import MenuItem
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()

    users = [
        {'username': 'admin', 'password': 'admin_password', 'role': 'admin'},
        {'username': 'customer1', 'password': 'customer1_password', 'role': 'customer'},
        {'username': 'customer2', 'password': 'customer2_password', 'role': 'customer'}
    ]

    for user_data in users:
        hashed_password = generate_password_hash(user_data['password'], method='pbkdf2:sha256')
        new_user = User(username=user_data['username'], password=hashed_password, role=user_data['role'])
        db.session.add(new_user)

    menu_items = [
        {'name': 'Shawarma de Carne', 'description': 'Delicioso shawarma de carne com pão sírio, alface, tomate, cebola e molho de alho.', 'price': 25.00, 'image_url': 'https://via.placeholder.com/150'},
        {'name': 'Shawarma de Frango', 'description': 'Shawarma de frango suculento com batata frita, salada e molho especial.', 'price': 22.00, 'image_url': 'https://via.placeholder.com/150'},
        {'name': 'Kibe', 'description': 'Porção com 6 unidades de kibe frito.', 'price': 15.00, 'image_url': 'https://via.placeholder.com/150'},
        {'name': 'Falafel', 'description': 'Sanduíche de falafel com salada e molho tahine.', 'price': 20.00, 'image_url': 'https://via.placeholder.com/150'}
    ]

    for item_data in menu_items:
        new_item = MenuItem(name=item_data['name'], description=item_data['description'], price=item_data['price'], image_url=item_data['image_url'])
        db.session.add(new_item)

    db.session.commit()
