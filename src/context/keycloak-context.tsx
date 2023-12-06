import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url: 'http://localhost:8181', 
    realm: 'journal-app', 
    clientId: 'journal-auth-service',
});

export interface IAuthContext {
    keycloak: Keycloak;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const KeycloakProvider = ({ children }: { children: ReactNode }) => {

    const [isKeycloakReady, setIsKeycloakReady] = useState(false);


    useEffect(() => {
        keycloak.init({
            onLoad: 'login-required',
            checkLoginIframe: false,
        }).then(() => {
            setIsKeycloakReady(true);
        }).catch(err => console.error('Keycloak init error:', err));
    }, []);

    if (!isKeycloakReady) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ keycloak }}>
            {keycloak.authenticated ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};

export const useKeykloak = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
