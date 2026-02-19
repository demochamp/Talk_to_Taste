import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { RecipeShowcase } from "@/components/recipe-showcase"
import { VoiceDemo } from "@/components/voice-demo"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { FloatingSpices } from "@/components/floating-spices"
import { Navigation } from "@/components/navigation"
import { GlobalVoiceControl } from "@/components/global-voice-control"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GlobalVoiceControl />
      <FloatingSpices />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <RecipeShowcase />
      <VoiceDemo />
      <HowItWorks />
      <Footer />
    </main>
  )
}
