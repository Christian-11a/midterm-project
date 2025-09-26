import React from 'react';

export default function HeroSection() {
  return (
    <section 
      className="relative w-full h-[500px] bg-cover bg-center" 
      style={{ backgroundImage: 'url(/assets/herobg.webp)' }}
    >
      <div className="absolute inset-y-0 left-0 w-1/3 bg-orange-500 opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome to StudySpot PH</h1>
          <p className="text-lg mb-6 font-medium">Find Your Focus.<br /> Build your ideal study spot in minutes.</p>
          <div
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-full font-semibold shadow-md transition-colors duration-300"
          >
            Book Now
          </div>
        </div>
      </div>
    </section>
  );
}