const fs = require('fs');
const https = require('https');

const dataFile = 'lib/recipes-data.ts';
let content = fs.readFileSync(dataFile, 'utf-8');

function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function searchYouTube(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query + ' authentic recipe english hindi');
    https.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/{"videoRenderer":{"videoId":"([^"]+)"/);
        if (match && match[1]) {
          resolve(`https://www.youtube.com/watch?v=${match[1]}`);
        } else {
            const match2 = data.match(/"videoId":"([^"]+)"/);
            resolve(match2 && match2[1] ? `https://www.youtube.com/watch?v=${match2[1]}` : null);
        }
      });
      res.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

async function processRecipes() {
    let blocks = content.split(/(\{\s*id:\s*\d+,)/g);
    
    for (let i = 1; i < blocks.length; i += 2) {
        let blockId = blocks[i];
        let blockContent = blocks[i+1];
        
        const nameMatch = blockContent.match(/name:\s*["']([^"']+)["']/);
        if (!nameMatch) continue;
        
        const name = nameMatch[1];
        
        if (!blockContent.includes('youtubeUrl:')) {
            console.log(`Fetching YouTube for: ${name}`);
            const url = await searchYouTube(name);
            if (url) {
                blockContent = blockContent.replace(/(rating:\s*[\d.]+,\r?\n)/, `$1    youtubeUrl: "${url}",\n`);
                blocks[i+1] = blockContent;
                console.log(`  -> Added ${url}`);
            } else {
                console.log(`  -> Not found`);
            }
            await delay(800); // 800ms delay to avoid rate limiting
        } else {
            console.log(`Already has youtubeUrl: ${name}`);
        }
    }
    
    fs.writeFileSync(dataFile, blocks.join(''));
    console.log('Update complete!');
}

processRecipes().catch(console.error);
