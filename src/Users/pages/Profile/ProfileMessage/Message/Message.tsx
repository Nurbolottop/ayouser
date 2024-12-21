import React, { FC, useState } from "react";
import { Button, Avatar, Badge, Tooltip, Input } from "antd";
import { LeftOutlined, SmileOutlined, AudioOutlined, SendOutlined } from "@ant-design/icons";
import Application from "../../../../../components/Application/Application";
import logo from "../../../../../img/LogoNotice.svg";
import backIcon from "../../../../../img/icons/back.svg";
import massageImage from "../../../../../img/message.png";
import "./ProfileMessage.scss";

const messagesData = [
  {
    id: 1,
    user: "back",
    title: "Организация",
    text: "Lorem ipsum dolor sit amet consectetur. Urna suspendisse donec eget odio quis sit mattis odio a.",
    date: "06.09.2024",
    logo: logo,
    unread: true,
  },
  {
    id: 2,
    user: "front",
    title: "Организация",
    text: "Lorem ipsum dolor sit amet consectetur. Urna suspendisse donec eget odio quis sit mattis odio a.",
    date: "06.09.2024",
    logo: logo,
    unread: false,
  },
];

const Message: FC<any> = ({ setState }) => {
  const [messages, setMessages] = useState(messagesData);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        user: "front",
        title: "Организация",
        text: newMessage,
        date: new Date().toLocaleDateString(),
        logo: logo,
        unread: false,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="message">
      <div className="message__chat-head">
        <Button onClick={() => setState(false)} className="message__chat-back" type="text" icon={<LeftOutlined />} />
        <Avatar src={logo} className="message__chat-logo" size={40} />
        <h4 className="message__chat-title">Организация</h4>
        <Badge count={messages.filter((msg) => msg.unread).length} className="message__chat-badge" />
      </div>

      <div className="message__chat-body">
        {messages.map((msg) => (
          <div
            className={`message__chat-mass ${msg.user === "back" ? "" : "chat-right"}`}
            key={msg.id}
          >
            <Tooltip title={msg.date} placement="top">
              <p className="message__chat-mass-text">{msg.text}</p>
            </Tooltip>
            <span className="message__chat-mass-date">{msg.date}</span>
          </div>
        ))}
      </div>

      <div className="message__input">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Напишите сообщение..."
          size="large"
          suffix={
            <>
              <SmileOutlined style={{ marginRight: 8 }} />
              <AudioOutlined style={{ marginRight: 8 }} />
              <SendOutlined onClick={handleSendMessage} />
            </>
          }
        />
      </div>

    </div>
  );
};

export default Message;
