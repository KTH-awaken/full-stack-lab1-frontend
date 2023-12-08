import { BASE_URL, useGetCall } from "../../api/apiService";
import CustomAlert from "../../components/CustomAlert";
import EncounterRow from "./EncounterRow";
import { Accordion, } from "../../components/ui/accordion"
import { Card } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { uid } from "../../helpers/helpers";
import { EncounterApi } from "../../api/types/encounter";
import { useOAuth2 } from "../../context/oauth2-context";



const Loading = () => {
    const arr = new Array(10).fill(1);

    return (
        <>
            <h1 className="text-2xl font-semibold mb-5">My Encounters</h1>
            {arr.map(_ => (
                <Card key={uid()} className="mb-3 ">
                    <div className=" flex items-center justify-between border-b-0 data-[state=open]:border-l-8 border-primary px-5 py-[27px] rounded-2xl bg-background" >
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[15px]" />

                    </div>
                </Card>
            ))}
        </>

    )
}

const Encounters = () => {
    const {userData} = useOAuth2();
    const header = {Authorization: `Bearer ${userData.access_token}`}
    const { data: encounters, isLoading, isError } = useGetCall<EncounterApi[]>(BASE_URL.JOURNAL_SERVICE +"/encounter", "encounter", header);
 
    if (isLoading) return <Loading />
    if (isError) return <CustomAlert title='Error' message='An error occured. Please try again later' />

    
    return (
        <Card className="p-6">
            <h1 className="text-2xl font-semibold mb-5">My Encounters</h1>
            {encounters && encounters.length === 0 && <CustomAlert title="Info" message="This patient has no encounters" />}
            <Accordion type="single" collapsible>
                {encounters && encounters.map((enc: EncounterApi) =>
                    <EncounterRow
                        key={uid()}
                        encounter={enc}
                        className="bg-accent shadow-none data-[state=open]:pb-0"
                    />)}
            </Accordion>

        </Card>
    )
}

export default Encounters