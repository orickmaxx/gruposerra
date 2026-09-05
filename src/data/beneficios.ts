/**
 * Clube de Benefícios.
 *
 * Origem dos dados: a API pública do próprio clube do cliente,
 * `api.uppo.com.br/gruposerra/public/benefits`, lida em 04/09/2026 nas 8
 * páginas do catálogo. São **96 benefícios ativos**.
 *
 * Por que isso importa: a leitura anterior parou no HTML e concluiu, errado,
 * que "a página não lista os parceiros". Lista, e a lista é o melhor argumento
 * de venda do clube, porque os parceiros são marcas que qualquer família da
 * região reconhece: Cinemark, Beto Carrero, Leroy Merlin, Casas Bahia, USP,
 * Mackenzie, Shell, Natura, Domino's. Uma pílula escrita "Gastronomia" não
 * vende nada; o logotipo do Domino's vende.
 *
 * Os logotipos em `public/parceiros/` vieram do CDN do próprio clube.
 *
 * A home mostra TRÊS categorias com três parceiros cada, com logotipo, e manda
 * para o catálogo completo. Não tenta reproduzir 96 ofertas que mudam sozinhas.
 */

export const BENEFICIOS_URL = "https://beneficios.gruposerra.com.br/";

/** Categorias do catálogo, como o próprio clube nomeia. */
export const CATEGORIAS = [
  "Bem-estar e saúde",
  "Educação",
  "Gastronomia",
  "Infantil",
  "Lazer e cultura",
  "Produtos e serviços",
  "Viagens",
  "Datas especiais",
  "Moda",
] as const;

/** Benefícios ativos no catálogo, contados na API em 04/09/2026. */
export const TOTAL_BENEFICIOS = 96;

export type Parceiro = {
  nome: string;
  oferta: string;
  logo: string;
};

export type Vitrine = {
  slug: string;
  titulo: string;
  resumo: string;
  url: string;
  parceiros: Parceiro[];
};

/**
 * As três vitrines da home.
 *
 * Escolhidas por RECONHECIMENTO, não por tamanho de categoria: o que faz a
 * pessoa entender o clube em dois segundos é ver uma marca que ela já usa.
 */
export const VITRINES: Vitrine[] = [
  {
    slug: "lazer",
    titulo: "Lazer e cultura",
    resumo: "Cinema, parque e ingresso com desconto o ano inteiro.",
    url: `${BENEFICIOS_URL}?page=1&category=lazer-e-cultura`,
    parceiros: [
      { nome: "Cinemark", oferta: "Ingressos com preços especiais", logo: "/parceiros/cinemark.png" },
      { nome: "Cinépolis", oferta: "Ingressos por R$ 25,90", logo: "/parceiros/cinepolis.png" },
      { nome: "Beto Carrero", oferta: "10% OFF em ingressos", logo: "/parceiros/beto-carrero.png" },
    ],
  },
  {
    slug: "casa",
    titulo: "Casa e compras",
    resumo: "Obra, reforma e eletrodoméstico, que é onde o desconto pesa.",
    url: `${BENEFICIOS_URL}?page=1&category=casa`,
    parceiros: [
      { nome: "Leroy Merlin", oferta: "10% OFF na sua obra", logo: "/parceiros/leroy-merlin.png" },
      { nome: "Casas Bahia", oferta: "Desconto para renovar a casa", logo: "/parceiros/casas-bahia.png" },
      { nome: "LG", oferta: "Até 20% OFF em produtos LG", logo: "/parceiros/lg.png" },
    ],
  },
  {
    slug: "educacao",
    titulo: "Educação",
    resumo: "Graduação, pós e curso livre para a família toda.",
    url: `${BENEFICIOS_URL}?page=1&category=educacao`,
    parceiros: [
      { nome: "USP", oferta: "Até 15% OFF no MBA USP EACH", logo: "/parceiros/usp.png" },
      { nome: "Mackenzie", oferta: "Até 30% OFF no Mackenzie", logo: "/parceiros/mackenzie.png" },
      { nome: "Descomplica", oferta: "20% OFF no preparatório do ENEM", logo: "/parceiros/descomplica.png" },
    ],
  },
];

/** Marcas extras para a esteira, só logotipo, sem oferta. */
export const MARCAS_PARCEIRAS = [
  { nome: "Shell", logo: "/parceiros/shell.png" },
  { nome: "Natura", logo: "/parceiros/natura.png" },
  { nome: "Domino's Pizza", logo: "/parceiros/domino-s-pizza.png" },
  { nome: "Netshoes", logo: "/parceiros/netshoes.png" },
  { nome: "Movida", logo: "/parceiros/movida-rent-a-car.png" },
  { nome: "Vivara", logo: "/parceiros/vivara.png" },
  { nome: "Espaçolaser", logo: "/parceiros/espacolaser.png" },
];
