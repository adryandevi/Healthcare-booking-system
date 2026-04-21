import type { AdminPatient }  from "../../types/adminPatient.types";
import {
  getPatientActivityStyle,
  getPatientAvatarColor,
  getPatientStatusLabel,
} from "../../utils/adminPatientHelpers";

interface Props {
  patient: AdminPatient;
  onView:  (id: string) => void;
}

export default function AdminPatientRow({ patient: p, onView }: Props) {
  const style  = getPatientActivityStyle(p.status);
  const avatar = getPatientAvatarColor(p.initials);

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">

      {/* Patient */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatar}`}>
            {p.initials}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">{p.name}</p>
            <p className="text-xs text-slate-400">{p.email}</p>
          </div>
        </div>
      </td>

      {/* Registered */}
      <td className="px-5 py-4 text-sm text-slate-600">{p.registered}</td>

      {/* Total visits */}
      <td className="px-5 py-4 text-sm text-slate-600">{p.totalVisits}</td>

      {/* Last appointment */}
      <td className="px-5 py-4 text-sm text-slate-600">{p.lastAppointment}</td>

      {/* Status */}
      <td className="px-5 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {getPatientStatusLabel(p.status)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <button
          onClick={() => onView(p.id)}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          View
        </button>
      </td>

    </tr>
  );
}