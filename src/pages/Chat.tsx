import { useParams } from "react-router-dom";

const Chat = () => {
    const params = useParams();    
    return (
        <div>
            All messages from chat with id {params.chatid}
        </div>
    )
}

export default Chat