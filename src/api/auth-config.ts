import axios from "axios";
import { BASE_URL } from "./apiService";


export const oidcConfig = {
    onSignIn: async (user: any) => {
        const newUser = {
            email: user.profile.email,
            firstName: user.profile.given_name,
            lastName: user.profile.family_name,
        };
        console.log("from the sign");
        console.log(user.access_token);

        axios.post(BASE_URL.USER_SERVICE + "/user/create", newUser, {
            headers: { Authorization: `Bearer ${user.access_token}` },
        });
    },
    authority:"http://vm.cloud.cbh.kth.se:2542/realms/journal-realm",
    clientId:"journal-client",
    redirectUri:"http://localhost:3000",
    postLogoutRedirectUri: "http://localhost:3000",
    responseType: "code",
    scope: "openid profile email offline_access roles",
};
