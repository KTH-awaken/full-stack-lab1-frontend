import { ReactNode } from "react"
import { ThemeProvider } from "./theme-context"
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak-context";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactKeycloakProvider authClient={keycloak}>
                <AuthProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </ReactKeycloakProvider>
        </QueryClientProvider>


    )
}

export default Providers