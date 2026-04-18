import type { MedicalInfo } from "../../types/patient.types";
import { BLOOD_TYPES }      from "../../constants/bloodTypes";

interface Props {
  data:     MedicalInfo;
  onChange: (updated: MedicalInfo) => void;
}

const inputClass = [
  "w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white",
  "border border-slate-200 rounded-xl placeholder:text-slate-300",
  "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
  "hover:border-slate-300 transition-colors",
].join(" ");

const SELECT_CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

export default function MedicalSection({ data, onChange }: Props) {
  function update(field: keyof MedicalInfo, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div>
      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <span className="text-base font-semibold text-slate-800 whitespace-nowrap">
          Medical information
        </span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label="Blood type">
          <select
            className={inputClass}
            value={data.bloodType}
            onChange={(e) => update("bloodType", e.target.value)}
            style={{
              backgroundImage:    SELECT_CHEVRON,
              backgroundRepeat:   "no-repeat",
              backgroundPosition: "right 12px center",
              appearance:         "none",
            }}
          >
            {BLOOD_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Allergies">
          <input
            className={inputClass}
            type="text"
            value={data.allergies}
            placeholder="e.g. Penicillin, Peanuts"
            onChange={(e) => update("allergies", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Medical history notes">
        <textarea
          className={`${inputClass} resize-y min-h-[100px] leading-relaxed`}
          value={data.historyNotes}
          placeholder="Describe any past conditions, surgeries, or ongoing treatments..."
          onChange={(e) => update("historyNotes", e.target.value)}
        />
      </FormField>
    </div>
  );
}