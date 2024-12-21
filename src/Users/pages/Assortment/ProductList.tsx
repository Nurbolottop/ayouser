import React, { useState } from "react";
import { Card, Col, Row, Button, Modal, Typography } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import useFetchData from "../../../hooks/useFetchData";
import { useParams } from "react-router-dom";

const { Title, Paragraph } = Typography;

export interface Product {
    id: number;
    organization: number;
    name: string;
    description: string;
    image: string;
    price: string;
    created_at: string;
    updated_at: string;
}

const ProductList: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { id } = useParams();
    const { data } = useFetchData(`https://ayo.webtm.ru/api/v1/organization/organization/${id}/`);

    const handleModalOpen = (product: Product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={[16, 24]} justify="start">
                {data?.products?.map((product: any) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                        <Card
                            hoverable
                            cover={<img height={300} style={{ objectFit: 'cover' }} alt={product.name} src={product.image} />}
                            actions={[
                                <Button
                                    key="view"
                                    type="primary"
                                    icon={<EyeOutlined />}
                                    onClick={() => handleModalOpen(product)}
                                    style={{
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    View Details
                                </Button>,
                            ]}
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                borderRadius: '10px',
                                transition: "all 0.3s ease",
                            }}
                        >
                            <Title level={4} style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                {product.name}
                            </Title>
                            <Paragraph style={{ color: '#555' }}>{product.description}</Paragraph>
                            <Paragraph strong style={{ color: '#1890ff' }}>{`$${product.price}`}</Paragraph>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                title={selectedProduct?.name}
                onCancel={handleModalClose}
                footer={null}
                width={800}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '40px',
                    justifyContent: 'space-between',
                }}
                style={{
                    borderRadius: '15px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                }}
                centered
                destroyOnClose
            >
                {selectedProduct && (
                    <div style={{ display: 'flex', gap: '20px' }}>
                        {/* Product Image */}
                        <div style={{
                            flex: '1',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        }}>
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                                height={400}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '15px',
                                    width: '100%',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </div>

                        {/* Product Details */}
                        <div style={{ flex: '1.5' }}>
                            <Typography>
                                <Title level={3} style={{ fontWeight: 700, color: '#333' }}>
                                    {selectedProduct.name}
                                </Title>
                                <Paragraph style={{ color: '#666', fontSize: '16px' }}>
                                    {selectedProduct.description}
                                </Paragraph>
                                <div style={{ marginTop: '20px' }}>
                                    <Title level={5} style={{ color: '#9b2821' }}>Price</Title>
                                    <Paragraph style={{ fontSize: '18px', fontWeight: 600, color: '#1890ff' }}>
                                        ${selectedProduct.price}
                                    </Paragraph>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Title level={5} style={{ color: '#9b2821' }}>Created At</Title>
                                    <Paragraph style={{ fontSize: '16px', color: '#555' }}>
                                        {new Date(selectedProduct.created_at).toLocaleString()}
                                    </Paragraph>
                                </div>
                            </Typography>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ProductList;
