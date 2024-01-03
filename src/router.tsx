import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Messages from "./pages/Message/Index.tsx";
import Encounters from "./pages/Encounter/Encounters.tsx";
import Chat from "./pages/Message/ChatWindow.tsx";
import Home from "./pages/Home.tsx";
import Patients from "./pages/Patients/Index.tsx";
import PatientDetails from "./pages/Patients/PatientDetails.tsx";
import Protected from "./components/Protected.tsx";
import SearchPage from "./pages/Search/Index.tsx";
import EncounterDetails from "./pages/Encounter/EncounterDetails.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import ConditionDetails from "./pages/Condition/ConditionDetails.tsx";
import UploadPicture from "./pages/Picture/UploadPicture.tsx";
import PatientPicturesPage from "./pages/Picture/PatientPicturesPage.tsx";
import Conditions from "./pages/Conditions/Index.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: (
                    <Protected>
                        <Home />
                    </Protected>
                ),
            },
            {
                path: "messages",
                element: (
                    <Protected>
                        <Messages />
                    </Protected>
                ),
                children: [
                    {
                        path: ":chatid",
                        element: <Chat />,
                    },
                ],
            },
            {
                path: "profile/:userid",
                element: (
                    <Protected>
                        <Profile />
                    </Protected>
                ),
            },
            {
                path: "encounters",
                element: (
                    <Protected>
                        <Encounters />
                    </Protected>
                ),
            },
            {
                path: "encounters/:encounterId",
                element: (
                    <Protected>
                        <EncounterDetails />
                    </Protected>
                ),
            },
            {
                path: "conditions/",
                element: (
                    <Protected>
                        <Conditions />
                    </Protected>
                ),
            },
            {
                path: "condition/:conditionId",
                element: (
                    <Protected>
                        {" "}
                        <ConditionDetails />
                    </Protected>
                ),
            },
            {
                path: "patients",
                element: (
                    <Protected roles={["DOCTOR", "EMPLOYEE"]}>
                        <Patients />
                    </Protected>
                ),
            },
            {
                path: "patients/:patientEmail",
                element: (
                    <Protected roles={["DOCTOR", "EMPLOYEE"]}>
                        <PatientDetails />
                    </Protected>
                ),
            },
            {
                path: "search",
                element: (
                    <Protected roles={["DOCTOR", "EMPLOYEE"]}>
                        <SearchPage />
                    </Protected>
                ),
            },
            {
                path: "picture", //todo move to patient details or encounter
                element: <UploadPicture></UploadPicture>,
            },
            {
                path: "pictures", //todo move to patient details or encounter
                element: <PatientPicturesPage></PatientPicturesPage>,
            },
        ],
    },
]);
