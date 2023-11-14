import { usePostCall } from "../api/apiService";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";



export type UserType = 'DOCTOR' | 'PATIENT' | 'EMPLOYEE'

export interface Account {
    id:number,
    firstName: string;
    lastName:string,
    email: string;
    userType:UserType;
    token:string
}

interface IAuthContext {
    account: Account | null;
    login: (req:LoginRequest)=> void,
    register: (req:RegisterRequest)=> void,
    logout: ()=> void,
    isAuth: boolean,

}
export type LoginRequest = {
    email: string,
    password: string
}

export type RegisterRequest = {
    firstName: string,
    lastName:string,
    email:string,
    password: string,
    userType: UserType
}
const init:IAuthContext = { 
    account: null,
    isAuth: false ,
    register: ()=> {} ,
    login: ()=> {} ,
    logout: ()=>{}
}
const authContext = createContext<IAuthContext>(init);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [account, setAccount] = useState<Account | null>(null);
    const navigate = useNavigate();


    const { mutate: registerMutate,data: registerData,isSuccess: registerSuccess} = usePostCall<Account>("/auth/register", "account");
    const { mutate: loginMutate,data: loginData,isSuccess: loginSuccess} = usePostCall<Account>("/auth/login", "account");




    const register = (request: RegisterRequest): void => registerMutate(request);
    const login = (request: LoginRequest): void => loginMutate(request);
       

    const logout= () => {
        //TODO: send logout request
        localStorage.clear();
        Cookies.remove('token');
        setAccount(null);
        navigate("/login");

    }

    const isAuth = account !== null;


    useEffect(()=>{
        if(registerSuccess && registerData ){
            setAccount({...registerData})
            console.log(registerData);
            Cookies.set('token', registerData.token, { expires: 1 })
            localStorage.setItem('user', JSON.stringify({...registerData}))
            navigate("/messages")
        }
        if(loginSuccess && loginData ){
            setAccount({...loginData})
            Cookies.set('token', loginData.token, { expires: 1 })
            localStorage.setItem('user', JSON.stringify({...loginData}))
            navigate("/messages")
        }
    },[registerData, registerSuccess, loginData, loginSuccess])
  

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setAccount(foundUser);
        }
      }, []);

  

    return (
        <authContext.Provider value={{ account,register,login,logout,isAuth }}>
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


