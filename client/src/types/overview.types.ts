export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface StatCard {
  label:    string;
  value:    string | number;
  delta:    string;
  deltaUp:  boolean;
  sub?:     string;
  color:    string;
}

export interface DoctorWorkload {
  id:       string;
  name:     string;
  initials: string;
  appts:    number;
  maxAppts: number;
  color:    string;
}

export interface StatusBreakdown {
  label:  AppointmentStatus;
  count:  number;
  color:  string;
}

export interface RecentAppointment {
  id:       string;
  patient:  string;
  initials: string;
  doctor:   string;
  date:     string;
  time:     string;
  type:     string;
  status:   AppointmentStatus;
}