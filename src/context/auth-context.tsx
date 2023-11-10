import { usePostCall } from "../api/apiService";
import { ReactNode, createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';

export interface Account {
    id:number,
    firstName: string;
    lastName: string,
    email: string;
    role: "PATIENT" | "DOCTOR" | "STAFF";
    token:string
}

interface IAuthContext {
    account: Account | null;
    login: (req:LoginRequest)=> boolean,
    register: (req:RegisterRequest)=> boolean,
    isAuth: ()=> boolean,
    logout: ()=> void
}

export type LoginRequest = {
    email: string,
    password: string
}
export type RegisterRequest = {
    firstName: string,
    lastName: string,
    email:string,
    password: string,
    role: 'DOCTOR' | 'PATIENT' | 'STAFF'
}
const init:IAuthContext = { 
    account: null,
    isAuth: ()=> false ,
    register: ()=> false ,
    login: ()=> false ,
    logout: ()=>{}
}
const authContext = createContext<IAuthContext>(init);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [account, setAccount] = useState<Account | null>(null);

    const { mutate: registerMutate,
        data: registerData,
        isSuccess: registerSuccess
    } = usePostCall<Account>("/auth/register", "account");


    const { mutate: loginMutate,
        data: loginData,
        isSuccess: loginSuccess
    } = usePostCall<Account>("/auth/login", "account");




    const register = (request: RegisterRequest): boolean => {
        registerMutate(request);
        if(registerSuccess && registerData ){
            setAccount({...registerData})
            Cookies.set('token', registerData.token, { expires: 1 })
            return true;
        }
        return false;
    }

    const login = (request: LoginRequest): boolean => {
        loginMutate(request);
        if(loginSuccess && loginData ){
            setAccount({...loginData})
            Cookies.set('token', loginData.token, { expires: 1 })
            return true;
        }
        return false;
    }

    const logout= () => {
        //TODO: send logout request
        setAccount(null);
    }

    const isAuth = ()=> account !== null;

  

    return (
        <authContext.Provider value={{ account,register,login,isAuth,logout }}>
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


