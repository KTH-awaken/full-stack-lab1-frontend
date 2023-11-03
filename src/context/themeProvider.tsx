import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';


type Theme = 'light' | 'dark';
type ThemeDispatch = Dispatch<SetStateAction<Theme>>

const ThemeContext = createContext<{ theme: Theme, setTheme: ThemeDispatch }>({ theme: 'light', setTheme: () => { } });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<Theme>("light");


    useEffect(() => {
        const current = localStorage.getItem("theme") ?? "light";
        document.documentElement.classList.toggle('dark', current === "dark");
        setTheme(current as Theme);
    }, []);


    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};