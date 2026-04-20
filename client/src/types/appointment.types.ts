export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface Appointment {
  id:      string;
  aptId:   string;
  patient: string;
  doctor:  string;
  date:    string;
  type:    string;
  status:  AppointmentStatus;
}