import { VoiceIntent } from "@/lib/voice/command-processor"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { problem } = await req.json()

  return NextResponse.json({
    answer: `Quick fix for "${problem}": Add a little water, balance spices, and simmer slowly.`,
  })
}
export const COMMAND_PATTERNS: Record<VoiceIntent, RegExp[]> = {
  NAV_HOME: [
    /go to home/i,
    /visit home/i,
    /switch to home/i,
    /search homepage/,
    /search home/,
    /open home/i,
    /show home/i,
    /ghar jao/i,
    /home page/i,
    /homepage/i,
    /home kholo/i,
    /घर जाओ/i,
    /होम पेज/i,
    /मुख्य पृष्ठ/i,
    /home/i,
    /home page dikhao/i,
    /home page pe jao/i,
    /home page kholo/i
  ],
  NAV_RECIPES: [
    /go to recipes/i,
    /visit recipes/i,
    /switch to recipes/i,
    /open recipes/i,
    /show recipes/i,
    /find recipes/i,
    /find recipe/i,
    /search recipes/i,
    /search recipe/i,
    /recipes/i,
    /recipe/i,
    /vyanjan/i,
    /recipe pe jao/i,
    /recipes pe jao/i,
    /recipe dikhao/i,
    /find recipe/i,
    /cook something/i,
    /recipes dikhao/i,
    /vyanjan dikhao/i,
    /khana dikhao/i,
    /kya banao/i,
    /रेसिपी दिखाओ/i,
    /खाना है/i,
    /क्या बनाऊं/i
  ],
  NAV_PROFILE: [
    /go to profile/i,
    /visit profile/i,
    /switch to profile/i,
    /show profile/i,
    /my profile/i,
    /search profile/i,
    /profile/i,
    /open profile/i,
    /profile page/i,
    /profile dikhao/i,
    /profile kholo/i,
    /meri profile/i,
    /प्रोफाइल दिखाओ/i,
    /मेरी प्रोफाइल/i
  ],
  NAV_FEATURES: [
    /go to features/i,
    /visit features/i,
    /switch to features/i,
    /show features/i,
    /open features/i,
    /features page/i,
    /features batao/i,
    /features dikhao/i,
    /is app me kya hai/i,
    /visheshata/i,
    /फीचर्स दिखाओ/i,
    /विशेषता/i,
    /features/i,
    /search features/i
  ],
  NAV_HOW_IT_WORKS: [
    /how to work/i,
    /how it works/i,
    /how it's work/i,
    /how does it work/i,
    /kaise kaam karta hai/i,
    /guide me/i,
    /madad karo/i,
    /kaise use kare/i,
    /कैसे काम करता है/i,
    /मदद करो/i,
    /गाइड करो/i,
    /यह कैसे काम करता है/i
  ],
  COOK_START: [
    /start cooking/i,
    /let's cook/i,
    /begin cooking/i,
    /start recipe/i,
    /shuru karo/i,
    /pakana shuru karo/i,
    /banana shuru karo/i,
    /chalo banate hai/i,
    /शुरू करो/i,
    /पकाना शुरू करो/i,
    /चलो बनाते हैं/i,
    /cooking shuru kare/i
  ],
  STEP_NEXT: [
    /next step/i,
    /next instruction/i,
    /go next/i,
    /dusra step/i,
    /agla step/i,
    /aage badho/i,
    /next/i,
    /agla/i,
    /aage/i,
    /अगला स्टेप/i,
    /आगे बढ़ो/i,
    /अगला/i
  ],
  STEP_PREV: [
    /previous step/i,
    /go back/i,
    /last step/i,
    /pichla step/i,
    /peeche jao/i,
    /previous/i,
    /back/i,
    /piche/i,
    /peeche/i,
    /wapas/i
  ],
  STEP_REPEAT: [
    /repeat/i,
    /phir se/i,
    /dobara/i,
    /fir se/i,
    /wapas bolo/i,
    /what/i, // "what did you say"
    /sunayi nahi diya/i
  ],
  TIMER_SET: [
    /timer/i,
    /ghadi/i,
    /alarm/i
  ],
  WHISTLE_ADD: [
    /whistle/i,
    /seeti/i,
    /ct/i,
    /city/i,
    /citi/i,
    /whistle baj gayi/i,
    /seeti baj gayi/i,
    /सीटी/i,
    /सीटी बज गई/i
  ],
  GO_TO_STEP: [
    /step (?:number )?(\d+)/i,
    /step (\d+) pe (?:jao|le chalo)/i
  ],
  SEARCH_RECIPE: [
    /search/i,
    /dhundo/i,
    /find/i,
    /bana/i, // "pasta bana", "paneer bana"
    /recipe/i
  ],
  SEARCH_BY_INGREDIENTS: [
    /ingredients/i,
    /fridge/i,
    /kya bana sakta hu/i,
    /available/i
  ],
  SAVE_RECIPE: [
    /save/i,
    /favorite/i,
    /like/i,
    /pasand/i
  ],
  SHARE_RECIPE: [
    /share/i,
    /bhejo/i,
    /send/i
  ],
  STOP: [
    /stop/i,
    /ruko/i,
    /pause/i,
    /chup/i,
    /shant/i,
    /bas/i
  ],
  PLAY: [
    /play/i,
    /resume/i,
    /start/i,
    /chalu/i,
    /shuru/i
  ],
  // New Intents
  NAV_ADMIN: [
    /go to admin/i,
    /visit admin/i,
    /switch to admin/i,
    /open admin/i,
    /show admin/i,
    /admin dashboard/i,
    /admin page/i
  ],
  LOGIN: [
    /login/i,
    /sign in/i,
    /log in/i
  ],
  LOGOUT: [
    /logout/i,
    /sign out/i,
    /log out/i
  ],
  THEME_DARK: [
    /dark mode/i,
    /switch to dark/i,
    /go to dark/i,
    /open dark/i,
    /show dark/i
  ],
  THEME_LIGHT: [
    /light mode/i,
    /switch to light/i,
    /go to light/i,
    /open light/i,
    /show light/i
  ],
  UNKNOWN: []
}
