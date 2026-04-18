import type { ProfileFormData } from "../types/patient.types";

// ─── Primitives ───────────────────────────────────────────────────────────────
// Each function validates one rule and returns a message or null.
// Keeping them small means they can be composed into any form validator.

export function validateEmail(email: string): string | null {
  if (!email.trim())              return "Email is required.";
  if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email address.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password)          return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[0-9]/.test(password))    return "Password must include a number.";
  if (!/[^a-zA-Z0-9]/.test(password)) return "Password must include a special character.";
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) return "Phone number is required.";
  if (!/^[+\d\s\-()]{7,15}$/.test(phone)) return "Enter a valid phone number.";
  return null;
}

// ─── Composite validators ─────────────────────────────────────────────────────
// These combine the primitives above with guard clauses.
// Return the FIRST error found, or null if the whole form is valid.

export function validateProfile(data: ProfileFormData): string | null {
  if (!data.personal.firstName.trim()) return "First name is required.";
  if (!data.personal.lastName.trim())  return "Last name is required.";
  if (!data.personal.dateOfBirth)      return "Date of birth is required.";

  const phoneError = validatePhone(data.personal.phone);
  if (phoneError) return phoneError;

  if (!data.personal.address.trim())   return "Address is required.";

  return null;
}

export function validateLogin(email: string, password: string): string | null {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  if (!password) return "Password is required.";

  return null;
}

export function validateRegister(
  email:     string,
  password:  string,
  firstName: string,
  lastName:  string,
): string | null {
  if (!firstName.trim()) return "First name is required.";
  if (!lastName.trim())  return "Last name is required.";

  const emailError    = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  return null;
}