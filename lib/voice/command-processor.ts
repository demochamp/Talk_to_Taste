import { navigate } from "./navigation-utils"

export type VoiceIntent =
    | "NAV_HOME"
    | "NAV_RECIPES"
    | "NAV_PROFILE"
    | "NAV_FEATURES"
    | "NAV_HOW_IT_WORKS"
    | "COOK_START"
    | "STEP_NEXT"
    | "STEP_PREV"
    | "STEP_REPEAT"
    | "TIMER_SET"
    | "WHISTLE_ADD"
    | "GO_TO_STEP"
    | "SEARCH_RECIPE"
    | "SEARCH_BY_INGREDIENTS"
    | "SAVE_RECIPE"
    | "SHARE_RECIPE"
    | "STOP"
    | "PLAY"
    | "UNKNOWN"

interface CommandMatch {
    intent: VoiceIntent
    confidence: number
    params?: any
}

const COMMAND_PATTERNS: Record<VoiceIntent, RegExp[]> = {
    NAV_HOME: [
        /go to home/i,
        /open home/i,
        /show home/i,
        /ghar jao/i,
        /home page/i,
        /homepage/i,
        /mukhya pristh/i,
        /home kholo/i,
        /घर जाओ/i,
        /होम पेज/i,
        /मुख्य पृष्ठ/i
    ],
    NAV_RECIPES: [
        /go to recipes/i,
        /show recipes/i,
        /open recipes/i,
        /browse recipes/i,
        /recipes dikhao/i,
        /khana hai/i,
        /find recipes/i,
        /recipe section/i,
        /kya banau/i,
        /kya pakau/i,
        /vyanjan dikhao/i,
        /recipes? pe jao/i,
        /recipes? par jao/i,
        /रेसिपी दिखाओ/i,
        /खाना है/i,
        /क्या बनाऊं/i
    ],
    NAV_PROFILE: [
        /go to profile/i,
        /show profile/i,
        /my profile/i,
        /open profile/i,
        /profile dikhao/i,
        /profile kholo/i,
        /meri profile/i,
        /प्रोफाइल दिखाओ/i,
        /मेरी प्रोफाइल/i
    ],
    NAV_FEATURES: [
        /go to features/i,
        /show features/i,
        /features batao/i,
        /features dikhao/i,
        /is app me kya hai/i,
        /visheshata/i,
        /फीचर्स दिखाओ/i,
        /विशेषता/i
    ],
    NAV_HOW_IT_WORKS: [
        /how it works/i,
        /how does it work/i,
        /kaise kaam karta hai/i,
        /guide me/i,
        /madad karo/i,
        /kaise use kare/i,
        /कैसे काम करता है/i,
        /मदद करो/i,
        /गाइड करो/i
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
        /चलो बनाते हैं/i
    ],
    STEP_NEXT: [
        /next step/i,
        /next instruction/i,
        /go next/i,
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
        /pichla/i,
        /wapas jao/i,
        /पिछला स्टेप/i,
        /पीछे जाओ/i,
        /वापस जाओ/i
    ],
    STEP_REPEAT: [
        /repeat/i,
        /say again/i,
        /repeat step/i,
        /fir se bolo/i,
        /dohrao/i,
        /what did you say/i,
        /phir se bolo/i,
        /wapas bolo/i,
        /samajh nahi aaya/i,
        /फिर से बोलो/i,
        /दोहराओ/i,
        /क्या कहा/i
    ],
    TIMER_SET: [
        /set timer/i,
        /start timer/i,
        /timer lagao/i,
        /timer set karo/i,
        /alarm lagao/i,
        /टाइमर लगाओ/i,
        /अलार्म लगाओ/i
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
    GO_TO_STEP: [], // Handled dynamically usually, but key needed
    SEARCH_RECIPE: [],
    SEARCH_BY_INGREDIENTS: [],
    SAVE_RECIPE: [],
    SHARE_RECIPE: [],
    STOP: [
        /stop/i,
        /ruko/i,
        /pause/i,
        /chup raho/i,
        /ruk jao/i
    ],
    PLAY: [
        /play/i,
        /resume/i,
        /start/i, // context dependent
        /chalu karo/i,
        /shuru karo/i
    ],
    UNKNOWN: []
}

export function processVoiceCommand(text: string): CommandMatch {
    const normalizedText = text.toLowerCase().trim()

    for (const [intent, patterns] of Object.entries(COMMAND_PATTERNS)) {
        for (const pattern of patterns) {
            if (pattern.test(normalizedText)) {
                return {
                    intent: intent as VoiceIntent,
                    confidence: 1.0,
                    // Extract params if needed later (e.g. timer duration)
                }
            }
        }
    }

    return { intent: "UNKNOWN", confidence: 0 }
}
