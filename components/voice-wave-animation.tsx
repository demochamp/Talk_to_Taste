"use client"

import { motion } from "framer-motion"

interface VoiceWaveAnimationProps {
  isActive: boolean
  className?: string
}

export function VoiceWaveAnimation({ isActive, className = "" }: VoiceWaveAnimationProps) {
  const bars = 20

  return (
    <div className={`flex items-center justify-center gap-1 h-16 ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-t from-primary to-primary/50"
          animate={
            isActive
              ? {
                  height: [8, Math.random() * 40 + 20, 8],
                }
              : { height: 8 }
          }
          transition={{
            duration: 0.5,
            repeat: isActive ? Number.POSITIVE_INFINITY : 0,
            delay: i * 0.05,
            ease: "easeInOut",
          }}
          style={{ height: 8 }}
        />
      ))}
    </div>
  )
}
