// src/hooks/useCvData.ts
import { useEffect, useState } from "react";
import type { Cv } from "../types/cv";
import { API_BASE } from "../config";

export function useCvData() {
  const [cv, setCv] = useState<Cv | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ac = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/api/cv`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Cv;
        setCv(data);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError(e?.message ?? "Failed to load CV");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => ac.abort();
  }, []);

  return { cv, loading, error };
}
