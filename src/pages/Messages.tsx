import { Outlet } from "react-router-dom"

const Messages = () => {
    const chats: { name: string, id: string }[] = [
        { name: "Hamada", id: "1" },
        { name: "Milad", id: "2" },
        { name: "Marucs", id: "3" },
        { name: "Alex", id: "4" },
        { name: "Tim", id: "5" },

    ]
    return (
        <div className="flex justify-between gap-4">
            <div>
                <button>New message</button>
                <div className="divide-y divide-black">
                    {chats.map((chat, index) => <div className="p-4" key={index + "-" + chat}>
                        <a href={"/messages/"+chat.id}>{chat.name}</a>
                    </div>)}
                </div>
            </div>
            <div>
                <Outlet />
            </div>

        </div>
    )
}

export default Messages