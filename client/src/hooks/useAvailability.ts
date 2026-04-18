import { useState, useCallback }                    from "react";
import type { DaySchedule, BlockedDate, DayOfWeek } from "../types/availability.types";
import { DEFAULT_SCHEDULE }                         from "../utils/availabilityHelpers";

export function useAvailability() {
  const [schedule,   setSchedule]   = useState<DaySchedule[]>(DEFAULT_SCHEDULE);
  const [blockedDates, setBlocked]  = useState<BlockedDate[]>([]);
  const [saved,      setSaved]      = useState(false);

  // Weekly schedule handlers
  const handleToggleDay = useCallback((day: DayOfWeek) => {
    setSchedule((prev) =>
      prev.map((d) => d.day === day ? { ...d, enabled: !d.enabled } : d)
    );
  }, []);

  const handleTimeChange = useCallback(
    (day: DayOfWeek, field: "start" | "end", value: string) => {
      setSchedule((prev) =>
        prev.map((d) => d.day === day ? { ...d, [field]: value } : d)
      );
    },
    []
  );

  const handleSaveSchedule = useCallback(async () => {
    // await availabilityService.saveSchedule(schedule);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [schedule]);

  // Block date handlers
  const handleBlockDate = useCallback((entry: Omit<BlockedDate, "id">) => {
    setBlocked((prev) => [
      ...prev,
      { ...entry, id: crypto.randomUUID() },
    ]);
  }, []);

  const handleRemoveBlock = useCallback((id: string) => {
    setBlocked((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return {
    schedule,
    blockedDates,
    saved,
    handleToggleDay,
    handleTimeChange,
    handleSaveSchedule,
    handleBlockDate,
    handleRemoveBlock,
  };
}