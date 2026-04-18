import type { ScheduleEntry } from "../../types/schedule.types";

interface Props {
  entry:      ScheduleEntry;
  onConfirm:  (id: string) => void;
  onReject:   (id: string) => void;
  onNotes:    (id: string) => void;
}

// Maps each status to its left-border + background color
const BAR_STYLE: Record<string, string> = {
  confirmed: "border-green-400  bg-green-50",
  pending:   "border-amber-400  bg-amber-50",
  blocked:   "border-red-300    bg-red-50",
  completed: "border-slate-300  bg-slate-50",
};

const STATUS_LABEL: Record<string, string> = {
  confirmed: "Confirmed",
  pending:   "Pending approval",
  blocked:   "Blocked",
  completed: "Completed",
};

export default function ScheduleRow({ entry, onConfirm, onReject, onNotes }: Props) {
  const { id, time, patient, type, status, duration } = entry;
  const barClass = BAR_STYLE[status] ?? BAR_STYLE.confirmed;

  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-slate-100 last:border-none">

      {/* Time */}
      <span className="text-sm font-medium text-slate-400 w-16 flex-shrink-0">
        {time}
      </span>

      {/* Colored bar */}
      <div className={`flex-1 px-4 py-3 rounded-xl border-l-4 ${barClass}`}>
        <p className="text-sm font-semibold text-slate-800">
          {patient}{type ? ` — ${type}` : ""}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {STATUS_LABEL[status]} · {duration} min
        </p>
      </div>

      {/* Actions — depend on status */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {status === "confirmed" || status === "completed" ? (
          <button
            onClick={() => onNotes(id)}
            className="text-sm px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Notes
          </button>
        ) : status === "pending" ? (
          <>
            <button
              onClick={() => onConfirm(id)}
              className="text-sm px-4 py-1.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={() => onReject(id)}
              className="text-sm px-4 py-1.5 rounded-xl border border-slate-200 text-red-500 hover:bg-red-50 transition-colors"
            >
              Reject
            </button>
          </>
        ) : null}
      </div>

    </div>
  );
}