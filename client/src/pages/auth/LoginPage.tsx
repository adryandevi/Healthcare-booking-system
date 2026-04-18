import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Role = "patient" | "doctor" | "admin";

const ROLE_DEMO: Record<Role, { email: string; password: string }> = {
  patient: { email: "patient@medibook.com", password: "demo1234" },
  doctor:  { email: "doctor@medibook.com",  password: "demo1234" },
  admin:   { email: "admin@medibook.com",   password: "demo1234" },
};

const ROLE_REDIRECTS: Record<Role, string> = {
  patient: "/patient/dashboard",
  doctor:  "/doctor/schedule",
  admin:   "/admin/overview",
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await login(email, password, remember);
      navigate(ROLE_REDIRECTS[user.role as Role] ?? "/");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleDemo = async (role: Role) => {
    const creds = ROLE_DEMO[role];
    setError(null);
    setLoading(true);
    try {
      const user = await login(creds.email, creds.password, false);
      navigate(ROLE_REDIRECTS[user.role as Role] ?? "/");
    } catch {
      setError("Demo login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h2>
      <p className="text-slate-500 text-sm mb-7">
        Enter your credentials to access your account.
      </p>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email address
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              tabIndex={-1}
            >
              {showPass ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
          <button
            type="button"
            className="mt-2 text-sm font-medium"
            style={{ color: "#0da88b" }}
          >
            Forgot password?
          </button>
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-4 h-4 rounded accent-teal-600"
          />
          <span className="text-sm text-slate-600">Remember me for 30 days</span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#0da88b" }}
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400">or sign in as</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Role quick-login */}
      <div className="grid grid-cols-3 gap-3">
        {(["patient", "doctor", "admin"] as Role[]).map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => handleRoleDemo(role)}
            disabled={loading}
            className="rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 capitalize transition hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50 disabled:opacity-50"
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Sign up */}
      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/auth/register")}
          className="font-semibold"
          style={{ color: "#0da88b" }}
        >
          Sign up free
        </button>
      </p>
    </div>
  );
}