import type { DoctorWorkload } from "../../types/overview.types";
import { getAvatarColor }      from "../../utils/overviewHelpers";
import { getTotalAppts }       from "../../utils/overviewHelpers";

interface Props { workload: DoctorWorkload[] }

export default function DoctorWorkloadList({ workload }: Props) {
  const total = getTotalAppts(workload);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-slate-800">Active doctors</h2>
        <span className="text-sm text-slate-400">{workload.length} total</span>
      </div>

      <div className="flex flex-col gap-4">
        {workload.map((doc) => (
          <div key={doc.id}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${getAvatarColor(doc.initials)}`}>
                  {doc.initials}
                </div>
                <span className="text-sm font-medium text-slate-700">{doc.name}</span>
              </div>
              <span className="text-xs text-slate-400">{doc.appts} appts</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${doc.color}`}
                style={{ width: `${(doc.appts / doc.maxAppts) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}