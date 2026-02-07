"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Volume2, SkipForward, RotateCcw, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VoiceWaveAnimation } from "./voice-wave-animation"

const voiceCommands = [
  { command: '"Find Paneer Butter Masala"', response: "Found Paneer Butter Masala. Would you like to start cooking?" },
  { command: '"Next step"', response: "Step 4: Add tomato puree and cook for 5 minutes..." },
  { command: '"Set timer for 10 minutes"', response: "Timer set for 10 minutes. I'll notify you when it's done." },
  { command: '"2 whistles done"', response: "Noted! 2 whistles complete. 1 more whistle to go." },
  { command: '"Repeat"', response: "Repeating step 4: Add tomato puree and cook for 5 minutes..." },
]

export function VoiceDemo() {
  const [isListening, setIsListening] = useState(false)
  const [currentCommand, setCurrentCommand] = useState(0)
  const [showResponse, setShowResponse] = useState(false)

  const handleListen = () => {
    setIsListening(true)
    setShowResponse(false)

    setTimeout(() => {
      setIsListening(false)
      setShowResponse(true)
    }, 2000)
  }

  const nextCommand = () => {
    setCurrentCommand((prev) => (prev + 1) % voiceCommands.length)
    setShowResponse(false)
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Demo Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              {/* Glow effect */}
              <motion.div
                animate={{
                  scale: isListening ? [1, 1.1, 1] : 1,
                  opacity: isListening ? [0.3, 0.6, 0.3] : 0.2,
                }}
                transition={{ duration: 1, repeat: isListening ? Number.POSITIVE_INFINITY : 0 }}
                className="absolute inset-0 bg-primary/30 rounded-[3rem] blur-3xl"
              />

              {/* Main card */}
              <div className="relative glass-card rounded-[2rem] p-8 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-foreground">
                      {isListening ? "Listening..." : "Ready"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={nextCommand}>
                      <SkipForward className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Voice visualization */}
                <div className="py-8">
                  <VoiceWaveAnimation isActive={isListening} />
                </div>

                {/* Command display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentCommand}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center mb-8"
                  >
                    <p className="text-sm text-muted-foreground mb-2">Try saying:</p>
                    <p className="text-xl font-semibold text-foreground">{voiceCommands[currentCommand].command}</p>
                  </motion.div>
                </AnimatePresence>

                {/* Response */}
                <AnimatePresence>
                  {showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-2xl bg-primary/10 border border-primary/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                          <Volume2 className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <p className="text-sm text-foreground">{voiceCommands[currentCommand].response}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mic button */}
                <div className="flex justify-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleListen}
                    className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
                      isListening
                        ? "bg-destructive animate-pulse-glow"
                        : "bg-primary hover:bg-primary/90 shadow-primary/30"
                    }`}
                  >
                    {isListening ? (
                      <MicOff className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-primary-foreground" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">Voice Control</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Cook with Your
              <span className="gradient-text"> Natural Voice</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No more messy phone screens while cooking. Simply speak your commands and TalktoTaste will guide you
              through every step.
            </p>

            {/* Command examples */}
            <div className="space-y-4">
              {[
                { icon: SkipForward, text: '"Next step" - Move to the next instruction' },
                { icon: RotateCcw, text: '"Repeat" - Hear the current step again' },
                { icon: Timer, text: '"Set timer" - Voice-controlled timers' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
