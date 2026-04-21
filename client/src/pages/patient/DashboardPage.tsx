// src/pages/patient/DashboardPage.tsx
import { useDashboard }                  from "../../hooks/useDashboard";
import DashboardStatCard                 from "../../components/patient/DashboardStatCard";
import DashboardAppointmentCard          from "../../components/patient/DashboardAppointmentCard";
import DashboardNotificationItem         from "../../components/patient/DashboardNotificationItem";
import DashboardDoctorRow                from "../../components/patient/DashboardDoctorRow";

export default function DashboardPage() {
  const {
    greeting, today,
    stats, appointments, history,
    notifications, doctors,
    goToBook, goToAllAppts,
  } = useDashboard();

  return (
    <div className="p-8" style={{ backgroundColor: "#f5f4f0" }}>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{greeting}</h1>
          <p className="text-sm text-slate-400 mt-1">{today}</p>
        </div>
        <button
          onClick={goToBook}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#0da88b" }}
        >
          + Book appointment
        </button>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="flex gap-6">

        {/* Left column */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <DashboardStatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Upcoming appointments */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-slate-900">Upcoming appointments</h2>
              <button
                onClick={goToAllAppts}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: "#0da88b" }}
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {appointments.map((appt) => (
                <DashboardAppointmentCard key={appt.id} {...appt} />
              ))}
            </div>
          </div>

          {/* Recent history */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-1">Recent history</h2>
            {history.map((entry, i) => (
              <div
                key={entry.id}
                className="flex items-center justify-between py-3.5"
                style={{ borderTop: i > 0 ? "1px solid #f1f5f9" : undefined }}
              >
                <span className="text-sm text-slate-700">{entry.label}</span>
                <span className="text-sm text-slate-400">{entry.date}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right column */}
        <div className="w-72 flex-shrink-0 space-y-6">

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Notifications</h2>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <DashboardNotificationItem key={notif.id} {...notif} />
              ))}
            </div>
          </div>

          {/* Your doctors */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-1">Your doctors</h2>
            {doctors.map((doc, i) => (
              <DashboardDoctorRow key={doc.id} {...doc} border={i > 0} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}