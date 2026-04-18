export const AVATAR_COLORS: Record<string, string> = {
  MS: "bg-teal-100 text-teal-700",
  JC: "bg-emerald-100 text-emerald-700",
  PR: "bg-sky-100 text-sky-700",
  AC: "bg-violet-100 text-violet-700",
} as const;

export const TABLE_COLUMNS = [
  "Patient",
  "Last Visit",
  "Total Visits",
  "Condition",
  "Actions",
] as const;