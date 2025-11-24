'use client'

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section className="relative py-20 bg-[#0a0f24] overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-sm text-white/60 mb-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-white/60 rounded-full" />
            <span>Get in touch</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Send us a message
          </h2>
          
          <p className="text-white/70 text-lg leading-relaxed">
            If you have questions or need information, use the form below. Our team will get back to you promptly today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Full Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-white font-semibold text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Carter"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff7f]/50 focus:bg-white/10 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-white font-semibold text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff7f]/50 focus:bg-white/10 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Phone and Subject Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="block text-white font-semibold text-sm">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(123) 456 - 7890"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff7f]/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-white font-semibold text-sm">
                Email address
              </label>
              <input
                type="email"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Support request"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff7f]/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <label className="block text-white font-semibold text-sm">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00ff7f]/50 focus:bg-white/10 transition-all duration-300 resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#00ff7f] text-black font-semibold px-8 py-3 rounded-full hover:bg-[#00e370] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 group"
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <span className="text-lg group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
