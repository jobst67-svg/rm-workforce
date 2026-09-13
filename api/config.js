export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  // Publishable credentials are intentionally safe for browser use.
  // Keeping the project reference here prevents stale Vercel variables from
  // sending registrations to an older Supabase project.
  const url = 'https://lzdnddavnhtacrcwaxqh.supabase.co';
  const publishableKey = 'sb_publishable_ZRm991tFOTNJAoBtO3obAQ_p_yCG3Ug';
  return res.status(200).json({ url, publishableKey });
}
