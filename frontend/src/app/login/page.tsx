'use client';
import { useState } from "react";
import { useRouter }    from "next/navigation";
import { loginUser } from "../lib/authService";

export default function Login(){
    const router = useRouter();
    const [form , setForm ] = useState({
        email:'',
        password:''
    });
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setForm({ ...form, [e.target.name] : e.target.value});
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setError('');
        try{
            setLoading(true);
            loginUser({
                email: form.email,
                password: form.password
            }).then((res: { error?: string }) => {
                setLoading(false);
                if(res?.error){
                    setError(res.error);
                    return;
                }
                alert('Login Successful');
                router.push('/');
            })
        }catch(err){
            setLoading(false);
            setError('Something went wrong, Please try again later');
        }
    }
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            
            <div className="w-96 p-8 rounded-2xl border-2 border-green-400 shadow-[0_0_20px_4px_rgba(0, 255,0,0.6)]">
                <h1 className="text-3xl font-bold text-green-400 text-center mb-6"> Login</h1>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
                    {error && <p className="text-red-500">{error}</p>}
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={form.email} 
                        onChange={handleChange}
                        className="bg-transparent border border-green-500 text-green-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        required
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={handleChange}
                        className="bg-transparent border border-green-500 text-green-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                        required
                    />
                    <button 
                        type="submit" 
                        className="bg-green-500 text-black font-semibold p-2 rounded hover:bg-green-600 transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <p className="text-green-300 text-sm text-center mt-2">
                        Don't have an account? <a href="/register" className="text-green-500 hover:underline">Register</a>
                    </p>
                </form>
            </div>
        </div>
    )
}