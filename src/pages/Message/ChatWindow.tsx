import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "../../components/ui/card";
import { useGetCall } from "../../api/apiService";
import { getDisplayName } from "../../helpers/helpers";
import { Skeleton } from "../../components/ui/skeleton";
import CustomAlert from "../../components/CustomAlert";
import { Chat } from "../../types";
import { MessageRow } from "./MessageRow";
import { FormEvent, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { MessageApi } from "../../api/types/chat";



const Loading = () => {
    return (
        <Card className="bg-background p-6 flex flex-col justify-center rounded-2xl h-[80vh] ">
            <div className="mb-4 pb-2 items-center flex gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-[100px] rounded-2xl" />
                    <Skeleton className="h-2 w-[200px] rounded-2xl" />
                </div>
            </div>
            <div className="flex flex-col gap-3 grow overflow-y-auto">
                <Skeleton className="h-9 w-[140px] rounded-2xl" />
                <Skeleton className="h-9 w-[170px] rounded-2xl" />
                <Skeleton className="h-16 w-[200px] rounded-2xl self-end" />
                <Skeleton className="h-9 w-[100px] rounded-2xl self-end" />
                <Skeleton className="h-9 w-[90px] rounded-2xl" />
                <Skeleton className="h-9 w-[160px] rounded-2xl" />
                <Skeleton className="h-9 w-[170px] rounded-2xl self-end" />
                <Skeleton className="h-16 w-[200px] rounded-2xl self-end" />
            </div>
            <div className="flex gap-3 pt-3">
                <Skeleton className="h-12 flex-grow rounded-2xl" />
                <Skeleton className="h-12 w-[100px] rounded-2xl" />
            </div>
        </Card>
    )
}

const ChatWindow = () => {
    const {account} = useAuth();
    const params = useParams();
    const { data, isLoading, isError } = useGetCall<MessageApi[]>("/messages/");
    const messages = data?.filter(d => d.chatId.toString() === params.chatid)
    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!message.trim()) {
            return
        }
        const now = new Date();
        const messageToSend = {
            user: account && account.email,
            time: `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`,
            content: message
        }
        setMessage("");
        console.log(messageToSend);
        // CREATE NEW MESSAGE IN CHAT

    }

    


    if (isLoading) return <Loading />;
    if (isError) return <CustomAlert title='Error' message='An error occured. Please try again later' />



    return (
        <>
            {
                messages &&
                <Card className="bg-background p-6 flex flex-col justify-center rounded-2xl h-[80vh] ">

                    <div className="mb-4 pb-2 flex gap-3">
                        <Avatar>
                            <AvatarImage className="w-12 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="@shadcn" />
                        </Avatar>
                        <div>
                            <p className="font-bold text-xl">{messages[0].sender.name}</p>
                            <p className="text-sm text-foreground/50">{messages[0].sender.email}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 grow overflow-y-auto">

                        {account && messages.map((message, index) => <MessageRow key={index} self={message.sender.email === account.email} content={message.content} />)}

                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-3 pt-3">
                        <Input value={message} onChange={(e) => setMessage(e.target.value)} className="border-none bg-accent" placeholder="Type a message..." type="text" name="" id="" ></Input>
                        <Button type="submit">Send</Button>
                    </form>
                    
                </Card>
            }
        </>

    )
}

export default ChatWindow