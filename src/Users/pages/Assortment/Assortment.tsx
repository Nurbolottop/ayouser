import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Typography,
  Tooltip,
  Image,
  Modal,
} from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  LeftOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  SendOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import useFetchData2 from "../../../hooks/useFetchData copy";
import "./Assortment.scss";
import ProductList from "./ProductList";
import InteractiveComponent from "./OrganithationCard/OrganithationCard";

const { Title, Text } = Typography;

const socialMediaMap = [
  { key: "facebook", label: "Facebook", icon: <FacebookOutlined /> },
  { key: "instagram", label: "Instagram", icon: <InstagramOutlined /> },
  { key: "twitter", label: "Twitter", icon: <TwitterOutlined /> },
  { key: "telegram", label: "Telegram", icon: <SendOutlined /> },
  { key: "youtube", label: "YouTube", icon: <YoutubeOutlined /> },
  { key: "linkedin", label: "LinkedIn", icon: <LinkedinOutlined /> },
];

const Assortment = () => {
  const { id } = useParams();
  const { data } = useFetchData2(
    `https://ayo.webtm.ru/api/v1/organization/organization/${id}/`
  );
  const { data: user } = useFetchData(
    `https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem(
      "user_id"
    )}/`
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data: banner } = useFetchData('https://ayo.webtm.ru/api/v1/cms/settings/')

  const usageData = user?.analytics?.find(
    (item: any) => item.organization === Number(id)
  );
  const navigate = useNavigate();

  return (
    <main className="assortment">
      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Button
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
          shape="round"
          style={{
            background: "#9b2821",
            color: "white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Back
        </Button>
        <Space>
          <Avatar
            src={data?.organization_image || "/img/icons/logoCompany.svg"}
            size={64}
            style={{ border: "2px solid #9b2821" }}
          />
          <Title level={4} style={{ margin: 0 }}>
            {data?.company_name || "Company Name"}
          </Title>
        </Space>
      </Row>
      <InteractiveComponent data={data} />
      
    </main>
  );
};

export default Assortment;
