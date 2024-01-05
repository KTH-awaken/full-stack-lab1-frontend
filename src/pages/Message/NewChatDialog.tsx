import { BASE_URL, useGetCall, usePostCall } from "../../api/apiService";
import {  FormEvent, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import SelectPopover from "../../components/SelectPopover";
import { useOAuth2 } from "../../context/oauth2-context";
import { AccountVm } from "../../api/types/user";



const NewChatDialog = () => {

    const { userData } = useOAuth2();
    const { data: doctors, isLoading } = useGetCall<AccountVm[]>(BASE_URL.USER_SERVICE + "/user/workers", "workers", { Authorization: `Bearer ${userData?.access_token}` });
    const { mutate } = usePostCall(BASE_URL.MESSAGE_SERVICE + "/message", "messages", { Authorization: `Bearer ${userData?.access_token}` })
    const [message, setMessage] = useState("");
    const [receiver, setReceiver] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({
            text: message,
            senderEmail: userData?.profile.email || "",
            receiverEmail: receiver,

        });       
        document.getElementById("closeDialog")?.click();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">New Message</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="mb-5">
                        <DialogTitle className="text-2xl">New Message</DialogTitle>
                        <DialogDescription>
                            In order to create new chat, choose the doctor you want to chat with first
                        </DialogDescription>
                    </DialogHeader>

                    <p className="mb-2">Doctor</p>
                    {isLoading && <p>Loading doctors...</p>}
                    {doctors && (
                        <>
                            <SelectPopover
                                title="doctor"
                                list={doctors.map((doctor) => ({ label: doctor?.firstName + " " + doctor?.lastName, value: doctor?.email }))}
                                value={receiver}
                                onValueChange={newValue => setReceiver(newValue)}
                            />
                        </>
                    )}
                    <div className="my-3"></div>
                    <p className="mb-2">Message</p>
                    <Textarea id="message" onChange={(e) => setMessage(e.target.value)} rows={8} className="resize-none border-none bg-accent" placeholder="Type your message here." />
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Send Message</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
export default NewChatDialog;