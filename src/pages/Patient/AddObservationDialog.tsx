import  { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../../components/ui/dialog'
import { DialogClose, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Label } from '@radix-ui/react-menubar'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { usePostCall } from '../../api/apiService'
import { ObservationApi } from '../../api/types/encounter'
import { useNavigate } from 'react-router-dom';

const AddObservationDialog = ({encounterId}: {patientId:number, encounterId:number}) => {
    const [observation, setObservation] = useState("");
    const {mutate:newObservation} = usePostCall<ObservationApi>("http://localhost:8080","/observation","observations")
    const navigate = useNavigate()

    const handleClick = ()=>{
        
        newObservation({content:observation, encounterId});
        (function () { document.getElementById('closeDialog')?.click(); }())
        navigate(0);
    }

    return (
        <Dialog>
            <DialogTrigger>
                <p className='mt-2 mb-0 cursor-pointer px-4 py-2 rounded-lg bg-primary text-primary-foreground'>Add observation</p>
            </DialogTrigger>


            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className='font-bold mb-2 text-xl'>New observation </DialogTitle>
                    <DialogDescription>
                        Fill the information needed below. Click create when you're done.
                    </DialogDescription>
                </DialogHeader>


                    <div className="flex flex-col justify-start gap-2 ">
                        <Label className="col-span-1" >Observation</Label>
                        <Input onChange={(e) => setObservation(e.target.value)} className="col-span-3" placeholder="Observation..." />
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

export default AddObservationDialog