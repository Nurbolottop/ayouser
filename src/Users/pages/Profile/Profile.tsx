import React, { FC, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Button, Drawer, Menu, Flex, Affix } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  GiftOutlined,
  MessageOutlined,
  FileTextOutlined,
  HistoryOutlined,
  NotificationOutlined,
  CommentOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import useFetchData from "../../../hooks/useFetchData";
import ProfileCard from "./ProfileCard/ProfileCard";
import "./Profile.scss";

const Profile: FC<any> = () => {
  const navigate = useNavigate();
  const { data } = useFetchData(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`);

  const onClick = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_id');
    navigate("/");
  };

  const handleMenuClick = (e: any) => {
    navigate(`/profile/${e.key}`);
  };



  const iconStyle = { fontSize: "18px" }; // Change the value for larger or smaller size



  return (
    <div className="profile container">
      <section className="profile__first">
        <ProfileCard initialProfileImage={data.profile_image} name={`${data.first_name} \n${data.last_name}`} />

        <span className="profile__first-line"></span>
     
        <div className="profile__first-none">
          <b className="profile__first-bold">Personal Account</b>
          <Menu
            className="menudesktop"
            onClick={handleMenuClick}
            mode="vertical"
            items={[
              { label: "Personal Information", key: "", icon: <UserOutlined style={iconStyle} /> },
              { label: "Enter Promo Code", key: "promo-code", icon: <GiftOutlined style={iconStyle} /> },
              { label: "Transaction History", key: "history", icon: <HistoryOutlined style={iconStyle} /> },
              // { label: "Notifications", key: "analitik", icon: <NotificationOutlined style={iconStyle} /> },s
              { label: "My City", key: "city", icon: <EnvironmentOutlined style={iconStyle} /> },

              // { label: "My Orders", key: "orders", icon: <ShoppingCartOutlined style={iconStyle} /> },
              // { label: "My Cart", key: "cart", icon: <ShoppingCartOutlined style={iconStyle} /> },
              { label: "Messages", key: "message", icon: <MessageOutlined style={iconStyle} /> },
              // { label: "My Certificates", key: "certificates", icon: <FileTextOutlined style={iconStyle} /> },
              // { label: "Feedback", key: "feedback", icon: <CommentOutlined style={iconStyle} /> },
            ]}
          />
          <div style={{ padding: '10px' }}> <Button block onClick={onClick} type="primary">Log Out</Button></div>

        </div>
        <br />
      </section>
      <section className="profile__second">
        <Outlet />
      </section>
    </div>
  );
};

export default Profile;
