import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
    url: 'http://localhost:8181', 
    realm: 'journal-app', 
    clientId: 'journal-auth-service',
});


export default keycloak;