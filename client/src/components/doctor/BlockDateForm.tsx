// src/components/doctor/BlockDateForm.tsx
import { useState }        from "react";
import type { BlockedDate } from "../../types/availability.types";
import { BLOCK_REASONS }   from "../../utils/availabilityHelpers";

interface Props {
  onBlock: (entry: Omit<BlockedDate, "id">) => void;
}

export default function BlockDateForm({ onBlock }: Props) {
  const [date,      setDate]      = useState("");
  const [reason,    setReason]    = useState(BLOCK_REASONS[0]);
  const [timeStart, setTimeStart] = useState("12:00");
  const [timeEnd,   setTimeEnd]   = useState("13:00");
  const [error,     setError]     = useState("");

  const handleSubmit = () => {
    if (!date) { setError("Please select a date."); return; }
    setError("");
    onBlock({ date, reason, timeStart, timeEnd });
    setDate("");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-base font-semibold text-slate-800 mb-5">
        Block specific dates
      </h2>

      <div className="flex flex-col gap-4">

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700
                       focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                       transition-colors"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Reason
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700
                       focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                       transition-colors bg-white"
          >
            {BLOCK_REASONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Time range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Time range (optional)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700
                         focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                         transition-colors"
            />
            <span className="text-slate-400 text-sm">→</span>
            <input
              type="time"
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700
                         focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                         transition-colors"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-600
                     text-white text-sm font-semibold transition-colors"
        >
          Block this time
        </button>
      </div>
    </div>
  );
}