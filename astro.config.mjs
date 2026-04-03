import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @astrojs/sitemap gera sitemap-index.xml + sitemap-0.xml (urlset).
 * Copiamos o índice para /sitemap.xml — URL canônica pedida para crawlers e robots.txt.
 */
const sitemapXmlAtRoot = {
  name: 'sitemap-xml-at-root',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const outDir = fileURLToPath(dir);
      try {
        await copyFile(join(outDir, 'sitemap-index.xml'), join(outDir, 'sitemap.xml'));
      } catch {
        /* sem sitemap (ex.: site sem páginas estáticas) */
      }
    },
  },
};

export default defineConfig({
  output: 'static',
  site: 'https://chinelosdabela.com.br',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // filenameBase padrão: "sitemap" → sitemap-index.xml, sitemap-0.xml, …
      changefreq: 'weekly',
      priority: 0.7,
    }),
    sitemapXmlAtRoot,
  ],
});
