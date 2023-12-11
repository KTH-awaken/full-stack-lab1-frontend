import { useParams } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Card } from "../../components/ui/card";
import { BASE_URL, useGetCall } from "../../api/apiService";
import CustomAlert from "../../components/CustomAlert";
import { AccountVm } from "../../api/types/user";
import { useOAuth2 } from "../../context/oauth2-context";
import { PatientConditions } from "./PatientConditions";
import { PatientEncounters } from "./PatientEncounters";
import PatientPicturesPage from "../Picture/PatientPicturesPage";



export const ButtonNew = ({ text }: { text: string }) => <p className="float-right inline-block px-4 py-2 bg-primary rounded-lg text-primary-foreground">New {text}</p>

const PatientDetails = () => {
    const params = useParams();
    const { userData } = useOAuth2()
    const { data, isError } = useGetCall<AccountVm>(BASE_URL.USER_SERVICE + "/user/" + params.patientEmail + ".com", "patients", { Authorization: `Bearer ${userData?.access_token}` });

    return (

        <Card className="p-6">
            {isError && <div className="mb-2"><CustomAlert title="Error" message="An error occured. Please try again later." /></div>}
            <Tabs defaultValue="condition" >
                <TabsList className="mb-4 w-full justify-between">
                    <TabsTrigger className="w-1/2" value="condition">Conditions</TabsTrigger>
                    <TabsTrigger className="w-1/2" value="encounter">Encounters</TabsTrigger>
                    <TabsTrigger className="w-1/3" value="pictures">Pictures</TabsTrigger>
                </TabsList>
                <TabsContent value="condition">{data && <PatientConditions patientEmail={data.email} />}</TabsContent>
                <TabsContent value="encounter">{data && <PatientEncounters patientEmail={data.email} />}</TabsContent>
                <TabsContent value="pictures"><PatientPicturesPage/> </TabsContent>

            </Tabs>
        </Card>
    )
}

export default PatientDetails