/**
 * Reescreve H2s (foco no leitor + palavra-chave do artigo) e insere imagens temáticas no corpo.
 * Uso: node scripts/blog-seo-h2-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MARKDOWN_DIR = path.join(__dirname, '../src/data/blog-markdown');

/** Substituições idênticas nos 11 artigos com estrutura de template longo */
const SHARED_TEMPLATE = [
  [
    '## Como o Google avalia conteúdo útil',
    '## Por onde começar: o que você vai ganhar lendo até o fim',
  ],
  [
    '## Briefing mínimo que acelera o orçamento',
    '## Orçamento sem ida e volta: o que já mandar no primeiro contato',
  ],
  [
    '## Arte no solado: legibilidade antes de moda',
    '## Estampa no solado: por que legibilidade vem antes do “estilo Pinterest”',
  ],
  [
    '## Modelo de tira e cor: impacto na percepção',
    '## Tiras e cores: o que muda na foto, na festa e na lembrança',
  ],
  [
    '## Quantidade e numeração sem desperdício',
    '## Tamanhos e quantidades: como não sobrar só um número na mesa',
  ],
  [
    '## Prazo, temporada e fila de produção',
    '## Prazo real: fila de fábrica, alta temporada e margem para imprevisto',
  ],
  ['## Logística no salão e conferência', '## No salão: onde chegam as caixas e quem confere tudo'],
  [
    '## Erros comuns que geram retrabalho',
    '## Erros que custam caro (e como fugir deles sem drama)',
  ],
  [
    '## Comparativo honesto com outras lembrancinhas',
    '## Outras lembrancinhas existem: onde o chinelo personalizado ganha',
  ],
  [
    '## Transparência de escopo na proposta',
    '## Proposta clara: o que tem que estar escrito antes do “sim”',
  ],
  ['## FAQ: primeira leva de dúvidas', '## Perguntas que todo mundo faz na primeira conversa'],
  [
    '## Corporativo, marca e manual de identidade',
    '## Marca e manual: como não errar logo nem cor institucional',
  ],
  ['## Casamento, pista e conforto', '## Casamento: pista, conforto e lembrança que volta para casa'],
  [
    '## Festa de 15 anos e tema da debutante',
    '## Festa de 15 anos: tema da debutante sem poluir o solado',
  ],
  [
    '## Formatura: turma, curso e instituição',
    '## Formatura: curso, turma e símbolos que precisam de permissão',
  ],
  ['## Eventos híbridos e kits remotos', '## Evento híbrido ou kit no correio: o que muda na logística'],
  [
    '## Acessibilidade e inclusão de tamanhos',
    '## Tamanhos para todo mundo: infantil, plus e filas na retirada',
  ],
  ['## Sustentabilidade percebida', '## Lembrança “que dura”: utilidade vale mais que embalagem vazia'],
  [
    '## Evidências, fotos reais e confiança',
    '## Fotos reais e portfólio: como separar promessa de entrega',
  ],
  [
    '## Atualização de conteúdo para manter relevância',
    '## Conteúdo que envelhece bem: dicas que continuam válidas',
  ],
  [
    '## Checklist rápido antes do “de acordo” final',
    '## Checklist final: o que conferir antes de aprovar a arte',
  ],
  ['## Glossário para quem pesquisa no Google', '## Glossário rápido: termos que você vai ouvir do fornecedor'],
  ['## Texto jurídico e claims no solado', '## Texto no solado: promessa, marca e o que pode dar problema'],
  ['## QR Code e integração digital', '## QR Code no solado: dá? Vale a pena?'],
  [
    '## Calendário cultural e picos de demanda',
    '## Datas que lotam a agenda: quando antecipar o pedido',
  ],
  ['## Treinamento de staff no salão', '## Equipe no salão: quem ajuda na mesa e na fila'],
  ['## Segurança patrimonial da mesa', '## Mesa de lembranças: furto, tumulto e pequenos cuidados'],
  ['## Pós-evento: aprendizado para o próximo', '## Depois da festa: o que anotar para o próximo pedido'],
  [
    '## Internacionalização e lembrança brasileira',
    '## Presente com cara do Brasil: o que funciona em evento internacional',
  ],
  ['## Duas línguas no mesmo layout', '## Português e inglês no mesmo solado: hierarquia e leitura'],
  ['## Terceirização de design', '## Você tem designer? Como entregar arquivo que a fábrica aceita'],
  ['## Cor na tela versus cor na borracha', '## Cor no monitor ≠ cor na borracha: o que esperar da prova'],
  [
    '## Política de cancelamento e remarcação',
    '## Cancelar ou mudar data: o que costuma estar no combinado',
  ],
  ['## Pagamento: sinal, saldo e comprovantes', '## Sinal, saldo e NF: o que organizar no financeiro'],
  ['## Segunda remessa e reposição', '## Faltou par? Defeito? Como pedir reposição sem perder o evento'],
  [
    '## Comparando fornecedores além do preço',
    '## Preço não é tudo: três critérios para comparar fornecedores',
  ],
  ['## Métricas simples para empresas', '## Brinde B2B: como medir se o investimento fez sentido'],
  ['## Som, espaço e fluxo perto da mesa', '## Mesa perto do palco: som alto, fila e fluxo de gente'],
  ['## Fotografia e horário de luz', '## Foto e vídeo: onde a mesa fica bonita na imagem'],
  [
    '## Leitura mobile e experiência do usuário',
    '## Celular na mão: como ler prova e conferir detalhe longe do computador',
  ],
  ['## Conteúdo complementar no site', '## Onde continuar lendo no site da Chinelos da Bela'],
  ['## FAQ adicional: detalhes operacionais', '## Mais dúvidas: transporte, troca e últimos detalhes'],
  [
    '## Planejamento financeiro e prioridades',
    '## Orçamento da festa: onde encaixar a lembrança sem estourar a linha',
  ],
  [
    '## Autoridade de tópico e experiência',
    '## Experiência de verdade: por que detalhe operacional importa',
  ],
  ['## Últimas recomendações antes do pedido', '## Última checagem antes de fechar pedido e pagar sinal'],
  [
    '## Chamada para ação: fale com a Chinelos da Bela',
    '## Próximo passo: falar com a Chinelos da Bela com data e quantidade',
  ],
  [
    '## Comunicação com convidados antes da festa',
    '## Convidados sabendo da lembrança: expectativa e fila mais leve',
  ],
  [
    '## Integração com fornecedores de decoração',
    '## Decoração e lembrança: paleta e foto precisam conversar',
  ],
  ['## Som e acessibilidade na retirada', '## Fila na retirada: idosos, cadeirantes e atalho discreto'],
  ['## Calor, piscina e uso pós-evento', '## Calor e piscina: lembrança que aguenta o dia seguinte'],
  ['## Contraste em ambientes escuros', '## Festa com luz baixa: arte precisa ler na pista'],
  [
    '## Roteiro de distribuição em três atos',
    '## Distribuir em três momentos: chegada, mesa e pista',
  ],
  ['## Mensuração de satisfação informal', '## Depois da festa: como saber se a lembrança funcionou'],
  ['## Redes sociais e hashtags', '## Hashtag no solado: curta, legível e alinhada à festa'],
  [
    '## Armazenagem em casa antes de levar ao salão',
    '## Guardar em casa antes do grande dia: umidade e caixa amassada',
  ],
  ['## Quando simplificar a mensagem no solado', '## Menos texto, mais leitura: quando simplificar a arte'],
  ['## Alinhamento com vídeo e vinheta', '## Vídeo do casamento ou da marca: repetir elemento na lembrança'],
  ['## Briefing para fotógrafo sobre a mesa', '## O que pedir ao fotógrafo sobre a mesa de chinelos'],
  ['## Contingência de última hora', '## Plano B: contato salvo e arte aprovada offline'],
  [
    '## Comparativo de fornecedores em três critérios',
    '## Três perguntas que revelam se o fornecedor é sério',
  ],
  ['## Impacto da cor das tiras em vídeo', '## Cor da tira no vídeo: vibrante ou neutra para sua identidade'],
  [
    '## Inclusão de pessoas com alergias e materiais',
    '## Alergia e material: quando vale perguntar composição',
  ],
  [
    '## Documentação para compras corporativas',
    '## Compra corporativa: PDF, CNPJ e aprovação interna',
  ],
  ['## Reuso de arte em próximas campanhas', '## Reaproveitar arte em campanha seguinte: economia com critério'],
  ['## Limites legais de uso de marca de terceiros', '## Personagem e marca de terceiros: licença antes de imprimir'],
  ['## Planejamento de estoque mínimo pós-evento', '## Sobras: o que fazer com pares que sobraram'],
  ['## Integração com lista de presentes', '## Lista de presentes e lembrança de pista: não duplicar surpresa'],
  ['## Tom de voz da marca no texto do solado', '## Tom de voz: corporativo sério vs casal romântico vs festa teen'],
  [
    '## Leitura em diferentes tamanhos de tela',
    '## Do celular ao monitor: conferir prova em mais de um aparelho',
  ],
  [
    '## Estudo de caso genérico: do “quero” ao “entregue”',
    '## Do “quero” ao “entregue”: fases que ninguém pode pular',
  ],
  [
    '## Como ler uma proposta como profissional de eventos',
    '## Ler proposta como quem produz evento: o que não pode faltar escrito',
  ],
  [
    '## Erro clássico: copiar layout de convite sem adaptar',
    '## Convite não é solado: por que copiar o card dá errado',
  ],
  [
    '## Quando vale padrinho VIP com arte diferenciada',
    '## Arte especial para padrinhos: quando compensa o custo extra',
  ],
  [
    '## Uniformidade versus personalização unitária',
    '## Um modelo para todos ou nome no par: o que encarece',
  ],
  ['## Checklist de fotos para portfólio futuro', '## Fotos para guardar: mesa, pista e close no solado'],
  ['## Relação com fornecedor de buffet', '## Buffet e mesa de lembranças: dividir espaço sem briga'],
  ['## Energia da equipe no pós-evento', '## Equipe cansada: logística boa melhora o clima no backstage'],
  ['## Sazonalidade de preço de insumos', '## Preço de insumo ao longo do ano: pergunta que vale fazer'],
  [
    '## SEO local e intenção nacional',
    '## Comprar de outro estado: o que checar além do frete',
  ],
  [
    '## Evite keyword stuffing',
    '## Texto natural: por que repetir o mesmo termo atrapalha a leitura',
  ],
  [
    '## Meta título e meta descrição (contexto editorial)',
    '## Título da página e descrição: o que isso muda no seu pedido',
  ],
  [
    '## Dados estruturados e leitura humana',
    '## Informação organizada: útil para o site e para quem decide',
  ],
  ['## Próximo nível: pós-venda e recompra', '## Depois da primeira compra: quando faz sentido recomprar'],
  [
    '## Micro-passos para quem ainda hesita',
    '## Três passos pequenos para sair da indecisão',
  ],
  ['## Versões de arte: controle de revisão', '## final.pdf, final2.pdf: como nomear arquivo sem confusão'],
  ['## Sinalização na mesa: texto curto', '## Placa na mesa: frase curta que acelera a retirada'],
  [
    '## Integração com cronograma do cerimonial',
    '## Cronograma do cerimonial: encaixar distribuição no roteiro',
  ],
  [
    '## Lembrança como extensão da identidade do casal ou da marca',
    '## Lembrança alinhada à identidade: coerência que as pessoas sentem',
  ],
  [
    '## Perguntas para fazer ao fornecedor antes do sinal',
    '## Antes do sinal: três perguntas que evitam surpresa depois',
  ],
  [
    '## Síntese final para ranqueamento e conversão',
    '## Recap: o que levar deste artigo para o seu orçamento',
  ],
  ['## Próximos recursos no site', '## Outras páginas úteis: sobre, serviços e contato'],
  ['## Despedida objetiva', '## Valeu por ler: próximo passo é combinar data e quantidade'],
];

