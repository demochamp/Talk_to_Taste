const fs = require('fs');
const dataFile = 'lib/recipes-data.ts';
let content = fs.readFileSync(dataFile, 'utf-8');
let blocks = content.split(/(\{\s*id:\s*\d+,)/g);
let missingCount = 0;

for (let i = 1; i < blocks.length; i += 2) {
    let blockId = blocks[i];
    let blockContent = blocks[i+1];
    if (!blockContent.includes('youtubeUrl:')) {
        const nameMatch = blockContent.match(/name:\s*["']([^"']+)["']/);
        if (nameMatch) {
            missingCount++;
            const name = nameMatch[1];
            // Assign a search embed if scraping failed
            const fallbackUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(name + ' authentic recipe')}`;
            blockContent = blockContent.replace(/(rating:\s*[\d.]+,\r?\n)/, `$1    youtubeUrl: "${fallbackUrl}",\n`);
            blocks[i+1] = blockContent;
            console.log("Fixed missing for: " + name);
        }
    }
}

if (missingCount > 0) {
    fs.writeFileSync(dataFile, blocks.join(''));
    console.log(`Fixed ${missingCount} missed recipes`);
} else {
    console.log('All 90 recipes have youtubeUrl!');
}
