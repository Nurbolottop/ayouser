import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Typography, Card as AntCard, Carousel as AntCarousel, Row, Col, Avatar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import useFetchData2 from "../../../../hooks/useFetchData copy";

const { Title } = Typography;

const Card: FC<any> = ({ item }) => (
  <Link to={`/Assortment/${item?.id}`}>
    <AntCard
      hoverable
      cover={
        <div
          style={{
            backgroundImage: `url(${item?.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
            borderRadius: "8px",
          }}
        />
      }
    >

      <AntCard.Meta avatar={<Avatar src={item?.organization_image} />} title={item?.company_name} description={item?.description} />
    </AntCard>
  </Link>
);

const Carousel: FC<any> = ({ items }) => (
  <AntCarousel
    dots={false}
    arrows

    slidesToShow={3}
    nextArrow={<div></div>}
    prevArrow={<div></div>}
    responsive={[
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
    ]}
  >
    {items.map((item: any, i: number) => (
      <div className="secslideritem" style={{
        width: '90%', transform: "scale(0.9)"
      }} key={i}>
        <Card item={item} />
      </div>
    ))}
  </AntCarousel>
);

const Org = () => {
  const { data } = useFetchData2(
    "https://ayo.webtm.ru/api/v1/organization/organization/"
  );

  const filteredItems = data?.filter((item: any) => item.true === true) || [];

  return (
    <div className="Org container">
      <Row gutter={[16, 32]}>
        <Col span={24}>
          <Title level={2}>Organizations</Title>
          <Carousel items={filteredItems} />
        </Col>
        <Col span={24}>
          <Title level={2}>Recommended Organizations</Title>
          <Carousel items={filteredItems} />
        </Col>
      </Row>
    </div>
  );
};

export default Org;
