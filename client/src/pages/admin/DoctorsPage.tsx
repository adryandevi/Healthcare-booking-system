// src/pages/admin/DoctorsPage.tsx
import { useDoctors }       from "../../hooks/useDoctors";
import DoctorRow            from "../../components/admin/DoctorRow";
import { DOCTOR_COLUMNS }   from "../../constants/doctor.constants";

export default function DoctorsPage() {
  const {
    doctors,
    search,
    setSearch,
    handleEdit,
    handleDeactivate,
    handleAddDoctor,
  } = useDoctors();

  return (
    <div className="p-8">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Doctors</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage doctors and view acceptance rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty…"
            className="w-60 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                       placeholder:text-slate-400 focus:outline-none focus:border-teal-500
                       focus:ring-2 focus:ring-teal-100 transition-colors"
          />
          <button
            onClick={handleAddDoctor}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white
                       text-sm font-semibold transition-colors"
          >
            + Add doctor
          </button>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {DOCTOR_COLUMNS.map((col) => (
                <th key={col} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 tracking-wider uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <DoctorRow
                key={doctor.id}
                doctor={doctor}
                onEdit={handleEdit}
                onDeactivate={handleDeactivate}
              />
            ))}
          </tbody>
        </table>

        {doctors.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-400">
            No doctors found{search ? ` for "${search}"` : ""}.
          </div>
        )}
      </div>

    </div>
  );
}