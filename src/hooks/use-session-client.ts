"use client";

import { useEffect, useState } from "react";

interface UseSessionClientProps {
  initial: unknown | null;
}

export function useSessionClient({ initial }: UseSessionClientProps) {
  const [session, setSession] = useState(initial || null);

  useEffect(() => {
   fetch("/api/session", { cache: "no-store" })
      .then(res => res.json())
      .then(setSession)
      .catch(() => setSession(null));
  }, []);

  return session;
}
