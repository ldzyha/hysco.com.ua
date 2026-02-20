/**
 * Validation utilities
 */

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^\+?380\d{9}$/.test(cleaned) || /^0\d{9}$/.test(cleaned);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2;
}
