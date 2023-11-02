import Container from "./components/Container"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom";
function Layout() {

    return (
        <div className="bg-accent min-h-screen">
            <Container>
                <Navbar />
                <div className="pt-8">
                    <Outlet />
                </div>
            </Container>
        </div>

    )
}

export default Layout
