from flask import jsonify
from backend.models.menu_item import MenuItem

def get_menu_items():
    menu_items = MenuItem.query.all()
    return jsonify([{'id': item.id, 'name': item.name, 'description': item.description, 'price': item.price, 'image_url': item.image_url} for item in menu_items]), 200
