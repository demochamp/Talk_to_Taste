"use client"
import { Search, Mic } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useVoice } from "@/hooks/use-voice"
import { processVoiceCommand } from "@/lib/voice/command-processor"
import { VoiceWaveAnimation } from "./voice-wave-animation"

export function VoiceSearch() {
    const router = useRouter()
    const [query, setQuery] = useState("")
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        isSupported: voiceSupported,
        mode
    } = useVoice()

    const toggleListening = () => {
        if (isListening) {
            stopListening()
        } else {
            startListening({ mode: "SEARCH" })
        }
    }

    // Handle voice commands/search - ONLY IN SEARCH MODE
    useEffect(() => {
        if (transcript && mode === "SEARCH") {
            const command = processVoiceCommand(transcript)

            if (command && command.confidence > 0.6) {
                // If it's an explicit open command with a specific recipe found
                if (command.intent === "OPEN_RECIPE" && command.params?.value) {
                    router.push(`/cook?recipe=${command.params.value}`)
                    return
                }

                // If it's a search intent or an open command without a specific recipe identified yet
                if (command.intent === "SEARCH_RECIPE" || command.intent === "OPEN_RECIPE") {
                    // Extract name or use the full transcript if matched by name in processor
                    const query = (command.params?.value as string) || transcript
                    router.push(`/recipes?search=${encodeURIComponent(query)}`)
                    return
                }
            }

            if (isListening) {
                setQuery(transcript.replace(/\.$/, ""))
            }
        }
    }, [transcript, isListening, router, mode])

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/recipes?search=${encodeURIComponent(query)}`)
        }
    }

    return (
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="What do you want to cook today? (e.g. 'Butter Chicken')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-12 pr-12 h-14 rounded-full text-base sm:text-lg border-2 focus:border-primary bg-card/80 dark:bg-card/90 text-foreground placeholder:text-gray-500 dark:placeholder:text-gray-300 font-medium backdrop-blur-md shadow-sm"
            />
            <Button
                size="icon"
                className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full ${isListening ? "bg-red-500 animate-pulse" : "bg-primary"}`}
                onClick={toggleListening}
                disabled={!voiceSupported}
            >
                <Mic className={`w-5 h-5 ${isListening ? "text-white" : ""}`} />
            </Button>
        </div>
    )
}
