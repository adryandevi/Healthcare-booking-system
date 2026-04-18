import type { QueueStatus } from "../types/queue.types";

export const STATUS_STYLES: Record<QueueStatus, { dot: string; text: string; bg: string }> = {
  pending:   { dot: "bg-amber-400",  text: "text-amber-700",  bg: "bg-amber-50"  },
  confirmed: { dot: "bg-teal-500",   text: "text-teal-700",   bg: "bg-teal-50"   },
  rejected:  { dot: "bg-red-400",    text: "text-red-700",    bg: "bg-red-50"    },
};

export const AVATAR_COLORS: Record<string, string> = {
  AC: "bg-teal-100 text-teal-700",
  LM: "bg-sky-100 text-sky-700",
  JC: "bg-emerald-100 text-emerald-700",
};

export function getAvatarColor(initials: string): string {
  return AVATAR_COLORS[initials] ?? "bg-slate-100 text-slate-600";
}