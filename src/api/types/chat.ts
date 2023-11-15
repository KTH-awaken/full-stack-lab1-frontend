export interface ChatApi {
    id: number;
    otherParticipantName: string;
    otherParticipantId:number;
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
    sender: number;
    receiver: number;
    senderFirstName:string;
    senderLastName:string;
    receiverFirstName:string;
    receiverLastName:string;
    date: string;
}
export interface AccountVm {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string; // You might need to define UserType interface as well
    receivedMessages: undefined;
    sentMessages: undefined;
  }
  