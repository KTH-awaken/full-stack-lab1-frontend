import { UsersIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../../components/ui/dialog"
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip'
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import SelectPopover from "../../components/SelectPopover"
import { useState } from "react"
import { DatePicker } from "../../components/DatePicker"
import TimePicker from "../../components/TimePicker"

interface Props {
    patientList: {
        label: string,
        value: string
    }[]
}

const AddEncounterDialog = ({ patientList }: Props) => {
    const [patient, setPatient] = useState("");
    const [date, setDate] = useState<Date>(new Date())
    const [time, setTime] = useState<{hour:number,min:number}>({hour:0,min:0})
    const [title, setTitle] = useState("");

    const handleClick = ()=>{
        console.log(patient, date, time, title);
        
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Tooltip>
                    <TooltipTrigger className='px-2 py-1 box-content cursor-pointer' asChild>
                        <UsersIcon size={22} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Encounter</p>
                    </TooltipContent>
                </Tooltip>
            </DialogTrigger>


            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new encounter</DialogTitle>
                    <DialogDescription>
                        Fill the information needed below. Click create when you're done.
                    </DialogDescription>
                </DialogHeader>


                <div className="grid gap-4 py-4">
                    <div className="grid grid-flow-col grid-cols-4  items-center ">
                        <Label className="col-span-1" >Title</Label>
                        <Input onChange={(e)=>setTitle(e.target.value)} className="col-span-3" placeholder="Encounter title..." />
                    </div>

                    <div className="grid grid-flow-col grid-cols-4 items-center ">
                        <Label className="col-span-1">Patient</Label>
                        <SelectPopover
                            className="col-span-3"
                            title="patient"
                            list={patientList}
                            value={patient}
                            onValueChange={(newValue) => setPatient(newValue)}
                        />
                    </div>
                    <div className="grid grid-flow-col grid-cols-4 items-center ">
                        <Label className="col-span-1">Date</Label>
                        <DatePicker
                            
                            date={date}
                            onDateChange={(newDate) => setDate(newDate)}

                        />
                    </div>
                    <div className="grid grid-flow-col grid-cols-4 items-center ">
                        <Label className="col-span-1">Time</Label>
                        <TimePicker onValueChange={(v)=> setTime(v)}/>
                    </div>

                   

                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleClick} type="submit">Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddEncounterDialog