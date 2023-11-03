import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { currentUser } from "../auth/fake-user"
import { Logo } from "./Logo"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "./ui/menubar"
import { NavLink } from "react-router-dom"
import { ToggleThemeSwitch } from "./ToggleThemeSwitch"
import { Card } from "./ui/card"


const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" /></svg>

const SettingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" /></svg>

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path fill="primary" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>


const Navbar = () => {
    return (
        <Card className="flex justify-between items-center sticky top-0 bg-background  px-4 py-2 rounded-2xl">
            <a href="/">
                <Logo />
            </a>

            <div className="flex items-center gap-8">

                <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/messages">Messages</NavLink>
                <NavLink className={({ isActive }) => (isActive ? 'text-primary' : 'opacity-75')} to="/encounters">Encounters</NavLink>

                {/* <p className="pl-6 border-black/20 border-l-[1px]">{currentUser.name}</p> */}

                <Menubar className="border-none ">
                    <MenubarMenu>
                        <MenubarTrigger className="rounded-2xl  flex items-center gap-2">
                            <Avatar className="w-7 rounded-full overflow-hidden">
                                <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="avatar" />
                            </Avatar>
                            {currentUser.name}
                        </MenubarTrigger>
                        <MenubarContent className="p-4 border-none shadow-md">
                            <MenubarItem disabled>Email: {currentUser.email}</MenubarItem>
                            <MenubarItem disabled>Role: {currentUser.role}</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Setting <MenubarShortcut><SettingIcon /></MenubarShortcut></MenubarItem>
                            <MenubarItem>Theme <MenubarShortcut><ToggleThemeSwitch/></MenubarShortcut></MenubarItem>
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