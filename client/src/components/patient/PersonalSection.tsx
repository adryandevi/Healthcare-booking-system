import type { PersonalInfo } from "../../types/patient.types";

interface Props {
  data:     PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

const inputClass = [
  "w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white",
  "border border-slate-200 rounded-xl placeholder:text-slate-300",
  "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
  "hover:border-slate-300 transition-colors",
].join(" ");

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

export default function PersonalSection({ data, onChange }: Props) {
  function update(field: keyof PersonalInfo, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div>
      <h2 className="text-base font-semibold text-slate-800 mb-4">
        Personal information
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label="First name">
          <input
            className={inputClass}
            type="text"
            value={data.firstName}
            placeholder="First name"
            onChange={(e) => update("firstName", e.target.value)}
          />
        </FormField>
        <FormField label="Last name">
          <input
            className={inputClass}
            type="text"
            value={data.lastName}
            placeholder="Last name"
            onChange={(e) => update("lastName", e.target.value)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormField label="Date of birth">
          <input
            className={inputClass}
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => update("dateOfBirth", e.target.value)}
          />
        </FormField>
        <FormField label="Phone number">
          <input
            className={inputClass}
            type="tel"
            value={data.phone}
            placeholder="+63 912 345 6789"
            onChange={(e) => update("phone", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Address">
        <input
          className={inputClass}
          type="text"
          value={data.address}
          placeholder="Street address, city"
          onChange={(e) => update("address", e.target.value)}
        />
      </FormField>
    </div>
  );
}