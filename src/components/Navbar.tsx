import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Logo } from "./Logo"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar"
import { NavLink } from "react-router-dom"
import { ToggleThemeSwitch } from "./ToggleThemeSwitch"
import { Card } from "./ui/card"
import { useAuth } from "../context/auth-context"
import { LogoutIcon, SettingIcon } from "./iconts"
import { Button } from "./ui/button"



const AuthenticatedMenu = () => {
    const { account, logout } = useAuth();

    return (
        <div className="flex items-center gap-8">
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/patients">Patients</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/messages">Messages</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/encounters">Encounters</NavLink>



            <Menubar className="border-none ">
                <MenubarMenu>
                    <MenubarTrigger className="rounded-2xl  flex items-center gap-2">
                        <Avatar className="w-7 rounded-full overflow-hidden">
                            <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="avatar" />
                        </Avatar>
                        {account && account.firstName} {account && account.lastName}
                    </MenubarTrigger>

                    <MenubarContent className="p-4 border-none shadow-md">
                        <MenubarItem disabled>Email: {account && account.email}</MenubarItem>
                        <MenubarItem disabled>Role: {account && account.userType}</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Setting <MenubarShortcut><SettingIcon /></MenubarShortcut></MenubarItem>
                        <MenubarItem>Theme <MenubarShortcut><ToggleThemeSwitch /></MenubarShortcut></MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={logout}>Logout <MenubarShortcut><LogoutIcon /></MenubarShortcut></MenubarItem>

                    </MenubarContent>

                </MenubarMenu>
            </Menubar>
        </div>

    )
}

const GuestMenu = () => {
    return (
        <div className="flex items-center gap-2">
            <NavLink to="/login"><Button variant="secondary">Login</Button></NavLink>
            <NavLink to="/register"><Button>Register</Button></NavLink>
        </div>
    )
}


const Navbar = () => {
    const { account, isAuth } = useAuth();

    return (
        <Card className="flex justify-between items-center sticky top-0 bg-background  px-4 py-2 rounded-2xl">
            <a href="/">
                <Logo />
            </a>

            {/* {isAuth && <AuthenticatedMenu />}
            {!isAuth && <GuestMenu />} */}
            <AuthenticatedMenu />
            <GuestMenu />
        </Card>

    )
}

export default Navbar