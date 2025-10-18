'use client';
import React, { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

type Task = {
    title: string;
    description: string;
    status: boolean;
};

export default function TaskCircle(task: Task) {
    const [ isCompleted , setIsCompleted ] = useState(task.status);
    return(
        <>
        <div className={`w-80 h-80 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform transition-all ${isCompleted ? 'bg-green-400 border-green-600' : 'bg-black border-green-400 text-green-300'}`} onClick={() => setIsCompleted(!isCompleted)}>
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <p className="text-center px-4">{task.description}</p>
            <p className="mt-4 flex items-center">
                {isCompleted ? 
                    <IoIosCheckmarkCircle className="w-6 h-6 mr-2 text-black"/> 
                    : 
                    <RxCrossCircled className="w-6 h-6 mr-2 text-green "/>
                }
                {isCompleted ? 'Completed' : 'Pending'}
            </p>
        </div>
        </>
    )
}