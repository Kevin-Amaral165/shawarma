from flask import jsonify, request
from backend.models.order import Order, OrderItem
from backend.models.user import db
from backend.models.menu_item import MenuItem

def create_order():
    data = request.get_json()
    user_id = data.get('user_id')
    items = data.get('items')

    if not user_id or not items:
        return jsonify({'message': 'Missing user_id or items'}), 400

    total_price = 0
    for item in items:
        menu_item = MenuItem.query.get(item.get('id'))
        if not menu_item:
            return jsonify({'message': f"Menu item with id {item.get('id')} not found"}), 404
        total_price += menu_item.price * item.get('quantity')

    new_order = Order(user_id=user_id, total_price=total_price)
    db.session.add(new_order)
    db.session.commit()

    for item in items:
        order_item = OrderItem(
            order_id=new_order.id,
            menu_item_id=item.get('id'),
            quantity=item.get('quantity'),
            price=MenuItem.query.get(item.get('id')).price
        )
        db.session.add(order_item)

    db.session.commit()

    return jsonify({'message': 'Order created successfully', 'order_id': new_order.id}), 201

def get_orders():
    orders = Order.query.all()
    result = []
    for order in orders:
        items = []
        for item in order.items:
            menu_item = MenuItem.query.get(item.menu_item_id)
            items.append({
                'id': item.id,
                'name': menu_item.name,
                'quantity': item.quantity,
                'price': item.price
            })
        result.append({
            'id': order.id,
            'user_id': order.user_id,
            'status': order.status,
            'total_price': order.total_price,
            'created_at': order.created_at,
            'items': items
        })
    return jsonify(result), 200
