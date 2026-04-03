const fs = require('fs');
const content = fs.readFileSync('lib/recipes-data.ts', 'utf-8');

const regex = /name:\s*["']([^"']+)["'][^}]*?youtubeUrl:\s*["']([^"']+)["']/gs;
let match;
while ((match = regex.exec(content)) !== null) {
  if (match[1] === 'Dal Baati Churma' || match[1] === 'Upma') {
      console.log(match[1], ' -> ', match[2]);
  }
}
