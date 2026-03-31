/**
 * Depoimentos da secção "Nossos clientes" — carrossel.
 * Fotos: faixa horizontal única (4 retratos) em public/images/bela/depoimentos-strip-clientes.png
 */
export type DepoimentoClienteSlide = {
  photo: string;
  /** 0–3: coluna na faixa quando `photo` é imagem composta horizontal */
  stripIndex: number;
  photoAlt: string;
  text: string;
  author: string;
};

const STRIP = '/images/bela/depoimentos-strip-clientes.png';

export const depoimentosClientesBela: DepoimentoClienteSlide[] = [
  {
    photo: STRIP,
    stripIndex: 0,
    photoAlt:
      'Cliente com caixa de chinelos personalizados Chinelos da Bela — foto real',
    text: 'Vocês são maravilhosas! Nem procurei outro lugar, fui na intuição e não me arrependo! Atendimento, qualidade e simpatia - Já indiquei para 3 noivas!',
    author: 'Amanda Gabriela',
  },
  {
    photo: STRIP,
    stripIndex: 1,
    photoAlt: 'Cliente em festa com vestido e havaianas personalizadas nas mãos — foto real',
    text: 'Do orçamento à entrega, tudo muito claro e caprichado. As havaianas do nosso casamento arrancaram elogios de todo mundo.',
    author: 'Mariana Ribeiro',
  },
  {
    photo: STRIP,
    stripIndex: 2,
    photoAlt: 'Cliente com chinelos personalizados nas mãos — foto real Chinelos da Bela',
    text: 'Segunda vez que fechamos brinde corporativo com a Chinelos da Bela. Prazo cumprido e acabamento impecável, como sempre.',
    author: 'Ricardo Tavares',
  },
  {
    photo: STRIP,
    stripIndex: 3,
    photoAlt: 'Casal com chinelos Chinelos da Bela — foto real (redes sociais)',
    text: 'Minha festa de 15 ganhou uma lembrancinha que as amigas ainda comentam. Obrigada pelo carinho em cada detalhe!',
    author: 'Letícia Ferreira',
  },
];
