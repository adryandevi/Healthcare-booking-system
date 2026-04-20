import type { StatCard } from "../../types/overview.types";

export default function StatCardItem({ label, value, delta, deltaUp, sub, color }: StatCard) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <p className="text-sm text-slate-400 mb-2">{label}</p>
      <p className={`text-3xl font-bold tracking-tight ${color}`}>{value}</p>
      {sub   && <p className="text-sm text-slate-400 mt-1">{sub}</p>}
      {delta && (
        <p className={`text-xs mt-2 font-medium ${deltaUp ? "text-teal-600" : "text-red-500"}`}>
          {delta}
        </p>
      )}
    </div>
  );
}