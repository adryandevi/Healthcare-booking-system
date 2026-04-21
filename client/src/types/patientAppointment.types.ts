export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";

export interface AppointmentDoctor {
  name:      string;
  specialty: string;
  initials:  string;
}

export interface PatientAppointment {
  id:     string;
  doctor: AppointmentDoctor;
  date:   string;
  time:   string;
  type:   string;
  status: AppointmentStatus;
}