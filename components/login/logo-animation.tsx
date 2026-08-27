'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export function LogoAnimation() {
    const [isHovered, setIsHovered] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

    useEffect(() => {
        if (!isHovered) return;

        const generateParticles = () => {
            const newParticles = Array.from({ length: 8 }, (_, i) => ({
                id: i,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
            }));
            setParticles(newParticles);

            const timer = setTimeout(() => setParticles([]), 800);
            return () => clearTimeout(timer);
        };

        const interval = setInterval(generateParticles, 600);
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div className="flex flex-col items-center justify-center space-y-3 max-w-xs text-center">
            {/* Main Logo Container */}
            <div
                className="relative w-20 h-20 sm:w-24 sm:h-24"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Animated Background Glow */}
                <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-500 ${isHovered ? 'bg-orange-300 opacity-60 scale-125' : 'bg-orange-200 opacity-30'}`}></div>

                {/* Logo Image */}
                <div className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    <img
                        src="/logo.png"
                        alt="TalktoTaste Chef"
                        className="w-full h-full object-contain drop-shadow-lg"
                    />
                </div>

                {/* Floating Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-orange-400 rounded-full pointer-events-none animate-fade-in-up"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
                            opacity: 0,
                            animation: 'fadeInUp 0.8s ease-out forwards',
                        }}
                    ></div>
                ))}
            </div>

            {/* Text Content */}
            <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Cook with <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Voice</span>
                </h2>
                <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                    Experience hands-free cooking with your voice-controlled recipe assistant. <span className="font-semibold text-orange-500">Perfect for Indian kitchens.</span>
                </p>

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-2">
                    <div className="px-2.5 py-0.5 bg-orange-100/80 text-orange-700 rounded-full text-[11px] font-bold border border-orange-200">
                        🎤 90+ Recipes
                    </div>
                    <div className="px-2.5 py-0.5 bg-orange-100/80 text-orange-700 rounded-full text-[11px] font-bold border border-orange-200">
                        🌍 2 Languages
                    </div>
                    <div className="px-2.5 py-0.5 bg-orange-100/80 text-orange-700 rounded-full text-[11px] font-bold border border-orange-200">
                        ⏱️ Smart Timers
                    </div>
                </div>
            </div>
        </div>
    );
}

