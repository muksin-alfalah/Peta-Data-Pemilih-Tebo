export default async function handler(req, res) {
  const namespace = 'peta-data-pemilih-tebo';
  const key = 'global-visitors';
  const countapiUrl = `https://api.countapi.xyz/update/${namespace}/${key}/?amount=1`;
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(countapiUrl)}`;

  try {
    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (!data.contents) throw new Error('Respons kosong dari proxy');

    // parse isi JSON sebenarnya
    const parsed = JSON.parse(data.contents);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ count: parsed.value });
  } catch (error) {
    console.error('Error di visitor.js:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data pengunjung' });
  }
}
