import Container from "./components/Container"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom";
import Providers from "./context/providers";



function Layout() {

    return (
        <Providers>
            <div className="bg-globe-bg min-h-screen">
                <Container>
                    <Navbar />
                    <div className="pt-8">
                        <Outlet />
                    </div>
                </Container>
            </div>
        </Providers>


    )
}

export default Layout
