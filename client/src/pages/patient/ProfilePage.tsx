// src/pages/patient/ProfilePage.tsx

import { useProfileForm }     from "../../hooks/useProfileForm";

import ProfileSummaryCard    from "../../components/patient/ProfileSummaryCard";
import PersonalSection       from "../../components/patient/PersonalSection";
import MedicalSection        from "../../components/patient/MedicalSection";
import ActivitySummary       from "../../components/patient/ActivitySummary";
import NextAppointment       from "../../components/patient/NextAppointment";
import MyDoctors            from "../../components/patient/MyDoctors";
import AccountSecurity       from "../../components/patient/AccountSecurity";

// ─── Page ─────────────────────────────────────────────────────────────────────
// This file only does two things:
//   1. Calls useProfileForm() to get data + handlers
//   2. Composes the layout using imported components
// No state, no logic, no helpers defined here — just structure.

export default function ProfilePage() {
  const {
    formData,
    saveState,
    saveLabel,
    handleSave,
    handlePersonalChange,
    handleMedicalChange,
  } = useProfileForm();

  // Replace with real email from useAuth()
  const accountEmail = "maria.santos@email.com";

  return (
    <div className="p-8">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
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
            {saveLabel}
          </button>
        </div>
      </div>

      {/* ── Two-column layout ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-[1fr_300px] gap-6 items-start">

        {/* Left: profile summary + form */}
        <div className="flex flex-col gap-5">

          <ProfileSummaryCard
            firstName={formData.personal.firstName}
            lastName={formData.personal.lastName}
            email={accountEmail}
            phone={formData.personal.phone}
          />

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

        {/* Right: sidebar panels */}
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