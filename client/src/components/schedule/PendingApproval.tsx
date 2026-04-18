// src/components/schedule/PendingApproval.tsx

import type { ScheduleEntry } from "../../types/schedule.types";

interface Props {
  entries:   ScheduleEntry[];
  onConfirm: (id: string) => void;
  onReject:  (id: string) => void;
}

export default function PendingApproval({ entries, onConfirm, onReject }: Props) {
  // Filter down to only pending entries — no logic needed in the page
  const pending = entries.filter((e) => e.status === "pending");

  if (pending.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-3">Pending approval</h3>
        <p className="text-xs text-slate-400">No pending appointments.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Pending approval</h3>
      <div className="flex flex-col gap-3">
        {pending.map((entry) => (
          <div
            key={entry.id}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4"
          >
            <p className="text-sm font-semibold text-slate-800">{entry.patient}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {entry.type} · {entry.time}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onConfirm(entry.id)}
                className="flex-1 py-2 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => onReject(entry.id)}
                className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors px-2"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}