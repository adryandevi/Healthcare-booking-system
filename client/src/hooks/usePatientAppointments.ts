import { useState, useMemo, useCallback }                        from "react";
import type { AppointmentStatus }                                from "../types/patientAppointment.types";
import { MOCK_PATIENT_APPOINTMENTS }                             from "../constants/patientAppointment.constants";

export function usePatientAppointments() {
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all");

  const filtered = useMemo(() =>
    statusFilter === "all"
      ? MOCK_PATIENT_APPOINTMENTS
      : MOCK_PATIENT_APPOINTMENTS.filter((a) => a.status === statusFilter),
    [statusFilter]
  );

  const handleReschedule = useCallback((id: string) => {
    console.log("Reschedule", id);
    // navigate(`/patient/appointments/${id}/reschedule`);
  }, []);

  const handleCancel = useCallback((id: string) => {
    console.log("Cancel", id);
    // openCancelModal(id);
  }, []);

  const handleViewNotes = useCallback((id: string) => {
    console.log("View notes", id);
    // navigate(`/patient/appointments/${id}/notes`);
  }, []);

  const handleRebook = useCallback((id: string) => {
    console.log("Rebook", id);
    // navigate(`/patient/book?rebookFrom=${id}`);
  }, []);

  return {
    filtered,
    statusFilter,
    setStatusFilter,
    handleReschedule,
    handleCancel,
    handleViewNotes,
    handleRebook,
  };
}