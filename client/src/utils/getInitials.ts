// src/utils/getInitials.ts

/**
 * Derives initials from a first and last name.
 *
 * getInitials("Maria", "Santos") → "MS"
 * getInitials("Maria", "")       → "MA"  (first two chars of first name)
 * getInitials("", "")            → "?"   (fallback for empty input)
 */
export function getInitials(firstName: string, lastName: string): string {
  const first = firstName.trim()[0] ?? "";
  const last  = lastName.trim()[0]  ?? "";

  if (first && last) return (first + last).toUpperCase();
  if (first)         return firstName.trim().slice(0, 2).toUpperCase();
  return "?";
}