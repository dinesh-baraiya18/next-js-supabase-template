"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setMessage("Authentication error. Please try signing up again.");
          setTimeout(() => router.push("/auth/signup"), 3000);
          return;
        }

        if (data.session) {
          setMessage(
            "Email verified successfully! Redirecting to dashboard..."
          );
          setTimeout(() => router.push("/dashboard"), 2000);
        } else {
          setMessage("No active session found. Please sign in.");
          setTimeout(() => router.push("/auth/signin"), 3000);
        }
      } catch (err) {
        setMessage("An error occurred. Please try again.");
        setTimeout(() => router.push("/auth/signin"), 3000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="max-w-sm mx-auto mt-10 text-center">
      <h1 className="text-xl font-semibold mb-4">Email Verification</h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
