import { useState, useMemo, useCallback } from "react";
import { useNavigate }                    from "react-router-dom";
import { SPECIALTIES, BASE_SLOTS, VISIT_TYPES } from "../constants/booking.constants";
import {
  getDoctorsForSpecialty, applySelectedSlot,
  formatDisplayDate, parseDoctorName,
} from "../utils/bookingHelpers";

export function useBookAppointment() {
  const navigate = useNavigate();

  const [specialty,     setSpecialty]     = useState<string>(SPECIALTIES[0]);
  const [doctorIdx,     setDoctorIdx]     = useState(0);
  const [date,          setDate]          = useState("2026-04-20");
  const [visitType,     setVisitType]     = useState<string>(VISIT_TYPES[0]);
  const [notes,         setNotes]         = useState("");
  const [selectedTime,  setSelectedTime]  = useState("1:00 PM");

  const doctors     = useMemo(() => getDoctorsForSpecialty(specialty), [specialty]);
  const doctor      = doctors[doctorIdx] ?? doctors[0];
  const slots       = useMemo(() => applySelectedSlot(BASE_SLOTS, selectedTime), [selectedTime]);
  const displayDate = useMemo(() => formatDisplayDate(date), [date]);
  const doctorName  = doctor ? parseDoctorName(doctor.label) : "—";

  const handleSpecialtyChange = useCallback((val: string) => {
    setSpecialty(val);
    setDoctorIdx(0);
  }, []);

  const handleConfirm = useCallback(() => {
    // await appointmentsService.book({ specialty, doctor, date, visitType, notes, selectedTime });
    navigate("/patient/appointments");
  }, [navigate]);

  const handleCancel = useCallback(() => {
    navigate("/patient/dashboard");
  }, [navigate]);

  return {
    // form state
    specialty, visitType, date, notes, doctorIdx, selectedTime,
    // derived
    doctors, doctor, doctorName, slots, displayDate,
    // setters
    setDate, setNotes, setVisitType, setSelectedTime,
    setDoctorIdx: (i: number) => setDoctorIdx(i),
    handleSpecialtyChange,
    handleConfirm,
    handleCancel,
  };
}