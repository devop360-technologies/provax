"use client";

import { useState } from "react";
import Image from "next/image";
import { PasswordInput, AUTH_FORM_CLASSES, PasswordRequirements, LoadingSpinner } from "./auth-form-utils";

interface NewPasswordFormProps {
  email: string;
  otp: string;
  onSuccess: () => void;
}

export function NewPasswordForm({ email, otp, onSuccess }: Readonly<NewPasswordFormProps>) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    const { resetPassword } = await import('@/lib/api/auth-client');
    const result = await resetPassword({ email, otp, newPassword });
    
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error || 'Failed to reset password. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className={AUTH_FORM_CLASSES.container}>
      {/* Left side - Image */}
      <div className={AUTH_FORM_CLASSES.imageSection}>
        <Image
          src="/provax-images/authentication/carGif.gif"
          alt="Car animation"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side - New Password Form */}
      <div className={AUTH_FORM_CLASSES.formSection}>
        <div className={AUTH_FORM_CLASSES.formWrapper}>
          {/* Header */}
          <div className="text-center">
            <h1 className={AUTH_FORM_CLASSES.headerTitle}>Create New Password</h1>
            <p className={AUTH_FORM_CLASSES.headerSubtitle}>Enter your new password for</p>
            <p className={AUTH_FORM_CLASSES.headerHighlight}>{email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={AUTH_FORM_CLASSES.form}>
            <PasswordInput
              id="newPasswordInput"
              label="New Password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={setNewPassword}
              showPassword={showNewPassword}
              onToggle={() => setShowNewPassword(!showNewPassword)}
            />

            <PasswordInput
              id="confirmPasswordInput"
              label="Confirm Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              showPassword={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* Error Message */}
            {error && (
              <div className={AUTH_FORM_CLASSES.errorMessage}>{error}</div>
            )}

            {/* Password Requirements */}
            <PasswordRequirements
              requirements={[
                "Be at least 8 characters long",
                "Contain both uppercase and lowercase letters",
                "Include at least one number",
                "Have at least one special character",
              ]}
            />

            {/* Update Password Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={AUTH_FORM_CLASSES.submitButton}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Updating Password...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}