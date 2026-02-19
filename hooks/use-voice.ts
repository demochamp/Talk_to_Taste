import { useContext } from "react"
import { VoiceContext } from "@/components/voice-provider"

export type Language = "en-IN" | "hi-IN"

export function useVoice() {
  const context = useContext(VoiceContext)
  if (!context) {
    throw new Error("useVoice must be used within a VoiceProvider")
  }
  return context
}


