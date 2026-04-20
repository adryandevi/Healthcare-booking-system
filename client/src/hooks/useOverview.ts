// src/hooks/useOverview.ts
import { useState, useMemo, useCallback }           from "react";
import type { StatCard, DoctorWorkload, StatusBreakdown, RecentAppointment } from "../types/overview.types";
import {
  RECENT_APPOINTMENTS,
  DOCTOR_WORKLOAD,
  STATUS_BREAKDOWN,
  STAT_CARDS,
  PERIOD_OPTIONS,
} from "../constants/overview.constants";

export function useOverview() {
  const [period, setPeriod]   = useState<string>(PERIOD_OPTIONS[0]);
  const [search, setSearch]   = useState("");

  const filtered = useMemo(() =>
    RECENT_APPOINTMENTS.filter((a) =>
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleConfirm = useCallback((id: string) => {
    console.log("Force confirm", id);
  }, []);

  const handleCancel = useCallback((id: string) => {
    console.log("Cancel", id);
  }, []);

  const handleRebook = useCallback((id: string) => {
    console.log("Rebook", id);
  }, []);

  const handleExport = useCallback(() => {
    console.log("Export CSV");
  }, []);

  return {
    period, setPeriod,
    search, setSearch,
    statCards:       STAT_CARDS,
    doctorWorkload:  DOCTOR_WORKLOAD,
    statusBreakdown: STATUS_BREAKDOWN,
    appointments:    filtered,
    periodOptions:   PERIOD_OPTIONS,
    handleConfirm,
    handleCancel,
    handleRebook,
    handleExport,
  };
}