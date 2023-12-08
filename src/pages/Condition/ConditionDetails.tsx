import { useParams } from "react-router-dom";
import { BASE_URL, useGetCall } from "../../api/apiService";
import { Card } from "../../components/ui/card"
import { useOAuth2 } from "../../context/oauth2-context";
import { Skeleton } from "../../components/ui/skeleton";
import CustomAlert from "../../components/CustomAlert";
import { AccountVm } from "../../api/types/user";
import { uid } from "../../helpers/helpers";
import { ConditionApi } from "../../api/types/condition";


const ConditionDetails = () => {
    const params = useParams();
    const { userData } = useOAuth2();
    const { data, isLoading, isError } = useGetCall<ConditionApi>(BASE_URL.JOURNAL_SERVICE + "/condition/" + params.conditionId, "condition", { Authorization: `Bearer ${userData?.access_token}` });

    
    return (

        <Card className="p-6 flex flex-col gap-4">
            <h1 className="font-bold text-xl">Condition Details</h1>
            {isLoading && <Loading />}
            {isError && <CustomAlert title="Error" message="En error occure. Please try again later" />}
            {data &&
                <>
                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Diagnosis</p>
                        <p>{data.diagnosis}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Patient</p>
                        <p>{data?.patient.firstName} {data?.patient.lastName}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Doctor</p>
                        <p>{data?.doctor.firstName} {data?.doctor.lastName}</p>
                    </div>

                
                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Created at</p>
                        <p>{data?.timestamp.substring(0, 10)} {data?.timestamp.substring(11, 16)}</p>
                    </div>
                </>
            }
        </Card>
    )
}

const Loading = () => {
    const arr = new Array(4).fill(1);
    return (
        <div className="flex flex-col gap-7">
            {arr.map(() => (
                <div key={uid()} className="flex flex-col gap-4">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-5 w-[400px]" />
                </div>
            ))}
        </div>

    )
}

export default ConditionDetails