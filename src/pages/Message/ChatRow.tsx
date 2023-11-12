import { NavLink } from "react-router-dom"
import { Avatar, AvatarImage } from "../../components/ui/avatar"
import { getDisplayName, uid } from "../../helpers/helpers"
import { Skeleton } from "../../components/ui/skeleton"
import { useAuth } from "../../context/auth-context"
import { ChatApi } from "../../api/types/chat"


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
    const {account} = useAuth();
    return (
        <NavLink end className={({ isActive }) => isActive ? `bg-accent rounded-xl border-none ${classes}` : classes} to={`/messages/${chat.id}`}>
            <Avatar>
                <AvatarImage className="w-12 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="@shadcn" />
            </Avatar>
            <div className="flex-grow">
                {/* <p className="font-semibold mb-1 ">{getDisplayName(chat.users, account.email)}</p> */}
                <div className="flex justify-between  items-center">
                    <p className="text-sm font-light text-foreground/80">{chat.lastMessage}</p>
                    <p className="text-xs font-light text-foreground/80">{chat.date}</p>
      
                </div>
            </div>

        </NavLink>
    )
}
export default ChatRow;