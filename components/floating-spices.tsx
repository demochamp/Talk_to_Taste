"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const spiceEmojis = ["🌶️", "🍋", "🧄", "🫚", "🌿", "🍅", "🧅", "🥬"]

export function FloatingSpices() {
  const [spices, setSpices] = useState<
    Array<{ id: number; emoji: string; x: number; delay: number; duration: number }>
  >([])

  useEffect(() => {
    const generatedSpices = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: spiceEmojis[i % spiceEmojis.length],
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
    }))
    setSpices(generatedSpices)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {spices.map((spice) => (
        <motion.div
          key={spice.id}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0.4, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: spice.duration,
            delay: spice.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute text-2xl sm:text-4xl"
          style={{ left: `${spice.x}%` }}
        >
          {spice.emoji}
        </motion.div>
      ))}
    </div>
  )
}
