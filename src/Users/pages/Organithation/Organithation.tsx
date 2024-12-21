import React from 'react';
import { Button, Flex } from 'antd';
import { ArrowLeftOutlined, ShareAltOutlined, InfoCircleOutlined } from '@ant-design/icons';
import './CompanyCard.scss';

const CompanyCard: React.FC = () => {
    return (
        <div className="company-card">
            <div className="company-card-header">
                <Button icon={<ArrowLeftOutlined />} className="back-btn" />
                <div className="company-info">
                    <span className="company-logo-placeholder"></span>
                    <span className="company-name">Название компании</span>
                </div>
                <span className="company-category">Категория компании</span>
            </div>

            <div className="company-logo">
                <div className="logo-placeholder">
                    (Картинка компании / лого)
                </div>
                <div className="logo-actions">
                    <ShareAltOutlined className="action-icon" />
                    <InfoCircleOutlined className="action-icon" />
                </div>
            </div>
            <Flex>
                <div className="company-description">
                    Lorem ipsum dolor sit amet consectetur. Nibh imperdiet pellentesque nisi vulputate quis consectetur lobortis.
                </div>

                <div className="company-buttons">
                    <Button className="social-button" type="primary">INSTAGRAM</Button>
                    <Button className="social-button" type="primary">TIK TOK</Button>
                    <Button className="social-button" type="primary">Написать</Button>

                </div>
            </Flex>

        </div>
    );
};

export default CompanyCard;
