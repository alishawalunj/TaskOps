'use client'
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter();

  const handleLogin = () => {
    console.log("Login button clicked");
    router.push("/login");
  };

  const handleRegister = () => {
    console.log("Login button clicked");
    router.push("/register");
  };

  return (
    <html>
        <body>
            <h1>Welcome to the Home Page</h1>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
        </body>
    </html>
    
  );
};