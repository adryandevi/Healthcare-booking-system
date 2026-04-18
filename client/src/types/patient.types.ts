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

export interface Patient {
  id:        string;
  email:     string;
  createdAt: string;
  personal:  PersonalInfo;
  medical:   MedicalInfo;
}