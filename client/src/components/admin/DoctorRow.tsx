import type { Doctor }                                    from "../../types/doctor.types";
import { getDoctorStatusStyle, getDoctorAvatarColor,
         getDoctorStatusLabel }                           from "../../utils/doctorHelpers";

interface Props {
  doctor:         Doctor;
  onEdit:         (id: string) => void;
  onDeactivate:   (id: string) => void;
}

export default function DoctorRow({ doctor: d, onEdit, onDeactivate }: Props) {
  const statusStyle = getDoctorStatusStyle(d.status);
  const avatar      = getDoctorAvatarColor(d.initials);

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">

      {/* Doctor */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatar}`}>
            {d.initials}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">{d.name}</p>
            <p className="text-xs text-slate-400">{d.email}</p>
          </div>
        </div>
      </td>

      {/* Specialty */}
      <td className="px-5 py-4 text-sm text-slate-600">{d.specialty}</td>

      {/* Status */}
      <td className="px-5 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
          {getDoctorStatusLabel(d.status)}
        </span>
      </td>

      {/* Total appointments */}
      <td className="px-5 py-4 text-sm text-slate-600">{d.totalAppts}</td>

      {/* Acceptance rate */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${d.barColor}`}
              style={{ width: `${d.acceptanceRate}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 w-8 shrink-0">{d.acceptanceRate}%</span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(d.id)}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Edit
          </button>
          {d.status !== "inactive" && (
            <button
              onClick={() => onDeactivate(d.id)}
              className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
            >
              Deactivate
            </button>
          )}
        </div>
      </td>

    </tr>
  );
}