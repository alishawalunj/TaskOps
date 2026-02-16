'use client';
import React, { useState, useEffect, useRef } from "react";
import { CiMenuBurger } from "react-icons/ci";
import TaskCircle from "../components/taskCircle";
import SideBar from "../components/SideBar";
import { useCurrentTasks } from '../hooks/useTasksQueries';
import { useTaskMutations } from '../hooks/useTasksMutations';
import { TaskResponseDTO, NewTaskRequestDTO } from '../graphql/types';

export default function Dashboard() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskResponseDTO[]>([]);
  const [creating, setCreating] = useState(false);
  const [newTask, setNewTask] = useState<NewTaskRequestDTO>({
    name: "",
    description: "",
    status: "Pending",
    endDate: "",
    userId: "",
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const dateRef = useRef<HTMLInputElement>(null);


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
    setNewTask((prev) => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value,
  }));
};

  const handleCreateTask = async () => {
    if (!userId || creating) return;
    const selectedDate = dateRef.current?.value;

    if (!selectedDate) {
      alert("Please select a date");
      return;
    }
    setCreating(true);
    const taskToSend: NewTaskRequestDTO = {
      ...newTask,
      userId,
      status: newTask.status.toUpperCase(),
      endDate: selectedDate,
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
        endDate: '',
        userId,
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
      endDate: '',
      userId: userId || '',
    });
  };

  if (!userId) return <div className="text-green-400 p-10">Loading user...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-x-hidden">
      <button type="button" onClick={toggleSidebar} className="absolute top-4 left-4 z-50 text-green-400 hover:text-green-600 focus:outline-none">
        {isSidebarOpen ? null : <CiMenuBurger className="w-12 h-6" />}
      </button>

      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"} p-10`}>
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold text-green-400 py-10">Your today's tasks</h1>
          <button onClick={toggleModal} className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600">
            + Add / Schedule task
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
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 ">
          <div className="bg-black p-6 rounded-lg border border-green-500 w-96 relative max-h-[90vh] overflow-auto">
            <h2 className="text-2xl text-green-400 font-bold mb-4">Create New Task</h2>

            <div className="flex flex-col gap-3 text-green-300">
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
              <div className="relative">
                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleInputChange}
                  className="p-2 border border-green-500 bg-black text-green-300 rounded-xl w-full appearance-none focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-green-400 text-sm"> ▼ </span>
              </div>
              <input
                ref={dateRef}
                type="date"
                name="endDate"
                value={newTask.endDate}
                onChange={handleInputChange}
                placeholder="Expected end date"
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
