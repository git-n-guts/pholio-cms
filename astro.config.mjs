import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://admin.pholio.click',
  adapter: cloudflare(),
  integrations: [react(), keystatic()],
});
