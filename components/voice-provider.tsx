"use client"

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react"

export type Language = "en-IN" | "hi-IN"

declare global {
    interface Window {
        SpeechRecognition: any
        webkitSpeechRecognition: any
    }
}


export type DialogState = "IDLE" | "LISTENING" | "PROCESSING" | "SPEAKING"

export type VoiceMode = "COMMAND" | "SEARCH"

export interface VoiceState {
    isListening: boolean
    isSpeaking: boolean
    transcript: string
    error: string | null
    language: Language
    dialogState: DialogState
    isContinuous: boolean
    mode: VoiceMode
    currentVoice: SpeechSynthesisVoice | null
    availableVoices: SpeechSynthesisVoice[]
}

interface VoiceContextType extends VoiceState {
    startListening: (config?: { continuous?: boolean; mode?: VoiceMode }) => void
    stopListening: () => void
    speak: (text: string, lang?: Language) => void
    stopSpeaking: () => void
    setLanguage: (lang: Language) => void
    isSupported: boolean
    clearTranscript: () => void
    setVoicePreference: (voiceURI: string) => void
}

import { UserContext } from "@/components/user-provider"
import { processVoiceCommand, CommandMatch } from "@/lib/voice/command-processor"

const VoiceContext = createContext<VoiceContextType | null>(null)

