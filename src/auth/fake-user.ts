interface User {
    name: string;
    email: string;
    role: "patient" | "doctor" | "stuff";
}

export const currentUser: User = {
    name: "Hamada",
    email: "hamada@gmail.com",
    role: "patient",
};
