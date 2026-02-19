"use client"

import { useState, useEffect } from "react"
import { useVoice } from "@/hooks/use-voice"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function LanguageSelectorModal() {
    const { setLanguage, language } = useVoice()
    const [isOpen, setIsOpen] = useState(false)
    const [hasSelected, setHasSelected] = useState(false)

    useEffect(() => {
        // Check if language was previously selected by user
        const saved = localStorage.getItem("talktotaste-lang")
        if (!saved) {
            setIsOpen(true)
        }
    }, [])

    const handleSelect = (lang: "en-IN" | "hi-IN") => {
        setLanguage(lang)
        setHasSelected(true)
        setTimeout(() => {
            setIsOpen(false)
        }, 500)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-card text-card-foreground border-2 border-primary/20 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-300">
                <div className="text-center space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold">Choose your language</h2>
                        <p className="text-muted-foreground">भाषा चुनें</p>
                    </div>

                    <div className="space-y-1">
                        <p className="font-medium">Welcome! How would you like to interact with me?</p>
                        <p className="font-medium text-lg text-primary">नमस्ते! आप मुझसे कैसे बात करना चाहेंगे?</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 pt-4">
                        <Button
                            variant={language === "en-IN" && hasSelected ? "default" : "outline"}
                            className="h-14 text-lg justify-between px-6 border-2 hover:border-primary/50 hover:bg-primary/5"
                            onClick={() => handleSelect("en-IN")}
                        >
                            <span className="flex flex-col items-start">
                                <span className="font-bold">English (India)</span>
                                <span className="text-xs font-normal opacity-70">Talk in English</span>
                            </span>
                            {language === "en-IN" && hasSelected && <Check className="w-5 h-5" />}
                        </Button>

                        <Button
                            variant={language === "hi-IN" && hasSelected ? "default" : "outline"}
                            className="h-14 text-lg justify-between px-6 border-2 hover:border-primary/50 hover:bg-primary/5"
                            onClick={() => handleSelect("hi-IN")}
                        >
                            <span className="flex flex-col items-start">
                                <span className="font-bold">हिंदी (India)</span>
                                <span className="text-xs font-normal opacity-70">हिंदी में बात करें</span>
                            </span>
                            {language === "hi-IN" && hasSelected && <Check className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
