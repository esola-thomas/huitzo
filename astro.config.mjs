// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? 'https://huitzo.com' : 'http://localhost:4321',
  base: '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto',
  },
});