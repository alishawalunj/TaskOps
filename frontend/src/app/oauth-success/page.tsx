'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = params.get('token');
    const userId = params.get('userId');

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId || "");
      router.push('/dashboard');
    }
  }, []);

  return <p>Logging you in...</p>;
}
