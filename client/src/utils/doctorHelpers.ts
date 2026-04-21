import { DOCTOR_STATUS_STYLES, DOCTOR_AVATAR_COLORS } from "../constants/doctor.constants";
import type { DoctorStatus } from "../types/doctor.types";

export function getDoctorStatusStyle(status: DoctorStatus) {
  return DOCTOR_STATUS_STYLES[status] ?? DOCTOR_STATUS_STYLES["inactive"];
}

export function getDoctorAvatarColor(initials: string): string {
  return DOCTOR_AVATAR_COLORS[initials] ?? "bg-slate-100 text-slate-600";
}

export function getDoctorStatusLabel(status: DoctorStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}