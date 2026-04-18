export type DayOfWeek =
  | "Monday" | "Tuesday" | "Wednesday" | "Thursday"
  | "Friday" | "Saturday" | "Sunday";

export interface DaySchedule {
  day:     DayOfWeek;
  start:   string;
  end:     string;
  enabled: boolean;
}

export interface BlockedDate {
  id:        string;
  date:      string;
  reason:    string;
  timeStart: string;
  timeEnd:   string;
}