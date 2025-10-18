'use client';
import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import TaskCircle from "../components/taskCircle";
import SideBar from "../components/SideBar";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const tasks = [
    { id: 1, title: "Task 1", description: "This is task 1", status: true },
    { id: 2, title: "Task 2", description: "This is task 2", status: false },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-x-hidden">

      <button type="button" onClick={toggleSidebar} className="absolute top-4 left-4 z-50 text-green-400 hover:text-green-600 focus:outline-none">
        <CiMenuBurger className="w-12 h-6" />
      </button>

      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />


      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} p-10`}>
        <h1 className="text-5xl font-bold text-green-400 py-10">
          Your today's tasks
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCircle key={task.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
}
