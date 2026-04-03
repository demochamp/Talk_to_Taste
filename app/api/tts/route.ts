import { NextRequest, NextResponse } from "next/server"

// The specific "Waterfall" list of models to try
const TIERS = [
    { name: "Next-Gen 3.1 (Preview)", models: ["gemini-3.1-flash-lite-preview", "gemini-3.1-flash-live-preview"] },
    { name: "Fast 2.0 (Premium Audio)", models: ["gemini-2.0-flash"] },
    { name: "Standard (Fallback)", models: ["gemini-1.5-flash"] }
]



function createWavHeader(pcmLength: number, sampleRate: number): Buffer {
    const numChannels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const header = new ArrayBuffer(44);
    const view = new DataView(header);

    // "RIFF" chunk descriptor
    view.setUint32(0, 1380533830, false); // 'RIFF'
    view.setUint32(4, 36 + pcmLength, true); // fileSize - 8
    view.setUint32(8, 1463899717, false); // 'WAVE'

    // "fmt " sub-chunk
    view.setUint32(12, 1718449184, false); // 'fmt '
    view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
    view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numChannels, true); // NumChannels
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, byteRate, true); // ByteRate
    view.setUint16(32, blockAlign, true); // BlockAlign
    view.setUint16(34, bitsPerSample, true); // BitsPerSample

    // "data" sub-chunk
    view.setUint32(36, 1684108385, false); // 'data'
    view.setUint32(40, pcmLength, true); // Subchunk2Size

    return Buffer.from(header);
}

async function fetchWithTimeout(url: string, options: any, timeout = 4000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

export async function POST(req: NextRequest) {
    console.log("[API] TTS Request Started - Aggressive Failover Enabled")
    let errorLog: string[] = []

    try {
        const { text, language = "en-US", gender = "neutral" } = await req.json()

        const keys = [
            process.env.GOOGLE_API_KEY_1,
            process.env.GOOGLE_API_KEY_2,
            process.env.GOOGLE_API_KEY_3,
            process.env.GOOGLE_API_KEY
        ].filter(Boolean) as string[];

        const apiKeys = Array.from(new Set(keys));
        
        if (apiKeys.length === 0) {
            return NextResponse.json({ error: "API Keys not configured" }, { status: 500 })
        }

        if (!text) {
            return NextResponse.json({ error: "Text is required" }, { status: 400 })
        }

        // AGGRESSIVE WATERFALL: Trials with strict timeouts
        for (const tier of TIERS) {
            for (const modelName of tier.models) {
                for (let i = 0; i < apiKeys.length; i++) {
                    const currentKey = apiKeys[i];
                    try {
                        console.log(`[TTS API] Attempting: ${modelName} | Acc: ${i + 1}`);

                        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${currentKey}`

                        const payload = {
                            systemInstruction: {
                                parts: [{ text: "You are a professional, automated Text-To-Speech engine. Output ONLY the direct audio reading. No fillers. Natural diction." }]
                            },
                            contents: [{ parts: [{ text: `Read exactly: "${text}" in ${language}` }] }],
                            generationConfig: {
                                responseModalities: ["AUDIO"],
                                speechConfig: {
                                    voiceConfig: {
                                        prebuiltVoiceConfig: { voiceName: gender === "female" ? "Fenrir" : "Puck" }
                                    }
                                }
                            }
                        }

                        // Use 4s timeout for aggressive failover
                        const fetchResponse = await fetchWithTimeout(url, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        }, 4000)

                        if (!fetchResponse.ok) {
                            const errorStatus = fetchResponse.status;
                            if (errorStatus === 429) {
                                console.warn(`[TTS] 429 Rate Limit - Acc ${i + 1}. Jumping to next...`);
                                continue;
                            }
                            throw new Error(`Status ${errorStatus}`);
                        }

                        const data = await fetchResponse.json()
                        const audioBase64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

                        if (audioBase64) {
                            let audioBuffer = Buffer.from(audioBase64, 'base64');
                            let mimeType = data.candidates[0].content.parts[0].inlineData.mimeType || 'audio/wav';

                            if (mimeType.includes('audio/pcm')) {
                                const sampleRateMatch = mimeType.match(/rate=(\d+)/);
                                const sampleRate = sampleRateMatch ? parseInt(sampleRateMatch[1]) : 24000;
                                const wavHeader = createWavHeader(audioBuffer.length, sampleRate);
                                audioBuffer = Buffer.concat([wavHeader, audioBuffer]);
                                mimeType = 'audio/wav';
                            }

                            console.log(`[TTS] ✅ Success: ${modelName} | Acc: ${i + 1}`);
                            return new NextResponse(audioBuffer, {
                                status: 200,
                                headers: {
                                    'Content-Type': mimeType,
                                    'Content-Length': audioBuffer.length.toString(),
                                }
                            });
                        }
                    } catch (err: any) {
                        const isTimeout = err.name === 'AbortError';
                        console.warn(`[TTS] ⚠️ Fail: ${modelName} | Acc ${i + 1} | ${isTimeout ? 'TIMEOUT' : err.message}`);
                        errorLog.push(`${modelName}[${i}]: ${err.message}`);
                        continue; // Try next key/model immediately
                    }
                }
            }
        }

        throw new Error("All TTS attempts failed or timed out")

    } catch (error: any) {
        console.error("[TTS FATAL] Waterfall exhausted:", error.message)
        return NextResponse.json({ error: "TTS failed", details: error.message }, { status: 500 })
    }
}
