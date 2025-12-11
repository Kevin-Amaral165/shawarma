from backend.app import app, db
from backend.models.user import User
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()

    admin_password = generate_password_hash('adminpass', method='pbkdf2:sha256')
    customer_password = generate_password_hash('customerpass', method='pbkdf2:sha256')

    admin = User(username='admin', password=admin_password, role='admin')
    customer = User(username='customer', password=customer_password, role='customer')

    db.session.add(admin)
    db.session.add(customer)

    db.session.commit()
