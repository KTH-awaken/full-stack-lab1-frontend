
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

export interface Encounter {
    title: string,
    details: string

}

