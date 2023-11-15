import {  Outlet } from "react-router-dom"
import { Card } from "../../components/ui/card";
import { useGetCall } from "../../api/apiService";
import CustomAlert from "../../components/CustomAlert";
import NewChatDialog from "./NewChatDialog";
import ChatRow, { ChatRowLoading } from "./ChatRow";
import { ChatApi } from "../../api/types/chat";
import { useAuth } from "../../context/auth-context";
import { useEffect } from "react";






const Messages = () => {
    const {account} = useAuth();
    const { data: chats, isLoading, isError } = useGetCall<ChatApi[]>("/chats?id="+account?.id);

    useEffect(()=>{
        
    },[account?.id])

    return (
        <div className="flex justify-between gap-10 h-[80vh] ">

            <Card className="w-1/2 p-6 pt-0 bg-background rounded-2xl overflow-y-auto relative">

                <div className="flex items-start justify-between mb-4 pb-2 pt-6  sticky top-0 bg-background">
                    <h1 className="text-xl font-bold">Message</h1>
                    <NewChatDialog />
                </div>

                {isLoading && <ChatRowLoading />}
                {isError && <CustomAlert title='Error' message='An error occured. Please try again later' />}


                <div >
                    {chats && chats.map((chat, index) => <ChatRow key={index} chat={chat} />)}
                </div>

            </Card>


            <div className="w-1/2 h-full">
                <Outlet />
            </div>

        </div>
    )
}

export default Messages