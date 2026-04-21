import type {
  DashboardAppointment, HistoryEntry,
  DashboardNotification, DashboardDoctor,
  DashboardStat, AppointmentStatus,
} from "../types/dashboard.types";

export const APPOINTMENT_STATUS_STYLES: Record<AppointmentStatus, { text: string; dot: string }> = {
  Confirmed: { text: "#0da88b", dot: "#0da88b" },
  Pending:   { text: "#d97706", dot: "#d97706" },
  Cancelled: { text: "#ef4444", dot: "#ef4444" },
} as const;

export const NOTIFICATION_BG: Record<string, string> = {
  blue:   "rgba(59,130,246,0.08)",
  green:  "rgba(13,168,139,0.08)",
  yellow: "rgba(234,179,8,0.08)",
} as const;

export const NOTIFICATION_DOT: Record<string, string> = {
  blue:   "#3b82f6",
  green:  "#0da88b",
  yellow: "#ca8a04",
} as const;

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: "Upcoming appointments", value: 2, sub: "Next: April 20"                                         },
  { label: "Total visits this year", value: 7, sub: "2 more than last year", subColor: "#0da88b", showUpIcon: true },
  { label: "Pending lab results",    value: 1, sub: "Blood panel — Apr 14",  subColor: "#d97706"              },
];

export const UPCOMING_APPOINTMENTS: DashboardAppointment[] = [
  { id: "1", iconBg: "#0d3d30",  title: "General Checkup",     doctor: "Dr. Reyes · April 20 · 9:00 AM",  status: "Confirmed" },
  { id: "2", iconBg: "#fef3c7",  title: "Lab Results Review",  doctor: "Dr. Lim · April 25 · 2:30 PM",    status: "Pending"   },
];

export const RECENT_HISTORY: HistoryEntry[] = [
  { id: "1", label: "Blood panel checkup",    date: "Apr 14" },
  { id: "2", label: "Follow-up consultation", date: "Mar 28" },
  { id: "3", label: "Flu vaccination",        date: "Mar 5"  },
];

export const DASHBOARD_NOTIFICATIONS: DashboardNotification[] = [
  { id: "1", color: "blue",   message: "Lab results from Apr 14 are available.", time: "2 hours ago" },
  { id: "2", color: "green",  message: "Appointment with Dr. Reyes confirmed.",  time: "Yesterday"   },
  { id: "3", color: "yellow", message: "Reminder: appointment in 3 days.",       time: "Apr 15"      },
];

export const DASHBOARD_DOCTORS: DashboardDoctor[] = [
  { id: "1", initials: "DR", name: "Dr. Reyes", specialty: "General Practice"  },
  { id: "2", initials: "DL", name: "Dr. Lim",   specialty: "Internal Medicine" },
];

export const APPOINTMENT_ICONS: Record<string, { stroke: string; path: string }> = {
  "1": { stroke: "#0da88b", path: "M22 12h-4l-3 9L9 3l-3 9H2" },
  "2": { stroke: "#d97706", path: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
} as const;