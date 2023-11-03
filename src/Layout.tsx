import Container from "./components/Container"
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./context/themeProvider";
function Layout() {

    return (
        <ThemeProvider>
            <div className="bg-globe-bg min-h-screen">
                <Container>
                    <Navbar />
                    <div className="pt-8">
                        <Outlet />
                    </div>
                </Container>
            </div>
        </ThemeProvider>


    )
}

export default Layout
