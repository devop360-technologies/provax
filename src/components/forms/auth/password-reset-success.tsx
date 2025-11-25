"use client";

import Image from "next/image";

export function PasswordResetSuccess() {
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

      {/* Right side - Success Message */}
      <div className="w-full lg:w-1/2 bg-[#141332] flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Password Reset Successful!</h1>
            <p className="text-gray-300">
              Your password has been successfully updated. You can now log in with your new password.
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <a
              href="/login"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Continue to Login
            </a>

            <p className="text-gray-400 text-sm">
              For security reasons, please log in with your new password to access your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}