import * as z from "zod"
import { NavLink, Outlet } from "react-router-dom"
import { Button } from "../components/ui/button";
import { chatname } from "./Chat";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Card } from "../components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../components/ui/command";
import { cn } from "../lib/lib";
import { Textarea } from "../components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { CHATS, DOCTORS } from "../auth/fake-data";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { currentUser } from "../auth/fake-user";
import { useGetCall } from "../api/crud";
import { Skeleton } from "../components/ui/skeleton";


export interface Message {
    content: string,
    user: string,
    timestamp: string
}
export interface Chat {
    sender: string,
    reciver: string,
    messages: Message[]
    id: string,
}

type FormData = z.infer<typeof formSchema>;

const formSchema = z.object({
    sender: z.string()
        .min(2, "Sender name is required")
        .max(50, "Sender must be at most 50 characters.")
        .refine(value => value !== '', "Sender is required"),

    reciever: z.string()
        .min(2, "Doctor name is required")
        .max(50, "Doctor name must be at most 50 characters.")
        .refine(value => value !== '', "Doctor name is required."),

    message: z.string()
        .min(2, "Message is required")
        .max(500, "Message must be at most 500 characters.")
        .refine(value => value !== '', "Message is required")
});


const MessageDialog = () => {

    const [open, setOpen] = useState(false)
    const [reciever, setReviever] = useState("")

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sender: currentUser.email,
            reciever: reciever,
            message: "",
        },
    });

    useEffect(() => {
        setValue('reciever', reciever);
    }, [reciever]);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // HERE DO REST API HERE...

        console.log(data);
        reset();
        setReviever("");
        (function () { document.getElementById('closeDialog')?.click(); }())

    };


    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="default">New Message</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DialogHeader className="mb-5">
                        <DialogTitle className="text-2xl">New Message</DialogTitle>
                        <DialogDescription>
                            In order to create new chat, choose the doctor you want to chat with first
                        </DialogDescription>
                    </DialogHeader>

                    <p className="mb-2">Doctor</p>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between border-none bg-accent"
                            >
                                {reciever
                                    ? DOCTORS.find((doctor) => doctor.value === reciever)?.label
                                    : "Select doctor..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search framework..." />
                                <CommandEmpty>No Doctor found.</CommandEmpty>
                                <CommandGroup>
                                    {DOCTORS.map((doctor) => (
                                        <CommandItem
                                            key={doctor.value}
                                            value={doctor.value}
                                            onSelect={(currentValue) => {
                                                setReviever(currentValue === reciever ? "" : currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    reciever === doctor.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {doctor.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {errors.reciever && <p className="text-red-400 inline-block  rounded-md my-2">{errors.reciever.message}</p>}
                    <div className="my-3"></div>
                    <p className="mb-2">Message</p>
                    <Textarea id="message" {...register('message')} rows={8} className="resize-none border-none bg-accent" placeholder="Type your message here." />
                    {errors.message && <p className="text-red-400 inline-block   rounded-md my-2">{errors.message.message}</p>}
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Send Message</Button>
                    </DialogFooter>
                </form>

            </DialogContent >

        </Dialog >
    )
}

const MessageRow = ({ chat }: { chat: Chat }) => {
    const classes = "p-4 py-2 mb-2 block border-b flex gap-4 pl-2"
    return (
        <NavLink end className={({ isActive }) => isActive ? `bg-accent rounded-xl border-none ${classes}` : classes} to={`/messages/${chat.id}`}>
            <Avatar>
                <AvatarImage className="w-12 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="@shadcn" />
            </Avatar>
            <div className="flex-grow">
                <p className="font-semibold mb-1 ">{chatname(chat)}</p>
                <div className="flex justify-between  items-center">
                    <p className="text-sm font-light text-foreground/80">{chat.messages[chat.messages.length - 1].content}</p>
                    <p className="text-xs font-light text-foreground/80">{chat.messages[chat.messages.length - 1].timestamp}</p>

                </div>
            </div>

        </NavLink>
    )
}

const MessageRowLoading = () => {
    const arr = new Array(10).fill(1);
    return (
        <>
            {arr.map(_ => (
                <div className="flex items-center space-x-4 py-2 mb-3">
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

const Messages = () => {
    const { data: chats, isLoading, isError } = useGetCall<Chat[]>("/chats");

    return (
        <div className="flex justify-between gap-10 h-[80vh] ">
            <Card className="w-1/2 p-6 pt-0 bg-background rounded-2xl overflow-y-auto relative">
                <div className="flex items-start justify-between mb-4 pb-2 pt-6  sticky top-0 bg-background">
                    <h1 className="text-xl font-bold">Message</h1>
                    <MessageDialog />
                </div>
                <div>
                    {isLoading && <MessageRowLoading />}
                </div>
                <div >
                    {chats && chats.map((chat, index) => <MessageRow key={index} chat={chat} />)}
                </div>
            </Card>
            <div className="w-1/2 h-full">
                <Outlet />
            </div>

        </div>
    )
}

export default Messages