import type { Patient, PatientSummary  }       from "../../types/patient.types";
import { getAvatarColor }     from "../../utils/patientHelpers";

interface Props {
  patient:  PatientSummary;
  onView:   (id: string) => void;
}

export default function PatientRow({ patient, onView }: Props) {
  const avatar = getAvatarColor(patient.initials);

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">

      {/* Patient */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatar}`}>
            {patient.initials}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">{patient.name}</p>
            <p className="text-xs text-slate-400">{patient.email}</p>
          </div>
        </div>
      </td>

      {/* Last visit */}
      <td className="px-5 py-4 text-sm text-slate-600">{patient.lastVisit}</td>

      {/* Total visits */}
      <td className="px-5 py-4 text-sm text-slate-600">{patient.totalVisits}</td>

      {/* Condition */}
      <td className="px-5 py-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
          {patient.condition}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <button
          onClick={() => onView(patient.id)}
          className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
        >
          View profile
        </button>
      </td>

    </tr>
  );
}