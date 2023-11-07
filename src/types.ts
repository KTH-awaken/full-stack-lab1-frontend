
//TODO: REMOVE THIS WHEN ALL DATA ARE RETREIVED FROM SERVER

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
    name: string,
    email: string
}

export interface Encounter {
    title: string,
    details: string

}

export interface Account {
    id:number,
    name: string;
    email: string;
    role: "PATIENT" | "DOCTOR" | "STAFF";
}
