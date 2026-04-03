'use client';

import { FormEvent, useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserState } from '@/hooks/use-user-state';
import { signIn } from 'next-auth/react';
import { registerUser } from '@/actions/auth-actions';

interface LoginFormProps {
    isSubmitting?: boolean;
    setIsSubmitting?: (value: boolean) => void;
    isModal?: boolean;
    onSuccess?: () => void;
}

export function LoginForm({ isSubmitting: externalIsSubmitting, setIsSubmitting: externalSetIsSubmitting, isModal = false, onSuccess }: LoginFormProps) {
    const [localIsSubmitting, setLocalIsSubmitting] = useState(false);
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [error, setError] = useState<string | null>(null);

    // Use external state if provided, otherwise local
    const isSubmitting = externalIsSubmitting ?? localIsSubmitting;
    const setIsSubmitting = externalSetIsSubmitting ?? setLocalIsSubmitting;

    const router = useRouter();

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        setIsSubmitting(true);
        setError(null);
        try {
            await signIn(provider, { callbackUrl: '/profile' });
        } catch (err) {
            setError("Social login failed. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`w-full mx-auto ${isModal ? 'p-6' : 'max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-orange-100'}`}>
            {/* Header */}
            <div className="text-center mb-8 animate-fade-in-up">
                <h1 className={`${isModal ? 'text-2xl' : 'text-4xl'} font-bold text-gray-900 mb-2 animate-color-shift`}>
                    {mode === 'login' ? 'Welcome Back' : 'Join TalktoTaste'}
                </h1>
                <p className="text-gray-600 text-sm animate-blur-in" style={{ animationDelay: '0.1s' }}>
                    {mode === 'login' ? 'Continue your cooking journey' : 'Start your voice-guided cooking'}
                </p>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-4 rounded-full animate-shimmer"></div>
            </div>

            <div className="space-y-4">
                {/* Social Login - PRIORITY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <button
                        onClick={() => handleSocialLogin('google')}
                        disabled={isSubmitting}
                        className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 text-sm font-medium text-gray-700 hover:scale-105 transform hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Google
                    </button>
                    <button
                        onClick={() => handleSocialLogin('github')}
                        disabled={isSubmitting}
                        className="py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 text-sm font-medium text-gray-700 hover:scale-105 transform hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-gray-400 text-xs font-medium">OR EMAIL</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Manual Login/Signup Form */}
                <form action={async (formData) => {
                    setIsSubmitting(true);
                    setError(null);

                    if (mode === 'signup') {
                        try {
                            const res = await registerUser(formData);
                            if (res?.error) {
                                setError(res.error);
                                setIsSubmitting(false);
                            } else {
                                // Auto-login after successful signup
                                const loginRes = await signIn('credentials', {
                                    email: formData.get('email'),
                                    password: formData.get('password'),
                                    redirect: false,
                                });

                                if (loginRes?.error) {
                                    setError("Account created, but auto-login failed. Please sign in manually.");
                                    setMode('login');
                                    setIsSubmitting(false);
                                } else {
                                    router.push('/profile');
                                    if (onSuccess) onSuccess();
                                }
                            }
                        } catch (err) {
                            setError("Something went wrong during signup.");
                            setIsSubmitting(false);
                        }
                    } else {
                        try {
                            const res = await signIn('credentials', {
                                email: formData.get('email'),
                                password: formData.get('password'),
                                redirect: false,
                            });
                            if (res?.error) {
                                setError("Invalid email or password. Please check your credentials.");
                                setIsSubmitting(false);
                            } else {
                                router.push('/profile');
                                if (onSuccess) onSuccess();
                            }
                        } catch (e) {
                            router.push('/profile');
                            if (onSuccess) onSuccess();
                        }
                    }
                }} className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <LogIn className="w-5 h-5" />
                                {mode === 'login' ? 'Sign In with Email' : 'Create Account'}
                            </>
                        )}
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login');
                                setError(null);
                            }}
                            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                        >
                            {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
