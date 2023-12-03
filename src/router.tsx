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
import Protected from "./components/Protected.tsx";
import UploadPicture from "./pages/Picture/UploadPicture.tsx";
import PatientPicturesPage from "./pages/Picture/PatientPicturesPage.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Protected><Home /></Protected>

            },
            {
                path: 'messages',
                element: <Protected><Messages /></Protected>,
                children: [
                    {

                        path: ":chatid",
                        element: <Chat />
                    }
                ]
            },
            {
                path: 'encounters',
                element: <Protected><Encounters /></Protected>
            },
            {
                path: 'patients',
                element: <Protected><Patients /></Protected>,
            },
            {
                path: 'patients/:patientId',
                element: <Protected><PatientDetails /></Protected>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'login',
                element: <SignIn></SignIn>
            },
            {
                path: 'picture',//todo move to patient details or encounter
                element: <UploadPicture></UploadPicture>
            },
            {
                path: 'pictures',//todo move to patient details or encounter
                element: <PatientPicturesPage></PatientPicturesPage>
            }
        ]
    },


]);
