import { useParams } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card } from "../../components/ui/card";
import AddConditoinDialog from "./AddConditionDialog";
import {  BASE_URL, useGetCall } from "../../api/apiService";
import AddEncounterDialog from "./AddEncounterDialog";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Loading } from "./Index";
import { EncounterApi } from "../../api/types/encounter";
import CustomAlert from "../../components/CustomAlert";
import { Accordion } from "../../components/ui/accordion";
import EncounterRow from "../Encounter/EncounterRow";
import { ConditionApi } from "../../api/types/condition";
import { AccountVm } from "../../api/types/user";
import { useOAuth2 } from "../../context/oauth2-context";
import { Skeleton } from "../../components/ui/skeleton";
import { uid } from "../../helpers/helpers";


const ButtonNew = ({ text }: { text: string }) => <p className="float-right inline-block px-4 py-2 bg-primary rounded-lg text-primary-foreground">New {text}</p>




const Information = () => {
    const {userData} = useOAuth2();
    const params = useParams();
    const { data: patient, isLoading, isError } = useGetCall<AccountVm>(BASE_URL.USER_SERVICE+"/user/" + params.patientEmail+".com", "patient", { Authorization: `Bearer ${userData?.access_token}` });
    

    const InfoLoading = () => {
        const arr = new Array(3).fill(1);
        return (
            <div className="flex flex-col gap-7">
                {arr.map(()=> (
                    <div key={uid()} className="flex flex-col gap-4">
                        <Skeleton className="h-5 w-[150px]" />
                        <Skeleton className="h-5 w-[400px]" />
                    </div>
                ))}
            </div>
        )
    }

    if(isLoading) return <InfoLoading/>
    if(isError) return <CustomAlert title="Error" message="An error occured. Please try again later"/>

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Information</h1>
            <div className="flex flex-col gap-2">
                <p><strong className="text-foreground/50 font-medium">Firstname: </strong> {patient && patient.firstName}</p>
                <p><strong className="text-foreground/50 font-medium">Lastname: </strong> {patient && patient.lastName}</p>
                <p><strong className="text-foreground/50 font-medium">Email: </strong> {patient && patient.email}</p>
            </div>
        </>

    )
}


const Condition = ({patientEmail}:{patientEmail:string}) => {
    const params = useParams();
    const {userData} = useOAuth2()
    const { data: conditions, isLoading, isError } = useGetCall<ConditionApi[]>(BASE_URL.JOURNAL_SERVICE + "/conditions/" + params.patientEmail+".com", "conditions", { Authorization: `Bearer ${userData?.access_token}` });


    return (
        <div className="flex flex-col justify-start mt-4 gap-3">
            <TooltipProvider>
                <AddConditoinDialog patientEmail={patientEmail} customTrigger={<ButtonNew text="condition" />} />
            </TooltipProvider>
            {isError && <div className="mb-2"><CustomAlert title="Error" message="An error occured. Please try again later." /></div>}
            {conditions && conditions.length === 0 && <CustomAlert title="Info" message="This patient has no conditions" />}
            <Table>
                <TableCaption>List of patient conditions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Diagnosis</TableHead>
                        <TableHead>Diagnosed by</TableHead>
                        <TableHead>Date</TableHead>
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
                    {conditions && conditions.map((condition) => (
                        <TableRow key={condition.id}>
                            <TableCell>{condition.diagnosis}</TableCell>
                            <TableCell>{condition.doctor?.firstName.concat(" " + condition.doctor?.lastName)}</TableCell>
                            <TableCell>{condition.timestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
const Encounter = ({patientEmail}:{patientEmail:string}) => {
    const params = useParams();
    const {userData} = useOAuth2()
    const { data: encounters, isLoading, isError } = useGetCall<EncounterApi[]>(BASE_URL.JOURNAL_SERVICE +"/encounter/" + params.patientEmail+".com",  "encounters", { Authorization: `Bearer ${userData?.access_token}` });

    if (isLoading) return <Loading />
    if (isError) return <CustomAlert title='Error' message='An error occured. Please try again later' />
    return (
        <div className="flex flex-col justify-start mt-4 gap-5">

            <TooltipProvider>
                <AddEncounterDialog patientEmail={patientEmail} customTrigger={<ButtonNew text="encounter" />} />
            </TooltipProvider>

            {isError && <div className="mb-2"><CustomAlert title="Error" message="An error occured. Please try again later." /></div>}
            {encounters && encounters.length === 0 && <CustomAlert title="Info" message="This patient has no encounters" />}
            <Accordion type="single" collapsible>
                {encounters && encounters.map((enc: EncounterApi) =>
                    <EncounterRow
                        key={enc.id}
                        encounter={enc}
                        className="bg-accent shadow-none data-[state=open]:pb-4"
                    />)}
            </Accordion>

        </div>
    )
}


const PatientDetails = () => {
    const params = useParams();
    const {userData} = useOAuth2()
    const { data, isError } = useGetCall<AccountVm>(BASE_URL.USER_SERVICE + "/user/"+ params.patientEmail+".com", "patients", { Authorization: `Bearer ${userData?.access_token}` });



    return (

        <Card className="p-6">
            {isError && <div className="mb-2"><CustomAlert title="Error" message="An error occured. Please try again later." /></div>}
            <Tabs defaultValue="info" >
                <TabsList className="mb-4 w-full justify-between">
                    <TabsTrigger className="w-1/3" value="info">Information</TabsTrigger>
                    <TabsTrigger className="w-1/3" value="condition">Conditions</TabsTrigger>
                    <TabsTrigger className="w-1/3" value="encounter">Encounters</TabsTrigger>
                </TabsList>
                <TabsContent value="info"><Information /></TabsContent>
                <TabsContent value="condition">{data && <Condition patientEmail={data.email} />}</TabsContent>
                <TabsContent value="encounter">{data && <Encounter patientEmail={data.email} />}</TabsContent>
            </Tabs>
        </Card>
    )
}

export default PatientDetails