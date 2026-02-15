'use client';

export function BackgroundElements() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Animated Circles Background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

            {/* Floating Particles */}
            <Particle top="10%" left="5%" delay="0s" />
            <Particle top="20%" left="85%" delay="0.5s" />
            <Particle top="60%" left="10%" delay="1s" />
            <Particle top="80%" left="80%" delay="1.5s" />
            <Particle top="40%" left="50%" delay="2s" />
            <Particle top="70%" left="30%" delay="2.5s" />
            <Particle top="15%" left="60%" delay="3s" />
            <Particle top="55%" left="75%" delay="3.5s" />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🍲</div>
            <div className="absolute bottom-20 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🔪</div>
            <div className="absolute top-1/2 left-1/4 text-5xl opacity-5 animate-float" style={{ animationDelay: '1s' }}>🌶️</div>
            <div className="absolute bottom-1/3 right-1/4 text-5xl opacity-5 animate-float" style={{ animationDelay: '3s' }}>🧈</div>

            {/* Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-5" width="100%" height="100%">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
    );
}

function Particle({ top, left, delay }: { top: string; left: string; delay: string }) {
    return (
        <div
            className="absolute w-2 h-2 bg-orange-400 rounded-full animate-float opacity-60"
            style={{
                top,
                left,
                animationDelay: delay,
                boxShadow: '0 0 20px rgba(255, 107, 29, 0.6)',
            }}
        ></div>
    );
}
