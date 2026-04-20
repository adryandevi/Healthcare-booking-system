import type { StatusBreakdown } from "../../types/overview.types";
import { getStatusLabel }       from "../../utils/overviewHelpers";

interface Props { breakdown: StatusBreakdown[] }

export default function StatusBreakdownList({ breakdown }: Props) {
  const max = Math.max(...breakdown.map((b) => b.count));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h2 className="text-base font-semibold text-slate-800 mb-5">
        Appointment status breakdown
      </h2>

      <div className="flex flex-col gap-5">
        {breakdown.map(({ label, count, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-slate-600">{getStatusLabel(label)}</span>
              <span className="text-sm font-medium text-slate-800">{count}</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}