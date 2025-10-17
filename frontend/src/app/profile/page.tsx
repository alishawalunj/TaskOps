'use client';

import { useState } from "react";
import { CiEdit } from "react-icons/ci";

export default function Profile(){
    const [formData, setFormData] = useState({});
    const [ isEditing, setIsEditing ] = useState(false);
    const [ error, setError] = useState('');
    const user = {
        name: 'Ali Shawa Lunji',
        username: 'alishawalunj',
        email: 'alis@mail.com',
        password: '********',
        address: 'Nairobi, Kenya',
        age: 25,
        sex: 'Male'
    }
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }  
    const handleCancel = () => {
        setIsEditing(false);
    }


   return !user ? <p> Loading.. </p> : (
        <div className="min-h-screen bg-black flex items-left justify-left">
            {/* Left section */}
            <div className="w-1/4 border-green-400 border-2 text-green-300">
             Images
            </div>
            {/* Right section */}
            <div className="w-3/4 border-2 border-green-400 flex items-center justify-center relative">
            
                <button type="button" onClick={() => setIsEditing(!isEditing)} className="absolute top-4 right-4 text-green-400 hover:text-green-600">
                    <CiEdit className="h-6 w-6" />
                </button>
                <form onSubmit={handleUpdate} className="w-[800px] h-[600px] border-2 border-green-400 p-6 rounded-xl flex flex-col gap-10 items-center justify-center">
                    <h2 className="absolute top-40 text-xl font-bold text-green-300">User Profile</h2>

                    {error && <p className="text-red-500 w-1/3 text-right">{error}</p>}

                    <div className="flex items-center justify-between w-full gap-4">
                        <label className="text-green-300">Name</label>
                        <input
                            name="name"
                            defaultValue={user.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`bg-transparent border-b border-green-300 focus:outline-none w-full text-center text-green-300 ${
                            !isEditing && "opacity-70"
                            }`}
                        />
                    </div>

                    <div className="flex items-center justify-between w-full gap-4">
                        <label className="text-green-300 w-1/3 text-right">Email</label>
                        <input
                            name="email"
                            defaultValue={user.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`bg-transparent border-b border-green-300 focus:outline-none w-full text-center  text-green-300 ${
                            !isEditing && "opacity-70"
                            }`}
                        />
                    </div>

                    <div className="flex items-center justify-between w-full gap-4">
                        <label className="text-green-300 w-1/3 text-right">Username</label>
                        <input
                            name="username"
                            defaultValue={user.username}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`bg-transparent border-b border-green-300 focus:outline-none w-full text-center  text-green-300 ${
                            !isEditing && "opacity-70"
                            }`}
                        />
                    </div>

                    <div className="flex items-center justify-between w-full gap-4">
                        <label className="text-green-300 w-1/3 text-right">Address</label>
                        <input
                            name="address"
                            defaultValue={user.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`bg-transparent border-b border-green-300 focus:outline-none w-full text-center  text-green-300 ${
                            !isEditing && "opacity-70"
                            }`}
                        />
                    </div>

                    <div className="flex items-center justify-between w-full gap-4">
                        <label className="text-green-300 w-1/3 text-right">Age</label>
                        <input
                            name="age"
                            defaultValue={user.age}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`bg-transparent border-b border-green-300 focus:outline-none w-full text-center  text-green-300 ${
                            !isEditing && "opacity-70"
                            }`}
                        />
                    </div>
                    
                    <div className="flex items-center justify-between w-full gap-4">
                        <label className="text-green-300 w-1/3 text-right">Sex</label>
                        <input
                            name="sex"
                            defaultValue={user.sex}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`bg-transparent border-b border-green-300 focus:outline-none w-full text-center text-green-300 ${
                            !isEditing && "opacity-70"
                            }`}
                        />
                    </div>
                    

                    {isEditing && (
                        <div className="flex gap-3 mt-4">
                        <button type="submit" className="border border-green-400 px-4 py-1 text-green-300 rounded hover:bg-green-400 hover:text-black">
                            Save
                        </button>
                        <button
                            type="button" onClick={handleCancel} className="border border-red-400 px-4 py-1 text-red-300 rounded hover:bg-red-400 hover:text-black">
                            Cancel
                        </button>
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}