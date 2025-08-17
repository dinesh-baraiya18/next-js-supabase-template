"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PrivatePagesLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) router.push("/auth/signin");
  }, [isLoading, user, router]);

  if (!user) return null;

  return <div>{children}</div>;
};

export default PrivatePagesLayout;
