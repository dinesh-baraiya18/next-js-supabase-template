"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user?.email) {
      router.push("/dashboard");
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;

  const handleSignUp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`, // optional redirect
        },
      });

      if (error) throw error;
      setMessage("Signup successful! Please check your email to verify.");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-semibold">Sign Up</h1>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password (min. 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSignUp} disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </Button>

      {message && <p className="text-sm text-center text-red-500">{message}</p>}

      <p className="text-sm text-center">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/auth/signin")}
          className="text-blue-600 hover:underline"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
