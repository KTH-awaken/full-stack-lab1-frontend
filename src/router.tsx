import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.tsx'
import ErrorPage from './pages/ErrorPage.tsx';
import Messages from './pages/Message/Index.tsx';
import Encounters from './pages/Encounter/Encounters.tsx';
import Chat from "./pages/Message/ChatWindow.tsx";
import Home from "./pages/Home.tsx";
import Patients from "./pages/Patient/Index.tsx";
import PatientDetails from "./pages/Patient/PatientDetails.tsx";
import Protected from "./components/Protected.tsx";
import SearchPage from "./pages/Search/Index.tsx";

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
                path: 'search',
                element: <Protected><SearchPage /></Protected>
            },
        ]
    },


]);
