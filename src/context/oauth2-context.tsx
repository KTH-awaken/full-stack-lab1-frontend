import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth as useOidcAuth } from 'oidc-react';


// interface Profile{
//     email:string,
//     username:string,
//     name: string,
//     family_name:string,
//     given_name:string
// }


interface Ioauth2Context {
  isLoading: boolean;
  isAuthenticated: boolean;
  userData: any;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<Ioauth2Context | undefined>(undefined);

export const OAuth2Provider = ({ children }: { children: ReactNode }) => {
  const oidcAuth = useOidcAuth();
  const [isLoading, setLoading] = useState(oidcAuth.isLoading);
  const [isAuthenticated, setAuthenticated] = useState(!!oidcAuth.userData);

  useEffect(() => {
    setLoading(oidcAuth.isLoading);
    setAuthenticated(!!oidcAuth.userData);
  }, [oidcAuth.isLoading, oidcAuth.userData]);

  const login = () => oidcAuth.signIn();
  const logout = () => oidcAuth.signOutRedirect();
  console.log(oidcAuth.userData);

  return (
    <AuthContext.Provider value={{ isLoading, isAuthenticated, userData: oidcAuth.userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useOAuth2 = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
