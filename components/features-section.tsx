"use client"

import { motion } from "framer-motion"
import { Mic, Timer, Languages, Accessibility, ChefHat, Bell, Gauge, Heart } from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Voice Commands",
    description: "Navigate recipes hands-free with natural voice commands in Hindi and English.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Timer,
    title: "Smart Timers",
    description: "Set and manage multiple timers with voice. Get notified when your dish is ready.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Gauge,
    title: "Whistle Tracking",
    description: "Track pressure cooker whistles automatically. Perfect cooking every time.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Languages,
    title: "Bilingual Support",
    description: "Cook in your preferred language. Full support for Hindi and English.",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    icon: ChefHat,
    title: "90+ Recipes",
    description: "Explore authentic Indian recipes with detailed step-by-step instructions.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Accessibility,
    title: "Accessible Design",
    description: "Designed for everyone — elderly, beginners, and visually impaired users.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss a step with intelligent voice reminders and notifications.",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description: "Build your personal cookbook with favorite recipes and cooking history.",
    gradient: "from-rose-500 to-pink-500",
  },
]

import { useTranslation } from "@/lib/i18n"
import { useVoice } from "@/hooks/use-voice"

export function FeaturesSection() {
  const { t } = useTranslation()
  const { language } = useVoice()

  const features = [
    {
      icon: Mic,
      title: t("features.voice_control"),
      description: t("features.voice_control_desc"),
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Timer,
      title: t("features.smart_timers"),
      description: t("features.smart_timers_desc"),
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Gauge,
      title: t("features.whistle_tracking"),
      description: t("features.whistle_tracking_desc"),
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Languages,
      title: t("features.bilingual"),
      description: t("features.bilingual_desc"),
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: ChefHat,
      title: t("features.recipes_count"),
      description: t("features.recipes_count_desc"),
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: Accessibility,
      title: t("features.accessible"),
      description: t("features.accessible_desc"),
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Bell,
      title: t("features.reminders"),
      description: t("features.reminders_desc"),
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Heart,
      title: t("features.favorites"),
      description: t("features.favorites_desc"),
      gradient: "from-rose-500 to-pink-500",
    },
  ]

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary uppercase tracking-wider"
          >
            {t("features.title")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-balance">
            {language === "hi-IN" ? "हाथों से मुक्त खाना पकाने के लिए" : "Everything You Need for"}
            <span className="gradient-text"> {language === "hi-IN" ? "सब कुछ" : "Hands-Free Cooking"}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "hi-IN"
              ? "आधुनिक भारतीय रसोई के लिए डिज़ाइन की गई वॉयस-कंट्रोल्ड सुविधाओं के साथ खाना पकाने का एक क्रांतिकारी तरीका अनुभव करें।"
              : "Experience a revolutionary way to cook with voice-controlled features designed for the modern Indian kitchen."}
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group h-full p-6 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
