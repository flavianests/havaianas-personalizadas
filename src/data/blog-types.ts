export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  /** Meta description SEO (~150–160 caracteres recomendado pelo Google) */
  metaDescription?: string;
  tag: string;
  /** Capa grande no post; se omitido, o texto começa logo após o excerpt (OG usa imagem padrão). */
  image?: string;
  imageAlt?: string;
  originalUrl: string;
  /** Corpo longo em Markdown (## e ###, parágrafos curtos, listas). */
  bodyMarkdown: string;
};
