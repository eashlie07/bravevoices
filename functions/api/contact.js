/* ============================================================
   Contact form handler  →  https://bravevoices.pages.dev/api/contact

   Cloudflare Pages runs this automatically. You do not deploy it
   separately and you do not need to know JavaScript to keep it
   working — you only need the two settings described in
   "How to Edit This Site.md":

     RESEND_API_KEY   your Resend key (set in Cloudflare, never here)
     TO_ADDRESS       eashlie07@gmail.com
     FROM_ADDRESS     onboarding@resend.dev  until you own a domain

   Nothing in this file needs editing, except the fallback address
   in `to` if your email ever changes.
   ============================================================ */

export async function onRequestPost(context) {
  const { request, env } = context;

  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { 'content-type': 'application/json' },
    });

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Could not read the form.' }, 400);
  }

  const name    = String(data.name    || '').trim().slice(0, 100);
  const email   = String(data.email   || '').trim().slice(0, 200);
  const kid     = String(data.kid     || '').trim().slice(0, 50);
  const message = String(data.message || '').trim().slice(0, 4000);
  const trap    = String(data.website || '').trim();   // hidden spam field

  // A bot fills the hidden field. A person never sees it.
  if (trap) return json({ ok: true });

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: 'Please fill in your name, a valid email, and a message.' }, 400);
  }

  const to      = env.TO_ADDRESS   || 'eashlie07@gmail.com';
  const from    = env.FROM_ADDRESS || 'Brave Voices Academy <onboarding@resend.dev>';
  const apiKey  = env.RESEND_API_KEY;

  if (!apiKey) {
    return json({ ok: false, error: 'The form is not configured yet.' }, 500);
  }

  const lines = [
    'Name: ' + name,
    'Email: ' + email,
    kid ? "Child's age: " + kid : null,
    '',
    message,
    '',
    '—',
    'Sent from the contact form at bravevoices.pages.dev',
  ].filter((l) => l !== null).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + apiKey,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      // Hit reply and you answer the parent directly.
      reply_to: email,
      subject: 'Brave Voices Academy question from ' + name,
      text: lines,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: 'The message could not be sent.' }, 502);
  }

  return json({ ok: true });
}

// Anything other than POST gets a plain 405.
export async function onRequestGet() {
  return new Response('Method not allowed', { status: 405 });
}
