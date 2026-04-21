import { useNavigate, Outlet } from "react-router-dom";
import { useAuth }             from "../../hooks/useAuth";
import Sidebar                 from "../../components/layout/Sidebar";

const NAV_ITEMS = [
  {
    to: "/doctor/schedule",
    label: "Today's Schedule",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    to: "/doctor/queue",
    label: "Appointment Queue",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: "/doctor/availability",
    label: "Manage Availability",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    to: "/doctor/patients",
    label: "My Patients",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function DoctorLayout() {
  const { logout, user } = useAuth();
  const navigate         = useNavigate();

  const handleLogout = () => { logout(); navigate("/auth"); };

  const DOCTOR_USER = {
    name:     user?.name ?? "Doctor",
    role:     "Doctor",
    initials: user?.name
      ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
      : "DR",
  };

  return (
    <div className="h-screen overflow-hidden flex bg-slate-50">
      <Sidebar navItems={NAV_ITEMS} user={DOCTOR_USER} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}