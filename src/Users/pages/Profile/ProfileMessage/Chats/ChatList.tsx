// Импортируем библиотеки и стили
import React from 'react';
import { List, Avatar, Badge, Card, Tooltip, Button } from 'antd';
import { MessageOutlined, ClockCircleOutlined, SearchOutlined } from '@ant-design/icons';

type Chat = {
    id: number;
    user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        profile_image: string;
    };
    organization: {
        id: number;
        organization_image: string;
        company_name: string;
    };
    messages: string[];
    created_at: string;
    updated_at: string;
};

interface ChatListProps {
    chats: Chat[];
    onChatSelect: (chatId: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect }) => {
    return (
        <Card title="Список чатов" actions={[<Button type='primary' icon={<SearchOutlined />}>Create Chat</Button>]} style={{ borderRadius: 12, overflow: 'hidden' }}>
            <List
                itemLayout="horizontal"
                dataSource={chats}
                renderItem={(chat) => (
                    <List.Item
                        key={chat.id}
                        style={{ cursor: 'pointer', borderBottom: '1px solid #f0f0f0', padding: '16px' }}
                        onClick={() => onChatSelect(chat.id)}
                    >
                        <List.Item.Meta
                            avatar={
                                <Badge count={chat.messages.length} size="small">
                                    <Avatar src={chat.organization.organization_image} size={48} />
                                </Badge>
                            }
                            title={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>{chat.organization.company_name} {chat.user.last_name}</span>
                                    {/* <Tooltip title={chat.organization.company_name}>
                                        <Avatar
                                            src={chat.organization.organization_image}
                                            size={24}
                                            style={{ marginLeft: 8 }}
                                        />
                                    </Tooltip> */}
                                </div>
                            }
                            description={
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{chat.user.email}</span>
                                    <Tooltip title="Последнее обновление">
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <ClockCircleOutlined /> {new Date(chat.updated_at).toLocaleString()}
                                        </span>
                                    </Tooltip>
                                </div>
                            }
                        />
                        <div>
                            <MessageOutlined style={{ fontSize: 18 }} />
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ChatList;
