import Container from "./components/Container"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom";
function Layout() {

    return (
        <Container>
            <Navbar />
            <div className="pt-8">
                <Outlet />
            </div>
        </Container>
    )
}

export default Layout
