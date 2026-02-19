"use client"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mic,
  MicOff,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Timer,
  Volume2,
  VolumeX,
  Clock,
  Users,
  Flame,
  Check,
  Circle,
  Home,
  List,
  X,
  Plus,
  Minus,
  Globe,
  ChefHat,
  Sparkles,
  AlertCircle,
  Share2,
  Youtube,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { VoiceWaveAnimation } from "@/components/voice-wave-animation"
import { useVoice } from "@/hooks/use-voice"
import { processVoiceCommand } from "@/lib/voice/command-processor"
import { useUserState } from "@/hooks/use-user-state"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

// Helper to safely get instruction text, avoiding duration strings
function getStepInstruction(step: any, language: string) {
  if (!step) return { text: "", isFallback: false }

  // Prioritize Hindi if selected
  let text = step.instruction // Default to English first
  let isFallback = false
  let debugMsg = ""

  if (language === "hi-IN") {
    if (step.instructionHindi && step.instructionHindi.length > 2) {
      text = step.instructionHindi
      debugMsg = "Found Hindi instruction"
    } else {
      isFallback = true // Mark as fallback if Hindi missing/too short
      debugMsg = "Missing Hindi instruction, falling back to English"
    }
  }

  // Clean the text
  if (text) text = text.trim()

  // Remove leading numbering like "1.", "Step 1", etc.
  if (text) {
    const original = text
    text = text.replace(/^step\s*\d+[:\.]?\s*/i, "")
    text = text.replace(/^\d+[:\.]\s*/, "")
    if (text !== original) debugMsg += " (Stripped numbering)"
  }

  // --- SAFEGUARD: DURATION / NUMBER DETECTION ---
  // Returns true if text matches: "20 mins", "10", "5 sec", "20-30 minutes"
  const isInvalid =
    !text ||
    text.length < 2 || // Too short
    /^\d+$/.test(text) || // Just numbers
    /^\d+\s*(?:-|–|to)\s*\d+$/.test(text) || // "20-30"
    /^\d+\s*(?:min|mins|minute|minutes|sec|second|seconds|hr|hour|hours)s?$/i.test(text) // "20 mins"

  if (isInvalid) {
    // If invalid, try falling back to English instruction if we weren't already
    if (!isFallback && step.instruction && step.instruction.length > 5) {
      console.warn(`TalkToTaste: Invalid text ("${text}"), falling back to English.`)
      return { text: step.instruction, isFallback: true, debug: "Invalid Hindi, used English fallback" }
    }
    return { text: "", isFallback: false, debug: `Invalid text: ${text}` }
  }

  // console.log(`[Voice Debug] Step ${step.step} (${language}): ${debugMsg} -> "${text.substring(0, 20)}..."`)
  return { text, isFallback, debug: debugMsg }
}

function getYoutubeEmbedUrl(url: string) {
  if (!url) return ""

  // Handle already embedded URLs
  if (url.includes("/embed/")) return url

  // Handle standard watch URLs
  const vParam = url.split("v=")[1]
  if (vParam) {
    const id = vParam.split("&")[0]
    const finalUrl = `https://www.youtube.com/embed/${id}`
    console.log(`[YouTube] Converted ${url} -> ${finalUrl}`)
    return finalUrl
  }

  // Handle short URLs (youtu.be)
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0]
    if (id) {
      const finalUrl = `https://www.youtube.com/embed/${id}`
      console.log(`[YouTube] Converted ${url} -> ${finalUrl}`)
      return finalUrl
    }
  }

  console.log(`[YouTube] Returning original/unprocessed: ${url}`)
  return url
}

