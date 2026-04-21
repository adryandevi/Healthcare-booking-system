// src/components/layout/Sidebar.tsx
import { NavLink } from "react-router-dom";

interface NavItem {
  to:    string;
  label: string;
  icon:  React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  user: {
    name:     string;
    role:     string;
    initials: string;
  };
  onLogout: () => void;
}

export default function Sidebar({ navItems, user, onLogout }: SidebarProps) {
  return (
    <aside
      className="w-60 flex-shrink-0 flex flex-col h-screen"
      style={{ backgroundColor: "#0d1f2d" }}
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#0da88b" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-white text-lg font-semibold tracking-tight">
          Medi<span style={{ color: "#0da88b" }}>Book</span>
        </span>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <p className="text-xs font-semibold tracking-widest px-3 mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
          MENU
        </p>
        <ul className="space-y-1">
          {navItems.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: "rgba(13,168,139,0.18)" } : {}
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex-shrink-0" style={{ color: isActive ? "#0da88b" : undefined }}>
                      {icon}
                    </span>
                    {label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── User block + Logout ── */}
      <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: "#0da88b" }}
          >
            {user.initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
              {user.role}
            </p>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium
                     text-slate-400 hover:text-white transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.0)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.0)")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log out
        </button>
      </div>
    </aside>
  );
}