import { LeftOutlined, SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, Input, Spin } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ChatPage.scss"; // Подключаем стили

export const ChatPage: React.FC = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState<{ sender: string; message: string; status: string; message_id: number }[]>([]);
    const [chat, setChat] = useState<any>();
    const [inputMessage, setInputMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const wsRef = useRef<WebSocket | null>(null);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const fetchChatHistory = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await axios.get(`https://ayo.webtm.ru/api/v1/chat/chats/${chatId}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            setMessages(response.data.messages);
            setChat(response.data);
        } catch (err) {
            console.error("Ошибка загрузки истории чата:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChatHistory();

        wsRef.current = new WebSocket(`wss://ayo.webtm.ru/ws/chat/${chatId}/?token=${localStorage.getItem("access_token")}`);

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            // Добавляем сообщение только если оно новое
            setMessages((prevMessages) => {
                const messageExists = prevMessages.some((msg) => msg.message_id === data.message_id);
                if (!messageExists) {
                    return [...prevMessages, data];
                }
                return prevMessages;
            });

            // Если чат открыт, отправляем статус "прочитано"
            if (document.visibilityState === "visible" && data.sender !== "user") {
                wsRef.current?.send(
                    JSON.stringify({
                        update_status: true,
                        message_id: data.message_id,
                        status: "read",
                    })
                );
            }
        };

        return () => {
            wsRef.current?.close();
        };
    }, [chatId]);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (wsRef.current && inputMessage.trim()) {
            wsRef.current.send(
                JSON.stringify({
                    sender: "user",
                    message: inputMessage,
                    organization_id: chat?.organization?.id,
                    user_id: chat?.user?.id,
                })
            );
            setInputMessage(""); // Очищаем поле ввода
        }
    };

    const markMessagesAsRead = () => {
        const unreadMessages = messages.filter((msg) => msg.status === "sent" && msg.sender !== "user");
        unreadMessages.forEach((msg) => {
            wsRef.current?.send(
                JSON.stringify({
                    update_status: true,
                    message_id: msg.message_id,
                    status: "read",
                })
            );
            setMessages((prev) =>
                prev.map((m) => (m.message_id === msg.message_id ? { ...m, status: "read" } : m))
            );
        });
    };

    // Отмечаем сообщения как прочитанные при видимости страницы
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                markMessagesAsRead();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [messages]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "sent":
                return <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4933 6.93502C15.8053 7.20743 15.8374 7.68122 15.565 7.99325L7.70786 16.9933C7.56543 17.1564 7.35943 17.25 7.14287 17.25C6.9263 17.25 6.72031 17.1564 6.57788 16.9933L3.43502 13.3933C3.16261 13.0812 3.19473 12.6074 3.50677 12.335C3.8188 12.0626 4.29259 12.0947 4.565 12.4068L7.14287 15.3596L14.435 7.00677C14.7074 6.69473 15.1812 6.66261 15.4933 6.93502Z" fill="#ccc" />
            </svg>; // Одна серая галочка
            case "delivered":
                return <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4933 6.93502C15.8053 7.20743 15.8374 7.68122 15.565 7.99325L7.70786 16.9933C7.56543 17.1564 7.35943 17.25 7.14287 17.25C6.9263 17.25 6.72031 17.1564 6.57788 16.9933L3.43502 13.3933C3.16261 13.0812 3.19473 12.6074 3.50677 12.335C3.8188 12.0626 4.29259 12.0947 4.565 12.4068L7.14287 15.3596L14.435 7.00677C14.7074 6.69473 15.1812 6.66261 15.4933 6.93502Z" fill="#ccc" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5175 7.01946C20.8174 7.30513 20.829 7.77986 20.5433 8.07981L11.9716 17.0798C11.8201 17.2389 11.6065 17.3235 11.3872 17.3114C11.1679 17.2993 10.9649 17.1917 10.8318 17.0169L10.4035 16.4544C10.1526 16.1249 10.2163 15.6543 10.5458 15.4034C10.8289 15.1878 11.2161 15.2044 11.4787 15.4223L19.4571 7.04531C19.7428 6.74537 20.2175 6.73379 20.5175 7.01946Z" fill="#ccc" />
                </svg>; // Две серые галочки
            case "read":
                return <span style={{ color: "blue" }}><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4933 6.93502C15.8053 7.20743 15.8374 7.68122 15.565 7.99325L7.70786 16.9933C7.56543 17.1564 7.35943 17.25 7.14287 17.25C6.9263 17.25 6.72031 17.1564 6.57788 16.9933L3.43502 13.3933C3.16261 13.0812 3.19473 12.6074 3.50677 12.335C3.8188 12.0626 4.29259 12.0947 4.565 12.4068L7.14287 15.3596L14.435 7.00677C14.7074 6.69473 15.1812 6.66261 15.4933 6.93502Z" fill="#82eefd" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5175 7.01946C20.8174 7.30513 20.829 7.77986 20.5433 8.07981L11.9716 17.0798C11.8201 17.2389 11.6065 17.3235 11.3872 17.3114C11.1679 17.2993 10.9649 17.1917 10.8318 17.0169L10.4035 16.4544C10.1526 16.1249 10.2163 15.6543 10.5458 15.4034C10.8289 15.1878 11.2161 15.2044 11.4787 15.4223L19.4571 7.04531C19.7428 6.74537 20.2175 6.73379 20.5175 7.01946Z" fill="#82eefd" />
            </svg></span>; // Две синие галочки
            default:
                return null;
        }
    };

    return (
        <Card
            className="chat-card"
            bodyStyle={{ padding: "0" }}
            title={
                <Flex align="center" gap={10}>
                    <Avatar src={chat?.organization?.organization_image} />
                    <Card.Meta title={chat?.organization?.company_name} />
                </Flex>
            }
            extra={
                <Button onClick={() => navigate("/profile/message")} type="primary" icon={<LeftOutlined />}>
                    back
                </Button>
            }
        >
            {loading ? (
                <Spin tip="Загрузка чата..." style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
            ) : error ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <p>Не удалось загрузить чат. Попробуйте снова.</p>
                    <Button onClick={fetchChatHistory} type="primary">
                        Повторить
                    </Button>
                </div>
            ) : (
                <div ref={chatBoxRef} className="chat-box">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.sender === "user" ? "chat-message-user" : "chat-message-organization"}`}
                        >
                            <div className={`chat-bubble ${msg.sender === "user" ? "bubble-user" : "bubble-organization"}`}>
                                {msg.message}
                                <div className="message-status">{msg.sender === "user" && getStatusIcon(msg.status)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Flex gap={10}>
                <Input
                    style={{ height: "50px" }}
                    className="chat-input"
                    placeholder="Введите сообщение"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onPressEnter={sendMessage}
                />
                <Button
                    type="primary"
                    style={{ height: "50px", width: "50px" }}
                    icon={<SendOutlined />}
                    onClick={sendMessage}
                    className="chat-send-button"
                />
            </Flex>
        </Card>
    );
};
