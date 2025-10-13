// /api/visitor.js
export default async function handler(req, res) {
  const url = 'https://api.countapi.xyz/update/peta-data-pemilih-tebo/global-visitors/?amount=1';
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VisitorCountBot/1.0)',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('CountAPI error: ' + response.status);
    }

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Visitor API Error:', error);
    res.status(500).json({ error: 'Gagal mengambil data pengunjung', details: error.message });
  }
}
