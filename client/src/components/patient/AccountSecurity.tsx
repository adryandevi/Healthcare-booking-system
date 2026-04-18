interface SecurityItem {
  label: string;
  hint:  string;
}

const SECURITY_ITEMS: SecurityItem[] = [
  { label: "Change password",           hint: "Last changed 3 months ago" },
  { label: "Two-factor authentication", hint: "Not enabled"               },
  { label: "Active sessions",           hint: "1 device"                  },
];

export default function AccountSecurity() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Account & security</h3>

      <div className="flex flex-col divide-y divide-slate-100">
        {SECURITY_ITEMS.map(({ label, hint }) => (
          <div
            key={label}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm text-slate-700">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
            </div>
            <button className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors flex-shrink-0 ml-3">
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}