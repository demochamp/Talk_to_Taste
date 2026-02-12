export function speak(text: string, lang: "en-IN" | "hi-IN" = "en-IN") {
  if (typeof window === "undefined") return
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  speechSynthesis.speak(u)
}
