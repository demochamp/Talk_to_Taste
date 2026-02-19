"use client"

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

  // Reminder commands (Bilingual)
  // English: "Remind me to flip pancake in 5 minutes"
  const reminderMatchEn = text.match(/remind me to (.+) (?:in|after) (\d+)\s*(?:minute|min|mins)/i)
  if (reminderMatchEn) {
    return {
      action: "SET_REMINDER",
      params: {
        label: reminderMatchEn[1].trim(),
        minutes: Number.parseInt(reminderMatchEn[2])
      }
    }
  }

  // Hindi: "Mujhe yaad dilana gas band karna 5 minute baad"
  // Hindi: "5 minute baad gas band karna yaad dilana"
  const reminderMatchHi =
    text.match(/mujhe yaad dilana (.+) (\d+)\s*(?:minute|min|mins|मिनट)\s*baad/i) ||
    text.match(/(\d+)\s*(?:minute|min|mins|मिनट)\s*baad (.+) yaad dilana/i) ||
    text.match(/(.+) ka reminder set (?:karo|karna) (\d+)\s*(?:minute|min|mins|मिनट)\s*baad/i)

  if (reminderMatchHi) {
    // For the second pattern (time first), the groups are inverted
    const isTimeFirst = !Number.isNaN(Number.parseInt(reminderMatchHi[1]))
    const minutes = isTimeFirst ? Number.parseInt(reminderMatchHi[1]) : Number.parseInt(reminderMatchHi[2])
    const label = isTimeFirst ? reminderMatchHi[2] : reminderMatchHi[1]

    return {
      action: "SET_REMINDER",
      params: {
        label: label.trim(),
        minutes: minutes
      }
    }
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
