import { ReactNode } from "react"
import { ThemeProvider } from "./theme-context"
import { QueryClient, QueryClientProvider } from "react-query";
import { OAuth2Provider } from "./oauth2-context";
import { AuthProvider } from "oidc-react";
import { oidcConfig } from "../api/auth-config";

const queryClient = new QueryClient();


const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider {...oidcConfig}>
                <OAuth2Provider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </OAuth2Provider>
            </AuthProvider>
        </QueryClientProvider>

    )
}

export default Providers