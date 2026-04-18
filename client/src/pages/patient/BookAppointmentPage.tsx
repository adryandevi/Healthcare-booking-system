import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Static data (replace with API calls later) ─────────
const SPECIALTIES = [
  "General Practice",
  "Internal Medicine",
  "Pediatrics",
  "Dermatology",
  "Orthopedics",
];

const DOCTORS: Record<string, { label: string; initials: string }[]> = {
  "General Practice": [
    { label: "Dr. Reyes — General Practice",  initials: "DR" },
    { label: "Dr. Santos — General Practice", initials: "DS" },
  ],
  "Internal Medicine": [
    { label: "Dr. Lim — Internal Medicine", initials: "DL" },
  ],
  "Pediatrics":   [{ label: "Dr. Cruz — Pediatrics",      initials: "DC" }],
  "Dermatology":  [{ label: "Dr. Garcia — Dermatology",   initials: "DG" }],
  "Orthopedics":  [{ label: "Dr. Torres — Orthopedics",   initials: "DT" }],
};

const VISIT_TYPES = [
  "General checkup",
  "Follow-up",
  "Lab results review",
  "Vaccination",
  "Consultation",
];

type SlotStatus = "available" | "taken" | "selected" | "blocked";

const BASE_SLOTS: { time: string; status: SlotStatus }[] = [
  { time: "8:00 AM",  status: "taken"     },
  { time: "9:00 AM",  status: "taken"     },
  { time: "10:00 AM", status: "available" },
  { time: "11:00 AM", status: "available" },
  { time: "12:00 PM", status: "blocked"   },
  { time: "1:00 PM",  status: "available" },
  { time: "2:00 PM",  status: "taken"     },
  { time: "3:00 PM",  status: "available" },
  { time: "4:00 PM",  status: "available" },
  { time: "5:00 PM",  status: "blocked"   },
];

// ── Slot styles ────────────────────────────────────────
const SLOT_STYLE: Record<SlotStatus, { bg: string; border: string; color: string }> = {
  available: { bg: "rgba(13,168,139,0.10)", border: "rgba(13,168,139,0.30)", color: "#0d7a63"  },
  taken:     { bg: "#f8fafc",               border: "#e2e8f0",               color: "#94a3b8"  },
  selected:  { bg: "#0da88b",               border: "#0da88b",               color: "#ffffff"  },
  blocked:   { bg: "rgba(244,63,94,0.10)",  border: "rgba(244,63,94,0.30)",  color: "#f43f5e" },
};

const LEGEND: { status: SlotStatus; label: string }[] = [
  { status: "available", label: "Available" },
  { status: "taken",     label: "Taken"     },
  { status: "selected",  label: "Selected"  },
  { status: "blocked",   label: "Blocked"   },
];

// ── Shared field class ─────────────────────────────────
const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 " +
  "outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 appearance-none";

// ── Component ──────────────────────────────────────────
export default function BookAppointmentPage() {
  const navigate = useNavigate();

  const [specialty,    setSpecialty]    = useState(SPECIALTIES[0]);
  const [doctorIdx,    setDoctorIdx]    = useState(0);
  const [date,         setDate]         = useState("2026-04-20");
  const [visitType,    setVisitType]    = useState(VISIT_TYPES[0]);
  const [notes,        setNotes]        = useState("");
  const [selectedTime, setSelectedTime] = useState("1:00 PM");

  const doctors = DOCTORS[specialty] ?? [];
  const doctor  = doctors[doctorIdx] ?? doctors[0];

  const slots = BASE_SLOTS.map((s) =>
    s.time === selectedTime ? { ...s, status: "selected" as SlotStatus } : s
  );

  const displayDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : "—";

  const doctorName = doctor?.label.split(" — ")[0] ?? "—";

  return (
    <div className="p-8" style={{ backgroundColor: "#f5f4f0" }}>

      {/* ── Page header ── */}
      <div className="bg-white rounded-2xl px-6 py-5 border border-slate-100 shadow-sm mb-6">
        <h1 className="text-xl font-bold text-slate-900">Book an Appointment</h1>
        <p className="text-sm text-slate-400 mt-0.5">Find a doctor and choose an available slot</p>
      </div>

      <div className="flex gap-6 items-start">

        {/* ── Left ── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Appointment details card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-5">Appointment details</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Specialty</label>
                <div className="relative">
                  <select
                    value={specialty}
                    onChange={(e) => { setSpecialty(e.target.value); setDoctorIdx(0); }}
                    className={field}
                  >
                    {SPECIALTIES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <Chevron />
                </div>
              </div>

              {/* Doctor */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Doctor</label>
                <div className="relative">
                  <select
                    value={doctorIdx}
                    onChange={(e) => setDoctorIdx(Number(e.target.value))}
                    className={field}
                  >
                    {doctors.map((d, i) => <option key={d.label} value={i}>{d.label}</option>)}
                  </select>
                  <Chevron />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={field}
                />
              </div>

              {/* Visit type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Visit type</label>
                <div className="relative">
                  <select
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value)}
                    className={field}
                  >
                    {VISIT_TYPES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                  <Chevron />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Notes for doctor{" "}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe your symptoms or reason for visit…"
                className={`${field} resize-none`}
              />
            </div>
          </div>

          {/* Time slots card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900">
              Available time slots — {displayDate}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5 mb-5">
              {doctorName} · {specialty}
            </p>

            <div className="grid grid-cols-4 gap-3 mb-5">
              {slots.map((slot) => {
                const st        = SLOT_STYLE[slot.status];
                const clickable = slot.status === "available" || slot.status === "selected";
                return (
                  <button
                    key={slot.time}
                    disabled={!clickable}
                    onClick={() => clickable && setSelectedTime(slot.time)}
                    className={`rounded-xl py-3 text-sm font-semibold border transition-all ${
                      clickable ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    style={{ backgroundColor: st.bg, borderColor: st.border, color: st.color }}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5">
              {LEGEND.map(({ status, label }) => {
                const st = SLOT_STYLE[status];
                return (
                  <div key={status} className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-sm border flex-shrink-0"
                      style={{ backgroundColor: st.bg, borderColor: st.border }}
                    />
                    <span className="text-xs text-slate-500">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Right: Booking summary ── */}
        <div className="w-72 flex-shrink-0 sticky top-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Booking summary</h2>

            {/* Doctor chip */}
            <div
              className="flex items-center gap-3 rounded-xl p-3 mb-5"
              style={{ backgroundColor: "#f5f4f0" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: "#0da88b" }}
              >
                {doctor?.initials ?? "—"}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{doctorName}</p>
                <p className="text-xs text-slate-400">{specialty}</p>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-5">
              {[
                { label: "Date",  value: displayDate     },
                { label: "Time",  value: selectedTime || "—" },
                { label: "Type",  value: visitType        },
                { label: "Mode",  value: "In-person"      },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              You'll receive a confirmation email once the doctor approves your appointment.
            </p>

            <button
              onClick={() => navigate("/patient/appointments")}
              disabled={!selectedTime}
              className="w-full rounded-xl py-3 text-sm font-semibold text-white mb-3 transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#0da88b" }}
            >
              Confirm booking
            </button>

            <button
              onClick={() => navigate("/patient/dashboard")}
              className="w-full rounded-xl py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Chevron() {
  return (
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  );
}