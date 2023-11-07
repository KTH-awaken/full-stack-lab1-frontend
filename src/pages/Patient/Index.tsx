import { Card } from '../../components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { BookUserIcon, EditIcon, UsersIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip'
import { useGetCall } from '../../api/crud'
import { PatientApi } from '../../api/types/user'
import { Skeleton } from '../../components/ui/skeleton'
import { uid } from '../../helpers/helpers'
import { NavLink } from 'react-router-dom'
import AddEncounterDialog from './AddEncounterDialog'



const Loading = () => {
    const arr = new Array(5).fill(1);
    return (

        <div className='flex flex-col gap-4 '>
            {arr.map(_ => (<div key={uid()} className='py-2'><Skeleton className='w-full h-6' /></div>))}
        </div>

    )
}



const Patients = () => {
    const { data: patients, isLoading, isError } = useGetCall<PatientApi[]>("/patients");
    const patientList = patients?.map(d => ({label:d.name, value:d.email}))

    return (
        <Card className='p-6 rounded-2xl bg-background'>
            <h1 className='text-2xl font-semibold mb-5'>Patients</h1>
            <Table>
                <TableCaption>List of all patients.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading &&
                        <TableRow>
                            <TableCell><Loading /></TableCell>
                            <TableCell><Loading /></TableCell>
                            <TableCell><Loading /></TableCell>
                        </TableRow>
                    }
                    {patients && patients.map((patient) => (
                        <TableRow key={patient.id}>
                            <TableCell className="font-medium">{patient.name}</TableCell>
                            <TableCell>{patient.email}</TableCell>
                            <TableCell className="text-right flex items-center justify-end gap-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className='px-2 py-1 box-content cursor-pointer' asChild>
                                            <NavLink to={patient.id + ""}>
                                                <BookUserIcon size={22} />
                                            </NavLink>

                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>See Patient Details</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip>
                                        <TooltipTrigger className='px-2 py-1 box-content cursor-pointer' asChild>
                                            <EditIcon size={22} />


                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Add Condition</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    {patientList && <AddEncounterDialog patientList={patientList}/>}

                                </TooltipProvider>



                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Card >
    )
}

export default Patients