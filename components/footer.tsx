"use client"

import { motion } from "framer-motion"
import { ChefHat, Github, Twitter, Instagram, Youtube, Heart } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Recipes", href: "/recipes" },
    { label: "Voice Demo", href: "#voice-demo" },
    { label: "How It Works", href: "#how-it-works" },
  ],
  cuisines: [
    { label: "North Indian", href: "/recipes?cuisine=north-indian" },
    { label: "South Indian", href: "/recipes?cuisine=south-indian" },
    { label: "Punjabi", href: "/recipes?cuisine=punjabi" },
    { label: "Desserts", href: "/recipes?cuisine=desserts" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <ChefHat className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">TalktoTaste</span>
                <p className="text-xs text-muted-foreground">Voice Kitchen Assistant</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your AI-powered voice-first smart kitchen assistant for authentic Indian cooking. Cook hands-free, cook
              with confidence.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Cuisines</h4>
            <ul className="space-y-3">
              {footerLinks.cuisines.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© 2026 TalktoTaste. All rights reserved.</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Indian kitchens
          </p>
        </div>
      </div>
    </footer>
  )
}
