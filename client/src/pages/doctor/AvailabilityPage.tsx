import { useAvailability }  from "../../hooks/useAvailability";
import WeeklySchedule       from "../../components/doctor/WeeklySchedule";
import BlockDateForm        from "../../components/doctor/BlockDateForm";

export default function AvailabilityPage() {
  const {
    schedule,
    saved,
    handleToggleDay,
    handleTimeChange,
    handleSaveSchedule,
    handleBlockDate,
  } = useAvailability();

  return (
    <div className="p-8">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Manage Availability
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Set your weekly hours and block off specific dates.
        </p>
      </div>

      {/* ── Two-column layout ───────────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_380px] gap-6 items-start">

        <WeeklySchedule
          schedule={schedule}
          saved={saved}
          onToggle={handleToggleDay}
          onTimeChange={handleTimeChange}
          onSave={handleSaveSchedule}
        />

        <BlockDateForm onBlock={handleBlockDate} />

      </div>
    </div>
  );
}