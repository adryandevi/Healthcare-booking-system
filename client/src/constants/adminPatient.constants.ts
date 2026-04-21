import type { AdminPatient } from "../types/adminPatient.types";

export const ADMIN_PATIENT_COLUMNS = [
  "Patient", "Registered", "Total Visits", "Last Appointment", "Status", "Actions",
] as const;

export const PATIENT_ACTIVITY_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
  active:   { dot: "bg-teal-500",  text: "text-teal-700",  bg: "bg-teal-50"  },
  pending:  { dot: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50" },
  inactive: { dot: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-100"},
} as const;

export const ADMIN_PATIENT_AVATAR_COLORS: Record<string, string> = {
  MS: "bg-teal-100 text-teal-700",
  JC: "bg-emerald-100 text-emerald-700",
  AC: "bg-violet-100 text-violet-700",
  PR: "bg-sky-100 text-sky-700",
} as const;

export const MOCK_ADMIN_PATIENTS: AdminPatient[] = [
  { id: "1", name: "Maria Santos",  initials: "MS", email: "maria@email.com", registered: "Jan 2025", totalVisits: 7, lastAppointment: "Apr 14, 2026", status: "active"   },
  { id: "2", name: "Jose Cruz",     initials: "JC", email: "jose@email.com",  registered: "Mar 2025", totalVisits: 3, lastAppointment: "Apr 10, 2026", status: "active"   },
  { id: "3", name: "Ana Dela Cruz", initials: "AC", email: "ana@email.com",   registered: "Feb 2026", totalVisits: 1, lastAppointment: "Apr 17, 2026", status: "pending"  },
  { id: "4", name: "Pedro Ramos",   initials: "PR", email: "pedro@email.com", registered: "Jun 2025", totalVisits: 2, lastAppointment: "Mar 28, 2026", status: "active"   },
];