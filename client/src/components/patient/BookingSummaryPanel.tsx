import type { DoctorOption } from "../../types/booking.types";

interface Props {
  doctor:       DoctorOption | undefined;
  doctorName:   string;
  specialty:    string;
  displayDate:  string;
  selectedTime: string;
  visitType:    string;
  onConfirm:    () => void;
  onCancel:     () => void;
}

export default function BookingSummaryPanel({
  doctor, doctorName, specialty, displayDate,
  selectedTime, visitType, onConfirm, onCancel,
}: Props) {
  const details = [
    { label: "Date", value: displayDate        },
    { label: "Time", value: selectedTime || "—" },
    { label: "Type", value: visitType           },
    { label: "Mode", value: "In-person"         },
  ];

  return (
    <div className="w-72 flex-shrink-0 sticky top-8">
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Booking summary</h2>

        {/* Doctor chip */}
        <div className="flex items-center gap-3 rounded-xl p-3 mb-5" style={{ backgroundColor: "#f5f4f0" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: "#0da88b" }}>
            {doctor?.initials ?? "—"}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{doctorName}</p>
            <p className="text-xs text-slate-400">{specialty}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-5">
          {details.map(({ label, value }) => (
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
          onClick={onConfirm}
          disabled={!selectedTime}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white mb-3 transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#0da88b" }}
        >
          Confirm booking
        </button>

        <button
          onClick={onCancel}
          className="w-full rounded-xl py-3 text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}