"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function AnimatedLogo() {
    const [isDancing, setIsDancing] = useState(false)
    const [timestamp, setTimestamp] = useState<number | null>(null)

    useEffect(() => {
        setTimestamp(new Date().getTime())
    }, [])

    const triggerDance = () => {
        setIsDancing(true)
        setTimeout(() => setIsDancing(false), 2000)
    }

    return (
        <motion.div
            className="relative w-12 h-12 md:w-[52px] md:h-[52px] flex items-center justify-center rounded-2xl overflow-hidden bg-[#e26500] shadow-lg border-2 border-white"
            initial={{ rotate: 0, y: 0, scale: 1 }}
            animate={isDancing ? {
                rotate: [0, -15, 15, -15, 15, 0],
                y: [0, -6, 0, -6, 0],
                scale: 1.1,
                transition: { duration: 1.2, repeat: Infinity }
            } : { rotate: 0, y: 0, scale: 1 }}
            whileHover={{
                rotate: [0, -15, 15, -15, 15, 0],
                y: [0, -6, 0, -6, 0],
                scale: 1.1,
                transition: { duration: 1.2, repeat: Infinity }
            }}
            whileTap={{ scale: 0.9 }}
            onClick={triggerDance}
        >
            <div className="relative w-full h-full">
                <img
                    src={`/logo.png${timestamp ? `?v=${timestamp}` : ''}`}
                    alt="TalktoTaste Logo"
                    className="w-full h-full object-contain scale-110"
                />
            </div>
        </motion.div>
    )
}
