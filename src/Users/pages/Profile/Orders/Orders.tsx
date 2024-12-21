import React from "react";
import { Card, Button, Empty, Row, Col, Typography } from "antd";
import { CheckOutlined, HomeOutlined } from "@ant-design/icons";
import logo from "../../../../img/LogoNotice.svg";
import image from "../../../../img/image.png";
import empty from "../../../../img/Exclamation.png";
import Application from "../../../../components/Application/Application";
import "./Orders.scss";
import Skoro from "../../../../components/Skoro/Skoro";

const { Title, Paragraph } = Typography;

const Orders = () => {
  const orders = [
    {
      id: 1,
      title: "Organization",
      text: "Lorem ipsum dolor sit amet consectetur. Bibendum lacus orci sagittis vitae tristique massa.",
      date: "06/09/2024",
      time: "09:30 am",
      logo: logo,
      image: image,
    },
    {
      id: 2,
      title: "Organization",
      text: "Lorem ipsum dolor sit amet consectetur. Bibendum lacus orci sagittis vitae tristique massa.",
      date: "06/09/2024",
      time: "09:30 am",
      logo: logo,
      image: image,
    },
    {
      id: 3,
      title: "Organization",
      text: "Lorem ipsum dolor sit amet consectetur. Bibendum lacus orci sagittis vitae tristique massa.",
      date: "06/09/2024",
      time: "09:30 am",
      logo: logo,
      image: image,
    },
    {
      id: 4,
      title: "Organization",
      text: "Lorem ipsum dolor sit amet consectetur. Bibendum lacus orci sagittis vitae tristique massa.",
      date: "06/09/2024",
      time: "09:30 am",
      logo: logo,
      image: image,
    },
  ];

  return (
    <div className="orders" style={{ position: 'relative' }}>
      <Skoro />
      <Title level={2} className="data__title">
        My Orders
      </Title>

      {orders.length === 0 ? (
        <div className="orders__empty">
          <Empty description="You haven't ordered anything yet" image={empty} />
          <Button
            type="primary"
            icon={<HomeOutlined />}
            size="large"
            className="data__save"
            onClick={() => console.log("Navigate to home")}
          >
            Home
          </Button>
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {orders.map((order) => (
            <Col key={order.id} xs={24} sm={24} md={12}>
              <Card
                className="orders__card"
                cover={<img alt="example" src={order.image} />}
                actions={[
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    className="orders__btn"
                  >
                    Completed
                  </Button>,
                ]}
              >
                <Card.Meta
                  avatar={<img src={order.logo} alt="Logo" className="orders__logo" />}
                  title={order.title}
                  description={
                    <>
                      <Paragraph>{order.text}</Paragraph>
                      <Paragraph>
                        <strong>Date:</strong> {order.date}
                      </Paragraph>
                      <Paragraph>
                        <strong>Time:</strong> {order.time}
                      </Paragraph>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

    </div>
  );
};

export default Orders;
