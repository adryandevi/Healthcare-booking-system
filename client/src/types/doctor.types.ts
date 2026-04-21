export type DoctorStatus = "active" | "on leave" | "inactive";

export interface Doctor {
  id:             string;
  name:           string;
  initials:       string;
  email:          string;
  specialty:      string;
  status:         DoctorStatus;
  totalAppts:     number;
  acceptanceRate: number;
  barColor:       string;
}