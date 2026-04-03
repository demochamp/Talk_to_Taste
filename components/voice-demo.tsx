"use client"

import { motion } from "framer-motion"
import { ChefHat, SkipForward, RotateCcw, Volume2, Globe, Command } from "lucide-react"
import { useVoice } from "@/hooks/use-voice"
import { Badge } from "@/components/ui/badge"

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
        { en: "Start cooking", hi: "पकाना शुरू करो" },
        { en: "Next step", hi: "अगला स्टेप" },
        { en: "Previous step", hi: "पिछला स्टेप" },
        { en: "Repeat step", hi: "वापस" },
        { en: "Set timer for 5 minutes", hi: "5 मिनट का टाइमर" },
        { en: "Add 1 whistle", hi: "एक सीटी हो गई" },
        { en: "Stop / Pause", hi: "रुको / बस करो" },
      ]
    },
    {
      title: isHindi ? "नेविगेशन" : "Navigation",
      icon: SkipForward,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      commands: [
        { en: "Go to Home", hi: "मुख्य पृष्ठ" },
        { en: "Show Recipes", hi: "रेसिपी दिखाओ" },
        { en: "Open Profile", hi: "प्रोफाइल दिखाओ" },
        { en: "Show Features", hi: "विशेषताएं दिखाओ" },
        { en: "How it works", hi: "यह कैसे काम करता है" },
        { en: "Admin Dashboard", hi: "एडमिन पेज" },
      ]
    },
    {
      title: isHindi ? "सिस्टम और सर्च" : "System & Search",
      icon: Command,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      commands: [
        { en: "Find Paneer recipe", hi: "पनीर की रेसिपी ढूंढो" },
        { en: "Recipes with Rice / Gobi", hi: "चावल / गोभी वाली रेसिपी" },
        { en: "Open it", hi: "ओपन / इसे खोलो" },
        { en: "Next step", hi: "अगला स्टेप" },
        { en: "Switch to Dark Mode", hi: "डार्क मोड लगाओ" },
        { en: "Speak in Hindi", hi: "हिंदी में बोलो" },
        { en: "Show Voice Commands", hi: "कमांड्स दिखाओ" },
      ]
    },
  ]

  return (
    <section id="voice-demo" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/20 text-primary animate-pulse">
            {isHindi ? "वॉइस कमांड गाइड" : "Voice Command Guide"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
            {isHindi ? "स्मार्ट कुकिंग।" : "Cook Smart."}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500 italic">
              {isHindi ? "आसान वॉइस कमांड।" : "Speak Easy."}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg italic">
            {isHindi
              ? "इन आसान इंग्लिश या हिंदी कमांड्स के साथ अपनी कुकिंग का पूरा कंट्रोल लें।"
              : "Effortlessly control your cooking journey using these intuitive English or Hindi commands."}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-md border border-border/50 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className="p-8 border-b border-border/50">
                <div className="flex items-center gap-4 mb-2">
                  <div className={`p-3 rounded-2xl ${category.bgColor} group-hover:scale-110 transition-transform`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
              </div>

              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/30">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50">English</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50">हिंदी</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.commands.map((cmd, i) => (
                      <tr key={i} className="group/row hover:bg-primary/5 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium border-b border-border/20 group-last/row:border-0 italic">{cmd.en}</td>
                        <td className="px-6 py-4 text-sm font-medium border-b border-border/20 group-last/row:border-0 text-primary">{cmd.hi}</td>
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
