export default async function handler(req, res) {
  const namespace = 'peta-data-pemilih-tebo';
  const key = 'global-visitors';
  const url = `https://api.countapi.xyz/update/${namespace}/${key}/?amount=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; VercelEdge/1.0)',
      },
    });

    // pastikan respons benar-benar JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error('Gagal parsing JSON:', text);
      throw new Error('Respons bukan JSON');
    }

    console.log('Data CountAPI:', data);

    if (data && data.value !== undefined) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).json({ count: data.value });
    } else {
      throw new Error('Data tidak valid');
    }

  } catch (error) {
    console.error('Error server visitor.js:', error.message);
    res.status(500).json({ error: 'Gagal mengambil data pengunjung' });
  }
}
