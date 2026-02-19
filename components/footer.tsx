"use client"

import { ChefHat, Heart } from "lucide-react"
import Link from "next/link"

import { useTranslation, TranslationKey } from "@/lib/i18n"

const footerLinks = (t: (key: TranslationKey) => string) => ({
  product: [
    { label: t("footer.links.features"), href: "#features" },
    { label: t("footer.links.recipes"), href: "/recipes" },
    { label: t("footer.links.voiceDemo"), href: "#voice-demo" },
    { label: t("footer.links.howItWorks"), href: "#how-it-works" },
  ],
  cuisines: [
    { label: t("footer.links.northIndian"), href: "/recipes?cuisine=north-indian" },
    { label: t("footer.links.southIndian"), href: "/recipes?cuisine=south-indian" },
    { label: t("footer.links.punjabi"), href: "/recipes?cuisine=punjabi" },
    { label: t("footer.links.desserts"), href: "/recipes?cuisine=desserts" },
  ],

})


export function Footer() {
  const { t } = useTranslation()
  const links = footerLinks(t)

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <ChefHat className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">TalktoTaste</span>
                <p className="text-xs text-muted-foreground">{t('brand.tagline')}</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t('footer.slogan')}
            </p>
            {/* Social links */}
            <div className="flex gap-4">
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.product')}</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {/* Simplified for now as links are dynamic array. Ideally map these keys too */}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.cuisines')}</h4>
            <ul className="space-y-3">
              {links.cuisines.map((link) => (
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
          <p className="text-sm text-muted-foreground"> <span className="opacity-50 text-xs"></span></p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t('footer.made_with')} <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
