// src/pages/doctor/QueuePage.tsx
import { useQueue }  from "../../hooks/useQueue";
import QueueRow      from "../../components/doctor/QueueRow";

const COLUMNS = ["Patient", "Type", "Requested Time", "Status", "Actions"];

export default function QueuePage() {
  const { entries, pending, confirmed, rejected, handleConfirm, handleReject } = useQueue();

  return (
    <div className="p-8">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Appointment Queue
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review and approve pending appointment requests.
        </p>
      </div>

      {/* ── Stats strip ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 mb-6">
        {[
          { label: "Pending",   value: pending,   color: "text-amber-500" },
          { label: "Confirmed", value: confirmed, color: "text-teal-600"  },
          { label: "Rejected",  value: rejected,  color: "text-red-500"   },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`text-lg font-bold ${color}`}>{value}</span>
            <span className="text-sm text-slate-400">{label}</span>
          </div>
        ))}
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {COLUMNS.map((col) => (
                <th key={col} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 tracking-wider uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <QueueRow
                key={entry.id}
                entry={entry}
                onConfirm={handleConfirm}
                onReject={handleReject}
              />
            ))}
          </tbody>
        </table>

        {entries.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-400">
            No appointments in the queue.
          </div>
        )}
      </div>

    </div>
  );
}