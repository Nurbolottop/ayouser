import React, { useState } from 'react';
import { Card, Button, Flex } from 'antd';
import './CompanyCard.scss';

const products = [
    {
        id: 1,
        name: 'Название товара',
        price: '1600 сом',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoUpeWo_oGSGN0X_2kmGWbnZ9kgwazv4lyCg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmlYkDqG8AoFfOhW_C14bZMEARJS4FvX23Ng&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWX0UzEqNf26gNxTtJgXDLgC0GzY6xDCMAqg&s'
        ]
    },
    {
        id: 2,
        name: 'Название товара',
        price: '1600 сом',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoUpeWo_oGSGN0X_2kmGWbnZ9kgwazv4lyCg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmlYkDqG8AoFfOhW_C14bZMEARJS4FvX23Ng&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWX0UzEqNf26gNxTtJgXDLgC0GzY6xDCMAqg&s'
        ]
    },
    {
        id: 3,
        name: 'Название товара',
        price: '1600 сом',
        description: 'Lorem ipsum dolor sit amet consectetur.',
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoUpeWo_oGSGN0X_2kmGWbnZ9kgwazv4lyCg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmlYkDqG8AoFfOhW_C14bZMEARJS4FvX23Ng&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWX0UzEqNf26gNxTtJgXDLgC0GzY6xDCMAqg&s'
        ]
    }
];

const ProductGrid: React.FC = () => {
    return (
        <div className="product-grid">
            <h2>Ассортимент</h2>
            <div className="product-grid-container">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

interface ProductCardProps {
    product: {
        id: number;
        name: string;
        price: string;
        description: string;
        images: string[];
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    return (
        <Card style={{ padding: '0' }} className="product-card" bordered={false}>
            <div className="product-image-wrapper">
                <img src={product.images[currentImageIndex]} alt={product.name} className="product-image" />
                <span className="image-counter">
                    {currentImageIndex + 1}/{product.images.length}
                </span>
                <div className="image-actions">
                    <Button shape="circle" className="action-btn" onClick={handlePrevImage}>
                        -
                    </Button>
                    <Button shape="circle" className="action-btn" onClick={handleNextImage}>
                        +
                    </Button>
                </div>
            </div>
            <div className="product-info">

                <div>
                    <span className="product-name">{product.name}</span>

                    <p className="product-description">{product.description}</p>
                </div>
                <span className="product-price">{product.price}</span>

            </div>
        </Card>
    );
};

export default ProductGrid;
