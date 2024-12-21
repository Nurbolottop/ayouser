import React, { useState } from "react";
import Application from "../../../../components/Application/Application";
import logo from "../../../../img/LogoNotice.svg";
import back from "../../../../img/icons/back.svg";
import voice from "../../../../img/icons/voice.svg";
import send from "../../../../img/icons/send.svg";
import smile from "../../../../img/icons/smile.svg";
import massageImage from "../../../../img/message.png";

import "./ProfileMessage.scss";
import Message from "./Message/Message";
import { Avatar, Button, Flex, Input, List } from "antd";
import { AudioOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons";
import Skoro from "../../../../components/Skoro/Skoro";
import ChatList from "./Chats/ChatList";
import useFetchData from "../../../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

const ProfileMessage = () => {
  const [state, setState] = useState(false);
  const messages = [
    {
      id: 1,
      user: "back",
      title: "Organization",
      text: "Lorem ipsum dolor sit amet consectetur. Urna suspendisse donec eget odio quis sit mattis odio a. Velit commodo sit tortor non. Vitae molestie augue sed tellus quam. Viverra justo in non lacus egestas vitae.",
      date: "06.09.2024",
      logo: logo,
    },
    {
      id: 2,
      user: "front",
      title: "Organization",
      text: "Lorem ipsum dolor sit amet consectetur. Urna suspendisse donec eget odio quis sit mattis odio a. Velit commodo sit tortor non. Vitae molestie augue sed tellus quam. Viverra justo in non lacus egestas vitae.",
      date: "06.09.2024",
      logo: logo,
    },
    // Additional messages continue here...
  ];
  const { data } = useFetchData('https://ayo.webtm.ru/api/v1/chat/chats/')
  const navigate = useNavigate()
  const handleChatSelect = (chatId: number) => {
    navigate('/profile/chat/' + chatId)
  };

  return (
    <div className="message" style={{ position: 'relative' }}>
      <h2 className="data__title">Messages</h2>
      <ChatList chats={data} onChatSelect={handleChatSelect} />
    </div>
  );
};

export default ProfileMessage;
