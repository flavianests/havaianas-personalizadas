/**
 * Depoimentos da secção "Nossos clientes" — textos variados por slide (carrossel).
 */
export type DepoimentoClienteSlide = {
  photo: string;
  photoAlt: string;
  text: string;
  author: string;
};

export const depoimentosClientesBela: DepoimentoClienteSlide[] = [
  {
    photo: '/images/bela/cliente-1.png',
    photoAlt: 'Montagem com fotos de eventos e cenários — depoimentos Chinelos da Bela',
    text: 'Vocês são maravilhosas! Nem procurei outro lugar, fui na intuição e não me arrependo! Atendimento, qualidade e simpatia - Já indiquei para 3 noivas!',
    author: 'Amanda Gabriela',
  },
  {
    photo: '/images/bela/cliente-2.png',
    photoAlt: 'Havaianas personalizadas Rio de Janeiro — Capoeira Brasil e Festival GCB',
    text: 'Do orçamento à entrega, tudo muito claro e caprichado. As havaianas do nosso casamento arrancaram elogios de todo mundo.',
    author: 'Mariana Ribeiro',
  },
  {
    photo: '/images/bela/cliente-3.png',
    photoAlt: 'Caixa com Havaianas personalizadas — projeto arbit 25 anos',
    text: 'Segunda vez que fechamos brinde corporativo com a Chinelos da Bela. Prazo cumprido e acabamento impecável, como sempre.',
    author: 'Ricardo Tavares',
  },
  {
    photo: '/images/bela/cliente-4.png',
    photoAlt: 'Havaianas personalizadas Sem Parar Empresas — Chinelos da Bela',
    text: 'Minha festa de 15 ganhou uma lembrancinha que as amigas ainda comentam. Obrigada pelo carinho em cada detalhe!',
    author: 'Letícia Ferreira',
  },
];
