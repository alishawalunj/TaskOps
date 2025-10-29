'use client';
import React, { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import TaskCircle from "../components/taskCircle";
import SideBar from "../components/SideBar";
import { useUpcomingTasks } from '../hooks/useTasksQueries';
import { TaskResponseDTO, NewTaskDTO } from '../graphql/types';

export default function Upcoming() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [newTask, setNewTask] = useState<NewTaskDTO>({
    name: "",
    description: "",
    status: "Pending",
    duration: 0,
    date: "",
    userId: "",
    createdAt: "",
    updatedAt: "",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) return;
    setUserId(storedId);
    setNewTask((prev) => ({ ...prev, userId: storedId }));
  }, []);

  const { upcomingTasks, loading, error, refetch } = useUpcomingTasks(userId || "");

  useEffect(() => {
    if (upcomingTasks) setTasks(upcomingTasks);
  }, [upcomingTasks]);


  if (!userId) return <div className="text-green-400 p-10">Loading user...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-x-hidden">
      <button
        type="button"
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 text-green-400 hover:text-green-600 focus:outline-none"
      >
        <CiMenuBurger className="w-12 h-6" />
      </button>

      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} p-10`}>
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold text-green-400 py-10">Upcoming tasks</h1>
        </div>

        {loading && <p className="text-green-400">Loading tasks...</p>}
        {error && <p className="text-red-500">{error.message}</p>}

        <div className="grid grid-cols-3 gap-6">
          {tasks.length ? (
            tasks.map((task) => (
              <TaskCircle
                key={task.taskId}
                taskId={task.taskId}
                name={task.name}
                description={task.description}
                status={task.status}
              />
            ))
          ) : (
            <p className="text-green-400">No upcoming task yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