/** Por slug: intro, “o que muda”, link interno (~linha 73), bloco síntese/aprofundamento/etc. */
const SLUG_PATCHES = {
  'havaianas-personalizadas-tudo-o-que-precisa-saber': [
    [
      '## Introdução: tudo sobre havaianas personalizadas e busca no Google',
      '## Tudo sobre havaianas personalizadas: o que você vai decidir com calma',
    ],
    [
      '## O que muda na prática para iniciantes e curiosos',
      '## Você está começando? O que muda na prática ao pedir havaianas personalizadas',
    ],
    [
      '## Aprofunde por linha',
      '## Ver linhas de produto: por onde continuar no site',
    ],
    [
      '## Síntese: tudo sobre havaianas personalizadas exige método',
      '## Tudo sobre havaianas personalizadas: método vale mais que pressa',
    ],
    [
      '## Aprofundamento: havaianas personalizadas na prática de quem produz eventos',
      '## Quem produz evento sabe: havaianas personalizadas na rotina real',
    ],
    [
      '## Matriz de risco simples para iniciantes e curiosos',
      '## Riscos que iniciante ignora (e como se proteger no pedido)',
    ],
    [
      '## Conclusão ampliada sobre havaianas personalizadas',
      '## Conclusão: tudo sobre havaianas personalizadas resume-se a briefing e prazo',
    ],
    [
      '## Fechamento editorial sobre tudo sobre havaianas personalizadas',
      '## Fechamento: do guia ao pedido com a Chinelos da Bela',
    ],
    [
      '## Última palavra sobre havaianas personalizadas e Google',
      '## Última dúvida sobre havaianas personalizadas? Partimos para o orçamento',
    ],
    [
      '## Mapa mental para iniciantes e curiosos',
      '## Mapa mental: briefing, quantidade, arte e logística',
    ],
  ],
  'havaianas-personalizadas-guia-completo-casamento-eventos': [
    [
      '## Introdução: guia completo de havaianas personalizadas e busca no Google',
      '## Guia completo: havaianas personalizadas para casamento e eventos (sem enrolação)',
    ],
    [
      '## O que muda na prática para noivos e produtores',
      '## Noivos e produtores: o que muda ao escolher havaianas personalizadas',
    ],
    [
      '## Casamento e formatura',
      '## Ver casamento e formatura: próximo passo no site',
    ],
    [
      '## Síntese: guia completo de havaianas personalizadas exige método',
      '## Guia completo de havaianas personalizadas: método e calendário primeiro',
    ],
    [
      '## Aprofundamento: guia de havaianas para casamento e eventos na prática de quem produz eventos',
      '## Na prática de quem produz evento: havaianas personalizadas no cronograma',
    ],
    [
      '## Matriz de risco simples para noivos e produtores',
      '## Riscos que noivo e produtor precisam mitigar no pedido',
    ],
    [
      '## Conclusão ampliada sobre guia de havaianas para casamento e eventos',
      '## Conclusão: guia de havaianas para casamento e eventos termina em ação',
    ],
    [
      '## Fechamento editorial sobre guia completo de havaianas personalizadas',
      '## Fechamento: guia completo vira orçamento com dados na mão',
    ],
    [
      '## Última palavra sobre guia de havaianas para casamento e eventos e Google',
      '## Último passo: guia de havaianas para casamento e eventos e seu orçamento',
    ],
    [
      '## Mapa mental para noivos e produtores',
      '## Mapa mental para noivos: identidade, números, entrega',
    ],
  ],
  'havaianas-personalizadas-precos-modelos-onde-comprar': [
    [
      '## Introdução: preços, modelos e onde comprar havaianas personalizadas e busca no Google',
      '## Preços, modelos e onde comprar havaianas personalizadas: leia antes de comparar sites',
    ],
    [
      '## O que muda na prática para compradores em pesquisa',
      '## Você está pesquisando preço: o que muda na prática ao fechar havaianas personalizadas',
    ],
    ['## Contato oficial', '## Contato oficial: falar com a Chinelos da Bela com segurança'],
    [
      '## Síntese: preços, modelos e onde comprar havaianas personalizadas exige método',
      '## Preços, modelos e onde comprar: resumo para não errar o fornecedor',
    ],
    [
      '## Aprofundamento: preços e modelos de havaianas personalizadas na prática de quem produz eventos',
      '## Preços e modelos na vida real de quem monta evento grande',
    ],
    [
      '## Matriz de risco simples para compradores em pesquisa',
      '## Riscos ao comprar online: o que conferir antes do PIX',
    ],
    [
      '## Conclusão ampliada sobre preços e modelos de havaianas personalizadas',
      '## Conclusão: preço justo de havaianas personalizadas vem com escopo claro',
    ],
    [
      '## Fechamento editorial sobre preços, modelos e onde comprar havaianas personalizadas',
      '## Fechamento: preços, modelos e onde comprar — próximo passo é mensagem objetiva',
    ],
    [
      '## Última palavra sobre preços e modelos de havaianas personalizadas e Google',
      '## Última checagem: preços, modelos e onde comprar havaianas personalizadas',
    ],
    [
      '## Mapa mental para compradores em pesquisa',
      '## Mapa mental: modelo, grade, prazo e nota fiscal',
    ],
  ],
  'havaianas-personalizadas-eventos-melhor-lembrancinha': [
    [
      '## Introdução: havaianas personalizadas para eventos e busca no Google',
      '## Havaianas personalizadas para eventos: será a melhor lembrancinha para o seu caso?',
    ],
    [
      '## O que muda na prática para produtores e anfitriões',
      '## Produtores e anfitriões: o que muda ao escolher havaianas personalizadas para eventos',
    ],
    [
      '## Explore produtos para eventos',
      '## Ver produtos para eventos: inspiração no site',
    ],
    [
      '## Síntese: havaianas personalizadas para eventos exige método',
      '## Havaianas personalizadas para eventos: método evita caos na retirada',
    ],
    [
      '## Aprofundamento: melhor lembrancinha para eventos na prática de quem produz eventos',
      '## Melhor lembrancinha em evento corporativo ou social: logística falada',
    ],
    [
      '## Matriz de risco simples para produtores e anfitriões',
      '## Riscos para produtor: atraso, grade errada e mesa mal posicionada',
    ],
    [
      '## Conclusão ampliada sobre melhor lembrancinha para eventos',
      '## Conclusão: melhor lembrancinha é útil, bonita e entregável',
    ],
    [
      '## Fechamento editorial sobre havaianas personalizadas para eventos',
      '## Fechamento: havaianas personalizadas para eventos com a Bela',
    ],
    [
      '## Última palavra sobre melhor lembrancinha para eventos e Google',
      '## Última dúvida sobre lembrancinha para eventos? Vamos ao orçamento',
    ],
    [
      '## Mapa mental para produtores e anfitriões',
      '## Mapa mental: formato do evento, público, grade e mesa',
    ],
  ],
  'havaianas-personalizadas-empresas-brinde-criativo-barato': [
    [
      '## Introdução: havaianas personalizadas para empresas e busca no Google',
      '## Havaianas personalizadas para empresas: brinde criativo que ainda cabe no orçamento',
    ],
    [
      '## O que muda na prática para marketing e compras B2B',
      '## Marketing e compras: o que muda ao pedir havaianas personalizadas para empresas',
    ],
    ['## Soluções corporativas', '## Brinde corporativo: ver linhas e cases no site'],
    [
      '## Síntese: havaianas personalizadas para empresas exige método',
      '## Havaianas personalizadas para empresas: método reduz retrabalho de marca',
    ],
    [
      '## Aprofundamento: brinde corporativo com havaianas na prática de quem produz eventos',
      '## Brinde corporativo com havaianas: da feira ao kit do colaborador',
    ],
    [
      '## Matriz de risco simples para marketing e compras B2B',
      '## Riscos B2B: aprovação jurídica, NF e prazo de campanha',
    ],
    [
      '## Conclusão ampliada sobre brinde corporativo com havaianas',
      '## Conclusão: brinde corporativo com havaianas precisa de manual de marca',
    ],
    [
      '## Fechamento editorial sobre havaianas personalizadas para empresas',
      '## Fechamento: havaianas personalizadas para empresas com processo claro',
    ],
    [
      '## Última palavra sobre brinde corporativo com havaianas e Google',
      '## Último passo: brinde corporativo com havaianas no WhatsApp da Bela',
    ],
    [
      '## Mapa mental para marketing e compras B2B',
      '## Mapa mental B2B: marca, quantidade, entrega e NF',
    ],
  ],
  'havaianas-personalizadas-festa-15-anos-ideias-precos-dicas': [
    [
      '## Introdução: havaianas personalizadas para festa de 15 anos e busca no Google',
      '## Havaianas personalizadas para festa de 15 anos: ideias, preços e dicas em ordem',
    ],
    [
      '## O que muda na prática para famílias e debutantes',
      '## Família e debutante: o que muda ao fechar havaianas personalizadas para 15 anos',
    ],
    ['## Linha festa de 15 anos', '## Ver linha festa de 15 anos: próximo passo no site'],
    [
      '## Síntese: havaianas personalizadas para festa de 15 anos exige método',
      '## Festa de 15 anos: método para não errar tema no solado',
    ],
    [
      '## Aprofundamento: havaianas para festa de 15 anos na prática de quem produz eventos',
      '## Festa de 15 anos na prática: mesa, pista e fotos com a lembrança',
    ],
    [
      '## Matriz de risco simples para famílias e debutantes',
      '## Riscos: exagerar no glitter, errar grade ou atrasar o pedido',
    ],
    [
      '## Conclusão ampliada sobre havaianas para festa de 15 anos',
      '## Conclusão: havaianas para festa de 15 anos combinam tema e legibilidade',
    ],
    [
      '## Fechamento editorial sobre havaianas personalizadas para festa de 15 anos',
      '## Fechamento: festa de 15 anos com a Chinelos da Bela',
    ],
    [
      '## Última palavra sobre havaianas para festa de 15 anos e Google',
      '## Última dúvida sobre festa de 15 anos? Mande data e tema no WhatsApp',
    ],
    [
      '## Mapa mental para famílias e debutantes',
      '## Mapa mental: tema, convidados, grade e mesa',
    ],
  ],
  'havaianas-personalizadas-casamento-ideias-precos-dicas': [
    [
      '## Introdução: havaianas personalizadas para casamento: ideias, preços e dicas e busca no Google',
      '## Havaianas personalizadas para casamento: ideias, preços e dicas que você vai usar',
    ],
    [
      '## O que muda na prática para noivos',
      '## Noivos: o que muda ao escolher havaianas personalizadas para casamento',
    ],
    ['## Página dedicada ao casamento', '## Casamento: ver página de produto e referências'],
    [
      '## Síntese: havaianas personalizadas para casamento: ideias, preços e dicas exige método',
      '## Casamento: ideias e preços só funcionam com método e prazo',
    ],
    [
      '## Aprofundamento: havaianas personalizadas para casamento na prática de quem produz eventos',
      '## Casamento real: havaianas personalizadas no dia a dia do cerimonial',
    ],
    [
      '## Matriz de risco simples para noivos',
      '## Riscos que noivos evitam com grade e prova aprovada',
    ],
    [
      '## Conclusão ampliada sobre havaianas personalizadas para casamento',
      '## Conclusão: havaianas personalizadas para casamento fecham com calma',
    ],
    [
      '## Fechamento editorial sobre havaianas personalizadas para casamento: ideias, preços e dicas',
      '## Fechamento: ideias, preços e dicas viram pedido na Chinelos da Bela',
    ],
    [
      '## Última palavra sobre havaianas personalizadas para casamento e Google',
      '## Último passo: havaianas personalizadas para casamento no seu orçamento',
    ],
    [
      '## Mapa mental para noivos',
      '## Mapa mental do casal: identidade visual, convidados, entrega',
    ],
  ],
  'havaianas-ou-sandalias-personalizadas': [
    [
      '## Introdução: havaianas ou sandálias personalizadas e busca no Google',
      '## Havaianas ou sandálias personalizadas: qual faz sentido para o seu evento?',
    ],
    [
      '## O que muda na prática para quem ainda não decidiu o modelo',
      '## Ainda na dúvida? O que muda entre havaianas ou sandálias personalizadas',
    ],
    [
      '## Veja linhas para festas e debut',
      '## Ver linhas para festa e 15 anos: comparar no site',
    ],
    [
      '## Síntese: havaianas ou sandálias personalizadas exige método',
      '## Havaianas ou sandálias personalizadas: decidir com método, não no impulso',
    ],
    [
      '## Aprofundamento: havaianas ou sandálias personalizadas na prática de quem produz eventos',
      '## Produção de evento: quando sandália vence e quando havaiana é imbatível',
    ],
    [
      '## Matriz de risco simples para organizadores de eventos',
      '## Riscos na escolha do modelo: público, dress code e logística',
    ],
    [
      '## Conclusão ampliada sobre havaianas ou sandálias personalizadas',
      '## Conclusão: havaianas ou sandálias personalizadas depende de uso e público',
    ],
    [
      '## Fechamento editorial sobre havaianas ou sandálias personalizadas',
      '## Fechamento: havaianas ou sandálias personalizadas com a Bela',
    ],
    [
      '## Última palavra sobre havaianas ou sandálias personalizadas e Google',
      '## Última dúvida sobre havaianas ou sandálias personalizadas? Orçamento no WhatsApp',
    ],
    [
      '## Mapa mental para organizadores de eventos',
      '## Mapa mental: formato da festa, pista, praia e conforto',
    ],
  ],
  'havaianas-personalizadas-vs-chinelos-comuns': [
    [
      '## Introdução: havaianas personalizadas versus chinelos comuns e busca no Google',
      '## Havaianas personalizadas ou chinelos comuns: qual escolher para a sua lembrança?',
    ],
    [
      '## O que muda na prática para compradores que comparam qualidade',
      '## Comparando qualidade: o que muda entre havaianas personalizadas e chinelos comuns',
    ],
    [
      '## Conheça opções com sola original',
      '## Ver opções com sola original Havaianas no site',
    ],
    [
      '## Síntese: havaianas personalizadas versus chinelos comuns exige método',
      '## Havaianas personalizadas x chinelos comuns: método evita arrependimento',
    ],
    [
      '## Aprofundamento: havaianas personalizadas vs chinelos comuns na prática de quem produz eventos',
      '## Na produção de evento: havaianas personalizadas vs chinelos comuns no backstage',
    ],
    [
      '## Matriz de risco simples para compradores que comparam qualidade',
      '## Riscos ao escolher chinelo genérico: durabilidade e imagem',
    ],
    [
      '## Conclusão ampliada sobre havaianas personalizadas vs chinelos comuns',
      '## Conclusão: havaianas personalizadas vs chinelos comuns é escolha de valor percebido',
    ],
    [
      '## Fechamento editorial sobre havaianas personalizadas versus chinelos comuns',
      '## Fechamento: havaianas personalizadas versus chinelos comuns com a Bela',
    ],
    [
      '## Última palavra sobre havaianas personalizadas vs chinelos comuns e Google',
      '## Última dúvida sobre havaianas personalizadas vs chinelos comuns? Fale conosco',
    ],
    [
      '## Mapa mental para compradores que comparam qualidade',
      '## Mapa mental: base original, estampa, durabilidade e preço',
    ],
  ],
  'melhor-estampa-chinelos-personalizados': [
    [
      '## Introdução: a melhor estampa para chinelos personalizados e busca no Google',
      '## Qual a melhor estampa para chinelos personalizados? Comece por aqui',
    ],
    [
      '## O que muda na prática para quem cuida da identidade visual',
      '## Identidade visual: o que muda na melhor estampa para chinelos personalizados',
    ],
    [
      '## Combine estampa com linha de produtos',
      '## Ver estampas e linhas de produto no site',
    ],
    [
      '## Síntese: a melhor estampa para chinelos personalizados exige método',
      '## Melhor estampa para chinelos personalizados: método bate modinha',
    ],
    [
      '## Aprofundamento: estampa em chinelos personalizados na prática de quem produz eventos',
      '## Estampa em chinelos personalizados: o que funciona na pista e na foto',
    ],
    [
      '## Matriz de risco simples para quem cuida da identidade visual',
      '## Riscos: estampa ilegível, cor errada e excesso de detalhe',
    ],
    [
      '## Conclusão ampliada sobre estampa em chinelos personalizados',
      '## Conclusão: melhor estampa para chinelos personalizados é legível e sua',
    ],
    [
      '## Fechamento editorial sobre a melhor estampa para chinelos personalizados',
      '## Fechamento: melhor estampa com a Chinelos da Bela',
    ],
    [
      '## Última palavra sobre estampa em chinelos personalizados e Google',
      '## Última dúvida sobre estampa em chinelos personalizados? Envie referências',
    ],
    [
      '## Mapa mental para quem cuida da identidade visual',
      '## Mapa mental: contraste, tipografia, logo e prova digital',
    ],
  ],
  'vale-a-pena-havaianas-em-casamento': [
    [
      '## Introdução: vale a pena dar havaianas em casamento e busca no Google',
      '## Vale a pena dar havaianas em casamento? Este guia te ajuda a decidir',
    ],
    [
      '## O que muda na prática para noivos e assessorias',
      '## Noivos e assessoria: o que muda ao avaliar havaianas em casamento',
    ],
    [
      '## Saiba mais sobre havaianas para casamento',
      '## Ver mais sobre havaianas para casamento no site',
    ],
    [
      '## Síntese: vale a pena dar havaianas em casamento exige método',
      '## Vale a pena dar havaianas em casamento: método evita lembrança mal-amada',
    ],
    [
      '## Aprofundamento: havaianas em casamento na prática de quem produz eventos',
      '## Havaianas em casamento na prática: pista, foto e orçamento',
    ],
    [
      '## Matriz de risco simples para noivos e assessorias',
      '## Riscos: grade errada, mesa longe da pista e estética fora do estilo',
    ],
    [
      '## Conclusão ampliada sobre havaianas em casamento',
      '## Conclusão: havaianas em casamento valem quando combinam com a festa',
    ],
    [
      '## Fechamento editorial sobre vale a pena dar havaianas em casamento',
      '## Fechamento: vale a pena? Sim, se planejar com a Bela',
    ],
    [
      '## Última palavra sobre havaianas em casamento e Google',
      '## Última dúvida sobre havaianas em casamento? Pedir orçamento objetivo',
    ],
    [
      '## Mapa mental para noivos e assessorias',
      '## Mapa mental: estilo da festa, perfil dos convidados e logística',
    ],
  ],
};

