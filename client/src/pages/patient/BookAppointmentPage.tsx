// src/pages/patient/BookAppointmentPage.tsx
import { useBookAppointment }      from "../../hooks/useBookAppointment";
import AppointmentDetailsForm      from "../../components/patient/AppointmentDetailsForm";
import TimeSlotsGrid               from "../../components/patient/TimeSlotsGrid";
import BookingSummaryPanel         from "../../components/patient/BookingSummaryPanel";

export default function BookAppointmentPage() {
  const {
    specialty, visitType, date, notes, doctorIdx, selectedTime,
    doctors, doctor, doctorName, slots, displayDate,
    setDate, setNotes, setVisitType, setSelectedTime, setDoctorIdx,
    handleSpecialtyChange, handleConfirm, handleCancel,
  } = useBookAppointment();

  return (
    <div className="p-8" style={{ backgroundColor: "#f5f4f0" }}>

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl px-6 py-5 border border-slate-100 shadow-sm mb-6">
        <h1 className="text-xl font-bold text-slate-900">Book an Appointment</h1>
        <p className="text-sm text-slate-400 mt-0.5">Find a doctor and choose an available slot</p>
      </div>

      <div className="flex gap-6 items-start">

        {/* ── Left ────────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-5">
          <AppointmentDetailsForm
            specialty={specialty}
            doctorIdx={doctorIdx}
            doctors={doctors}
            date={date}
            visitType={visitType}
            notes={notes}
            onSpecialty={handleSpecialtyChange}
            onDoctorIdx={setDoctorIdx}
            onDate={setDate}
            onVisitType={setVisitType}
            onNotes={setNotes}
          />

          <TimeSlotsGrid
            slots={slots}
            displayDate={displayDate}
            doctorName={doctorName}
            specialty={specialty}
            onSelect={setSelectedTime}
          />
        </div>

        {/* ── Right: summary ──────────────────────────────────────────────── */}
        <BookingSummaryPanel
          doctor={doctor}
          doctorName={doctorName}
          specialty={specialty}
          displayDate={displayDate}
          selectedTime={selectedTime}
          visitType={visitType}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />

      </div>
    </div>
  );
}