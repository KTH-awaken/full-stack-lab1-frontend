import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Logo } from "./Logo"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar"
import { NavLink } from "react-router-dom"
import { ToggleThemeSwitch } from "./ToggleThemeSwitch"
import { Card } from "./ui/card"
import { LogoutIcon, SettingIcon } from "./iconts"
import { Button } from "./ui/button"
import { AlignJustify, SearchIcon } from "lucide-react"
import { useOAuth2 } from "../context/oauth2-context"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTrigger,
} from "../components/ui/sheet"


const AuthenticatedMenu = () => {
    const { logout, userData, hasRole } = useOAuth2();
    return (
        <div className="flex items-center gap-8">

            <div className="hidden lg:flex items-center gap-8">
                {!hasRole('PATIENT') && <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/patients">Patients</NavLink>}
                <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/messages">Messages</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/encounters">Encounters</NavLink>
                {hasRole('PATIENT') && <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/conditions">Conditions</NavLink>}
                {!hasRole('PATIENT') && <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/search"><SearchIcon /></NavLink>}
            </div>

            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger className="p-2">
                       <AlignJustify />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col justify-between">
                        <SheetHeader className="py-2 mb-2 border-b">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-10 rounded-full overflow-hidden">
                                    <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="avatar" />
                                </Avatar>
                                <div className="flex flex-col justify-start items-start">
                                    <p className="text-lg font-bold">{userData && userData.profile.name}</p>
                                    <p className="text-sm text-gray-500">{userData && userData.profile.preferred_username}</p>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p>Theme: </p>
                                <ToggleThemeSwitch />
                            </div>
                        </SheetHeader>
                        <div className={"flex items-start flex-col gap-8 flex-grow"}>
                            {!hasRole('PATIENT') && <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/patients">Patients</NavLink>}
                            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/messages">Messages</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/encounters">Encounters</NavLink>
                            {hasRole('PATIENT') && <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/conditions">Conditions</NavLink>}
                            {!hasRole('PATIENT') && <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/search">Search</NavLink>}
                        </div>
                        <SheetFooter className="flex flex-col py-2 mt-2 border-t">
                            <Button onClick={logout} variant="secondary" className="flex gap-2"><LogoutIcon /> Logout</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>


            <Menubar className="border-none cursor-pointer hidden lg:flex">
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