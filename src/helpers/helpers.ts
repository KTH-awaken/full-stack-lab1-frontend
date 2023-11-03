import { currentUser } from "../auth/fake-user";
import { Chat, User } from "../pages/Message/Index";



export const getDisplayName = (chat: Chat):User => currentUser.email === chat.sender.email ? chat.receiver : chat.sender;
export const uid = () => {
    const S4 = () =>  (((1+Math.random())*0x10000)|0).toString(16).substring(1);   
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

