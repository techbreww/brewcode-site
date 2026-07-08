// GET /api/version — latest published brewcode-cli version, proxied from npm.
// Cached at Vercel's edge so npm is hit at most once an hour per region.
export default async function handler(req, res) {
  try {
    const r = await fetch("https://registry.npmjs.org/brewcode-cli/latest");
    if (!r.ok) {
      res.status(502).json({ error: `registry responded ${r.status}` });
      return;
    }
    const { version } = await r.json();
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json({ version });
  } catch {
    res.status(502).json({ error: "registry unreachable" });
  }
}
