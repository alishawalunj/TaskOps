'use client';
import React, { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTaskMutations } from '../hooks/useTasksMutations';
import { TaskRequestDTO } from '../graphql/types';

type Task = {
    taskId: string;
    name: string;
    description: string;
    status: string;
    duration?: number;
    date?: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
    onDelete?: (taskId: string) => void;
};

export default function TaskCircle(task: Task) {
    const [ isCompleted, setIsCompleted ] = useState(task.status === "Completed");
    const { updateTask, deleteTask } = useTaskMutations();
    

    const handleClick = async () => {
        const newStatus = isCompleted ? "Pending" : "Completed";
        setIsCompleted(!isCompleted);
        if (updateTask) {
            const payload: TaskRequestDTO ={
                taskId: task.taskId,
                name: task.name,
                description: task.description,
                status: newStatus,
                 duration: task.duration || 0,
                date: task.date || new Date().toISOString().split("T")[0],
                userId: task.userId || "",
                createdAt: task.createdAt || new Date().toISOString().split("T")[0],
                updatedAt: new Date().toISOString().split("T")[0],
            };
            try{
                await updateTask(payload);
            } catch (err){
                setIsCompleted(isCompleted);
            }
        }
    }
    const handleDelete = async () => {
        try{
            const confirm = window.confirm("Are you sure you want to delete this task?");
            if(!confirm) return;
            const res = await deleteTask(task.taskId);
            if(res){
                alert("Task deleted successfully");
                if(task.onDelete){
                    task.onDelete(task.taskId);
                }
            } else {
                alert("Failed to delete task");
            }
        }catch(err){
            alert("Error deleting task");
        };
    }
    return(
        <>
        <div className={`w-80 h-80 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition-all ${isCompleted ? 'bg-green-400 border-green-600' : 'bg-black border-green-400 text-green-300'}`} onClick={() => setIsCompleted(!isCompleted)}>
            <h2 className="text-2xl font-bold">{task.name}</h2>
            <p className="text-center px-4">{task.description}</p>
            <p className="mt-4 flex mb-5 items-center">
                {isCompleted ? 
                    <IoIosCheckmarkCircle className="w-6 h-6 mr-2 text-black"/> 
                    : 
                    <RxCrossCircled className="w-6 h-6 mr-2 text-green "/>
                }
                {isCompleted ? 'Completed' : 'Pending'}
            </p>
            <p className="ml-4 flex items-center text-red-500 hover:text-red-700 cursor-pointer">
                    <RiDeleteBin6Line onClick={handleDelete} className="w-5 h-5 mr-1"/>
                </p>
        </div>
        </>
    )
}