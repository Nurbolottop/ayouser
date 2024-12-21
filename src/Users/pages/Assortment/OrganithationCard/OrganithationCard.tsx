import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Avatar, Typography, Space, Button, Tag, Image, Tooltip, Badge, Flex, FloatButton, message } from 'antd';
import {
    InstagramOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    FacebookOutlined,
    TwitterOutlined,
    MessageOutlined,
} from '@ant-design/icons';
import './InteractiveComponent.scss';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

interface Product {
    id: number;
    organization: number;
    name: string;
    description: string;
    image: string;
    price: string;
}

interface InteractiveComponentProps {
    data: {
        company_name: string;
        description: string;
        locate: string;
        hours: string;
        days: string;
        organization_image: string;
        email: string;
        phone_number: string;
        instagram?: string;
        banner: string;
        products: Product[];
    };
}

const InteractiveComponent: React.FC<any> = ({ data }) => {
    const [cashback, setCashback] = useState<any>()
    const { id } = useParams()
    const [rebate, setRebate] = useState<any>(); // Cashback
    const navigate = useNavigate()
    const handleCreateChat = async () => {
        try {
            const res = await axios.post(`https://ayo.webtm.ru/api/v1/chat/chats/`, {
                "user_id": Number(localStorage.getItem('user_id')),
                "organization_id": Number(id)

            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('access_token'),
                }
            })
            console.log(res);

            navigate(`/profile/chat/${res.data.id}`)
        } catch (error) {
            message.warning('chat already in chats')
            navigate('/profile/message')

        }
    }
    useEffect(() => {

        const fetchRebate = async () => {
            try {
                const response = await fetch('https://ayo.webtm.ru/api/v1/users/calculate_wallet_and_cashback/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: localStorage.getItem('user_id'),
                        organization_id: id// Organization ID
                    })
                });

                const data = await response.json();
                setRebate(data)

            } catch (error) {
                console.error('Error fetching cashback percentage:', error);
                message.error('Error sending request to the server');
            }
        };
        if (localStorage.getItem('user_id')) {
            fetchRebate();

        }
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.post('https://ayo.webtm.ru/api/v1/users/cashback-requests/', {
                organization: id
            }, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            message.success('Successfully sent cashback request')
        } catch (error) {

        }
    }
    return (
        <div className="interactive-component">
            <div className="banner-section" style={{ backgroundImage: `url(${data.banner})` }}>
                <div className="overlay">
                    <Avatar src={data.organization_image} size={80} className="company-avatar" />
                    <Title level={2} className="company-name">{data.company_name}</Title>
                    <Text className="company-description">{data.description}</Text>
                    <br /><br />
                    <Space size={20} className="social-links">
                        {data.instagram && (
                            <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                                <InstagramOutlined style={{ fontSize: '24px', color: '#E1306C' }} />
                            </a>
                        )}
                        {data.facebook && (
                            <a href={data.facebook} target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined style={{ fontSize: '24px', color: '#4267B2' }} />
                            </a>
                        )}
                        {data.twitter && (
                            <a href={data.twitter} target="_blank" rel="noopener noreferrer">
                                <TwitterOutlined style={{ fontSize: '24px', color: '#1DA1F2' }} />
                            </a>
                        )}
                        <Tooltip title="Chat">
                            <MessageOutlined onClick={handleCreateChat} style={{ fontSize: '24px', color: '#fff' }} />
                        </Tooltip>
                    </Space>
                </div>

            </div>

            <div className="details-section">
                <div className='sexconatinerinfo' >
                    <div style={{
                        width: '100%',
                        borderRadius: '10px',
                        boxShadow: "6px 8px 7px 0px rgba(0,0,0,0.25)"
                    }}>
                        <a target='_blank' href={data.locate_urls}>
                            <Card style={{ background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfD9Nty-7-7Cg5zAe67qSrGk8HkTKbmbqZdg&s)left/cover' }} className="info-card">
                                <EnvironmentOutlined />
                                <Text>{data.locate}</Text>
                            </Card>
                        </a>

                    </div>
                    <div style={{
                        width: '100%',
                        borderRadius: '10px',
                        boxShadow: "6px 8px 7px 0px rgba(0,0,0,0.25)"
                    }}>

                        <Card style={{ background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DjMK_FxpWL0q_bXOerxsdJKTmRhgTuaSnw&s)left/cover' }} className="info-card">
                            <ClockCircleOutlined />
                            <Text>{data.hours} ({data.days})</Text>
                        </Card>
                    </div>
                    <div style={{
                        width: '100%',
                        borderRadius: '10px',
                        boxShadow: "6px 8px 7px 0px rgba(0,0,0,0.25)"
                    }}>

                        <Card style={{ background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFGAByWcDDjJB-j1N6QFC_IqCX8X1iIOqMFA&s)center/cover' }} className="info-card">
                            <PhoneOutlined />
                            <Text>{data.phone_number}</Text>
                        </Card>
                    </div>
                    <div style={{
                        width: '100%',
                        borderRadius: '10px',
                        boxShadow: "6px 8px 7px 0px rgba(0,0,0,0.25)"
                    }}>
                        <Card style={{ background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQxJxjtJzUVzFLgG16PyEUnoFPnRkamfOvQ&s)center/cover' }} className="info-card">
                            <MailOutlined />
                            <Text>{data.email}</Text>
                        </Card>
                    </div>
                    {
                        localStorage.getItem('user_id') && <div style={{
                            width: '100%',
                            borderRadius: '10px',
                            boxShadow: "6px 8px 7px 0px rgba(0,0,0,0.25)"
                        }}>
                            <Card style={{ background: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOvoUAGqINNKUBSX5oZee43z69USepDLxIpA&s)center/cover' }} className="info-card">
                                <MailOutlined />
                                <Text>cashback: {rebate?.cashback}</Text>
                                <Text>wallet balance: {rebate?.wallet_balance}</Text>
                                <Button onClick={sendRequest}>request cashback</Button>
                            </Card>
                        </div>
                    }

                </div>
            </div >

            <div className="products-section">
                <Title level={3} className="products-title">Explore Our Products</Title>
                <Row gutter={[16, 16]}>
                    {data?.products?.map((product: any) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Badge.Ribbon text="Featured" color="red">

                                <Card
                                    className="product-card"
                                    hoverable
                                    style={{ background: `url(${product.image})center/cover` }}
                                >
                                    <div className="product-content">
                                        <Title level={4} className="product-title">{product.name}</Title>
                                        <Text className="product-description">{product.description}</Text>
                                        <div className="price-section">
                                            <Tag color='magenta' className="product-price">${product.price}</Tag>
                                        </div>
                                    </div>
                                </Card>
                            </Badge.Ribbon>

                        </Col>
                    ))}
                </Row>
            </div>
            <FloatButton
                shape="circle"
                type="primary"
                onClick={handleCreateChat}
                style={{ insetInlineEnd: 94 }}
                icon={<MessageOutlined />}
            />
        </div >
    );
};

export default InteractiveComponent;
