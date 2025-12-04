'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, logoutUser } from "../lib/authService";

export function useAuth(redirectIfNotLoggedIn = false){
    const [ user, setUser ] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const currentUser = getLoggedInUser();
        setUser(currentUser);

        if (currentUser) {
            localStorage.setItem("userId", JSON.stringify(currentUser.id));
        } 

        if(redirectIfNotLoggedIn && !currentUser){
            router.push("/login");
        }
    }, [redirectIfNotLoggedIn, router]);


    const logout = () => {
        logoutUser();
        setUser(null);
        router.push('/login');
    }

    return { user, logout };
}