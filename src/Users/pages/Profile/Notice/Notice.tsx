import React from "react";
import { Card, Button, Row, Col, Empty, Flex, Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import logo from "../../../../img/LogoNotice.svg";
import image from "../../../../img/image.png";
import empty from "../../../../img/Exclamation.png";

import "./Notice.scss";
import Application from "../../../../components/Application/Application";

const Notice = () => {
  const notices = [
    {
      "id": 8,
      "image": "https://ayo.webtm.ru/media/mailing_image/234.webp",
      "title": "NURBOLOT",
      "description": "lorem ipsum",
      "created_at": "2024-10-29T19:22:44.570842Z",
      "organization_id": 2
    },
    {
      "id": 9,
      "image": "https://ayo.webtm.ru/media/mailing_image/444243_QTKX4Eu.webp",
      "title": "234",
      "description": "234",
      "created_at": "2024-10-29T19:27:32.717982Z",
      "organization_id": 2
    },
    {
      "id": 10,
      "image": "https://ayo.webtm.ru/media/mailing_image/123.webp",
      "title": "234",
      "description": "234",
      "created_at": "2024-10-29T19:28:13.770951Z",
      "organization_id": 2
    }
  ];

  return (
    <div className="notice">
      <h2 className="data__title">Notifications</h2>
      {notices.length === 0 ? (
        <div className="notice__empty">
          <Empty description="You currently have no notifications" />
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            className="data__save"
          >
            Home
          </Button>
        </div>
      ) : (
        <Flex wrap="wrap" gap={10}>
          {notices.map((notice) => (
            <Card
              hoverable
              className="notice__card"
              key={notice.id}
            >
              <Card.Meta
                avatar={<Avatar size={64} src={notice.image} alt="" />}
                title={notice.title}
                description={
                  <>
                    <span className="notice__date">{notice.created_at}</span>
                  </>
                }
              />
              <br />
              <Flex wrap="wrap" gap={10}>
                <img width="30%" src={notice.image} alt="" style={{borderRadius:'10px'}} />
                
                <b>{notice.title}</b>
                <p className="notice__content-text">{notice.description}</p>

              </Flex>
            </Card>
          ))}
        </Flex>
      )}
    </div>
  );
};

export default Notice;
