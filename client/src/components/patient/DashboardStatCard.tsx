import type { DashboardStat } from "../../types/dashboard.types";

export default function DashboardStatCard({ label, value, sub, subColor, showUpIcon }: DashboardStat) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      <p className="text-4xl font-bold text-slate-900 mb-2">{value}</p>
      <p className="text-sm flex items-center gap-1" style={{ color: subColor ?? "#94a3b8" }}>
        {showUpIcon && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        )}
        {sub}
      </p>
    </div>
  );
}