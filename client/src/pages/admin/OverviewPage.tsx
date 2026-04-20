// src/pages/admin/OverviewPage.tsx
import { useOverview }              from "../../hooks/useOverview";
import StatCardItem                 from "../../components/admin/StatCard";
import DoctorWorkloadList           from "../../components/admin/DoctorWorkloadList";
import StatusBreakdownList          from "../../components/admin/StatusBreakdownList";
import RecentAppointmentsTable      from "../../components/admin/RecentAppointmentsTable";

export default function OverviewPage() {
  const {
    period, setPeriod,
    search, setSearch,
    statCards,
    doctorWorkload,
    statusBreakdown,
    appointments,
    periodOptions,
    handleConfirm,
    handleCancel,
    handleRebook,
    handleExport,
  } = useOverview();

  return (
    <div className="p-8 flex flex-col gap-6">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Overview</h1>
          <p className="text-sm text-slate-400 mt-1">Platform metrics · April 2026</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-700
                       focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100
                       bg-white transition-colors"
          >
            {periodOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold
                       text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCardItem key={card.label} {...card} />
        ))}
      </div>

      {/* ── Doctor workload + Status breakdown ──────────────────────────── */}
      <div className="grid grid-cols-[1fr_400px] gap-6">
        <DoctorWorkloadList workload={doctorWorkload} />
        <StatusBreakdownList breakdown={statusBreakdown} />
      </div>

      {/* ── Recent appointments ─────────────────────────────────────────── */}
      <RecentAppointmentsTable
        appointments={appointments}
        search={search}
        onSearch={setSearch}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onRebook={handleRebook}
      />

    </div>
  );
}