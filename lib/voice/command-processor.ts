
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
        // English
        /go to home/i,
        /go home/i,
        /home/i,
        /homepage/i,
        // Hindi
        /होम/i,
        /मुख्य पृष्ठ/i,
        /घर ले चलो/i,
        /होम पेज दिखाओ/i,
        /होम पेज/i,
        /घर/i
    ],
    OPEN_RECIPE: [
        // English
        /open it/i,
        /open/i,
        /start/i,
        /cook/i,
        // Hindi
        /ओपन करो/i,
        /ओपन/i,
        /खोलो/i,
        /चलाओ/i,
        /शुरू करो/i,
        /इसे खोलो/i,
        /पहला वाला/i,
        /बनाओ/i
    ],
    FILTER_INGREDIENTS: [
        /recipes with (.+)/i,
        /show me (.+) recipes/i,
        /(.+) dishes/i,
        /(.+) ingredients/i,
        /(.+) की रेसिपी/i,
        /(.+) वाले/i,
        /(.+) से बना/i
    ],
    FILTER_CATEGORY: [
        /show (breakfast|snack|curry|dessert|sweet|rice|bread)/i,
        /नाश्ता दिखाओ/i,
        /मिठाई दिखाओ/i,
        /रोटी दिखाओ/i,
        /चावल दिखाओ/i,
        /सब्जी दिखाओ/i
    ],
    FILTER_DIFFICULTY: [
        /show (easy|medium|hard) recipes/i,
        /आसान खाना/i,
        /मुश्किल खाना/i,
        /जल्दी बनने वाला/i
    ],
    FILTER_CUISINE: [
        /show (north indian|south indian|chinese|italian|punjabi|gujarati|bengali|maharashtrian|rajasthani) recipes/i,
        /पंजाबी खाना/i,
        /साउथ इंडियन/i,
        /गुजराती खाना/i,
        /बंगाली खाना/i,
        /राजस्थानी खाना/i,
        /साउथ इंडियन खाना/i,
        /नॉर्थ इंडियन खाना/i
    ],
    NAV_RECIPES: [
        // English
        /recipes/i,
        /recipe/i,
        /find recipes/i,
        /show recipes/i,
        // Hindi
        /रेसिपी/i,
        /व्यंजन/i,
        /खाना/i,
        /रेसिपी दिखाओ/i,
        /ओपन/i,
        /ओपन करो/i,
        /व्यंजन दिखाओ/i
    ],
    NAV_PROFILE: [
        // English
        /profile/i,
        /my profile/i,
        // Hindi
        /प्रोफाइल/i,
        /मेरी प्रोफाइल/i,
        /मेरा प्रोफाइल/i,
        /प्रोफाइल दिखाओ/i,
        /प्रोफाइल खोलो/i
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
        /फीचर्स/i,
        /विशेषताएं/i,
        /फीचर्स दिखाओ/i,
        /विशेषता बताओ/i,
        /इस ऐप में क्या है/i
    ],
    NAV_HOW_IT_WORKS: [
        // English
        /how it works/i,
        /how to work/i,
        /guide me/i,
        // Hindi
        /कैसे काम करता है/i,
        /कैसे इस्तेमाल करें/i,
        /गाइड करो/i,
        /मदद करो/i,
        /यह कैसे काम करता है/i
    ],
    COOK_START: [
        // English
        /start cooking/i,
        /start recipe/i,
        /begin cooking/i,
        /let's cook/i,
        // Hindi
        /पकाना शुरू करो/i,
        /बनाना शुरू करो/i,
        /चालू करो/i,
        /शुरू करो/i,
        /बनाना है/i,
        /रेसिपी चालू करो/i
    ],
    STEP_NEXT: [
        // English
        /next step/i,
        /go next/i,
        /next/i,
        // Hindi
        /अगला/i,
        /अगला स्टेप/i,
        /अगला चरण/i,
        /अगले चरण/i,
        /अगले/i,
        /आगे बढ़ो/i,
        /आगे/i,
        /अगला बताओ/i
    ],
    STEP_PREV: [
        // English
        /previous step/i,
        /go back/i,
        /previous/i,
        /back/i,
        // Hindi
        /पिछला/i,
        /पिछला स्टेप/i,
        /पिछला चरण/i,
        /पिछले/i,
        /पीछे जाओ/i,
        /पीछे/i,
        /वापस जाओ/i
    ],
    STEP_REPEAT: [
        // English
        /repeat step/i,
        /repeat/i,
        /say again/i,
        // Hindi
        /वापस/i,
        /वापस बोलो/i,
        /दुहराओ/i,
        /दोहराओ/i,
        /फिर से बताओ/i,
        /दोबारा बोलो/i,
        /फिर से/i
    ],
    TIMER_SET: [
        /timer/i,
        /set timer/i,
        /alarm/i,
        /टाइमर/i,
        /टाइमर सेट करो/i,
        /अलार्म/i,
        /घड़ी/i,
        /कितना समय हुआ/i,
        /अलार्म लगाओ/i
    ],
    WHISTLE_ADD: [
        /["']?(\d+)\s*whistles?["']?/i,
        /["']?(one|two|three|four|five|six|seven|eight|nine|ten)\s*whistles?["']?/i,
        /["']?(\d+)\s*(?:सीटी|सिटी)["']?/i,
        /["']?(एक|दो|तीन|चार|पांच|पाँच|छह|सात|आठ|नौ|दस)\s*(?:सीटी|सिटी)["']?/i,
        /["']?(?:सीटी|सिटी) बज गई["']?/i,
        /["']?एक और (?:सीटी|सिटी)["']?/i
    ],
    GO_TO_STEP: [
        /step (?:number )?(\d+)/i,
        /step (\d+) पर (?:जाओ|चलो)/i,
        /चरण (\d+) पर (?:जाओ|चलो)/i,
        /(\d+)(?:st|nd|rd|th)?\s*(?:step|स्टेप|चरण)/i,
        /(\d+)(?:st|nd|rd|th)/i, // Matches 1st, 2nd, 3rd, 4th
        /first step/i,
        /second step/i,
        /third step/i,
        /fourth step/i,
        /fifth step/i,
        /sixth step/i,
        /seventh step/i,
        /eighth step/i,
        /ninth step/i,
        /tenth step/i,
        /फ़र्स्ट स्टेप/i,
        /सेकंड स्टेप/i,
        /थर्ड स्टेप/i,
        /फोर्थ स्टेप/i,
        /फिफ्थ स्टेप/i,
        /सिक्स्थ स्टेप/i,
        /सेवंथ स्टेप/i,
        /एथ स्टेप/i,
        /नाइन्थ स्टेप/i,
        /टेंथ स्टेप/i,
        /पहला स्टेप/i,
        /दूसरा स्टेप/i,
        /तीसरा स्टेप/i,
        /चौथा स्टेप/i,
        /पांचवा स्टेप/i,
        /पांचवां स्टेप/i,
        /छठा स्टेप/i,
        /सातवां स्टेप/i,
        /सातवा स्टेप/i,
        /आठवां स्टेप/i,
        /आठवा स्टेप/i,
        /नौवां स्टेप/i,
        /नौवा स्टेप/i,
        /दसवां स्टेप/i,
        /दसवा स्टेप/i,
        /पहला चरण/i,
        /दूसरा चरण/i,
        /तीसरा चरण/i,
        /चौथा चरण/i,
        /पांचवा चरण/i,
        /पांचवां चरण/i,
        /छठा चरण/i,
        /सातवां चरण/i,
        /सातवा चरण/i,
        /आठवां चरण/i,
        /आठवा चरण/i,
        /नौवां चरण/i,
        /नौवा चरण/i,
        /दसवां चरण/i,
        /दसवा चरण/i
    ],
    SEARCH_RECIPE: [
        /search/i,
        /find/i,
        /recipe/i,
        /ढूंढो/i,
        /खोजो/i,
        /सर्च करो/i,
        /कोई रेसिपी ढूंढो/i,
        /बनाओ/i
    ],
    SEARCH_BY_INGREDIENTS: [
        /ingredients/i,
        /fridge/i,
        /available/i,
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
        /सेव करो/i,
        /पसंदीदा/i,
        /लाइक करो/i,
        /पसंद आया/i
    ],
    SHARE_RECIPE: [
        /share/i,
        /send/i,
        /शेयर करो/i,
        /भेजो/i,
        /भेज दो/i,
        /किसी को भेजो/i
    ],
    STOP: [
        // English
        /stop listening/i,
        /stop/i,
        /shut up/i,
        /quiet/i,
        // Hindi
        /रुको/i,
        /बंद करो/i,
        /बस करो/i,
        /चुप/i,
        /शांत रहो/i,
        /रुक जाओ/i
    ],
    PLAY: [
        // English
        /play/i,
        /continue/i,
        /resume/i,
        // Hindi
        /चलाओ/i,
        /सुनना है/i,
        /शुरू करो/i
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
        /एडमिन/i,
        /एडमिन पेज/i,
        /एडमिन पैनल/i
    ],
    LOGIN: [
        /login/i,
        /sign in/i,
        /log in/i,
        /लॉगिन/i,
        /लॉग इन/i,
        /साइन इन/i
    ],
    LOGOUT: [
        /logout/i,
        /sign out/i,
        /log out/i,
        /लॉगआउट/i,
        /लॉग आउट/i,
        /साइन आउट/i,
        /बाहर निकलो/i
    ],
    THEME_DARK: [
        /dark mode/i,
        /switch to dark/i,
        /black theme/i,
        /डार्क मोड/i,
        /डार्क मोड में जाओ/i,
        /काला थीम/i,
        /अंधेरा मोड/i
    ],
    THEME_LIGHT: [
        /light mode/i,
        /go to light mode/i,
        /switch to light/i,
        /white theme/i,
        /लाइट मोड/i,
        /लाइट मोड में जाओ/i,
        /सफेद थीम/i,
        /उजाला मोड/i
    ],
    SET_LANGUAGE_HI: [
        /speak in hindi/i,
        /switch to hindi/i,
        /hindi language/i,
        /hindi/i,
        /हिंदी में बोलो/i,
        /हिंदी में बात करो/i,
        /हिंदी भाषा/i,
        /मुझे हिंदी चाहिए/i,
        /हिंदी/i
    ],
    SET_LANGUAGE_EN: [
        /speak in english/i,
        /switch to english/i,
        /english language/i,
        /english/i,
        /अंग्रेजी में बोलो/i,
        /इंग्लिश में बोलो/i,
        /अंग्रेजी/i,
        /इंग्लिश/i
    ],
    SHOW_COMMANDS: [
        /commands/i,
        /help/i,
        /what should i say/i,
        /what can i say/i,
        /list commands/i,
        /कमांड्स दिखाओ/i,
        /कमांड्स बताओ/i,
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
                    // Map Hindi Script terms home to English internal values
                    if (captured.match(/नाश्ता/i)) params.category = "Breakfast"
                    else if (captured.match(/मिठाई/i)) params.category = "Dessert"
                    else if (captured.match(/सब्जी/i)) params.category = "Curries"
                    else if (captured.match(/रोटी/i)) params.category = "Bread"
                    else if (captured.match(/चावल/i)) params.category = "Rice Dishes"
                    else params.category = captured.charAt(0).toUpperCase() + captured.slice(1)
                }

                if (intent === "FILTER_DIFFICULTY") {
                    const captured = match[1] || match[0]
                    if (captured.match(/easy|आसान|जल्दी/i)) params.difficulty = "Easy"
                    else if (captured.match(/hard|मुश्किल/i)) params.difficulty = "Hard"
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
                    if (match[1]) {
                        params.value = match[1]
                    } else {
                        const str = match[0].toLowerCase()
                        if (str.match(/first|पहला|फ़र्स्ट/i)) params.value = "1"
                        else if (str.match(/second|दूसरा|सेकंड/i)) params.value = "2"
                        else if (str.match(/third|तीसरा|थर्ड/i)) params.value = "3"
                        else if (str.match(/fourth|चौथा|फोर्थ/i)) params.value = "4"
                        else if (str.match(/fifth|पांचवां|पांचवा|फिफ्थ/i)) params.value = "5"
                        else if (str.match(/sixth|छठा|सिक्स्थ/i)) params.value = "6"
                        else if (str.match(/seventh|सातवां|सातवा|सेवंथ/i)) params.value = "7"
                        else if (str.match(/eighth|आठवां|आठवा|एथ/i)) params.value = "8"
                        else if (str.match(/ninth|नौवां|नौवा|नाइन्थ/i)) params.value = "9"
                        else if (str.match(/tenth|दसवां|दसवा|टेंथ/i)) params.value = "10"
                    }
                }

                if (intent === "WHISTLE_ADD") {
                    if (match[1]) {
                        const val = match[1].toLowerCase()
                        if (val.match(/\d+/)) {
                            params.value = val
                        } else {
                            // Map Words to Digits
                            const wordMap: Record<string, string> = {
                                "one": "1", "two": "2", "three": "3", "four": "4", "five": "5",
                                "six": "6", "seven": "7", "eight": "8", "nine": "9", "ten": "10",
                                "एक": "1", "दो": "2", "तीन": "3", "चार": "4", "पांच": "5", "पाँच": "5",
                                "छह": "6", "सात": "7", "आठ": "8", "नौ": "9", "दस": "10"
                            }
                            params.value = wordMap[val] || "1"
                        }
                    } else {
                        params.value = "1"
                    }
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
