import type { PatientAppointment }  from "../../types/patientAppointment.types";
import { getDoctorAvatarColor }     from "../../utils/patientAppointmentHelpers";
import StatusBadge                  from "./StatusBadge";
import AppointmentActions           from "./AppointmentActions";

interface Props {
  appointment:   PatientAppointment;
  onReschedule:  (id: string) => void;
  onCancel:      (id: string) => void;
  onViewNotes:   (id: string) => void;
  onRebook:      (id: string) => void;
}

export default function AppointmentRow({
  appointment: a, onReschedule, onCancel, onViewNotes, onRebook,
}: Props) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50 transition-colors">

      {/* Doctor */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${getDoctorAvatarColor(a.doctor.initials)}`}>
            {a.doctor.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{a.doctor.name}</p>
            <p className="text-xs text-slate-400 mt-0.5">{a.doctor.specialty}</p>
          </div>
        </div>
      </td>

      {/* Date & Time */}
      <td className="px-5 py-4">
        <p className="text-sm font-medium text-slate-800">{a.date}</p>
        <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
      </td>

      {/* Type */}
      <td className="px-5 py-4 text-sm text-slate-700">{a.type}</td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge status={a.status} />
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <AppointmentActions
          status={a.status}
          onReschedule={() => onReschedule(a.id)}
          onCancel={()      => onCancel(a.id)}
          onViewNotes={() => onViewNotes(a.id)}
          onRebook={() =>    onRebook(a.id)}
        />
      </td>

    </tr>
  );
}