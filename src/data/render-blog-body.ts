import { marked } from 'marked';

/** Markdown → HTML para o corpo do blog (conteúdo estático do repositório). */
export function markdownToBlogHtml(markdown: string): string {
  return marked.parse(markdown, {
    gfm: true,
    breaks: false,
  }) as string;
}

/** Contagem aproximada de palavras (pt-BR), para validação em dev. */
export function countWordsMarkdown(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Divide o HTML do artigo para inserir CTA no meio (após ~metade dos parágrafos).
 * Fallback: após ~metade dos `</h2>` se não houver `<p>`.
 */
export function splitHtmlAtMidParagraph(html: string): { before: string; after: string } {
  const reP = /<\/p>/gi;
  const pMatches: RegExpExecArray[] = [];
  let m: RegExpExecArray | null;
  while ((m = reP.exec(html)) !== null) {
    pMatches.push(m);
  }
  if (pMatches.length >= 1) {
    const idx = Math.max(0, Math.floor((pMatches.length - 1) / 2));
    const insertPos = pMatches[idx].index! + pMatches[idx][0].length;
    return { before: html.slice(0, insertPos), after: html.slice(insertPos) };
  }

  const reH2 = /<\/h2>/gi;
  const h2Matches: RegExpExecArray[] = [];
  while ((m = reH2.exec(html)) !== null) {
    h2Matches.push(m);
  }
  if (h2Matches.length >= 2) {
    const idx = Math.floor((h2Matches.length - 1) / 2);
    const insertPos = h2Matches[idx].index! + h2Matches[idx][0].length;
    return { before: html.slice(0, insertPos), after: html.slice(insertPos) };
  }

  return { before: html, after: '' };
}
