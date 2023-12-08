import { useParams } from "react-router-dom";
import { useOAuth2 } from "../../context/oauth2-context";
import { BASE_URL, useGetCall } from "../../api/apiService";
import { AccountVm } from "../../api/types/user";
import { Skeleton } from "../../components/ui/skeleton";
import { uid } from "../../helpers/helpers";
import CustomAlert from "../../components/CustomAlert";

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

export const PatientInforamtion = () => {
    const {userData} = useOAuth2();
    const params = useParams();
    const { data: patient, isLoading, isError } = useGetCall<AccountVm>(BASE_URL.USER_SERVICE+"/user/" + params.patientEmail+".com", "patient", { Authorization: `Bearer ${userData?.access_token}` });
 
    if(isLoading) return <InfoLoading/>
    if(isError) return <CustomAlert title="Error" message="An error occured. Please try again later"/>

    return (
        <div className="border-b pb-4">
            <h1 className="text-2xl font-bold mb-4">Patient</h1>
            <div className="flex flex-col gap-2">
                <p><strong className="text-foreground/50 font-medium">Firstname: </strong> {patient && patient.firstName}</p>
                <p><strong className="text-foreground/50 font-medium">Lastname: </strong> {patient && patient.lastName}</p>
                <p><strong className="text-foreground/50 font-medium">Email: </strong> {patient && patient.email}</p>
            </div>
        </div>

    )
}
