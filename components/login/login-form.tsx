'use client';

import { FormEvent, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUserState } from '@/hooks/use-user-state';

interface LoginFormProps {
    isSubmitting: boolean;
    setIsSubmitting: (value: boolean) => void;
}

export function LoginForm({ isSubmitting, setIsSubmitting }: LoginFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const router = useRouter();
    const { login } = useUserState();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});

        // Validation
        let newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        // Simulate API call and set user state
        setTimeout(() => {
            setIsSubmitting(false);

            // Update user name from email
            const userName = email.split('@')[0];
            const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

            // Check for admin role
            const role = email === 'choudharykhushi499@gmail.com' ? 'admin' : 'user';

            login(displayName, email, role);

            router.push('/profile');
        }, 1500);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-orange-100 animate-scale-in hover:shadow-3xl transition-shadow duration-500">
                {/* Header */}
                <div className="text-center mb-8 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-color-shift">Welcome Back</h1>
                    <p className="text-gray-600 text-sm animate-blur-in" style={{ animationDelay: '0.1s' }}>to TalktoTaste</p>
                    <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto mt-4 rounded-full animate-shimmer"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-orange-600 transition-colors">
                            Email Address
                        </label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 w-5 h-5 text-orange-500 group-focus-within:text-orange-600 group-focus-within:animate-bounce-soft transition-colors" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 transform hover:scale-105 ${errors.email ? 'border-red-500 focus:border-red-600 animate-shake' : 'border-gray-200 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-200'
                                    } bg-gray-50 focus:bg-white text-gray-900`}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium animate-slide-up">{errors.email}</p>}
                    </div>

                    {/* Password Input */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-orange-600 transition-colors">
                            Password
                        </label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-orange-500 group-focus-within:text-orange-600 group-focus-within:animate-bounce-soft transition-colors" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300 transform hover:scale-105 ${errors.password ? 'border-red-500 focus:border-red-600 animate-shake' : 'border-gray-200 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-200'
                                    } bg-gray-50 focus:bg-white text-gray-900`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-gray-400 hover:text-orange-500 transition-all duration-300 hover:scale-125 active:scale-95"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium animate-slide-up">{errors.password}</p>}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer"
                            />
                            <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl disabled:shadow-none animate-fade-in-up transform hover:scale-105 hover:heartbeat disabled:scale-100 active:scale-95 relative overflow-hidden"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 animate-shimmer"></div>
                        <LogIn className="w-5 h-5 relative z-10" />
                        {isSubmitting ? (
                            <>
                                <span className="inline-block animate-spin relative z-10">⏳</span>
                                <span className="relative z-10">Signing in...</span>
                            </>
                        ) : (
                            <span className="relative z-10">Sign In</span>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-gray-400 text-xs font-medium">OR</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <button className="py-2 px-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 text-sm font-medium text-gray-700 hover:scale-105 transform hover:shadow-lg">
                        Google
                    </button>
                    <button className="py-2 px-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 text-sm font-medium text-gray-700 hover:scale-105 transform hover:shadow-lg">
                        GitHub
                    </button>
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 text-sm mt-6 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                    Don't have an account?{' '}
                    <a href="#" className="text-orange-500 hover:text-orange-600 font-bold transition-colors">
                        Sign up here
                    </a>
                </p>
            </div>
        </div>
    );
}
