// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: process.env.NODE_ENV === 'production' ? 'https://esola-thomas.github.io' : 'http://localhost:4321',
  base: process.env.NODE_ENV === 'production' ? '/huitzo/' : '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'auto',
  },
});