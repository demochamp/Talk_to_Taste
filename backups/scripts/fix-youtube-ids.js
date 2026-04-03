const fs = require('fs');
const ytSearch = require('yt-search');

const dataFile = 'lib/recipes-data.ts';
let content = fs.readFileSync(dataFile, 'utf-8');

async function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function run() {
    let blocks = content.split(/(\{\s*id:\s*\d+,)/g);
    let updated = 0;

    for (let i = 1; i < blocks.length; i += 2) {
        let blockContent = blocks[i+1];
        
        // Find if this block has a search_query fallback URL
        if (blockContent.includes('youtube.com/results?search_query=')) {
            const nameMatch = blockContent.match(/name:\s*["']([^"']+)["']/);
            if (!nameMatch) continue;
            
            const name = nameMatch[1];
            console.log(`Searching real video for: ${name}`);
            
            try {
                const results = await ytSearch(`${name} authentic recipe in English or Hindi`);
                if (results && results.videos && results.videos.length > 0) {
                    const video = results.videos[0]; // grab the top match
                    const actualUrl = video.url; // e.g., https://youtube.com/watch?v=XXXXXX
                    
                    // Replace the bad fallback URL with the actual URL
                    blockContent = blockContent.replace(/youtubeUrl:\s*"https:\/\/www\.youtube\.com\/results\?search_query=[^"]+",/, `youtubeUrl: "${actualUrl}",`);
                    blocks[i+1] = blockContent;
                    updated++;
                    console.log(`  -> Found: ${actualUrl}`);
                } else {
                    console.log(`  -> yt-search found nothing for ${name}`);
                    // Ensure the iframe still doesn't get a bad `results?search_query` url
                    blockContent = blockContent.replace(/youtubeUrl:\s*"https:\/\/www\.youtube\.com\/results\?search_query=[^"]+",/, `youtubeUrl: "https://www.youtube.com/watch?v=ptPq2Kjg3eM",`);
                    blocks[i+1] = blockContent;
                    console.log(`  -> Fallback to generic video`);
                }
            } catch (err) {
                console.error(`  -> Error fetching for ${name}`, err.message);
                blockContent = blockContent.replace(/youtubeUrl:\s*"https:\/\/www\.youtube\.com\/results\?search_query=[^"]+",/, `youtubeUrl: "https://www.youtube.com/watch?v=ptPq2Kjg3eM",`);
                blocks[i+1] = blockContent;
            }
            await delay(1000); // Wait 1 second between requests
        }
    }

    if (updated > 0 || content !== blocks.join('')) {
        fs.writeFileSync(dataFile, blocks.join(''));
        console.log(`\nSuccessfully updated ${updated} recipes with direct YouTube IDs!`);
    } else {
        console.log('No fallback URLs found to update.');
    }
}

run().catch(console.error);
