export type SlotStatus = "available" | "taken" | "selected" | "blocked";

export interface TimeSlot {
  time:   string;
  status: SlotStatus;
}

export interface DoctorOption {
  label:    string;
  initials: string;
}

export interface BookingSummaryDetail {
  label: string;
  value: string;
}