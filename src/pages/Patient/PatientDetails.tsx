import { useParams } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card } from "../../components/ui/card";
import AddConditoinDialog from "./AddConditionDialog";
import { useGetCall } from "../../api/apiService";
import { PatientApi } from "../../api/types/user";
import AddEncounterDialog from "./AddEncounterDialog";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Loading } from "./Index";
import { ConditionApi } from "../../api/types/condition";
import { EncounterApi } from "../../api/types/encounter";
import CustomAlert from "../../components/CustomAlert";
import { Accordion } from "../../components/ui/accordion";
import EncounterRow from "../Encounter/EncounterRow";


const ButtonNew = ({ text }: { text: string }) => <p className="float-right inline-block px-4 py-2 bg-primary rounded-lg text-primary-foreground">New {text}</p>

const Information = () => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Information</h1>
            <div className="flex flex-col gap-2">
                <p><strong className="text-foreground/50 font-medium">Name: </strong> Hamada Aljarrah</p>
                <p><strong className="text-foreground/50 font-medium">Email: </strong> hamada@gmail.com</p>
                <p><strong className="text-foreground/50 font-medium">Conditions: </strong> 4 </p>
                <p><strong className="text-foreground/50 font-medium">Observations: </strong> 5</p>
            </div>
        </>

    )
}


const Condition = ({ patientList }: { patientList: { label: string, value: string }[] }) => {
    const { data: conditions, isLoading, isError } = useGetCall<ConditionApi[]>("/conditions");
    return (
        <div className="flex flex-col justify-start mt-4 gap-3">
            <TooltipProvider>
                <AddConditoinDialog patientList={patientList} customTrigger={<ButtonNew text="condition" />} />
            </TooltipProvider>

            <Table>
                <TableCaption>List of patient conditions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[65%]">Diagnosis</TableHead>
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
                            <TableCell>{condition.doctor.name}</TableCell>
                            <TableCell>{condition.timestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
const Encounter = ({ patientList }: { patientList: { label: string, value: string }[] }) => {
    const { data: encounters, isLoading, isError } = useGetCall<EncounterApi[]>("/encounters");
    if (isLoading) return <Loading />
    if (isError) return <CustomAlert title='Error' message='An error occured. Please try again later' />
    return (
        <div className="flex flex-col justify-start mt-4 gap-5">
            <TooltipProvider>
                <AddEncounterDialog patientList={patientList} customTrigger={<ButtonNew text="encounter" />} />
            </TooltipProvider>


            <Accordion type="single" collapsible>
                {encounters && encounters.map((enc: EncounterApi) =>
                    <EncounterRow
                        key={enc.id}
                        encounter={enc}
                        className="bg-accent shadow-none data-[state=open]:pb-4"
                    >
                        <div className="p-2">
                            <ButtonNew text=" observation" />
                        </div>
                    </EncounterRow>)}
            </Accordion>

        </div>
    )
}


const PatientDetails = () => {
    const params = useParams();
    const { data: patients, isLoading, isError } = useGetCall<PatientApi[]>("/patients");
    const patientList = patients?.map(d => ({ label: d.name, value: d.email }))
    console.log(params, isLoading, isError);


    return (

        <Card className="p-6">
            <Tabs defaultValue="info" >
                <TabsList className="mb-4 w-full justify-between">
                    <TabsTrigger className="w-1/3" value="info">Information</TabsTrigger>
                    <TabsTrigger className="w-1/3" value="condition">Conditions</TabsTrigger>
                    <TabsTrigger className="w-1/3" value="encounter">Encounters</TabsTrigger>
                </TabsList>
                <TabsContent value="info"><Information /></TabsContent>
                <TabsContent value="condition">{patientList && <Condition patientList={patientList} />}</TabsContent>
                <TabsContent value="encounter">{patientList && <Encounter patientList={patientList} />}</TabsContent>
            </Tabs>
        </Card>
    )
}

export default PatientDetails