
export interface User {
    name: string,
    email: string
}
export interface Message {
    content: string,
    user: string,
    timestamp: string
}
export interface Chat {
    sender: User,
    receiver: User,
    messages: Message[]
    id: string,
}
export interface DoctorSelect {
    label: string,
    value: string
}

export interface Encounter {
    title: string,
    details: string
}

export interface Account {
    name: string;
    email: string;
    role: "patient" | "doctor" | "stuff";
}
