
import type { Doctor } from "../types/doctor.types";

export const DOCTOR_COLUMNS = [
  "Doctor", "Specialty", "Status", "Total Appointments", "Acceptance Rate", "Actions",
] as const;

export const DOCTOR_STATUS_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
  "active":   { dot: "bg-teal-500",  text: "text-teal-700",  bg: "bg-teal-50"  },
  "on leave": { dot: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50" },
  "inactive": { dot: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-100"},
} as const;

export const DOCTOR_AVATAR_COLORS: Record<string, string> = {
  DR: "bg-teal-100 text-teal-700",
  DL: "bg-blue-100 text-blue-700",
  DC: "bg-red-100 text-red-700",
  DM: "bg-amber-100 text-amber-700",
} as const;

export const MOCK_DOCTORS: Doctor[] = [
  { id: "1", name: "Dr. Reyes",   initials: "DR", email: "reyes@medibook.ph", specialty: "General Practice",  status: "active",   totalAppts: 24, acceptanceRate: 92, barColor: "bg-teal-500"  },
  { id: "2", name: "Dr. Lim",     initials: "DL", email: "lim@medibook.ph",   specialty: "Internal Medicine", status: "active",   totalAppts: 19, acceptanceRate: 85, barColor: "bg-blue-500"  },
  { id: "3", name: "Dr. Cruz",    initials: "DC", email: "cruz@medibook.ph",  specialty: "Cardiology",        status: "on leave", totalAppts: 15, acceptanceRate: 78, barColor: "bg-amber-500" },
];