"use client"

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"

// Types definitions from original hook
type Language = "en-IN" | "hi-IN"

declare global {
    interface Window {
        SpeechRecognition: any
        webkitSpeechRecognition: any
    }
}

interface VoiceState {
    isListening: boolean
    isSpeaking: boolean
    transcript: string
    error: string | null
    language: Language
}

interface VoiceContextType extends VoiceState {
    startListening: () => void
    stopListening: () => void
    speak: (text: string, lang?: Language) => void
    stopSpeaking: () => void
    setLanguage: (lang: Language) => void
    isSupported: boolean
}

const VoiceContext = createContext<VoiceContextType | null>(null)

export function VoiceProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<VoiceState>({
        isListening: false,
        isSpeaking: false,
        transcript: "",
        error: null,
        language: "en-IN",
    })

    const recognitionRef = useRef<any>(null)
    const [isSupported, setIsSupported] = useState(false)
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    useEffect(() => {
        setIsSupported(
            typeof window !== "undefined" &&
            ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) &&
            "speechSynthesis" in window
        )
    }, [])

    // Initialize Speech Recognition
    useEffect(() => {
        if (!isSupported) return

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = state.language

        recognition.onstart = () => {
            setState((prev) => ({ ...prev, isListening: true, error: null }))
        }

        recognition.onresult = (event: any) => {
            const current = event.resultIndex
            const transcript = event.results[current][0].transcript
            setState((prev) => ({ ...prev, transcript }))
        }

        recognition.onerror = (event: any) => {
            setState((prev) => ({
                ...prev,
                isListening: false,
                error:
                    event.error === "not-allowed"
                        ? "Microphone access denied. Please allow microphone access."
                        : `Voice recognition error: ${event.error}`,
            }))
        }

        recognition.onend = () => {
            setState((prev) => ({ ...prev, isListening: false }))
        }

        recognitionRef.current = recognition

        return () => {
            recognition.abort()
        }
    }, [isSupported, state.language])

    const startListening = useCallback(() => {
        if (!recognitionRef.current || state.isListening) return

        setState((prev) => ({ ...prev, transcript: "", error: null }))
        try {
            recognitionRef.current.start()
        } catch (e) {
            console.error("Failed to start recognition:", e)
        }
    }, [state.isListening])

    const stopListening = useCallback(() => {
        if (!recognitionRef.current) return
        recognitionRef.current.stop()
    }, [])

    // Speech Synthesis Setup
    useEffect(() => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices()
            if (availableVoices.length > 0) {
                setVoices(availableVoices)
            }
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
        return () => {
            window.speechSynthesis.onvoiceschanged = null
        }
    }, [])

    const speak = useCallback((text: string) => {
        if (!text || typeof window === "undefined") return

        window.speechSynthesis.cancel()
        const utter = new SpeechSynthesisUtterance(text)

        // Voice selection logic
        let availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices()

        if (state.language === "hi-IN") {
            const hiVoice =
                availableVoices.find(v => v.lang === "hi-IN") ||
                availableVoices.find(v => v.lang.startsWith("hi")) ||
                availableVoices.find(v => v.name.toLowerCase().includes("hindi")) ||
                availableVoices.find(v => v.name.includes("हिन्दी"))

            if (hiVoice) {
                utter.voice = hiVoice
                utter.lang = "hi-IN"
            } else {
                utter.lang = "hi-IN"
            }
        } else {
            const enVoice =
                availableVoices.find(v => v.lang === "en-IN") ||
                availableVoices.find(v => v.lang.startsWith("en"))
            if (enVoice) utter.voice = enVoice
            utter.lang = "en-IN"
        }

        utter.rate = 0.9
        utter.pitch = 1
        utter.onstart = () => setState(prev => ({ ...prev, isSpeaking: true }))
        utter.onend = () => setState(prev => ({ ...prev, isSpeaking: false }))
        utter.onerror = (e) => {
            if (e.error !== "interrupted" && e.error !== "canceled") {
                console.error("Speech error", e)
            }
            setState(prev => ({ ...prev, isSpeaking: false }))
        }

        window.speechSynthesis.speak(utter)
    }, [state.language, voices])

    const stopSpeaking = useCallback(() => {
        if (typeof window !== "undefined") {
            window.speechSynthesis.cancel()
            setState((prev) => ({ ...prev, isSpeaking: false }))
        }
    }, [])

    const setLanguage = useCallback((lang: Language) => {
        setState((prev) => ({ ...prev, language: lang }))
    }, [])

    return (
        <VoiceContext.Provider
            value={{
                ...state,
                startListening,
                stopListening,
                speak,
                stopSpeaking,
                setLanguage,
                isSupported
            }}
        >
            {children}
        </VoiceContext.Provider>
    )
}

export { VoiceContext }
