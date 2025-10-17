
export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export function registerUser(data: User): void {
    const usersRaw = localStorage.getItem("users");
    const users: User[] = usersRaw ? JSON.parse(usersRaw) : [];

    const userExists = users.find((u) => u.email === data.email);
    if (userExists) throw new Error("User already exists!");

    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
}

export function loginUser({ email, password }: { email: string; password: string }) {
    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const user = users.find(
        (u: { email: string; password: string; }) => u.email === email && u.password === password
    );
    if(!user) throw new Error("Invalid user or password");
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return user;
}

export function getLoggedInUser(){
    const userRaw = localStorage.getItem("loggedInUser");
    return userRaw ? JSON.parse(userRaw) : null;
}


export function logoutUser(){
    localStorage.removeItem("loggedInUser");
}