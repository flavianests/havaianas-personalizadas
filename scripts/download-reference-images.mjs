/**
 * Baixa imagens listadas em public/reference/<pasta>/images.json para images/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const REF_DIRS = [
  'html-orbia-index-3.html',
  'html-orbia-about.html',
  'html-orbia-services.html',
  'html-orbia-blog-grid.html',
  'html-orbia-contact.html',
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchBuffer(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

async function main() {
  for (const dir of REF_DIRS) {
    const base = path.join(root, 'public', 'reference', dir);
    const jpath = path.join(base, 'images.json');
    if (!fs.existsSync(jpath)) continue;
    const list = JSON.parse(fs.readFileSync(jpath, 'utf8'));
    const imgDir = path.join(base, 'images');
    fs.mkdirSync(imgDir, { recursive: true });
    for (const { file, url } of list) {
      const dest = path.join(imgDir, file);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 0) continue;
      try {
        const buf = await fetchBuffer(url);
        fs.writeFileSync(dest, buf);
        process.stdout.write(`OK ${dir}/${file}\n`);
      } catch (e) {
        console.error(`FAIL ${dir}/${file}: ${e.message}`);
      }
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
