import { NavLink, useParams } from "react-router-dom";
import { BASE_URL, useGetCall } from "../../api/apiService";
import { Card } from "../../components/ui/card"
import { useOAuth2 } from "../../context/oauth2-context";
import { EncounterDetailsApi } from "../../api/types/encounter";
import { Skeleton } from "../../components/ui/skeleton";
import CustomAlert from "../../components/CustomAlert";
import { uid } from "../../helpers/helpers";
import AddObservationDialog from "../Patients/AddObservationDialog";
import { FileSymlink } from "lucide-react";

// div className="bg-accent rounded-md p-4 flex flex-col gap-4"
const EncounterDetails = () => {
    const params = useParams();
    const { userData } = useOAuth2();
    const { data, isLoading, isError } = useGetCall<EncounterDetailsApi>(BASE_URL.JOURNAL_SERVICE + "/encounter/details/" + params.encounterId, "encounter", { Authorization: `Bearer ${userData?.access_token}` });


    return (

        <Card className="p-6 flex flex-col gap-4">
            <h1 className="font-bold text-xl">Encounter Details</h1>
            {isLoading && <Loading />}
            {isError && <CustomAlert title="Error" message="En error occure. Please try again later" />}
            {data &&
                <>
                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Subject</p>
                        <p>{data?.title}</p>
                    </div>

                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="font-semibold text-foreground/50 mb-1">Doctor</p>
                            <NavLink to={`/profile/${data.doctor.id}`}><FileSymlink className="h-4 opacity-50" /></NavLink>
                        </div>
                        <p>{data?.doctor.firstName} {data?.doctor.lastName}</p>

                    </div>

                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="font-semibold text-foreground/50 mb-1">Patient</p>
                            <NavLink to={`/profile/${data.patient.id}`}><FileSymlink className="h-4 opacity-50" /></NavLink>
                        </div>
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
                        <p className="font-semibold text-foreground/50 mb-2">Observations</p>
                        {data.observations.length === 0 && <p>No observations</p>}
                        <ul >
                            {data.observations.map(o => (
                                <div key={o.id} className="flex gap-2 items-center mb-2 pl-2">
                                    <li>
                                        <div className="flex flex-row gap-2 items-center">
                                            <span className="w-2 h-2 block rounded-full bg-primary/80"></span>
                                            <p>{o.description}</p>
                                        </div>
                                        <span className="text-xs opacity-50 pl-4">{o.date.substring(0, 10)} {o.date.substring(11, 16)}</span>
                                    </li>
                                </div>

                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Created at</p>
                        <p>{data?.timestamp.substring(0, 10)} {data?.timestamp.substring(11, 16)}</p>
                    </div>
                    <AddObservationDialog encounterId={data.id} />
                </>

            }

        </Card>
    )
}

const Loading = () => {
    const arr = new Array(7).fill(1);
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

export default EncounterDetails