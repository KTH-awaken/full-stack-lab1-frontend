import { ReactNode } from "react"
import { ThemeProvider } from "./theme-context"
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>


    )
}

export default Providers