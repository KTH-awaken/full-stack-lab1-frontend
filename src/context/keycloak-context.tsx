import Keycloak from 'keycloak-js';
import { ReactNode, useEffect, useState } from 'react';

export const keycloak = new Keycloak({
    url: 'http://localhost:8181', 
    realm: 'journal-app', 
    clientId: 'journal-auth-service',
});


// const KeycloakProvider = ({ children }: {children:ReactNode}) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         keycloak.init({ 
//             onLoad: 'login-required',
//             checkLoginIframe: false,
//         })
//             .then(authenticated => {
//                 console.log(authenticated);
                
//                 setIsAuthenticated(authenticated);
//             })
//             .catch(err => console.log(err));
//     }, []);

//     if (!isAuthenticated) {
//         return <div>Loading...</div>; 
//     }

//     return <>{children}</>;
// };

export default keycloak;