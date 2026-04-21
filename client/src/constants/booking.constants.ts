import type { TimeSlot, SlotStatus, DoctorOption } from "../types/booking.types";

export const SPECIALTIES = [
  "General Practice",
  "Internal Medicine",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
] as const;

export const DOCTORS: Record<string, DoctorOption[]> = {
  "General Practice": [
    { label: "Dr. Reyes — General Practice",  initials: "DR" },
    { label: "Dr. Santos — General Practice", initials: "DS" },
  ],
  "Internal Medicine": [{ label: "Dr. Lim — Internal Medicine",  initials: "DL" }],
  "Pediatrics":        [{ label: "Dr. Cruz — Pediatrics",        initials: "DC" }],
  "Dermatology":       [{ label: "Dr. Garcia — Dermatology",     initials: "DG" }],
  "Orthopedics":       [{ label: "Dr. Torres — Orthopedics",     initials: "DT" }],
} as const;

export const VISIT_TYPES = [
  "General checkup",
  "Follow-up",
  "Lab results review",
  "Vaccination",
  "Consultation",
] as const;

export const BASE_SLOTS: TimeSlot[] = [
  { time: "8:00 AM",  status: "taken"     },
  { time: "9:00 AM",  status: "taken"     },
  { time: "10:00 AM", status: "available" },
  { time: "11:00 AM", status: "available" },
  { time: "12:00 PM", status: "blocked"   },
  { time: "1:00 PM",  status: "available" },
  { time: "2:00 PM",  status: "taken"     },
  { time: "3:00 PM",  status: "available" },
  { time: "4:00 PM",  status: "available" },
  { time: "5:00 PM",  status: "blocked"   },
];

export const SLOT_STYLES: Record<SlotStatus, { bg: string; border: string; color: string }> = {
  available: { bg: "rgba(13,168,139,0.10)", border: "rgba(13,168,139,0.30)", color: "#0d7a63"  },
  taken:     { bg: "#f8fafc",               border: "#e2e8f0",               color: "#94a3b8"  },
  selected:  { bg: "#0da88b",               border: "#0da88b",               color: "#ffffff"  },
  blocked:   { bg: "rgba(244,63,94,0.10)",  border: "rgba(244,63,94,0.30)",  color: "#f43f5e" },
} as const;

export const SLOT_LEGEND: { status: SlotStatus; label: string }[] = [
  { status: "available", label: "Available" },
  { status: "taken",     label: "Taken"     },
  { status: "selected",  label: "Selected"  },
  { status: "blocked",   label: "Blocked"   },
] as const;

export const FIELD_CLASS =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 " +
  "outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 appearance-none";