import { EditIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import SelectPopover from "../../components/SelectPopover"
import { ReactNode, useState } from "react"
import CustomTooltip from "../../components/Tooltip"
import { usePostCall } from "../../api/apiService"
import { ConditionApi } from "../../api/types/condition"
import { useAuth } from "../../context/auth-context"

interface Props {
    patientList: {
        label: string,
        value: string
    }[],
    customTrigger?: ReactNode
}

const AddConditoinDialog = ({ patientList, customTrigger }: Props) => {
    const [patientId, setPatientId] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const {account} = useAuth();
    const {mutate:newCondition} = usePostCall<ConditionApi>("http://localhost:8080","/condition","conditions")

    const handleClick = () => {        
        newCondition({diagnosis, patientId, doctorEmail:account?.email});
        (function () { document.getElementById('closeDialog')?.click(); }())

    }
    const Trigger = () => customTrigger ? customTrigger :
        <CustomTooltip desciption="Add Condition">
            <EditIcon size={22} />
        </CustomTooltip>

    return (
        <Dialog>
            <DialogTrigger>
                <Trigger />
            </DialogTrigger>


            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Register new condition to patient</DialogTitle>
                    <DialogDescription>
                        Fill the information needed below. Click create when you're done.
                    </DialogDescription>
                </DialogHeader>


                <div className="grid gap-4 py-4">
                    <div className="grid grid-flow-col grid-cols-4  items-center ">
                        <Label className="col-span-1" >Condition</Label>
                        <Input onChange={(e) => setDiagnosis(e.target.value)} className="col-span-3" placeholder="Condition..." />
                    </div>

                    <div className="grid grid-flow-col grid-cols-4 items-center ">
                        <Label className="col-span-1">Patient</Label>
                        <SelectPopover
                            className="col-span-3"
                            title="patient"
                            list={patientList}
                            value={patientId}
                            onValueChange={(newValue) => setPatientId(newValue)}
                        />
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

export default AddConditoinDialog