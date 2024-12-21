// components/Chat/ChatWindow.tsx
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatService } from '../../../../../service/ChatService';
import { addMessage } from '../../../../../store/chatSlice';
import MessageInput from './MessageInput';

const ChatWindow = ({ activeChatId }: any) => {
    const dispatch = useDispatch();
    const messages = useSelector((state: any) => state.chat.messages[activeChatId] || []);
    const messageEndRef = useRef(null);
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        if (!activeChatId) return;

        const ws = ChatService.connectToChat(activeChatId, token);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            dispatch(addMessage({ chatId: activeChatId, message }));
        };

        ws.onerror = (error) => console.error('WebSocket error:', error);
        ws.onclose = () => console.log('WebSocket closed');

        return () => ws.close();
    }, [activeChatId, dispatch, token]);

    const scrollToBottom = () => {
        //@ts-ignore
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (text: any) => {
        if (!text.trim()) return;
        const message = {
            id: Date.now(),
            text,
            sender: 'user',
            timestamp: new Date().toISOString(),
            chat_id: activeChatId,
        };
        dispatch(addMessage({ chatId: activeChatId, message }));
    };

    return (
        <div className="chat-window">
            <div className="messages">
                {messages?.map((message: any) => (
                    <div
                        key={message?.id}
                        className={`message-bubble message-bubble--${message?.sender}`}
                    >
                        {message?.text}
                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
