"use client";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

const Homepage = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in</div>;

  return <div>Welcome {user.email}</div>;
};

export default Homepage;
