import https from 'https';

function searchUnsplash(query) {
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`;
  
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        console.log(`\n--- ${query} ---`);
        (parsed.results || []).forEach(r => {
          console.log(`${r.urls.raw}&q=80&w=800&auto=format&fit=crop`);
        });
      } catch (e) {
        console.error(`Error parsing ${query}:`, e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Error fetching ${query}:`, e.message);
  });
}

searchUnsplash('chilli chicken');
searchUnsplash('chilli paneer');
searchUnsplash('chow mein');
searchUnsplash('kathi roll');
searchUnsplash('spring roll');
searchUnsplash('noodle stir fry');
searchUnsplash('egg roll');
