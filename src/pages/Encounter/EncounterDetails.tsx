import { useParams } from "react-router-dom";
import { BASE_URL, useGetCall } from "../../api/apiService";
import { Card } from "../../components/ui/card"
import { useOAuth2 } from "../../context/oauth2-context";
import { EncounterDetailsApi } from "../../api/types/encounter";
import { Skeleton } from "../../components/ui/skeleton";
import CustomAlert from "../../components/CustomAlert";
import { uid } from "../../helpers/helpers";
import AddObservationDialog from "../Patients/AddObservationDialog";


const EncounterDetails = () => {
    const params = useParams();
    const { userData } = useOAuth2();
    const { data, isLoading, isError } = useGetCall<EncounterDetailsApi>(BASE_URL.JOURNAL_SERVICE + "/encounter/details/" + params.encounterId, "encounter", { Authorization: `Bearer ${userData?.access_token}` });



    return (

        <Card className="p-6 flex flex-col gap-4">
            <h1 className="font-bold text-xl">Encounter Details</h1>
            {isLoading && <Loading />}
            {isError && <CustomAlert title="Error" message="En error occure. Please try again later"/>}
            {data &&
                <>
                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Subject</p>
                        <p>{data?.title}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Doctor</p>
                        <p>{data?.doctor.firstName} {data?.doctor.lastName}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Patient</p>
                        <p>{data?.patient.firstName} {data?.patient.lastName}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Details</p>
                        <p>{data?.description}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Date</p>
                        <p>{data?.date.substring(0, 10)}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Time</p>
                        <p>{data?.date.substring(11, 16)}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Observations</p>
                        <ul>
                            {data.observations.map(o => (
                                <div key={o.id} className="flex gap-2 items-center mb-2 pl-2">
                                    <span className="w-2 h-2 block rounded-full bg-primary/80"></span>
                                    <li>{o.description}</li>
                                </div>

                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Created at</p>
                        <p>{data?.timestamp.substring(0, 10)} {data?.timestamp.substring(11, 16)}</p>
                    </div>

                    <AddObservationDialog encounterId={data.id}/>
                </>
            }
        </Card>
    )
}

const Loading = () => {
    const arr = new Array(7).fill(1);
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

export default EncounterDetails