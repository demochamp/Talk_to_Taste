"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, X, MessageCircle, ChevronRight, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useVoice, parseVoiceCommand } from "@/hooks/use-voice"

export function HelpAssistant() {
    const pathname = usePathname()
    const { transcript, isListening, speak } = useVoice()
    const [isOpen, setIsOpen] = useState(false)
    const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null)

    // Auto-open on "Help" command
    useEffect(() => {
        if (transcript) {
            const command = parseVoiceCommand(transcript)
            if (command && command.action === "OPEN_HELP") {
                setIsOpen(true)
                speak("Here are some things you can say.")
            }
        }
    }, [transcript, speak])

    // Context-aware suggestions
    const getSuggestions = () => {
        if (pathname === "/") {
            return [
                { command: "Find Butter Chicken", label: "Search for a recipe" },
                { command: "Go to Recipes", label: "Browse all recipes" },
                { command: "Switch to Dark Mode", label: "Change theme" },
                { command: "What can I cook with Paneer?", label: "Search by ingredient" },
            ]
        }
        if (pathname.startsWith("/recipes")) {
            return [
                { command: "Find Pasta", label: "refine search" },
                { command: "Go to Home", label: "Back to home" },
            ]
        }
        if (pathname.startsWith("/cook")) {
            return [
                { command: "Next Step", label: "Go to next step" },
                { command: "Repeat", label: "Repeat instruction" },
                { command: "Set timer for 5 minutes", label: "Start a timer" },
                { command: "How many whistles?", label: "Check pressure cooker whistles" },
            ]
        }
        return [
            { command: "Go to Home", label: "Go Home" },
            { command: "Go to Recipes", label: "Browse Recipes" },
            { command: "Switch to Dark Mode", label: "Change Theme" },
        ]
    }

    const suggestions = getSuggestions()

    return (
        <>
            {/* Floating Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-40"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground hover:scale-110"}`}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <ChefHat className="w-6 h-6" />}
                </Button>
            </motion.div>

            {/* Helper Dialog */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 z-40 w-80 md:w-96 glass-card rounded-3xl overflow-hidden shadow-2xl border border-primary/20"
                    >
                        {/* Header */}
                        <div className="bg-primary/10 p-4 flex items-center gap-3 border-b border-primary/10">
                            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                                <ChefHat className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground">Chef Assistant</h3>
                                <p className="text-xs text-muted-foreground">I'm listening! Try saying...</p>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 bg-background/80 backdrop-blur-md">
                            <div className="space-y-3">
                                {suggestions.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 transition-colors cursor-pointer border border-transparent hover:border-primary/20"
                                        onClick={() => {
                                            // We could actively trigger the command here if we wanted
                                            // For now just show it
                                            speak(`Try saying: ${item.command}`)
                                        }}
                                    >
                                        <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <MessageCircle className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-sm text-foreground">"{item.command}"</div>
                                            <div className="text-xs text-muted-foreground">{item.label}</div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <HelpCircle className="w-3 h-3" />
                                    <span>Just say "Help" to open this</span>
                                </div>
                                {isListening && <span className="text-primary animate-pulse font-medium">Listening...</span>}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
