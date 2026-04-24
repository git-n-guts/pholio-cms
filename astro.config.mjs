import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://pholio-cms.website-list.workers.dev',
  output: 'server',
  adapter: cloudflare(),
  integrations: [react(), keystatic()],
  vite: {
    resolve: {
      alias: {
        'react-dom/server': 'react-dom/server.edge'
      }
    }
  }
});
