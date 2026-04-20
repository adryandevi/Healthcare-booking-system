import { useState, useMemo, useCallback }  from "react";
import type { Appointment }                from "../types/appointment.types";
import { MOCK_APPOINTMENTS }               from "../constants/appointment.constants";

export function useAdminAppointments() {
  const [search,   setSearch]   = useState("");
  const [status,   setStatus]   = useState("All statuses");
  const [doctor,   setDoctor]   = useState("All doctors");
  const [date,     setDate]     = useState("");

  const filtered = useMemo(() =>
    MOCK_APPOINTMENTS.filter((a) => {
      const matchSearch = !search ||
        a.patient.toLowerCase().includes(search.toLowerCase()) ||
        a.aptId.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All statuses" || a.status === status;
      const matchDoctor = doctor === "All doctors"  || a.doctor === doctor;

      return matchSearch && matchStatus && matchDoctor;
    }),
    [search, status, doctor, date]
  );

  const handleEdit = useCallback((id: string) => {
    console.log("Edit appointment", id);
  }, []);

  return {
    search,  setSearch,
    status,  setStatus,
    doctor,  setDoctor,
    date,    setDate,
    appointments: filtered,
    handleEdit,
  };
}