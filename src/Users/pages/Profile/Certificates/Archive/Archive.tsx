import React from "react";
import { Card, Button, Empty, Row, Col, Typography, Tag } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import empty from "../../../../../img/messageEmpty.png";
import logo from "../../../../../img/LogoNotice.svg";
import image from "../../../../../img/icons/Rectangle 4443.png";

const { Title, Text } = Typography;

const Archive = () => {
  const orders = [
    {
      id: 1,
      title: "Organization",
      text: "Lorem ipsum",
      date: "06/09/2024",
      status: "Архив",
      logo: logo,
      image: image,
    },
    {
      id: 2,
      title: "Organization",
      text: "Lorem ipsum",
      date: "06/09/2024",
      status: "Архив",
      logo: logo,
      image: image,
    },
    {
      id: 1,
      title: "Organization",
      text: "Lorem ipsum",
      date: "06/09/2024",
      status: "Архив",
      logo: logo,
      image: image,
    },
    {
      id: 2,
      title: "Organization",
      text: "Lorem ipsum",
      date: "06/09/2024",
      status: "Архив",
      logo: logo,
      image: image,
    },
  ];

  return (
    <>
      {orders.length === 0 ? (
        <Empty
          description={<span>У вас пока что нет сертификатов в архиве</span>}
          image={empty}
        >
          <Button type="primary">Главная</Button>
        </Empty>
      ) : (
        <Row gutter={[16, 16]}>
          {orders.map((order) => (
            <Col xs={24} md={12} key={order.id}>
              <Card
                hoverable
                cover={<img alt={order.title} src={order.image} />}
                // actions={[
                //   <Button type="primary" icon={<FileDoneOutlined />}>
                //     Подробнее
                //   </Button>,
                // ]}
              >
                <Card.Meta
                  avatar={<img src={order.logo} alt="logo" style={{ width: 40 }} />}
                  title={<Title level={4}>{order.title}</Title>}
                  description={
                    <>
                      <Text>{order.text}</Text>
                      <br />
                      <Tag color="magenta">{order.status}</Tag>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Archive;
