import type { Appointment }                    from "../../types/appointment.types";
import { getStatusStyle, getStatusLabel }      from "../../utils/appointmentHelpers";

interface Props {
  appointment: Appointment;
  onEdit:      (id: string) => void;
}

export default function AppointmentRow({ appointment: a, onEdit }: Props) {
  const style = getStatusStyle(a.status);

  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">

      {/* ID */}
      <td className="px-5 py-4 text-sm font-medium text-teal-600">{a.aptId}</td>

      {/* Patient */}
      <td className="px-5 py-4 text-sm text-slate-800 font-medium">{a.patient}</td>

      {/* Doctor */}
      <td className="px-5 py-4 text-sm text-slate-600">{a.doctor}</td>

      {/* Date */}
      <td className="px-5 py-4 text-sm text-slate-600">{a.date}</td>

      {/* Type */}
      <td className="px-5 py-4 text-sm text-slate-600">{a.type}</td>

      {/* Status */}
      <td className="px-5 py-4">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {getStatusLabel(a.status)}
        </span>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <button
          onClick={() => onEdit(a.id)}
          className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          Edit
        </button>
      </td>

    </tr>
  );
}