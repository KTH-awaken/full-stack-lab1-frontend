import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Logo } from "./Logo"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar"
import { NavLink } from "react-router-dom"
import { ToggleThemeSwitch } from "./ToggleThemeSwitch"
import { Card } from "./ui/card"
import { LogoutIcon, SettingIcon } from "./iconts"
import { Button } from "./ui/button"
import { SearchIcon } from "lucide-react"
import { useOAuth2 } from "../context/oauth2-context"



const AuthenticatedMenu = () => {
    const { logout, userData } = useOAuth2();
    return (
        <div className="flex items-center gap-8">
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/patients">Patients</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/messages">Messages</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/encounters">Encounters</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/search"><SearchIcon /></NavLink>

            <Menubar className="border-none cursor-pointer">
                <MenubarMenu>
                    <MenubarTrigger className="rounded-2xl  flex items-center gap-2">
                        <Avatar className="w-7 rounded-full overflow-hidden">
                            <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="avatar" />
                        </Avatar>
                        {userData && userData.profile.name}
                    </MenubarTrigger>

                    <MenubarContent className="p-4 border-none shadow-md">
                        <MenubarItem disabled>Username: {userData && userData.profile.preferred_username}</MenubarItem>
                        <MenubarItem disabled>Email: {userData && userData.profile.email}</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem >
                            Settings
                            <MenubarShortcut>
                                <SettingIcon />
                            </MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem >Theme <MenubarShortcut><ToggleThemeSwitch /></MenubarShortcut></MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={logout}>Logout <MenubarShortcut><LogoutIcon /></MenubarShortcut></MenubarItem>

                    </MenubarContent>

                </MenubarMenu>
            </Menubar>
        </div>

    )
}

const GuestMenu = () => {
    const { login } = useOAuth2();
    return (
        <div className="flex items-center gap-2">
            <Button onClick={login} variant="secondary">Login</Button>
            {/* <Button onClick={} >Register</Button> */}
        </div>
    )
}


const Navbar = () => {
    const { isAuthenticated } = useOAuth2();

    return (
        <Card className="flex justify-between items-center sticky top-0 bg-background  px-4 py-2 rounded-2xl">
            <a href="/">
                <Logo />
            </a>
            {isAuthenticated && <AuthenticatedMenu />}
            {!isAuthenticated && <GuestMenu />}


        </Card>

    )
}

export default Navbar