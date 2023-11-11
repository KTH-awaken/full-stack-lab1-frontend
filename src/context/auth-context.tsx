import { Account } from "../types"
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


interface IAuthContext {
    account: Account;
    setAccount: Dispatch<SetStateAction<Account>>
}

const fakeLogin:Account = {
    id:1,
    name: "Patient 1",
    email: "patient1@email.com",
    role: "PATIENT",
}

const authContext = createContext<IAuthContext>({account:fakeLogin, setAccount: ()=>{}});

export const AuthProvider = ({children}:{children:ReactNode}) => {

    const [account,setAccount] = useState<Account>(fakeLogin)

    return (
        <authContext.Provider value={{account,setAccount}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('authContext must be used within a AuthProvider');
    }
    return context;
};