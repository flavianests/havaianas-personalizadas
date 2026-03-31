/**
 * Artigos do Blog da Bela — corpo em Markdown (~3000 palavras) em ./blog-markdown/
 * Regenerar textos gerados: node scripts/gen-blog-from-templates.mjs
 * Verificar contagem: node scripts/verify-blog-wordcount.mjs (faixa ~2880–3380 palavras)
 */
import type { BlogArticle } from './blog-types';
import { countWordsMarkdown } from './render-blog-body';

export type { BlogArticle } from './blog-types';

const markdownModules = import.meta.glob<string>('./blog-markdown/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function loadMarkdown(slug: string): string {
  const key = `./blog-markdown/${slug}.md`;
  const content = markdownModules[key];
  if (typeof content !== 'string') {
    throw new Error(`[blog-articles] Markdown não encontrado: ${key}`);
  }
  return content;
}

const articlesBase: Omit<BlogArticle, 'bodyMarkdown'>[] = [
  {
    slug: 'quanto-custa-havaianas-personalizadas',
    title: 'Quanto custa havaianas personalizadas?',
    excerpt:
      'Entenda o que compõe o preço: modelo original, arte no solado, quantidade, prazo e logística — e como comparar orçamentos sem surpresas.',
    metaDescription:
      'Quanto custam havaianas personalizadas? Veja o que entra no preço, como comparar orçamentos, FAQ e checklists para casamento e eventos. Chinelos da Bela.',
    tag: 'Guia',
    image: '/images/bela/real-havaianas.jpg',
    imageAlt: 'Havaianas personalizadas em detalhe — custo, orçamento e qualidade Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'como-fazer-havaianas-personalizadas',
    title: 'Como fazer havaianas personalizadas?',
    excerpt:
      'Do briefing e prova digital à produção em lote: passo a passo do processo profissional e erros comuns ao tentar fazer em casa.',
    metaDescription:
      'Como fazer havaianas personalizadas: briefing, arte no solado, prova digital, produção e dicas de SEO. Guia longo com parágrafos curtos — Chinelos da Bela.',
    tag: 'Guia',
    image: '/images/bela/blog-havaianas.jpg',
    imageAlt: 'Processo de havaianas personalizadas — arte, solado e produção Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'vale-a-pena-havaianas-em-casamento',
    title: 'Vale a pena dar havaianas em casamento?',
    excerpt:
      'Conforto na pista, lembrança durável e impacto nas fotos — e quando outra opção pode fazer mais sentido para o seu estilo de festa.',
    metaDescription:
      'Vale a pena dar havaianas em casamento? Análise de custo-benefício, logística, fotos e FAQ. Lembrancinha com Havaianas originais — Chinelos da Bela.',
    tag: 'Casamento',
    image: '/images/bela/prod-casamento.png',
    imageAlt: 'Havaianas personalizadas para casamento — vale a pena como lembrancinha Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-personalizados-para-casamento/',
  },
  {
    slug: 'melhor-estampa-chinelos-personalizados',
    title: 'Qual a melhor estampa para chinelos personalizados?',
    excerpt:
      'Legibilidade no solado, contraste, cores e identidade visual: critérios para uma estampa que dura e fotografa bem.',
    metaDescription:
      'Qual a melhor estampa para chinelos personalizados? Contraste, tipografia, cores e durabilidade no solado. Guia SEO — Chinelos da Bela.',
    tag: 'Design',
    image: '/images/bela/destaque-havaianas.webp',
    imageAlt: 'Melhor estampa no solado — havaianas personalizadas Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'havaianas-personalizadas-vs-chinelos-comuns',
    title: 'Havaianas personalizadas vs chinelos comuns',
    excerpt:
      'Base original, conforto, durabilidade da personalização e percepção de valor — comparativo para decidir com critério.',
    metaDescription:
      'Havaianas personalizadas vs chinelos comuns: diferenças de sola, conforto, estampa e valor percebido. Comparativo completo — Chinelos da Bela.',
    tag: 'Havaianas',
    image: '/images/bela/prod-casamento-mesa.png',
    imageAlt: 'Havaianas personalizadas versus chinelos comuns — qualidade em eventos Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'havaianas-ou-sandalias-personalizadas',
    title: 'Havaianas ou sandálias personalizadas: qual escolher?',
    excerpt:
      'Contexto de uso, público, logística e área da marca: quando o chinelo de dedo ganha e quando sandália faz sentido.',
    metaDescription:
      'Havaianas ou sandálias personalizadas: qual escolher para casamento, festa ou corporativo? Uso, logística e marca — Chinelos da Bela.',
    tag: 'Guia',
    image: '/images/bela/prod-festa15.png',
    imageAlt: 'Havaianas ou sandálias personalizadas — qual escolher para o evento Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'havaianas-personalizadas-casamento-ideias-precos-dicas',
    title: 'Havaianas Personalizadas para Casamento: Ideias, Preços e Dicas',
    excerpt:
      'Ideias de arte para o solado, faixas de preço, planejamento de numeração e dicas para noivos e assessorias.',
    metaDescription:
      'Havaianas personalizadas para casamento: ideias de arte, preços, numeração e dicas para noivos. Artigo longo para Google — Chinelos da Bela.',
    tag: 'Casamento',
    image: '/images/bela/real-casamento.jpeg',
    imageAlt: 'Havaianas personalizadas para casamento — ideias, preços e dicas Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-personalizados-para-casamento/',
  },
  {
    slug: 'havaianas-personalizadas-festa-15-anos-ideias-precos-dicas',
    title: 'Havaianas Personalizadas para festa de 15 anos: Ideias, Preços e Dicas',
    excerpt:
      'Tema da debutante, mesa de lembrancinhas, dimensionamento do pedido e dicas para família e cerimonial.',
    metaDescription:
      'Havaianas personalizadas para festa de 15 anos: ideias, preços, tema e mesa de lembrancinhas. Guia SEO — Chinelos da Bela.',
    tag: '15 anos',
    image: '/images/bela/blog-festa-15-anos.png',
    imageAlt: 'Havaianas personalizadas festa de 15 anos — ideias, preços e dicas Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-para-festa-15-anos/',
  },
  {
    slug: 'havaianas-personalizadas-empresas-brinde-criativo-barato',
    title: 'Havaianas Personalizadas para Empresas: Brinde Criativo e Barato',
    excerpt:
      'Recall de marca, custo por contato, briefing com manual visual e como economizar sem perder acabamento.',
    metaDescription:
      'Havaianas personalizadas para empresas: brinde corporativo criativo, custo por contato e briefing de marca. Artigo para Google — Chinelos da Bela.',
    tag: 'Corporativo',
    image: '/images/bela/blog-brindes-corporativos.png',
    imageAlt: 'Havaianas personalizadas para empresas — brinde criativo Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/brindes-corporativos/',
  },
  {
    slug: 'havaianas-personalizadas-eventos-melhor-lembrancinha',
    title: 'Havaianas Personalizadas para Eventos: A Melhor Lembrancinha',
    excerpt:
      'Utilidade, logística e comparação com outros mimos — por que o chinelo personalizado funciona em tantos formatos de evento.',
    metaDescription:
      'Havaianas personalizadas para eventos: por que são uma lembrancinha forte, logística e comparativos. Conteúdo longo SEO — Chinelos da Bela.',
    tag: 'Eventos',
    image: '/images/bela/hero-fireworks.jpg',
    imageAlt: 'Havaianas personalizadas para eventos — melhor lembrancinha Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'havaianas-personalizadas-precos-modelos-onde-comprar',
    title: 'Havaianas Personalizadas: Preços, Modelos e Onde Comprar',
    excerpt:
      'Escopo do orçamento, modelos mais pedidos e critérios para escolher um fornecedor confiável.',
    metaDescription:
      'Havaianas personalizadas: preços, modelos e onde comprar com segurança. Guia para pesquisa no Google — Chinelos da Bela.',
    tag: 'Guia',
    image: '/images/bela/hero-cliente-evento.png',
    imageAlt: 'Preços, modelos e onde comprar havaianas personalizadas — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'havaianas-personalizadas-guia-completo-casamento-eventos',
    title: 'Havaianas Personalizadas: Guia Completo para Casamento e Eventos',
    excerpt:
      'Do conceito à entrega: processo, capítulos práticos e checklist antes de fechar o pedido.',
    metaDescription:
      'Guia completo de havaianas personalizadas para casamento e eventos: processo, prazos, checklist e SEO. Chinelos da Bela.',
    tag: 'Guia',
    image: '/images/bela/blog-chinelos-casamento-artigo.jpg',
    imageAlt: 'Guia completo havaianas personalizadas casamento e eventos — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
  {
    slug: 'havaianas-personalizadas-tudo-o-que-precisa-saber',
    title: 'Havaianas Personalizadas: Tudo o Que Você Precisa Saber',
    excerpt:
      'Definição, como escolher fornecedor, prazos e resumo do que a Chinelos da Bela oferece em um só lugar.',
    metaDescription:
      'Tudo sobre havaianas personalizadas: definição, fornecedor, prazos e dicas. Artigo longo otimizado para Google — Chinelos da Bela.',
    tag: 'Havaianas',
    image: '/images/bela/blog-formatura.png',
    imageAlt: 'Tudo sobre havaianas personalizadas — guia Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
  },
];

export const blogArticles: BlogArticle[] = articlesBase.map((a) => ({
  ...a,
  bodyMarkdown: loadMarkdown(a.slug),
}));

export function postImageUrl(baseUrl: string, image: string) {
  return image.startsWith('http') ? image : `${baseUrl}${image}`;
}

const WORDS_MIN = 2880;
/** H2 otimizados para leitor + palavra-chave aumentam a contagem; manter teto compatível. */
const WORDS_MAX = 3380;

if (import.meta.env?.DEV) {
  for (const article of blogArticles) {
    const words = countWordsMarkdown(article.bodyMarkdown);
    if (words < WORDS_MIN || words > WORDS_MAX) {
      console.warn(
        `[blog-articles] "${article.slug}": ~${words} palavras (alvo ~3000, faixa ${WORDS_MIN}–${WORDS_MAX}).`,
      );
    }
  }
}
