export const BLOOD_TYPES = [
  "A+",
  "A−",
  "B+",
  "B−",
  "AB+",
  "AB−",
  "O+",
  "O−",
] as const;

// Derive the type from the array so it stays in sync automatically.
// Use this as: bloodType: BloodType
export type BloodType = (typeof BLOOD_TYPES)[number];