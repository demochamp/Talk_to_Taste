"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { LoginForm } from "@/components/login/login-form"
import { LogoAnimation } from "@/components/login/logo-animation"
import { useUserState } from "@/hooks/use-user-state"

export function LoginModal() {
    const { isLoginModalOpen, closeLoginModal } = useUserState()

    return (
        <Dialog open={isLoginModalOpen} onOpenChange={(open) => !open && closeLoginModal()}>
            <DialogContent
                showCloseButton={true}
                className="w-[95vw] max-w-[440px] lg:max-w-3xl max-h-[88vh] p-0 bg-white border-orange-100 shadow-2xl rounded-3xl flex flex-col overflow-hidden outline-none mt-8 sm:mt-12"
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>Login to TalkToTaste</DialogTitle>
                    <DialogDescription>Access voice-controlled cooking features</DialogDescription>
                </DialogHeader>

                <div className="grid lg:grid-cols-2 h-full max-h-[88vh] overflow-hidden">
                    {/* Left: Branding & Animation (Hidden on small mobile, visible on larger screens) */}
                    <div className="hidden lg:flex flex-col items-center justify-center bg-orange-50/70 p-6 sm:p-8 border-r border-orange-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-orange-500/[0.05] -z-10" />
                        <LogoAnimation />
                    </div>

                    {/* Right: Login Form */}
                    <div className="p-4 sm:p-6 md:p-8 flex items-center justify-center bg-white relative overflow-y-auto max-h-[88vh]">
                        <div className="w-full max-w-sm py-2">
                            <LoginForm isModal={true} onSuccess={closeLoginModal} />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}




