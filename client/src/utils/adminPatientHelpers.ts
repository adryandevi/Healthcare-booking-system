import { PATIENT_ACTIVITY_STYLES, ADMIN_PATIENT_AVATAR_COLORS } from "../constants/adminPatient.constants";
import type { PatientActivityStatus } from "../types/adminPatient.types";

export function getPatientActivityStyle(status: PatientActivityStatus) {
  return PATIENT_ACTIVITY_STYLES[status] ?? PATIENT_ACTIVITY_STYLES.inactive;
}

export function getPatientAvatarColor(initials: string): string {
  return ADMIN_PATIENT_AVATAR_COLORS[initials] ?? "bg-slate-100 text-slate-600";
}

export function getPatientStatusLabel(status: PatientActivityStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}