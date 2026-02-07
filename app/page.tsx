import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { RecipeShowcase } from "@/components/recipe-showcase"
import { VoiceDemo } from "@/components/voice-demo"
import { HowItWorks } from "@/components/how-it-works"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { FloatingSpices } from "@/components/floating-spices"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FloatingSpices />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <RecipeShowcase />
      <VoiceDemo />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
