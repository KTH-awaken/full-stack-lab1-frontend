import { error } from "console";
import { apiService } from "../api/apiService";

interface User {
    name: string;
    email: string;
    role: "patient" | "doctor" | "stuff";
}

// export const currentUser: User = {
//     name: "Hamada",
//     email: "hamada@gmail.com",
//     role: "patient",
// };

export let currentUser: User = {
    name: "",
    email: "",
    role: ",
};
// export const SERVER_URL = "http://localhost:8080"



const hardCodedAccountEndPoint ='/account?id=7';

apiService.get<User>(hardCodedAccountEndPoint)
    .then((response)=>{
        currentUser = response;
        console.log(currentUser);
    })
    .catch((error)=>{
        console.error('Faild to fetch user ',error);

    });