'use client';
import React , { useState } from "react";

interface SideBarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export default function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
    return(
        <>
           <div className={`fixed top-0 left-0 h-full w-64 bg-green-400 text-black p-4 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out z-40`}>
                <h2 className="text-2xl font-bold mb-6">Sidebar</h2>
                <ul>
                    <li className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Dashboard</li>
                    <li className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Profile</li>
                    <li className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Visulization</li>
                    <li className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">History</li>
                    <li className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Upcoming</li>
                    <li className="mb-4 hover:text-green-400 hover:bg-black cursor-pointer">Logout</li>
                </ul>
            </div>
        </>
    )
}