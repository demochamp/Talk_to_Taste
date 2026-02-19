
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVoice } from "@/hooks/use-voice"
import { useRouter } from "next/navigation"
import { VoiceWaveAnimation } from "./voice-wave-animation"
import { useTheme } from "next-themes"
import { processVoiceCommand } from "@/lib/voice/command-processor"

export function GlobalVoiceControl({ hideTrigger }: { hideTrigger?: boolean }) {
    const router = useRouter()
    const { setTheme } = useTheme()
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        isSupported,
        stopSpeaking
    } = useVoice()

    // Handle global commands
    useEffect(() => {
        if (transcript) {
            const match = processVoiceCommand(transcript)
            if (match.confidence > 0.8) { // Only act on high confidence
                switch (match.intent) {
                    case "NAV_HOME":
                        router.push("/")
                        break
                    case "NAV_RECIPES":
                        router.push("/recipes")
                        break
                    case "NAV_PROFILE":
                        router.push("/profile")
                        break
                    case "NAV_FEATURES":
                        router.push("/#features")
                        break
                    case "NAV_HOW_IT_WORKS":
                        router.push("/#how-it-works")
                        break
                    // Add other global handlers here
                }
            }
        }
    }, [transcript, router])

    const toggleListening = () => {
        if (isListening) {
            stopListening()
        } else {
            startListening()
        }
    }
    if (!isSupported) return null

    return (
        <>
            {!hideTrigger && (
                <Button
                    size="icon"
                    variant="ghost"
                    className={`rounded-full w-10 h-10 transition-all duration-300 ${isListening ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600" : "hover:bg-primary/10 hover:text-primary"
                        }`}
                    onClick={toggleListening}
                    title="Voice Control"
                >
                    {isListening ? (
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <Mic className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <Mic className="w-5 h-5" />
                    )}
                </Button>
            )}

            {/* Persistent overlay when listening (Desktop) */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 hidden md:flex items-center gap-4 p-4 rounded-2xl glass-card shadow-2xl border border-primary/20"
                    >
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider">Listening...</span>
                            <span className="text-sm text-foreground max-w-[200px] truncate">
                                {transcript || "Say 'Go to Recipes' or 'Find Pasta'..."}
                            </span>
                        </div>
                        <div className="h-8 w-12 flex items-center justify-center">
                            <VoiceWaveAnimation isActive={true} />
                        </div>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                            onClick={stopListening}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
