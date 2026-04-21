import { useNavigate, Outlet } from "react-router-dom";
import { useAuth }             from "../../hooks/useAuth";
import Sidebar                 from "../../components/layout/Sidebar";

const NAV_ITEMS = [
  {
    to: "/patient/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    to: "/patient/book",
    label: "Book Appointment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        <line x1="12" y1="14" x2="12" y2="18" /><line x1="10" y1="16" x2="14" y2="16" />
      </svg>
    ),
  },
  {
    to: "/patient/appointments",
    label: "My Appointments",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    to: "/patient/profile",
    label: "My Profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function PatientLayout() {
  const { logout, user } = useAuth();
  const navigate         = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const PATIENT_USER = {
    name:     user?.name     ?? "Patient",
    role:     "Patient",
    initials: user?.name
      ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
      : "P",
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar navItems={NAV_ITEMS} user={PATIENT_USER} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto h-full">
        <Outlet />
      </main>
    </div>
  );
}