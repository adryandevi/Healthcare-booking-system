import type { Appointment } from "../types/appointment.types";

export const APPOINTMENT_COLUMNS = [
  "ID", "Patient", "Doctor", "Date", "Type", "Status", "Actions",
] as const;

export const STATUS_OPTIONS = [
  "All statuses", "confirmed", "pending", "completed", "cancelled",
] as const;

export const DOCTOR_OPTIONS = [
  "All doctors", "Dr. Reyes", "Dr. Lim", "Dr. Cruz", "Dr. Miranda",
] as const;

export const APPT_STATUS_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
  confirmed:  { dot: "bg-teal-500",  text: "text-teal-700",  bg: "bg-teal-50"   },
  pending:    { dot: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50"  },
  completed:  { dot: "bg-slate-400", text: "text-slate-600", bg: "bg-slate-100" },
  cancelled:  { dot: "bg-red-400",   text: "text-red-600",   bg: "bg-red-50"    },
} as const;

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: "1", aptId: "#APT-0081", patient: "Maria Santos",  doctor: "Dr. Reyes", date: "Apr 17 · 9AM",    type: "Follow-up",    status: "confirmed"  },
  { id: "2", aptId: "#APT-0082", patient: "Ana Dela Cruz", doctor: "Dr. Reyes", date: "Apr 17 · 10AM",   type: "Consultation", status: "pending"    },
  { id: "3", aptId: "#APT-0083", patient: "Pedro Ramos",   doctor: "Dr. Lim",   date: "Apr 17 · 2:30PM", type: "Lab Review",   status: "confirmed"  },
  { id: "4", aptId: "#APT-0079", patient: "Luis Mendoza",  doctor: "Dr. Reyes", date: "Apr 15 · 3PM",    type: "Checkup",      status: "cancelled"  },
];