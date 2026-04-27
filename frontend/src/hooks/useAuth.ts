"use client";

import { useAuthContext } from "@/context/AuthContext";

export function useAuth() {
  // Backwards-compatible facade for the app.
  // Centralizes auth state and prevents UI flicker during hydration.
  return useAuthContext();
}
