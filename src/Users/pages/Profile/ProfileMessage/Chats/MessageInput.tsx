
// components/Chat/MessageInput.tsx
import React, { useState } from 'react';

const MessageInput = ({ onSendMessage }: any) => {
    const [text, setText] = useState("");

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter' && text.trim()) {
            onSendMessage(text);
            setText("");
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
            />
        </div>
    );
};

export default MessageInput;
