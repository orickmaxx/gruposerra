/**
 * As 8 unidades, conferidas na home e na /contato do cliente em 02/09/2026.
 *
 * ATENCAO: o site atual do cliente se contradiz no horario de sabado (a home
 * diz 8h, a /contato diz 9h). Adotei 8h por ser o que aparece nos dois blocos
 * da home, e marquei a pendencia. Ver CLAUDE.md secao 12, pergunta 4.
 *
 * O CEP so esta confirmado na matriz (Receita Federal). Os demais nao aparecem
 * em lugar nenhum do material do cliente e nao foram inventados.
 */

export type Unidade = {
  slug: string;
  cidade: string;
  nome: string;
  logradouro: string;
  bairro: string;
  uf: string;
  cep?: string;
  telefone: string;
  tel: string;
  horario: string;
  matriz?: boolean;
  desde: number;
  /** Aproximada. Serve so para ranquear distancia, nunca para tracar rota. */
  lat: number;
  lon: number;
};

export const UNIDADES: Unidade[] = [
  {
    slug: "campinas-centro",
    cidade: "Campinas",
    nome: "Campinas · Matriz",
    logradouro: "Rua Regente Feijó, 701",
    bairro: "Centro",
    uf: "SP",
    cep: "13013-051",
    telefone: "(19) 3775-9752",
    tel: "+551937759752",
    horario: "Seg a sex, 8h às 18h · Sáb, 8h às 12h",
    matriz: true,
    desde: 1961,
    lat: -22.902603,
    lon: -47.061679,
  },
  {
    slug: "campinas-padre-anchieta",
    cidade: "Campinas",
    nome: "Campinas · Padre Anchieta",
    logradouro: "Rua Batista Raffi, 75",
    bairro: "Jardim Aparecida",
    uf: "SP",
    telefone: "(19) 3775-9753",
    tel: "+551937759753",
    horario: "Seg a sex, 8h às 18h · Sáb, 8h às 12h",
    desde: 2019,
    lat: -22.883000,
    lon: -47.085000,
  },
  {
    slug: "valinhos",
    cidade: "Valinhos",
    nome: "Valinhos",
    logradouro: "Avenida Dom Nery, 656",
    bairro: "Vila Embaré",
    uf: "SP",
    telefone: "(19) 3869-3217",
    tel: "+551938693217",
    horario: "Seg a sex, 8h às 17h · Sáb, 8h às 12h",
    desde: 1988,
    lat: -22.969338,
    lon: -46.998901,
  },
  {
    slug: "artur-nogueira",
    cidade: "Artur Nogueira",
    nome: "Artur Nogueira",
    logradouro: "Rua Antônio Mateus, 1022",
    bairro: "Centro",
    uf: "SP",
    telefone: "(19) 3827-2459",
    tel: "+551938272459",
    horario: "Seg a sex, 8h às 18h · Sáb, 8h às 12h",
    desde: 1993,
    lat: -22.572737,
    lon: -47.172679,
  },
  {
    slug: "vinhedo",
    cidade: "Vinhedo",
    nome: "Vinhedo",
    logradouro: "Avenida Independência, 4630",
    bairro: "Jardim Santa Rosa",
    uf: "SP",
    telefone: "(19) 3876-4847",
    tel: "+551938764847",
    horario: "Seg a sex, 8h às 17h · Sáb, 8h às 12h",
    desde: 1994,
    lat: -23.029900,
    lon: -46.975000,
  },
  {
    slug: "hortolandia",
    cidade: "Hortolândia",
    nome: "Hortolândia",
    logradouro: "Rua Osvaldo Ribeiro Carrilho, 95",
    bairro: "Jardim Mirante",
    uf: "SP",
    telefone: "(19) 3809-2020",
    tel: "+551938092020",
    horario: "Seg a sex, 8h às 18h · Sáb, 8h às 12h",
    desde: 2003,
    lat: -22.858400,
    lon: -47.220000,
  },
  {
    slug: "cosmopolis",
    cidade: "Cosmópolis",
    nome: "Cosmópolis",
    logradouro: "Rua Ramos de Azevedo, 21",
    bairro: "Bela Vista",
    uf: "SP",
    telefone: "(19) 3872-2759",
    tel: "+551938722759",
    horario: "Seg a sex, 8h às 17h · Sáb, 8h às 12h",
    desde: 2015,
    lat: -22.643740,
    lon: -47.197209,
  },
  {
    slug: "sumare",
    cidade: "Sumaré",
    nome: "Sumaré",
    logradouro: "Rua José Maria Miranda, 104",
    bairro: "Centro",
    uf: "SP",
    telefone: "(19) 3828-2211",
    tel: "+551938282211",
    horario: "Seg a sex, 8h às 18h · Sáb, 8h às 12h",
    desde: 2024,
    lat: -22.820506,
    lon: -47.269498,
  },
];

/**
 * As coordenadas acima sao APROXIMADAS: nivel de endereco em 3 unidades,
 * bairro em 1 e centro da cidade em 4. O Nominatim nao resolveu os numeros de
 * Vinhedo e Hortolandia, e devolveu um banco no CEASA para Padre Anchieta, o
 * que seria pior do que aproximar.
 *
 * Isso e suficiente para o unico uso que elas tem: ordenar qual unidade esta
 * mais perto de quem visita, num raio onde as cidades distam 15 a 40 km. NAO
 * usar para desenhar mapa nem para tracar rota. O endereco e o telefone que
 * aparecem na tela sao os reais, conferidos no site do cliente.
 */

/** Distancia em km pela formula de haversine. */
export function distanciaKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number }
) {
  const R = 6371;
  const rad = (g: number) => (g * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

export function unidadeMaisPerto(pos: { lat: number; lon: number }) {
  return [...UNIDADES].sort(
    (x, y) => distanciaKm(pos, x) - distanciaKm(pos, y)
  );
}

/** Empresa do grupo, CNPJ proprio 34.503.357/0001-04. */
export const MEMORIAL = {
  nome: "Complexo Memorial Hortolândia",
  logradouro: "Avenida Carlos Roberto Prataviera, 2310",
  bairro: "Jardim Nova Europa",
  cidade: "Hortolândia",
  uf: "SP",
  desde: 2021,
  estrutura: [
    "Quatro salas de velório climatizadas",
    "Sala de homenagens e sala de despedida",
    "Crematório próprio",
    "Velório virtual para quem está longe",
    "Espaço de café e estacionamento",
  ],
  site: "https://memorialhortolandia.com.br/",
};
