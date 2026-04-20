import type {
  StatCard, DoctorWorkload,
  StatusBreakdown, RecentAppointment,
} from "../types/overview.types";

export const STAT_CARDS: StatCard[] = [
  { label: "Total appointments", value: 284,    delta: "↑ 12% vs last month",  deltaUp: true,  color: "text-teal-600"   },
  { label: "Confirmed today",    value: 18,     delta: "↑ 4 from yesterday",   deltaUp: true,  color: "text-teal-600"   },
  { label: "Pending approval",   value: 7,      delta: "",                     deltaUp: false, color: "text-amber-500", sub: "Needs doctor review" },
  { label: "Cancellation rate",  value: "8.3%", delta: "↑ 1.2% vs last month", deltaUp: false, color: "text-red-500"    },
];

export const DOCTOR_WORKLOAD: DoctorWorkload[] = [
  { id: "1", name: "Dr. Adryan",   initials: "DR", appts: 24, maxAppts: 30, color: "bg-teal-500"   },
  { id: "2", name: "Dr. Lim",     initials: "DL", appts: 19, maxAppts: 30, color: "bg-blue-500"   },
  { id: "3", name: "Dr. Cruz",    initials: "DC", appts: 15, maxAppts: 30, color: "bg-red-500"    },
  { id: "4", name: "Dr. Miranda", initials: "DM", appts: 11, maxAppts: 30, color: "bg-amber-500"  },
];

export const STATUS_BREAKDOWN: StatusBreakdown[] = [
  { label: "confirmed",  count: 184, color: "bg-teal-600"  },
  { label: "pending",    count: 47,  color: "bg-amber-500" },
  { label: "completed",  count: 30,  color: "bg-slate-400" },
  { label: "cancelled",  count: 23,  color: "bg-red-500"   },
];

export const RECENT_APPOINTMENTS: RecentAppointment[] = [
  { id: "1", patient: "Maria Santos",  initials: "MS", doctor: "Dr. Reyes", date: "Apr 17", time: "9:00 AM",  type: "Follow-up",    status: "confirmed"  },
  { id: "2", patient: "Ana Dela Cruz", initials: "AC", doctor: "Dr. Reyes", date: "Apr 17", time: "10:00 AM", type: "Consultation", status: "pending"    },
  { id: "3", patient: "Pedro Ramos",   initials: "PR", doctor: "Dr. Lim",   date: "Apr 17", time: "2:30 PM",  type: "Lab results",  status: "confirmed"  },
  { id: "4", patient: "Rosa Garcia",   initials: "RG", doctor: "Dr. Cruz",  date: "Apr 18", time: "11:00 AM", type: "New patient",  status: "pending"    },
  { id: "5", patient: "Luis Mendoza",  initials: "LM", doctor: "Dr. Reyes", date: "Apr 19", time: "3:00 PM",  type: "Checkup",      status: "cancelled"  },
];

export const PERIOD_OPTIONS = ["This month", "Last month", "Last 3 months"] as const;

export const OVERVIEW_COLUMNS = ["Patient", "Doctor", "Date & Time", "Type", "Status", "Actions"] as const;

export const AVATAR_COLORS: Record<string, string> = {
  MS: "bg-teal-100 text-teal-700",
  AC: "bg-violet-100 text-violet-700",
  PR: "bg-sky-100 text-sky-700",
  RG: "bg-emerald-100 text-emerald-700",
  LM: "bg-amber-100 text-amber-700",
  DR: "bg-teal-100 text-teal-700",
  DL: "bg-blue-100 text-blue-700",
  DC: "bg-red-100 text-red-700",
  DM: "bg-amber-100 text-amber-700",
} as const;

export const APPT_STATUS_STYLES: Record<string, { dot: string; text: string; bg: string }> = {
  confirmed:  { dot: "bg-teal-500",   text: "text-teal-700",  bg: "bg-teal-50"   },
  pending:    { dot: "bg-amber-400",  text: "text-amber-700", bg: "bg-amber-50"  },
  completed:  { dot: "bg-slate-400",  text: "text-slate-600", bg: "bg-slate-100" },
  cancelled:  { dot: "bg-red-400",    text: "text-red-700",   bg: "bg-red-50"    },
} as const;