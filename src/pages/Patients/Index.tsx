import { Card } from '../../components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { BookUserIcon } from 'lucide-react'
import { TooltipProvider } from '../../components/ui/tooltip'
import {  BASE_URL, useGetCall } from '../../api/apiService'
import { Skeleton } from '../../components/ui/skeleton'
import { uid } from '../../helpers/helpers'
import { NavLink } from 'react-router-dom'
import AddEncounterDialog from './AddEncounterDialog'
import AddConditoinDialog from './AddConditionDialog'
import CustomTooltip from '../../components/Tooltip'
import CustomAlert from '../../components/CustomAlert'
import { AccountVm } from '../../api/types/user'
import { useOAuth2 } from '../../context/oauth2-context'
import AddPictureDialog from './AddPictureDialog'



export const Loading = () => {
    const arr = new Array(5).fill(1);
    return (
        <div className='flex flex-col gap-4 '>
            {arr.map(_ => (<div key={uid()} className='py-2'><Skeleton className='w-full h-6' /></div>))}
        </div>
    )
}

const Patients = () => {
    const { userData } = useOAuth2();
    const { data: patients, isLoading, isError } = useGetCall<AccountVm[]>(BASE_URL.USER_SERVICE + "/user/patients", "patients", { Authorization: `Bearer ${userData?.access_token}` });
    const patientList = patients?.map(d => ({ label: d.firstName +" "+ d.lastName, value: d.email }))

    return (
        <>
            {isError && <div className='mb-2'><CustomAlert title='Error' message='An error occured. Please try again later.' /></div>}
            <Card className='p-6 rounded-2xl bg-background'>
                <h1 className='text-2xl font-semibold mb-5'>Patients</h1>

                <Table>
                    <TableCaption>List of all patients.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className='hidden lg:table-cell'>Email</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading &&
                            <TableRow>
                                <TableCell><Loading /></TableCell>
                                <TableCell className='hidden lg:table-cell'><Loading /></TableCell>
                                <TableCell><Loading /></TableCell>
                            </TableRow>
                        }
                        {patients && patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">{patient.firstName.concat(" " + patient.lastName)}</TableCell>
                                <TableCell className='hidden lg:table-cell'>{patient.email}</TableCell>
                                <TableCell className="text-right flex items-center justify-end gap-4">
                                    <TooltipProvider>
                                         <CustomTooltip desciption='Patient Details'>
                                            <NavLink to={patient.email.substring(0, patient.email.length-4) + ""}>
                                                <BookUserIcon size={22} />
                                            </NavLink>
                                        </CustomTooltip>
                                        {patientList && <AddConditoinDialog patientEmail={patient.email} />}
                                        {patientList && <AddEncounterDialog patientEmail={patient.email} />}
                                        {patientList && <AddPictureDialog patient={patient} />}
                                    </TooltipProvider>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card >
        </>

    )
}

export default Patients