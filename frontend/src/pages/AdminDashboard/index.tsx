import React, { useEffect, useState } from 'react';
import { Layout, Menu, Table, Typography } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price',
            render: (price: number) => `R$${price.toFixed(2)}`,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<ShoppingOutlined />}>
                        Orders
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Title>Orders</Title>
                        <Table dataSource={orders} columns={columns} rowKey="id" />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
