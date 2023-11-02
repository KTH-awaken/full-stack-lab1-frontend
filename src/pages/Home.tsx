import { currentUser } from '../auth/fake-user'

const Home = () => {
    return (
        <h1 className='font-bold text-3xl'>Hi {currentUser.name}</h1>
    )
}

export default Home