import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PersonalInfo {
  firstName:   string;
  lastName:    string;
  dateOfBirth: string;
  phone:       string;
  address:     string;
}

interface MedicalInfo {
  bloodType:    string;
  allergies:    string;
  historyNotes: string;
}

interface ProfileFormData {
  personal: PersonalInfo;
  medical:  MedicalInfo;
}

interface SaveState {
  status:  "idle" | "saving" | "saved" | "error";
  message: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BLOOD_TYPES = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

const SELECT_CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;

// Replace with real data from useAuth() or usePatientProfile()
const INITIAL_DATA: ProfileFormData = {
  personal: {
    firstName:   "Maria",
    lastName:    "Santos",
    dateOfBirth: "1990-06-15",
    phone:       "+63 912 345 6789",
    address:     "123 Quezon Avenue, Quezon City",
  },
  medical: {
    bloodType:    "O+",
    allergies:    "Penicillin",
    historyNotes: "Hypertension (diagnosed 2022). No prior surgeries.",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateProfile(data: ProfileFormData): string | null {
  if (!data.personal.firstName.trim())   return "First name is required.";
  if (!data.personal.lastName.trim())    return "Last name is required.";
  if (!data.personal.dateOfBirth)        return "Date of birth is required.";
  if (!data.personal.phone.trim())       return "Phone number is required.";
  if (!data.personal.address.trim())     return "Address is required.";
  return null;
}

function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim()[0] ?? "";
  const last  = lastName.trim()[0]  ?? "";
  return (first + last).toUpperCase() || "?";
}

// ─── Shared primitives ────────────────────────────────────────────────────────

const inputClass = [
  "w-full px-3.5 py-2.5 text-sm text-slate-800 bg-white",
  "border border-slate-200 rounded-xl",
  "placeholder:text-slate-300",
  "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent",
  "hover:border-slate-300 transition-colors",
].join(" ");

function FormField({
  label,
  children,
  className = "",
}: {
  label:      string;
  children:   React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <span className="text-base font-semibold text-slate-800 whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

// ─── Left column: form ────────────────────────────────────────────────────────

function PersonalSection({
  data,
  onChange,
}: {
  data:     PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}) {
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

function MedicalSection({
  data,
  onChange,
}: {
  data:     MedicalInfo;
  onChange: (updated: MedicalInfo) => void;
}) {
  function update(field: keyof MedicalInfo, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div>
      <SectionDivider title="Medical information" />

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

// ─── Right column: sidebar panels ────────────────────────────────────────────

function SidebarCard({
  title,
  children,
}: {
  title:    string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-slate-800 mb-4">{title}</h3>
      {children}
    </div>
  );
}

// ── Activity summary ──────────────────────────────────────────────────────────

function ActivitySummary() {
  const stats: { label: string; value: string; color: string }[] = [
    { label: "Total visits",  value: "7",         color: "text-teal-600"  },
    { label: "Upcoming",      value: "2",          color: "text-blue-600"  },
    { label: "Cancelled",     value: "1",          color: "text-red-500"   },
    { label: "Member since",  value: "Jan 2025",   color: "text-slate-700" },
  ];

  return (
    <SidebarCard title="Activity summary">
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-slate-50 rounded-xl px-3 py-3 flex flex-col gap-0.5"
          >
            <span className={`text-xl font-bold leading-tight ${color}`}>
              {value}
            </span>
            <span className="text-xs text-slate-400">{label}</span>
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

// ── Next appointment ──────────────────────────────────────────────────────────

function NextAppointment() {
  return (
    <SidebarCard title="Next appointment">
      <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">

        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">General Checkup</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Dr. Reyes · General Practice
            </p>
          </div>
          <span className="text-xs font-medium bg-teal-100 text-teal-700 px-2.5 py-1 rounded-full flex-shrink-0">
            Confirmed
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg
              className="w-3.5 h-3.5 text-teal-500 flex-shrink-0"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8"  y1="2" x2="8"  y2="6" />
              <line x1="3"  y1="10" x2="21" y2="10" />
            </svg>
            April 20, 2026
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg
              className="w-3.5 h-3.5 text-teal-500 flex-shrink-0"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2}
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            9:00 AM
          </div>
        </div>
      </div>

      <button className="mt-3 w-full text-xs font-medium text-slate-400 hover:text-teal-600 transition-colors text-center">
        View all appointments →
      </button>
    </SidebarCard>
  );
}

// ── My doctors ────────────────────────────────────────────────────────────────

interface AssignedDoctor {
  initials:  string;
  name:      string;
  specialty: string;
  bg:        string;
  fg:        string;
}

const ASSIGNED_DOCTORS: AssignedDoctor[] = [
  {
    initials: "DR",
    name:     "Dr. Reyes",
    specialty: "General Practice",
    bg: "bg-teal-100",
    fg: "text-teal-700",
  },
  {
    initials: "DL",
    name:     "Dr. Lim",
    specialty: "Internal Medicine",
    bg: "bg-blue-100",
    fg: "text-blue-700",
  },
];

function MyDoctors() {
  return (
    <SidebarCard title="My doctors">
      <div className="flex flex-col gap-3">
        {ASSIGNED_DOCTORS.map((doc) => (
          <div key={doc.name} className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${doc.bg} ${doc.fg}`}
            >
              {doc.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{doc.name}</p>
              <p className="text-xs text-slate-400">{doc.specialty}</p>
            </div>
            <button className="text-xs text-slate-400 hover:text-teal-600 transition-colors flex-shrink-0">
              Book
            </button>
          </div>
        ))}
        <button className="mt-1 text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors text-left">
          + Find a new doctor
        </button>
      </div>
    </SidebarCard>
  );
}

// ── Account & security ────────────────────────────────────────────────────────

function AccountSecurity() {
  const items: { label: string; hint: string }[] = [
    { label: "Change password",           hint: "Last changed 3 months ago" },
    { label: "Two-factor authentication", hint: "Not enabled"               },
    { label: "Active sessions",           hint: "1 device"                  },
  ];

  return (
    <SidebarCard title="Account & security">
      <div className="flex flex-col divide-y divide-slate-100">
        {items.map(({ label, hint }) => (
          <div
            key={label}
            className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
          >
            <div>
              <p className="text-sm text-slate-700">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{hint}</p>
            </div>
            <button className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors flex-shrink-0 ml-3">
              Manage
            </button>
          </div>
        ))}
      </div>
    </SidebarCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [formData,  setFormData]  = useState<ProfileFormData>(INITIAL_DATA);
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle", message: "" });

  // Replace with real email from useAuth()
  const accountEmail = "maria.santos@email.com";

  // ── Handlers ────────────────────────────────────────────────────────────────

  function handlePersonalChange(updated: PersonalInfo) {
    setFormData((prev) => ({ ...prev, personal: updated }));
    if (saveState.status === "saved") setSaveState({ status: "idle", message: "" });
  }

  function handleMedicalChange(updated: MedicalInfo) {
    setFormData((prev) => ({ ...prev, medical: updated }));
    if (saveState.status === "saved") setSaveState({ status: "idle", message: "" });
  }

  async function handleSave() {
    const error = validateProfile(formData);
    if (error) {
      setSaveState({ status: "error", message: error });
      return;
    }

    setSaveState({ status: "saving", message: "" });

    try {
      // Replace with: await patientsService.updateProfile(formData);
      await new Promise((res) => setTimeout(res, 800));
      setSaveState({ status: "saved", message: "Changes saved." });
    } catch {
      setSaveState({ status: "error", message: "Failed to save. Please try again." });
    }
  }

  const saveLabel: Record<SaveState["status"], string> = {
    idle:   "Save changes",
    saving: "Saving...",
    saved:  "Saved ✓",
    error:  "Save changes",
  };

  const initials = getInitials(
    formData.personal.firstName,
    formData.personal.lastName,
  );
  const fullName = `${formData.personal.firstName} ${formData.personal.lastName}`.trim();

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="p-8">

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal and medical information.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveState.status === "error" && (
            <p className="text-sm text-red-500">{saveState.message}</p>
          )}
          {saveState.status === "saved" && (
            <p className="text-sm text-teal-600 font-medium">{saveState.message}</p>
          )}
          <button
            onClick={handleSave}
            disabled={saveState.status === "saving"}
            className="
              px-5 py-2 rounded-xl text-sm font-semibold text-white
              bg-teal-600 hover:bg-teal-700 active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-all
            "
          >
            {saveLabel[saveState.status]}
          </button>
        </div>
      </div>

      {/* ── Two-column layout ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_300px] gap-6 items-start">

        {/* ── Left: profile card + form ──────────────────────────────────────── */}
        <div className="flex flex-col gap-5">

          {/* Profile summary */}
          <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-semibold text-white">{initials}</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900 leading-tight">
                {fullName || "Your Name"}
              </p>
              <p className="text-sm text-slate-400 mt-0.5">
                Patient · Member since January 2025
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-slate-400">{accountEmail}</span>
                <span className="text-sm text-slate-400">{formData.personal.phone}</span>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white border border-slate-200 rounded-2xl px-6 py-6">
            <PersonalSection
              data={formData.personal}
              onChange={handlePersonalChange}
            />
            <MedicalSection
              data={formData.medical}
              onChange={handleMedicalChange}
            />
          </div>

        </div>

        {/* ── Right: sidebar panels ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 sticky top-6">
          <ActivitySummary />
          <NextAppointment />
          <MyDoctors />
          <AccountSecurity />
        </div>

      </div>
    </div>
  );
}