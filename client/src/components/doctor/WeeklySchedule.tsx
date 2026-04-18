import type { DaySchedule, DayOfWeek } from "../../types/availability.types";

interface Props {
  schedule:         DaySchedule[];
  saved:            boolean;
  onToggle:         (day: DayOfWeek) => void;
  onTimeChange:     (day: DayOfWeek, field: "start" | "end", value: string) => void;
  onSave:           () => void;
}

export default function WeeklySchedule({
  schedule, saved, onToggle, onTimeChange, onSave,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-base font-semibold text-slate-800 mb-5">
        Weekly schedule
      </h2>

      <div className="flex flex-col divide-y divide-slate-100">
        {schedule.map(({ day, start, end, enabled }) => (
          <div key={day} className="flex items-center gap-4 py-3.5">

            {/* Day label */}
            <span className={`w-24 text-sm font-medium shrink-0 ${
              enabled ? "text-slate-700" : "text-slate-400"
            }`}>
              {day}
            </span>

            {/* Time range */}
            <div className="flex items-center gap-2 flex-1">
              <input
                type="time"
                value={start}
                disabled={!enabled}
                onChange={(e) => onTimeChange(day, "start", e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700
                           disabled:opacity-40 disabled:bg-slate-50 disabled:cursor-not-allowed
                           focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                           transition-colors"
              />
              <span className="text-slate-400 text-sm">→</span>
              <input
                type="time"
                value={end}
                disabled={!enabled}
                onChange={(e) => onTimeChange(day, "end", e.target.value)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700
                           disabled:opacity-40 disabled:bg-slate-50 disabled:cursor-not-allowed
                           focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                           transition-colors"
              />
            </div>

            {/* Toggle checkbox */}
            <input
              type="checkbox"
              checked={enabled}
              onChange={() => onToggle(day)}
              className="w-5 h-5 rounded accent-teal-600 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Save */}
      <button
        onClick={onSave}
        className="mt-5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700
                   text-white text-sm font-semibold transition-colors"
      >
        {saved ? "Saved!" : "Save schedule"}
      </button>
    </div>
  );
}