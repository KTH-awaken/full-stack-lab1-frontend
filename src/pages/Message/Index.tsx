import { Outlet } from "react-router-dom"
import { Card } from "../../components/ui/card";
import { BASE_URL, useGetCall } from "../../api/apiService";
import CustomAlert from "../../components/CustomAlert";
import NewChatDialog from "./NewChatDialog";
import ChatRow, { ChatRowLoading } from "./ChatRow";
import { ChatApi } from "../../api/types/chat";
import { useOAuth2 } from "../../context/oauth2-context";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { MessageCircleIcon } from "lucide-react";






const Messages = () => {
    const { userData } = useOAuth2();
    const { data: chats, isLoading, isError } = useGetCall<ChatApi[]>(BASE_URL.MESSAGE_SERVICE + "/message/chats", "chats", { Authorization: `Bearer ${userData?.access_token}` });



    return (
        <div className="flex justify-between flex-col lg:flex-row gap-10  min-h-[80vh] ">

            <Card className="hidden lg:w-1/2 p-6 pt-0 bg-background rounded-2xl overflow-y-auto relative min-h-[50vh]">

                <div className="flex items-start justify-between mb-4 pb-2 pt-6  sticky top-0 bg-background">
                    <h1 className="text-2xl font-semibold mb-5">Message</h1>
                    <NewChatDialog />
                </div>

                {chats && chats.length === 0 && <CustomAlert title="Info" message="You have no chats" />}

                {isLoading && <ChatRowLoading />}
                {isError && <CustomAlert title='Error' message='An error occured. Please try again later' />}


                <div >
                    {chats && chats.map((chat, index) => <ChatRow key={index} chat={chat} />)}
                </div>

            </Card>

            <div className="lg:hidden block">
                <Sheet>
                    <SheetTrigger className="w-full">
                        <Button className="w-full flex gap-3">Chats <MessageCircleIcon/></Button>
                        
                    </SheetTrigger>
                    <SheetContent className="w-full">
                        <SheetHeader className="mb-3 border-b pb-2">
                            <SheetTitle>Chats</SheetTitle>
                        </SheetHeader>
                        {chats && chats.length === 0 && <CustomAlert title="Info" message="You have no chats" />}

                        {isLoading && <ChatRowLoading />}
                        {isError && <CustomAlert title='Error' message='An error occured. Please try again later' />}


                        <div >
                            {chats && chats.map((chat, index) => <ChatRow key={index} chat={chat} />)}
                        </div>

                    </SheetContent>
                </Sheet>
            </div>


            <div className="lg:w-1/2 min-h-[80vh]">
                <Outlet />
            </div>

        </div>
    )
}

export default Messages