"use client"

import { useState, useCallback, useEffect, useRef } from "react"
type SpeechRecognitionType =
  typeof window.SpeechRecognition | typeof window.webkitSpeechRecognition

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

type Language = "en-IN" | "hi-IN"

interface VoiceState {
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  error: string | null
  language: Language
}

interface UseVoiceReturn extends VoiceState {
  startListening: () => void
  stopListening: () => void
  speak: (text: string, lang?: Language) => void
  stopSpeaking: () => void
  setLanguage: (lang: Language) => void
  isSupported: boolean
}

export function useVoice(): UseVoiceReturn {
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    transcript: "",
    error: null,
    language: "en-IN",
  })

  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const [isSupported, setIsSupported] = useState(false)

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

  // Update recognition language when it changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = state.language
    }
  }, [state.language])

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

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

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

    // Force load voices
    let availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices()

    // Retry finding voices if empty
    if (availableVoices.length === 0) {
      // Allow a tiny delay or just proceed with lang setting? 
      // We can't delay synchronously. We proceed, hoping the OS handles the 'lang' tag.
      console.warn("Voices not loaded yet. Reliance on OS default.")
    }

    if (state.language === "hi-IN") {
      // Robust Hindi Voice Selection Strategy
      // 1. Exact match for hi-IN
      // 2. Starts with hi (hi-IN, hi_IN)
      // 3. Includes "hindi" or "हिन्दी" in name
      const hiVoice =
        availableVoices.find(v => v.lang === "hi-IN") ||
        availableVoices.find(v => v.lang.startsWith("hi")) ||
        availableVoices.find(v => v.name.toLowerCase().includes("hindi")) ||
        availableVoices.find(v => v.name.includes("हिन्दी"))

      if (hiVoice) {
        utter.voice = hiVoice
        utter.lang = "hi-IN"
        console.log("Using Hindi Voice:", hiVoice.name)
      } else {
        console.warn("No specific Hindi voice found. Falling back to 'hi-IN' locale.")
        utter.lang = "hi-IN"
      }

    } else {
      // English Fallback
      const enVoice =
        availableVoices.find(v => v.lang === "en-IN") ||
        availableVoices.find(v => v.lang.startsWith("en"))

      if (enVoice) utter.voice = enVoice
      utter.lang = "en-IN"
    }

    utter.rate = 0.9
    utter.pitch = 1

    utter.onstart = () =>
      setState(prev => ({ ...prev, isSpeaking: true }))

    utter.onend = () =>
      setState(prev => ({ ...prev, isSpeaking: false }))

    utter.onerror = (e) => {
      if (e.error === "interrupted" || e.error === "canceled") {
        setState(prev => ({ ...prev, isSpeaking: false }))
        return
      }
      console.error("Speech synthesis error:", e)
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

  return {
    ...state,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    setLanguage,
    isSupported,
  }
}

// Voice command parser
export function parseVoiceCommand(transcript: string): {
  action: string
  params: Record<string, string | number>
} | null {
  const text = transcript.toLowerCase().trim()

  // Help commands
  if (text.includes("help") || text.includes("madad") || text.includes("bot") || text.includes("assistant") || text.includes("what can i say") || text.includes("kya bolu") || text.includes("commands")) {
    return { action: "OPEN_HELP", params: {} }
  }

  // Theme commands
  if (text.includes("dark mode") || text.includes("switch to dark")) {
    return { action: "SET_THEME", params: { theme: 'dark' } }
  }
  if (text.includes("light mode") || text.includes("switch to light")) {
    return { action: "SET_THEME", params: { theme: 'light' } }
  }

  // Global Navigation
  if (text.includes("go to home") || text.includes("ghar jao") || text.includes("home page")) {
    return { action: "NAVIGATE_HOME", params: {} }
  }
  if (text.includes("go to recipes") || text.includes("open recipes") || text.includes("recipes dikhao") || text.includes("recipe page")) {
    return { action: "NAVIGATE_RECIPES", params: {} }
  }
  if (text.includes("go to profile") || text.includes("open profile") || text.includes("profile dikhao")) {
    return { action: "NAVIGATE_PROFILE", params: {} }
  }

  // Navigation commands
  if (text.includes("next step") || text.includes("agle step") || text.includes("aage")) {
    return { action: "NEXT_STEP", params: {} }
  }
  if (text.includes("previous step") || text.includes("pichla") || text.includes("peechhe")) {
    return { action: "PREV_STEP", params: {} }
  }
  if (text.includes("repeat") || text.includes("again") || text.includes("dobara") || text.includes("phir se")) {
    return { action: "REPEAT", params: {} }
  }

  // Timer commands
  const timerMatch =
    text.match(/(?:set |start )?timer (?:for )?(\d+)\s*(?:minute|min|मिनट)/i) ||
    text.match(/(\d+)\s*(?:minute|min|मिनट)\s*(?:ka |का )?timer/i)
  if (timerMatch) {
    return { action: "SET_TIMER", params: { minutes: Number.parseInt(timerMatch[1]) } }
  }

  // Whistle commands
  const whistleMatch = text.match(/(\d+)\s*(?:whistle|seti|सीटी)/i)
  if (whistleMatch) {
    return { action: "ADD_WHISTLES", params: { count: Number.parseInt(whistleMatch[1]) } }
  }
  if (text.includes("whistle") || text.includes("seti") || text.includes("सीटी")) {
    return { action: "ADD_WHISTLES", params: { count: 1 } }
  }

  // Recipe search
  const findMatch = text.match(/(?:find|search|show|खोजो|बताओ)\s+(.+)/i)
  if (findMatch) {
    return { action: "SEARCH_RECIPE", params: { query: findMatch[1] } }
  }

  // Ingredient search
  if (text.includes("what can i cook") || text.includes("kya bana") || text.includes("क्या बना")) {
    const ingredients = text.replace(/what can i cook with|kya bana sakta|क्या बना सकता/gi, "").trim()
    return { action: "SEARCH_BY_INGREDIENTS", params: { ingredients } }
  }

  // Stop/Pause
  if (text.includes("stop") || text.includes("pause") || text.includes("ruko") || text.includes("रुको")) {
    return { action: "STOP", params: {} }
  }

  // Play/Continue
  if (text.includes("play") || text.includes("continue") || text.includes("chalu") || text.includes("शुरू")) {
    return { action: "PLAY", params: {} }
  }

  // Go to step
  const stepMatch = text.match(/(?:go to |jump to )?step\s*(\d+)/i)
  if (stepMatch) {
    return { action: "GO_TO_STEP", params: { step: Number.parseInt(stepMatch[1]) } }
  }

  // Save/Favorite commands
  if (text.includes("save") || text.includes("favorite") || text.includes("like") || text.includes("pasand")) {
    return { action: "SAVE_RECIPE", params: {} }
  }

  // Share commands
  if (text.includes("share") || text.includes("bhejo") || text.includes("send")) {
    return { action: "SHARE_RECIPE", params: {} }
  }

  return null
}
