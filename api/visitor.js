export default async function handler(req, res) {
  const namespace = 'peta-data-pemilih-tebo';
  const key = 'global-visitors';
  const countapiUrl = `https://api.countapi.xyz/update/${namespace}/${key}/?amount=1`;
  const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(countapiUrl)}`;

  try {
    const response = await fetch(proxyUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PetaDataPemilihTebo/1.0)' },
    });
    const text = await response.text();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error('Respons bukan JSON valid');
    }

    if (!parsed.value && !parsed.count) throw new Error('Data kosong');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ count: parsed.value || parsed.count });
  } catch (error) {
    console.error('Error di visitor.js:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data pengunjung' });
  }
}
