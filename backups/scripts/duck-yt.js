const fs = require('fs');
const https = require('https');

const dataFile = 'lib/recipes-data.ts';
let content = fs.readFileSync(dataFile, 'utf-8');

function searchDDG(query) {
    return new Promise((resolve) => {
        const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent('site:youtube.com ' + query + ' authentic recipe');
        const req = https.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/href="([^"]*youtube\.com\/watch%3Fv%3D[^"]+)"/i) 
                            || data.match(/href="[^"]*(youtube\.com\/watch\?v=[^"&]+)/i);
                
                if (match && match[1]) {
                    // duckduckgo wraps links in their own redirect, extract actual url
                    // /url?q=https://www.youtube.com/watch%3Fv%3D...
                    let actual = decodeURIComponent(match[1]);
                    // remove anything before https://www.youtube.com
                    const idx = actual.indexOf('https://www.youtube.com');
                    if (idx !== -1) {
                        actual = actual.substring(idx);
                        // Clean any remaining query params beyond v=
                        resolve(actual.split('&')[0]);
                        return;
                    }
                }
                resolve(null);
            });
            res.on('error', () => resolve(null));
        });
        
        req.on('error', () => resolve(null));
    });
}

function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function fixFallbackUrls() {
    let blocks = content.split(/(\{\s*id:\s*\d+,)/g);
    let fixed = 0;
    
    for (let i = 1; i < blocks.length; i += 2) {
        let blockContent = blocks[i+1];
        
        // If it was populated with a results fallback, let's fix it
        if (blockContent.includes('youtube.com/results?search_query=')) {
            const nameMatch = blockContent.match(/name:\s*["']([^"']+)["']/);
            if (!nameMatch) continue;
            
            const name = nameMatch[1];
            console.log(`Scraping DDG for: ${name}`);
            
            let url = await searchDDG(name);
            if (url) {
                blockContent = blockContent.replace(/youtubeUrl:\s*"https:\/\/www\.youtube\.com\/results\?search_query=[^"]+",/, `youtubeUrl: "${url}",`);
                blocks[i+1] = blockContent;
                fixed++;
                console.log(`  -> Found: ${url}`);
            } else {
                console.log(`  -> DDG missed ${name}`);
                // Use a default working video just so it doesn't break iframe
                blockContent = blockContent.replace(/youtubeUrl:\s*"https:\/\/www\.youtube\.com\/results\?search_query=[^"]+",/, `youtubeUrl: "https://www.youtube.com/watch?v=ptPq2Kjg3eM",`);
                blocks[i+1] = blockContent;
            }
            await delay(1000);
        }
    }
    
    fs.writeFileSync(dataFile, blocks.join(''));
    console.log(`Updated ${fixed} fallbacks with real DDG video urls.`);
}

fixFallbackUrls().catch(console.error);
