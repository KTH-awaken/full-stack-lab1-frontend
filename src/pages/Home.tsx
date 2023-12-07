import { useOAuth2 } from "../context/oauth2-context";



const Home = () => {
    const { userData } = useOAuth2();
   

    return (
        <>
            <h1 className='font-bold text-3xl'>Hi {userData && userData.profile.name}</h1>
        </>
    )
}

export default Home