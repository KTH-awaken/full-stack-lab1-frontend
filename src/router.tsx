import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.tsx'
import ErrorPage from './pages/ErrorPage.tsx';
import Messages from './pages/Message/Index.tsx';
import Encounters from './pages/Encounter/Encounters.tsx';
import Chat from "./pages/Message/ChatWindow.tsx";
import Home from "./pages/Home.tsx";
import Patients from "./pages/Patient/Index.tsx";
import PatientDetails from "./pages/Patient/PatientDetails.tsx";
import SignIn from "./pages/SignIn.tsx";
import Register from "./pages/Register.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,

        children: [
            {
                path: '',
                element: <Home />

            },
            {
                path: 'messages',
                element: <Messages />,
                children: [
                    {

                        path: ":chatid",
                        // element: <Chat />//todo sät på
                    }
                ]
            },
            {
                path: 'encounters',
                element: <Encounters />
            },
            {
                path: 'patients',
                element: <Patients />,
            },
            {
                path: 'patients/:patientId',
                element: <PatientDetails />
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <SignIn></SignIn>
            }
        ]
    },
        

]);
