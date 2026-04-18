import { useNavigate } from "react-router-dom";

// ── Types ──────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  sub: string;
  subColor?: string;
  subIcon?: React.ReactNode;
}

interface AppointmentCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  doctor: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface HistoryRowProps {
  label: string;
  date: string;
  border?: boolean;
}

interface NotificationItemProps {
  color: "blue" | "green" | "yellow";
  message: string;
  time: string;
}

interface DoctorRowProps {
  initials: string;
  name: string;
  specialty: string;
  border?: boolean;
}

// ── Sub-components ─────────────────────────────────────

function StatCard({ label, value, sub, subColor, subIcon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <p className="text-sm text-slate-500 mb-2">{label}</p>
      <p className="text-4xl font-bold text-slate-900 mb-2">{value}</p>
      <p className="text-sm flex items-center gap-1" style={{ color: subColor ?? "#94a3b8" }}>
        {subIcon}
        {sub}
      </p>
    </div>
  );
}

const STATUS_STYLES = {
  Confirmed: { text: "#0da88b", dot: "#0da88b" },
  Pending:   { text: "#d97706", dot: "#d97706" },
  Cancelled: { text: "#ef4444", dot: "#ef4444" },
};

function AppointmentCard({ icon, iconBg, title, doctor, status }: AppointmentCardProps) {
  const s = STATUS_STYLES[status];
  const isConfirmed = status === "Confirmed";
  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-4 border"
      style={{
        backgroundColor: isConfirmed ? "rgba(13,168,139,0.07)" : "white",
        borderColor:     isConfirmed ? "rgba(13,168,139,0.2)"  : "#f1f5f9",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
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

function HistoryRow({ label, date, border }: HistoryRowProps) {
  return (
    <div
      className="flex items-center justify-between py-3.5"
      style={{ borderTop: border ? "1px solid #f1f5f9" : undefined }}
    >
      <span className="text-sm text-slate-700">{label}</span>
      <span className="text-sm text-slate-400">{date}</span>
    </div>
  );
}

const NOTIF_BG  = { blue: "rgba(59,130,246,0.08)",  green: "rgba(13,168,139,0.08)",  yellow: "rgba(234,179,8,0.08)"  };
const NOTIF_DOT = { blue: "#3b82f6",                green: "#0da88b",                yellow: "#ca8a04"               };

function NotificationItem({ color, message, time }: NotificationItemProps) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ backgroundColor: NOTIF_BG[color] }}>
      <p className="text-sm text-slate-700 flex items-start gap-2">
        <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: NOTIF_DOT[color] }} />
        {message}
      </p>
      <p className="text-xs text-slate-400 mt-1 ml-4">{time}</p>
    </div>
  );
}

function DoctorRow({ initials, name, specialty, border }: DoctorRowProps) {
  return (
    <div
      className="flex items-center gap-3 py-3"
      style={{ borderTop: border ? "1px solid #f1f5f9" : undefined }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
        style={{ backgroundColor: "#0da88b" }}
      >
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-400">{specialty}</p>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="p-8" style={{ backgroundColor: "#f5f4f0" }}>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Good morning, Maria 👋</h1>
          <p className="text-sm text-slate-400 mt-1">{today}</p>
        </div>
        <button
          onClick={() => navigate("/patient/book")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#0da88b" }}
        >
          + Book appointment
        </button>
      </div>

      {/* Body */}
      <div className="flex gap-6">

        {/* Left column */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            <StatCard
              label="Upcoming appointments"
              value={2}
              sub="Next: April 20"
            />
            <StatCard
              label="Total visits this year"
              value={7}
              subColor="#0da88b"
              sub="2 more than last year"
              subIcon={
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/>
                  <polyline points="5 12 12 5 19 12"/>
                </svg>
              }
            />
            <StatCard
              label="Pending lab results"
              value={1}
              sub="Blood panel — Apr 14"
              subColor="#d97706"
            />
          </div>

          {/* Upcoming appointments */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-slate-900">Upcoming appointments</h2>
              <button
                onClick={() => navigate("/patient/appointments")}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ color: "#0da88b" }}
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              <AppointmentCard
                iconBg="#0d3d30"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0da88b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                }
                title="General Checkup"
                doctor="Dr. Reyes · April 20 · 9:00 AM"
                status="Confirmed"
              />
              <AppointmentCard
                iconBg="#fef3c7"
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                }
                title="Lab Results Review"
                doctor="Dr. Lim · April 25 · 2:30 PM"
                status="Pending"
              />
            </div>
          </div>

          {/* Recent history */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-1">Recent history</h2>
            <HistoryRow label="Blood panel checkup"    date="Apr 14" />
            <HistoryRow label="Follow-up consultation" date="Mar 28" border />
            <HistoryRow label="Flu vaccination"        date="Mar 5"  border />
          </div>

        </div>

        {/* Right column */}
        <div className="w-72 flex-shrink-0 space-y-6">

          {/* Notifications */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Notifications</h2>
            <div className="space-y-3">
              <NotificationItem color="blue"   message="Lab results from Apr 14 are available." time="2 hours ago" />
              <NotificationItem color="green"  message="Appointment with Dr. Reyes confirmed."  time="Yesterday"  />
              <NotificationItem color="yellow" message="Reminder: appointment in 3 days."       time="Apr 15"     />
            </div>
          </div>

          {/* Your doctors */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-1">Your doctors</h2>
            <DoctorRow initials="DR" name="Dr. Reyes" specialty="General Practice"  />
            <DoctorRow initials="DL" name="Dr. Lim"   specialty="Internal Medicine" border />
          </div>

        </div>
      </div>
    </div>
  );
}