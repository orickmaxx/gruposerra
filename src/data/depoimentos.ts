/**
 * Depoimentos REAIS do Google, raspados dos 9 links que o dono mandou em
 * 03/09/2026, com Chrome de verdade (o Maps so monta a review com JS).
 *
 * Nome, foto, nota, data e texto sao do proprio Google, na integra, sem corte
 * e sem correcao de portugues: mexer no texto de um depoimento e falsifica-lo.
 * A foto veio da mesma URL que o Maps serve, pedida em 200px.
 *
 * ATENCAO ANTES DE IR AO AR: confirmar com o Grupo Serra que ha autorizacao
 * para exibir nome e foto dessas pessoas fora do Google. Sao avaliacoes
 * publicas, mas republicar em site comercial e outro uso. O campo `link`
 * guarda a origem de cada uma para conferencia.
 *
 * Varios citam colaboradores pelo nome: Robson, Anderson, Rosemeire, Thalia,
 * Jessica, Marli, Luciana, William, Julio, John, Patricia, Gabriel, Amaury,
 * Marcio. E o ativo mais dificil de copiar que essa empresa tem.
 */

export type Depoimento = {
  slug: string;
  autor: string;
  foto: string;
  estrelas: number;
  data: string;
  texto: string;
  link: string;
};

export const DEPOIMENTOS: Depoimento[] = [
  {
    slug: "carla-paraizo",
    autor: "Carla Paraizo",
    foto: "/depoimentos/carla-paraizo.jpg",
    estrelas: 5,
    data: "11 meses atrás",
    texto:
      "Hoje eu e minha mãe tivemos uma experiência muito agradável no atendimento na Unidade de Campinas. A atendente Rosemeire de Carvalho, foi muito gentil, paciente, acolhedora e educada conosco. Esclareceu com confiança e conhecimento nossas dúvidas. Muito bom ser atendida com tanta gentileza! Parabéns Rose! Deus te ilumine sempre, com graça e sabedoria! Coração agradecido!",
    link: "https://share.google/6chchMJA5A7Azl0hZ",
  },
  {
    slug: "roberto-guimaraes",
    autor: "Roberto Guimarães",
    foto: "/depoimentos/roberto-guimaraes.jpg",
    estrelas: 5,
    data: "um mês atrás",
    texto:
      "Na hora mais difícil, a gente conhece um amigo. O Sr Robson nos atendeu de maneira excepcional. Educado, atencioso, prestativo. Nos deu todas as informações e explicações necessárias. Atendimento eficaz e cortês. Lugar limpo e organizado. Excelente atendimento de todos. Nada a reclamar, só elogios. Fomos muito bem atendidos. Obrigado",
    link: "https://share.google/OXCQohZsGEtP5rMYr",
  },
  {
    slug: "daniele-hafliger",
    autor: "Daniele Hafliger",
    foto: "/depoimentos/daniele-hafliger.jpg",
    estrelas: 5,
    data: "2 meses atrás",
    texto:
      "Só tenho a agradecer a agilidade e profissionalismo das agentes Jéssica, que estava atendendo outro cliente, e prontamente entrou em contato com outra agente para me atender, na hora em que eu precisava buscar funerária na \"sala da família \" da Unicamp, para enterrar minha mãe. Eu só queria conseguir fazer o enterro no mesmo dia e em outra cidade. E a Thalia, com toda a expertise e delicadeza, conseguiu. Chegamos em Limeira às 16:20 e o enterro foi às 16:30. O valor também foi o melhor das cotadas naquela mesma hora. Indico para quem precisar. Essa ótima qualidade de serviços prestados foi da unidade de Valinhos. Nota 10 em tudo!!!",
    link: "https://share.google/5eQ8oPyIdJVShQB91",
  },
  {
    slug: "thais-bigoli",
    autor: "Thaís Bigoli",
    foto: "/depoimentos/thais-bigoli.jpg",
    estrelas: 5,
    data: "um mês atrás",
    texto:
      "Muito bom, o profissional Robson é eficaz no atendimento teve paciência e explicou com detalhes de forma profissional e com muita calma e paciência.",
    link: "https://share.google/tIYsJ5zn3FKjrYGPM",
  },
  {
    slug: "jonathan-ciribelli",
    autor: "Jonathan Ciribelli",
    foto: "/depoimentos/jonathan-ciribelli.jpg",
    estrelas: 5,
    data: "2 meses atrás",
    texto:
      "Quero agradecer ao Grupo Serra que nos suportou em todo o processo que passamos. Agradeço a Marli, Luciana, Anderson e William por todo o apoio neste tempo. Que Deus abençoe a cada um de vocês 🤍",
    link: "https://share.google/UhYuQsVJlaB37Weqv",
  },
  {
    slug: "rose-soares",
    autor: "Rose Soares",
    foto: "/depoimentos/rose-soares.jpg",
    estrelas: 5,
    data: "um mês atrás",
    texto:
      "Quer o deixar aqui o meu agradecimento ao Anderson e o toda equipe pelo excelente atendimento e cuidados prestados em momentos mais frágeis o meu muito obrigado e Deus abençoe a todos 🙏",
    link: "https://share.google/YlC03gTgr8exItC3w",
  },
  {
    slug: "renato-filho",
    autor: "Renato Filho",
    foto: "/depoimentos/renato-filho.jpg",
    estrelas: 5,
    data: "3 meses atrás",
    texto:
      "Boa tarde. O meu profundo agradecimento pela atenção e dedicação dos profissionais prestados a minha mãe (Wanda Apparecida Geribello Camargo) nos dias 25/26 de Abril, entre os quais, Patricia, Gabriel, Amaury e Marcio.Obrigado. Atenciosamente Renato G. Camargo Filho",
    link: "https://share.google/r8vunSoBr6griDJur",
  },
  {
    slug: "ana-emilia",
    autor: "Ana Emilia",
    foto: "/depoimentos/ana-emilia.jpg",
    estrelas: 5,
    data: "10 meses atrás",
    texto:
      "Venho agradecer , que Deus abençoe abundantemente a Vida do agente funerário Robison. Que em minha perca inestimável da minha filha de 5 aninhos, ele tratou a nós com muito amor e carinho, em seu trabalho com muita dedicação. Me deixou, um presente, o cabelinho, palavras de conforto. A ultima recordação de minha filha muito bem tratada. Pelo Robison, que Deus o abençoou com um bebê. Assim diz o Senhor \" os filhos que Deus nos dá para cuidar, pertence a Deus.\" Salmo 127:3. Meus muito obrigada pelos funcionários da funerária Sera, que me trataram muito bem.",
    link: "https://share.google/7oNgBIPyatuMvWW2T",
  },
  {
    slug: "fatima-souza",
    autor: "Fatima Souza",
    foto: "/depoimentos/fatima-souza.jpg",
    estrelas: 5,
    data: "2 anos atrás",
    texto:
      "Perdemos nossa mãe recentemente e apesar de todo o sofrimento nesse momento, encontramos conforto pelo atendimento excepcional de todos do Grupo Serra, em especial ao Julio que nos ajudou com todos os trâmites, com o John que nos atendeu no Memorial e a todos que tiveram um respeito muito grande. Ficamos impressionados e muito satisfeitos apesar de toda a tristeza.",
    link: "https://share.google/b2jPrkpVdv4bbfFoJ",
  },
];

/** Nota media publica da matriz no Google, conferida em 02/09/2026. */
export const GOOGLE = { nota: 4.1, escala: 5 } as const;
