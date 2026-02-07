"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import type SpeechRecognition from "speech-recognition"

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

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) &&
    "speechSynthesis" in window

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

    recognition.onresult = (event) => {
      const current = event.resultIndex
      const transcript = event.results[current][0].transcript
      setState((prev) => ({ ...prev, transcript }))
    }

    recognition.onerror = (event) => {
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

  const speak = useCallback(
    (text: string, lang?: Language) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return

      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang || state.language
      utterance.rate = 0.9
      utterance.pitch = 1

      // Try to find a voice for the specified language
      const voices = window.speechSynthesis.getVoices()
      const targetLang = lang || state.language
      const voice = voices.find((v) => v.lang.startsWith(targetLang.split("-")[0])) || voices[0]
      if (voice) utterance.voice = voice

      utterance.onstart = () => {
        setState((prev) => ({ ...prev, isSpeaking: true }))
      }

      utterance.onend = () => {
        setState((prev) => ({ ...prev, isSpeaking: false }))
      }

      utterance.onerror = () => {
        setState((prev) => ({ ...prev, isSpeaking: false }))
      }

      synthRef.current = utterance
      window.speechSynthesis.speak(utterance)
    },
    [state.language],
  )

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

  return null
}
