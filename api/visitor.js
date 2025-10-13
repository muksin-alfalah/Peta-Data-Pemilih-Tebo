export default async function handler(req, res) {
  const namespace = 'peta-data-pemilih-tebo';
  const key = 'global-visitors';
  const countapiUrl = `https://api.countapi.xyz/update/${namespace}/${key}/?amount=1`;

  try {
    // Fetch langsung dari server (bukan browser) — tidak kena CORS
    const response = await fetch(countapiUrl);
    const data = await response.json();

    // Pastikan hasil valid
    if (!data.value && !data.count) {
      throw new Error('Data kosong atau tidak valid');
    }

    // Izinkan semua origin agar bisa diakses di browser
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ count: data.value || data.count });
  } catch (error) {
    console.error('Error di visitor.js:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data pengunjung' });
  }
}
