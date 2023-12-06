import * as z from "zod";
import { useGetCall, usePostCall } from "../../api/apiService";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAuth } from "../../context/auth-context";
import SelectPopover from "../../components/SelectPopover";
import { AccountVm, MessageVm } from "../../api/types/chat";
import type { UseMutationResult } from "react-query";
import {useNavigate} from "react-router-dom"
type FormData = z.infer<typeof formSchema>;

const formSchema = z.object({
    sender: z.string()
        .min(2, "Sender name is required")
        .max(50, "Sender must be at most 50 characters.")
        .refine(value => value !== '', "Sender is required"),

    reciever: z.string(),
        // .min(2, "Doctor name is required")
        // .max(50, "Doctor name must be at most 50 characters."),
        // .refine(value => value !== '', "Doctor name is required."),

    message: z.string()
        .min(2, "Message is required")
        .max(500, "Message must be at most 500 characters.")
        .refine(value => value !== '', "Message is required")
});

const useSendMessageMutation = (): UseMutationResult<MessageVm, unknown, MessageVm, unknown> => {
    return usePostCall<MessageVm, MessageVm>('/message', 'message');
};

const NewChatDialog = () => {

    const { account } = useAuth();
    const navigate = useNavigate();
    const { data: doctors, isLoading } = useGetCall<AccountVm[]>("/workers");

    const [reciever, setReceiver] = useState("");
    // const [ setReceiverId] = useState<number >();
    const { register, handleSubmit, setValue, reset, formState: { errors } } =
      useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          sender: `${account?.firstName} ${account?.lastName}` || "",
          reciever: reciever,
          message: "",
        },
      });
  
    useEffect(() => {
      setValue("reciever", reciever);
    }, [reciever]);
  

  
    const sendMessageMutation = useSendMessageMutation();
  
    const onSubmit: SubmitHandler<FormData> = async (data) => {
      try {
        
        console.log(account?.id);
        console.log("ID ______");
        const messageVm: MessageVm = {
          text: data.message,
          sender: account?.id || -1,
          receiver: Number(data.reciever),
          senderFirstName: "",
          senderLastName: "",
          receiverFirstName: "",
          receiverLastName: "",
          date: ""
        };
        console.log(messageVm);
        sendMessageMutation.mutateAsync(messageVm).then( response => {
            if(response){
              console.log(response);
            }
        });
        reset();
        document.getElementById("closeDialog")?.click();
        navigate(0);

      } catch (error) {
        console.error("Error sending message:", error);
      }
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
                    <input type="hidden" {...register('sender')}  value={`${account?.id}  `} />

                    <p className="mb-2">Doctor</p>
                    {isLoading && <p>Loading doctors...</p>}
                    {doctors && (
                      <>
                        <SelectPopover
                          title="doctor"
                          list={doctors.map((doctor) => ({ label: doctor?.firstName, value: doctor?.email }))}
                          value={reciever}
                          onValueChange={(newValue) => {
                            setReceiver(newValue.toString());
                          }}
                        />
                      </>
                    )}
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
            </DialogContent>
        </Dialog>
    );
}
export default NewChatDialog;