
// store/chatSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        activeChat: null,
        chats: [],
        messages: {},
        loading: false,
        error: null,
    },
    reducers: {
        setChats(state, action) {
            state.chats = action.payload;
        },
        setActiveChat(state, action) {
            state.activeChat = action.payload;
        },
        addMessage(state: any, action) {
            const { chatId, message } = action.payload;
            if (!state.messages[chatId]) state.messages[chatId] = [];
            state.messages[chatId].push(message);
        },
    },
});

export const { setChats, setActiveChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
