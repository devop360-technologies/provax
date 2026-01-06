"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface OtpVerificationFormProps {
  email: string;
  onBack: () => void;
  onSuccess: (otp: string) => void;
  onResendOtp: () => void;
}

export function OtpVerificationForm({ email, onBack, onSuccess, onResendOtp }: Readonly<OtpVerificationFormProps>) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    const digits = pasteData.replaceAll(/\D/g, '').slice(0, 6);
    
    if (digits.length === 6) {
      const newOtp = digits.split('');
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');
    
    // Import the API client
    const { verifyPasswordResetOtp } = await import('@/lib/api/auth-client');
    
    // Verify OTP via API
    const result = await verifyPasswordResetOtp({ email, otp: otpValue });
    
    if (result.success) {
      onSuccess(otpValue); // Pass the verified OTP to parent
    } else {
      setError(result.error || 'Invalid verification code. Please try again.');
    }
    
    setIsVerifying(false);
  };

  const handleResendOtp = () => {
    if (resendCooldown > 0) return;
    
    onResendOtp();
    setResendCooldown(30); // 30 second cooldown
    setOtp(['', '', '', '', '', '']);
    setError('');
    inputRefs.current[0]?.focus();
  };

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
      </div>

      {/* Right side - OTP Verification Form */}
      <div className="w-full lg:w-1/2 bg-[#141332] flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Enter Verification Code</h1>
            <p className="text-gray-300">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-blue-400 font-medium">{email}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="space-y-4">
              <span className="block text-white text-sm font-medium text-center">
                Verification Code
              </span>
              <div className="flex justify-center space-x-3" role="group" aria-label="Verification Code">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    aria-label={`Digit ${index + 1} of 6`}
                    className="w-12 h-12 text-center text-xl font-bold bg-transparent border border-gray-500 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isVerifying || otp.join('').length !== 6}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isVerifying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>

            {/* Resend Code */}
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0}
                className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
              </button>
            </div>

            {/* Back Link */}
            <p className="text-center text-gray-300 mt-6">
              <button
                type="button"
                onClick={onBack}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                ← Back to email entry
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}