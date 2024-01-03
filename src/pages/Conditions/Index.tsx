import { NavLink } from "react-router-dom";
import { BASE_URL, useGetCall } from "../../api/apiService";
import { ConditionApi } from "../../api/types/condition";
import CustomAlert from "../../components/CustomAlert";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useOAuth2 } from "../../context/oauth2-context";
import { Loading } from "../Patients/Index";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";



const Conditions = () => {
    const { userData } = useOAuth2()
    const { data: conditions, isLoading, isError } = useGetCall<ConditionApi[]>(BASE_URL.JOURNAL_SERVICE + "/conditions", "conditions", { Authorization: `Bearer ${userData?.access_token}` });

  return (
    <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-5">My Conditions</h1>
     {isError && <div className="mb-2"><CustomAlert title="Error" message="An error occured. Please try again later." /></div>}
            {conditions && conditions.length === 0 && <CustomAlert title="Info" message="You have no conditions" />}
            <Table>
                <TableCaption>List of patient conditions</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Diagnosis</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-end">Actions</TableHead>

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
                            <TableCell>{condition.timestamp.substring(0, 10)} {condition.timestamp.substring(11, 16)}</TableCell>
                            <TableCell className="text-end">
                                <NavLink to={`/condition/${condition.id}`}>
                                    <Button variant="outline">Details</Button>
                                </NavLink>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
    </Card>
  )
}

export default Conditions