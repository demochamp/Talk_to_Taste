'use client';

import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import LogoAnimation from '@/components/LogoAnimation';
import BackgroundElements from '@/components/BackgroundElements';

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
      <BackgroundElements />
      
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl w-full">
          {/* Left side - Logo Animation */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <LogoAnimation />
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full">
            <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <LoginForm isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} />
            </div>
          </div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center items-center mb-8 animate-fade-in-up">
            <div className="w-32 h-32">
              <img src="/logo.png" alt="TalktoTaste" className="w-full h-full object-contain animate-rotate" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
