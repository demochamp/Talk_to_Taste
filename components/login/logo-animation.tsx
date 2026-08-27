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
        <div className="flex flex-col items-center justify-center space-y-3">
            {/* Main Logo Container */}
            <div
                className="relative w-28 h-28 md:w-32 md:h-32"
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
                        className="w-full h-full object-contain drop-shadow-2xl animate-rotate"
                    />
                </div>

                {/* Floating Particles */}
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute w-2.5 h-2.5 bg-orange-400 rounded-full pointer-events-none animate-fade-in-up"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
                            opacity: 0,
                            animation: 'fadeInUp 0.8s ease-out forwards',
                        }}
                    ></div>
                ))}

                {/* Rotating Border */}
                <div className={`absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 p-1 transition-all duration-500 ${isHovered ? 'opacity-100 animate-spin' : 'opacity-0'}`} style={{ animation: isHovered ? 'spin 3s linear infinite' : 'none' }}></div>
            </div>

            {/* Text Content */}
            <div className="text-center space-y-2 animate-slide-in-right">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Cook with <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Voice</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto leading-tight">
                    Experience hands-free cooking with our voice-controlled recipe assistant. <span className="font-semibold text-orange-500">Perfect for Indian kitchens.</span>
                </p>

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-1.5 justify-center pt-1.5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold border border-orange-300 hover:bg-orange-200 transition-colors">
                        🎤 90+ Recipes
                    </div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold border border-orange-300 hover:bg-orange-200 transition-colors">
                        🌍 2 Languages
                    </div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold border border-orange-300 hover:bg-orange-200 transition-colors">
                        ⏱️ Smart Timers
                    </div>
                </div>
            </div>

            {/* Hover Indicator */}
            <div className="text-center space-y-1 animate-bounce-soft pt-1">
                <p className="text-[11px] text-gray-500 uppercase tracking-wide font-semibold">Hover to interact</p>
                <div className="flex justify-center gap-1">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
}




