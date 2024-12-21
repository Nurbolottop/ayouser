import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Card, Avatar, Tabs, Button, Flex } from "antd";
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
} from "@ant-design/icons";
import Cart from "./Cart/Cart";
import Certificates from "./Certificates/Certificates";
import City from "./City/City";
import Data from "./Data/Data";
import Feedback from "./Feedback/Feedback";
import History from "./History/History";
import Notice from "./Notice/Notice";
import Orders from "./Orders/Orders";
import ProfileMessage from "./ProfileMessage/ProfileMessage";
import PromoCode from "./PromoCode/PromoCode";
import "./Profile.scss";

const Profile2: FC<any> = ({ user }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/");
    };

    const tabLayout = (children: any) => <div>
        <Flex gap={36}>
            {/* <Card style={{ height: 'fit-content' }} className="profile__card">
                <div className="profile__header">
                    <Avatar size={64} src={human} />
                    <div className="profile__info">
                        <h3 className="profile__name">Ayana Kubanychbekova</h3>
                        <p className="profile__edit">Изменить профиль</p>
                    </div>
                </div>
                <br /><br />
                <div className="profile__logout">
                    <Button
                        type="primary"
                        icon={<LogoutOutlined />}
                        onClick={onLogout}
                        danger
                    >
                        Выйти с аккаунта
                    </Button>
                </div>
            </Card> */}

            {children}
        </Flex>
    </div>
    // Структура меню для секций профиля
    const tabsItems = [
        { key: "data", label: "Personal data", icon: <UserOutlined />, content: tabLayout(< Data user={user} />) },
        { key: "orders", label: "Мои заказы", icon: <ShoppingCartOutlined />, content: tabLayout(<Orders />) },
        { key: "cart", label: "Моя корзина", icon: <ShoppingCartOutlined />, content: tabLayout(<Cart />) },
        { key: "city", label: "Мой город", icon: <EnvironmentOutlined />, content: tabLayout(<City />) },
        { key: "code", label: "Ввести промокод", icon: <GiftOutlined />, content: tabLayout(<PromoCode />) },
        { key: "message", label: "Сообщения", icon: <MessageOutlined />, content: tabLayout(<ProfileMessage />) },
        { key: "certificates", label: "Мои сертификаты", icon: <FileTextOutlined />, content: tabLayout(<Certificates />) },
        { key: "history", label: "История операции", icon: <HistoryOutlined />, content: tabLayout(<History />) },
        { key: "feedback", label: "Обратная связь", icon: <CommentOutlined />, content: tabLayout(<Feedback />) },
        { key: "notice", label: "Уведомления", icon: <NotificationOutlined />, content: tabLayout(<Notice />) },
    ];

    // Хэндлер переключения вкладок
    const handleTabChange = (key: string) => {
        // Устанавливаем активную вкладку по ключу
        // Например, если нужна доп. логика
    };

    return (
        <div className="profile container">
            {/* Секция профиля с информацией пользователя */}


            {/* Секция с табами и контентом */}

            <Tabs
                style={{ width: '100%' }}
                defaultActiveKey="data"
                onChange={handleTabChange}
                items={tabsItems.map((item) => ({
                    key: item.key,
                    label: (
                        <Flex gap={5}>
                            {item.icon}
                            {item.label}
                        </Flex>
                    ),
                    children: item.content,
                }))}
            />




            {/* Кнопка выхода */}

        </div>
    );
};

export default Profile2;
