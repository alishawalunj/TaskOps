'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../lib/authService";

export default function Register(){
    const router = useRouter();
    const [ form , setForm ] = useState({
        username:'',
        email:'',
        password:'',
        passwordConfirm:'',
        address:'',
        age : '',
        sex : ''

    });
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name] : e.target.value}); 
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if(form.password != form.passwordConfirm){
            setError('Passwords dont match, Please enter similar password');
            return;
        }

        try {
            setLoading(true);
            registerUser({
                username: form.username,
                email: form.email,
                password: form.password,
                address: form.address,
                age: form.age,
                sex: form.sex
            });
            setLoading(false);
            alert('Registration Successful, Please login to continue');
            router.push('/login');
        } catch(err: any) {
            setLoading(false);
            setError(err.message || 'Something went wrong, Please try again later');
        }
    }

    return (
       <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-180 p-8 rounded-2xl border-2 border-green-400 flex flex-col items-center mt-10">
            <h1 className="text-6xl font-bold text-green-400 mb-20">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                {error && <p className="text-red-500">{error}</p>}
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={form.username} 
                    onChange={handleChange} 
                    required 
                    className="bg-transparent border border-green-500 text-green-100 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    className="bg-transparent border border-green-500 text-green-100 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={handleChange} 
                    required 
                    className="bg-transparent border border-green-500 text-green-100 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <input 
                    type="password" 
                    name="passwordConfirm" 
                    placeholder="Confirm Password" 
                    value={form.passwordConfirm} 
                    onChange={handleChange} 
                    required 
                    className="bg-transparent border border-green-500 text-green-100 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <input 
                    type="text" 
                    name="address" 
                    placeholder="Address" 
                    value={form.address} 
                    onChange={handleChange} 
                    required 
                    className="bg-transparent border border-green-500 text-green-100 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <input 
                    type="number" 
                    name="age" 
                    placeholder="Age" 
                    value={form.age} 
                    onChange={handleChange} 
                    required 
                    className="bg-transparent border border-green-500 text-green-100 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <input 
                    type="text" 
                    name="sex" 
                    placeholder="Sex" 
                    value={form.sex} 
                    onChange={handleChange} 
                    required 
                    className="bg-transparent border border-green-500 text-green-100 p-2 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-green-500 text-black font-semibold p-2 rounded hover:bg-green-600 transition-colors mt-10 disabled:opacity-50"
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
       </div>

    )
}