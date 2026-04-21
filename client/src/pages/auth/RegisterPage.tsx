import { useRegister } from "../../hooks/useRegister";
import { ROLES }       from "../../constants/auth.constants";
import { capitalize }  from "../../utils/authHelpers";
import type { Role }   from "../../types/auth.types";

interface Props { onSwitchToLogin: () => void; }

export default function RegisterPage({ onSwitchToLogin }: Props) {
  const {
    name, setName, email, setEmail,
    password, setPassword, role, setRole,
    showPass, setShowPass, loading, error, handleSubmit,
  } = useRegister();

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h2>
      <p className="text-slate-500 text-sm mb-7">
        Join MediBook and take control of your healthcare.
      </p>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
          <input type="text" autoComplete="name" value={name}
            onChange={(e) => setName(e.target.value)} placeholder="Maria Santos" required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm
                       text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
          <input type="email" autoComplete="email" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm
                       text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <input type={showPass ? "text" : "password"} autoComplete="new-password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters" required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-11 text-sm
                         text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              tabIndex={-1}>
              {showPass
                ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">I am a…</label>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button key={r} type="button" onClick={() => setRole(r)}
                className={`rounded-xl border py-2.5 text-sm font-semibold capitalize transition ${
                  role === r
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-600 hover:border-teal-300 hover:text-teal-600"
                }`}>
                {capitalize(r)}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full rounded-xl py-3.5 text-sm font-semibold text-white transition
                     disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#0da88b" }}>
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin}
          className="font-semibold transition" style={{ color: "#0da88b" }}>
          Log in
        </button>
      </p>
    </div>
  );
}