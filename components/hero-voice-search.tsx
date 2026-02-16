"use client"
import { Search, Mic } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useVoice, parseVoiceCommand } from "@/hooks/use-voice"
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
    } = useVoice()

    const toggleListening = () => {
        if (isListening) {
            stopListening()
        } else {
            startListening()
        }
    }

    // Handle voice commands/search
    useEffect(() => {
        if (transcript) {
            const command = parseVoiceCommand(transcript)
            if (command) {
                if (command.action === "SEARCH_RECIPE") {
                    router.push(`/recipes?search=${encodeURIComponent(command.params.query as string)}`)
                    return
                }
                if (command.action === "SEARCH_BY_INGREDIENTS") {
                    router.push(`/recipes?ingredients=${encodeURIComponent(command.params.ingredients as string)}`)
                    return
                }
            }

            if (isListening) {
                setQuery(transcript.replace(/\.$/, ""))
            }
        }
    }, [transcript, isListening, router])

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
                className="pl-12 pr-12 h-14 rounded-full text-base sm:text-lg border-2 focus:border-primary bg-background/50 backdrop-blur-sm"
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
