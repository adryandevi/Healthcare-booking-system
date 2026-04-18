// src/hooks/useSchedule.ts

import { useState } from "react";
import type { ScheduleEntry } from "../types/schedule.types";

// ─── Mock data ────────────────────────────────────────────────────────────────
// Replace with: await schedulesService.getByDate(date)

const MOCK_ENTRIES: ScheduleEntry[] = [
  { id: "1", time: "8:00 AM",  patient: "Jose Cruz",        type: "General Checkup", status: "confirmed",  duration: 30 },
  { id: "2", time: "9:00 AM",  patient: "Maria Santos",     type: "Follow-up",       status: "confirmed",  duration: 20 },
  { id: "3", time: "10:00 AM", patient: "Ana Dela Cruz",    type: "Consultation",    status: "pending",    duration: 45 },
  { id: "4", time: "11:00 AM", patient: "Pedro Ramos",      type: "Lab Review",      status: "confirmed",  duration: 20 },
  { id: "5", time: "12:00 PM", patient: "Lunch break",      type: "",                status: "blocked",    duration: 60 },
  { id: "6", time: "2:00 PM",  patient: "Rosa Garcia",      type: "New patient",     status: "confirmed",  duration: 45 },
  { id: "7", time: "3:30 PM",  patient: "Luis Mendoza",     type: "Consultation",    status: "pending",    duration: 30 },
];

// ─── Date helpers ─────────────────────────────────────────────────────────────

const DATES = [
  "Friday, April 17, 2026",
  "Saturday, April 18, 2026",
  "Sunday, April 19, 2026",
  "Monday, April 20, 2026",
];

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSchedule() {
  const [entries,   setEntries]   = useState<ScheduleEntry[]>(MOCK_ENTRIES);
  const [dateIndex, setDateIndex] = useState(0);

  // ── Navigation ───────────────────────────────────────────────────────────
  function goToPrevious() {
    setDateIndex((prev) => Math.max(0, prev - 1));
  }

  function goToNext() {
    setDateIndex((prev) => Math.min(DATES.length - 1, prev + 1));
  }

  // ── Appointment actions ──────────────────────────────────────────────────
  // Each handler uses a status transition — only the relevant
  // entry changes, the rest of the list stays untouched.

  function handleConfirm(id: string) {
    setEntries((prev) =>
      prev.map((e) => e.id === id ? { ...e, status: "confirmed" } : e)
    );
    // Replace with: await schedulesService.confirm(id);
  }

  function handleReject(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
    // Replace with: await schedulesService.reject(id);
  }

  function handleNotes(id: string) {
    console.log("Open notes for", id);
    // Replace with: navigate(`/doctor/appointments/${id}/notes`);
  }

  return {
    entries,
    currentDate:  DATES[dateIndex],
    canGoPrev:    dateIndex > 0,
    canGoNext:    dateIndex < DATES.length - 1,
    goToPrevious,
    goToNext,
    handleConfirm,
    handleReject,
    handleNotes,
  };
}