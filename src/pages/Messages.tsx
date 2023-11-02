import { NavLink, Outlet } from "react-router-dom"
import { Button } from "../components/ui/button";
import { currentUser } from "../auth/fake-user";
import { chatname } from "./Chat";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

interface Message {
    content: string,
    user: string,
    timestamp: string
}
interface Chat {
    sender: string,
    reciver: string,
    messages: Message[]
    id: string,
}
export const CHATS: Chat[] = [
    {
        reciver: "Hamada",
        sender: "Milad",
        id: "1",
        messages: [
            { content: "Hello Hamada, how are you?", timestamp: "Mon 21:23", user: "Milad" },
            { content: "I'm doing well, thanks for asking!", timestamp: "Mon 21:24", user: "Hamada" },
            { content: "What's new with you?", timestamp: "Mon 21:25", user: "Hamada" },
            { content: "Hello Hamada, how are you?", timestamp: "Mon 21:23", user: "Milad" },
            { content: "I'm doing well, thanks for asking!", timestamp: "Mon 21:24", user: "Hamada" },
            { content: "What's new with you?", timestamp: "Mon 21:25", user: "Hamada" },
            { content: "Hello Hamada, how are you?", timestamp: "Mon 21:23", user: "Milad" },
            { content: "I'm doing well, thanks for asking!", timestamp: "Mon 21:24", user: "Hamada" },
            { content: "What's new with you?", timestamp: "Mon 21:25", user: "Hamada" },
            { content: "Hello Hamada, how are you?", timestamp: "Mon 21:23", user: "Milad" },
            { content: "I'm doing well, thanks for asking!", timestamp: "Mon 21:24", user: "Hamada" },
            { content: "What's new with you?", timestamp: "Mon 21:25", user: "Hamada" },
            { content: "Hello Hamada, how are you?", timestamp: "Mon 21:23", user: "Milad" },
            { content: "I'm doing well, thanks for asking!", timestamp: "Mon 21:24", user: "Hamada" },
            { content: "What's new with you?", timestamp: "Mon 21:25", user: "Hamada" },
        ],
    },
    {
        reciver: "Hamada",
        sender: "Marucs",
        id: "2",
        messages: [
            { content: "Hey Marcus, did you finish that project?", timestamp: "Tue 09:15", user: "Hamada" },
            { content: "Yes, I completed it last night.", timestamp: "Tue 09:20", user: "Marucs" },
        ],
    },
    {
        reciver: "Hamada",
        sender: "Alex",
        id: "3",
        messages: [
            { content: "Alex, have you seen the new computer science lab?", timestamp: "Wed 14:30", user: "Hamada" },
            { content: "No, I haven't. Is it impressive?", timestamp: "Wed 14:35", user: "Alex" },
        ],
    },
    {
        reciver: "Balder",
        sender: "Hamada",
        id: "4",
        messages: [
            { content: "Hamada, let's meet up to discuss our project tomorrow.", timestamp: "Thu 17:42", user: "Balder" },
            { content: "Sure, that sounds like a plan.", timestamp: "Thu 17:45", user: "Hamada" },
        ],
    },
    {
        reciver: "Tim",
        sender: "Hamada",
        id: "5",
        messages: [
            { content: "Hamada, how's your final year of studies going?", timestamp: "Fri 11:10", user: "Tim" },
            { content: "It's challenging, but I'm learning a lot.", timestamp: "Fri 11:15", user: "Hamada" },
        ],
    },
];


const MessageRow = ({ chat }: { chat: Chat }) => {
    const classes = "p-4 py-2 mb-2 block border-b flex gap-4 pl-2"
    return (
        <NavLink end className={({ isActive }) => isActive ? `bg-accent rounded-xl border-none ${classes}` : classes} to={`/messages/${chat.id}`}>
            <Avatar>
                <AvatarImage className="w-12 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="@shadcn" />
            </Avatar>
            <div className="flex-grow">
                <p className="font-semibold mb-1 ">{chatname(chat)}</p>
                <div className="flex justify-between  items-center">
                    <p className="text-sm font-light text-black/80">{chat.messages[chat.messages.length - 1].content}</p>
                    <p className="text-xs font-light text-black/80">{chat.messages[chat.messages.length - 1].timestamp}</p>

                </div>
            </div>

        </NavLink>
    )
}

const Messages = () => {

    return (
        <div className="flex justify-between gap-10 h-[80vh] ">
            <div className="w-1/2 p-6 pt-0 bg-white rounded-2xl overflow-y-auto relative">
                <div className="flex items-start justify-between mb-4 pb-2 pt-6  sticky top-0 bg-white">
                    <h1 className="text-xl font-bold">Message</h1>
                    <Button variant="default">New Message</Button>
                </div>
                <div className="">
                    {CHATS.map((chat, index) => <MessageRow key={index} chat={chat} />)}
                </div>
            </div>
            <div className="w-1/2 h-full">
                <Outlet />
            </div>

        </div>
    )
}

export default Messages