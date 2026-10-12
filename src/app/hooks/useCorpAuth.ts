"use client";

import { useCallback, useState } from "react";
import { serializeAuthRequest, type AuthRequest } from "../api/corp-auth/models/AuthRequest";
import { AuthResponseSchema } from "../api/corp-auth/models/AuthResponse";

export type CorpAuthStatus = "success" | "failure" | "error" | null;

export function useCorpAuth() {
  const [unlocked, setUnlocked] = useState(false);
  const [result, setResult] = useState<CorpAuthStatus>(null);

  const verifyPassword = useCallback(async (password: string): Promise<void> => {
    setUnlocked(false);
    setResult(null);

    try {
      const valid = await verifyCorpPassword(password);
      setUnlocked(valid);
      setResult(valid ? "success" : "failure");
    } catch {
      setResult("error");
    }
  }, []);

  const reset = useCallback(() => {
    setUnlocked(false);
    setResult(null);
  }, []);

  return { unlocked, result, verifyPassword, reset };
}

async function verifyCorpPassword(password: string): Promise<boolean> {
  const authRequest: AuthRequest = { password };
  const response = await fetch("/api/corp-auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: serializeAuthRequest(authRequest),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Password verification failed.");
  }

  const parsedResponse = AuthResponseSchema.safeParse(await response.json());
  if (!parsedResponse.success || !("valid" in parsedResponse.data)) {
    throw new Error("Invalid password verification response.");
  }

  return parsedResponse.data.valid;
}
