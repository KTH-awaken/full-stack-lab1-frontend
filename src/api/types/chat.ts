export interface ChatApi {
    id: number;
    otherParticipantName: string;
    lastMessage: string;
    date: string;
}

export interface MessageApi {
    id: number;
    sender: {
        name: string;
        email: string;
    };
    chatId: number;
    content: string;
    date: string;
}
export interface MessageVm {
    text: string;
    senderId: number;
    receiverId: number;
}