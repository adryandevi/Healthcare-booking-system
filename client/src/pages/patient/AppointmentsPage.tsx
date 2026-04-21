// src/pages/patient/AppointmentsPage.tsx
import { usePatientAppointments }                                from "../../hooks/usePatientAppointments";
import AppointmentRow                                            from "../../components/patient/AppointmentRow";
import { APPOINTMENT_STATUS_FILTER, APPOINTMENT_TABLE_COLUMNS } from "../../constants/patientAppointment.constants";

export default function AppointmentsPage() {
  const {
    filtered,
    statusFilter,
    setStatusFilter,
    handleReschedule,
    handleCancel,
    handleViewNotes,
    handleRebook,
  } = usePatientAppointments();

  return (
    <div className="p-8">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            View and manage your full appointment history.
          </p>
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="text-sm text-slate-700 bg-white border border-slate-200 rounded-full
                     px-4 py-2 pr-8 appearance-none cursor-pointer focus:outline-none
                     focus:ring-2 focus:ring-teal-500 hover:border-slate-300 transition-colors"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
            backgroundRepeat:   "no-repeat",
            backgroundPosition: "right 12px center",
          }}
        >
          {APPOINTMENT_STATUS_FILTER.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {APPOINTMENT_TABLE_COLUMNS.map((col) => (
                <th key={col} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                  No appointments found for this status.
                </td>
              </tr>
            ) : (
              filtered.map((appt) => (
                <AppointmentRow
                  key={appt.id}
                  appointment={appt}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                  onViewNotes={handleViewNotes}
                  onRebook={handleRebook}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}