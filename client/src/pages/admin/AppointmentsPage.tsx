import { useAdminAppointments }   from "../../hooks/useAdminAppointments";
import AppointmentRow             from "../../components/admin/AppointmentRow";
import { APPOINTMENT_COLUMNS, STATUS_OPTIONS, DOCTOR_OPTIONS } from "../../constants/appointment.constants";

export default function AppointmentsPage() {
  const {
    search,  setSearch,
    status,  setStatus,
    doctor,  setDoctor,
    date,    setDate,
    appointments,
    handleEdit,
  } = useAdminAppointments();

  return (
    <div className="p-8">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          All Appointments
        </h1>
        <p className="text-sm text-slate-400 mt-1">Full system appointment log</p>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="w-52 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                     placeholder:text-slate-400 focus:outline-none focus:border-teal-500
                     focus:ring-2 focus:ring-teal-100 transition-colors"
        />

        {/* Status filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                     focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                     bg-white transition-colors"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Doctor filter */}
        <select
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                     focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                     bg-white transition-colors"
        >
          {DOCTOR_OPTIONS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Date filter */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                     focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                     transition-colors"
        />
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {APPOINTMENT_COLUMNS.map((col) => (
                <th key={col} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 tracking-wider uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <AppointmentRow
                key={appt.id}
                appointment={appt}
                onEdit={handleEdit}
              />
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-400">
            No appointments found matching your filters.
          </div>
        )}
      </div>

    </div>
  );
}