import type { ScheduleEntry } from "../../types/schedule.types";

interface Props {
  entries: ScheduleEntry[];
}

export default function ScheduleStats({ entries }: Props) {
  // Derive counts directly from the entries — no separate state needed
  const total     = entries.length;
  const confirmed = entries.filter((e) => e.status === "confirmed").length;
  const pending   = entries.filter((e) => e.status === "pending").length;
  const completed = entries.filter((e) => e.status === "completed").length;

  const stats = [
    { label: "Total today", value: total,     color: "text-slate-800" },
    { label: "Confirmed",   value: confirmed,  color: "text-green-600" },
    { label: "Pending",     value: pending,    color: "text-amber-500" },
    { label: "Completed",   value: completed,  color: "text-slate-400" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-5">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="bg-white border border-slate-200 rounded-2xl px-5 py-4"
        >
          <p className="text-sm text-slate-400 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}