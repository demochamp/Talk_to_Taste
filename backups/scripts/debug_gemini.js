const https = require('https');

const API_KEY = "AIzaSyDSNEm7pI5HbMAfTyjCZQUjXQJwOXHio1k"; // From user's env
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("Fetching models from:", url.replace(API_KEY, "KEY_HIDDEN"));

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error("API Error:", json.error);
                return;
            }

            console.log("\n--- AVAILABLE GEMINI MODELS ---");
            if (json.models) {
                json.models.forEach(m => {
                    // Check for AUDIO in supported output modalities
                    const supportsAudio = m.outputModalities && m.outputModalities.includes("AUDIO");
                    if (supportsAudio) {
                        console.log(`✅ [AUDIO] ${m.name}`);
                    } else {
                        console.log(`❌ [TEXT ] ${m.name}`);
                    }
                });
            } else {
                console.log("No models found in response.");
            }
        } catch (e) {
            console.error("Parse Error:", e);
            console.log("Raw Data:", data);
        }
    });
}).on('error', (err) => {
    console.error("Network Error:", err);
});
