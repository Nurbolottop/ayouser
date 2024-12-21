import React, { useState } from 'react';
import { Button, Card, Input, message, Modal, QRCode } from 'antd';
import { GiftOutlined, PercentageOutlined, DollarOutlined, CopyOutlined, ScanOutlined } from '@ant-design/icons';
import './CompanyCard.scss';

const BonusCard: React.FC = () => {
    const [discountCode] = useState("DISCOUNT2024");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(discountCode);
        message.success("Код скопирован: " + discountCode);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="bonus-card-container">
            <Card className="bonus-card" bordered={false}>
                <div className="bonus-info">
                    <GiftOutlined className="bonus-icon" />
                    <div className="bonus-details">
                        <span>Приветственные баллы</span>
                        <Input value="Ø Б" readOnly className="bonus-input" />
                    </div>
                </div>
            </Card>

            <Card className="bonus-card" bordered={false}>
                <div className="bonus-info">
                    <PercentageOutlined className="bonus-icon" />
                    <div className="bonus-details">
                        <span>Списание баллами</span>
                        <Input value="Ø %" readOnly className="bonus-input" />
                    </div>
                </div>
            </Card>

            <Card className="bonus-card" bordered={false}>
                <div className="bonus-info">
                    <DollarOutlined className="bonus-icon" />
                    <div className="bonus-details">
                        <span>Кешбек</span>
                        <Input value="Ø %" readOnly className="bonus-input" />
                    </div>
                </div>
            </Card>

            <Card className="bonus-card" bordered={false}>
                <div className="bonus-info">
                    <CopyOutlined className="bonus-icon" />
                    <div className="bonus-details">
                        <span>Код скидки</span>
                        <Button type="primary" onClick={showModal} className="scan-button">
                            <ScanOutlined style={{ color: 'white' }} />
                        </Button>
                    </div>
                </div>
            </Card>

            <Modal title="Ваш QR-код" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <div className="modal-content">
                    <QRCode size={300} value={discountCode} />
                    <p>{discountCode}</p>
                </div>
            </Modal>
        </div>
    );
};

export default BonusCard;
