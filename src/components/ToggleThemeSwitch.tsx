import { useTheme } from "../context/theme-context";
import { Switch } from "./ui/switch";


export const ToggleThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark'); // Add dark class to root element
            localStorage.setItem("theme", "dark");
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark'); // Remove dark class from root element
            localStorage.setItem("theme", "light");
        }
    };

    return <Switch onCheckedChange={toggleTheme}/>;
}
