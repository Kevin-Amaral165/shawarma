import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const history = useHistory();

    const onFinish = (values: any) => {
        axios.post('/api/register', values)
            .then(response => {
                message.success('Registration successful!');
                history.push('/login');
            })
            .catch(error => {
                console.error('Error registering:', error);
                message.error('Registration failed.');
            });
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
            <h2>Register</h2>
            <Form
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    hasFeedback
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterPage;
