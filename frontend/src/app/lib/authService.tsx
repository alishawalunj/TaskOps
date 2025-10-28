
export interface User {
    username: string;
    email: string;
    password: string;
    address?: string;
    provider: string;
    age?: number;
    sex?: string;
}


export function getLoggedInUser(){
    const userRaw = localStorage.getItem("loggedInUser");
    return userRaw ? JSON.parse(userRaw) : null;
}


export function logoutUser(){
    localStorage.removeItem("loggedInUser");
}