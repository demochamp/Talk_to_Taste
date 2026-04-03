export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server"

// The system prompt injecting the core knowledge identity for the Chat Assistant
const SYSTEM_PROMPT = `You are the core AI Help Assistant for the web application "Talk to Taste".
Talk to Taste is an interactive, voice-controlled, and mobile-friendly web application designed to help users explore AI-generated authentic food recipes and guide them step-by-step through the cooking process.

Your primary purpose is to be the ultimate guide for users who ask:
- How to use the website
- What voice commands they can speak into the microphone
- General cooking or recipe advice connected to the platform
- Troubleshooting navigation

### Deep Knowledge of Talk to Taste Features & Layout:
1. **Pages & Navigation**:
   - **Home Page (/)**: Features a giant Voice Search bar, trending recipes, and an overview of 'How it Works'.
   - **Recipes Page (/recipes)**: A vast library of categorized authentic recipes (North Indian, South Indian, Fast Food, etc.) with search and filtering.
   - **Cook Page (/cook)**: The core interactive part. Once a recipe is selected, this page loads the ingredients, step-by-step instructions, specialized timers, and a YouTube video demonstration.
   - **Profile Page (/profile)**: Where users check their favorites and history.
   - **Admin Dashboard (/admin)**: For site management (requires admin privileges).

2. **Crucial Features**:
   - **Dual Modality Support**: Users can either physically click buttons or use the highly integrated Microphone Voice Commands (active via the corner floating Chef Hat widget or searchbars).
   - **Bilingual**: The app fully supports English (en-IN) and Hindi (hi-IN) voice TTS/STT interactions!
   - **Timers**: Built-in timers specifically tracking cooking durations directly linked to steps.
   - **YouTube Integration**: Interactive video tutorials explicitly tested for each recipe.

3. **Full List of Working Voice Commands**
   You *MUST* inform users they can use these exact commands in either Pure English or Pure Hindi script:
   
  **A. General Navigation**:
   - "Go to Home" / "à¤®à¥à¤–à¥à¤¯ à¤ªà¥ƒà¤·à¥à¤ "
   - "Go to Recipes" / "à¤°à¥‡à¤¸à¤¿à¤ªà¥€ à¤¦à¤¿à¤–à¤¾à¤“"
   - "Open it" / "à¤“à¤ªà¤¨"
   - "Go to Profile" / "à¤ªà¥à¤°à¥‹à¤«à¤¾à¤‡à¤²"
   - "Go to Admin" / "à¤à¤¡à¤®à¤¿à¤¨ à¤ªà¥‡à¤œ"
   - "Go to Features" / "à¤µà¤¿à¤¶à¥‡à¤·à¤¤à¤¾à¤à¤‚"
   - "How it works" / "à¤¯à¤¹ à¤•à¥ˆà¤¸à¥‡ à¤•à¤¾à¤® à¤•à¤°à¤¤à¤¾ à¤¹à¥ˆ"
   
   **B. Device & App Settings**:
   - "Switch to Dark Mode" / "à¤¡à¤¾à¤°à¥à¤• à¤®à¥‹à¤¡ à¤²à¤—à¤¾à¤“"
   - "Switch to Light Mode" / "à¤²à¤¾à¤‡à¤Ÿ à¤®à¥‹à¤¡ à¤²à¤—à¤¾à¤“"
   - "Speak in Hindi" / "à¤¹à¤¿à¤‚à¤¦à¥€ à¤®à¥‡à¤‚ à¤¬à¥‹à¤²à¥‹"
   - "Speak in English" / "à¤…à¤‚à¤—à¥à¤°à¥‡à¤œà¥€ à¤®à¥‡à¤‚ à¤¬à¥‹à¤²à¥‹"
   
   **C. Searching & Finding Food**:
   - "Find [Dish] recipe" / "[Dish] à¤•à¥€ à¤°à¥‡à¤¸à¤¿à¤ªà¥€ à¤¢à¥‚à¤‚à¤¢à¥‹"
   - "Recipes with Rice / Egg / Gobi" / "à¤šà¤¾à¤µà¤² / à¤…à¤‚à¤¡à¤¾ / à¤—à¥‹à¤­à¥€ à¤µà¤¾à¤²à¥€ à¤°à¥‡à¤¸à¤¿à¤ªà¥€"
   - "Filter with [Ingredient]" / "[Ingredient] à¤•à¥€ à¤°à¥‡à¤¸à¤¿à¤ªà¥€"
   
   **D. Cooking Control (Only on Cook Page)**:
   - "Start cooking" / "à¤ªà¤•à¤¾à¤¨à¤¾ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‹"
   - "Next step" / "à¤…à¤—à¤²à¤¾ à¤¸à¥à¤Ÿà¥‡à¤ª"
   - "Previous step" / "à¤ªà¤¿à¤›à¤²à¤¾ à¤¸à¥à¤Ÿà¥‡à¤ª"
   - "Repeat step" / "à¤µà¤¾à¤ªà¤¸"
   - "Set timer for [X] minutes" / "[X] à¤®à¤¿à¤¨à¤Ÿ à¤•à¤¾ à¤Ÿà¤¾à¤‡à¤®à¤°"
   - "Add [X] whistles" / "[X] à¤¸à¥€à¤Ÿà¥€ à¤¹à¥‹ à¤—à¤ˆ"
   - "Go to Step 5" / "à¤¸à¥à¤Ÿà¥‡à¤ª 5 à¤ªà¤° à¤œà¤¾à¤“"
   - "Stop" / "à¤°à¥à¤•à¥‹"
   - "Play" / "à¤šà¤²à¤¾à¤“"

### How to Respond:
- Be incredibly helpful, concise, and structured. Use short paragraphs.
- When explaining how to use a feature, actively suggest 2-3 specific voice commands they can try.
- If asked about the app's nature, emphasize it's a "voice-first web application", not just a regular website.
- Answer in the language the user asks you in (if they type Hindi, reply Hindi).
- Keep answers under 3-4 short sentences to prevent long TTS. Provide actionable help immediately.`

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json()

        // --- 0. PREPARE API KEYS ---
        const keys = [
            process.env.GOOGLE_API_KEY_1,
            process.env.GOOGLE_API_KEY_2,
            process.env.GOOGLE_API_KEY_3,
            process.env.GOOGLE_API_KEY // Legacy fallback
        ].filter(Boolean) as string[];

        // Deduplicate keys
        const apiKeys = Array.from(new Set(keys));
        
        if (apiKeys.length === 0) {
            console.error("Missing Google API Keys (GOOGLE_API_KEY_1, etc.)")
            return NextResponse.json(
                { error: "API Keys not configured" },
                { status: 500 }
            )
        }

        const contents = [];
        let lastRole = null;

        if (history && Array.isArray(history)) {
            for (const msg of history) {
                const currentRole = msg.role === 'assistant' ? 'model' : 'user';
                if (currentRole !== lastRole) {
                    contents.push({
                        role: currentRole,
                        parts: [{ text: msg.content }]
                    });
                    lastRole = currentRole;
                }
            }
        }

        if (lastRole === 'user') contents.pop();
        
        contents.push({
            role: "user",
            parts: [{ text: message }]
        });

        const payload = {
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: contents
        };

        // --- 1. ATTEMPT GEMINI WATERFALL (Primary) ---
        // We cycle through model tiers, and for each tier, we cycle through all available keys.
        const TIERS = [
            { name: "Flash 2.0 (Fastest)", models: ["gemini-2.0-flash"] },
            { name: "Pro (High Quality)", models: ["gemini-1.5-pro"] },
            { name: "Flash 1.5 (Standard)", models: ["gemini-1.5-flash"] }
        ];


        let geminiResponseText = null;
        let successfulModel = null;
        let successfulKeyIndex = -1;

        outerTierLoop: for (const tier of TIERS) {
            for (const modelName of tier.models) {
                for (let i = 0; i < apiKeys.length; i++) {
                    const currentKey = apiKeys[i];
                    try {
                        console.log(`[Chat API] Tier: ${tier.name} | Model: ${modelName} | Account: ${i + 1}`);
                        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${currentKey}`;

                        const fetchResponse = await fetch(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });

                        const data = await fetchResponse.json();

                        if (fetchResponse.ok && data.candidates && data.candidates.length > 0) {
                            const candidate = data.candidates[0];
                            geminiResponseText = candidate.content?.parts?.[0]?.text;
                            if (geminiResponseText) {
                                successfulModel = modelName;
                                successfulKeyIndex = i + 1;
                                console.log(`[Chat API] âœ… Success with Account ${successfulKeyIndex} using ${modelName}`);
                                break outerTierLoop; // COMPLETE SUCCESS! Exit all loops
                            }
                        }
                        
                        // Handle failures
                        if (fetchResponse.status === 429) {
                            console.warn(`[Chat API] âš ï¸ QUOTA EXCEEDED for Account ${i + 1} (${modelName}). Trying next key...`);
                        } else {
                            console.warn(`[Chat API] âš ï¸ Account ${i + 1} (${modelName}) returned status ${fetchResponse.status}.`);
                            if (data.error) console.warn("Error Detail:", data.error.message);
                        }

                    } catch (err: any) {
                        console.error(`[Chat API] âŒ Critical failure on Account ${i + 1} with ${modelName}:`, err.message);
                        // Continue to next key or model
                    }
                }
            }
        }

        // Return Gemini response if successful
        if (geminiResponseText) {
            return NextResponse.json({ 
                response: geminiResponseText,
                _model: successfulModel // Internal hint
            });
        }

        // --- 2. FALLBACK TO GROQ (Secondary) ---
        if (process.env.GROQ_API_KEY) {
            try {
                console.log("ðŸš€ [Chat API] ALL Gemini models exhausted. Switching to Groq Final Fallback...");
                const groqUrl = "https://api.groq.com/openai/v1/chat/completions";
                
                // Map history for OpenAI/Groq format
                const groqMessages = [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...(history || []).map((msg: any) => ({
                        role: msg.role === 'assistant' ? 'assistant' : 'user',
                        content: msg.content
                    })),
                    { role: "user", content: message }
                ];

                const groqResponse = await fetch(groqUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "llama-3.1-8b-instant", // Super fast model
                        messages: groqMessages,
                        max_tokens: 500,
                        temperature: 0.7
                    })
                });

                const groqData = await groqResponse.json();

                if (groqResponse.ok && groqData.choices?.[0]?.message?.content) {
                    return NextResponse.json({ response: groqData.choices[0].message.content });
                } else {
                    console.error("Groq API Error:", JSON.stringify(groqData, null, 2));
                }

            } catch (groqErr: any) {
                console.error("Groq fallback critical error:", groqErr.message);
            }
        }

        // --- 3. FINAL FALLBACK: CUSTOM MESSAGE ---
        return NextResponse.json(
             { 
               error: "All providers exhausted", 
               details: "Gemini and Groq are both unreachable. Please check your API keys.",
               response: "I'm sorry, I am having serious trouble connecting to my brain right now. Please tell the developer to check the API keys!" 
             },
             { status: 500 }
        );

    } catch (error: any) {
        console.error("Internal Chat API error:", error);
        return NextResponse.json(
             { error: "Generation failed", details: error.message },
             { status: 500 }
        );
    }
}
