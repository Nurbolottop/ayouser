import React, { useEffect, useState } from 'react';
import { List, Card, Button, Modal, Form, Input, Typography, message, Flex } from 'antd';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './UserPromoCode.scss';

const { Text, Title } = Typography;

interface PromoCode {
    id: number;
    organization_id: number;
    title: string;
    rebate: number;
    end_date: string;
    status: 'active' | 'inactive';
    qr_promo_url?: string; // QR code URL field
}

const UserPromoCodeComponent: React.FC = () => {
    const [activePromoCodes, setActivePromoCodes] = useState<PromoCode[]>([]);
    const [inactivePromoCodes, setInactivePromoCodes] = useState<PromoCode[]>([]);
    const [searchResult, setSearchResult] = useState<PromoCode | null>(null);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isQrModalOpen, setIsQrModalOpen] = useState(false);
    const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);

    const fetchUserPromoCodes = async () => {
        try {
            const response = await axios.get(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`);
            setActivePromoCodes(response.data.active_promocods);
            setInactivePromoCodes(response.data.inactive_promocods);
        } catch (error) {
            message.error('Failed to fetch user promo codes.');
        }
    };

    useEffect(() => {
        fetchUserPromoCodes();
    }, []);

    const handleSearchPromoCode = async (values: { title: string }) => {
        try {
            const response = await axios.post('https://ayo.webtm.ru/api/v1/promocode/search/', {
                title: values.title
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setSearchResult(response.data);
        } catch (error) {
            message.error('Promo code not found.');
        }
    };

    const handleActivatePromoCode = async () => {
        if (!searchResult) return;
        try {
            await axios.post('https://ayo.webtm.ru/api/v1/promocode/users/activepromocodes/', {
                user_id: Number(localStorage.getItem('user_id')),
                title: searchResult.title,
                rebate: searchResult.rebate,
                end_date: searchResult.end_date,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            message.success('Promo code activated successfully');
            fetchUserPromoCodes();
            setSearchResult(null);
            setIsSearchModalOpen(false);
        } catch (error) {
            message.error('Failed to activate promo code.');
        }
    };

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const openQrModal = (qrUrl: string) => {
        setQrImageUrl(qrUrl);
        setIsQrModalOpen(true);
    };

    return (
        <div style={{ padding: 20 }}>
            <Button type="primary" icon={<SearchOutlined />} onClick={openSearchModal} style={{ marginBottom: 20 }}>
            Add Promo Code
            </Button>
            <Flex gap={10} wrap>
                <div className="promo_list">
                    <Title level={4}>Active Promo Codes</Title>
                    <List
                        dataSource={activePromoCodes}
                        renderItem={(promoCode) => (
                            <List.Item style={{ width: '100%' }}>
                                <Card
                                    title={<>
                                        {promoCode.status === 'active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                                        <span style={{ marginLeft: 8 }}>{promoCode.title}</span>
                                    </>}
                                    bordered={false}
                                    hoverable
                                    onClick={() => promoCode.qr_promo_url && openQrModal(promoCode.qr_promo_url)}
                                    style={{
                                        width: '100%',
                                        borderRadius: '12px',
                                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <div style={{ padding: '20px' }}>
                                        <Text style={{ display: 'block', marginBottom: '10px' }}>
                                            <strong>Organization ID:</strong> {promoCode.organization_id}
                                        </Text>
                                        <Text style={{ display: 'block', marginBottom: '10px' }}>
                                            <strong>Discount (%):</strong> {promoCode.rebate}%
                                        </Text>
                                        <Text>
                                            <strong>End Date:</strong> {promoCode.end_date}
                                        </Text>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>

                <div className="promo_list">
                    <Title level={4}>Inactive Promo Codes</Title>
                    <List
                        dataSource={inactivePromoCodes}
                        renderItem={(promoCode) => (
                            <List.Item style={{ width: '100%' }}>
                                <Card
                                    title={<>
                                        {promoCode.status === 'active' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                                        <span style={{ marginLeft: 8 }}>{promoCode.title}</span>
                                    </>}
                                    bordered={false}
                                    hoverable
                                    onClick={() => promoCode.qr_promo_url && openQrModal(promoCode.qr_promo_url)}
                                    style={{
                                        width: '100%',
                                        borderRadius: '12px',
                                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        transition: 'transform 0.2s'
                                    }}
                                >
                                    <div style={{ padding: '20px' }}>
                                        <Text style={{ display: 'block', marginBottom: '10px' }}>
                                            <strong>Organization ID:</strong> {promoCode.organization_id}
                                        </Text>
                                        <Text style={{ display: 'block', marginBottom: '10px' }}>
                                            <strong>Discount (%):</strong> {promoCode.rebate}%
                                        </Text>
                                        <Text>
                                            <strong>End Date:</strong> {promoCode.end_date}
                                        </Text>
                                    </div>
                                </Card>
                            </List.Item>
                        )}
                    />
                </div>
            </Flex>

            {/* Modal for Search and Result Display */}
            <Modal
                title="Search Promo Code"
                visible={isSearchModalOpen}
                onCancel={() => setIsSearchModalOpen(false)}
                footer={null}
            >
                {!searchResult ? (
                    <Form onFinish={handleSearchPromoCode}>
                        <Form.Item name="title" label="Promo Code Title" rules={[{ required: true }]}>
                            <Input placeholder="Enter promo code title" />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            Search
                        </Button>
                    </Form>
                ) : (
                    <Card
                        bordered
                        style={{
                            borderRadius: '12px',
                            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
                            overflow: 'hidden',
                            marginTop: 20,
                        }}
                    >
                        <div style={{ padding: '20px' }}>
                            <Title level={5} style={{ textAlign: 'center', marginBottom: '15px' }}>
                                Promo Code: {searchResult.title}
                            </Title>
                            <Text style={{ display: 'block', marginBottom: '10px' }}>
                                <strong>Organization ID:</strong> {searchResult.organization_id}
                            </Text>
                            <Text style={{ display: 'block', marginBottom: '10px' }}>
                                <strong>Discount (%):</strong> {searchResult.rebate}%
                            </Text>
                            <Text style={{ display: 'block', marginBottom: '10px' }}>
                                <strong>End Date:</strong> {searchResult.end_date}
                            </Text>
                            <Button type="primary" style={{ width: '100%' }} onClick={handleActivatePromoCode}>
                                Activate Promo Code
                            </Button>
                        </div>
                    </Card>
                )}
            </Modal>

            {/* QR Code Modal */}
            <Modal
                title="Promo Code QR Code"
                visible={isQrModalOpen}
                onCancel={() => setIsQrModalOpen(false)}
                footer={null}
            >
                {qrImageUrl && <img src={`https://ayo.webtm.ru${qrImageUrl}`} alt="QR Code" style={{ width: '100%' }} />}
            </Modal>
        </div>
    );
};

export default UserPromoCodeComponent
