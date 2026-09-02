/**
 * Conteúdo editorial.
 *
 * O Florees tem três artigos completos e é o que traz busca orgânica nesse setor
 * o ano inteiro: quem procura "fases do luto" ou "o que fazer quando alguém
 * morre" não está comprando nada naquele instante, mas volta.
 *
 * ⛔ Nada aqui inventa fato sobre o Grupo Serra, e nada aqui é conselho médico,
 * jurídico ou psicológico. Onde o texto toca em direito ou saúde, ele manda
 * procurar quem é da área. Um artigo sobre luto escrito com leviandade fere
 * gente de verdade.
 */

export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  atualizado: string;
  minutos: number;
  categoria: string;
  blocos: ({ t: "p"; texto: string } | { t: "h"; texto: string } | { t: "lista"; itens: string[] })[];
};

export const ARTIGOS: Artigo[] = [
  {
    slug: "o-que-fazer-quando-alguem-morre-em-casa",
    titulo: "O que fazer quando alguém morre em casa",
    resumo:
      "A ordem prática das primeiras horas, o que não pode ser feito antes da declaração de óbito e quem chamar em cada situação.",
    atualizado: "2026-09-02",
    minutos: 6,
    categoria: "Prático",
    blocos: [
      {
        t: "p",
        texto:
          "É a pergunta que mais chega ao plantão de madrugada, e quase sempre de alguém que nunca passou por isso. Esta é a ordem prática, em português claro.",
      },
      { t: "h", texto: "Antes de qualquer coisa: não mova o corpo" },
      {
        t: "p",
        texto:
          "A pessoa precisa ser vista por um médico ou pela autoridade competente antes de ser removida. Mudar o corpo de lugar, trocar a roupa ou limpar o ambiente pode atrapalhar a emissão da declaração de óbito e, em casos de morte sem causa conhecida, pode transformar um processo simples em um caso para o IML.",
      },
      { t: "h", texto: "Quem emite a declaração de óbito" },
      {
        t: "lista",
        itens: [
          "Morte em hospital: o próprio hospital emite.",
          "Morte em casa com doença já acompanhada: o médico que acompanhava pode emitir; na falta dele, o Serviço de Verificação de Óbito (SVO).",
          "Morte em casa sem causa conhecida, ou morte violenta, acidental ou suspeita: aciona-se a polícia, e o caso vai ao IML. Nesse caso a remoção é feita pelo Estado, não pela funerária.",
        ],
      },
      { t: "h", texto: "Quando chamar a funerária" },
      {
        t: "p",
        texto:
          "Assim que houver a declaração de óbito, ou quando você não souber a quem recorrer. Se a família tem plano, a ligação para a funerária pode ser a primeira: a equipe orienta o que fazer e aciona quem for necessário, inclusive em caso de morte que precise passar pelo IML.",
      },
      {
        t: "p",
        texto:
          "Você não precisa ter documento em mãos para essa ligação. Basta o nome de quem faleceu e onde a pessoa está.",
      },
      { t: "h", texto: "Os documentos que vão ser pedidos" },
      {
        t: "lista",
        itens: [
          "Documento de identidade e CPF de quem faleceu",
          "Certidão de nascimento ou de casamento",
          "Comprovante de endereço",
          "Declaração de óbito emitida pelo médico",
          "Documento de quem vai assinar como responsável",
        ],
      },
      {
        t: "p",
        texto:
          "Se faltar alguma coisa, avise a equipe. Falta de documento raramente impede o velório, mas atrasa o registro em cartório, e é melhor resolver isso antes.",
      },
      { t: "h", texto: "O que ninguém avisa" },
      {
        t: "p",
        texto:
          "As primeiras seis horas concentram muitas decisões e nenhuma delas devia ser tomada por quem acabou de perder alguém. É exatamente por isso que existe plano funerário contratado antes: não é para economizar, é para que essas decisões já estejam tomadas.",
      },
      {
        t: "p",
        texto:
          "Este texto é informativo e não substitui orientação jurídica ou médica. Regras podem mudar conforme o município.",
      },
    ],
  },
  {
    slug: "as-fases-do-luto",
    titulo: "As fases do luto, e por que elas não vêm em ordem",
    resumo:
      "Negação, raiva, negociação, depressão e aceitação são um mapa, não um cronograma. O que esperar de si mesmo e quando procurar ajuda.",
    atualizado: "2026-09-02",
    minutos: 7,
    categoria: "Acolhimento",
    blocos: [
      {
        t: "p",
        texto:
          "O modelo das cinco fases, descrito por Elisabeth Kübler-Ross em 1969, virou senso comum, e com ele veio um mal-entendido: muita gente acha que existe uma ordem certa e um prazo para terminar. Não existe.",
      },
      { t: "h", texto: "As cinco, sem a promessa de sequência" },
      {
        t: "lista",
        itens: [
          "Negação: a sensação de irrealidade, de que houve um engano. É o que segura a pessoa de pé nas primeiras horas.",
          "Raiva: contra o médico, contra a família, contra a própria pessoa que morreu, contra si. É normal e costuma assustar quem sente.",
          "Negociação: os \"e se\", os \"se eu tivesse\". A tentativa de encontrar um ponto onde a perda poderia ter sido evitada.",
          "Tristeza profunda: quando o tamanho real da falta aparece. É a fase mais confundida com depressão clínica, e são coisas diferentes.",
          "Aceitação: não é ficar bem, nem parar de sentir falta. É a vida voltar a caber ao lado da ausência.",
        ],
      },
      { t: "h", texto: "Elas se misturam, voltam e pulam" },
      {
        t: "p",
        texto:
          "Uma pessoa pode acordar em aceitação e almoçar em raiva. Datas, cheiros, uma música no rádio: qualquer coisa reabre uma fase que parecia encerrada. Isso não é retrocesso, é como o luto funciona.",
      },
      { t: "h", texto: "O que ajuda de verdade" },
      {
        t: "lista",
        itens: [
          "Rotina mínima: dormir, comer e beber água, mesmo sem vontade.",
          "Falar sobre a pessoa, e falar o nome dela. Evitar o assunto para \"não fazer sofrer\" costuma isolar mais.",
          "Aceitar ajuda concreta: alguém que resolva a papelada, alguém que leve comida.",
          "Adiar decisões grandes: vender a casa, mudar de cidade, desfazer-se das coisas dela. Não há pressa.",
        ],
      },
      { t: "h", texto: "Quando procurar ajuda profissional" },
      {
        t: "p",
        texto:
          "Procure um psicólogo ou psiquiatra se houver perda de funcionamento por semanas seguidas, uso crescente de álcool ou remédio, ou qualquer pensamento de tirar a própria vida. Nesse último caso, o CVV atende de graça, 24 horas, pelo 188.",
      },
      {
        t: "p",
        texto:
          "Este texto é informativo e não substitui acompanhamento psicológico ou médico.",
      },
    ],
  },
  {
    slug: "por-que-contratar-plano-funerario-antes",
    titulo: "Por que se contrata plano funerário antes, e não na hora",
    resumo:
      "O que muda no preço, na papelada e na cabeça da família quando a decisão já está tomada. E as perguntas que você deve fazer antes de assinar.",
    atualizado: "2026-09-02",
    minutos: 6,
    categoria: "Planejamento",
    blocos: [
      {
        t: "p",
        texto:
          "Ninguém acorda com vontade de pensar nisso. Mas quem já passou pela outra situação, a de decidir tudo em quatro horas, com a família chorando ao lado, costuma dizer a mesma frase: eu queria ter resolvido antes.",
      },
      { t: "h", texto: "O que muda no dinheiro" },
      {
        t: "p",
        texto:
          "Contratado antes, o custo vira mensalidade e some no orçamento. Contratado na hora, vira desembolso único, num mês em que a família já perdeu renda, já gastou com hospital e não está em condição de comparar preço. É o pior momento possível para negociar qualquer coisa.",
      },
      { t: "h", texto: "O que muda na papelada" },
      {
        t: "p",
        texto:
          "Com plano, a certidão de óbito, as autorizações e a orientação jurídica já fazem parte do serviço. Sem plano, alguém da família vai passar o dia seguinte em cartório, e essa pessoa costuma ser justamente a que estava mais próxima de quem morreu.",
      },
      { t: "h", texto: "O que muda na cabeça de quem fica" },
      {
        t: "p",
        texto:
          "Esta é a parte que não aparece em tabela. Quando as escolhas já foram feitas, ninguém precisa adivinhar o que a pessoa ia querer, e ninguém carrega a dúvida de ter escolhido errado. Planejar é poupar a família de decidir.",
      },
      { t: "h", texto: "Pergunte isto antes de assinar, em qualquer empresa" },
      {
        t: "lista",
        itens: [
          "Qual é a carência, e ela vale para todas as coberturas?",
          "Existe idade limite para entrar? E para permanecer?",
          "Como e quando o valor é reajustado?",
          "Quem exatamente está coberto, e o que acontece se eu quiser incluir mais alguém depois?",
          "O que NÃO está incluso, e quanto custaria à parte?",
          "A empresa tem estrutura própria ou terceiriza? Em quais cidades?",
          "Se eu me mudar de estado, o que acontece com o contrato?",
        ],
      },
      {
        t: "p",
        texto:
          "Peça tudo por escrito. Contrato de plano de assistência funerária é regido pela Lei Federal nº 13.261/2016, e você tem direito à informação clara antes de assinar.",
      },
    ],
  },
];

export const artigoPor = (slug: string) => ARTIGOS.find((a) => a.slug === slug);
