/**
 * Planos e cobertura.
 *
 * Precos conferidos na LP do cliente (serra-planos.gruposerra.com.br) em
 * 02/09/2026. Todos sao "a partir de", mensais.
 *
 * ⚠ CARENCIA, LIMITE DE IDADE E REAJUSTE NAO EXISTEM EM LUGAR NENHUM do
 * material do cliente. Todo plano funerario tem. Enquanto a resposta nao vier,
 * a interface reserva o espaco e declara a lacuna em vez de escrever numero
 * chutado: omitir carencia em pagina de venda e problema de Procon.
 * Ver CLAUDE.md secao 12, pergunta 2.
 */

export type Plano = {
  slug: string;
  nome: string;
  preco?: number;
  chamada: string;
  descricao: string;
  destaques: string[];
  destaque?: boolean;
};

export const PLANOS: Plano[] = [
  {
    slug: "serra-essencial",
    nome: "Serra Essencial",
    preco: 18.9,
    chamada: "O plano que se monta do seu jeito",
    descricao:
      "Personalizável na cobertura e em quem entra. Aceita até 10 dependentes adicionais, então cabe família grande sem virar vários contratos.",
    destaques: [
      "Até 10 dependentes adicionais",
      "Cobertura escolhida item a item",
      "Assistência 24 horas",
    ],
  },
  {
    slug: "serra-perola",
    nome: "Serra Pérola",
    preco: 97.9,
    chamada: "O meio-termo que a maioria escolhe",
    descricao:
      "Pensado para proteger a família inteira sem que ninguém precise decidir nada no pior dia. Cônjuge, filhos, pais e sogros entram no mesmo contrato.",
    destaques: [
      "Cônjuge, filhos, pais e sogros",
      "Cobertura nacional",
      "Assistência 24 horas",
    ],
    destaque: true,
  },
  {
    slug: "serra-total",
    nome: "Serra Total",
    preco: 132.9,
    chamada: "Cobertura sem lacuna",
    descricao:
      "A faixa mais completa do Grupo Serra, para quem não quer que sobre nenhuma pergunta em aberto na hora de usar.",
    destaques: [
      "A cobertura mais ampla da casa",
      "Cremação contratável dentro do plano",
      "Assistência 24 horas",
    ],
  },
];

export const PLANOS_ESPECIAIS = [
  {
    slug: "plano-empresarial",
    nome: "Plano Empresarial",
    descricao:
      "Cobertura para os colaboradores da sua empresa e para as famílias deles. O preço depende do tamanho do time, então sai por proposta.",
  },
  {
    slug: "serra-pet",
    nome: "Serra Pet",
    descricao:
      "Até 3 pets no mesmo plano, com remoção 24 horas na região de Campinas, cremação individual ou coletiva e certificado.",
  },
];

/**
 * Os 20 itens que o plano inclui.
 *
 * Esta lista estava ENTERRADA num comentario HTML na home do cliente, ou seja,
 * quem visita o site nao ve o que compra. E o argumento de venda mais forte da
 * empresa. Trazer de volta e o item 4 do briefing (CLAUDE.md secao 10.2).
 */
export const INCLUSOS: { item: string; nota?: string }[] = [
  { item: "Urna mortuária" },
  { item: "Sala de velório" },
  { item: "Paramentação" },
  { item: "Coroa de flores" },
  { item: "Certidão de óbito" },
  { item: "Transporte", nota: "gratuito até 100 km" },
  { item: "Carro assistencial" },
  { item: "Velas" },
  { item: "Véu" },
  { item: "Encomendação" },
  { item: "Kit café" },
  { item: "Terços" },
  { item: "Ornamentação" },
  { item: "Cerimonial" },
  { item: "Músicos" },
  { item: "Tanatopraxia" },
  { item: "Assistência local" },
  { item: "Assistência ao luto" },
  { item: "Orientação jurídica" },
  { item: "Crematório", nota: "próprio, em Hortolândia" },
];

export const FAQ = [
  {
    p: "O que eu faço na hora que acontece?",
    r: "Liga para (19) 3775-9752 ou (19) 3234-9752, a qualquer hora, todo dia. Alguém atende e conduz o resto. Você não precisa saber de nada nem ter documento em mãos para fazer essa ligação.",
  },
  {
    p: "Como funciona o plano?",
    r: "Você escolhe a cobertura que faz sentido para a sua família e paga uma mensalidade. Assistência 24 horas e traslado estão em todos os planos, sem exceção. Quando precisar, é uma ligação e nada de conta para acertar naquele momento.",
  },
  {
    p: "Quem eu posso incluir?",
    r: "Cônjuge, filhos, pais e sogros. O Serra Essencial ainda aceita até 10 dependentes adicionais, então dá para montar em volta de uma família grande.",
  },
  {
    p: "Dá para mudar de plano depois?",
    r: "Dá. Para mais cobertura ou para menos. É só falar com a equipe de uma das 8 unidades.",
  },
  {
    p: "A cremação está inclusa?",
    r: "A cremação é contratada como serviço adicional dentro do plano, e pode valer para todas as pessoas do contrato ou só para quem quiser, respeitando a vontade de cada um. O crematório é do próprio grupo, no Complexo Memorial Hortolândia.",
  },
  {
    p: "Qual a diferença entre a cremação individual e a coletiva do Serra Pet?",
    r: "Na individual, o pet é cremado sozinho e as cinzas voltam para você em urna cinerária padrão. Na coletiva, a cremação é feita junto com outros pets e as cinzas ficam em um espaço ecológico, sem devolução.",
  },
];
