import { useGetCall } from '../api/crud';
import { currentUser } from '../auth/fake-user'
import CustomAlert from '../components/CustomAlert';

interface Post {
    id: number,
    title: string,
    author: string

}


const Home = () => {
    const { data, isLoading, isError } = useGetCall<Post[]>("/posts2");
    if (isLoading) return <div>Loading...</div>
    if (isError) return <CustomAlert title='Error' message='An error occured. Please try again later'/>
    


    return (
        <>
            <h1 className='font-bold text-3xl'>Hi {currentUser.name}</h1>
            
            {data && data.map((d) => <p key={d.id}>{d.title}</p>)}
        </>

    )
}

export default Home