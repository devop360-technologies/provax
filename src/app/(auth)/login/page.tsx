'use client'

import type { Metadata } from "next";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
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

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 bg-[#141332] flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-gray-300">Login to access all your data</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white text-sm font-medium mb-3">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-transparent border border-gray-500 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <div className="text-right mt-2">
                <a href="/forgot-password" className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-1 border-gray-500" />
              <span className="px-4 text-gray-400 text-sm">Continue with</span>
              <hr className="flex-1 border-gray-500" />
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full bg-transparent border border-gray-500 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Login with Google
              </button>
              <button
                type="button"
                className="w-full bg-transparent border border-gray-500 text-white py-3 rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Login with Facebook
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-gray-300 mt-6">
              Don't have an account?{" "}
              <a href="/register" className="text-green-400 hover:text-green-300 transition-colors">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
