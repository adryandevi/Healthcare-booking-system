export type AppointmentStatus = "Confirmed" | "Pending" | "Cancelled";
export type NotificationColor  = "blue" | "green" | "yellow";

export interface DashboardAppointment {
  id:      string;
  iconBg:  string;
  title:   string;
  doctor:  string;
  status:  AppointmentStatus;
}

export interface HistoryEntry {
  id:    string;
  label: string;
  date:  string;
}

export interface DashboardNotification {
  id:      string;
  color:   NotificationColor;
  message: string;
  time:    string;
}

export interface DashboardDoctor {
  id:        string;
  initials:  string;
  name:      string;
  specialty: string;
}

export interface DashboardStat {
  label:    string;
  value:    string | number;
  sub:      string;
  subColor?: string;
  showUpIcon?: boolean;
}