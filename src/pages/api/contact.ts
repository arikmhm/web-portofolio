import type { APIRoute } from 'astro';
import { RESEND_API_KEY, CONTACT_FROM } from 'astro:env/server';

export const prerender = false;

const TO = 'mhm.ariyanto@gmail.com';

// Sends the contact form to my inbox through Resend. Answers JSON for the script on the page,
// and redirects back to the page for a plain form post without JavaScript.
export const POST: APIRoute = async ({ request, redirect }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  const reply = (status: number, message: string) =>
    wantsJson ? Response.json({ message }, { status }) : redirect('/#contact', 303);

  const form = await request.formData().catch(() => null);
  if (!form) return reply(400, 'Please fill in the form.');
  const field = (key: string) => String(form.get(key) ?? '').trim();
  const name = field('name').replace(/\s+/g, ' ');
  const email = field('email');
  const message = field('message');

  if (field('website')) return reply(200, 'Thanks!'); // honeypot: only bots fill the hidden field
  if (!name || name.length > 100) return reply(400, 'Please enter your name.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return reply(400, 'Please enter a valid email address.');
  if (!message || message.length > 5000) return reply(400, 'Please write a message (up to 5,000 characters).');
  if (!RESEND_API_KEY) return reply(500, 'The form is not set up yet. Please email me directly.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [TO],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  }).catch(() => null);

  if (!response?.ok) return reply(502, 'Your message could not be sent. Please email me directly.');
  return reply(200, 'Thanks! Your message is on its way. I’ll get back to you soon.');
};
