import type { TimeSlot }                       from "../../types/booking.types";
import { SLOT_LEGEND, SLOT_STYLES }            from "../../constants/booking.constants";
import { getSlotStyle, isSlotClickable }       from "../../utils/bookingHelpers";

interface Props {
  slots:        TimeSlot[];
  displayDate:  string;
  doctorName:   string;
  specialty:    string;
  onSelect:     (time: string) => void;
}

export default function TimeSlotsGrid({ slots, displayDate, doctorName, specialty, onSelect }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">
        Available time slots — {displayDate}
      </h2>
      <p className="text-sm text-slate-400 mt-0.5 mb-5">{doctorName} · {specialty}</p>

      {/* Slots grid */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {slots.map((slot) => {
          const st        = getSlotStyle(slot.status);
          const clickable = isSlotClickable(slot.status);
          return (
            <button
              key={slot.time}
              disabled={!clickable}
              onClick={() => clickable && onSelect(slot.time)}
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
        {SLOT_LEGEND.map(({ status, label }) => {
          const st = SLOT_STYLES[status];
          return (
            <div key={status} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border flex-shrink-0" style={{ backgroundColor: st.bg, borderColor: st.border }} />
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}