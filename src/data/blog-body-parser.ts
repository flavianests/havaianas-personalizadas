import type { ArticleBlock } from './blog-types';

/**
 * Converte texto com marcadores ## (h2) e ### (h3) em blocos do blog.
 * Parágrafos separados por linha em branco.
 */
export function parseBlogBody(raw: string): ArticleBlock[] {
  const chunks = raw.trim().split(/\n\n+/);
  const out: ArticleBlock[] = [];
  for (const c of chunks) {
    const t = c.trim().replace(/\n/g, ' ');
    if (!t) continue;
    if (t.startsWith('### ')) out.push({ type: 'h3', text: t.slice(4).trim() });
    else if (t.startsWith('## ')) out.push({ type: 'h2', text: t.slice(3).trim() });
    else out.push({ type: 'p', text: t });
  }
  return out;
}
