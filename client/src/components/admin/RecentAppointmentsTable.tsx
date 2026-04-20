import type { RecentAppointment, AppointmentStatus } from "../../types/overview.types";
import { getAvatarColor, getStatusStyle, getStatusLabel } from "../../utils/overviewHelpers";
import { OVERVIEW_COLUMNS } from "../../constants/overview.constants";

interface Props {
  appointments: RecentAppointment[];
  search:       string;
  onSearch:     (v: string) => void;
  onConfirm:    (id: string) => void;
  onCancel:     (id: string) => void;
  onRebook:     (id: string) => void;
}

function Actions({ id, status, onConfirm, onCancel, onRebook }: {
  id: string; status: AppointmentStatus;
  onConfirm: (id: string) => void;
  onCancel:  (id: string) => void;
  onRebook:  (id: string) => void;
}) {
  if (status === "pending") return (
    <button
      onClick={() => onConfirm(id)}
      className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors"
    >
      Force confirm
    </button>
  );

  if (status === "cancelled") return (
    <button
      onClick={() => onRebook(id)}
      className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
    >
      Rebook
    </button>
  );

  return (
    <div className="flex items-center gap-3">
      <button className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
        View
      </button>
      <button
        onClick={() => onCancel(id)}
        className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
      >
        Cancel
      </button>
    </div>
  );
}

export default function RecentAppointmentsTable({
  appointments, search, onSearch, onConfirm, onCancel, onRebook,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      {/* Table header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-base font-semibold text-slate-800">Recent appointments</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search patient, doctor…"
          className="w-56 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                     placeholder:text-slate-400 focus:outline-none focus:border-teal-500
                     focus:ring-2 focus:ring-teal-100 transition-colors"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            {OVERVIEW_COLUMNS.map((col) => (
              <th key={col} className="px-5 py-3 text-left text-xs font-semibold text-slate-400 tracking-wider uppercase">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => {
            const style = getStatusStyle(appt.status);
            return (
              <tr key={appt.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">

                {/* Patient */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${getAvatarColor(appt.initials)}`}>
                      {appt.initials}
                    </div>
                    <span className="text-sm font-medium text-slate-800">{appt.patient}</span>
                  </div>
                </td>

                {/* Doctor */}
                <td className="px-5 py-4 text-sm text-slate-600">{appt.doctor}</td>

                {/* Date & time */}
                <td className="px-5 py-4">
                  <p className="text-sm text-slate-800">{appt.date}</p>
                  <p className="text-xs text-slate-400">{appt.time}</p>
                </td>

                {/* Type */}
                <td className="px-5 py-4 text-sm text-slate-600">{appt.type}</td>

                {/* Status */}
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                    {getStatusLabel(appt.status)}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <Actions
                    id={appt.id}
                    status={appt.status}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    onRebook={onRebook}
                  />
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {appointments.length === 0 && (
        <div className="py-16 text-center text-sm text-slate-400">
          No appointments found{search ? ` for "${search}"` : ""}.
        </div>
      )}
    </div>
  );
}