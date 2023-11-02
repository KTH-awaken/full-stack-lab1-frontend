import { useParams } from "react-router-dom";
import { CHATS } from "./Messages";
import { currentUser } from "../auth/fake-user";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";


export const chatname = (chat: any) => currentUser.name === chat.sender ? chat.reciver : chat.sender;

const OneMessage = ({ self, content }: { self: boolean, content: string }) => <p className={`text-sm font-light w-fit inline-block max-w-[60%]  px-4 py-2 rounded-2xl leading-6  ${self ? "bg-primary text-white self-end" : "bg-accent"}`}>{content}</p>

const Chat = () => {
    const params = useParams();
    const chat = CHATS.find(p => p.id === params.chatid)
    return (
        <>
            {
                chat &&
                <div className="bg-white p-6 flex flex-col justify-center rounded-2xl h-[80vh] ">
                    <div className="mb-4 pb-2 flex gap-3">
                        <Avatar>
                            <AvatarImage className="w-12 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="@shadcn" />
                        </Avatar>
                        <div>
                            <p className="font-bold text-xl">{chatname(chat)}</p>
                            <p className="text-sm text-black/50">username@gmail.com</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 grow overflow-y-auto">

                        {chat.messages.map((message, index) => <OneMessage key={index} self={message.user === currentUser.name} content={message.content} />)}

                    </div>
                    <form className="flex gap-3 pt-3">
                        <Input className="border-none bg-accent" placeholder="Write a message..." type="text" name="" id="" ></Input>
                        <Button type="submit">Send</Button>
                    </form>
                </div>
            }
        </>

    )
}

export default Chat