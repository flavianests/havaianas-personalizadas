/**
 * Gera artigos longos (~3000 palavras) em Markdown a partir de modelos + variáveis por tema.
 * Executar: node scripts/gen-blog-from-templates.mjs
 *
 * NÃO sobrescreve slugs em SKIP_MANUAL (conteúdo reescrito à mão ou editorial próprio).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../src/data/blog-markdown');

/** @param {string} md */
function countWords(md) {
  const text = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/**
 * Modelos de parágrafo (45–90 palavras), otimizados para leitura curta e SEO natural.
 * ctx: { focus, focus2, verb, audience, occasion, linkPhrase, path }
 */
const T = [
  (c) =>
    `## Introdução: ${c.focus}\n\nEste texto cobre **${c.focus2}** com linguagem direta e **parágrafos curtos**, pensando em quem lê no celular.\n\nFalamos de **havaianas personalizadas**, **estampa no solado** e processo com fornecedor. A **${c.brand}** trabalha com **Havaianas originais** e apoio em arte quando necessário.`,
  (c) =>
    `## O que muda na prática para ${c.audience}\n\nNa prática, ${c.occasion} exige planejamento de quantidade e prazo. **Chinelos personalizados** não são item de última hora sem custo extra.\n\nAntecipe briefing. Envie referências visuais. Defina responsável pela aprovação da arte.`,
  (c) =>
    `## Briefing mínimo que acelera o orçamento\n\nData do evento, cidade, quantidade estimada, faixas de numeração e referências visuais são o núcleo. Quanto mais completo, menos idas e voltas.\n\nSe for **${c.occasion}**, indique também perfil de convidados e necessidade de infantil.`,
  (c) =>
    `## Arte no solado: legibilidade antes de moda\n\nDetalhes finos somem na borracha. Contraste forte ajuda fotos e leitura à distância. Menos linhas bem desenhadas superam poluição visual.\n\nProva digital é etapa essencial. Aprove com calma; pressa aqui custa caro depois.`,
  (c) =>
    `## Modelo de tira e cor: impacto na percepção\n\nCores da paleta reforçam identidade. Tiras neutras agradam públicos mistos. Escolha depende do tom do evento.\n\nRegistre na proposta o modelo exato para evitar troca tardia.`,
  (c) =>
    `## Quantidade e numeração sem desperdício\n\nListe tamanhos com folga moderada. Excesso infantil sem crianças gera sobra. Falta de infantil em festa familiar gera frustração.\n\nUse RSVP quando possível. Cerimonial ajuda a estimar perfil.`,
  (c) =>
    `## Prazo, temporada e fila de produção\n\nAlta temporada de **casamentos** e confraternizações enche agendas. **Havaianas personalizadas para eventos** precisam de data de entrega com margem.\n\nUrgência pode ter custo. Planeje com semanas ou meses de folga.`,
  (c) =>
    `## Logística no salão e conferência\n\nDefina onde caixas chegam e quem recebe. Conferência na entrada evita surpresa na véspera.\n\nMesa bem posicionada melhora fotos e fluxo. Combine com fotógrafo e cerimonial.`,
  (c) =>
    `## Erros comuns que geram retrabalho\n\nAprovar arte apressado. Mudar modelo depois do OK. Subestimar frete. Ignorar política de defeito.\n\nDocumente combinados por escrito antes do sinal.`,
  (c) =>
    `## Comparativo honesto com outras lembrancinhas\n\nDoces somem na noite. Objetos decorativos ficam na gaveta. **Chinelos personalizados** costumam ir para o dia a dia de lazer.\n\nCompare categorias equivalentes em percepção de valor, não só preço.`,
  (c) =>
    `## Transparência de escopo na proposta\n\nPeça detalhamento: modelo, quantidade, tipo de personalização, revisões, prazo, frete, nota fiscal.\n\nTransparência reduz atrito e aumenta confiança antes do sinal.`,
  (c) =>
    `## ${c.linkPhrase}\n\nExplore a página ${c.path} para ver linha de produto, linguagem visual e próximos passos. Links internos ajudam navegação e contexto.\n\nVolte ao [Blog da Bela](/blog/) para outros guias.`,
  (c) =>
    `## FAQ: primeira leva de dúvidas\n\n**Dá para personalizar com foto?** Depende do fornecedor e da área útil. Pergunte viabilidade e durabilidade.\n\n**Quanto tempo leva?** Varia por lote e temporada. Peça cronograma após aprovação.`,
  (c) =>
    `### FAQ: prazo e entrega\n\n**Posso receber antes da data?** Sim, se combinado. Armazenagem seca é importante.\n\n**E se atrasar transportadora?** Tenha margem. Seguro pode ajudar em lotes caros.`,
  (c) =>
    `### FAQ: pagamento e documentos\n\n**Emitem nota?** Para PJ, normalmente sim. Alinhe CNPJ e dados fiscais cedo.\n\n**Tem sinal?** Política varia. Leia condições de cancelamento.`,
  (c) =>
    `### FAQ: qualidade e originalidade\n\n**É sola original?** Pergunte explicitamente. **Havaianas originais** têm padrão de conforto reconhecível.\n\n**Adesivo é igual a estampa profissional?** Não. Durabilidade e acabamento diferem.`,
  (c) =>
    `## Corporativo, marca e manual de identidade\n\n**Brindes corporativos** exigem respeito a cores e área de respiro do logo. Jurídico pode aprovar texto curto no solado.\n\nBriefing completo evita retrabalho.`,
  (c) =>
    `## Casamento, pista e conforto\n\n**Lembrancinha de casamento** útil melhora experiência na pista. Convidados lembram do cuidado.\n\nDistribuição organizada evita tumulto. Sinalize a mesa.`,
  (c) =>
    `## Festa de 15 anos e tema da debutante\n\nCores e símbolos do tema traduzem identidade. Simplifique para o solado manter legibilidade.\n\nFamília deve alinhar aprovadores da arte.`,
  (c) =>
    `## Formatura: turma, curso e instituição\n\nSímbolos acadêmicos podem precisar de validação. Antecipe burocracia interna da instituição.\n\nTurmas grandes se beneficiam de escala, mas precisam de organização.`,
  (c) =>
    `## Eventos híbridos e kits remotos\n\nParte do público pode estar online. **Lembrancinha física** ainda funciona para VIP presencial.\n\nLogística de correio tem custo e prazo próprios.`,
  (c) =>
    `## Acessibilidade e inclusão de tamanhos\n\nAmplas faixas de numeração evitam exclusão. Pergunte tamanhos especiais se necessário.\n\nInclusão melhora imagem do anfitrião ou da marca.`,
  (c) =>
    `## Sustentabilidade percebida\n\nBrinde durável reduz descarte imediato. Narre com honestidade; evite greenwashing.\n\nQualidade prolonga uso e memória da marca.`,
  (c) =>
    `## Evidências, fotos reais e confiança\n\nPortfólio reduz ansiedade. Peça exemplos compatíveis com seu tipo de evento.\n\nProva social consistente educa o visitante.`,
  (c) =>
    `## Atualização de conteúdo para manter relevância\n\nRevise prazos e processos anualmente em temas comerciais.\n\nCorrija datas e políticas quando mudarem para o visitante não ver informação desatualizada.`,
  (c) =>
    `## Checklist rápido antes do “de acordo” final\n\nModelo, cor, arte aprovada, quantidades, endereço, data, valor, forma de pagamento, política de defeito.\n\nChecklist simples evita lacunas.`,
  (c) =>
    `## Glossário rápido\n\n**Sola**: base do calçado, onde costuma ficar a personalização. **Tira**: parte superior. **Lote**: produção conjunta.\n\nTermos claros evitam mal-entendido com o fornecedor.`,
  (c) =>
    `## Texto jurídico e claims no solado\n\nFrases legais longas prejudicam legibilidade. Versões curtas passam mais fácil por compliance.\n\nAlinhe marketing e jurídico cedo.`,
  (c) =>
    `## QR Code e integração digital\n\nSe usar QR, teste leitura em tamanho real. Evite poluir layout.\n\nDigital complementa; não substitui qualidade física.`,
  (c) =>
    `## Calendário cultural e picos de demanda\n\nDatas comemorativas movimentam fábricas. Antecipe pedidos.\n\nPicos encarecem urgência.`,
  (c) =>
    `## Treinamento de staff no salão\n\nEquipe precisa saber onde estão caixas e quando distribuir. Briefing interno reduz erro operacional.\n\nCerimonial coordena com fornecedores.`,
  (c) =>
    `## Segurança patrimonial da mesa\n\nVolumes grandes dificultam furto, mas organize entrega. Evite deixar mesa sem vigilância em momentos de transição.\n\nBoa logística protege investimento.`,
  (c) =>
    `## Pós-evento: aprendizado para o próximo\n\nMeça sobras. Ajuste percentuais. Dados simples vencem achismo.\n\nFeedback de convidados enriquece próxima compra.`,
  (c) =>
    `## Internacionalização e lembrança brasileira\n\n**Havaianas personalizadas** comunicam Brasil com autenticidade. Frete internacional aumenta custo.\n\nPlaneje prazos alfandegários se aplicável.`,
  (c) =>
    `## Duas línguas no mesmo layout\n\nEventos bilíngues pedem espaço. Valide área útil com fornecedor.\n\nPriorize legibilidade em ambas línguas.`,
  (c) =>
    `## Terceirização de design\n\nSe tem designer próprio, envie arquivos nos padrões técnicos pedidos. Fontes em curva evitam substituição indevida.\n\nAlinhe exportação com o estúdio.`,
  (c) =>
    `## Cor na tela versus cor na borracha\n\nExpectativa realista evita frustração. Prova digital aproxima resultado final.\n\nLuz ambiente altera percepção de cor nas fotos.`,
  (c) =>
    `## Política de cancelamento e remarcação\n\nImprevistos acontecem. Saiba se há crédito ou taxa. Documente combinação.\n\nTranquilidade financeira importa tanto quanto estética.`,
  (c) =>
    `## Pagamento: sinal, saldo e comprovantes\n\nGuarde comprovantes. E-mail com escopo funciona como registro informal útil.\n\nClareza reduz disputas.`,
  (c) =>
    `## Segunda remessa e reposição\n\nReposição parcial pode ter prazo diferente. Melhor sobrar folga no lote principal.\n\nPergunte política antes do evento.`,
  (c) =>
    `## Comparando fornecedores além do preço\n\nAtendimento, portfólio, clareza de processo e política de defeito pesam na decisão.\n\nPreço baixo sem escopo claro pode sair caro.`,
  (c) =>
    `## Métricas simples para empresas\n\nDivida custo total por peças entregues. Avalie recall em campanhas. **Brinde corporativo** eficaz é usado e lembrado.\n\nCombine com hashtag oficial.`,
  (c) =>
    `## Som, espaço e fluxo perto da mesa\n\nEvite gargalo ao lado de auto-falantes. Fluxo confortável melhora retirada.\n\nCerimonial ajusta roteiro.`,
  (c) =>
    `## Fotografia e horário de luz\n\nLuz muda ao longo do dia. Posicione mesa para registros oficiais.\n\nBoa luz valoriza **estampa no solado**.`,
  (c) =>
    `## Conteúdo complementar no site\n\nAlém de ${c.path}, use [serviços](/servicos/) para visão geral de produtos. [Contato](/contato/) reúne canais oficiais.\n\nNavegação clara ajuda conversão.`,
  (c) =>
    `## Síntese: ${c.focus} exige método\n\nMétodo reduz erro. **Havaianas personalizadas** são produto técnico e emocional ao mesmo tempo.\n\nCombine planejamento, arte e prazo.`,
  (c) =>
    `## FAQ adicional: detalhes operacionais\n\n**Posso misturar artes diferentes?** Pode encarecer. Pergunte impacto.\n\n**Embalagem personalizada?** Somam tempo e custo. Avalie retorno.`,
  (c) =>
    `### FAQ: transporte e armazenagem\n\n**Posso buscar no local?** Se disponível, pode economizar frete.\n\n**Armazenagem prolongada?** Negocie taxa e condições de umidade.`,
  (c) =>
    `### FAQ: crianças e adolescentes\n\n**Como dimensionar infantil?** Percentual conservador com base no perfil. Cerimonial ajuda.\n\n**Adolescentes?** Faixas específicas podem ser necessárias.`,
  (c) =>
    `## Planejamento financeiro e prioridades\n\nDefina teto para lembrança. Negocie dentro do teto com transparência.\n\nPriorize qualidade perceptível ao convidado.`,
  (c) =>
    `## Autoridade de tópico e experiência\n\nDemonstrar processo real aumenta confiança do leitor.\n\nEvite generalização vazia; dê passos concretos e exemplos aplicáveis.`,
  (c) =>
    `## Últimas recomendações antes do pedido\n\nRevise arte com calma. Confirme endereço. Alinhe data com fornecedor e salão.\n\nÚltima revisão evita arrependimento caro.`,
  (c) =>
    `## Chamada para ação: fale com a ${c.brand}\n\nUse o WhatsApp do site com data, quantidade e referências. Quanto mais preciso o pedido, mais precisa a resposta.\n\n**${c.brand}**: **Havaianas originais** e **estampa profissional no solado** para ${c.occasion}.`,
];

/** Continuação única (aprofunda sem repetir blocos anteriores). */
const T2 = [
  (c) =>
    `## Aprofundamento: ${c.focus2} na prática de quem produz eventos\n\nProdutores sabem que detalhe operacional vence discurso vazio. **Havaianas personalizadas** exigem calendário compartilhado com fornecedor, salão e transporte.\n\nRegistrar responsáveis por etapa reduz telefone na véspera.`,
  (c) =>
    `## Matriz de risco simples para ${c.audience}\n\nRisco um: atraso de arte. Risco dois: atraso de produção. Risco três: atraso de frete.\n\nMitigue com antecedência e margem de datas. Método e calendário compartilhado evitam dor de cabeça na véspera.`,
  (c) =>
    `## Comunicação com convidados antes da festa\n\nComunicar que haverá lembrança útil aumenta expectativa positiva. Não precisa revelar design completo; basta criar clima.\n\nExpectativa alinhada reduz críticas na retirada.`,
  (c) =>
    `## Integração com fornecedores de decoração\n\nPaleta do salão deve conversar com cor das tiras e com contraste da arte. Decoração e lembrança são fotografadas juntas.\n\nAlinhe referências visuais entre fornecedores.`,
  (c) =>
    `## Som e acessibilidade na retirada\n\nFilas longas prejudicam quem tem mobilidade reduzida. Prevê ponto de entrega alternativo ou prioridade discreta.\n\nAcessibilidade é sinal de cuidado.`,
  (c) =>
    `## Calor, piscina e uso pós-evento\n\nEventos com água pedem atenção a segurança, mas **chinelos personalizados** combinam com lazer.\n\nDestaque uso real nas conversas com fornecedor para ajustar acabamento.`,
  (c) =>
    `## Contraste em ambientes escuros\n\nFestas com pista escura precisam de arte legível sob luz dinâmica. Teste mentalmente leitura sob LED.\n\nFotógrafos agradecem hierarquia clara no solado.`,
  (c) =>
    `## Roteiro de distribuição em três atos\n\nAto um: chegada das caixas. Ato dois: montagem da mesa. Ato três: distribuição na pista.\n\nRoteiro escrito evita improviso caótico.`,
  (c) =>
    `## Mensuração de satisfação informal\n\nPergunte a amigos próximos após a festa se usaram a lembrança na semana seguinte.\n\nFeedback qualitativo orienta próximo pedido corporativo ou familiar.`,
  (c) =>
    `## Redes sociais e hashtags\n\nHashtag curta no solado pode funcionar se couber e for legível. Evite excesso de caracteres.\n\nCombine com campanha digital se for **brinde corporativo**.`,
  (c) =>
    `## Armazenagem em casa antes de levar ao salão\n\nAmbiente seco e sem carga pesada sobre caixas preserva embalagem. Umidade mancha papelão.\n\nPequeno cuidado evita mico na entrega.`,
  (c) =>
    `## Quando simplificar a mensagem no solado\n\nMensagem única forte vence três frases pequenas ilegíveis. **Chinelos personalizados** comunicam melhor com foco.\n\nSimplificar é estratégia, não preguiça.`,
  (c) =>
    `## Alinhamento com vídeo e vinheta\n\nSe houver vídeo institucional, ecoar elemento visual do vídeo na lembrança reforça memória.\n\nConsistência multimídia fortalece marca.`,
  (c) =>
    `## Briefing para fotógrafo sobre a mesa\n\nPeça registros amplos e detalhes da **estampa no solado**. Fotos alimentam site e redes.\n\nImagens reais sustentam autoridade de tópico online.`,
  (c) =>
    `## Contingência de última hora\n\nTenha contato salvo de responsável pelo pedido. Tenha cópia da arte aprovada offline.\n\nContingência reduz pânico.`,
  (c) =>
    `## Comparativo de fornecedores em três critérios\n\nCritério um: clareza. Critério dois: portfólio. Critério três: política de defeito.\n\nNota mental simples acelera decisão.`,
  (c) =>
    `## Impacto da cor das tiras em vídeo\n\nCores vibrantes saltam em vídeo; cores neutras elegem. Escolha coerente com identidade.\n\n${c.occasion} guia tom visual.`,
  (c) =>
    `## Inclusão de pessoas com alergias e materiais\n\nSe houver política de materiais hipoalergênicos, pergunte composição de insumos ao fornecedor.\n\nTransparência evita incidentes raros porém sérios.`,
  (c) =>
    `## Documentação para compras corporativas\n\nSolicite proposta em PDF com CNPJ, prazo e escopo. Facilita aprovação interna.\n\nCompras B2B valorizam rastreabilidade.`,
  (c) =>
    `## Reuso de arte em próximas campanhas\n\nEmpresas podem reaproveitar layout em temporadas seguintes com ajuste mínimo.\n\nEconomiza tempo de criação em **havaianas personalizadas** recorrentes.`,
  (c) =>
    `## Limites legais de uso de marca de terceiros\n\nPersonagens e marcas exigem licença. Fornecedor pode recusar arquivo sem direitos.\n\nEvite dor de cabeça jurídica.`,
  (c) =>
    `## Planejamento de estoque mínimo pós-evento\n\nSobras pequenas servem reposição ou presente a equipe. Defina destino antes.\n\nEvita caixas eternas no escritório.`,
  (c) =>
    `## Integração com lista de presentes\n\nAlguns casais combinam lembrança de pista com outras linhas de presente. Comunicação evita duplicidade.\n\nExperiência do convidado fica coerente.`,
  (c) =>
    `## Tom de voz da marca no texto do solado\n\nCorporativo costuma ser sóbrio. Casamento pode ser romântico. Festa de 15 pode ser lúdico dentro do legível.\n\nTom errado gera desconexão.`,
  (c) =>
    `## Leitura em diferentes tamanhos de tela\n\nTexto longo cansa no celular. **Parágrafos curtos** mantêm leitura até o fim.\n\nTítulos frequentes ajudam quem só escaneia a página.`,
  (c) =>
    `## Conclusão ampliada sobre ${c.focus2}\n\nVocê viu processo, riscos, FAQ e checklist. Agora falta executar: briefing, aprovação e produção.\n\n**${c.brand}** apoia ${c.audience} em ${c.occasion} com **Havaianas originais** e orientação técnica.`,
];

const T3 = [
  (c) =>
    `## Estudo de caso genérico: do “quero” ao “entregue”\n\nFase de ideia costuma ser empolgante. Fase de números exige disciplina. **Orçamento de havaianas personalizadas** fecha quando quantidade e prazo são reais.\n\nQuem pula fase de números paga caro depois.`,
  (c) =>
    `## Como ler uma proposta como profissional de eventos\n\nProcure modelo explícito, revisões, política de defeito e cronograma pós-aprovação. Se algo não está escrito, pergunte.\n\nSilêncio contratual vira ruído depois.`,
  (c) =>
    `## Mapa mental para ${c.audience}\n\nNó um: identidade visual. Nó dois: quantidade. Nó três: logística. Nó quatro: comunicação.\n\nMapa simples orienta reuniões com fornecedor.`,
  (c) =>
    `## Erro clássico: copiar layout de convite sem adaptar\n\nConvite é papel plano. Solado é borracha curva. Adaptação é obrigatória para boa **estampa**.\n\nDesigner de evento nem sempre domina limitações do calçado.`,
  (c) =>
    `## Quando vale padrinho VIP com arte diferenciada\n\nVolume menor com arte exclusiva cria hierarquia simbólica. Calcule impacto no orçamento.\n\nDetalhe pode valer a pena em narrativa familiar.`,
  (c) =>
    `## Uniformidade versus personalização unitária\n\nPersonalizar cada nome no par é caro. Personalizar lote único é eficiente.\n\nEscolha coerente com meta do evento.`,
  (c) =>
    `## Checklist de fotos para portfólio futuro\n\nFoto da mesa, foto da pista, foto do detalhe do solado, foto do casal ou CEO com o produto.\n\nBanco de imagens ajuda marketing nos meses seguintes.`,
  (c) =>
    `## Relação com fornecedor de buffet\n\nBuffet precisa saber se mesa de lembrança compete por espaço com estação de comida.\n\nLayout integrado evita atrito no dia.`,
  (c) =>
    `## Energia da equipe no pós-evento\n\nEquipe cansada comemora menos. Logística fluida melhora clima interno.\n\n**Lembrancinha** bem organizada reduz estresse.`,
  (c) =>
    `## Sazonalidade de preço de insumos\n\nInsumos variam ao longo do ano. Fornecedor pode repassar ou absorver parcialmente.\n\nPergunte se há janela melhor sem comprometer prazo.`,
  (c) =>
    `## Público local e compra à distância\n\nQuem pesquisa pode estar em outra cidade e fechar online. Clareza de prazo e frete evita frustração.\n\nResponda dúvidas logísticas com o mesmo cuidado da parte visual.`,
  (c) =>
    `## Evite keyword stuffing\n\nRepetir “**havaianas personalizadas**” em toda frase prejudica leitura. Varie com “chinelos com sola original”, “lembrança com estampa no solado”.\n\nNaturalidade vence robotização.`,
  (c) =>
    `## Meta título e meta descrição (contexto editorial)\n\nArtigos longos sustentam subtemas que página de produto nem sempre cobre. Use isso a seu favor no site.\n\nBlog apoia ranqueamento informativo.`,
  (c) =>
    `## Dados estruturados e leitura humana\n\nJSON-LD ajuda mecanismos de busca, mas conteúdo legível converte humanos.\n\nEquilíbrio é chave.`,
  (c) =>
    `## Próximo nível: pós-venda e recompra\n\nEmpresas satisfeitas recompram em aniversários corporativos. Casais indicam amigos.\n\nExperiência positiva fecha ciclo.`,
  (c) =>
    `## Fechamento editorial sobre ${c.focus}\n\nSe você chegou até aqui, tem método para decidir. Próximo passo é contato com informações completas.\n\n**${c.brand}** espera seu WhatsApp com data, quantidade e referências para ${c.occasion}.`,
];

const T4 = [
  (c) =>
    `## Micro-passos para quem ainda hesita\n\nPasso um: salve este artigo. Passo dois: liste dúvidas. Passo três: envie dúvidas no WhatsApp com data e cidade.\n\nMicro-passos reduzem paralisia.`,
  (c) =>
    `## Versões de arte: controle de revisão\n\nNomeie arquivos com data. Evite “final”, “final2”, “final_definitivo”. Controle de versão profissional evita erro.\n\nConfusão de arquivo custa dinheiro.`,
  (c) =>
    `## Sinalização na mesa: texto curto\n\nPlaca pequena com instrução clara acelera retirada. “Escolha seu número” funciona melhor que texto longo.\n\nFluxo importa tanto quanto design.`,
  (c) =>
    `## Integração com cronograma do cerimonial\n\nInserir distribuição no roteiro oficial alinha fotógrafo, DJ e equipe. Momento certo evita tumulto.\n\nCerimonial é aliado.`,
  (c) =>
    `## Lembrança como extensão da identidade do casal ou da marca\n\nCoerência com valores percebidos aumenta aceitação. Disconnect gera estranheza.\n\n${c.focus2} precisa soar autêntico.`,
  (c) =>
    `## Perguntas para fazer ao fornecedor antes do sinal\n\nPergunte prazo pós-aprovação. Pergunte política de defeito. Pergunte o que não está incluso.\n\nTrês perguntas evitam surpresa.`,
  (c) =>
    `## Fechamento sobre ${c.focus2}\n\nConteúdo longo vale quando organiza decisão. Este guia juntou processo, riscos e checklist.\n\nPróximo passo: transformar leitura em orçamento com informações completas no WhatsApp da **${c.brand}**.`,
];

const T5 = [
  (c) =>
    `## Síntese: conteúdo útil e próximo passo no site\n\nEste artigo contextualiza ${c.focus}. Para detalhes comerciais e linhas, use ${c.path} e a página de [serviços](/servicos/).\n\nBlog e página de produto se complementam: um explica, outro concentra oferta.`,
  (c) =>
    `## Mais páginas úteis\n\nVisite [sobre](/sobre/) para conhecer a **${c.brand}** e [contato](/contato/) para canais oficiais.\n\nBoa navegação interna ajuda a achar o que falta após a leitura.`,
  (c) =>
    `## Encerramento\n\n**Havaianas personalizadas** bem planejadas reduzem imprevisto e valorizam ${c.occasion}.\n\nFale com a **${c.brand}** pelo WhatsApp do site com data, quantidade e referências visuais.`,
];

/** Slugs com Markdown manual — este script não sobrescreve. */
export const SKIP_MANUAL = new Set([
  'quanto-custa-havaianas-personalizadas',
  'como-fazer-havaianas-personalizadas',
  'havaianas-personalizadas-precos-modelos-onde-comprar',
  'vale-a-pena-havaianas-em-casamento',
]);

const articles = [
  {
    slug: 'melhor-estampa-chinelos-personalizados',
    focus: 'a melhor estampa para chinelos personalizados',
    focus2: 'estampa em chinelos personalizados',
    audience: 'quem cuida da identidade visual',
    occasion: 'o projeto gráfico',
    linkPhrase: 'Combine estampa com linha de produtos',
    path: '[serviços](/servicos/)',
  },
  {
    slug: 'havaianas-personalizadas-vs-chinelos-comuns',
    focus: 'havaianas personalizadas versus chinelos comuns',
    focus2: 'havaianas personalizadas vs chinelos comuns',
    audience: 'compradores que comparam qualidade',
    occasion: 'a escolha do calçado base',
    linkPhrase: 'Conheça opções com sola original',
    path: '[havaianas personalizadas no portfólio](/servicos/)',
  },
  {
    slug: 'havaianas-ou-sandalias-personalizadas',
    focus: 'havaianas ou sandálias personalizadas',
    focus2: 'havaianas ou sandálias personalizadas',
    audience: 'organizadores de eventos',
    occasion: 'a decisão entre modelos',
    linkPhrase: 'Veja linhas para festas e debut',
    path: '[festa de 15 anos](/produtos/festa-15-anos/)',
  },
  {
    slug: 'havaianas-personalizadas-casamento-ideias-precos-dicas',
    focus: 'havaianas personalizadas para casamento: ideias, preços e dicas',
    focus2: 'havaianas personalizadas para casamento',
    audience: 'noivos',
    occasion: 'o grande dia',
    linkPhrase: 'Página dedicada ao casamento',
    path: '[casamento](/produtos/casamento/)',
  },
  {
    slug: 'havaianas-personalizadas-festa-15-anos-ideias-precos-dicas',
    focus: 'havaianas personalizadas para festa de 15 anos',
    focus2: 'havaianas para festa de 15 anos',
    audience: 'famílias e debutantes',
    occasion: 'a festa de 15 anos',
    linkPhrase: 'Linha festa de 15 anos',
    path: '[15 anos](/produtos/festa-15-anos/)',
  },
  {
    slug: 'havaianas-personalizadas-empresas-brinde-criativo-barato',
    focus: 'havaianas personalizadas para empresas',
    focus2: 'brinde corporativo com havaianas',
    audience: 'marketing e compras B2B',
    occasion: 'campanhas e eventos corporativos',
    linkPhrase: 'Soluções corporativas',
    path: '[eventos corporativos](/produtos/eventos-corporativos/)',
  },
  {
    slug: 'havaianas-personalizadas-eventos-melhor-lembrancinha',
    focus: 'havaianas personalizadas para eventos',
    focus2: 'melhor lembrancinha para eventos',
    audience: 'produtores e anfitriões',
    occasion: 'diversos formatos de evento',
    linkPhrase: 'Explore produtos para eventos',
    path: '[serviços](/servicos/)',
  },
  {
    slug: 'havaianas-personalizadas-guia-completo-casamento-eventos',
    focus: 'guia completo de havaianas personalizadas',
    focus2: 'guia de havaianas para casamento e eventos',
    audience: 'noivos e produtores',
    occasion: 'casamento e outros eventos',
    linkPhrase: 'Casamento e formatura',
    path: '[casamento](/produtos/casamento/) e [formatura](/produtos/formatura/)',
  },
  {
    slug: 'havaianas-personalizadas-tudo-o-que-precisa-saber',
    focus: 'tudo sobre havaianas personalizadas',
    focus2: 'havaianas personalizadas',
    audience: 'iniciantes e curiosos',
    occasion: 'sua primeira compra',
    linkPhrase: 'Aprofunde por linha',
    path: '[serviços](/servicos/)',
  },
];

function buildMarkdown(cfg) {
  const ctx = {
    brand: 'Chinelos da Bela',
    focus: cfg.focus,
    focus2: cfg.focus2,
    audience: cfg.audience,
    occasion: cfg.occasion,
    linkPhrase: cfg.linkPhrase,
    path: cfg.path,
    verb: 'planejar',
  };
  let md = '';
  for (const fn of [...T, ...T2, ...T3, ...T4, ...T5]) {
    md += fn(ctx);
    md += '\n\n';
  }
  return md.trim() + '\n';
}

fs.mkdirSync(outDir, { recursive: true });

for (const a of articles) {
  if (SKIP_MANUAL.has(a.slug)) continue;
  const md = buildMarkdown(a);
  const w = countWords(md);
  const outPath = path.join(outDir, `${a.slug}.md`);
  fs.writeFileSync(outPath, md, 'utf8');
  console.log(w, a.slug);
}
