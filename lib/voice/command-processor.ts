
import { recipes } from "@/lib/recipes-data"

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
    | "NAV_ADMIN"
    | "LOGIN"
    | "LOGOUT"
    | "THEME_DARK"
    | "THEME_LIGHT"
    | "SET_LANGUAGE_HI"
    | "SET_LANGUAGE_EN"
    | "SHOW_COMMANDS"
    | "NAV_VOICE_GUIDE"
    | "OPEN_RECIPE"
    | "FILTER_CATEGORY"
    | "FILTER_DIFFICULTY"
    | "FILTER_CUISINE"
    | "FILTER_INGREDIENTS"
    | "UNKNOWN"

export interface CommandMatch {
    intent: VoiceIntent
    confidence: number
    params?: Record<string, string | number>
}

const COMMAND_PATTERNS: Record<VoiceIntent, RegExp[]> = {
    // ... existing patterns ...
    NAV_HOME: [
        /go to home/i,
        /visit home/i,
        /switch to home/i,
        /search homepage/,
        /search home/,
        /open home/i,
        /show home/i,
        /home page/i,
        /homepage/i,
        /home/i,
        /ghar/i,
        /ghar jao/i, // Hinglish
        /ghar le chalo/i, // Hinglish
        /home le chalo/i, // Hinglish
        /home page dikhao/i, // Hinglish
        /होम पेज/i,
        /मुख्य पृष्ठ/i,
        /घर ले चलो/i,
        /होम पेज दिखाओ/i,
        /होम पेज पर जाओ/i
    ],
    OPEN_RECIPE: [
        // ... existing patterns ...
        /open it/i,
        /open/i,
        /kholo/i, // Hinglish
        /ise kholo/i, // Hinglish
        /kholke do/i, // Hinglish
        /kholke dho/i, // Hinglish (common typo)
        /open karke dho/i, // Hinglish (common typo)
        /start karke dho/i, // Hinglish (common typo)
        /start karke do/i, // Hinglish
        /open karke do/i, // Hinglish
        /open and give/i,
        /chalu karo/i, // Hinglish
        /first wala/i, // Hinglish
        /phela wala/i, // Hinglish
        /khol do/i, // Hinglish
        /खोल दो/i,
        /इसे खोलो/i,
        /ओपन करो/i,
        /खोल के दो/i,
        /स्टार्ट करके दो/i,
        /पहला वाला/i
    ],
    FILTER_INGREDIENTS: [
        /recipes with (.+)/i,
        /(.+) wale recipes/i,
        /(.+) ki recipe/i,
        /(.+) se bana/i,
        /(.+) ingredients/i,
        /show me (.+) recipes/i,
        /(.+) dishes/i,
        /(.+) ka khana/i,
        /(.+) ki sabji/i,
        /(.+) की रेसिपी/i,
        /(.+) वाले/i,
        /(.+) से बना/i
    ],
    FILTER_CATEGORY: [
        /show (breakfast|snack|curry|dessert|sweet|rice|bread)/i,
        /(breakfast|snack|curry|dessert|sweet|rice|bread) dikhao/i,
        /(nasta|naashta) dikhao/i,
        /meetha dikhao/i,
        /sabji dikhao/i,
        /roti dikhao/i,
        /chawal dikhao/i,
        /नाश्ता दिखाओ/i,
        /मिठाई दिखाओ/i,
        /रोटी दिखाओ/i,
        /चावल दिखाओ/i,
        /सब्जी दिखाओ/i
    ],
    FILTER_DIFFICULTY: [
        // ... existing patterns ...
        /show (easy|medium|hard) recipes/i,
        /(easy|medium|hard) recipes dikhao/i,
        /asan khana/i,
        /mushkil khana/i,
        /jaldi banne wala/i,
        /आसान खाना/i,
        /मुश्किल खाना/i,
        /जल्दी बनने वाला/i
    ],
    FILTER_CUISINE: [
        // ... existing patterns ...
        /show (north indian|south indian|chinese|italian|punjabi|gujarati|bengali|maharashtrian|rajasthani) recipes/i,
        /(north indian|south indian|chinese|italian|punjabi|gujarati|bengali|maharashtrian|rajasthani) khana/i,
        /(north indian|south indian|chinese|italian|punjabi|gujarati|bengali|maharashtrian|rajasthani) recipes dikhao/i,
        /punjabi food/i,
        /south indian food/i,
        /bengali food/i,
        /gujarati food/i,
        /पंजाबी खाना/i,
        /साउथ इंडियन/i,
        /गुजराती खाना/i,
        /बंगाली खाना/i,
        /राजस्थानी खाना/i,
        /साउथ इंडियन खाना/i,
        /नॉर्थ इंडियन खाना/i
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
        /cooking section/i,
        /cook something/i,
        /recipes dikhao/i, // Hinglish
        /recipes kholo/i, // Hinglish
        /kya banau/i, // Hinglish
        /khana banana hai/i, // Hinglish
        /vyanjan/i, // Hinglish
        /vyanjan dikhao/i, // Hinglish
        /व्यंजन/i,
        /रेसिपी/i,
        /खाना/i,
        /रेसिपी दिखाओ/i,
        /खाना बनाना है/i,
        /व्यंजन दिखाओ/i,
        /रेसिपी सेक्शन/i,
        /कुछ पकाना है/i
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
        /profile dikhao/i, // Hinglish
        /profile kholo/i, // Hinglish
        /meri profile/i, // Hinglish
        /mera profile/i, // Hinglish
        /mera profile dikhao/i, // Hinglish
        /mera प्रोफाइल/i,
        /प्रोफाइल/i,
        /प्रोफाइल दिखाओ/i,
        /प्रोफाइल खोलो/i,
        /मेरी प्रोफाइल/i
    ],
    NAV_FEATURES: [
        /go to features/i,
        /visit features/i,
        /switch to features/i,
        /show features/i,
        /open features/i,
        /features page/i,
        /features/i,
        /search features/i,
        /features dikhao/i, // Hinglish
        /features batao/i, // Hinglish
        /kya features hai/i, // Hinglish
        /feeches/i, // Common mispronunciation handled as Hinglish-ish
        /फीचर्स/i,
        /विशेषताएं/i,
        /फीचर्स दिखाओ/i,
        /विशेषता बताओ/i,
        /इस ऐप में क्या है/i
    ],
    NAV_HOW_IT_WORKS: [
        /how to work/i,
        /how it works/i,
        /how it's work/i,
        /how does it work/i,
        /guide me/i,
        /kaise kaam karta hai/i, // Hinglish
        /ye kaise chalta hai/i, // Hinglish
        /kaise use kare/i, // Hinglish
        /madad karo/i, // Hinglish
        /kaise karte hain/i, // Hinglish
        /कैसे काम करता है/i,
        /कैसे यूज़ करें/i,
        /गाइड करो/i,
        /मदद करो/i,
        /यह कैसे काम करता है/i,
        /इस्तेमाल कैसे करें/i
    ],
    COOK_START: [
        /start cooking/i,
        /let's cook/i,
        /begin cooking/i,
        /start recipe/i,
        /cooking start/i,
        /shuru karo/i, // Hinglish
        /chalu karo/i, // Hinglish
        /banana shuru karo/i, // Hinglish
        /pakana shuru karo/i, // Hinglish
        /cook karna hai/i, // Hinglish
        /स्टार्ट/i, // Transliterated English
        /स्टार्ट कुकिंग/i, // Transliterated English
        /शुरू करो/i,
        /पकाना शुरू करो/i,
        /बनाना शुरू करो/i,
        /चलो बनाते हैं/i,
        /कुकिंग शुरू करें/i,
        /रेसिपी चालू करो/i
    ],
    STEP_NEXT: [
        /next step/i,
        /next instruction/i,
        /go next/i,
        /next/i,
        /agla step/i, // Hinglish
        /agla/i, // Hinglish
        /aage badho/i, // Hinglish
        /aage chalo/i, // Hinglish
        /next batao/i, // Hinglish
        /iske baad kya/i, // Hinglish
        /नेक्स्ट/i, // Transliterated English
        /नेक्स्ट स्टेप/i, // Transliterated English
        /अगला स्टेप/i,
        /अगला चरण/i,
        /अगला/i,
        /आगे बढ़ो/i,
        /आगे/i,
        /अगला बताओ/i,
        /आगे चलो/i
    ],
    STEP_PREV: [
        /previous step/i,
        /go back/i,
        /last step/i,
        /previous/i,
        /back/i,
        /pichla step/i, // Hinglish
        /pichla/i, // Hinglish
        /peeche jao/i, // Hinglish
        /wapas jao/i, // Hinglish
        /wapas/i, // Hinglish
        /back jao/i, // Hinglish
        /प्रीवियस/i, // Transliterated English
        /बैक/i, // Transliterated English
        /पिछला स्टेप/i,
        /पिछला चरण/i,
        /पिछला/i,
        /पीछे/i,
        /पीछे जाओ/i,
        /वापस जाओ/i,
        /वापस चलो/i
    ],
    STEP_REPEAT: [
        /repeat/i,
        /say again/i,
        /what/i, // "what did you say"
        /fir se bolo/i, // Hinglish
        /phir se bolo/i, // Hinglish
        /dobara bolo/i, // Hinglish
        /wapas bolo/i, // Hinglish
        /sunayi nahi diya/i, // Hinglish
        /kya kaha/i, // Hinglish
        /repeat karo/i, // Hinglish
        /रिपीट/i, // Transliterated English
        /फिर से/i,
        /फिर से बोलो/i,
        /दोबारा बोलो/i,
        /दोहराओ/i,
        /क्या कहा/i,
        /सुनाई नहीं दिया/i,
        /वापस बोलो/i,
        /रिपीट करो/i
    ],
    TIMER_SET: [
        /timer/i,
        /set timer/i,
        /alarm/i,
        /timer laga do/i, // Hinglish
        /timer set karo/i, // Hinglish
        /alarm lagao/i, // Hinglish
        /ghadi/i, // Hinglish
        /kitna time/i, // Hinglish
        /titles/i, // Common misheard 'timers'
        /टाइमर/i,
        /टाइमर सेट करो/i,
        /अलार्म/i, // Transliterated English
        /घड़ी/i,
        /कितना समय हुआ/i,
        /अलार्म लगाओ/i
    ],
    WHISTLE_ADD: [
        /whistle/i,
        /seeti/i, // Hinglish
        /city/i, // Common misheard
        /ct/i, // Common misheard
        /whistle baj gayi/i, // Hinglish
        /seeti baj gayi/i, // Hinglish
        /ek owr seeti/i, // Hinglish
        /विसल/i, // Transliterated English
        /सीटी/i,
        /सीटी बज गई/i,
        /एक और सीटी/i,
        /विसल/i
    ],
    GO_TO_STEP: [
        /step (?:number )?(\d+)/i,
        /step (\d+) pe (?:jao|chalo)/i, // Hinglish
        /step (\d+) पर (?:जाओ|चलो)/i,
        /चरण (\d+) पर (?:जाओ|चलो)/i
    ],
    SEARCH_RECIPE: [
        /search/i,
        /find/i,
        /recipe/i,
        /dhundo/i, // Hinglish
        /khojo/i, // Hinglish
        /search karo/i, // Hinglish
        /banao/i, // Hinglish "pasta banao"
        /kaise banta hai/i, // Hinglish
        /banana sikhao/i, // Hinglish
        /ढूंढो/i,
        /खोजो/i,
        /सर्च करो/i,
        /कोई रेसिपी ढूंढो/i,
        /बनाओ/i // "pasta banao"
    ],
    SEARCH_BY_INGREDIENTS: [
        /ingredients/i,
        /fridge/i,
        /available/i,
        /kya bana sakta hu/i, // Hinglish
        /kya bana sakti hu/i, // Hinglish
        /kya banau/i, // Hinglish
        /fridge me kya hai/i, // Hinglish
        /samaana/i, // Hinglish
        /samagri/i, // Hinglish
        /सामग्री/i,
        /फ्रिज में क्या है/i,
        /क्या बना सकता हूं/i,
        /क्या बना सकती हूं/i,
        /क्या बनाऊं/i,
        /उपलब्ध/i
    ],
    SAVE_RECIPE: [
        /save/i,
        /favorite/i,
        /like/i,
        /save karo/i, // Hinglish
        /pasand aaya/i, // Hinglish
        /like karo/i, // Hinglish
        /fav/i, // Hinglish
        /सेव करो/i,
        /पसंदीदा/i,
        /लाइक करो/i,
        /पसंद आया/i
    ],
    SHARE_RECIPE: [
        /share/i,
        /send/i,
        /share karo/i, // Hinglish
        /bhejo/i, // Hinglish
        /send karo/i, // Hinglish
        /kisi ko bhejo/i, // Hinglish
        /message karo/i, // Hinglish
        /शेयर करो/i,
        /भेजो/i,
        /भेज दो/i,
        /किसी को भेजो/i
    ],
    STOP: [
        /stop/i,
        /pause/i,
        /ruko/i, // Hinglish
        /bas/i, // Hinglish
        /bas karo/i, // Hinglish
        /chup/i, // Hinglish
        /shant/i, // Hinglish
        /wait/i, // Hinglish
        /thhama/i, // Hinglish
        /ruk jao/i, // Hinglish
        /स्टॉप/i, // Transliterated English
        /पॉज़/i, // Transliterated English
        /रुको/i,
        /बस/i,
        /चुप रहो/i,
        /शांत रहो/i,
        /रुक जाओ/i,
        /स्टॉप/i
    ],
    PLAY: [
        /play/i,
        /resume/i,
        /start/i,
        /chalo/i, // Hinglish
        /chalu/i, // Hinglish
        /chalu karo/i, // Hinglish
        /play karo/i, // Hinglish
        /resume karo/i, // Hinglish
        /aage badho/i, // Hinglish
        /प्ले/i, // Transliterated English
        /रिज्यूम/i, // Transliterated English
        /स्टार्ट/i, // Transliterated English
        /चलाओ/i,
        /शुरू/i,
        /चालू करो/i,
        /प्ले करो/i,
        /रिज्यूम करो/i
    ],
    // New Intents
    NAV_ADMIN: [
        /go to admin/i,
        /visit admin/i,
        /switch to admin/i,
        /open admin/i,
        /show admin/i,
        /admin dashboard/i,
        /admin page/i,
        /admin dikhao/i, // Hinglish
        /admin panel/i, // Hinglish
        /admin page kholo/i, // Hinglish
        /एडमिन/i,
        /एडमिन पेज/i,
        /एडमिन पैनल/i
    ],
    LOGIN: [
        /login/i,
        /sign in/i,
        /log in/i,
        /login karo/i, // Hinglish
        /sign in karo/i, // Hinglish
        /andar jao/i, // Hinglish
        /account kholo/i, // Hinglish
        /लॉगिन/i, // Transliterated English - already present but grouping
        /लॉग इन/i,
        /साइन इन/i
    ],
    LOGOUT: [
        /logout/i,
        /sign out/i,
        /log out/i,
        /logout karo/i, // Hinglish
        /sign out karo/i, // Hinglish
        /bahar niklo/i, // Hinglish
        /exit/i, // Hinglish
        /band karo/i, // Hinglish
        /लॉगआउट/i, // Transliterated English
        /लॉग आउट/i,
        /साइन आउट/i,
        /बाहर निकलो/i
    ],
    THEME_DARK: [
        /dark mode/i,
        /switch to dark/i,
        /go to dark/i,
        /open dark/i,
        /show dark/i,
        /dark mode lagao/i, // Hinglish
        /dark theme/i, // Hinglish
        /andhera mode/i, // Hinglish
        /black theme/i, // Hinglish
        /kaala theme/i, // Hinglish
        /डार्क मोड/i,
        /डार्क मोड में जाओ/i,
        /काला थीम/i,
        /अंधेरा मोड/i
    ],
    THEME_LIGHT: [
        /light mode/i,
        /go to light mode/i,
        /switch to light/i,
        /go to light/i,
        /open light/i,
        /show light/i,
        /light mode lagao/i, // Hinglish
        /light theme/i, // Hinglish
        /white theme/i, // Hinglish
        /safed theme/i, // Hinglish
        /ujala mode/i, // Hinglish
        /लाइट मोड/i,
        /लाइट मोड में जाओ/i,
        /सफेद थीम/i,
        /उजाला मोड/i
    ],
    SET_LANGUAGE_HI: [
        /hindi mein bolo/i, // Common
        /speak in hindi/i,
        /switch to hindi/i,
        /hindi language/i,
        /hindi me baat karo/i, // Hinglish
        /mujhe hindi chahiye/i, // Hinglish
        /hindi me batao/i, // Hinglish
        /hindi/i,
        /hindi please/i, // Hinglish
        /हिंदी में बोलो/i,
        /हिंदी में बात करो/i,
        /हिंदी भाषा/i,
        /मुझे हिंदी चाहिए/i,
        /हिंदी/i
    ],
    SET_LANGUAGE_EN: [
        /english mein bolo/i, // Hinglish
        /speak in english/i,
        /switch to english/i,
        /english language/i,
        /english me baat karo/i, // Hinglish
        /english please/i, // Hinglish
        /english/i,
        /अंग्रेजी में बोलो/i,
        /इंग्लिश में बोलो/i,
        /अंग्रेजी/i,
        /इंग्लिश/i
    ],
    SHOW_COMMANDS: [
        /commands batao/i, // Common Hinglish
        /commands dikhao/i, // Hinglish
        /commands/i, // Common
        /help/i,
        /help me/i,
        /help show commands/i, // Requested
        /show help/i, // Requested
        /help commands/i, // Requested
        /what should i say/i,
        /what can i say/i,
        /list commands/i,
        /commands for english/i, // Requested
        /give me the commands/i, // Requested
        /show me the commands/i, // Requested
        /search english commands/i, // Requested
        /hindi commands/i, // Requested
        /commands bataiye/i, // Requested (corrected spelling)
        /commands dikhaye/i, // Requested (corrected spelling)
        /commands pe le jao/i, // Requested
        /madad karo/i, // Hinglish
        /kya bolu/i, // Hinglish
        /kya karna hai/i, // Hinglish
        /options/i, // Hinglish
        /कमांड्स दिखाओ/i,
        /कमांड्स बताओ/i, // Requested Pure Hindi
        /कमांड्स बताइए/i, // Requested Pure Hindi
        /कमांड्स दिखाएं/i, // Requested Pure Hindi
        /कमांड्स पर ले जाओ/i, // Requested Pure Hindi
        /हिंदी कमांड्स/i, // Requested Pure Hindi
        /क्या बोलूं/i,
        /मदद करो/i,
        /हेल्प/i,
        /कमांड बताओ/i,
        /क्या कह सकता हूं/i
    ],
    NAV_VOICE_GUIDE: [
        /open voice command/i,
        /show voice command guide/i,
        /voice command guide/i,
        /voice command kholo/i,
        /voice command pe jao/i,
        /voice command dikhao/i,
        /बॉइस कमांड/i,
        /वॉइस कमांड/i,
        /वॉइस कमांड दिखाओ/i,
        /कमांड गाइड/i,
        /वॉइस गाइड/i,
        /voice guide/i,
        /कमांड दिखाओ/i,
        /गाइड दिखाओ/i,
        /गाइड खोलें/i,
        /ओपन वॉइस कमांड/i,
        /ओपन कमांड गाइड/i
    ],
    UNKNOWN: []
}

