"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useVoice } from "@/hooks/use-voice"
import { processVoiceCommand } from "@/lib/voice/command-processor"
import { findKnowledgeResponse } from "@/lib/chat/knowledge-base"
import { AssistantUI } from "@/components/assistant-ui"

export function GlobalVoiceControl() {
    const router = useRouter()
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        isSupported,
        speak,
        language,
        setLanguage,
        clearTranscript,
        mode
    } = useVoice()


    // Local state to track "Conversation Context"
    // This helps us know if the user is answering a question like "Which recipe?"
    const [contextState, setContextState] = useState<"IDLE" | "WAITING_FOR_RECIPE">("IDLE")

    // Cleanup context on navigation
    useEffect(() => {
        setContextState("IDLE")
    }, [router]) // Reset when route changes? No, we might want to preserve it ACROSS the nav.

    // Actually, we want to SET context *after* nav. 
    // Let's rely on the TRANSCRIPT processing to handle the flow.

    // Chat History State
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([])
    const lastProcessedRef = useRef("")

    const handleCommand = (text: string, isVoice: boolean = false) => {
        const lowerTranscript = text.toLowerCase()
        const match = processVoiceCommand(text)

        let response = ""
        let actionTaken = false
        let shouldSpeak = true

        // --- CONTEXT AWARE HANDLERS ---
        if (contextState === "WAITING_FOR_RECIPE") {
            if (match.intent === "NAV_RECIPES") {
                clearTranscript()
                return
            }

            if (!match.intent || (match.intent !== "STOP" && match.intent !== "SHOW_COMMANDS")) {
                const query = lowerTranscript.replace(/recipe/i, "").trim()
                if (query.length > 1) {
                    console.log("Context Search:", query)
                    router.push(`/recipes?search=${encodeURIComponent(query)}`)
                    response = language === "hi-IN" ? `theek hai, ${query} dhund raha hu` : `Okay, finding ${query}`
                    setContextState("IDLE")
                    actionTaken = true
                }
            }
        }

        // --- STANDARD COMMANDS ---
        if (!actionTaken && match.confidence > 0.6 && match.intent !== "UNKNOWN") {
            console.log("Global Command:", match.intent)

            switch (match.intent) {
                case "NAV_HOME":
                    router.push("/")
                    setContextState("IDLE")
                    response = language === "hi-IN" ? "होम पेज" : "Home Page"
                    break

                case "NAV_RECIPES":
                    router.push("/recipes")
                    setContextState("WAITING_FOR_RECIPE")
                    // Delayed ask
                    setTimeout(() => {
                        const ask = language === "hi-IN" ? "रेसिपी पेज. आप क्या बनाना चाहते हैं?" : "Recipes. What do you want to cook?"
                        speak(ask)
                        setMessages(prev => [...prev, { role: "assistant", content: ask }])
                    }, 500)
                    // We don't set response here to avoid double speak, or we set it to initial ack
                    response = language === "hi-IN" ? "जी" : "Sure"
                    break

                case "NAV_PROFILE":
                    router.push("/profile")
                    setContextState("IDLE")
                    response = language === "hi-IN" ? "प्रोफाइल" : "Profile"
                    break

                case "NAV_FEATURES":
                    router.push("/#features")
                    response = language === "hi-IN" ? "ये रहे फीचर्स" : "Here are the features"
                    break

                case "NAV_HOW_IT_WORKS":
                    router.push("/#how-it-works")
                    response = language === "hi-IN" ? "ऐसे काम करता है" : "Here is how it works"
                    break

                case "NAV_ADMIN":
                    router.push("/admin")
                    response = language === "hi-IN" ? "एडमिन डैशबोर्ड" : "Admin Dashboard"
                    break

                case "STOP":
                    if (!pathname.includes("/cook")) {
                        stopListening()
                        setContextState("IDLE")
                        response = language === "hi-IN" ? "ठीक है" : "Okay, stopped"
                    }
                    break

                case "PLAY":
                    // Let CookPage handle it
                    break

                case "SEARCH_RECIPE":
                    // Redirect user to manual search
                    response = language === "hi-IN"
                        ? "कृपया रेसिपी सर्च करें या सर्च बार के पास वाले माइक का उपयोग करें।"
                        : "Please search for recipes manually or use the microphone next to the search bar."
                    break

                case "THEME_DARK":
                case "THEME_LIGHT":
                    response = language === "hi-IN" ? "थीम बदल दी गई है" : "Theme switched"
                    // Actual theme switch implementation would be here if we had the context
                    break

                case "LOGIN":
                    response = "Login feature coming soon"
                    break

                case "SET_LANGUAGE_HI":
                    setLanguage("hi-IN")
                    response = "नमस्ते! अब मैं हिंदी में बात करूँगा।"
                    // We need to force speak in Hindi because state update might modify 'speak' generic behavior only on next render
                    speak(response, "hi-IN")
                    // Prevent default speak at end of function since we spoke explicitly
                    shouldSpeak = false
                    break

                case "SET_LANGUAGE_EN":
                    setLanguage("en-IN")
                    response = "Sure, I will speak in English now."
                    speak(response, "en-IN")
                    shouldSpeak = false
                    break

                case "SHOW_COMMANDS":
                    router.push("/#voice-demo")
                    response = language === "hi-IN"
                        ? "ये रहे सारे वॉयस कमांड्स जो आप इस्तेमाल कर सकते हैं।"
                        : "Here are all the voice commands you can use."
                    break

                // --- COOKING COMMANDS ---
                case "COOK_START":
                    if (!pathname.includes("/cook")) {
                        response = language === "hi-IN" ? "कृपया पहले कोई रेसिपी चुनें।" : "Please select a recipe first."
                    }
                    break

                case "STEP_NEXT":
                case "STEP_PREV":
                case "STEP_REPEAT":
                    // Handled by CookPage
                    break

                case "TIMER_SET":
                    if (!pathname.includes("/cook")) {
                        response = language === "hi-IN" ? "टाइमर केवल कुकिंग पेज पर काम करता है।" : "Timers only work on the cooking page."
                    }
                    break

                case "WHISTLE_ADD":
                case "GO_TO_STEP":
                    // Handled by CookPage
                    break
            }
            actionTaken = true
        }

        // --- FALLBACK & KNOWLEDGE BASE ---
        if (!actionTaken && match.intent === "UNKNOWN") {
            if (contextState === "IDLE") {
                if (lowerTranscript.includes("recipe") || lowerTranscript.includes("khana") || lowerTranscript.includes("bana") || lowerTranscript.includes("vyanjan")) {
                    // Redirect user to manual search
                    response = language === "hi-IN"
                        ? "कृपया रेसिपी सर्च करें या सर्च बार के पास वाले माइक का उपयोग करें।"
                        : "Please search for recipes manually or use the microphone next to the search bar."
                    actionTaken = true
                } else {
                    // Check Knowledge Base for FAQs
                    const kbResponse = findKnowledgeResponse(lowerTranscript, language)
                    if (kbResponse) {
                        response = kbResponse
                        actionTaken = true
                    } else {
                        // Fallback but ENSURE response is not empty if we act
                        response = language === "hi-IN" ? "माफ़ कीजिये, समझ नहीं आया. आप 'Help' बोल सकते हैं." : "Sorry, I didn't catch that. You can say 'Help'."
                        actionTaken = true // We are taking action by replying
                    }
                }
            }
        }

        // Update History
        if (actionTaken || response) {
            // Ensure we never add an empty bubble
            const finalResponse = response || "..." // Fallback just in case

            setMessages(prev => [
                ...prev,
                { role: "user", content: text },
                { role: "assistant", content: finalResponse }
            ])

            if (response && shouldSpeak) speak(response)

            if (isVoice) {
                clearTranscript()
                lastProcessedRef.current = text
            }
        }
    }

    useEffect(() => {
        if (!transcript || !isListening) return

        // Ignore if in SEARCH mode (handled by local component)
        if (mode === "SEARCH") return

        // Ignore if we just processed this exact text
        if (transcript === lastProcessedRef.current) return

        handleCommand(transcript, true)
    }, [transcript, isListening, router, speak, language, stopListening, contextState, clearTranscript, mode])

    const pathname = usePathname()

    // Hide Assistant UI if not supported
    if (!isSupported) return null

    return <AssistantUI messages={messages} onSendMessage={(text) => handleCommand(text, false)} />
}
