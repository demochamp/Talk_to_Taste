"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { LoginForm } from "@/components/login/login-form"
import { LogoAnimation } from "@/components/login/logo-animation"
import { useUserState } from "@/hooks/use-user-state"

export function LoginModal() {
    const { isLoginModalOpen, closeLoginModal } = useUserState()

    return (
        <Dialog open={isLoginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
            {/* Increased max-width for side-by-side layout */}
            <DialogContent
                overlayClassName="bg-white"
                showCloseButton={false}
                className="sm:max-w-3xl max-h-[80vh] p-0 bg-white/95 backdrop-blur-xl border-orange-100 shadow-2xl rounded-3xl flex flex-col overflow-hidden"
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>Login to TalkToTaste</DialogTitle>
                    <DialogDescription>Access voice-controlled cooking features</DialogDescription>
                </DialogHeader>

                <div className="grid lg:grid-cols-2 h-full">
                    {/* Left: Branding & Animation (Hidden on small mobile, visible on larger screens) */}
                    <div className="hidden lg:flex flex-col items-center justify-center bg-orange-50/50 p-6 border-r border-orange-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-orange-500/[0.05] -z-10" />
                        <div className="scale-75 transform origin-center">
                            <LogoAnimation />
                        </div>
                    </div>

                    {/* Right: Login Form */}
                    <div className="p-2 flex items-center justify-center bg-white relative">
                        {/* Mobile Logo (Visible only on small screens) */}
                        <div className="lg:hidden absolute top-4 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
                            <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
                        </div>

                        <div className="w-full max-w-sm">
                            <LoginForm isModal={true} onSuccess={closeLoginModal} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
