import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-10 relative overflow-hidden"
        style={{ backgroundColor: "#0d1f2d" }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(13,168,139,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#0da88b" }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-white text-xl font-semibold tracking-tight">
            Medi<span style={{ color: "#0da88b" }}>Book</span>
          </span>
        </div>

        {/* Hero copy */}
        <div className="relative">
          <h1 className="text-white text-5xl font-bold leading-tight mb-5">
            Healthcare
            <br />
            booking{" "}
            <span style={{ color: "#0da88b" }} className="italic">
              made
            </span>
            <br />
            simple.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-xs">
            Book appointments, manage your schedule, and track your health
            journey — all in one place.
          </p>

          <ul className="space-y-4">
            {[
              "Real-time doctor availability",
              "Role-based access for patients, doctors, and admins",
              "Automated reminders and notifications",
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-3 text-slate-300 text-sm">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#0da88b" }}
                />
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="relative text-slate-600 text-xs">
          © 2026 MediBook · Healthcare Platform
        </p>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
            <Outlet />
          {/* Tabs */}
          <div className="flex border-b border-slate-200 mb-8">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`pb-3 px-1 mr-8 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  tab === t
                    ? "border-teal-600 text-teal-700"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {t === "login" ? "Log in" : "Create account"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <LoginPage onSwitchToRegister={() => setTab("register")} />
          ) : (
            <RegisterPage onSwitchToLogin={() => setTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}