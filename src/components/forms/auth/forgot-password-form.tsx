"use client";

import { useState } from "react";
import Image from "next/image";
import { OtpVerificationForm } from "./otp-verification-form";
import { NewPasswordForm } from "./new-password-form";
import { PasswordResetSuccess } from "./password-reset-success";
import { requestPasswordReset } from "@/lib/api/auth-client";

type Step = 'email' | 'otp' | 'newPassword' | 'success';

export function ForgotPasswordForm() {
  const [currentStep, setCurrentStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    // Send OTP via API
    const result = await requestPasswordReset(email);
    
    if (result.success) {
      setCurrentStep('otp');
    } else {
      setError(result.error || 'Failed to send reset code');
    }
    
    setIsSubmitting(false);
  };

  const handleResendOtp = async () => {
    setError('');
    const result = await requestPasswordReset(email);
    if (!result.success) {
      setError(result.error || 'Failed to resend code');
    }
  };

  const handleOtpSuccess = (otp: string) => {
    setVerifiedOtp(otp);
    setCurrentStep('newPassword');
  };

  const handleNewPasswordSuccess = () => {
    setCurrentStep('success');
  };

  const handleBackToEmail = () => {
    setCurrentStep('email');
    setError('');
  };

  // Render different components based on current step
  if (currentStep === 'otp') {
    return (
      <OtpVerificationForm
        email={email}
        onBack={handleBackToEmail}
        onSuccess={handleOtpSuccess}
        onResendOtp={handleResendOtp}
      />
    );
  }

  if (currentStep === 'newPassword') {
    return (
      <NewPasswordForm
        email={email}
        otp={verifiedOtp}
        onSuccess={handleNewPasswordSuccess}
      />
    );
  }

  if (currentStep === 'success') {
    return <PasswordResetSuccess />;
  }

  // Email step - render the email input form
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/provax-images/authentication/carGif.gif"
          alt="Car animation"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay with Login/Sign Up buttons */}
        {/* <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <div className="space-y-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Login
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Sign Up
            </button>
          </div>
        </div> */}
      </div>

      {/* Right side - Forgot Password Form */}
      <div className="w-full lg:w-1/2 bg-[#141332] flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Forgot your password?</h1>
            <p className="text-gray-300">
              Enter your email address and we'll send you a verification code to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="forgotPasswordEmail" className="block text-white text-sm font-medium mb-3">
                Email Address
              </label>
              <input
                id="forgotPasswordEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </>
              ) : (
                'Send Verification Code'
              )}
            </button>

            {/* Back to Login Link */}
            <p className="text-center text-gray-300 mt-6">
              Remember your password?{" "}
              <a href="/login" className="text-green-400 hover:text-green-300 transition-colors">
                Back to login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
