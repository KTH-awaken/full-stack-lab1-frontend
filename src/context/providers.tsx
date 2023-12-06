import { ReactNode } from "react"
import { ThemeProvider } from "./theme-context"
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";
import {KeycloakProvider} from "./keycloak-context";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <KeycloakProvider>
                <AuthProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </KeycloakProvider>
        </QueryClientProvider>


    )
}

export default Providers