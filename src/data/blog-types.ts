export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  /** Meta description SEO (~150–160 caracteres recomendado pelo Google) */
  metaDescription?: string;
  tag: string;
  image: string;
  imageAlt: string;
  originalUrl: string;
  /** Corpo longo em Markdown (## e ###, parágrafos curtos, listas). */
  bodyMarkdown: string;
};
