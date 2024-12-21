
import axios from 'axios';

export class ChatService {
    static async getChats() {
        const response = await axios.get('/api/chats/');
        return response.data;
    }

    static connectToChat(chatId: any, token: any) {
        return new WebSocket(`wss://ayo.webtm.ru/ws/chat/${chatId}/?token=${token}`);
    }
}
