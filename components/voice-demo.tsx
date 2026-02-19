"use client"

import { motion } from "framer-motion"
import { ChefHat, SkipForward, RotateCcw, Volume2, Globe, Command } from "lucide-react"
import { useVoice } from "@/hooks/use-voice"

export function VoiceDemo() {
  const { language } = useVoice()
  const isHindi = language === "hi-IN"

  const categories = [
    {
      title: isHindi ? "कुकिंग कंट्रोल" : "Cooking Controls",
      icon: ChefHat,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      commands: [
        { en: "Start cooking", hinglish: "Shuru karo", hi: "शुरू करो" },
        { en: "Next step", hinglish: "Agla step", hi: "अगला स्टेप" },
        { en: "Previous step", hinglish: "Pichla step", hi: "पिछला स्टेप" },
        { en: "Repeat step", hinglish: "Fir se bolo", hi: "फिर से बोलो" },
        { en: "Set timer for 5 mins", hinglish: "5 min ka timer lagao", hi: "5 मिनट का टाइमर" },
        { en: "2 whistles done", hinglish: "2 seeti ho gayi", hi: "2 सीटी हो गई" },
        { en: "Stop cooking", hinglish: "Ruko / Bas karo", hi: "रुको / बस करो" },
      ]
    },
    {
      title: isHindi ? "नेविगेशन" : "Navigation",
      icon: SkipForward,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      commands: [
        { en: "Go to Home", hinglish: "Ghar le chalo", hi: "घर ले चलो" },
        { en: "Show Recipes", hinglish: "Recipes dikhao", hi: "रेसिपी दिखाओ" },
        { en: "Open Profile", hinglish: "Profile kholo", hi: "प्रोफाइल खोलो" },
        { en: "Go to Admin", hinglish: "Admin page dikhao", hi: "एडमिन पेज दिखाओ" },
        { en: "How does it work?", hinglish: "Kaise kaam karta hai?", hi: "कैसे काम करता है?" },
      ]
    },
    {
      title: isHindi ? "सर्च और सेटिंग्स" : "Search & System",
      icon: RotateCcw,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      commands: [
        { en: "Find Paneer recipes", hinglish: "Paneer ki recipe dhundo", hi: "पनीर की रेसिपी ढूंढो" },
        { en: "Recipes with potato", hinglish: "Aloo wale recipes", hi: "आलू वाली रेसिपी" },
        { en: "Login / Logout", hinglish: "Login karo / Bahar niklo", hi: "लॉगिन / लॉगआउट" },
        { en: "Dark Mode", hinglish: "Dark mode lagao", hi: "डार्क मोड लगाओ" },
        { en: "Speak in Hindi", hinglish: "Hindi mein bolo", hi: "हिंदी में बोलो" },
      ]
    },
  ]

  return (
    <section id="voice-demo" className="py-24 relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            {isHindi ? "वॉइस कमांड गाइड" : "Voice Command Guide"}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            {isHindi ? (
              <>अपनी आवाज़ से <span className="text-primary">किचन को कंट्रोल करें</span></>
            ) : (
              <>Master Your Kitchen with <span className="text-primary">Voice</span></>
            )}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isHindi
              ? "अंग्रेजी, हिंदी या हिंग्लिश में बात करें। यहाँ आपके लिए सभी कमांड्स की लिस्ट है।"
              : "Speak naturally in English, Hindi, or Hinglish. Here's your cheat sheet to controlling the entire experience."}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 border-b border-border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2.5 rounded-xl ${category.bgColor}`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="font-bold text-lg">{category.title}</h3>
                </div>
              </div>

              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground font-medium">
                    <tr>
                      <th className="px-4 py-3 font-semibold w-1/3">English</th>
                      <th className="px-4 py-3 font-semibold w-1/3">Hinglish</th>
                      <th className="px-4 py-3 font-semibold w-1/3 font-hindi">हिंदी</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {category.commands.map((cmd, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground/90">{cmd.en}</td>
                        <td className="px-4 py-3 text-muted-foreground">{cmd.hinglish}</td>
                        <td className="px-4 py-3 text-foreground/80 font-hindi">{cmd.hi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
