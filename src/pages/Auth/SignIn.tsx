import { Logo } from '../../components/Logo';
import { Button } from '../../components/ui/button';
import { Card } from "../../components/ui/card";
import { Input } from '../../components/ui/input';
import { LoginRequest, useAuth } from '../../context/auth-context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';




const SignIn = () => {
    const { login } = useAuth();
    const { register, handleSubmit, reset, formState: { errors }, } = useForm<LoginRequest>({});

    const onSubmit: SubmitHandler<LoginRequest> = (data) => {
        login(data);
        reset();
    };

    return (
        <div>
            <div className='flex mt-[130px] justify-center'>
                <Card className='rounded-2xl p-6 min-w-[400px]   drop-shadow-xl' >
                    <a href="/">
                        <Logo />
                    </a>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5 pt-3 flex-col">
                        <div>
                            <Input {...register('email')} className="border-none bg-accent" placeholder="Email" type="text" ></Input>
                            {errors.email && <p className="text-red-400 inline-block  rounded-md my-2">{errors.email.message}</p>}
                        </div>
                        <div>
                            <Input {...register('password')} className="border-none bg-accent" placeholder="Password" type="password" ></Input>
                            {errors.password && <p className="text-red-400 inline-block  rounded-md my-2">{errors.password.message}</p>}
                        </div>
                        <Button type="submit">Login</Button>
                        <p>Don't have have an account? <NavLink className="text-primary" to="/register">Register</NavLink></p>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default SignIn