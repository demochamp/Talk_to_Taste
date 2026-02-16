import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "TalktoTaste - Voice Controlled Cooking Assistant",
  description:
    "Your AI-powered voice-first smart kitchen assistant for authentic Indian cooking. Cook hands-free with step-by-step voice guidance in Hindi and English.",
  keywords: [
    "cooking assistant",
    "voice cooking",
    "Indian recipes",
    "hands-free cooking",
    "AI kitchen",
    "Hindi recipes",
  ]
}

import { AuthGuard } from "@/components/auth-guard"
import { UserProvider } from "@/components/user-provider"

// ... imports remain the same ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <UserProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
          </UserProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
