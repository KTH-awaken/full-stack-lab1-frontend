export interface ChatApi {
    id: number;
    otherParticipantName: string;
    otherParticipantId:string;
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
    sender: string;
    receiverEmail: string;
    senderEmail:string;
    senderLastName:string;
    receiverFirstName:string;
    receiverLastName:string;
    date: string;
}
