let rmAuthClientPromise;

async function getRmAuthClient() {
  if (!rmAuthClientPromise) {
    rmAuthClientPromise = (async () => {
      const response = await fetch('/api/config', { cache: 'no-store' });
      if (!response.ok) throw new Error('Auth-Konfiguration konnte nicht geladen werden.');
      const cfg = await response.json();
      return window.supabase.createClient(cfg.url, cfg.publishableKey);
    })();
  }
  return rmAuthClientPromise;
}

async function getRmUser() {
  const client = await getRmAuthClient();
  const { data } = await client.auth.getUser();
  return data.user || null;
}

async function requireRmUser() {
  try {
    const user = await getRmUser();
    if (!user) {
      const next = location.pathname + location.search;
      location.replace('/register.html?next=' + encodeURIComponent(next));
      return null;
    }
    document.documentElement.classList.add('auth-ready');
    return user;
  } catch (err) {
    console.error(err);
    location.replace('/register.html?error=auth');
    return null;
  }
}

async function rmLogout() {
  const client = await getRmAuthClient();
  await client.auth.signOut();
  location.href = '/register.html';
}
