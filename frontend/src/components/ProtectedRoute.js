"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated) return;

    if (!token) {
      router.push("/login");
    }
  }, [token, hydrated, router]);

  if (!hydrated) {
    return <p>Carregando...</p>;
  }

  if (!token) {
    return null;
  }

  return children;
}