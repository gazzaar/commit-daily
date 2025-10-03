export const validateRegister = (
  fullName: string,
  email: string,
  password: string,
): string | null => {
  if (!fullName.trim() || fullName.length < 4) {
    return 'Full name must be at least 4 characters';
  }
  if (validateFileds(email, password)) {
    return validateFileds(email, password);
  }
  return null;
};

export const validateFileds = (email: string, password: string): string | null => {
  if (!password.trim() || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  if (!email.trim()) {
    return 'Email must not be empty';
  }
  return null;
};
