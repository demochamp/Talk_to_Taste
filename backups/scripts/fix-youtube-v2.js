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
        
        // Find if this block has the dead fallback video or a non-working URL
        if (blockContent.includes('ptPq2Kjg3eM') || !blockContent.includes('youtubeUrl:')) {
            const nameMatch = blockContent.match(/name:\s*["']([^"']+)["']/);
            if (!nameMatch) continue;
            
            const name = nameMatch[1];
            // Skip the actual Paneer Butter Masala so we fetch a working one for it too!
            console.log(`Searching real video for: ${name}`);
            
            try {
                const results = await ytSearch(`${name} authentic recipe`);
                if (results && results.videos && results.videos.length > 0) {
                    const video = results.videos[0]; // grab the top match
                    const actualUrl = video.url; // e.g., https://youtube.com/watch?v=XXXXXX
                    
                    if (blockContent.includes('ptPq2Kjg3eM')) {
                        blockContent = blockContent.replace(/youtubeUrl:\s*"https:\/\/www\.youtube\.com\/watch\?v=ptPq2Kjg3eM",/, `youtubeUrl: "${actualUrl}",`);
                    } else if (!blockContent.includes('youtubeUrl:')) {
                        blockContent = blockContent.replace(/(rating:\s*[\d.]+,\r?\n)/, `$1    youtubeUrl: "${actualUrl}",\n`);
                    }
                    blocks[i+1] = blockContent;
                    updated++;
                    console.log(`  -> Found: ${actualUrl}`);
                } else {
                    console.log(`  -> yt-search found nothing for ${name}`);
                }
            } catch (err) {
                console.error(`  -> Error fetching for ${name}`, err.message);
            }
            // Small delay to prevent API overloading
            await delay(500);
        }
    }

    if (updated > 0) {
        fs.writeFileSync(dataFile, blocks.join(''));
        console.log(`\nSuccessfully updated ${updated} recipes with direct working YouTube IDs!`);
    } else {
        console.log('No fallback URLs found to update.');
    }
}

run().catch(console.error);
