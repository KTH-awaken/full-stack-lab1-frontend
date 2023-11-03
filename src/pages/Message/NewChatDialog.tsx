import * as z from "zod"
import { useGetCall } from "../../api/crud";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { currentUser } from "../../auth/fake-user";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../components/ui/command";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/lib";
import { Textarea } from "../../components/ui/textarea";
import { DoctorSelect } from "../../types";



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



type DoctorSelectPopoverProps = {
    doctors: DoctorSelect[];
    value: string;
    onValueChange: (newValue: string) => void;
}

const DoctorSelectPopover = ({ doctors, value, onValueChange }: DoctorSelectPopoverProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between border-none bg-accent"
                >
                    {value
                        ? doctors.find((doctor) => doctor.value === value)?.label
                        : "Select doctor..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No Doctor found.</CommandEmpty>
                    <CommandGroup>
                        {doctors.map((doctor) => (
                            <CommandItem
                                key={doctor.value}
                                value={doctor.value}
                                onSelect={(currentValue) => {
                                    onValueChange(currentValue === value ? "" : currentValue);
                                    setOpen(false);
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === doctor.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {doctor.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};




const NewChatDialog = () => {

    const { data: doctors } = useGetCall<DoctorSelect[]>("/doctors");
    const [reciever, setReviever] = useState("")

    const { register, handleSubmit, setValue, reset, formState: { errors }, } = useForm<FormData>({
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
                    {
                        doctors && <DoctorSelectPopover
                            doctors={doctors}
                            value={reciever}
                            onValueChange={(newValue) => setReviever(newValue)}
                        />
                    }
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

export default NewChatDialog;