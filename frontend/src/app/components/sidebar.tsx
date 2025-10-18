'use client';
import React from "react";
import { useRouter } from "next/navigation";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
    const router = useRouter();
    const handleNavigation = (path: string) =>{
        toggleSidebar();
        router.push(path);
    }
    return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-green-400 text-black p-8 shadow-lg transform-gpu transition-transform duration-300 ease-in-out z-40 ${isOpen ? "translate-x-0" : "translate-x-[-100%]"}`}>
        <h2 className="text-2xl font-bold mb-4 flex justify-between items-center">
            Sidebar
            <button onClick={toggleSidebar} className="text-black hover:text-green-700 text-xl font-bold">
            ✕
            </button>
        </h2>

        <ul>
            <li onClick={() => handleNavigation("/dashboard")} className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Dashboard</li>
            <li onClick={() => handleNavigation("/profile")} className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Profile</li>
            <li onClick={() => handleNavigation("/visualization")} className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Visualization</li>
            <li onClick={() => handleNavigation("/history")} className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">History</li>
            <li onClick={() => handleNavigation("/upcoming")} className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Upcoming</li>
            <li onClick={() => handleNavigation("/logout")} className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Logout</li>
        </ul>
        </div>
    );
}
