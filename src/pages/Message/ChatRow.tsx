import { NavLink } from "react-router-dom"
import { Avatar, AvatarImage } from "../../components/ui/avatar"
import { uid } from "../../helpers/helpers"
import { Skeleton } from "../../components/ui/skeleton"
import { ChatApi } from "../../api/types/chat"
import { SheetClose } from "../../components/ui/sheet"


export const ChatRowLoading = () => {
    const arr = new Array(8).fill(uid());
    return (
        <>
            {arr.map((_, i) => (
                <div key={_ + i} className="flex items-center space-x-4 py-2 mb-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2 flex-grow">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            ))}
        </>
    )
}



const ChatRow = ({ chat }: { chat: ChatApi }) => {
    const classes = "p-4 py-2 mb-2 block border-b flex gap-4 pl-2"
    return (
        <NavLink className={({ isActive }) => isActive ? `bg-accent rounded-xl border-none` : ""} to={`/messages/${chat.otherParticipantId.substring(0, chat.otherParticipantId.length - 4)}`}>
            <SheetClose className={classes}>
                <Avatar>
                    <AvatarImage className="w-12 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="@shadcn" />
                </Avatar>
                <div className="flex-grow">
                    {/* <p className="font-semibold mb-1 ">{getDisplayName(chat.users, account.email)}</p> */}
                    <p className="font-semibold mb-1 ">{chat.otherParticipantName}</p>
                    <div className="flex justify-between  items-center">
                        <p className="text-sm font-light text-foreground/80">{chat.lastMessage}</p>
                        <p className="text-xs font-light text-foreground/80">
                            {new Date(chat.date).toLocaleString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                            })}
                        </p>


                    </div>
                </div>
            </SheetClose>
        </NavLink>
    )
}
export default ChatRow;