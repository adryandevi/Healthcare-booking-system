// src/pages/doctor/SchedulePage.tsx

import { useSchedule }     from "../../hooks/useSchedule";
import ScheduleStats       from "../../components/schedule/ScheduleStats";
import ScheduleRow         from "../../components/schedule/ScheduleRow";
import QuickActions        from "../../components/schedule/QuickActions";
import PendingApproval     from "../../components/schedule/PendingApproval";

export default function SchedulePage() {
  const {
    entries,
    currentDate,
    canGoPrev,
    canGoNext,
    goToPrevious,
    goToNext,
    handleConfirm,
    handleReject,
    handleNotes,
  } = useSchedule();

  const appointmentCount = entries.filter((e) => e.status !== "blocked").length;

  return (
    <div className="p-8">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Today's Schedule
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {currentDate} · {appointmentCount} appointments
          </p>
        </div>

        {/* Date navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            disabled={!canGoPrev}
            className="px-4 py-2 text-sm border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={goToNext}
            disabled={!canGoNext}
            className="px-4 py-2 text-sm border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <ScheduleStats entries={entries} />

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_300px] gap-6 items-start">

        {/* Left: schedule timeline */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          {entries.map((entry) => (
            <ScheduleRow
              key={entry.id}
              entry={entry}
              onConfirm={handleConfirm}
              onReject={handleReject}
              onNotes={handleNotes}
            />
          ))}
        </div>

        {/* Right: sidebar */}
        <div className="flex flex-col gap-4 sticky top-6 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <QuickActions />
          <PendingApproval
            entries={entries}
            onConfirm={handleConfirm}
            onReject={handleReject}
          />
        </div>

      </div>
    </div>
  );
}