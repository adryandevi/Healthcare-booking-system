import { APPT_STATUS_STYLES }   from "../constants/appointment.constants";
import type { AppointmentStatus } from "../types/appointment.types";

export function getStatusStyle(status: AppointmentStatus) {
  return APPT_STATUS_STYLES[status] ?? APPT_STATUS_STYLES.completed;
}

export function getStatusLabel(status: AppointmentStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}