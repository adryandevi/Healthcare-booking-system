// src/hooks/useProfileForm.ts

import { useState } from "react";

import type { ProfileFormData, PersonalInfo, MedicalInfo } from "../types/patient.types";
import type { SaveState } from "../types/common.types";
import { validateProfile } from "../utils/validators";

// ─── Initial data ─────────────────────────────────────────────────────────────
// Temporary placeholder — replace with:
// const { patient } = useAuth();  then pass patient data as the initial value.

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

// ─── Save button label map ────────────────────────────────────────────────────
// Defined here so the hook exposes it — the page doesn't need to know
// which status maps to which label.

const SAVE_LABEL: Record<SaveState["status"], string> = {
  idle:    "Save changes",
  loading: "Loading...",
  saving:  "Saving...",
  saved:   "Saved ✓",
  error:   "Save changes",
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useProfileForm() {
  const [formData,  setFormData]  = useState<ProfileFormData>(INITIAL_DATA);
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle", message: "" });

  // ── Field-level change handlers ──────────────────────────────────────────
  // Each handler updates only its slice of formData.
  // Resets "saved" state so the button goes back to "Save changes"
  // the moment the user edits anything after a successful save.

  function handlePersonalChange(updated: PersonalInfo) {
    setFormData((prev) => ({ ...prev, personal: updated }));
    if (saveState.status === "saved") setSaveState({ status: "idle", message: "" });
  }

  function handleMedicalChange(updated: MedicalInfo) {
    setFormData((prev) => ({ ...prev, medical: updated }));
    if (saveState.status === "saved") setSaveState({ status: "idle", message: "" });
  }

  // ── Save handler ─────────────────────────────────────────────────────────
  // Guard clause first: validate before any async work.
  // Only reaches the API call if all fields pass.

  async function handleSave() {
    const error = validateProfile(formData);
    if (error) {
      setSaveState({ status: "error", message: error });
      return;
    }

    setSaveState({ status: "saving", message: "" });

    try {
      // Replace with real call:
      // await patientsService.updateProfile(formData);
      await new Promise((res) => setTimeout(res, 800));

      setSaveState({ status: "saved", message: "Changes saved." });
    } catch {
      setSaveState({ status: "error", message: "Failed to save. Please try again." });
    }
  }

  // ── Return ───────────────────────────────────────────────────────────────
  // Expose everything the page and its child components need.
  // Nothing more — callers don't need to know how the state is structured.

  return {
    formData,
    saveState,
    saveLabel:            SAVE_LABEL[saveState.status],
    handleSave,
    handlePersonalChange,
    handleMedicalChange,
  };
}