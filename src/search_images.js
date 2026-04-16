import https from 'https';

function searchCommons(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=imageinfo&iiprop=url`;
  
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        const pages = parsed.query?.pages || {};
        Object.values(pages).forEach(page => {
          if (page.imageinfo && page.imageinfo[0]) {
            console.log(`${query}: ${page.imageinfo[0].url}`);
          }
        });
      } catch (e) {
        console.error(`Error parsing ${query}:`, e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Error fetching ${query}:`, e.message);
  });
}

searchCommons('Veg Chowmein');
searchCommons('Egg Chowmein');
searchCommons('Paneer Chowmein');
searchCommons('Paneer Tikka Roll');
searchCommons('Chicken Egg Roll');
searchCommons('Egg Chilli');
searchCommons('Soya Chilli');
