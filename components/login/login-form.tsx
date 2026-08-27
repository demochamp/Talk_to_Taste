'use client';

import { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
    const [socialLoading, setSocialLoading] = useState<'google' | 'github' | null>(null);
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const isSubmitting = (externalIsSubmitting ?? localIsSubmitting) || socialLoading !== null;
    const setIsSubmitting = externalSetIsSubmitting ?? setLocalIsSubmitting;

    const router = useRouter();

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        setSocialLoading(provider);
        setError(null);
        try {
            // NextAuth signIn will redirect to provider
            const res = await signIn(provider, { callbackUrl: '/profile', redirect: true });
            if (res?.error) {
                setError("Authentication failed. Please check provider settings or try again.");
                setSocialLoading(null);
            }
        } catch (err) {
            console.error("Social login error:", err);
            setError("Sign in encounter an issue. Please try again.");
            setSocialLoading(null);
        }

        // Safety fallback timer to prevent infinite spinner if popup is closed or blocked
        setTimeout(() => {
            setSocialLoading(null);
        }, 8000);
    };

    return (
        <div className={`w-full mx-auto ${isModal ? 'p-2 sm:p-6 bg-white rounded-2xl' : 'max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-orange-100'}`}>

            {/* Header */}
            <div className="text-center mb-3 sm:mb-5">
                <h1 className={`${isModal ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-black text-gray-900 tracking-tight mb-1`}>
                    {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm font-medium">
                    {mode === 'login' ? 'Continue your smart cooking journey' : 'Start your voice-guided cooking adventure'}
                </p>
                <div className="h-1 w-12 sm:w-14 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto mt-2 rounded-full"></div>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-3 sm:mb-5 border border-gray-200">
                <button
                    type="button"
                    onClick={() => { setMode('login'); setError(null); }}
                    className={`flex-1 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                        mode === 'login'
                            ? 'bg-white text-orange-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Sign In
                </button>
                <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(null); }}
                    className={`flex-1 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                        mode === 'signup'
                            ? 'bg-white text-orange-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Sign Up
                </button>
            </div>

            <div className="space-y-3 sm:space-y-4">
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        disabled={isSubmitting}
                        className="py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50/50 rounded-xl transition-all duration-200 text-xs sm:text-sm font-bold text-gray-900 bg-white shadow-sm flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                        {socialLoading === 'google' ? (
                            <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                        ) : (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        )}
                        <span>Google</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialLogin('github')}
                        disabled={isSubmitting}
                        className="py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50/50 rounded-xl transition-all duration-200 text-xs sm:text-sm font-bold text-gray-900 bg-white shadow-sm flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:opacity-60"
                    >
                        {socialLoading === 'github' ? (
                            <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin flex-shrink-0" />
                        ) : (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        )}
                        <span>GitHub</span>
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-2.5 sm:my-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-gray-400 text-[10px] sm:text-xs font-bold tracking-wider uppercase">Or with Email</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-2.5 sm:p-3 text-xs sm:text-sm text-red-800 bg-red-50 border border-red-200 rounded-xl font-medium flex items-start gap-2 shadow-sm">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">{error}</div>
                    </div>
                )}

                {/* Email / Password Form */}
                <form action={async (formData) => {
                    setIsSubmitting(true);
                    setError(null);

                    const email = (formData.get('email') as string || '').trim().toLowerCase();
                    const password = formData.get('password') as string;

                    if (!email || !password) {
                        setError('Please enter both email and password.');
                        setIsSubmitting(false);
                        return;
                    }

                    if (mode === 'signup') {
                        try {
                            const res = await registerUser(formData);
                            if (res?.error) {
                                setError(res.error);
                                setIsSubmitting(false);
                            } else {
                                const loginRes = await signIn('credentials', {
                                    email,
                                    password,
                                    redirect: false,
                                });

                                if (loginRes?.error) {
                                    setError("Account created successfully! Please click Sign In to continue.");
                                    setMode('login');
                                    setIsSubmitting(false);
                                } else {
                                    router.push('/profile');
                                    if (onSuccess) onSuccess();
                                }
                            }
                        } catch (err) {
                            setError("Unable to complete signup right now. Please use Google or GitHub sign in.");
                            setIsSubmitting(false);
                        }
                    } else {
                        try {
                            const res = await signIn('credentials', {
                                email,
                                password,
                                redirect: false,
                            });
                            if (res?.error) {
                                setError("Invalid email or password. Don't have an account? Click Sign Up above!");
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
                }} className="space-y-3 sm:space-y-4">

                    <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 pointer-events-none" />
                            <input
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                style={{ color: '#111827', backgroundColor: '#ffffff' }}
                                className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white text-gray-900 placeholder:text-gray-400 font-semibold text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1">Password</label>
                        <div className="relative flex items-center">
                            <Lock className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500 pointer-events-none" />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={6}
                                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                                style={{ color: '#111827', backgroundColor: '#ffffff' }}
                                className="w-full pl-9 sm:pl-11 pr-10 sm:pr-11 py-2 sm:py-2.5 bg-white text-gray-900 placeholder:text-gray-400 font-semibold text-sm sm:text-base border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all shadow-sm"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 sm:right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none p-1 rounded-md transition-colors cursor-pointer"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                                ) : (
                                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                                )}
                            </button>
                        </div>
                    </div>


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 cursor-pointer mt-2 sm:mt-3 disabled:opacity-60"
                    >
                        {isSubmitting && socialLoading === null ? (
                            <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                {mode === 'login' ? <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> : <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />}
                                <span>{mode === 'login' ? 'Sign In with Email' : 'Create My Account'}</span>
                            </>
                        )}
                    </button>

                    <div className="text-center pt-1">
                        <button
                            type="button"
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login');
                                setError(null);
                            }}
                            className="text-xs sm:text-sm text-orange-600 hover:text-orange-700 font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                        >
                            {mode === 'login' ? (
                                <>New to TalkToTaste? <span className="underline">Create an account</span></>
                            ) : (
                                <>Already have an account? <span className="underline">Sign in</span></>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}



