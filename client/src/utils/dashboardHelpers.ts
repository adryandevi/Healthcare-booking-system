import { APPOINTMENT_STATUS_STYLES, NOTIFICATION_BG, NOTIFICATION_DOT } from "../constants/dashboard.constants";
import type { AppointmentStatus, NotificationColor } from "../types/dashboard.types";

export function getAppointmentStatusStyle(status: AppointmentStatus) {
  return APPOINTMENT_STATUS_STYLES[status];
}

export function getNotificationBg(color: NotificationColor): string {
  return NOTIFICATION_BG[color];
}

export function getNotificationDot(color: NotificationColor): string {
  return NOTIFICATION_DOT[color];
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function formatTodayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}