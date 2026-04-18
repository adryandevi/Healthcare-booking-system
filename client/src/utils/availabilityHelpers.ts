import type { DayOfWeek, DaySchedule } from "../types/availability.types";

export const BLOCK_REASONS = [
  "Lunch break",
  "Personal leave",
  "Conference",
  "Out of office",
  "Holiday",
  "Other",
];

export const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: "Monday",    start: "08:00", end: "17:00", enabled: true  },
  { day: "Tuesday",   start: "08:00", end: "17:00", enabled: true  },
  { day: "Wednesday", start: "08:00", end: "13:00", enabled: true  },
  { day: "Thursday",  start: "08:00", end: "17:00", enabled: false },
  { day: "Friday",    start: "08:00", end: "17:00", enabled: false },
  { day: "Saturday",  start: "09:00", end: "13:00", enabled: false },
  { day: "Sunday",    start: "09:00", end: "13:00", enabled: false },
];