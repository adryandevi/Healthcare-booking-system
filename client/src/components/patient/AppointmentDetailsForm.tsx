import { SPECIALTIES, VISIT_TYPES, FIELD_CLASS } from "../../constants/booking.constants";
import type { DoctorOption }                     from "../../types/booking.types";

function Chevron() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  );
}

interface Props {
  specialty:    string;
  doctorIdx:    number;
  doctors:      DoctorOption[];
  date:         string;
  visitType:    string;
  notes:        string;
  onSpecialty:  (v: string)  => void;
  onDoctorIdx:  (i: number)  => void;
  onDate:       (v: string)  => void;
  onVisitType:  (v: string)  => void;
  onNotes:      (v: string)  => void;
}

export default function AppointmentDetailsForm({
  specialty, doctorIdx, doctors, date, visitType, notes,
  onSpecialty, onDoctorIdx, onDate, onVisitType, onNotes,
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900 mb-5">Appointment details</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">

        {/* Specialty */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Specialty</label>
          <div className="relative">
            <select value={specialty} onChange={(e) => onSpecialty(e.target.value)} className={FIELD_CLASS}>
              {SPECIALTIES.map((s) => <option key={s}>{s}</option>)}
            </select>
            <Chevron />
          </div>
        </div>

        {/* Doctor */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Doctor</label>
          <div className="relative">
            <select value={doctorIdx} onChange={(e) => onDoctorIdx(Number(e.target.value))} className={FIELD_CLASS}>
              {doctors.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}
            </select>
            <Chevron />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred date</label>
          <input type="date" value={date} onChange={(e) => onDate(e.target.value)} className={FIELD_CLASS} />
        </div>

        {/* Visit type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Visit type</label>
          <div className="relative">
            <select value={visitType} onChange={(e) => onVisitType(e.target.value)} className={FIELD_CLASS}>
              {VISIT_TYPES.map((v) => <option key={v}>{v}</option>)}
            </select>
            <Chevron />
          </div>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Notes for doctor <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => onNotes(e.target.value)}
          placeholder="Describe your symptoms or reason for visit…"
          className={`${FIELD_CLASS} resize-none`}
        />
      </div>
    </div>
  );
}