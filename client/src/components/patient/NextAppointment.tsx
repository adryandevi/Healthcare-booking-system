// Replace static values with real data from useAppointments() later
export default function NextAppointment() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Next appointment</h3>

      <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">General Checkup</p>
            <p className="text-xs text-slate-500 mt-0.5">Dr. Reyes · General Practice</p>
          </div>
          <span className="text-xs font-medium bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full flex-shrink-0">
            Confirmed
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8"  y1="2" x2="8"  y2="6" />
              <line x1="3"  y1="10" x2="21" y2="10" />
            </svg>
            April 20, 2026
          </div>

          {/* Time */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg className="w-3.5 h-3.5 text-teal-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            9:00 AM
          </div>
        </div>
      </div>

      <button className="mt-3 w-full text-xs font-medium text-slate-400 hover:text-teal-600 transition-colors text-center">
        View all appointments →
      </button>
    </div>
  );
}