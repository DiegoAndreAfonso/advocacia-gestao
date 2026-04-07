"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getRouteByRole } from "@/utils/redirectByRole";
import auth from "@/configs/auth";

type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
};

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(auth.storageTokenKeyName);
  const storedUser = localStorage.getItem(auth.userDataKeyName);

  if (!token || !storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export function useAuth() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      queueMicrotask(() => {
        setUser(stored);
      });
    }
  }, []);

  const isAuthenticated = !!user;

  const setAuth = useCallback((userData: User, token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(auth.storageTokenKeyName, token);
      localStorage.setItem(auth.userDataKeyName, JSON.stringify(userData));
    }
    setUser(userData);
  }, []);

  const hasRole = useCallback(
    (role: string) => user?.roles?.includes(role) ?? false,
    [user],
  );

  const redirectByRole = useCallback(() => {
    if (!user) return;
    const route = getRouteByRole(user.roles);
    router.replace(route);
  }, [user, router]);

  const logout = useCallback(() => {
    localStorage.removeItem(auth.storageTokenKeyName);
    localStorage.removeItem(auth.userDataKeyName);
    setUser(null);
    router.replace("/login");
  }, [router]);

  return {
    user,
    isAuthenticated,
    hasRole,
    redirectByRole,
    logout,
    setAuth,
  };
}
