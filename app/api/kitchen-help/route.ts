import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are a "High-End Executive Chef" and the Kitchen SOS Assistant for Talk to Taste. 
Your goal is to provide expert culinary fixes for cooking mistakes (salt, spice, burnt, texture) and ingredient substitutes.

CULINARY RULES:
1. Dish Specificity: You MUST respect the dish's identity. If a user is making a dry "Aloo Gobi," don't suggest adding water or gravy. If it's a "Butter Paneer," suggests cream/curd. If it's "Dal," suggest lemon or a potato.
2. Professional Tone: Be concise, authoritative, and helpful. Use culinary science (e.g., "Acid balances salt," "Dairy cuts spice").
3. Clarification: If the 'currentRecipe' is unknown and the fix depends on the dish type, ask: "Which recipe are you currently making? I can give you a better fix if I know the dish!"
4. Conciseness: Keep responses under 3 short sentences.
5. Language: Answer in the same language the user uses for their problem (Hindi or English).
6. No Nonsense: Never ask irrelevant questions like "what kind of burnt taste you want." Fix the problem.`

export async function POST(req: Request) {
    try {
        const { problem, language = "en-IN", currentRecipe } = await req.json()

        if (!problem) {
            return NextResponse.json({ error: "Problem is required" }, { status: 400 })
        }

        // --- PREPARE CONTEXT ---
        const contextText = currentRecipe 
            ? `USER'S CURRENT RECIPE: ${currentRecipe}\nPROBLEM: ${problem}`
            : `PROBLEM: ${problem}`;

        // --- 0. PREPARE API KEYS ---
        const keys = [
            process.env.GOOGLE_API_KEY_1,
            process.env.GOOGLE_API_KEY_2,
            process.env.GOOGLE_API_KEY_3,
            process.env.GOOGLE_API_KEY // Legacy fallback
        ].filter(Boolean) as string[];

        const apiKeys = Array.from(new Set(keys));
        
        if (apiKeys.length === 0) {
            console.error("Missing Google API Keys (GOOGLE_API_KEY_1, etc.)")
            return NextResponse.json(
                { error: "API Keys not configured" },
                { status: 500 }
            )
        }

        const payload = {
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: [{ parts: [{ text: contextText }] }]
        };

        // --- 1. ATTEMPT GEMINI WATERFALL (Primary) ---
        const TIERS = [
            { name: "Next-Gen Flash 3.1 (Preview)", models: ["gemini-3.1-flash-lite-preview", "gemini-3.1-flash-live-preview"] },
            { name: "Pro (High Quality)", models: ["gemini-1.5-pro"] },
            { name: "Flash 2.0 (Fast)", models: ["gemini-2.0-flash"] },
            { name: "Flash 1.5 (Standard)", models: ["gemini-1.5-flash"] }
        ];

        let geminiResponseText = null;

        outerTierLoop: for (const tier of TIERS) {
            for (const modelName of tier.models) {
                for (let i = 0; i < apiKeys.length; i++) {
                    const currentKey = apiKeys[i];
                    try {
                        console.log(`[Kitchen SOS] Tier: ${tier.name} | Model: ${modelName} | Account: ${i + 1}`);
                        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${currentKey}`;

                        const fetchResponse = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        const data = await fetchResponse.json();

                        if (!fetchResponse.ok) {
                            console.error(`[Kitchen SOS] ❌ API ERROR (${fetchResponse.status}):`, data);
                            if (fetchResponse.status === 429) continue; // Try next key
                        }

                        if (data.candidates && data.candidates.length > 0) {
                            const candidate = data.candidates[0];
                            geminiResponseText = candidate.content?.parts?.[0]?.text;
                            if (geminiResponseText) {
                                console.log(`[Kitchen SOS] ✅ Success with Account ${i + 1} using ${modelName}`);
                                break outerTierLoop; 
                            }
                        }

                    } catch (err: any) {
                        console.error(`[Kitchen SOS] ❌ Critical failure on Account ${i + 1} with ${modelName}:`, err.message);
                    }
                }
            }
        }

        if (geminiResponseText) {
            return NextResponse.json({ answer: geminiResponseText });
        }

        // --- 2. FINAL FALLBACK: CUSTOM MESSAGE ---
        const isHindi = language === "hi-IN";
        const fallbackAnswer = currentRecipe 
            ? (isHindi 
                ? `माफ़ कीजिये, ${currentRecipe} के लिए अभी एक्सपर्ट टिप्स नहीं मिल पा रहे हैं। कृपया कुछ देर में फिर से पूछें।` 
                : `Forgive me, I cannot find the expert tips for your ${currentRecipe} right now. Please try again in a moment.`)
            : (isHindi
                ? `मैं अभी आपकी मदद करने के लिए तैयार हूँ, लेकिन कृपया मुझे बताएं कि आप कौन सी रेसिपी बना रहे हैं? इससे मैं आपको बेहतर सलाह दे पाऊँगा।`
                : `I am ready to help, but please tell me which recipe are you making? This will help me give you the best advice.`);

        return NextResponse.json({ 
            answer: fallbackAnswer,
            error: "All AI providers exhausted"
        });

    } catch (error: any) {
        console.error("Internal Kitchen SOS error:", error);
        return NextResponse.json(
            { error: "Generation failed", details: error.message },
            { status: 500 }
        );
    }
}
