export default async function handler(req, res) {
  const url = 'https://api.countapi.xyz/update/peta-data-pemilih-tebo/global-visitors/?amount=1';

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error di server:', error);
    res.status(500).json({ error: 'Gagal mengambil data pengunjung' });
  }
}
