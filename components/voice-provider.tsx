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

export type VoiceMode = "COMMAND" | "SEARCH" | "COOK"

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
    isFinal: boolean
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
        availableVoices: [],
        isFinal: false
    })

    const recognitionRef = useRef<any>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const lastErrorRef = useRef<string | null>(null)
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
            const isFinal = event.results[current].isFinal
            const rawTranscript = event.results[current][0].transcript
            // Remove trailing dot (.), Hindi Purna Viram (।), or question marks (?)
            const transcript = rawTranscript.replace(/[.।?]+$/, "").trim()

            setState((prev) => ({ ...prev, transcript, isFinal }))
        }

        recognition.onerror = (event: any) => {
            lastErrorRef.current = event.error
            // Don't show error for "no-speech" or "aborted" in continuous mode
            if (event.error === "no-speech" || event.error === "aborted") {
                if (shouldResumeRef.current) return;
            } else if (event.error !== "network") {
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
                            : event.error === "network"
                                ? "Network connection error. Please check your internet."
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
                // Use a slightly longer delay if it was a network error
                const isNetworkError = lastErrorRef.current === "network"
                const delay = isNetworkError ? 1500 : 100
                
                setTimeout(() => {
                    try {
                        if (shouldResumeRef.current) recognition.start()
                    } catch (e) {
                        console.error("Failed to restart recognition", e)
                    }
                }, delay)
            }
            
            // Clear last error ref after handling restart
            lastErrorRef.current = null
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

    // Load saved lang pref
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("talktotaste-lang") as Language
            if (saved === "hi-IN" || saved === "en-IN") {
                setState(prev => ({ ...prev, language: saved }))
            }
        }
    }, [])

    const setLanguage = useCallback((lang: Language) => {
        setState((prev) => ({ ...prev, language: lang }))
        if (typeof window !== "undefined") {
            localStorage.setItem("talktotaste-lang", lang)
        }
    }, [])

    // --- HELPER: SPLIT TEXT INTO SENTENCES ---
    const splitIntoSentences = (text: string): string[] => {
        if (!text) return []
        // Split by periods followed by a space, or exclamation/question marks
        // This regex handles both English (.) and Hindi (।) punctuation
        const sentences = text.split(/(?<=[.।!?])\s+/)
        return sentences.filter(s => s.trim().length > 0)
    }

    const audioQueueRef = useRef<string[]>([])
    const isProcessingQueueRef = useRef(false)

    const speak = useCallback(async (text: string, forceLang?: string) => {
        if (!text || typeof window === "undefined") return

        window.speechSynthesis.cancel()
        const targetLang = forceLang || state.language

        // 1. Browser Fallback Function
        const playBrowserFallback = (txt: string) => {
            console.warn("Falling back to Browser TTS for chunk:", txt)
            
            // Function to perform the actual speech
            const speakWithSystem = () => {
                const voices = window.speechSynthesis.getVoices()
                if (voices.length === 0) {
                    console.error("No browser voices available.")
                    processNextInQueue()
                    return
                }

                let selectedVoice: SpeechSynthesisVoice | undefined

                if (preferredVoiceURI) {
                    selectedVoice = voices.find(v => v.voiceURI === preferredVoiceURI)
                }
                if (!selectedVoice) {
                    selectedVoice = voices.find(v => v.name.includes("Microsoft Swara") || v.name.includes("Google Hindi"))
                }
                if (!selectedVoice) {
                    if (targetLang.startsWith("hi")) {
                        selectedVoice = voices.find(v => v.lang.includes("hi"))
                    } else {
                        selectedVoice = voices.find(v => v.lang.startsWith("en"))
                    }
                }
                if (!selectedVoice) selectedVoice = voices[0]

                const utter = new SpeechSynthesisUtterance(txt)
                if (selectedVoice) utter.voice = selectedVoice
                utter.lang = targetLang
                utter.rate = 1.05

                utter.onstart = () => setState(prev => ({ ...prev, isSpeaking: true, dialogState: "SPEAKING" }))
                utter.onend = () => processNextInQueue()
                utter.onerror = () => {
                    setState(prev => ({ ...prev, isSpeaking: false }))
                    processNextInQueue()
                }

                window.speechSynthesis.speak(utter)
            }

            // Chrome/Edge sometimes need a moment to load voices
            if (window.speechSynthesis.getVoices().length === 0) {
                window.speechSynthesis.onvoiceschanged = () => {
                    speakWithSystem()
                    window.speechSynthesis.onvoiceschanged = null
                }
            } else {
                speakWithSystem()
            }
        }

        // 2. Queue Management
        const chunks = splitIntoSentences(text)
        audioQueueRef.current = chunks
        
        if (isProcessingQueueRef.current) {
            // Already playing? Reset to start of NEW text
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.src = ""
            }
        }

        const processNextInQueue = async () => {
            if (audioQueueRef.current.length === 0) {
                isProcessingQueueRef.current = false
                setState(prev => ({ ...prev, isSpeaking: false, dialogState: prev.isListening ? "LISTENING" : "IDLE" }))
                return
            }

            isProcessingQueueRef.current = true
            const nextText = audioQueueRef.current.shift()!

            try {
                setState(prev => ({ ...prev, isSpeaking: true, dialogState: "SPEAKING" }))

                const response = await fetch("/api/tts", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        text: nextText,
                        language: targetLang,
                        gender: "female"
                    })
                })

                if (!response.ok) throw new Error(`API Error ${response.status}`)

                const audioBlob = await response.blob()
                const audioUrl = URL.createObjectURL(audioBlob)
                const audio = new Audio(audioUrl)
                audioRef.current = audio

                audio.onended = () => {
                    URL.revokeObjectURL(audioUrl)
                    processNextInQueue()
                }

                audio.onerror = () => {
                    playBrowserFallback(nextText)
                }

                await audio.play()

            } catch (err) {
                console.warn("Gemini TTS Error, falling back:", err)
                playBrowserFallback(nextText)
            }
        }

        // Start processing the queue
        processNextInQueue()

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
            audioQueueRef.current = []
            isProcessingQueueRef.current = false
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.src = ""
                audioRef.current = null
            }
            setState((prev) => ({ ...prev, isSpeaking: false, dialogState: prev.isListening ? "LISTENING" : "IDLE" }))
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
