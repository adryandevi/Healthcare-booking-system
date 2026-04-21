import type { PatientAppointment, AppointmentStatus } from "../types/patientAppointment.types";

export const APPOINTMENT_STATUS_FILTER: { label: string; value: AppointmentStatus | "all" }[] = [
  { label: "All statuses", value: "all"       },
  { label: "Confirmed",    value: "confirmed"  },
  { label: "Pending",      value: "pending"    },
  { label: "Completed",    value: "completed"  },
  { label: "Cancelled",    value: "cancelled"  },
] as const;

export const APPOINTMENT_TABLE_COLUMNS = [
  "Doctor", "Date & Time", "Type", "Status", "Actions",
] as const;

export const APPOINTMENT_STATUS_STYLES: Record<AppointmentStatus, {
  label:       string;
  dotColor:    string;
  pillClasses: string;
}> = {
  confirmed: { label: "Confirmed", dotColor: "bg-green-500",  pillClasses: "bg-green-50 text-green-700 border border-green-200"   },
  pending:   { label: "Pending",   dotColor: "bg-amber-400",  pillClasses: "bg-amber-50 text-amber-700 border border-amber-200"   },
  completed: { label: "Completed", dotColor: "bg-slate-400",  pillClasses: "bg-slate-100 text-slate-500 border border-slate-200" },
  cancelled: { label: "Cancelled", dotColor: "bg-red-400",    pillClasses: "bg-red-50 text-red-500 border border-red-200"         },
} as const;

export const DOCTOR_AVATAR_COLORS: Record<string, string> = {
  DR: "bg-teal-100 text-teal-700",
  DL: "bg-blue-100 text-blue-700",
  DC: "bg-red-100 text-red-500",
  DM: "bg-amber-100 text-amber-700",
} as const;

export const MOCK_PATIENT_APPOINTMENTS: PatientAppointment[] = [
  { id: "APT-001", doctor: { name: "Dr. Reyes", specialty: "General Practice",  initials: "DR" }, date: "April 20, 2026", time: "9:00 AM",  type: "General Checkup",     status: "confirmed" },
  { id: "APT-002", doctor: { name: "Dr. Lim",   specialty: "Internal Medicine", initials: "DL" }, date: "April 25, 2026", time: "2:30 PM",  type: "Lab Results Review",  status: "pending"   },
  { id: "APT-003", doctor: { name: "Dr. Reyes", specialty: "General Practice",  initials: "DR" }, date: "April 14, 2026", time: "10:00 AM", type: "Blood Panel",          status: "completed" },
  { id: "APT-004", doctor: { name: "Dr. Cruz",  specialty: "Cardiology",        initials: "DC" }, date: "March 28, 2026", time: "3:00 PM",  type: "Consultation",         status: "cancelled" },
];