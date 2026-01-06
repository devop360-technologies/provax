"use client";
import Image from "next/image";
import { useState } from "react";

import carseat from '../../asests/carseat.png';

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "AI automation revolutionized our workflow by removing repetitive tasks and boosting efficiency. Scaling our operations has never been smoother or faster!",
      name: "James Carter",
      position: "CEO at Northaw Solutions",
      image: "dd"
    },
    {
      id: 2,
      text: "AI automation revolutionized our workflow by removing repetitive tasks and boosting efficiency. Scaling our operations has never been smoother or faster!",
      name: "David Reynolds",
      position: "Head of Sales in GreenPoint",
      image: "ddd"
    },
    {
      id: 3,
      text: "AI automation revolutionized our workflow by removing repetitive tasks and boosting efficiency. Scaling our operations has never been smoother or faster!",
      name: "James Carter",
      position: "CEO at Northaw Solutions",
      image: "dd"
    },
    {
      id: 4,
      text: "AI automation revolutionized our workflow by removing repetitive tasks and boosting efficiency. Scaling our operations has never been smoother or faster!",
      name: "Sophia Martinez",
      position: "Operations Manager at NexaCorp",
      image: "dd"
    }
  ];

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden px-4 py-20 md:px-8"
      style={{
        backgroundImage: `url(${carseat.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Gradient (keeps dark tone & readability) */}
<div className="absolute inset-0 bg-gradient-to-br from-[#0A0F24]/70 via-[#0A0F24]/60 to-[#0A0F24]/70"></div>
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          {/* Label */}
          <div className="mb-3 inline-flex items-center space-x-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            <p className="text-[9px] font-light tracking-widest text-cyan-300/80 uppercase md:text-sm">
              Ratings & Reviews
            </p>
          </div>

          {/* Main Heading */}
          <h2 className="mb-4 text-2xl leading-tight text-white md:text-3xl lg:text-4xl">
            Why Businesses Love Our
            <br />
            AI Solutions
          </h2>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-sm">
            Real companies achieving real impact - PROVAX AI automation delivers measurable results
            and unmatched efficiency.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className={`relative rounded-2xl border p-5 transition-all duration-300 bg-gradient-to-br from-green-500/10 to-green-800 backdrop-blur-sm border-green-400/50 shadow-lg shadow-green-500/20 ${activeTestimonial === index ? 'ring-2 ring-green-400' : ''}`}
              onMouseEnter={() => setActiveTestimonial(index)}
              aria-label={`Testimonial from ${testimonial.name}, ${testimonial.role}`}
            >
              {/* Quote Icon */}
              <div className="mb-6">⭐⭐⭐⭐⭐⭐</div>

              {/* Testimonial Text */}
              <p className="mb-4 text-[10px] md:text-sm leading-relaxed text-white/80">{testimonial.text}</p>

              {/* Author Info */}
              <div className="flex items-center gap-2">
                <Image
                  src="https://t4.ftcdn.net/jpg/13/66/62/19/360_F_1366621973_KNVZ3b4VTVkOojnUDVGlSYLeiWnJGSjk.jpg"
                  alt={testimonial.name}
                  width={50}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h4 className="mb-1 text-[10px] md:text-sm font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-[9px] md:text-[10px] text-gray-300/80">{testimonial.position}</p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300 ${
                  activeTestimonial === index
                    ? "bg-gradient-to-br from-cyan-500/20 to-blue-500/10"
                    : "bg-gradient-to-br from-cyan-500/0 to-blue-500/0"
                }`}
              ></div>
            </article>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveTestimonial(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                activeTestimonial === index
                  ? "scale-125 bg-green-400"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}