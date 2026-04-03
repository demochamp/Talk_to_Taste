const https = require('https');

function searchYouTube(query) {
  return new Promise((resolve) => {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query + ' recipe');
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/"videoId":"([^"]+)"/);
        if (match && match[1]) {
          resolve(`https://www.youtube.com/watch?v=${match[1]}`);
        } else {
          resolve(null);
        }
      });
    });
  });
}

searchYouTube('Aloo Gobi').then(console.log);
