// src/pages/admin/PatientsPage.tsx
import { useAdminPatients }        from "../../hooks/useAdminPatients";
import AdminPatientRow             from "../../components/admin/AdminPatientRow";
import { ADMIN_PATIENT_COLUMNS }   from "../../constants/adminPatient.constants";

export default function PatientsPage() {
  const { patients, search, setSearch, handleView } = useAdminPatients();

  return (
    <div className="p-8">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patients</h1>
          <p className="text-sm text-slate-400 mt-1">
            Full patient directory across the platform.
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patients…"
          className="w-60 rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                     placeholder:text-slate-400 focus:outline-none focus:border-teal-500
                     focus:ring-2 focus:ring-teal-100 transition-colors"
        />
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {ADMIN_PATIENT_COLUMNS.map((col) => (
                <th key={col} className="px-5 py-3.5 text-left text-xs font-semibold text-slate-400 tracking-wider uppercase">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <AdminPatientRow
                key={patient.id}
                patient={patient}
                onView={handleView}
              />
            ))}
          </tbody>
        </table>

        {patients.length === 0 && (
          <div className="py-16 text-center text-sm text-slate-400">
            No patients found{search ? ` for "${search}"` : ""}.
          </div>
        )}
      </div>

    </div>
  );
}