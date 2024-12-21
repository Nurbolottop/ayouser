import React, { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/icons/ayoLogo.svg";

import burger from "../../img/icons/burger.svg";
import qr from "../../img/icons/qr.svg";
import "./Header.scss";
import useFetchData from "../../hooks/useFetchData";
import { Avatar, Button, Drawer, Flex, Menu, Modal } from "antd";
import { CommentOutlined, EnvironmentOutlined, FileTextOutlined, GiftOutlined, HistoryOutlined, LogoutOutlined, MessageOutlined, NotificationOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

const UserHeader: FC<any> = () => {
  const { data } = useFetchData(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`);
  const [visible, setVisible] = useState(false); // Modal for QR scanner
  const [visible2, setVisible2] = useState(false); // Drawer menu

  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem('access_token');
    navigate("/");
  };

  const handleMenuClick = (e: any) => {
    navigate(`/profile/${e.key}`);
  };

  const showDrawer = () => {
    setVisible2(true);
  };

  const onClose = () => {
    setVisible2(false);
  };

  const handleShowQRScanner = () => {
    setVisible(true); // Open QR scanner modal
  };

  const handleCancel = () => {
    setVisible(false); // Close modal
  };

  const iconStyle = { fontSize: "18px" };

  return (
    <header className="header">
      <div className="header__container container">
        <Link to={"/"}>
          <img src={logo} alt="" className="header__logo" />
        </Link>
        <Link to={"/profile"} className="header__data">
          <Avatar size={50} src={data?.profile_image} alt="" className="header__data-img" />
          <h3 className="header__data-name">
            {data.first_name} {data.last_name}
          </h3>
        </Link>

        <div className="header__menu">

          <span onClick={handleShowQRScanner}>
            <img src={qr} className="header__qr" alt="" />
          </span>
          <span className="header__menu-bell">
            <Link to={"/profile"}>
              {/* Logic for displaying the bell icon */}
            </Link>
          </span>
          <button onClick={showDrawer} className="header__menu-burger">
            <img src={burger} alt="" />
          </button>
        </div>
      </div>

      {/* QR scanner modal */}
      <Modal
        title="QR Code Scanning"
        visible={visible}
        onCancel={handleCancel}
        footer={null} // No footer buttons
        centered
      >
        <img width={'100%'} src={data?.profile_qr_code} alt="" />
      </Modal>

      {/* Drawer menu */}
      <Drawer
        title={
          <Flex align="center" gap={10}>
            <span onClick={handleShowQRScanner}>
              <img src={qr} className="3" alt="" />
            </span>
          </Flex>
        }
        placement="left"
        onClose={onClose}
        visible={visible2}
      >
        <Menu
          onClick={handleMenuClick}
          mode="vertical"
          items={[
            { label: "Personal Information", key: "", icon: <UserOutlined style={iconStyle} /> },
            { label: "My Orders", key: "orders", icon: <ShoppingCartOutlined style={iconStyle} /> },
            { label: "My Cart", key: "cart", icon: <ShoppingCartOutlined style={iconStyle} /> },
            { label: "My City", key: "city", icon: <EnvironmentOutlined style={iconStyle} /> },
            { label: "Enter Promo Code", key: "promo-code", icon: <GiftOutlined style={iconStyle} /> },
            { label: "Messages", key: "message", icon: <MessageOutlined style={iconStyle} /> },
            { label: "My Certificates", key: "certificates", icon: <FileTextOutlined style={iconStyle} /> },
            { label: "Transaction History", key: "history", icon: <HistoryOutlined style={iconStyle} /> },
            { label: "Feedback", key: "feedback", icon: <CommentOutlined style={iconStyle} /> },
            { label: "Notifications", key: "analitik", icon: <NotificationOutlined style={iconStyle} /> },
          ]}
        />
        <div style={{ padding: '10px' }}> <Button block onClick={onClick} type="primary">Log Out</Button></div>

      </Drawer>
    </header>
  );
};

export default UserHeader;
