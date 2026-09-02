/**
 * Clube de Benefícios.
 *
 * Dados raspados do proprio clube do cliente (beneficios.gruposerra.com.br) em
 * 02/09/2026, com Chrome de verdade: a pagina monta o catalogo por JS, entao
 * fetch simples volta uma casca vazia e foi assim que a primeira leitura
 * concluiu, errado, que "nao existe lista de parceiros".
 *
 * Existe: 9 categorias e 42 paginas de parceiros. O que entra aqui e uma
 * AMOSTRA para a home, com o desconto exatamente como o clube anuncia. O site
 * nao tenta reproduzir o catalogo inteiro: manda para o clube, que e onde ele
 * vive e onde ele se atualiza sozinho.
 */

export const BENEFICIOS_URL = "https://beneficios.gruposerra.com.br/";

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

/** Paginas de parceiros no catalogo do clube, contadas na paginacao. */
export const PAGINAS_DE_PARCEIROS = 42;

export type Parceiro = {
  nome: string;
  oferta: string;
  categoria: (typeof CATEGORIAS)[number];
};

export const PARCEIROS: Parceiro[] = [
  { nome: "Shell", oferta: "R$ 10,00 OFF para abastecer", categoria: "Produtos e serviços" },
  { nome: "Vigilantes do Peso", oferta: "Até 60% OFF", categoria: "Bem-estar e saúde" },
  { nome: "Espaçolaser", oferta: "Desconto para conhecer", categoria: "Bem-estar e saúde" },
  { nome: "Zattini", oferta: "50% OFF + 20% da parceria", categoria: "Moda" },
  { nome: "Olympikus", oferta: "15% OFF", categoria: "Moda" },
  { nome: "Morana", oferta: "17% OFF extra", categoria: "Moda" },
  { nome: "Evino", oferta: "R$ 50 em compras acima de R$ 350", categoria: "Gastronomia" },
  { nome: "Museu de Cera", oferta: "Até 30% OFF no ingresso", categoria: "Lazer e cultura" },
  { nome: "Thermas da Mata", oferta: "15% OFF na hospedagem", categoria: "Viagens" },
  { nome: "EW Pass", oferta: "Inglês por menos de R$ 1 por dia", categoria: "Educação" },
  { nome: "Escola Infantil Vila Kids", oferta: "20% OFF na matrícula", categoria: "Infantil" },
];
