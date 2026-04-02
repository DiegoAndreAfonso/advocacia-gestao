"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { getRouteByRole } from "@/utils/redirectByRole";

type User = {
  id: number;
  name: string;
  email: string;
  roles: string[];
};

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("userData");

  if (!token || !storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export function useAuth() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const isAuthenticated = !!user;

  const setAuth = useCallback((userData: User, token: string) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
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
