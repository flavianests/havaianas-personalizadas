/**
 * Cards de produtos — mesma vitrine em home e páginas de linha (havaianas-personalizadas-*)
 */
import { siteConfig } from '../config';

const im = siteConfig.images;

export const productCards = [
  {
    href: '/havaianas-personalizadas-casamento',
    /** Borda brilho / hover — ProdutoCardsGrid */
    visualVariant: 'rose' as const,
    title: 'Havaianas Personalizadas para casamento',
    blurb:
      'Cores e arte alinhadas ao seu grande dia — conforto na pista e lembrança que combina com a identidade do evento.',
    linkLabel: 'Ver Havaianas Personalizadas para casamento',
    img: im.prodCasamento,
    alt: 'Noiva com Havaianas personalizadas nas mãos, vestido branco e véu, decoração de casamento ao fundo — Chinelos da Bela',
    imgObjectFit: 'contain' as const,
  },
  {
    href: '/havaianas-personalizadas-formatura',
    visualVariant: 'indigo' as const,
    title: 'Havaianas Personalizadas para formatura',
    blurb:
      'Beca, confete e festa: lembrancinhas com as cores e o símbolo da turma — confortáveis da cerimônia à pista.',
    linkLabel: 'Ver Havaianas Personalizadas para formatura',
    img: im.prodFormatura,
    alt: 'Formanda com beca segurando Havaianas personalizadas com estampa, colação de formatura — Chinelos da Bela',
    imgObjectFit: 'contain' as const,
  },
  {
    href: '/havaianas-personalizadas-15-anos',
    visualVariant: 'fuchsia' as const,
    title: 'Havaianas Personalizadas para festa de 15 anos',
    blurb:
      'Do vestido de debutante à pista: estampas e cores da sua festa — conforto para curtir a noite inteira.',
    linkLabel: 'Ver Havaianas Personalizadas para festa de 15 anos',
    img: im.prodFesta15,
    alt: 'Debutante com vestido rosa segurando Havaianas personalizadas rosa, mesa de lembrancinhas ao lado — Chinelos da Bela',
    imgObjectFit: 'contain' as const,
  },
  {
    href: '/havaianas-personalizadas-eventos-corporativos',
    visualVariant: 'emerald' as const,
    title: 'Evento corporativo',
    blurb:
      'Convenções, feiras e encontros em clima mais descontraído: brindes que unem estilo, conforto e lembrança da marca depois do evento.',
    linkLabel: 'Ver Havaianas Personalizadas para evento corporativo',
    img: im.prodCorporativo,
    alt: 'Stand corporativo com Havaianas personalizadas, participante apresentando chinelos da marca em feira ou convenção — Chinelos da Bela',
    imgObjectFit: 'contain' as const,
  },
] as const;
