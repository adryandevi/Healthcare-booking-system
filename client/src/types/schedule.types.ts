// src/types/schedule.types.ts

export type ScheduleStatus = "confirmed" | "pending" | "blocked" | "completed";

export interface ScheduleEntry {
  id:        string;
  time:      string;
  patient:   string;
  type:      string;
  status:    ScheduleStatus;
  duration:  number; // minutes
}