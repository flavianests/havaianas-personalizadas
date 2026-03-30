export type ArticleBlock = { type: 'h2' | 'h3' | 'p'; text: string };

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  image: string;
  imageAlt: string;
  originalUrl: string;
  blocks: ArticleBlock[];
};
