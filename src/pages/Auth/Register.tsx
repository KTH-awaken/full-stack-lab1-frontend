import { Logo } from '../../components/Logo';
import { Button } from '../../components/ui/button';
import { Card } from "../../components/ui/card";
import { Input } from '../../components/ui/input';
import { FormEvent, useState } from 'react';
import { RegisterRequest, UserType, useAuth } from '../../context/auth-context';
import { NavLink } from 'react-router-dom';




const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");

    const {register } = useAuth();


    // const {mutate} = usePostCall<string>("/account","user")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            return
        }
        const userToCreate: RegisterRequest = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            userType: userType as UserType,
        }


        setFirstName("");
        setEmail("");
        setLastName("");
        setEmail("");
        setPassword("");


        register(userToCreate)


    }

    return (
        <div>
            <div className='flex mt-[130px] justify-center'>
                <Card className='rounded-2xl p-6 min-w-[400px]   drop-shadow-xl' >
                    <a href="/">
                        <Logo />
                    </a>
                    <form onSubmit={handleSubmit} className="flex gap-5 pt-3 flex-col">
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="border-none bg-accent mx-200" placeholder="First name" type="text" ></Input>
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} className="border-none bg-accent" placeholder="Last name" type="text" ></Input>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} className="border-none bg-accent" placeholder="Email" type="text" ></Input>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} className="border-none bg-accent" placeholder="Password" type="password" ></Input>
                        <div className='flex flex-row justify-between'>
                            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    id="patient"
                                    onChange={() => setUserType("PATIENT")}
                                />
                                <label className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"> Patient</label>
                            </div>
                            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    id="doctor"
                                    onChange={() => setUserType("DOCTOR")}
                                />
                                <label className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"> Doctor</label>
                            </div>
                            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                <input
                                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                    type="radio"
                                    id="EMPLOYEE"
                                    onChange={() => setUserType("EMPLOYEE")}
                                />
                                <label className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"> Employee</label>
                            </div>
                        </div>
                        <Button type="submit">Register</Button>
                        <p>Allready have an account? <NavLink className="text-primary" to="/login">Login</NavLink></p>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default Register