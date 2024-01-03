import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useAuth as useOidcAuth } from "oidc-react";

export interface UserData {
    id_token: string;
    session_state: string;
    access_token: string;
    refresh_token: string;
    token_type: string;
    scope: string;
    profile: {
        exp: number;
        iat: number;
        iss: string;
        aud: string;
        sub: string;
        typ: string;
        session_state: string;
        sid: string;
        email_verified: boolean;
        name: string;
        preferred_username: string;
        given_name: string;
        family_name: string;
        email: string;
        realm_access:
            | {
                  roles: string[];
              }[]
            | {
                  roles: string[];
              };
    };
    expires_at: number;
}

function mapToUserData(classInstance: any): UserData {
    console.log(classInstance);

    return {
        id_token: classInstance.id_token,
        session_state: classInstance.session_state,
        access_token: classInstance.access_token,
        refresh_token: classInstance.refresh_token,
        token_type: classInstance.token_type,
        scope: classInstance.scope,
        profile: {
            exp: classInstance.profile.exp,
            iat: classInstance.profile.iat,
            iss: classInstance.profile.iss,
            aud: classInstance.profile.aud,
            sub: classInstance.profile.sub,
            typ: classInstance.profile.typ,
            session_state: classInstance.profile.session_state,
            sid: classInstance.profile.sid,
            email_verified: classInstance.profile.email_verified,
            name: classInstance.profile.name,
            preferred_username: classInstance.profile.preferred_username,
            given_name: classInstance.profile.given_name,
            family_name: classInstance.profile.family_name,
            email: classInstance.profile.email,
            realm_access: classInstance.profile.realm_access,
        },
        expires_at: classInstance.expires_at,
    };
}

export type Role = "DOCTOR" | "PATIENT" | "EMPLOYEE";

interface Ioauth2Context {
    isLoading: boolean;
    isAuthenticated: boolean;
    userData: UserData | undefined;
    login: () => void;
    logout: () => void;
    hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<Ioauth2Context | undefined>(undefined);

export const OAuth2Provider = ({ children }: { children: ReactNode }) => {
    const oidcAuth = useOidcAuth();
    const [isLoading, setLoading] = useState(oidcAuth.isLoading);
    const [isAuthenticated, setAuthenticated] = useState(!!oidcAuth.userData);
    const [userData, setUserData] = useState<UserData | undefined>(undefined);

    useEffect(() => {
        setLoading(oidcAuth.isLoading);
        setAuthenticated(!!oidcAuth.userData);
        if (oidcAuth.userData) {
            setUserData(mapToUserData(oidcAuth.userData));
        }
    }, [oidcAuth.isLoading, oidcAuth.userData]);

    const login = () => oidcAuth.signIn();
    const logout = () => oidcAuth.signOutRedirect();
    const hasRole = (role: Role): boolean => {
        if (userData && userData.profile.realm_access) {
            if (Array.isArray(userData.profile.realm_access)) {
                return userData.profile.realm_access.some(
                    (access) =>
                        Array.isArray(access.roles) &&
                        access.roles.includes(role)
                );
            } else {
                return (
                    Array.isArray(userData.profile.realm_access.roles) &&
                    userData.profile.realm_access.roles.includes(role)
                );
            }
        }
        return false;
    };
    console.log(userData);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isAuthenticated,
                userData,
                hasRole,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useOAuth2 = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
