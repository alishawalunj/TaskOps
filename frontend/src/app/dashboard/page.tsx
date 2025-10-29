'use client';
import React, { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import TaskCircle from "../components/taskCircle";
import SideBar from "../components/SideBar";
import { useCurrentTasks } from '../hooks/useTasksQueries';
import { useTaskMutations } from '../hooks/useTasksMutations';
import { TaskResponseDTO, NewTaskDTO } from '../graphql/types';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [creating, setCreating] = useState(false);
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
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) return;
    setUserId(storedId);
    setNewTask((prev) => ({ ...prev, userId: storedId }));
  }, []);

  const { currentTasks, loading, error, refetch } = useCurrentTasks(userId || "");

  useEffect(() => {
    if (currentTasks) setTasks(currentTasks);
  }, [currentTasks]);

  const { createTask } = useTaskMutations();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setNewTask({
      ...newTask,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCreateTask = async () => {
    if (!userId || creating) return;
    
    setCreating(true);
    const taskToSend: NewTaskDTO = {
      ...newTask,
      userId,
      status: newTask.status.toUpperCase(),
      date: newTask.date || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    try {
      const created = await createTask(taskToSend);
      if (!created) return;

      alert('Task created successfully!');
      toggleModal();
      if (refetch) await refetch();

      setNewTask({
        name: '',
        description: '',
        status: 'Pending',
        duration: 0,
        date: '',
        userId,
        createdAt: '',
        updatedAt: '',
      });
    } catch (err) {
      alert("Failed to create task");
    } finally {
    setCreating(false);
  }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setNewTask({
      name: '',
      description: '',
      status: 'Pending',
      duration: 0,
      date: '',
      userId: userId || '',
      createdAt: '',
      updatedAt: '',
    });
  };

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
          <h1 className="text-5xl font-bold text-green-400 py-10">Your today's tasks</h1>
          <button
            onClick={toggleModal}
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Task
          </button>
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
                onDelete={(deletedId) => setTasks((prev) => prev.filter((t) => t.taskId !== deletedId))}
              />
            ))
          ) : (
            <p className="text-green-400">No tasks for today yet.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Create New Task</h2>

            <div className="flex flex-col gap-3">
              <input
                name="name"
                value={newTask.name}
                onChange={handleInputChange}
                placeholder="Task Name"
                className="p-2 border rounded"
              />
              <input
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="p-2 border rounded"
              />
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
                className="p-2 border rounded w-full appearance-none focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-gray-700"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                name="duration"
                type="number"
                value={newTask.duration}
                onChange={handleInputChange}
                placeholder="Duration (hours)"
                className="p-2 border rounded"
              />
              <input
                type="date"
                name="date"
                value={newTask.date}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleCreateTask} className="px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600" disabled={creating}>
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
