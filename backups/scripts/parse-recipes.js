const fs = require('fs');
const content = fs.readFileSync('lib/recipes-data.ts', 'utf-8');

const regex = /id:\s*(\d+),\s*name:\s*["']([^"']+)["']/g;
let match;
const recipes = [];

while ((match = regex.exec(content)) !== null) {
  recipes.push({ id: match[1], name: match[2] });
}

console.log('Total recipes:', recipes.length);
console.log(JSON.stringify(recipes, null, 2));
