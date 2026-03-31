/**
 * Chinelos da Bela — alinhado a chinelosdabela.com.br
 * Termo principal em destaque: Havaianas Personalizadas
 */
const waMsgOrcamento =
  'Olá! Vim pelo site e gostaria de solicitar um orçamento de havaianas personalizadas.';

/** Submenu de Produtos (header + mobile); primeiro item = página geral */
const produtosNavChildren = [
  { href: '/servicos', label: 'Ver todos os produtos' },
  { href: '/produtos/casamento', label: 'Casamento' },
  { href: '/produtos/festa-15-anos', label: 'Festa de 15 anos' },
  { href: '/produtos/formatura', label: 'Formatura' },
  { href: '/produtos/eventos-corporativos', label: 'Eventos corporativos' },
] as const;

export const siteConfig = {
  name: 'Chinelos da Bela',
  legalName: 'Chinelos da Bela',
  description:
    'Havaianas personalizadas em São Paulo (Jd. Celeste) — casamentos, formaturas, festa de 15 anos e brindes corporativos. Chinelos da Bela: Havaianas originais e estampa no solado.',
  url: 'https://havaianas-personalizadas.vercel.app',
  /** WhatsApp — só dígitos com DDI (55…), sem símbolos; não exibimos telefone fixo no site */
  whatsappPhone: '5511941623357',
  whatsappMessage: waMsgOrcamento,
  email: 'contato@chinelosdabela.com.br',
  address: 'Av. Pirajussara, 4869 — Jd. Celeste, São Paulo — SP',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Av.+Pirajussara,+4869,+Jardim+Celeste,+S%C3%A3o+Paulo,+SP',
  cnpj: '27.574.309/0001-41',
  images: {
    logoPrimary: '/images/bela/logo-primary.png',
    logoWhite: '/images/bela/logo-white.png',
    hero: '/images/bela/hero-fireworks.jpg',
    /** Fundo do hero (gradiente tech azul/roxo + wireframe) */
    heroBgGradient: '/images/bela/hero-bg-gradient.png',
    /** Casamento: noiva com Havaianas personalizadas (foto real) — prod-casamento.png */
    prodCasamento: '/images/bela/prod-casamento.png',
    /** Casamento: mesa de lembrancinhas / display (foto real) */
    prodCasamentoMesa: '/images/bela/prod-casamento-mesa.png',
    /** Formatura: formanda com Havaianas personalizadas na colação (foto real — prod-formatura.png) */
    prodFormatura: '/images/bela/prod-formatura.png',
    /** Formatura: mesa de lembrancinhas / display (foto real) */
    prodFormaturaMesa: '/images/bela/prod-formatura-mesa.png',
    /** Corporativo: stand em feira com Havaianas personalizadas (foto real — prod-corporativo.png) */
    prodCorporativo: '/images/bela/prod-corporativo.png',
    /** Corporativo: expositor / lembranças em evento (foto real) */
    prodCorporativoMesa: '/images/bela/prod-corporativo-mesa.png',
    /** Festa de 15 anos: debutante com Havaianas personalizadas (foto real — prod-festa15.png) */
    prodFesta15: '/images/bela/prod-festa15.png',
    /** Festa de 15 anos: mesa / expositor com lembrancinhas (foto real) */
    prodFesta15Mesa: '/images/bela/prod-festa15-mesa.png',
    destaqueHavaianas: '/images/bela/destaque-havaianas.webp',
    sobreEquipe: '/images/bela/sobre-equipe.webp',
    cliente1: '/images/bela/depoimentos-pagina-1.png',
    cliente2: '/images/bela/depoimentos-pagina-2.png',
    cliente3: '/images/bela/depoimentos-pagina-3.png',
    cliente4: '/images/bela/depoimentos-pagina-4.png',
    /** Seção Nossos clientes — coração 3D ao lado do depoimento (home oficial) */
    coracao3dChinelosBela: '/images/bela/coracao-3d-chinelos-bela.png',
    /** Hero home — colagem flutuante (fotos enviadas) */
    heroHomeRio: '/images/bela/hero-home-rio.png',
    heroHomeArbit: '/images/bela/hero-home-arbit.png',
    heroHomeSemParar: '/images/bela/hero-home-sem-parar.png',
    /** Seção Time qualificado — Havaianas personalizadas (projeto Sem Parar na praia) */
    timeQualificado: '/images/bela/time-qualificado-sem-parar-praia.png',
    /** Legado / download script (outras páginas podem reutilizar) */
    realHavaianas: '/images/bela/real-havaianas.jpg',
    realCasamento: '/images/bela/real-casamento.jpeg',
    realFormatura: '/images/bela/real-formatura.png',
    realBrindes: '/images/bela/real-brindes.png',
    realFesta15: '/images/bela/real-festa15.png',
  },
  produtosNavChildren,
  nav: [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre' },
    { label: 'Produtos', children: produtosNavChildren },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
  ],
  footerNav: [
    { href: '/', label: 'Início' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/servicos', label: 'Produtos' },
    { href: '/produtos/casamento', label: 'Casamento' },
    { href: '/produtos/festa-15-anos', label: 'Festa de 15 anos' },
    { href: '/produtos/formatura', label: 'Formatura' },
    { href: '/produtos/eventos-corporativos', label: 'Eventos corporativos' },
    { href: '/blog', label: 'Blog' },
    { href: '/contato', label: 'Contato' },
  ],
  social: {
    instagram: 'https://www.instagram.com/chinelosdabela/',
    facebook: 'https://www.facebook.com/chinelosdabela',
    tiktok: 'https://www.tiktok.com/@chinelosdabela',
    youtube: 'https://www.youtube.com/@chinelosdabela',
  },
} as const;

export function whatsappHref(phone: string, text: string = waMsgOrcamento) {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

export default siteConfig;
