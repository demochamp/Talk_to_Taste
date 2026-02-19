'use client';

import { useState, useEffect, useRef } from 'react';
import { useUserState } from '@/hooks/use-user-state';
import { usePathname } from 'next/navigation';

export function ScrollGate() {
    const { user, isLoaded, openLoginModal, isLoginModalOpen } = useUserState();
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);

    // Keep track of login state in a ref to always have fresh value in event listeners
    const isLoggedInRef = useRef(user.isLoggedIn);

    useEffect(() => {
        isLoggedInRef.current = user.isLoggedIn;
    }, [user.isLoggedIn]);

    // Exclude login page, admin dashboard, and api routes from triggering the lock
    const isExcluded = pathname === '/login' || pathname.startsWith('/admin') || pathname.startsWith('/api');

    // Force a 2-second delay before the gate even THINKS about working
    // This allows the website to load, animations to play, and user to see "The Website"
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoaded || isExcluded || !isReady) return;

        const handleScroll = () => {
            // Check REF not state to avoid stale closure
            if (isLoggedInRef.current) return;

            // Show modal if user scrolls more than 300px (Let them see the Hero section first)
            if (window.scrollY > 300 && !isLoginModalOpen) {
                console.log("ScrollGate: Triggered by Scroll");
                openLoginModal();
            }
        };

        const handleClick = (e: MouseEvent) => {
            // Check REF not state to avoid stale closure
            if (isLoggedInRef.current) return;

            // IGNORE clicks on the Voice Assistant (Bot) sections
            const target = e.target as HTMLElement;
            if (
                target.closest('.voice-demo-section') ||
                target.closest('[data-role="voice-assistant"]') ||
                target.closest('#assistant-ui-root')
            ) {
                console.log("ScrollGate: Ignored click on Assistant/Bot");
                return; // Allow interaction with bot
            }

            console.log("ScrollGate: Click detected. Logged In Ref:", isLoggedInRef.current);

            if (!isLoginModalOpen) {
                // Open on any click roughly in the content area 
                openLoginModal();
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', handleClick, true);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleClick, true);
        };
    }, [isLoaded, isExcluded, isLoginModalOpen, openLoginModal, isReady]);

    // This component is now just a logic controller, it doesn't render anything itself
    // The <LoginModal /> in RootLayout will listen to the openLoginModal state.
    return null;
}