export function VoiceProvider({ children }: { children: React.ReactNode }) {
    // Consume UserContext to check login status
    const userContext = useContext(UserContext)

    const [state, setState] = useState<VoiceState>({
        isListening: false,
        isSpeaking: false,
        transcript: "",
        error: null,
        language: "en-IN",
        dialogState: "IDLE",
        isContinuous: false,
        mode: "COMMAND",
        currentVoice: null,
        availableVoices: []
    })

    const recognitionRef = useRef<any>(null)
    const [isSupported, setIsSupported] = useState(false)
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

    // Resume listening ref to handle closure staleness
    const shouldResumeRef = useRef(false)

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

        recognition.continuous = false // We manually restart for better control
        recognition.interimResults = true
        recognition.lang = state.language

        recognition.onstart = () => {
            setState((prev) => ({
                ...prev,
                isListening: true,
                error: null,
                dialogState: "LISTENING"
            }))
        }

        recognition.onresult = (event: any) => {
            const current = event.resultIndex
            const rawTranscript = event.results[current][0].transcript
            // Remove trailing dot (.), Hindi Purna Viram (।), or question marks (?)
            const transcript = rawTranscript.replace(/[.।?]+$/, "").trim()

            setState((prev) => ({ ...prev, transcript }))
        }

        recognition.onerror = (event: any) => {
            // Don't show error for "no-speech" or "aborted" in continuous mode
            if (event.error === "no-speech" || event.error === "aborted") {
                if (shouldResumeRef.current) return;
            } else {
                console.error("Speech recognition error", event.error)
            }

            setState((prev) => ({
                ...prev,
                isListening: false,
                dialogState: "IDLE",
                error:
                    event.error === "not-allowed"
                        ? "Microphone access denied. Please allow microphone access."
                        : event.error === "no-speech"
                            ? null
                            : `Voice error: ${event.error}`,
            }))

            if (event.error === "not-allowed") {
                shouldResumeRef.current = false
            }
        }

        recognition.onend = () => {
            setState((prev) => ({
                ...prev,
                isListening: false,
                dialogState: prev.isSpeaking ? "SPEAKING" : "IDLE"
            }))

            // Auto-restart if continuous
            if (shouldResumeRef.current) {
                // Small delay to prevent tight loops
                setTimeout(() => {
                    try {
                        if (shouldResumeRef.current) recognition.start()
                    } catch (e) {
                        console.error("Failed to restart recognition", e)
                    }
                }, 100)
            }
        }

        recognitionRef.current = recognition

        return () => {
            recognition.abort()
        }
    }, [isSupported, state.language]) // Re-init when language changes

    const startListening = useCallback((config?: { continuous?: boolean; mode?: VoiceMode }) => {
        if (!recognitionRef.current) return

        const continuous = config?.continuous ?? false
        const mode = config?.mode ?? "COMMAND"

        shouldResumeRef.current = continuous

        setState((prev) => ({
            ...prev,
            transcript: "",
            error: null,
            isContinuous: continuous,
            mode: mode
        }))

        try {
            recognitionRef.current.start()
        } catch (e) {
            // Already started?
            console.log("Recognition start called but maybe active", e)
        }
    }, [])

    const stopListening = useCallback(() => {
        shouldResumeRef.current = false
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
                // Also update state availableVoices
                setState(prev => ({ ...prev, availableVoices }))
            }
        }

        loadVoices()
        window.speechSynthesis.onvoiceschanged = loadVoices
        return () => {
            window.speechSynthesis.onvoiceschanged = null
        }
    }, [])

    const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null)
    const [preferredVoiceURI, setPreferredVoiceURI] = useState<string | null>(null)

    // Load saved voice pref
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("talktotaste-voice-pref")
            if (saved) setPreferredVoiceURI(saved)
        }
    }, [])

    const setLanguage = useCallback((lang: Language) => {
        setState((prev) => ({ ...prev, language: lang }))
        if (typeof window !== "undefined") {
            localStorage.setItem("talktotaste-lang", lang)
        }
    }, [state.language, voices, preferredVoiceURI])

    // --- GEMINI API TTS STRATEGY ---
    const speak = useCallback(async (text: string, forceLang?: string) => {
        if (!text || typeof window === "undefined") return

        window.speechSynthesis.cancel()

        // Determine language
        const targetLang = forceLang || state.language

        // 1. Browser Fallback Function
        const playBrowserFallback = () => {
            console.warn("Falling back to Browser TTS")
            const voices = window.speechSynthesis.getVoices()
            let selectedVoice: SpeechSynthesisVoice | undefined

            // Priority 1: User Preference
            if (preferredVoiceURI) {
                selectedVoice = voices.find(v => v.voiceURI === preferredVoiceURI)
            }
            // Priority 2: Swara
            if (!selectedVoice) {
                selectedVoice = voices.find(v => v.name.includes("Microsoft Swara"))
            }
            // Priority 3: Language Match
            if (!selectedVoice) {
                if (targetLang.startsWith("hi")) {
                    selectedVoice = voices.find(v => v.lang.includes("hi"))
                } else {
                    selectedVoice = voices.find(v => v.lang.startsWith("en"))
                }
            }
            // Priority 4: Default
            if (!selectedVoice) selectedVoice = voices[0]

            const utter = new SpeechSynthesisUtterance(text)
            if (selectedVoice) utter.voice = selectedVoice
            utter.lang = targetLang
            utter.rate = 0.9

            utter.onstart = () => setState(prev => ({ ...prev, isSpeaking: true, dialogState: "SPEAKING" }))
            utter.onend = () => setState(prev => ({ ...prev, isSpeaking: false, dialogState: prev.isListening ? "LISTENING" : "IDLE" }))
            utter.onerror = (e) => setState(prev => ({ ...prev, isSpeaking: false }))

            window.speechSynthesis.speak(utter)
        }

        // 2. Attempt API Call
        try {
            setState(prev => ({ ...prev, isSpeaking: true, dialogState: "SPEAKING" }))

            const response = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text,
                    language: targetLang,
                    gender: "female"
                })
            })

            if (!response.ok) {
                const errorDetail = await response.text()
                throw new Error(`API Error ${response.status}: ${errorDetail}`)
            }

            const audioBlob = await response.blob()
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)

            audio.onended = () => {
                setState(prev => ({ ...prev, isSpeaking: false, dialogState: prev.isListening ? "LISTENING" : "IDLE" }))
                URL.revokeObjectURL(audioUrl)
            }

            audio.onerror = () => playBrowserFallback()

            await audio.play()

        } catch (err: any) {
            // Graceful handling for Quota limits
            if (err.message.includes("429") || err.message.includes("Quota")) {
                console.warn("Gemini TTS Rate Limit Hit (Free Tier). Switching to standard voice.")
            } else {
                console.warn("Gemini TTS Error:", err.message)
            }
            playBrowserFallback()
        }
    }, [state.language, preferredVoiceURI])

    const setVoicePreference = useCallback((voiceURI: string) => {
        setPreferredVoiceURI(voiceURI)
        if (typeof window !== "undefined") {
            if (voiceURI) {
                localStorage.setItem("talktotaste-voice-pref", voiceURI)
            } else {
                localStorage.removeItem("talktotaste-voice-pref")
            }
        }
    }, [])

    const stopSpeaking = useCallback(() => {
        if (typeof window !== "undefined") {
            window.speechSynthesis.cancel()
            setState((prev) => ({ ...prev, isSpeaking: false }))
        }
    }, [])

    const clearTranscript = useCallback(() => {
        setState((prev) => ({ ...prev, transcript: "" }))
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
                isSupported,
                clearTranscript,
                availableVoices: voices,
                setVoicePreference
            }}
        >
            {children}
        </VoiceContext.Provider>
    )
}

export { VoiceContext }
