import { useParams } from "react-router-dom"
import { BASE_URL, useGetCall } from "../../api/apiService";
import AddEncounterDialog from "./AddEncounterDialog";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Loading } from "./Index";
import { EncounterApi } from "../../api/types/encounter";
import CustomAlert from "../../components/CustomAlert";
import { Accordion } from "../../components/ui/accordion";
import EncounterRow from "../Encounter/EncounterRow";
import { useOAuth2 } from "../../context/oauth2-context";
import { PatientInforamtion } from "./PatientInfo";
import { ButtonNew } from "./PatientDetails";

export const PatientEncounters = ({ patientEmail }: { patientEmail: string }) => {
    const params = useParams();
    const { userData } = useOAuth2()
    const { data: encounters, isLoading, isError } = useGetCall<EncounterApi[]>(BASE_URL.JOURNAL_SERVICE + "/encounter/" + params.patientEmail + ".com", "encounters", { Authorization: `Bearer ${userData?.access_token}` });

    if (isLoading) return <Loading />
    if (isError) return <CustomAlert title='Error' message='An error occurred. Please try again later' />

    return (
        <div className="flex flex-col justify-start mt-4 gap-5">
            <TooltipProvider>

                <PatientInforamtion>
                    <AddEncounterDialog patientEmail={patientEmail} customTrigger={<ButtonNew text="encounter" />} />
                </PatientInforamtion>

            </TooltipProvider>

            {isError && <div className="mb-2"><CustomAlert title="Error" message="An error occurred. Please try again later." /></div>}
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