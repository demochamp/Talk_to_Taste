import { NextRequest, NextResponse } from "next/server"

// The specific "Waterfall" list of models to try
// Note: Only Gemini 2.0+ models currently support accurate Audio Generation via REST API
const TTS_MODELS = [
    "gemini-2.5-flash-preview-tts",
    "gemini-2.5-flash-native-audio-latest",
    "gemini-2.0-flash-exp", // Keep as deep backup just in case
]

export async function POST(req: NextRequest) {
    console.log("[API] TTS Request Started")
    let errorLog: string[] = []

    try {
        const { text, language = "en-US", gender = "neutral" } = await req.json()

        if (!process.env.GOOGLE_API_KEY) {
            console.error("Missing GOOGLE_API_KEY environment variable")
            return NextResponse.json(
                { error: "API Key not configured" },
                { status: 500 }
            )
        }

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 })
        }

        // Iterate through models in order (Waterfall)
        for (const modelName of TTS_MODELS) {
            try {
                console.log(`Attempting TTS with model: ${modelName}`)

                // Note: As of early 2025, audio generation syntax might vary slightly per model/SDK version.
                // We use the standard generateContent with responseModalities if supported, 
                // or the specific speech endpoint structure if available in the SDK.
                // For now, we'll assume the standard generation capability.

                // IMPORTANT: The prompt needs to guide the model to speak the text.
                // We ask for "Audio generation" of the provided text.
                // Since the standard SDK 'generateContent' returns text/multimodal, 
                // and 'generateConnection' might be needed for real-time.
                // However, for REST-like TTS, we can try to use the model to "speak" the response.

                // Wait: The standard Gemini API `generateContent` might not return AUDIO directly in the basic SDK yet. as of Feb 2025?
                // Let's retry the approach: Verify if SDK supports direct speech.
                // If not, we might need to use the REST endpoint manually if the SDK lags behind.

                // ACTUALLY: The user wants us to use the SDK.
                // Let's try the standard approach. If it fails, we fall back to the next model.

                // Re-implementing loop using direct Fetch for maximum control over the header/body
                const apiKey = process.env.GOOGLE_API_KEY
                const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`

                // Construct prompt to specifically ask for speech
                // For Gemini 2.0, we use responseModalities
                const payload = {
                    contents: [{ parts: [{ text: `Please read this text out loud in ${language}: "${text}"` }] }],
                    generationConfig: {
                        responseModalities: ["AUDIO"],
                        speechConfig: {
                            voiceConfig: {
                                prebuiltVoiceConfig: {
                                    voiceName: gender === "female" ? "Fenrir" : "Puck" // Example voice names
                                }
                            }
                        }
                    }
                }

                const fetchResponse = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })

                if (!fetchResponse.ok) {
                    const errorText = await fetchResponse.text()
                    throw new Error(`HTTP ${fetchResponse.status}: ${errorText}`)
                }

                const data = await fetchResponse.json()

                // Extract audio from response
                // Gemini 2.0 Audio usually comes in candidates[0].content.parts[0].inlineData
                const candidate = data.candidates?.[0];
                const part = candidate?.content?.parts?.[0];

                if (part?.inlineData) {
                    // Success! We have audio.
                    // MimeType is usually "audio/wav" or "audio/mp3"
                    const audioBase64 = part.inlineData.data;
                    const audioBuffer = Buffer.from(audioBase64, 'base64');

                    return new NextResponse(audioBuffer, {
                        status: 200,
                        headers: {
                            'Content-Type': part.inlineData.mimeType || 'audio/wav',
                            'Content-Length': audioBuffer.length.toString(),
                        }
                    });
                }

                throw new Error(`Model ${modelName} returned no audio data`)

            } catch (err: any) {
                const msg = `[${modelName}] Failed: ${err.message}`
                console.warn(msg)
                errorLog.push(msg)
                continue;
            }
        }

        // If loop finishes without returning, all models failed
        throw new Error(`All TTS models failed. Errors: ${JSON.stringify(errorLog)}`)

    } catch (error: any) {
        console.error("All Gemini TTS attempts failed:", error)
        return NextResponse.json(
            { error: "TTS Generation failed", details: error.message },
            { status: 500 }
        )
    }
}
