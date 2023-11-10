import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Logo } from "./Logo"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar"
import { NavLink } from "react-router-dom"
import { ToggleThemeSwitch } from "./ToggleThemeSwitch"
import { Card } from "./ui/card"
import { useAuth } from "../context/auth-context"
import { LogoutIcon, SettingIcon } from "./iconts"



const Navbar = () => {
    const { account } = useAuth();
    return (
        <Card className="flex justify-between items-center sticky top-0 bg-background  px-4 py-2 rounded-2xl">
            <a href="/">
                <Logo />
            </a>

            <div className="flex items-center gap-8">
                <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/patients">Patients</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/messages">Messages</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/encounters">Encounters</NavLink>


                {/* <p className="pl-6 border-black/20 border-l-[1px]">{currentUser.name}</p> */}

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
                            <MenubarItem disabled>Role: {account && account.role}</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Setting <MenubarShortcut><SettingIcon /></MenubarShortcut></MenubarItem>
                            <MenubarItem>Theme <MenubarShortcut><ToggleThemeSwitch /></MenubarShortcut></MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Logout <MenubarShortcut><LogoutIcon /></MenubarShortcut></MenubarItem>

                        </MenubarContent>

                    </MenubarMenu>
                </Menubar>
            </div>
        </Card>

    )
}

export default Navbar