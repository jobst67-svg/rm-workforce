export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) {
    return res.status(500).json({ error: 'Auth configuration missing' });
  }
  return res.status(200).json({ url, publishableKey });
}
