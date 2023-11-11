import Container from '../components/Container'
import { Logo } from '../components/Logo';
import { Button } from '../components/ui/button';
import { Card } from "../components/ui/card";
import { Input } from '../components/ui/input';
import { FormEvent, useState } from 'react';




const SignIn = () => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!message.trim()) {
            return
        }

        setMessage("");

    }
    return(
        <div className='flex items-center justify-center h-screen'>
            <Container>
                <Card className='min-h-1000'>
                    <a href="/">
                        <Logo />
                    </a>
                    <form onSubmit={handleSubmit} className="flex gap-3 pt-3">
                        <Input value={message} onChange={(e) => setMessage(e.target.value)} className="border-none bg-accent" placeholder="Type a message..." type="text" name="" id="" ></Input>
                        <Button type="submit">Send</Button>
                    </form>
                </Card>

            </Container>
        </div>
    )
} 

export default SignIn