import { ReactNode } from "react"
import { ThemeProvider } from "./theme-context"
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </AuthProvider>

    )
}

export default Providers