/** Imagens no corpo (além do hero do artigo): tema + alt descritivo */
const BODY_IMAGES = {
  'havaianas-personalizadas-tudo-o-que-precisa-saber': [
    '![Havaianas personalizadas — detalhe em produção Chinelos da Bela](/images/bela/real-havaianas.jpg)',
    '![Formatura e lembranças personalizadas Chinelos da Bela](/images/bela/real-formatura.png)',
    '![Mesa de lembrancinhas em evento Chinelos da Bela](/images/bela/prod-casamento-mesa.png)',
  ],
  'havaianas-personalizadas-guia-completo-casamento-eventos': [
    '![Casamento com havaianas personalizadas Chinelos da Bela](/images/bela/real-casamento.jpeg)',
    '![Mesa de chinelos para casamento Chinelos da Bela](/images/bela/prod-casamento-mesa.png)',
    '![Evento e fogos — lembrança para convidados Chinelos da Bela](/images/bela/hero-fireworks.jpg)',
  ],
  'havaianas-personalizadas-precos-modelos-onde-comprar': [
    '![Cliente recebendo lembranças em evento Chinelos da Bela](/images/bela/hero-cliente-evento.png)',
    '![Havaianas personalizadas — qualidade do solado Chinelos da Bela](/images/bela/destaque-havaianas.webp)',
    '![Chinelos personalizados para formatura Chinelos da Bela](/images/bela/prod-formatura-mesa.png)',
  ],
  'havaianas-personalizadas-eventos-melhor-lembrancinha': [
    '![Evento com lembrancinha útil Chinelos da Bela](/images/bela/hero-fireworks.jpg)',
    '![Havaianas em display para retirada Chinelos da Bela](/images/bela/prod-casamento-mesa.png)',
    '![Brindes e experiência em evento Chinelos da Bela](/images/bela/real-brindes.png)',
  ],
  'havaianas-personalizadas-empresas-brinde-criativo-barato': [
    '![Brinde corporativo em feira Chinelos da Bela](/images/bela/prod-corporativo.png)',
    '![Mesa corporativa com lembranças Chinelos da Bela](/images/bela/prod-corporativo-mesa.png)',
    '![Brindes corporativos reais Chinelos da Bela](/images/bela/real-brindes.png)',
  ],
  'havaianas-personalizadas-festa-15-anos-ideias-precos-dicas': [
    '![Festa de 15 anos com havaianas personalizadas Chinelos da Bela](/images/bela/real-festa15.png)',
    '![Debutante e lembranças Chinelos da Bela](/images/bela/prod-festa15.png)',
    '![Mesa festa 15 anos Chinelos da Bela](/images/bela/prod-festa15-mesa.png)',
  ],
  'havaianas-personalizadas-casamento-ideias-precos-dicas': [
    '![Noivos e havaianas personalizadas Chinelos da Bela](/images/bela/real-casamento.jpeg)',
    '![Casamento — mesa de chinelos Chinelos da Bela](/images/bela/prod-casamento.png)',
    '![Lembrancinhas na mesa Chinelos da Bela](/images/bela/prod-casamento-mesa.png)',
  ],
  'havaianas-ou-sandalias-personalizadas': [
    '![Havaianas personalizadas para comparar modelos Chinelos da Bela](/images/bela/prod-festa15.png)',
    '![Chinelos e sandálias em evento Chinelos da Bela](/images/bela/destaque-havaianas.webp)',
    '![Lembranças em mesa festa Chinelos da Bela](/images/bela/prod-festa15-mesa.png)',
  ],
  'havaianas-personalizadas-vs-chinelos-comuns': [
    '![Detalhe de havaianas originais Chinelos da Bela](/images/bela/real-havaianas.jpg)',
    '![Comparativo visual — sola e estampa Chinelos da Bela](/images/bela/destaque-havaianas.webp)',
    '![Lembranças com havaianas em evento Chinelos da Bela](/images/bela/prod-casamento-mesa.png)',
  ],
  'melhor-estampa-chinelos-personalizados': [
    '![Estampa no solado — close Chinelos da Bela](/images/bela/destaque-havaianas.webp)',
    '![Havaianas personalizadas em destaque Chinelos da Bela](/images/bela/real-havaianas.jpg)',
    '![Projeto visual e lembrança Chinelos da Bela](/images/bela/blog-havaianas.jpg)',
  ],
  'vale-a-pena-havaianas-em-casamento': [
    '![Casamento — havaianas como lembrança Chinelos da Bela](/images/bela/real-casamento.jpeg)',
    '![Pista e conforto — chinelos no casamento Chinelos da Bela](/images/bela/prod-casamento.png)',
    '![Mesa de havaianas para convidados Chinelos da Bela](/images/bela/prod-casamento-mesa.png)',
  ],
};

