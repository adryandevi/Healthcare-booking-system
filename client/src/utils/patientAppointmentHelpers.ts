import { APPOINTMENT_STATUS_STYLES, DOCTOR_AVATAR_COLORS } from "../constants/patientAppointment.constants";
import type { AppointmentStatus } from "../types/patientAppointment.types";

export function getStatusConfig(status: AppointmentStatus) {
  return APPOINTMENT_STATUS_STYLES[status];
}

export function getDoctorAvatarColor(initials: string): string {
  return DOCTOR_AVATAR_COLORS[initials] ?? "bg-slate-100 text-slate-600";
}