import { AVATAR_COLORS } from "../constants/patient.constants";

export function getAvatarColor(initials: string): string {
  return AVATAR_COLORS[initials] ?? "bg-slate-100 text-slate-600";
}