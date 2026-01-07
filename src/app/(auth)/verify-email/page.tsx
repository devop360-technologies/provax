'use client'

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sendVerificationOtp, verifyEmailOtp } from "@/lib/api/auth-client";

export default function VerifyEmail() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Get email from localStorage (set during registration)
    const storedEmail = localStorage.getItem('registration-email');
    if (storedEmail) {
      setEmail(storedEmail);
      setIsInitialized(true);
    } else {
      // If no email found, show error and redirect
      setError('No email found. Redirecting to registration...');
      setIsInitialized(true);
      setTimeout(() => {
        router.push('/register');
      }, 2000);
    }
  }, [router]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
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
      if (inputRefs.current[5]) {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const result = await verifyEmailOtp({ email, otp: otpValue });
      
      if (result.success) {
        setSuccess(true);
        localStorage.removeItem('registration-email');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(result.error || 'Invalid verification code');
      }
    } catch {
      setError('Failed to verify email. Please try again.');
    }

    setIsVerifying(false);
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    
    setIsLoading(true);
    setError('');

    try {
      const result = await sendVerificationOtp(email);
      
      if (result.success) {
        setResendCooldown(30);
        setOtp(['', '', '', '', '', '']);
        if (inputRefs.current[0]) {
          inputRefs.current[0]?.focus();
        }
      } else {
        setError(result.error || 'Failed to resend verification code');
      }
    } catch {
      setError('Failed to resend code. Please try again.');
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image
            src="/provax-images/authentication/carGif.gif"
            alt="Car animation"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full lg:w-1/2 bg-[#141332] flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Email Verified!</h1>
              <p className="text-gray-300">
                Your email has been successfully verified. Redirecting to login...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/provax-images/authentication/carGif.gif"
          alt="Car animation"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="w-full lg:w-1/2 bg-[#141332] flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {(() => {
            if (isInitialized && email) {
              return (
                <>
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
                    <p className="text-gray-300">
                      We've sent a 6-digit verification code to
                    </p>
                    <p className="text-blue-400 font-medium">{email}</p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-4">
                  <span className="block text-white text-sm font-medium text-center">
                    Verification Code
                  </span>
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => {
                      const position = index + 1;
                      return (
                      <input
                        key={`otp-digit-${position}`}
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-12 text-center text-xl font-bold bg-transparent border border-gray-500 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors"
                        required
                        aria-label={`Digit ${index + 1}`}
                      />
                    );
                    })}
                  </div>
                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}
                </div>

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
                    'Verify Email'
                  )}
                </button>

                <div className="text-center space-y-2">
                  <p className="text-gray-400 text-sm">
                    Didn&apos;t receive the code?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || isLoading}
                    className="text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                  >
                    {(() => {
                      if (resendCooldown > 0) return `Resend in ${resendCooldown}s`;
                      if (isLoading) return 'Sending...';
                      return 'Resend Code';
                    })()}
                  </button>
                </div>

                <p className="text-center text-gray-300 mt-6">
                  <a
                    href="/login"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    ← Back to login
                  </a>
                </p>
              </form>
                </>
              );
            }
            if (isInitialized) {
              return (
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-white mb-2">Redirecting...</h1>
                  <p className="text-red-400">{error}</p>
                </div>
              );
            }
            return (
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Loading...</h1>
                <div className="flex justify-center">
                  <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}