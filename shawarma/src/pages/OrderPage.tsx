import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Typography, message, Spin, Alert } from 'antd';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { CartContainer } from './styles';

const { Title } = Typography;

interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

interface CartItem extends MenuItem {
    quantity: number;
}

const OrderPage: React.FC = () => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get<MenuItem[]>('/api/menu-items');
                setMenuItems(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching menu items:', err);
                setError('Failed to load menu items. Please try again later.');
                message.error('Failed to load menu items.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const addToCart = (item: MenuItem) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
        message.success(`${item.name} added to cart!`);
    };

    const placeOrder = async () => {
        if (!user) {
            message.error('You must be logged in to place an order.');
            return;
        }

        try {
            const orderData = {
                user_id: user.id,
                items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
            };
            await axios.post('/api/orders', orderData);
            message.success('Order placed successfully!');
            setCart([]);
        } catch (err) {
            console.error('Error placing order:', err);
            message.error('Failed to place order.');
        }
    };

    if (loading) {
        return <Spin size="large" style={{ display: 'block', marginTop: '50px' }} />;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon style={{ margin: '20px' }} />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <Title level={4}>Admin Credentials</Title>
                <p>Username: admin</p>
                <p>Password: admin_password</p>
            </div>
            <Title>Menu</Title>
            <Row gutter={[16, 16]}>
                {menuItems.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            title={item.name}
                            cover={<img alt={item.name} src={item.image_url || 'https://via.placeholder.com/150'} />}
                            actions={[
                                <Button type="primary" onClick={() => addToCart(item)}>
                                    Add to Cart
                                </Button>
                            ]}
                        >
                            <Card.Meta
                                description={item.description}
                            />
                            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
                                R${item.price.toFixed(2)}
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
            <CartContainer>
                <Title level={4}>Cart</Title>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {cart.map((item) => (
                                <li key={item.id} style={{ marginBottom: '10px' }}>
                                    {item.name} x{item.quantity} - R${(item.price * item.quantity).toFixed(2)}
                                </li>
                            ))}
                        </ul>
                        <Title level={5}>
                            Total: R${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </Title>
                        <Button type="primary" onClick={placeOrder} disabled={cart.length === 0}>
                            Place Order
                        </Button>
                    </>
                )}
            </CartContainer>
        </div>
    );
};

export default OrderPage;
