import type { DashboardDoctor } from "../../types/dashboard.types";

interface Props extends DashboardDoctor { border?: boolean; }

export default function DashboardDoctorRow({ initials, name, specialty, border }: Props) {
  return (
    <div className="flex items-center gap-3 py-3" style={{ borderTop: border ? "1px solid #f1f5f9" : undefined }}>
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: "#0da88b" }}>
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-400">{specialty}</p>
      </div>
    </div>
  );
}