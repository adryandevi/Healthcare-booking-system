export type PatientActivityStatus = "active" | "pending" | "inactive";

export interface AdminPatient {
  id:              string;
  name:            string;
  initials:        string;
  email:           string;
  registered:      string;
  totalVisits:     number;
  lastAppointment: string;
  status:          PatientActivityStatus;
}