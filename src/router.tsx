import { createBrowserRouter } from "react-router-dom";
import Layout from './Layout.tsx'
import ErrorPage from './pages/ErrorPage.tsx';
import Messages from './pages/Messages.tsx';
import Encounters from './pages/Encounters.tsx';
import Chat from "./pages/Chat.tsx";
import Home from "./pages/Home.tsx";

export const router = createBrowserRouter([
    {
        path:"/",
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
                        element: <Chat />
                    }
                ]
            },
            {
                path: 'encounters',
                element: <Encounters />
            }
        ]
    },
]);
