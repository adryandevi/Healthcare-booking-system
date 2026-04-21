import type { DashboardAppointment } from "../../types/dashboard.types";
import { getAppointmentStatusStyle } from "../../utils/dashboardHelpers";

export default function DashboardAppointmentCard({ iconBg, title, doctor, status }: DashboardAppointment) {
  const s           = getAppointmentStatusStyle(status);
  const isConfirmed = status === "Confirmed";

  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-4 border"
      style={{
        backgroundColor: isConfirmed ? "rgba(13,168,139,0.07)" : "white",
        borderColor:     isConfirmed ? "rgba(13,168,139,0.2)"  : "#f1f5f9",
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={s.dot} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-400 mt-0.5">{doctor}</p>
      </div>
      <span className="text-xs font-semibold flex items-center gap-1.5 flex-shrink-0" style={{ color: s.text }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
        {status}
      </span>
    </div>
  );
}