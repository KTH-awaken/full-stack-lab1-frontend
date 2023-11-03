import { useTheme } from "../context/themeProvider";
import { Switch } from "./ui/switch";


export const ToggleThemeSwitch = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark'); // Add dark class to root element
        } else {
            setTheme('light');
            document.documentElement.classList.remove('dark'); // Remove dark class from root element
        }
    };

    return <Switch onCheckedChange={toggleTheme}/>;
}
