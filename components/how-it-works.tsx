"use client"

import { motion } from "framer-motion"
import { Search, Mic, ChefHat, Heart } from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Find Your Recipe",
    description: "Search from 90+ authentic Indian recipes by name, ingredients, or cuisine type.",
  },
  {
    icon: Mic,
    number: "02",
    title: "Start Voice Mode",
    description: "Activate voice control and let TalktoTaste guide you through each step hands-free.",
  },
  {
    icon: ChefHat,
    number: "03",
    title: "Cook Along",
    description: "Follow voice instructions, set timers, and track pressure cooker whistles — all by voice.",
  },
  {
    icon: Heart,
    number: "04",
    title: "Save & Share",
    description: "Save your favorite recipes and share your cooking journey with friends and family.",
  },
]

import { useTranslation } from "@/lib/i18n"
import { useVoice } from "@/hooks/use-voice"

export function HowItWorks() {
  const { t } = useTranslation()
  const { language } = useVoice()

  const steps = [
    {
      icon: Search,
      number: "01",
      title: t("how_it_works.step1"),
      description: t("how_it_works.step1_desc"),
    },
    {
      icon: Mic,
      number: "02",
      title: t("how_it_works.step2"),
      description: t("how_it_works.step2_desc"),
    },
    {
      icon: ChefHat,
      number: "03",
      title: t("how_it_works.step3"),
      description: t("how_it_works.step3_desc"),
    },
    {
      icon: Heart,
      number: "04",
      title: t("how_it_works.step4"),
      description: t("how_it_works.step4_desc"),
    },
  ]

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden bg-foreground">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">{t("how_it_works.tag")}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-background">{t("how_it_works.title")}</h2>
          <p className="text-lg text-background/60">{t("how_it_works.subtitle")}</p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}

              <motion.div whileHover={{ y: -8 }} className="relative z-10 text-center">
                {/* Number badge */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-accent mb-6 shadow-xl shadow-primary/20"
                >
                  <step.icon className="w-12 h-12 text-primary-foreground" />
                </motion.div>

                {/* Step number */}
                <div className="text-6xl font-bold text-background/10 mb-2">{step.number}</div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-background mb-3">{step.title}</h3>
                <p className="text-background/60 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
