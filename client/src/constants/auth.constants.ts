import type { Role } from "../types/auth.types";

export const ROLE_REDIRECTS: Record<Role, string> = {
  patient: "/patient/dashboard",
  doctor:  "/doctor/schedule",
  admin:   "/admin/overview",
} as const;

export const ROLE_DEMO: Record<Role, { email: string; password: string }> = {
  patient: { email: "patient@medibook.com", password: "demo1234" },
  doctor:  { email: "doctor@medibook.com",  password: "demo1234" },
  admin:   { email: "admin@medibook.com",   password: "demo1234" },
} as const;

export const ROLES: Role[] = ["patient", "doctor", "admin"];

export const PASSWORD_MIN_LENGTH = 8;