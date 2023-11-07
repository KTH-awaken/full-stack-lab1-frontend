import { useGetCall } from "../../api/crud";
import CustomAlert from "../../components/CustomAlert";
import EncounterRow from "./EncounterRow";
import { Accordion, } from "../../components/ui/accordion"
import { Card } from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { uid } from "../../helpers/helpers";
import { useAuth } from "../../context/auth-context";
import { EncounterApi } from "../../api/types/encounter";



const Loading = () => {
    const arr = new Array(10).fill(1);
    return (
        <>
            <h1 className="text-3xl font-bold mb-8">My Encounters</h1>
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
    const {account} = useAuth();
    const { data:encounters, isLoading, isError } = useGetCall<EncounterApi[]>("/encounters");
    // const url = account.role.toLocaleLowerCase();
    // const { data:encounters, isLoading, isError } = useGetCall<EncounterApi[]>("/encounters/"+url+"/"+account.id);
    


    
    if (isLoading) return <Loading />
    if (isError) return <CustomAlert title='Error' message='An error occured. Please try again later' />

    return (
        <>
            <h1 className="text-3xl font-bold mb-8">My Encounters</h1>
            <Accordion type="single" collapsible>
                {encounters && encounters.map((enc:EncounterApi) => 
                    <EncounterRow 
                        key={uid()} 
                        encounter={enc}
                    />)}
            </Accordion>

        </>
    )
}

export default Encounters