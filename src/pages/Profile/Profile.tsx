import { useParams } from "react-router-dom";
import { BASE_URL, useGetCall } from "../../api/apiService";
import { Card } from "../../components/ui/card"
import { useOAuth2 } from "../../context/oauth2-context";
import { Skeleton } from "../../components/ui/skeleton";
import CustomAlert from "../../components/CustomAlert";
import { AccountVm } from "../../api/types/user";
import { uid } from "../../helpers/helpers";


const Profile = () => {
    const params = useParams();
    const { userData } = useOAuth2();
    const { data, isLoading, isError } = useGetCall<AccountVm>(BASE_URL.USER_SERVICE + "/user/userid/" + params.userid, "encounter", { Authorization: `Bearer ${userData?.access_token}` });

    return (

        <Card className="p-6 flex flex-col gap-4">
            <h1 className="font-bold text-xl">User Details</h1>
            {isLoading && <Loading />}
            {isError && <CustomAlert title="Error" message="En error occure. Please try again later" />}
            {data &&
                <>
                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Full Name</p>
                        <p>{data.firstName} {data.lastName}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Email</p>
                        <p>{data.email}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">User type</p>
                        <p>{data.userType}</p>
                    </div>

                    <div>
                        <p className="font-semibold text-foreground/50 mb-1">Joined</p>
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

export default Profile