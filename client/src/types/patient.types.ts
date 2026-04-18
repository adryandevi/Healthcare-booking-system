// ─── Profile form shapes ──────────────────────────────────────────────────────

export interface PersonalInfo {
  firstName:   string;
  lastName:    string;
  dateOfBirth: string;
  phone:       string;
  address:     string;
}

export interface MedicalInfo {
  bloodType:    string;
  allergies:    string;
  historyNotes: string;
}

export interface ProfileFormData {
  personal: PersonalInfo;
  medical:  MedicalInfo;
}

// ─── Patient entity (from API) ────────────────────────────────────────────────
// Full patient — from API, used in ProfilePage
export interface Patient {
  id:        string;
  email:     string;
  createdAt: string;
  personal:  PersonalInfo;
  medical:   MedicalInfo;
}

// Lightweight — used in table lists (doctor's patient list, admin directory)
export interface PatientSummary {
  id:          string;
  name:        string;
  initials:    string;
  email:       string;
  lastVisit:   string;
  totalVisits: number;
  condition:   string;
}