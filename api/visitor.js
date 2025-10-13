// File: /api/visitor.js
export default async function handler(req, res) {
  try {
    // Ambil data dari CountAPI
    const response = await fetch('https://api.countapi.xyz/update/peta-data-pemilih-tebo/global-visitors/?amount=1');
    const data = await response.json();

    // Izinkan akses dari semua domain (optional)
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Kirim hasil ke frontend
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pengunjung' });
  }
}
