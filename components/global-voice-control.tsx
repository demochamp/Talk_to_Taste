"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useVoice } from "@/hooks/use-voice"
import { processVoiceCommand } from "@/lib/voice/command-processor"
import { AssistantUI } from "@/components/assistant-ui"
import { recipes as staticRecipes } from "@/lib/recipes-data"

export function GlobalVoiceControl() {
    const router = useRouter()
    const pathname = usePathname()

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
        mode,
        isFinal
    } = useVoice()

    const [contextState, setContextState] = useState<"IDLE" | "WAITING_FOR_RECIPE">("IDLE")
    const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([])
    const lastProcessedRef = useRef("")

    useEffect(() => {
        setContextState("IDLE")
    }, [router])

    const handleCommand = (text: string, isVoice: boolean = false) => {
        const lowerTranscript = text.toLowerCase()
        const match = processVoiceCommand(text)
        const isHindi = language === "hi-IN"

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
                    router.push(`/recipes?search=${encodeURIComponent(query)}`)
                    response = language === "hi-IN" ? `theek hai, ${query} dhund raha hu` : `Okay, finding ${query}`
                    setContextState("IDLE")
                    actionTaken = true
                }
            }
        }

        // --- 3. STANDARD COMMANDS ---
        if (!actionTaken && match.confidence > 0.6 && match.intent !== "UNKNOWN") {
            switch (match.intent) {
                case "NAV_HOME":
                    router.push("/")
                    response = language === "hi-IN" ? "होम पेज पर जा रहे हैं।" : "Going to the home page."
                    break

                case "NAV_RECIPES":
                    router.push("/recipes")
                    setContextState("WAITING_FOR_RECIPE")
                    response = language === "hi-IN" ? "रेसिपी पेज खोल रहे हैं। आप क्या बनाना चाहते हैं?" : "Opening recipes. What do you want to cook?"
                    break

                case "NAV_PROFILE":
                    router.push("/profile")
                    response = language === "hi-IN" ? "आपकी प्रोफाइल पर जा रहे हैं।" : "Going to your profile."
                    break

                case "NAV_ADMIN":
                    router.push("/admin")
                    response = language === "hi-IN" ? "एडमिन डैशबोर्ड खोल रहे हैं।" : "Opening the admin dashboard."
                    break

                case "NAV_FEATURES":
                    speak(isHindi ? "विशेषताएं दिखा रहे हैं।" : "Showing our features.")
                    const featEl = document.getElementById("features")
                    if (featEl) {
                        featEl.scrollIntoView({ behavior: "smooth" })
                    } else {
                        router.push("/#features")
                    }
                    break

                case "NAV_HOW_IT_WORKS":
                    speak(isHindi ? "यह कैसे काम करता है, चलिए देखते हैं।" : "Let's see how it works.")
                    const howEl = document.getElementById("how-it-works")
                    if (howEl) {
                        howEl.scrollIntoView({ behavior: "smooth" })
                    } else {
                        router.push("/#how-it-works")
                    }
                    break

                case "THEME_DARK":
                    speak(isHindi ? "डार्क मोड चालू कर रहे हैं।" : "Switching to dark mode.")
                    // Use a manual event or document class update if next-themes is not available globally
                    document.documentElement.classList.add("dark")
                    localStorage.setItem("theme", "dark")
                    break

                case "THEME_LIGHT":
                    speak(isHindi ? "लाइट मोड पर वापस जा रहे हैं।" : "Switching back to light mode.")
                    document.documentElement.classList.remove("dark")
                    localStorage.setItem("theme", "light")
                    break

                case "SET_LANGUAGE_HI":
                    setLanguage("hi-IN")
                    response = "नमस्ते! अब मैं हिंदी में बात करूँगा।"
                    speak(response, "hi-IN")
                    shouldSpeak = false
                    break

                case "SET_LANGUAGE_EN":
                    setLanguage("en-IN")
                    response = "Sure, I will speak in English now."
                    speak(response, "en-IN")
                    shouldSpeak = false
                    break

                case "STOP":
                    if (!pathname.includes("/cook")) {
                        stopListening()
                        response = language === "hi-IN" ? "ठीक है" : "Okay, stopped"
                    }
                    break

                case "NAV_VOICE_GUIDE":
                case "SHOW_COMMANDS":
                    router.push("/#voice-demo")
                    const demoEl = document.getElementById("voice-demo")
                    if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" })
                    response = language === "hi-IN"
                        ? "मैं आपकी कई तरह से मदद कर सकता हूँ। आप मुझे होम, रेसिपी या प्रोफाइल पेज पर जाने के लिए कह सकते हैं।"
                        : "I can help you in many ways. You can ask me to navigate to Home, Recipes, or Profile."
                    break

                case "OPEN_RECIPE":
                    // Smart Open: If on recipes search page, open the first result
                    if (pathname === "/recipes") {
                        const searchParams = new URLSearchParams(window.location.search)
                        const currentSearch = searchParams.get("search")
                        
                        if (currentSearch) {
                            const filtered = staticRecipes.filter(r => 
                                (r.name && r.name.toLowerCase().includes(currentSearch.toLowerCase())) ||
                                (r.nameHindi && r.nameHindi.toLowerCase().includes(currentSearch.toLowerCase())) ||
                                (r.nameHinglish && r.nameHinglish.toLowerCase().includes(currentSearch.toLowerCase()))
                            )
                            
                            if (filtered.length > 0) {
                                router.push(`/cook?recipe=${filtered[0].id}`)
                                response = isHindi 
                                    ? `ठीक है, ${filtered[0].nameHindi} शुरू करते हैं।` 
                                    : `Okay, starting ${filtered[0].name} recipe.`
                                break
                            }
                        }
                    }
                    // Fallback to searching if not on results page or recipe name provided
                    const q = match.params?.value || text
                    router.push(`/recipes?search=${encodeURIComponent(q.toString())}`)
                    response = language === "hi-IN" ? `${q} ढूंढ रहे हैं...` : `Searching for ${q}...`
                    break

                case "SEARCH_RECIPE":
                    const query = match.params?.value || text
                    router.push(`/recipes?search=${encodeURIComponent(query.toString())}`)
                    response = language === "hi-IN" ? `${query} के बारे में जानकारी ढूंढ रहे हैं...` : `Looking for information about ${query}...`
                    break
            }
            actionTaken = true
        }

        // --- 4. CHAT FALLBACK (Handles user answers and general questions) ---
        if (!actionTaken && match.intent === "UNKNOWN") {
            // Immediately stop listening to prevent mic interference
            if (isVoice) stopListening()

            // Update history locally so user sees their message
            const userMsg = { role: "user", content: text } as const;
            setMessages(prev => [...prev, userMsg])

            fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, history: [...messages, userMsg] })
            })
            .then(async res => {
                const data = await res.json()
                const botResponse = data.response || data.answer;
                if (botResponse) {
                    setMessages(prev => [...prev, { role: "assistant", content: botResponse }])
                    speak(botResponse, language === "hi-IN" ? "hi-IN" : "en-IN")
                } else {
                    throw new Error("No response from AI")
                }
            })
            .catch(err => {
                console.error("Chat Fallback Error:", err)
                const fallback = language === "hi-IN" 
                    ? "माफ़ कीजिये, अभी कुछ तकनीकी समस्या है。" 
                    : "I'm sorry, I'm having trouble connecting right now."
                setMessages(prev => [...prev, { role: "assistant", content: fallback }])
            })
            
            if (isVoice) {
                clearTranscript()
                lastProcessedRef.current = text
            }
            return
        }

        // Standard Response Handling
        if (response) {
            setMessages(prev => [
                ...prev,
                { role: "user", content: text },
                { role: "assistant", content: response }
            ])
            if (shouldSpeak) speak(response, language === "hi-IN" ? "hi-IN" : "en-IN")
            if (isVoice) {
                clearTranscript()
                lastProcessedRef.current = text
            }
        }
    }

    useEffect(() => {
        if (!transcript || !isListening || mode === "SEARCH" || mode === "COOK") return
        if (transcript === lastProcessedRef.current) return
        if (transcript.trim().length < 2) return

        if (isFinal) {
            handleCommand(transcript, true)
            return
        }

        const timeout = setTimeout(() => {
            handleCommand(transcript, true)
        }, 1200)

        return () => clearTimeout(timeout)
    }, [transcript, isListening, router, speak, language, stopListening, contextState, clearTranscript, mode, isFinal])

    if (!isSupported) return null

    return <AssistantUI messages={messages} onSendMessage={(text) => handleCommand(text, false)} />
}
