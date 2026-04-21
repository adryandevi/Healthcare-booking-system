import type { Role } from "../types/auth.types";
import { ROLE_REDIRECTS, PASSWORD_MIN_LENGTH } from "../constants/auth.constants";

export function getRoleRedirect(role: Role): string {
  return ROLE_REDIRECTS[role] ?? "/";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function validatePassword(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
  return null;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}