export function processVoiceCommand(text: string): CommandMatch {
    const lowerTranscript = text.toLowerCase().trim()

    // 1. Dynamic Search (High Priority)
    // Check for specific recipe names (English, Hindi, Hinglish, Synonyms)
    for (const recipe of recipes) {
        const checkMatch = (str?: string) => str && lowerTranscript.includes(str.toLowerCase())

        if (
            checkMatch(recipe.name) ||
            checkMatch(recipe.nameHindi) ||
            checkMatch(recipe.nameHinglish) ||
            recipe.synonyms?.some((s: string) => checkMatch(s))
        ) {
            // If explicit "open" command or just the name
            if (lowerTranscript.match(/open|start|cook|kholo|banao|shuru/)) {
                return {
                    intent: "OPEN_RECIPE",
                    confidence: 0.95,
                    params: { value: recipe.id.toString(), index: recipe.id }
                }
            }
            // If "show" or just name -> Search
            return {
                intent: "SEARCH_RECIPE",
                confidence: 0.9,
                params: { value: recipe.name } // Use English name for search
            }
        }
    }

    // Check for ingredients
    // We collect all unique ingredients first to avoid loop overhead if possible, 
    // but a simple loop is fine for < 100 recipes.
    for (const recipe of recipes) {
        for (const ing of recipe.ingredients) {
            if (lowerTranscript.includes(ing.item.toLowerCase()) || lowerTranscript.includes(ing.itemHindi.toLowerCase())) {
                // Double check context 'recipe with X'
                return {
                    intent: "FILTER_INGREDIENTS",
                    confidence: 0.9,
                    params: { ingredient: ing.item } // Normalize to English
                }
            }
        }
    }

    // Check all patterns
    for (const [intentKey, patterns] of Object.entries(COMMAND_PATTERNS)) {
        const intent = intentKey as VoiceIntent
        for (const pattern of patterns) {
            const match = lowerTranscript.match(pattern)
            if (match) {
                // Determine confidence based on match length relative to input
                const confidence = match[0].length / lowerTranscript.length > 0.8 ? 1.0 : 0.8

                // Extract params
                let params: CommandMatch["params"] = {}

                if (intent === "FILTER_CATEGORY") {
                    const captured = match[1] || match[0]
                    // Map Hindi/Hinglish terms to English internal values
                    if (captured.match(/nasta|naashta|नाश्ता/i)) params.category = "Breakfast"
                    else if (captured.match(/meetha|mithai|मिठाई/i)) params.category = "Dessert"
                    else if (captured.match(/sabji|सब्जी/i)) params.category = "Curries"
                    else if (captured.match(/roti|रोटी/i)) params.category = "Bread"
                    else if (captured.match(/chawal|चावल/i)) params.category = "Rice Dishes"
                    else params.category = captured.charAt(0).toUpperCase() + captured.slice(1)
                }

                if (intent === "FILTER_DIFFICULTY") {
                    const captured = match[1] || match[0]
                    if (captured.match(/asan|jaldi|आसान|जल्दी/i)) params.difficulty = "Easy"
                    else if (captured.match(/mushkil|hard|मुश्किल/i)) params.difficulty = "Hard"
                    else params.difficulty = "Medium"
                }

                if (intent === "FILTER_CUISINE") {
                    const captured = match[1] || match[0]
                    // Normalize cuisine names
                    if (captured.match(/north indian|नॉर्थ इंडियन/i)) params.cuisine = "North Indian"
                    else if (captured.match(/south indian|साउथ इंडियन|south/i)) params.cuisine = "South Indian"
                    else if (captured.match(/punjabi|पंजाबी/i)) params.cuisine = "Punjabi"
                    else if (captured.match(/gujarati|गुजराती/i)) params.cuisine = "Gujarati"
                    else if (captured.match(/bengali|बंगाली/i)) params.cuisine = "Bengali"
                    else if (captured.match(/rajasthani|राजस्थानी/i)) params.cuisine = "Rajasthani"
                    else params.cuisine = captured.charAt(0).toUpperCase() + captured.slice(1)
                }

                if (intent === "FILTER_INGREDIENTS") {
                    const captured = match[1] || match[0]
                    // Clean up common connectors
                    params.ingredient = captured
                        .replace(/\b(aur|and|with)\b/gi, "")
                        .trim()
                }

                if (intent === "GO_TO_STEP") {
                    params.value = match[1]
                }

                if (intent === "WHISTLE_ADD") {
                    params.value = match[1]
                }

                if (intent === "TIMER_SET") {
                    params.value = match[0]
                }

                return { intent, confidence, params }
            }
        }
    }

    return { intent: "UNKNOWN", confidence: 0 }
}
