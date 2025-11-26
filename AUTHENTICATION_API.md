# PROVAX Authentication System - Complete API Documentation

## Overview
Complete OTP-based authentication system with email verification, password reset, and login functionality.

## Database Schema

### OtpToken Model
```prisma
model OtpToken {
    id         String   @id @default(auto()) @map("_id") @db.ObjectId
    email      String
    otp        String
    type       String   // "email_verification", "password_reset", "login"
    expires    DateTime
    verified   Boolean  @default(false)
    createdAt  DateTime @default(now())
}
```

## Authentication Actions

### 1. Registration with Email Verification

**File:** `src/actions/register-actions.ts`

#### `authRegisterAction(data: RegisterSchema)`
Creates a new user account and sends email verification OTP.

**Parameters:**
- `data.name` - User's full name
- `data.email` - User's email address
- `data.password` - User's password (min 8 characters)

**Returns:**
```typescript
{
  status: "success" | "error",
  message?: string,
  requiresVerification?: boolean
}
```

**Usage:**
```typescript
const result = await authRegisterAction({
  name: "John Doe",
  email: "john@example.com",
  password: "SecurePass123"
});

if (result.status === "success" && result.requiresVerification) {
  // Redirect to OTP verification page
}
```

#### `resendVerificationOtpAction(email: string)`
Resends email verification OTP to user.

---

### 2. Email Verification with OTP

**File:** `src/actions/email-verification-otp-actions.ts`

#### `sendEmailVerificationOtpAction(email: string)`
Sends a 6-digit OTP to user's email for verification.

**Returns:**
```typescript
{
  success: boolean,
  error?: string,
  message?: string
}
```

#### `verifyEmailWithOtpAction(email: string, otp: string)`
Verifies the OTP and marks user's email as verified.

**Usage:**
```typescript
const result = await verifyEmailWithOtpAction(
  "john@example.com",
  "123456"
);

if (result.success) {
  // Email verified, redirect to login
}
```

#### `checkEmailVerificationAction(email: string)`
Checks if an email is verified.

---

### 3. Login

**File:** `src/actions/login-actions.ts`

#### `loginAction(data: LoginSchema, redirectTo?: string)`
Standard login with email and password.

**Parameters:**
- `data.email` - User's email
- `data.password` - User's password
- `redirectTo` - Optional redirect URL after login

**Returns:**
```typescript
{
  success: boolean,
  error?: string,
  message?: string,
  requiresVerification?: boolean,
  redirectUrl?: string
}
```

**Usage:**
```typescript
const result = await loginAction({
  email: "john@example.com",
  password: "SecurePass123"
}, "/dashboard");

if (result.success) {
  router.push(result.redirectUrl);
} else if (result.requiresVerification) {
  // Redirect to email verification
}
```

#### `requestLoginOtpAction(email: string)`
Request OTP for passwordless login.

#### `loginWithOtpAction(email: string, otp: string, redirectTo?: string)`
Login using OTP instead of password.

---

### 4. Password Reset with OTP

**File:** `src/actions/password-reset-actions.ts`

#### `requestPasswordResetAction(email: string)`
Sends password reset OTP to user's email.

**Usage:**
```typescript
const result = await requestPasswordResetAction("john@example.com");

if (result.success) {
  // Redirect to OTP verification page
}
```

#### `verifyPasswordResetOtpAction(email: string, otp: string)`
Verifies the OTP for password reset.

**Usage:**
```typescript
const result = await verifyPasswordResetOtpAction(
  "john@example.com",
  "123456"
);

if (result.success) {
  // Show new password form
}
```

#### `resetPasswordAction(email: string, otp: string, newPassword: string)`
Resets user password after OTP verification.

**Usage:**
```typescript
const result = await resetPasswordAction(
  "john@example.com",
  "123456",
  "NewSecurePass456"
);

if (result.success) {
  // Redirect to login
}
```

---

### 5. OTP Management

**File:** `src/actions/otp-actions.ts`

