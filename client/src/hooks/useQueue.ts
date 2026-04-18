import { useState, useCallback } from "react";
import type { QueueEntry }       from "../types/queue.types";

const MOCK_QUEUE: QueueEntry[] = [
  { id: "1", patient: "Ana Dela Cruz",  initials: "AC", type: "Consultation",   datetime: "Apr 17 · 10:00 AM", status: "pending"   },
  { id: "2", patient: "Luis Mendoza",   initials: "LM", type: "Consultation",   datetime: "Apr 17 · 3:30 PM",  status: "pending"   },
  { id: "3", patient: "Jose Cruz",      initials: "JC", type: "General Checkup", datetime: "Apr 18 · 9:00 AM", status: "confirmed" },
];

export function useQueue() {
  const [entries, setEntries] = useState<QueueEntry[]>(MOCK_QUEUE);

  const handleConfirm = useCallback((id: string) => {
    setEntries((prev) =>
      prev.map((e) => e.id === id ? { ...e, status: "confirmed" } : e)
    );
  }, []);

  const handleReject = useCallback((id: string) => {
    setEntries((prev) =>
      prev.map((e) => e.id === id ? { ...e, status: "rejected" } : e)
    );
  }, []);

  const pending   = entries.filter((e) => e.status === "pending").length;
  const confirmed = entries.filter((e) => e.status === "confirmed").length;
  const rejected  = entries.filter((e) => e.status === "rejected").length;

  return { entries, pending, confirmed, rejected, handleConfirm, handleReject };
}