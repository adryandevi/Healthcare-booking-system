// src/components/patient/ActivitySummary.tsx

// Replace static values with real data from useAppointments() later

const STATS: { label: string; value: string; color: string }[] = [
  { label: "Total visits",  value: "7",        color: "text-teal-600"  },
  { label: "Upcoming",      value: "2",        color: "text-blue-600"  },
  { label: "Cancelled",     value: "1",        color: "text-red-500"   },
  { label: "Member since",  value: "Jan 2025", color: "text-slate-700" },
];

export default function ActivitySummary() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Activity summary</h3>
      <div className="grid grid-cols-2 gap-3">
        {STATS.map(({ label, value, color }) => (
          <div key={label} className="bg-slate-50 rounded-xl px-3 py-3 flex flex-col gap-0.5">
            <span className={`text-xl font-bold leading-tight ${color}`}>{value}</span>
            <span className="text-xs text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}