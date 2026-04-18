const ACTIONS = [
  "+ Block time slot",
  "+ Add note",
  "Set out-of-office",
];

export default function QuickActions() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">Quick actions</h3>
      <div className="flex flex-col gap-3">
        {ACTIONS.map((label) => (
          <button
            key={label}
            className="w-full text-left text-sm text-slate-700 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}