export default function CookPage() {
  // ... (keeping lines 75-194 same) ...
  const searchParams = useSearchParams()
  const router = useRouter()
  const recipeId = searchParams.get("recipe")
  const [recipe, setRecipe] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [timers, setTimers] = useState<
    Array<{ id: number; name: string; duration: number; remaining: number; isRunning: boolean }>
  >([])
  const [whistleCount, setWhistleCount] = useState(0)
  const [targetWhistles, setTargetWhistles] = useState(3)
  const [showIngredients, setShowIngredients] = useState(false)
  const [showTimerModal, setShowTimerModal] = useState(false)
  const [newTimerMinutes, setNewTimerMinutes] = useState(5)
  const [showVoiceCommands, setShowVoiceCommands] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const { addToHistory, toggleFavorite, isFavorite } = useUserState()
  const hasSpokenRef = useRef<number | null>(null)

  // New safety guard to prevent stale commands
  const [isReady, setIsReady] = useState(false)

  // Load recipe based on query param
  useEffect(() => {
    // Enable command processing after 1s
    const t = setTimeout(() => setIsReady(true), 1000)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    if (!recipeId) return

    const loadRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${recipeId}`)

        if (!res.ok) {
          throw new Error("Recipe fetch failed")
        }

        const data = await res.json()
        setRecipe(data)
        if (data && data.id) {
          addToHistory(data.id)
        }

      } catch (err) {
        console.error("Cook page fetch error:", err)
        setRecipe(null)
      }
    }

    loadRecipe()
    loadRecipe()
  }, [recipeId])

  // Use real voice hook
  const {
    isListening,
    isSpeaking,
    transcript,
    error: voiceError,
    language,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    setLanguage,
    isSupported: voiceSupported,
    clearTranscript,
    currentVoice,
    availableVoices,
    setVoicePreference,
  } = useVoice()

  // Clear any stale state on mount
  useEffect(() => {
    // Stop any previous speech immediately
    stopSpeaking()
    // Clear transcript
    clearTranscript()

    // Also ensure we reset the spoken ref
    hasSpokenRef.current = null

    // Cleanup on unmount
    return () => {
      stopSpeaking()
    }
  }, [stopSpeaking, clearTranscript])

  const steps = recipe?.steps ?? []
  const step = steps[currentStep]
  const stepsLength = steps.length
  const progress = stepsLength ? ((currentStep + 1) / stepsLength) * 100 : 0

  // Timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((timer) => {
          if (timer.isRunning && timer.remaining > 0) {
            const newRemaining = timer.remaining - 1
            // Alert when timer completes
            if (newRemaining === 0) {
              const isReminder = !timer.name.startsWith("Timer ")
              const message = language === "hi-IN"
                ? (isReminder ? `"${timer.name}" ka samay ho gaya hai!` : `${timer.name} pura ho gaya!`)
                : (isReminder ? `Reminder for "${timer.name}" is up!` : `${timer.name} is complete!`)
              speak(message)
            }
            return { ...timer, remaining: newRemaining }
          }
          return timer
        }),
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [speak, language])

  // Navigation functions
  const nextStep = useCallback(() => {
    stopSpeaking() // Ensure previous speech stops
    if (currentStep < stepsLength - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep, stepsLength, stopSpeaking])


  const prevStep = useCallback(() => {
    stopSpeaking() // Ensure previous speech stops
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep, stopSpeaking])

  const goToStep = useCallback(
    (stepNum: number) => {
      stopSpeaking()
      if (stepNum >= 1 && stepNum <= stepsLength) {
        setCurrentStep(stepNum - 1)
      }
    },
    [stepsLength, stopSpeaking],
  )

  const repeatStep = useCallback(() => {
    if (!step) return
    stopSpeaking() // Clean slate for repeat

    const { text, isFallback } = getStepInstruction(step, language)

    if (text) {
      // Use English voice logic if falling back
      speak(text, isFallback ? "en-IN" : undefined)
    }

  }, [speak, step, language, stopSpeaking])


  // Speak current step when playing or step changes
  useEffect(() => {
    if (!step) return
    if (!isPlaying) return
    if (isSpeaking) return

    // Check if we've already spoken this step
    if (hasSpokenRef.current === currentStep) return

    const { text, isFallback } = getStepInstruction(step, language)

    if (text) {
      // Use English voice for fallback check
      speak(text, isFallback ? "en-IN" : undefined)
      hasSpokenRef.current = currentStep
    }

  }, [currentStep, isPlaying, isSpeaking, language, step, speak])

  // Reset spoken state when language changes so it repeats in new language
  useEffect(() => {
    hasSpokenRef.current = null
    // If we are currently playing, this will automatically trigger the main useEffect to speak again in the new language
  }, [language])

  // Auto move to next step after speech ends
  useEffect(() => {
    if (!isPlaying) return
    if (isSpeaking) return

    // Only auto-move if we HAVE spoken the current step
    // This prevents skipping steps or moving before speaking
    if (hasSpokenRef.current !== currentStep) return

    const t = setTimeout(() => {
      if (currentStep < stepsLength - 1) {
        setCurrentStep(s => s + 1)
      } else {
        setIsPlaying(false)
      }
    }, 1200)

    return () => clearTimeout(t)

  }, [isSpeaking, isPlaying, currentStep, stepsLength])

  // Timer functions
  const addTimer = (minutes: number, name?: string) => {
    const newTimer = {
      id: Date.now(),
      name: name || `Timer ${timers.length + 1}`,
      duration: minutes * 60,
      remaining: minutes * 60,
      isRunning: true,
    }
    setTimers((prev) => [...prev, newTimer])
    speak(language === "hi-IN"
      ? `${minutes} मिनट का ${name ? 'रिमाइंडर' : 'टाइमर'} सेट हो गया`
      : `${name ? 'Reminder' : 'Timer'} set for ${minutes} minutes`)
    setShowTimerModal(false)
  }

  const toggleTimer = (id: number) => {
    setTimers((prev) => prev.map((timer) => (timer.id === id ? { ...timer, isRunning: !timer.isRunning } : timer)))
  }

  const removeTimer = (id: number) => {
    setTimers((prev) => prev.filter((timer) => timer.id !== id))
  }

  // Whistle tracking
  const addWhistle = () => {
    const newCount = whistleCount + 1
    setWhistleCount(newCount)
    if (newCount >= targetWhistles) {
      speak(
        language === "hi-IN"
          ? `${targetWhistles} सीटी हो गई! आपका व्यंजन तैयार है।`
          : `${targetWhistles} whistles complete! Your dish is ready.`,
      )
    } else {
      speak(
        language === "hi-IN"
          ? `${newCount} सीटी हो गई। ${targetWhistles - newCount} और बाकी है।`
          : `${newCount} whistle${newCount > 1 ? "s" : ""} done. ${targetWhistles - newCount} more to go.`,
      )
    }
  }

  // Process voice commands
  const lastCommandTimeRef = useRef<number>(0)

  useEffect(() => {
    if (!isReady) return // BLOCK COMMANDS UNTIL READY

    if (transcript) {
      // Debounce: Ignore commands if processing (or processed recently)
      const now = Date.now()
      if (now - lastCommandTimeRef.current < 1500) {
        return
      }

      const match = processVoiceCommand(transcript)
      if (match.confidence > 0.6) {
        let commandHandled = false;

        // Log match for debugging
        console.log("Processing Voice Command:", match.intent, transcript)

        switch (match.intent) {
          case "STEP_NEXT":
            nextStep()
            commandHandled = true;
            break
          case "STEP_PREV":
            prevStep()
            commandHandled = true;
            break
          case "STEP_REPEAT":
            repeatStep()
            commandHandled = true;
            break
          case "TIMER_SET":
            const timerMatch = transcript.match(/\d+/)
            const duration = timerMatch ? parseInt(timerMatch[0]) : 5
            addTimer(duration)
            commandHandled = true;
            break
          case "WHISTLE_ADD":
            const whistleMatch = transcript.match(/(\d+)\s*(?:whistle|seeti|ct)/i)
            const count = whistleMatch ? parseInt(whistleMatch[1]) : 1
            for (let i = 0; i < count; i++) {
              addWhistle()
            }
            commandHandled = true;
            break
          case "COOK_START":
            setIsPlaying(true)
            commandHandled = true;
            break
          case "GO_TO_STEP":
            // Support both "step 5" and "step number 5"
            const stepMatch = transcript.match(/step\s*(?:number\s*)?(\d+)/i) ||
              transcript.match(/स्टेप\s*(\d+)/i) ||
              transcript.match(/चरण\s*(\d+)/i)
            if (stepMatch) {
              goToStep(parseInt(stepMatch[1]) - 1) // 1-based to 0-based
            }
            commandHandled = true;
            break
          case "STOP":
            setIsPlaying(false)
            stopSpeaking()
            commandHandled = true;
            break
          case "PLAY":
            setIsPlaying(true)
            commandHandled = true;
            break
          case "UNKNOWN":
            if (transcript.match(/stop|ruko|pause|रुको/i)) {
              setIsPlaying(false)
              stopSpeaking()
              commandHandled = true
            } else if (transcript.match(/play|continue|shuru|chalu|शुरू/i)) {
              setIsPlaying(true)
              commandHandled = true
            }
            break
        }

        if (commandHandled) {
          lastCommandTimeRef.current = now
          clearTranscript()
        }
      }
    }
  }, [transcript, nextStep, prevStep, repeatStep, goToStep, stopSpeaking, setIsPlaying, language, recipe, clearTranscript, isReady])



  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Toggle voice listening
  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Toggle language
  const toggleLanguage = () => {
    const newLang = language === "en-IN" ? "hi-IN" : "en-IN"
    setLanguage(newLang)
    speak(newLang === "hi-IN" ? "हिंदी में बोल रहा हूं" : "Speaking in English")
  }

  if (!recipe || !step) {
    return <div className="p-10">Loading recipe...</div>
  }
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="font-semibold text-foreground">{language === "hi-IN" ? recipe.nameHindi : recipe.name}</h1>
              <p className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {stepsLength}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: recipe.name,
                    text: `Check out this recipe for ${recipe.name} on TalkToTaste!`,
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }
              }}
            >
              <Share2 className="w-5 h-5" />
            </Button>
            {recipe.youtubeUrl && (
              <Button
                variant={showVideo ? "default" : "ghost"}
                size="icon"
                className="rounded-full"
                onClick={() => setShowVideo(!showVideo)}
              >
                <Youtube className="w-5 h-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleLanguage} aria-label="Toggle Language">
              <Globe className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowIngredients(true)}>
              <List className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setShowTools(true)}>
              <ChefHat className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                if (isSpeaking) stopSpeaking()
              }}
            >
              {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        {/* Progress bar */}
        <Progress value={progress} className="h-1 rounded-none" />
      </header>

      {/* Main content */}
      <div className="pt-20 pb-40">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main cooking area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Voice status banner */}
              {voiceError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <p className="text-sm text-destructive">{voiceError}</p>
                </motion.div>
              )}

              {/* Listening indicator */}
              <AnimatePresence>
                {isListening && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 rounded-3xl bg-primary/10 border-2 border-primary/30"
                  >
                    <div className="flex items-center justify-center gap-4">
                      <VoiceWaveAnimation isActive={true} />
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">
                          {language === "hi-IN" ? "सुन रहा हूं..." : "Listening..."}
                        </p>
                        {transcript && <p className="text-lg font-medium text-primary">"{transcript}"</p>}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Current step card */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-card rounded-3xl border border-border p-5 sm:p-6 md:p-8 shadow-lg"
              >
                {/* Step header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
                      transition={{ repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, duration: 1.5 }}
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0"
                    >
                      <span className="text-lg sm:text-2xl font-bold text-primary-foreground">{step.step}</span>
                    </motion.div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">{language === "hi-IN" ? "चरण" : "Step"} {step.step}</p>
                      <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{step.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const mins = Number.parseInt(step.duration) || 5
                      addTimer(mins)
                    }}
                    className="rounded-full gap-1 sm:gap-2 text-xs h-8 px-3"
                  >
                    <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
                    {language === "hi-IN" ? "टाइमर" : "Timer"}
                  </Button>
                </div>

                {/* Instruction */}
                <p className="text-lg sm:text-xl leading-relaxed text-foreground mb-4 sm:mb-6">
                  {language === "hi-IN" ? step.instructionHindi : step.instruction}
                </p>

                {/* Debug/Fallback Warning */}
                {language === "hi-IN" && (!step.instructionHindi || step.instructionHindi.length < 5) && (
                  <p className="text-xs text-amber-500 mb-4 italic">
                    (Hindi translation missing for this step. Playing in English.)
                  </p>
                )}

                {/* Tips */}
                {(step.tips || step.tipsHindi) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-2xl bg-primary/10 border border-primary/20"
                  >
                    <p className="text-sm text-foreground">
                      <span className="font-semibold text-primary flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4" />
                        {language === "hi-IN" ? "टिप:" : "Tip:"}
                      </span>
                      {language === "hi-IN" ? step.tipsHindi : step.tips}
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Step navigation dots */}
              <div className="flex items-center justify-center">
                <div className="flex gap-2 overflow-x-auto py-2 px-4">
                  {steps.map((stepItem: any, index: number) => {
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentStep(index)}
                        className={`h-3 rounded-full transition-all ${index === currentStep
                          ? "bg-primary w-8"
                          : index < currentStep
                            ? "bg-primary/50 w-3"
                            : "bg-border w-3"
                          }`}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center disabled:opacity-50 transition-colors hover:bg-secondary/80"
                >
                  <SkipBack className="w-6 h-6 text-foreground" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={repeatStep}
                  className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center transition-colors hover:bg-secondary/80"
                >
                  <RotateCcw className="w-6 h-6 text-foreground" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsPlaying(!isPlaying)
                    if (!isPlaying) {
                      const { text, isFallback } = getStepInstruction(step, language)
                      if (text) speak(text, isFallback ? "en-IN" : undefined)
                    } else {
                      stopSpeaking()
                    }
                  }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl ${isPlaying ? "bg-accent shadow-accent/30" : "bg-primary shadow-primary/30"
                    }`}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-accent-foreground" />
                  ) : (
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextStep}
                  disabled={currentStep === stepsLength - 1}
                  className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center disabled:opacity-50 transition-colors hover:bg-secondary/80"
                >
                  <SkipForward className="w-6 h-6 text-foreground" />
                </motion.button>

                {/* Voice button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleListening}
                  disabled={!voiceSupported}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isListening
                    ? "bg-primary animate-pulse-glow"
                    : voiceSupported
                      ? "bg-secondary hover:bg-secondary/80"
                      : "bg-muted opacity-50"
                    }`}
                >
                  {isListening ? (
                    <MicOff className="w-6 h-6 text-primary-foreground" />
                  ) : (
                    <Mic className="w-6 h-6 text-foreground" />
                  )}
                </motion.button>
              </div>

              {/* Voice commands help */}
              <div className="text-center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setShowVoiceCommands(!showVoiceCommands)}
                  className="text-muted-foreground"
                >
                  {showVoiceCommands
                    ? language === "hi-IN"
                      ? "वॉइस कमांड्स छुपाएं"
                      : "Hide voice commands"
                    : language === "hi-IN"
                      ? "वॉइस कमांड्स देखें"
                      : "Show voice commands"}
                </Button>

                <AnimatePresence>
                  {showVoiceCommands && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 rounded-2xl bg-secondary/50 text-left"
                    >
                      <p className="font-medium mb-2 text-sm">
                        {language === "hi-IN" ? "वॉइस कमांड्स:" : "Voice Commands:"}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <span>"Next step" / "Agle step"</span>
                        <span>"Previous" / "Pichla"</span>
                        <span>"Repeat" / "Dobara"</span>
                        <span>"Stop" / "Ruko"</span>
                        <span>"Set timer 5 minutes"</span>
                        <span>"Add whistle" / "Seti"</span>
                        <span>"Go to step 3"</span>
                        <span>"Play" / "Chalu"</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Manual Voice Selector (Settings) */}
                <div className="mt-6 border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2">Voice Settings</p>
                  <select
                    className="w-full text-xs p-2 rounded-lg bg-background border border-border"
                    value={currentVoice?.voiceURI || ""}
                    onChange={(e) => {
                      const uri = e.target.value
                      if (uri) {
                        // We need to cast or ignore type check for the setVoicePreference which we know exists now
                        // @ts-ignore
                        setVoicePreference(uri)
                        // Also trigger a test speak
                        // speak("Voice changed", "en-IN")
                      }
                    }}
                  >
                    <option value="">Auto-Detect Voice</option>
                    {/* Filter voices to show relevant ones + any fallback */}
                    {availableVoices
                      .filter(v => v.lang.includes(language === "hi-IN" ? "hi" : "en"))
                      .map(v => (
                        <option key={v.voiceURI} value={v.voiceURI}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    {/* Show others in a separate group if needed, or just all useful ones */}
                    <optgroup label="All Voices">
                      {availableVoices
                        .filter(v => !v.lang.includes(language === "hi-IN" ? "hi" : "en"))
                        .map(v => (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            {v.name} ({v.lang})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

              </div>

              {/* Debug: Active Voice */}
              <div className="text-center mt-4">
                <p className="text-[10px] text-muted-foreground bg-secondary/30 rounded-full px-3 py-1 inline-block">
                  🎙️ Active Voice: {currentVoice ? `${currentVoice.name} (${currentVoice.lang})` : "Browser Default"}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Timers */}
              <div className="bg-card rounded-3xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Timer className="w-5 h-5 text-primary" />
                    {language === "hi-IN" ? "टाइमर" : "Timers"}
                  </h3>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full bg-transparent"
                    onClick={() => setShowTimerModal(true)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {timers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    {language === "hi-IN" ? "कोई एक्टिव टाइमर नहीं" : "No active timers"}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {timers.map((timer) => (
                      <motion.div
                        key={timer.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl ${timer.remaining === 0
                          ? "bg-destructive/10 border-2 border-destructive animate-pulse"
                          : "bg-secondary"
                          }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{timer.name}</span>
                          <button
                            onClick={() => removeTimer(timer.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-2xl font-bold ${timer.remaining === 0 ? "text-destructive" : "text-foreground"
                              }`}
                          >
                            {formatTime(timer.remaining)}
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => toggleTimer(timer.id)}>
                            {timer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                        </div>
                        <Progress value={(timer.remaining / timer.duration) * 100} className="h-1 mt-2" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Whistle tracker - only show if recipe has whistles */}
              {recipe.whistleCount && (
                <div className="bg-card rounded-3xl border border-border p-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                    <span className="text-2xl">🎺</span>
                    {language === "hi-IN" ? "सीटी ट्रैकर" : "Whistle Tracker"}
                  </h3>

                  <div className="text-center mb-4">
                    <motion.div
                      key={whistleCount}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-5xl font-bold text-primary mb-2"
                    >
                      {whistleCount}/{targetWhistles}
                    </motion.div>
                    <p className="text-sm text-muted-foreground">
                      {whistleCount >= targetWhistles
                        ? language === "hi-IN"
                          ? "लक्ष्य पूरा!"
                          : "Target reached!"
                        : language === "hi-IN"
                          ? `${targetWhistles - whistleCount} और बाकी है`
                          : `${targetWhistles - whistleCount} more to go`}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
                    {Array.from({ length: targetWhistles }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={i < whistleCount ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${i < whistleCount ? "bg-primary text-primary-foreground" : "bg-secondary"
                          }`}
                      >
                        {i < whistleCount ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={addWhistle}
                      className="flex-1 rounded-full"
                      disabled={whistleCount >= targetWhistles}
                    >
                      + {language === "hi-IN" ? "सीटी जोड़ें" : "Add Whistle"}
                    </Button>
                    <Button variant="outline" onClick={() => setWhistleCount(0)} className="rounded-full">
                      {language === "hi-IN" ? "रीसेट" : "Reset"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-4">
                    <span className="text-sm text-muted-foreground">{language === "hi-IN" ? "लक्ष्य:" : "Target:"}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8 bg-transparent"
                      onClick={() => setTargetWhistles(Math.max(1, targetWhistles - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-semibold">{targetWhistles}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8 bg-transparent"
                      onClick={() => setTargetWhistles(targetWhistles + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Recipe info */}
              <div className="bg-card rounded-3xl border border-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={recipe.image || "/placeholder.jpg"}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{language === "hi-IN" ? recipe.nameHindi : recipe.name}</h4>
                    <p className="text-sm text-muted-foreground">{recipe.cuisine}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-xl bg-secondary">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">{recipe.time}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary">
                    <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">
                      {recipe.servings} {language === "hi-IN" ? "लोग" : "servings"}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary">
                    <Flame className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">{recipe.difficulty}</p>
                  </div>
                </div>
              </div>

              {/* Browse more recipes */}
              <Link href="/recipes">
                <Button variant="outline" className="w-full rounded-full gap-2 bg-transparent">
                  <ChefHat className="w-4 h-4" />
                  {language === "hi-IN" ? "और रेसिपी देखें" : "Browse More Recipes"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients modal */}
      <AnimatePresence>
        {showIngredients && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowIngredients(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{language === "hi-IN" ? "सामग्री" : "Ingredients"}</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowIngredients(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <ul className="space-y-3">
                {(recipe.ingredients ?? []).map((ing: any, index: number) => {
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-secondary"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">
                        {language === "hi-IN" ? ing.itemHindi : ing.item} —{" "}
                        {language === "hi-IN" ? ing.quantityHindi : ing.quantity}
                      </span>
                    </motion.li>
                  )
                })}

              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer modal */}
      <AnimatePresence>
        {showTimerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowTimerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-6 text-center">
                {language === "hi-IN" ? "टाइमर सेट करें" : "Set Timer"}
              </h3>
              <div className="flex items-center justify-center gap-6 mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-transparent"
                  onClick={() => setNewTimerMinutes(Math.max(1, newTimerMinutes - 1))}
                >
                  <Minus className="w-6 h-6" />
                </Button>
                <div className="text-center">
                  <span className="text-5xl font-bold text-primary">{newTimerMinutes}</span>
                  <p className="text-sm text-muted-foreground">{language === "hi-IN" ? "मिनट" : "minutes"}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 bg-transparent"
                  onClick={() => setNewTimerMinutes(newTimerMinutes + 1)}
                >
                  <Plus className="w-6 h-6" />
                </Button>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full bg-transparent"
                  onClick={() => setShowTimerModal(false)}
                >
                  {language === "hi-IN" ? "रद्द करें" : "Cancel"}
                </Button>
                <Button className="flex-1 rounded-full" onClick={() => addTimer(newTimerMinutes)}>
                  {language === "hi-IN" ? "शुरू करें" : "Start"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && recipe.youtubeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-3xl overflow-hidden max-w-4xl w-full aspect-video shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white z-10 bg-black/20 hover:bg-black/40 rounded-full"
                onClick={() => setShowVideo(false)}
              >
                <X className="w-6 h-6" />
              </Button>
              <iframe
                src={getYoutubeEmbedUrl(recipe.youtubeUrl)}
                title="Recipe Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main >
  )
}
