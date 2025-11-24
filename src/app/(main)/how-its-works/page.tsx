import HowItWorksHero from '@/components/how-its-works/hero'
import StepFour from '@/components/how-its-works/step-four'
import StepOne from '@/components/how-its-works/step-one'
import StepThree from '@/components/how-its-works/step-three'
import StepTwo from '@/components/how-its-works/step-two'
import React from 'react'
import CTASection from "@/components/home/CTASection";
import Testimonials from "@/components/home/Testimonials";


const page = () => {
  return (
    <div>
      <HowItWorksHero/>
      <StepOne/>
      <StepTwo/>
      <StepThree/>
      <StepFour/>
      <Testimonials />
      <CTASection />
    </div>
  )
}

export default page