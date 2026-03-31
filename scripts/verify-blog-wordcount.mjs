import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '../src/data/blog-markdown');

/** Alinhar a `WORDS_MIN` / `WORDS_MAX` em `src/data/blog-articles.ts` */
const WORDS_MIN = 2880;
const WORDS_MAX = 3380;

function countWords(md) {
  const text = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
let ok = true;
for (const f of files.sort()) {
  const md = fs.readFileSync(path.join(dir, f), 'utf8');
  const w = countWords(md);
  const status = w >= WORDS_MIN && w <= WORDS_MAX ? 'OK' : '!!';
  if (status === '!!') ok = false;
  console.log(status, w, f);
}
process.exit(ok ? 0 : 1);
