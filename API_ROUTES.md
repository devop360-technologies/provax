# PROVAX Authentication API Routes

## Complete Backend API Reference

All routes return JSON responses with consistent error handling.

---

## 1. Registration

### POST `/api/auth/register`
Register a new user account and send email verification OTP.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! Please check your email for verification code.",
  "requiresVerification": true
}
```

**Error Response (400):**
```json
{
  "error": "User already exists with this email"
}
```

**Usage Example:**
```typescript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});

const data = await response.json();
if (data.success && data.requiresVerification) {
  // Redirect to OTP verification page
}
```

---

## 2. Email Verification

### POST `/api/auth/verify-email/send`
Send or resend email verification OTP.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully to your email"
}
```

### POST `/api/auth/verify-email/verify`
Verify email with OTP code.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid or expired OTP code"
}
```

---

## 3. Login

### POST `/api/auth/login`
Standard login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123",
  "redirectTo": "/dashboard" // optional
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "redirectUrl": "/dashboard"
}
```

**Error Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

**Error Response - Email Not Verified (401):**
```json
{
  "error": "Please verify your email before logging in",
  "requiresVerification": true
}
```

### POST `/api/auth/login/otp-request`
Request OTP for passwordless login.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login code sent to your email",
  "requiresOtp": true
}
```

### POST `/api/auth/login/otp-verify`
Login with OTP code (passwordless).

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "redirectTo": "/dashboard" // optional
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "redirectUrl": "/dashboard"
}
```

---

## 4. Password Reset

### POST `/api/auth/password/reset-request`
Request password reset OTP.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP sent successfully to your email"
}
```

**Error Response (400):**
```json
{
  "error": "No account found with this email address"
}
```

### POST `/api/auth/password/verify-otp`
Verify password reset OTP before allowing password change.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "OTP verified successfully"
}
```

### POST `/api/auth/password/reset`
Reset password with verified OTP.

**Request Body:**
```json
{
  "email": "john@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid or unverified OTP. Please verify your OTP first."
}
```

---

## API Routes Structure

```
src/app/api/auth/
├── register/
│   └── route.ts          # POST /api/auth/register
├── login/
│   ├── route.ts          # POST /api/auth/login
│   ├── otp-request/
│   │   └── route.ts      # POST /api/auth/login/otp-request
│   └── otp-verify/
│       └── route.ts      # POST /api/auth/login/otp-verify
├── verify-email/
│   ├── send/
│   │   └── route.ts      # POST /api/auth/verify-email/send
│   └── verify/
│       └── route.ts      # POST /api/auth/verify-email/verify
└── password/
    ├── reset-request/
    │   └── route.ts      # POST /api/auth/password/reset-request
    ├── verify-otp/
    │   └── route.ts      # POST /api/auth/password/verify-otp
    └── reset/
        └── route.ts      # POST /api/auth/password/reset
```

---

## Complete User Flows with API Calls

### Flow 1: Registration → Email Verification → Login

```typescript
// Step 1: Register
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});

// Step 2: User receives OTP via email (automated)

// Step 3: Verify email with OTP
const verifyResponse = await fetch('/api/auth/verify-email/verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    otp: '123456'
  })
});

// Step 4: Login
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});
```

### Flow 2: Forgot Password → Reset

```typescript
// Step 1: Request password reset
const resetRequest = await fetch('/api/auth/password/reset-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com'
  })
});

// Step 2: User receives OTP via email

// Step 3: Verify OTP
const verifyOtp = await fetch('/api/auth/password/verify-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    otp: '123456'
  })
});

// Step 4: Reset password
const resetPassword = await fetch('/api/auth/password/reset', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    otp: '123456',
    newPassword: 'NewSecurePass456'
  })
});
```

### Flow 3: Passwordless Login with OTP

```typescript
// Step 1: Request login OTP
const otpRequest = await fetch('/api/auth/login/otp-request', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com'
  })
});

// Step 2: User receives OTP via email

// Step 3: Login with OTP
const otpLogin = await fetch('/api/auth/login/otp-verify', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    otp: '123456'
  })
});
```

---

## Error Handling

All routes follow consistent error response format:

**Client Errors (400, 401):**
```json
{
  "error": "Error message here",
  "requiresVerification": true // optional flag
}
```

**Server Errors (500):**
```json
{
  "error": "Internal server error"
}
```

---

## Security Features

✅ **OTP Expiry:** 10 minutes
✅ **Single Use:** OTPs deleted after verification
✅ **Rate Limiting:** One active OTP per email/type
✅ **Password Hashing:** Bcrypt with salt
✅ **Email Verification:** Required before login
✅ **Input Validation:** Zod schema validation
✅ **Error Masking:** Generic error messages for security

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"SecurePass123"}'
```

### Verify Email
```bash
curl -X POST http://localhost:3000/api/auth/verify-email/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","otp":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"SecurePass123"}'
```

### Request Password Reset
```bash
curl -X POST http://localhost:3000/api/auth/password/reset-request \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com"}'
```

---

## Status Codes

- `200` - Success (GET, PUT operations)
- `201` - Created (POST registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (login failures)
- `500` - Internal Server Error

---

## Next Steps

1. ✅ Run Prisma migration: `npx prisma generate && npx prisma db push`
2. ✅ Test API routes with Postman or cURL
3. ✅ Integrate with frontend forms
4. ✅ Configure email service (Resend)
5. ✅ Add rate limiting (optional)
6. ✅ Setup monitoring and logging
