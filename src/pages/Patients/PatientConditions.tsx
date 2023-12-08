import { useParams } from "react-router-dom"
import AddConditoinDialog from "./AddConditionDialog";
import { BASE_URL, useGetCall } from "../../api/apiService";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Loading } from "./Index";
import CustomAlert from "../../components/CustomAlert";
import { ConditionApi } from "../../api/types/condition";
import { useOAuth2 } from "../../context/oauth2-context";
import { PatientInforamtion } from "./PatientInfo";
import { ButtonNew } from "./PatientDetails";




export const PatientConditions = ({ patientEmail }: { patientEmail: string }) => {
    const params = useParams();
    const { userData } = useOAuth2()
    const { data: conditions, isLoading, isError } = useGetCall<ConditionApi[]>(BASE_URL.JOURNAL_SERVICE + "/conditions/" + params.patientEmail + ".com", "conditions", { Authorization: `Bearer ${userData?.access_token}` });


    return (
        <div className="flex flex-col justify-start mt-4 gap-3">
            <PatientInforamtion />

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