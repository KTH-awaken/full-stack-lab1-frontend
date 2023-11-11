export interface ChatApi {
    id: number;
    users: string[];
    lastMessage: string;
    lastSend: string;
}

export interface MessageApi {
    id: number;
    sender: {
        name: string;
        email: string;
    };
    chatId: number;
    content: string;
    timestamp: string;
}
