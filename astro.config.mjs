import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://havaianas-personalizadas.vercel.app',
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
