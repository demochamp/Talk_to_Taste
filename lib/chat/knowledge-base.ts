import { recipes } from "@/lib/recipes-data";

export interface KnowledgeEntry {
    keywords: RegExp[];
    answerEn: string;
    answerHi: string;
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
    {
        keywords: [/login/i, /sign in/i, /account/i, /log in/i],
        answerEn: "To login, please visit the Profile page. You can say 'Go to Profile' or click the user icon in the navigation bar.",
        answerHi: "Login karne ke liye Profile page par jayein. Aap 'Profile kholo' bol sakte hain."
    },
    {
        keywords: [/signup/i, /sign up/i, /register/i, /create account/i],
        answerEn: "You can create a new account on the Profile page. Just say 'Go to Profile' to get started.",
        answerHi: "Naya account banane ke liye Profile page par jayein. Bas boliye 'Profile kholo'."
    },
    {
        keywords: [/forgot password/i, /reset password/i, /password bhul gaya/i],
        answerEn: "If you forgot your password, you can reset it from the Login screen on the Profile page.",
        answerHi: "Agar aap password bhul gaye hain, toh aap Profile page par Login screen se ise reset kar sakte hain."
    },
    {
        keywords: [/commands/i, /kya bolu/i, /what can i say/i, /options/i, /help/i, /madad/i, /list/i],
        answerEn: "Here are the commands you can use:\n\n**Navigation:** 'Go to Home', 'Go to Recipes', 'Go to Profile', 'How it works'.\n**Cooking:** 'Start Cooking', 'Next step', 'Previous step', 'Repeat step', 'Go to step [number]', 'Stop', 'Play'.\n**Utilities:** 'Set timer for [x] minutes', 'Add whistle'.\n**Language:** 'Speak in Hindi', 'Speak in English'.\nFor recipes, please use the microphone next to the search bar.",
        answerHi: "Namaste! Main aapki cooking assistant hu. Aap ye commands use kar sakte hain:\n\n**Bhasha Badlein:** 'Hindi mein bolo' ya 'Speak in English'.\n**Navigation:** 'Ghar jao' (Home), 'Recipes dikhao', 'Profile kholo'.\n**Cooking:** 'Shuru karo', 'Agla step', 'Pichla step', 'Wapas bolo' (Repeat), 'Step [number] par jao'.\n**Utilities:** '[x] minute ka timer lagao', 'Seeti jodo'.\n**Recipe Dhundne ke liye:** Kripya upar diye gaye search bar ke paas wale mic ka istemal karein aur dish ka naam bolein (Jaise 'Paneer')."
    }
];

export function findKnowledgeResponse(text: string, lang: string): string | null {
    const lowerText = text.toLowerCase();

    // 1. Check FAQ knowledge base first
    for (const entry of KNOWLEDGE_BASE) {
        for (const pattern of entry.keywords) {
            if (pattern.test(lowerText)) {
                return lang === "hi-IN" ? entry.answerHi : entry.answerEn;
            }
        }
    }

    // 2. Dynamic Recipe Search (Redirection)
    // Check if the user is asking about a specific recipe or ingredient
    const recipeMatches = recipes.filter(r =>
        lowerText.includes(r.name.toLowerCase()) ||
        (r.nameHindi && lowerText.includes(r.nameHindi.toLowerCase())) ||
        r.tags.some(tag => lowerText.includes(tag.toLowerCase()))
    );

    if (recipeMatches.length > 0) {
        // Instead of confirming, redirect to manual search
        if (lang === "hi-IN") {
            return "कृपया रेसिपी सर्च करें या सर्च बार के पास वाले माइक का उपयोग करें।";
        } else {
            return "Please search for recipes manually or use the microphone next to the search bar.";
        }
    }

    return null;
}
