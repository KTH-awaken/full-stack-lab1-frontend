import { ReactNode } from "react"
import { ThemeProvider } from "./themeProvider"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </QueryClientProvider>

    )
}

export default Providers