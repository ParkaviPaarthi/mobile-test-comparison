export const VALID_EMAIL = 'test@example.com';
export const VALID_PASSWORD = 'Password123!';

export function authenticate(email, password) {
  return email.trim() === VALID_EMAIL && password === VALID_PASSWORD;
}
