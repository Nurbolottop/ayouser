import React, { useState } from "react";
import { Card, Button, Typography } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import image from "./image.png";
import "./Cart.scss";
import Skoro from "../../../../components/Skoro/Skoro";

const { Title, Paragraph } = Typography;

const Cart = () => {
  const [quantities, setQuantities] = useState([1, 1, 1]);

  const handleQuantityChange = (index: number, action: string) => {
    const updatedQuantities = [...quantities];
    if (action === "increase") {
      updatedQuantities[index] += 1;
    } else if (action === "decrease" && updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
    }
    setQuantities(updatedQuantities);
  };

  return (
    <div className="cart" style={{ position: 'relative' }}>
      <Skoro />
      <Title level={2} className="data__title">
        My Cart
      </Title>

      <div className="cart__content">
        {[0, 1, 2].map((index) => (
          <Card className="cart__content-item" key={index}>
            <div className="cart__item-flex">
              <div className="cart__item-image">
                <img src={image} width={300} className="cart__content-img" alt="Product" />
              </div>

              <div className="cart__item-info">
                <Title level={4} className="cart__content-title">
                  Product Name
                  <Paragraph className="cart__content-text">
                    Product Information
                  </Paragraph>
                </Title>

                <Paragraph className="cart__content-price">1600 KGS</Paragraph>
              </div>

              <div className="cart__item-quantity">
                <div className="cart__quantity-controls">
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={() => handleQuantityChange(index, "increase")}
                    className="quantity-button"
                  />
                  <Button type="text" className="cart__quantity-value">
                    {quantities[index]}
                  </Button>
                  <Button
                    type="text"
                    icon={<MinusOutlined />}
                    onClick={() => handleQuantityChange(index, "decrease")}
                    className="quantity-button"
                    disabled={quantities[index] === 1}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Final button to place an order */}
        <Button type="primary" className="cart__content-total">
          <div className="cart__total-flex">
            <span>Place Order</span>
            <span>Total: 1390 $</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
