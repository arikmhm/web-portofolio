// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';

// The site is static; only /api/contact runs on demand (see src/pages/api/contact.ts).
export default defineConfig({
  adapter: vercel(),
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      // Resend's shared sender only delivers to the account owner's address; set this once arikmhm.com is verified in Resend.
      CONTACT_FROM: envField.string({ context: 'server', access: 'secret', default: 'arikmhm <onboarding@resend.dev>' }),
    },
  },
});
