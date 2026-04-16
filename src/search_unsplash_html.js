import https from 'https';

function searchUnsplashHTML(query) {
  const url = `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
  
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+/g;
      const matches = [...new Set(data.match(regex))];
      console.log(`\n--- ${query} ---`);
      matches.slice(0, 5).forEach(m => {
        console.log(`${m}?q=80&w=800&auto=format&fit=crop`);
      });
    });
  }).on('error', (e) => {
    console.error(`Error fetching ${query}:`, e.message);
  });
}

searchUnsplashHTML('chilli-paneer');
searchUnsplashHTML('chilli-chicken');
searchUnsplashHTML('chow-mein');
searchUnsplashHTML('kathi-roll');
searchUnsplashHTML('egg-roll');
