const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const email = String(req.body?.email || '').trim().toLowerCase();
  const website = String(req.body?.website || '').trim();

  // Bots often fill hidden fields. Return the same neutral success response.
  if (website) return res.status(200).json({ ok: true });

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !publishableKey) {
    return res.status(500).json({ error: 'Die Abmeldung ist vorübergehend nicht erreichbar.' });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/marketing_unsubscribes`, {
      method: 'POST',
      headers: {
        apikey: publishableKey,
        Authorization: `Bearer ${publishableKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email, source: 'self_service' }),
    });

    // A duplicate means this address was already unsubscribed. Do not reveal that state.
    if (!response.ok && response.status !== 409) {
      throw new Error(`Supabase returned ${response.status}`);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Email unsubscribe failed', error);
    return res.status(500).json({ error: 'Die Abmeldung ist vorübergehend nicht erreichbar.' });
  }
}
