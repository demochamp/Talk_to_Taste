'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/login/login-form';
import { LogoAnimation } from '@/components/login/logo-animation';
import { BackgroundElements } from '@/components/login/background-elements';
import { useUserState } from '@/hooks/use-user-state';
import { useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';

export default function LoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user, logout, isLoaded } = useUserState();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.refresh();
    };

    if (!isLoaded) return null;

    if (user.isLoggedIn) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden relative flex items-center justify-center">
                <BackgroundElements />
                <div className="relative z-10 w-full max-w-md p-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-orange-100 text-center animate-scale-in">
                    <div className="w-24 h-24 bg-orange-100 rounded-full mx-auto flex items-center justify-center mb-6 animate-float">
                        <User className="w-12 h-12 text-orange-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, {user.name}!</h1>
                    <p className="text-gray-600 mb-8">You are already logged in via TalktoTaste account.</p>

                    <div className="space-y-4">
                        <button
                            onClick={() => router.push('/profile')}
                            className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            Go to Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full py-3 px-4 bg-white border-2 border-orange-200 text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-5 h-5" />
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden relative">
            <BackgroundElements />

            <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
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
                    <div className="lg:hidden flex justify-center items-center mb-8 animate-fade-in-up order-first">
                        {/* Simple logo for mobile if strict animation is too heavy, or reuse component */}
                        <div className="w-32 h-32 relative">
                            {/* We can reuse LogoAnimation but it might be big, let's just use the image for now or the component if it fits */}
                            <img src="/logo.png" alt="TalktoTaste" className="w-full h-full object-contain animate-rotate" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
