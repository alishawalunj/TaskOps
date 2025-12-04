'use client';

import { useRouter } from "next/navigation";
import { Typewriter } from 'react-simple-typewriter';
export default function Home() {
  const router = useRouter();

  const handleLogin = () => router.push("/login");
  const handleRegister = () => router.push("/register");
  

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-green-400 px-4">
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide text-green-400 drop-shadow-[0_0_15px_#39FF14]">
          ⚡ Welcome to TaskOps
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-md mx-auto">
          <Typewriter
            words={[
              'Manage tasks effortlessly.',
              'Streamline your workflow.',
              'Stay organized and productive.',
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1500}
          />
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-4">
          <button onClick={handleLogin} className="px-6 py-3 rounded-lg bg-green-500 text-black font-semibold shadow-[0_0_20px_#39FF14] hover:shadow-[0_0_40px_#39FF14] hover:bg-green-400 transition-all duration-300">
            Login
          </button>
          <button onClick={handleRegister} className="px-6 py-3 rounded-lg border border-green-400 text-green-400 font-semibold hover:bg-green-400 hover:text-black shadow-[0_0_15px_#39FF14] transition-all duration-300">
            Register
          </button>
        </div>  
      </div>
      {/* Optional footer */}
      <footer className="absolute bottom-4 text-gray-600 text-sm">
        © 2025 TaskOps. All rights reserved.
      </footer>
    </div>
  );
}
