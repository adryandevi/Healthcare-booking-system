import { SLOT_STYLES, DOCTORS } from "../constants/booking.constants";
import type { SlotStatus, TimeSlot, DoctorOption } from "../types/booking.types";

export function getSlotStyle(status: SlotStatus) {
  return SLOT_STYLES[status];
}

export function isSlotClickable(status: SlotStatus): boolean {
  return status === "available" || status === "selected";
}

export function formatDisplayDate(date: string): string {
  if (!date) return "—";
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

export function applySelectedSlot(slots: TimeSlot[], selectedTime: string): TimeSlot[] {
  return slots.map((s) =>
    s.time === selectedTime ? { ...s, status: "selected" as SlotStatus } : s
  );
}

export function getDoctorsForSpecialty(specialty: string): DoctorOption[] {
  return DOCTORS[specialty] ?? [];
}

export function parseDoctorName(label: string): string {
  return label.split(" — ")[0] ?? "—";
}