const INTRO_FLUFF =
  'Este artigo foi pensado para **SEO** no **Google**, com **parágrafos curtos** e subtítulos claros.';
const INTRO_FLUFF_FIX =
  '**Parágrafos curtos** e subtítulos claros para você achar a resposta rápido.';

function applyReplacements(content, pairs) {
  let out = content;
  for (const [a, b] of pairs) {
    if (out.includes(a)) out = out.split(a).join(b);
  }
  return out;
}

function insertBodyImages(slug, content) {
  const imgs = BODY_IMAGES[slug];
  if (!imgs || content.includes('![')) return content;

  let md = content;

  const introAnchor =
    'A **Chinelos da Bela** trabalha com **Havaianas originais** e orientação de arte.\n\n## ';
  if (md.includes(introAnchor)) {
    md = md.replace(
      introAnchor,
      `A **Chinelos da Bela** trabalha com **Havaianas originais** e orientação de arte.\n\n${imgs[0]}\n\n## `,
    );
  }

  const midAnchor =
    'Prova digital é etapa essencial. Aprove com calma; pressa aqui custa caro depois.\n\n## ';
  if (imgs[1] && md.includes(midAnchor)) {
    md = md.replace(
      midAnchor,
      `Prova digital é etapa essencial. Aprove com calma; pressa aqui custa caro depois.\n\n${imgs[1]}\n\n## `,
    );
  }

  const faqAnchor = '## Perguntas que todo mundo faz na primeira conversa';
  if (imgs[2] && md.includes(faqAnchor)) {
    md = md.replace(faqAnchor, `${imgs[2]}\n\n${faqAnchor}`);
  }

  return md;
}

function processTemplateFile(slug, content) {
  const patches = SLUG_PATCHES[slug];
  if (!patches) throw new Error(`Sem SLUG_PATCHES para ${slug}`);

  let md = content;
  md = applyReplacements(md, patches);
  md = applyReplacements(md, SHARED_TEMPLATE);
  if (md.includes(INTRO_FLUFF)) md = md.split(INTRO_FLUFF).join(INTRO_FLUFF_FIX);
  md = insertBodyImages(slug, md);
  return md;
}

const TEMPLATE_SLUGS = Object.keys(SLUG_PATCHES);

for (const slug of TEMPLATE_SLUGS) {
  const file = path.join(MARKDOWN_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, 'utf8');
  const next = processTemplateFile(slug, raw);
  fs.writeFileSync(file, next, 'utf8');
  console.log('OK', slug);
}

console.log('Feito: 11 artigos template + imagens.');
