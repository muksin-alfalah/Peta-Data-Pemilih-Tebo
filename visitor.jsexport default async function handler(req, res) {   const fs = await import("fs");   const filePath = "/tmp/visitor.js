export default async function handler(req, res) {
  const fs = await import("fs");
  const filePath = "/tmp/visitor-count.json";

  let count = 0;
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    count = JSON.parse(data).count || 0;
  } catch {
    count = 0;
  }

  count++;
  fs.writeFileSync(filePath, JSON.stringify({ count }));
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ count });
}