#### `sendOtpAction(email: string, type: OtpType)`
Core function to send OTP. Types: `"email_verification"`, `"password_reset"`, `"login"`

#### `verifyOtpAction(email: string, otp: string, type: OtpType)`
Core function to verify OTP.

#### `deleteVerifiedOtpAction(email: string, type: OtpType)`
Cleanup verified OTP tokens.

#### `cleanupExpiredOtpsAction()`
Removes expired OTP tokens (run periodically via cron job).

---

## Complete User Flows

### Flow 1: New User Registration

1. **User submits registration form**
   ```typescript
   const result = await authRegisterAction({
     name: "John Doe",
     email: "john@example.com",
     password: "SecurePass123"
   });
   ```

2. **User receives OTP email** (6-digit code, valid for 10 minutes)

3. **User enters OTP**
   ```typescript
   const result = await verifyEmailWithOtpAction(
     "john@example.com",
     "123456"
   );
   ```

4. **Email verified, user can login**

### Flow 2: User Login

1. **Standard login**
   ```typescript
   const result = await loginAction({
     email: "john@example.com",
     password: "SecurePass123"
   });
   ```

2. **If email not verified**
   - Show error message
   - Option to resend verification OTP

### Flow 3: Forgot Password

1. **Request password reset**
   ```typescript
   const result = await requestPasswordResetAction("john@example.com");
   ```

2. **User receives OTP email**

3. **Verify OTP**
   ```typescript
   const result = await verifyPasswordResetOtpAction(
     "john@example.com",
     "123456"
   );
   ```

4. **Set new password**
   ```typescript
   const result = await resetPasswordAction(
     "john@example.com",
     "123456",
     "NewSecurePass456"
   );
   ```

5. **Redirect to login**

---

## Security Features

✅ **OTP Expiry:** All OTPs expire after 10 minutes
✅ **Single Use:** OTPs are marked as verified and deleted after use
✅ **Password Hashing:** Bcrypt with salt for secure password storage
✅ **Email Verification:** Required before login
✅ **Rate Limiting:** One OTP per email/type at a time (old ones deleted)
✅ **Type Isolation:** OTPs are type-specific (login, reset, verification)

---

## Error Handling

All actions return consistent error formats:

```typescript
{
  success: false,
  error: "Error message here"
}
```

Common error scenarios:
- Invalid email format
- User not found
- Email already verified
- OTP expired
- Invalid OTP code
- Password too weak

---

## Email Templates

### OTP Email Template
**File:** `src/components/mails/otp-email.tsx`

- Clean, professional design
- Large, readable OTP code
- Expiry time displayed
- Security notice
- Responsive layout

---

## Environment Variables Required

```env
DATABASE_URL="mongodb://..."
AUTH_SECRET="your-secret-key"
AUTH_RESEND_KEY="re_..."
```

---

## Migration Command

After updating the schema, run:
```bash
npx prisma generate
npx prisma db push
```

---

## Testing Checklist

- [ ] User registration with OTP
- [ ] Email verification flow
- [ ] Resend verification OTP
- [ ] Login with password
- [ ] Login with OTP
- [ ] Forgot password request
- [ ] OTP verification for password reset
- [ ] Password reset completion
- [ ] OTP expiry handling
- [ ] Invalid OTP handling
- [ ] Duplicate registration prevention
- [ ] Email already verified check

---

## Next Steps for Integration

1. **Update Prisma Schema**
   - Run: `npx prisma generate && npx prisma db push`

2. **Update Frontend Forms**
   - Connect register form to `authRegisterAction`
   - Add OTP verification component
   - Update login form to use `loginAction`
   - Update forgot password flow

3. **Add Cron Job** (Optional)
   - Setup periodic cleanup: `cleanupExpiredOtpsAction()`
   - Recommended: Run every hour

4. **Test Email Delivery**
   - Ensure Resend API key is configured
   - Test in development environment first

---

## Support

For issues or questions:
- Check error messages in console
- Verify environment variables
- Ensure database connection
- Check email service status (Resend)
