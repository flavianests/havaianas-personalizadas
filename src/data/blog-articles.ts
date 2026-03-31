/**
 * Artigos do Blog da Bela — metadados + corpos longos (≈5000 caracteres) em ./blog-bodies/
 */
import type { BlogArticle } from './blog-types';
export type { ArticleBlock, BlogArticle } from './blog-types';

import { blocks as blocksPorqueUtilizar } from './blog-bodies/body-porque-utilizar';
import { blocks as blocksChinelosCasamento } from './blog-bodies/body-chinelos-casamento';
import { blocks as blocksHavaianas } from './blog-bodies/body-havaianas';
import { blocks as blocksFormatura } from './blog-bodies/body-formatura';
import { blocks as blocksFesta15 } from './blog-bodies/body-festa15';
import { blocks as blocksCorporativo } from './blog-bodies/body-corporativo';
import { blocks as blocksHavaianasCasamentoGuia } from './blog-bodies/body-havaianas-casamento-guia';
import { blocks as blocksEstampaSolado } from './blog-bodies/body-estampa-solado';
import { blocks as blocksFormaturaTurma } from './blog-bodies/body-formatura-turma';
import { blocks as blocksFesta15Lembrancinha } from './blog-bodies/body-festa15-lembrancinha';
import { blocks as blocksCorporativoMarca } from './blog-bodies/body-corporativo-marca';
import { blocks as blocksHavaianasOrcamentoGuia } from './blog-bodies/body-havaianas-orcamento-guia';
import { blocks as blocksHavaianasMesaLembrancinhas } from './blog-bodies/body-havaianas-mesa-lembrancinhas';
import { blocks as blocksHavaianasCoresTipografia } from './blog-bodies/body-havaianas-cores-tipografia';
import { blocks as blocksHavaianasPrazosCronograma } from './blog-bodies/body-havaianas-prazos-cronograma';
import { blocks as blocksHavaianasCasamentoPraia } from './blog-bodies/body-havaianas-casamento-praia';
import { blocks as blocksHavaianasKitPadrinhos } from './blog-bodies/body-havaianas-kit-padrinhos';
import { blocks as blocksHavaianasCorporativosMetricas } from './blog-bodies/body-havaianas-corporativos-metricas';
import { blocks as blocksHavaianasDebutanteDoces } from './blog-bodies/body-havaianas-debutante-doces';
import { blocks as blocksHavaianasFormaturaFamilias } from './blog-bodies/body-havaianas-formatura-familias';
import { blocks as blocksHavaianasQualidadeOriginal } from './blog-bodies/body-havaianas-qualidade-original';
import { blocks as blocksHavaianasTendenciasDesign } from './blog-bodies/body-havaianas-tendencias-design';

