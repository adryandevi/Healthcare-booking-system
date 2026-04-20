import { AVATAR_COLORS, APPT_STATUS_STYLES } from "../constants/overview.constants";
import type { AppointmentStatus }            from "../types/overview.types";

export function getAvatarColor(initials: string): string {
  return AVATAR_COLORS[initials] ?? "bg-slate-100 text-slate-600";
}

export function getStatusStyle(status: AppointmentStatus) {
  return APPT_STATUS_STYLES[status] ?? APPT_STATUS_STYLES.completed;
}

export function getStatusLabel(status: AppointmentStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function getTotalAppts(workload: { appts: number }[]): number {
  return workload.reduce((sum, d) => sum + d.appts, 0);
}