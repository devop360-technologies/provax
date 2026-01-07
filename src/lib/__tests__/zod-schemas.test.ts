import {
  generalSettingsSchema,
  loginSchema,
  registerSchema,
  changePasswordSchema,
  forgotPasswordSchema,
} from '../zod-schemas';

describe('generalSettingsSchema', () => {
  it('should validate correct data', () => {
    const result = generalSettingsSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('should require name', () => {
    const result = generalSettingsSchema.safeParse({
      email: 'john@example.com',
    });
    expect(result.success).toBe(false);
  });

  it('should require name to be at least 2 characters', () => {
    const result = generalSettingsSchema.safeParse({
      name: 'J',
      email: 'john@example.com',
    });
    expect(result.success).toBe(false);
  });

  it('should reject name exceeding 50 characters', () => {
    const result = generalSettingsSchema.safeParse({
      name: 'A'.repeat(51),
      email: 'john@example.com',
    });
    expect(result.success).toBe(false);
  });

  it('should allow optional image', () => {
    const result = generalSettingsSchema.safeParse({
      name: 'John Doe',
      image: 'https://example.com/image.png',
    });
    expect(result.success).toBe(true);
  });
});

describe('loginSchema', () => {
  it('should validate correct credentials', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '12345',
    });
    expect(result.success).toBe(false);
  });

  it('should require both email and password', () => {
    expect(loginSchema.safeParse({ email: 'test@example.com' }).success).toBe(false);
    expect(loginSchema.safeParse({ password: 'password123' }).success).toBe(false);
  });
});

describe('registerSchema', () => {
  const validData = {
    email: 'test@example.com',
    name: 'John Doe',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  it('should validate correct registration data', () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = registerSchema.safeParse({
      ...validData,
      email: 'invalid-email',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short name', () => {
    const result = registerSchema.safeParse({
      ...validData,
      name: 'J',
    });
    expect(result.success).toBe(false);
  });

  it('should reject password without uppercase', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'password123!',
      confirmPassword: 'password123!',
    });
    expect(result.success).toBe(false);
  });

  it('should reject password without lowercase', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'PASSWORD123!',
      confirmPassword: 'PASSWORD123!',
    });
    expect(result.success).toBe(false);
  });

  it('should reject password without number', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Password!',
      confirmPassword: 'Password!',
    });
    expect(result.success).toBe(false);
  });

  it('should reject password without special character', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Password123',
      confirmPassword: 'Password123',
    });
    expect(result.success).toBe(false);
  });

  it('should reject mismatched passwords', () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: 'DifferentPassword123!',
    });
    expect(result.success).toBe(false);
  });

  it('should reject short password', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Pass1!',
      confirmPassword: 'Pass1!',
    });
    expect(result.success).toBe(false);
  });
});

describe('changePasswordSchema', () => {
  const validData = {
    currentPassword: 'OldPassword123!',
    newPassword: 'NewPassword123!',
    confirmPassword: 'NewPassword123!',
  };

  it('should validate correct password change data', () => {
    const result = changePasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should require current password', () => {
    const result = changePasswordSchema.safeParse({
      newPassword: 'NewPassword123!',
      confirmPassword: 'NewPassword123!',
    });
    expect(result.success).toBe(false);
  });

  it('should reject empty current password', () => {
    const result = changePasswordSchema.safeParse({
      ...validData,
      currentPassword: '',
    });
    expect(result.success).toBe(false);
  });

  it('should validate new password requirements', () => {
    const result = changePasswordSchema.safeParse({
      ...validData,
      newPassword: 'weak',
      confirmPassword: 'weak',
    });
    expect(result.success).toBe(false);
  });

  it('should reject mismatched passwords', () => {
    const result = changePasswordSchema.safeParse({
      ...validData,
      confirmPassword: 'DifferentPassword123!',
    });
    expect(result.success).toBe(false);
  });
});

describe('forgotPasswordSchema', () => {
  it('should validate correct email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'test@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'invalid-email',
    });
    expect(result.success).toBe(false);
  });

  it('should reject empty email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: '',
    });
    expect(result.success).toBe(false);
  });

  it('should require email field', () => {
    const result = forgotPasswordSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
