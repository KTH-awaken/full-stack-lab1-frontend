import { ChangeEvent, ReactNode, useState } from "react"
import { PictureApi } from "../../api/types/picture"
import { usePostCall } from "../../api/apiService"
import { DatePicker } from "../../components/DatePicker"
import { Button } from "../../components/ui/button"
import { ImagePlus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import CustomTooltip from "../../components/Tooltip"
import { Input } from "../../components/ui/input"

interface Props {
    customTrigger?: ReactNode
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1];
          resolve(base64String);
        } else {
          reject(new Error('Failed to read file as base64.'));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

const AddPictureDialog = ({ customTrigger }: Props) => {
    
    // const {account} = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [patientEmail, setPatientEmail] = useState("Patient@Email1");
    const [doctorEmail, setDoctorEmail] = useState("Doctor@Email1");
    const [date, setDate] = useState<Date>(new Date())

    
    const {mutate:newPicture} = usePostCall<PictureApi>(    
    'http://localhost:8000',
    '/api/upload-picture',
    'pictures',)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
      };

      const handleClick = async () => {
        console.log("clicked upload");
        if (file) {
          try {
            const base64String = await fileToBase64(file);
      
            const formData = new FormData();
            formData.append("picture_data_base64", base64String);
            formData.append("patientEmail", patientEmail);
            formData.append("doctorEmail", doctorEmail);
            formData.append("date", date.toISOString()); 
      
            newPicture(formData);
            console.log(newPicture)
            console.log(formData.toString())
          } catch (error) {
            console.error("Error converting file to base64:", error);
          }
        }
      
        // Reset values and close the dialog
        document.getElementById("closeDialog")?.click();
        setPatientEmail("Patient@Email1");
        setDoctorEmail("Doctor@Email1");
        setDate(new Date());
      };
      
    
    

    const Trigger = () => customTrigger ? customTrigger :
        <CustomTooltip desciption="Upload picture">
            <ImagePlus size = {22} />
        </CustomTooltip>


    return(
        <Dialog>
            <DialogTrigger>
                <Trigger />
            </DialogTrigger>


            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload new patient picture</DialogTitle>
                    <DialogDescription>
                        Upload the file and select picture date below. Click upload when you're done.
                    </DialogDescription>
                </DialogHeader>


                <div className="grid gap-4 py-4">

                    <div className="grid grid-flow-col grid-cols-4 items-center ">
                        <Label className="col-span-1 ">Upload</Label>
                        <Input type="file" accept="image/*" onChange={handleFileChange} className = "col-span-3"/>
                    </div>

                    <div className="grid grid-flow-col grid-cols-4 items-center ">
                        <Label className="col-span-1">Date</Label>
                        <DatePicker
                            date={date}
                            onDateChange={(newDate) => setDate(newDate)}
                        />
                    </div>
              
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleClick} type="submit">Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default AddPictureDialog