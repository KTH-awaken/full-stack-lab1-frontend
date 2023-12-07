import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "../../components/ui/card";
import { BASE_URL, useGetCall, usePostCall } from "../../api/apiService";
import { Skeleton } from "../../components/ui/skeleton";
import CustomAlert from "../../components/CustomAlert";
import { MessageRow } from "./MessageRow";
import { FormEvent, useState } from "react";
import { MessageVm } from "../../api/types/chat";
import { useOAuth2 } from "../../context/oauth2-context";



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
    const { userData } = useOAuth2();
    const params = useParams();
    const { data: messages, isLoading, isError } = useGetCall<MessageVm[]>(BASE_URL.MESSAGE_SERVICE + "/message/chat/" + params.chatid, 'messages', { Authorization: `Bearer ${userData?.access_token}` });
    const { mutate: sendMessage } = usePostCall<MessageVm[]>(BASE_URL.MESSAGE_SERVICE + "/message", 'messages', { Authorization: `Bearer ${userData?.access_token}` });
    const [message, setMessage] = useState("");


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!message.trim()) {
            return
        }
        sendMessage({
            text: message,
            senderEmail: userData?.profile.email || "",
            receiverEmail: params.chatid || "",

        });

        setMessage("");

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
                            <p className="font-bold text-xl">
                                {userData && (messages[0].sender === userData?.profile.given_name ? messages[0]?.receiverFirstName : messages[0]?.receiverFirstName)}{' '}
                                {userData && (messages[0].sender === userData?.profile.family_name ? messages[0]?.receiverLastName : messages[0]?.receiverLastName)}
                            </p>
                            <p className="text-sm opacity-50">
                                {userData && (messages[0].sender === userData?.profile.email ? messages[0]?.senderEmail: messages[0]?.receiverEmail)}{' '}
                            </p>

                        </div>
                    </div>
                    <div className="flex flex-col gap-3 grow overflow-y-auto">
                        {userData && messages && messages.map((message, index) => <MessageRow key={index} self={message.senderEmail === userData.profile.email} content={message.text} />)}

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