'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
    const router = useRouter();
    const { logout } = useAuth();
    const handleNavigation = (path: string) =>{
        toggleSidebar();
        router.push(path);
    }
    return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-green-400 text-black p-6 shadow-lg transform-gpu transition-transform duration-300 ease-in-out z-40 ${ isOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
            Menu
            <button onClick={toggleSidebar} className="text-black hover:text-green-700 text-xl font-bold">
            ✕
            </button>
        </h2>

        <ul>
            <li onClick={() => handleNavigation("/dashboard")} className="hover:text-green-400 hover:bg-black cursor-pointer h-10 rounded-lg p-2">Dashboard</li>
            <li onClick={() => handleNavigation("/profile")} className="hover:text-green-400 hover:bg-black cursor-pointer h-10 rounded-lg p-2">Profile</li>
            <li onClick={() => handleNavigation("/visualization")} className="hover:text-green-400 hover:bg-black cursor-pointer h-10 rounded-lg p-2">Visualization</li>
            <li onClick={() => handleNavigation("/history")} className="hover:text-green-400 hover:bg-black cursor-pointer h-10 rounded-lg p-2">History</li>
            <li onClick={() => handleNavigation("/upcoming")} className="hover:text-green-400 hover:bg-black cursor-pointer h-10 rounded-lg p-2">Upcoming</li>
            <li onClick={() => { logout(); toggleSidebar(); }}  className="hover:text-green-400 hover:bg-black cursor-pointer h-10 rounded-lg p-2">Logout</li>
        </ul>
        </div>
    );
}