export function postImageUrl(baseUrl: string, image: string) {
  return image.startsWith('http') ? image : `${baseUrl}${image}`;
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'porque-utilizar-chinelos-personalizados-para-casamento',
    title: 'Porque utilizar chinelos personalizados para casamento',
    excerpt:
      'O casamento é um dos momentos mais importantes na vida de um casal. É um dia em que todos os detalhes são importantes — conforto para os convidados, lembrança personalizada e um toque que combina com a celebração.',
    tag: 'Casamento',
    image: '/images/bela/real-casamento.jpeg',
    imageAlt:
      'Recepção de casamento ao ar livre com mesa de lembrancinhas e chinelos personalizados — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/porque-utilizar-chinelos-personalizados-para-casamento/',
    blocks: blocksPorqueUtilizar,
  },
  {
    slug: 'chinelos-personalizados-para-casamento',
    title: 'Chinelos personalizados para casamento: O presente ideal para seus convidados',
    excerpt:
      'Chinelos personalizados para casamento são uma excelente opção de presente que é prática, bonita e personalizada. Neste artigo, exploramos por que são o presente ideal para seus convidados.',
    tag: 'Casamento',
    image: '/images/bela/prod-casamento.png',
    imageAlt:
      'Expositor em degraus com chinelos personalizados para casamento — lembrancinha para convidados — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-personalizados-para-casamento/',
    blocks: blocksChinelosCasamento,
  },
  {
    slug: 'havaianas-personalizadas',
    title: 'Chinelos Havaianas Personalizadas',
    excerpt:
      'Havaianas Personalizadas com estampa no solado e acabamento profissional — conforto, durabilidade e lembrança que as pessoas realmente usam.',
    tag: 'Havaianas',
    image: '/images/bela/destaque-havaianas.webp',
    imageAlt: 'Havaianas personalizadas com estampa no solado em destaque — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksHavaianas,
  },
  {
    slug: 'chinelos-formatura',
    title: 'Chinelos personalizados para Formatura',
    excerpt:
      'Por que escolher chinelos personalizados para sua formatura? Combine conforto com a identidade da turma — cores, logo e data da conquista.',
    tag: 'Formatura',
    image: '/images/bela/prod-formatura.png',
    imageAlt:
      'Mesa de lembrancinhas de formatura com chinelos Havaianas personalizados — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-formatura/',
    blocks: blocksFormatura,
  },
  {
    slug: 'chinelos-para-festa-15-anos',
    title: 'Chinelos personalizados para festa de 15 anos',
    excerpt:
      'Lembrancinhas confortáveis para convidados dançarem até o fim e um mimo que lembra o tema e a debutante com estilo.',
    tag: '15 anos',
    image: '/images/bela/real-festa15.png',
    imageAlt:
      'Festa de 15 anos: chinelos personalizados e ambiente decorado — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-para-festa-15-anos/',
    blocks: blocksFesta15,
  },
  {
    slug: 'brindes-corporativos',
    title: 'Brindes Corporativos',
    excerpt:
      'Brindes corporativos com chinelos e Havaianas Personalizadas: fortaleça a marca em eventos e campanhas com itens úteis.',
    tag: 'Corporativo',
    image: '/images/bela/real-brindes.png',
    imageAlt: 'Brindes corporativos e chinelos Havaianas personalizados em evento — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/brindes-corporativos/',
    blocks: blocksCorporativo,
  },
  {
    slug: 'havaianas-personalizadas-para-casamento-guia',
    title: 'Havaianas personalizadas para casamento: guia para noivos e assessorias',
    excerpt:
      'Planejar havaianas personalizadas para casamento envolve quantidade, tamanhos, arte no solado e prazo. Veja o que perguntar ao fornecedor e como alinhar à identidade visual do grande dia.',
    tag: 'Casamento',
    image: '/images/bela/real-casamento.jpeg',
    imageAlt:
      'Guia para noivos: havaianas personalizadas, arte no solado e identidade do casamento — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksHavaianasCasamentoGuia,
  },
  {
    slug: 'havaianas-personalizadas-estampa-no-solado',
    title: 'Havaianas personalizadas com estampa no solado: como funciona o processo',
    excerpt:
      'Entenda como é feita a estampa no solado em havaianas personalizadas, diferença para adesivos amadores e o que esperar de durabilidade e acabamento profissional.',
    tag: 'Havaianas',
    image: '/images/bela/destaque-havaianas.webp',
    imageAlt:
      'Estampa no solado: detalhe de havaianas personalizadas com acabamento profissional — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksEstampaSolado,
  },
  {
    slug: 'havaianas-personalizadas-formatura-turma',
    title: 'Havaianas personalizadas para formatura: ideias para turma e comissão',
    excerpt:
      'Turmas e comissões de formatura podem usar havaianas personalizadas com curso, ano e símbolo da instituição. Veja benefícios, quantidades e como encaixar no orçamento da festa.',
    tag: 'Formatura',
    image: '/images/bela/real-formatura.png',
    imageAlt:
      'Turma de formatura com celebração e lembranças — havaianas personalizadas — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-formatura/',
    blocks: blocksFormaturaTurma,
  },
  {
    slug: 'havaianas-personalizadas-festa-15-anos-lembrancinha',
    title: 'Havaianas personalizadas para festa de 15 anos: lembrancinha na mesa e na pista',
    excerpt:
      'Debutantes e familiares pesquisam havaianas personalizadas para festa de 15 anos para mesa de lembrancinhas e conforto dos convidados. Saiba como planejar cores, tema e quantidades.',
    tag: '15 anos',
    image: '/images/bela/real-festa15.png',
    imageAlt:
      'Festa de 15 anos: lembrancinhas e havaianas personalizadas na mesa e na pista — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-para-festa-15-anos/',
    blocks: blocksFesta15Lembrancinha,
  },
  {
    slug: 'havaianas-personalizadas-brindes-corporativos-marca',
    title: 'Havaianas personalizadas para empresas: brindes corporativos com a sua marca',
    excerpt:
      'Eventos, convenções e campanhas usam havaianas personalizadas como brinde corporativo de alto recall. Veja quando faz sentido, volumes típicos e o que preparar no briefing.',
    tag: 'Corporativo',
    image: '/images/bela/prod-corporativo.png',
    imageAlt:
      'Expositor corporativo com Havaianas personalizadas e marca no evento — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/brindes-corporativos/',
    blocks: blocksCorporativoMarca,
  },
  {
    slug: 'havaianas-personalizadas-orcamento-guia-completo',
    title: 'Havaianas personalizadas: guia completo de orçamento e itens da proposta',
    excerpt:
      'Saiba o que deve constar num orçamento de havaianas personalizadas: modelo, quantidades, arte, prazo, frete e políticas. Evite custos escondidos e compare fornecedores com justiça.',
    tag: 'Guia',
    image: '/images/bela/hero-cliente-evento.png',
    imageAlt:
      'Atendimento e planejamento de orçamento para havaianas personalizadas em evento — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksHavaianasOrcamentoGuia,
  },
  {
    slug: 'havaianas-personalizadas-mesa-lembrancinhas-casamento',
    title: 'Mesa de lembrancinhas com havaianas personalizadas no casamento',
    excerpt:
      'Como montar a mesa de lembrancinhas com havaianas personalizadas: fluxo, iluminação, identidade visual e erros comuns em salões e espaços ao ar livre.',
    tag: 'Casamento',
    image: '/images/bela/prod-casamento.png',
    imageAlt:
      'Mesa de lembrancinhas de casamento com expositor e havaianas personalizadas — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/porque-utilizar-chinelos-personalizados-para-casamento/',
    blocks: blocksHavaianasMesaLembrancinhas,
  },
  {
    slug: 'havaianas-personalizadas-cores-tipografia-identidade-visual',
    title: 'Cores, tipografia e identidade visual nas havaianas personalizadas',
    excerpt:
      'Defina paleta, contraste e fontes para havaianas personalizadas que funcionem no solado e nas fotos — do casamento ao corporativo.',
    tag: 'Design',
    image: '/images/bela/depoimentos-pagina-3.png',
    imageAlt:
      'Cores, tipografia e identidade visual aplicadas a havaianas personalizadas — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksHavaianasCoresTipografia,
  },
  {
    slug: 'havaianas-personalizadas-prazos-cronograma-evento',
    title: 'Prazos e cronograma: quando encomendar havaianas personalizadas',
    excerpt:
      'Linha do tempo desde o briefing até a entrega: sazonalidade, aprovação de arte, frete e imprevistos — para não correr com o evento na reta final.',
    tag: 'Guia',
    image: '/images/bela/hero-fireworks.jpg',
    imageAlt:
      'Cronograma e celebração: quando encomendar havaianas personalizadas para o grande dia — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksHavaianasPrazosCronograma,
  },
  {
    slug: 'havaianas-personalizadas-casamento-praia-ar-livre',
    title: 'Havaianas personalizadas para casamento na praia e ao ar livre',
    excerpt:
      'Ventos, areia, calor e logística: como planejar havaianas personalizadas em casamentos ao ar livre com segurança e estética.',
    tag: 'Casamento',
    image: '/images/bela/havaianas-real-capoeira-festival.png',
    imageAlt:
      'Casamento na praia e ao ar livre: havaianas personalizadas para convidados — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-personalizados-para-casamento/',
    blocks: blocksHavaianasCasamentoPraia,
  },
  {
    slug: 'havaianas-personalizadas-kit-padrinhos-madrinhas',
    title: 'Kits de havaianas personalizadas para padrinhos e madrinhas',
    excerpt:
      'Ideias para kits especiais com havaianas personalizadas: conteúdo, momento da entrega, numeração e orçamento à parte do lote geral.',
    tag: 'Casamento',
    image: '/images/bela/depoimentos-pagina-1.png',
    imageAlt:
      'Kits de havaianas personalizadas para padrinhos e madrinhas — lembrança especial — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-personalizados-para-casamento/',
    blocks: blocksHavaianasKitPadrinhos,
  },
  {
    slug: 'havaianas-personalizadas-eventos-corporativos-metricas',
    title: 'Havaianas personalizadas em eventos corporativos: métricas e retorno',
    excerpt:
      'Como medir recall, custo por contato e impacto de brindes com havaianas personalizadas em campanhas e convenções.',
    tag: 'Corporativo',
    image: '/images/bela/havaianas-real-arbit-25anos.png',
    imageAlt:
      'Evento corporativo: métricas e retorno com brindes de havaianas personalizadas — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/brindes-corporativos/',
    blocks: blocksHavaianasCorporativosMetricas,
  },
  {
    slug: 'havaianas-personalizadas-festa-15-anos-doces-pista',
    title: 'Festa de 15 anos: doces, pista e havaianas personalizadas integradas',
    excerpt:
      'Coordene mesa de doces, pista e lembranças: fluxo no salão, tema da debutante e timing da distribuição das havaianas personalizadas.',
    tag: '15 anos',
    image: '/images/bela/prod-festa15.png',
    imageAlt:
      'Festa de 15 anos: mesa de doces, pista e havaianas personalizadas integradas — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-para-festa-15-anos/',
    blocks: blocksHavaianasDebutanteDoces,
  },
  {
    slug: 'havaianas-personalizadas-formatura-familias-convidados',
    title: 'Havaianas personalizadas na formatura: formandos, famílias e convidados',
    excerpt:
      'Escala, comunicação e logística quando a lembrança inclui parentes e acompanhantes — além da turma.',
    tag: 'Formatura',
    image: '/images/bela/depoimentos-pagina-2.png',
    imageAlt:
      'Formatura: formandos, famílias e convidados com havaianas personalizadas — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/chinelos-formatura/',
    blocks: blocksHavaianasFormaturaFamilias,
  },
  {
    slug: 'havaianas-personalizadas-qualidade-original-versus-genericas',
    title: 'Havaianas originais versus genéricas: por que importa na personalização',
    excerpt:
      'Conforto, durabilidade da estampa e percepção de valor — critérios para escolher base em havaianas personalizadas para eventos.',
    tag: 'Havaianas',
    image: '/images/bela/sobre-equipe.webp',
    imageAlt:
      'Qualidade Havaianas originais e personalização profissional no solado — equipa Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksHavaianasQualidadeOriginal,
  },
  {
    slug: 'havaianas-personalizadas-tendencias-design-eventos',
    title: 'Tendências de design em havaianas personalizadas para eventos',
    excerpt:
      'Minimalismo, lettering, temas corporativos e festas — como adaptar tendências à área técnica do solado sem perder identidade.',
    tag: 'Design',
    image: '/images/bela/hero-bg-gradient.png',
    imageAlt:
      'Tendências de design e identidade visual em havaianas personalizadas para eventos — Chinelos da Bela',
    originalUrl: 'https://chinelosdabela.com.br/havaianas-personalizadas/',
    blocks: blocksHavaianasTendenciasDesign,
  },
];

const MIN_BODY_CHARS = 5000;

if (import.meta.env.DEV) {
  for (const article of blogArticles) {
    const total = article.blocks.reduce((acc, b) => acc + b.text.length, 0);
    if (total < MIN_BODY_CHARS) {
      console.warn(
        `[blog-articles] Artigo "${article.slug}" tem ${total} caracteres no corpo; alvo mínimo ${MIN_BODY_CHARS}.`,
      );
    }
  }
}
