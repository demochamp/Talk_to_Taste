const https = require('https');
const fs = require('fs');

const API_KEY = "AIzaSyDSNEm7pI5HbMAfTyjCZQUjXQJwOXHio1k";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

console.log("Fetching models...");

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            let output = "";

            if (json.models) {
                json.models.forEach(m => {
                    const supportsAudio = m.outputModalities && m.outputModalities.includes("AUDIO");
                    output += `[${supportsAudio ? 'AUDIO' : 'TEXT '}] ${m.name}\n`;
                });
            } else {
                output = "No models or Error: " + JSON.stringify(json);
            }

            fs.writeFileSync('models_js.txt', output);
            console.log("Written to models_js.txt");

        } catch (e) {
            fs.writeFileSync('models_js.txt', "Error: " + e.message);
        }
    });
}).on('error', (err) => {
    fs.writeFileSync('models_js.txt', "Network Error: " + err.message);
});
