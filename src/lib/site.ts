/**
 * Fonte unica dos dados da empresa no site.
 * Tudo aqui foi conferido em 02/09/2026 contra a Receita Federal e o site do
 * cliente. Ver ../../../CLAUDE.md. Nada de numero novo sem passar por la.
 */

/**
 * ⛔ A FONTE UNICA DE TODA URL ABSOLUTA DO SITE. Nao existe segunda.
 *
 * Alimenta, sem excecao: `metadataBase`, `alternates.canonical`, todo `og:url`
 * e `og:image`, `sitemap.ts`, `robots.ts` e os `@id` e `url` dos 12 tipos de
 * JSON-LD em `components/dados-estruturados.tsx`. Sao 41 pontos de emissao em
 * 6 arquivos, e todos leem daqui.
 *
 * ⛔ POR QUE ISTO VIROU UMA VARIAVEL, EM 16/09/2026. O valor era o literal
 * `https://www.gruposerra.com.br`, escrito no codigo. Esse e o dominio de MARCA
 * do cliente, que hoje ainda serve o site ANTIGO em OctoberCMS. Entao todo
 * deploy de homologacao saia anunciando:
 *
 *   og:url    https://www.gruposerra.com.br/obituario/<slug>
 *   og:image  https://www.gruposerra.com.br/obituario/<slug>/opengraph-image
 *
 * O crawler do WhatsApp lia a NOSSA pagina, obedecia ao `og:url` como canonica,
 * ia buscar o site antigo e voltava de maos vazias, porque o antigo nao tem
 * nenhuma tag Open Graph. A imagem, pelo mesmo caminho, dava 404. Medido:
 * `og:image` no dominio do cliente devolvia HTTP 404; a mesma rota no deploy
 * devolvia 200 image/png de 54,8 KB.
 *
 * As tags estavam certas e apontavam para o lugar errado. E o jeito mais
 * silencioso de este defeito acontecer: nenhum erro, nenhum log, e a prevalencia
 * so aparece quando alguem manda o link para si mesmo.
 *
 * Ordem de resolucao:
 *   1. `NEXT_PUBLIC_SITE_URL`, quando declarada. E o que se liga no dia do
 *      lancamento, com o dominio definitivo;
 *   2. o dominio de homologacao, que e onde este projeto vive ate a assinatura.
 *
 * ⚠️ O prefixo `NEXT_PUBLIC_` e obrigatorio e NAO e descuido: o valor precisa
 * ser o mesmo no servidor e no navegador, senao qualquer componente client que
 * o use hidrata divergente.
 *
 * ⚠️ E NAO REPONHA O LITERAL. Se alguem voltar a escrever o dominio do cliente
 * aqui antes de o site estar de fato nele, a previa quebra de novo e o sitemap
 * passa a anunciar paginas que moram em outro servidor.
 * `scripts/verificar-previa.mjs` falha quando isso acontece.
 */
export const URL_SITE = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://gruposerra.vercel.app"
).replace(/\/+$/, "");

export const SITE = {
  nome: "Grupo Serra",
  nomeCompleto: "Grupo Serra Funerárias",
  razaoSocial: "Empresa Funerária e Plano Assistencial Serra Ltda",
  cnpj: "68.932.722/0001-18",
  slogan: "Essencial nos momentos mais difíceis da vida.",
  /** ⛔ Sempre `URL_SITE`. Ver a nota acima: literal aqui quebra a previa. */
  url: URL_SITE,

  /** O numero que precisa estar sempre ao alcance do polegar. */
  emergencia: { rotulo: "(19) 3775-9752", tel: "+551937759752" },
  emergenciaAlt: { rotulo: "(19) 3234-9752", tel: "+551932349752" },
  whatsapp: {
    rotulo: "(19) 99240-6881",
    link: "https://wa.me/5519992406881?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20plano.",
  },
  email: "contato@gruposerra.com.br",

  /**
   * ⚠ A empresa DECLARA 1961, e o Instagram dela comemorou 65 anos em 2026.
   * Mas o CNPJ ativo foi aberto em 07/10/1992 e NAO existe prova publica de
   * 1961 (ver CLAUDE.md 1.1). O PRODUCT.md proibe afirmar o ano sem documento,
   * entao enquanto `fundacaoConfirmada` for false o site usa so a idade que o
   * proprio CNPJ sustenta. Vire para true quando o cliente entregar contrato
   * social antigo, alvara ou materia de jornal, e as frases voltam sozinhas.
   */
  fundacao: 1961,
  fundacaoConfirmada: false,
  cnpjDesde: 1992,
  get anos() {
    const ano = new Date().getFullYear();
    return ano - (this.fundacaoConfirmada ? this.fundacao : this.cnpjDesde);
  },
  /** Frase segura: "ha mais de 30 anos" e sustentada so pelo CNPJ. */
  get idadeTexto() {
    if (this.fundacaoConfirmada) return `desde ${this.fundacao}`;
    const decadas = Math.floor((new Date().getFullYear() - this.cnpjDesde) / 10) * 10;
    return `há mais de ${decadas} anos`;
  },

  matriz: {
    rua: "Rua Regente Feijó, 701",
    bairro: "Centro",
    cidade: "Campinas",
    uf: "SP",
    cep: "13013-051",
  },

  social: {
    instagram: "https://www.instagram.com/serragrupo/",
    facebook: "https://www.facebook.com/serragrupo/",
    linkedin: "https://br.linkedin.com/company/funerária-grupo-serra",
  },

  /** Sistemas de terceiro que seguem vivos ate alguem migrar. */
  externos: {
    segundaVia: "https://gruposerra.app.br/serra2viaboletos",
    beneficios: "https://beneficios.gruposerra.com.br",
    memorial: "https://memorialhortolandia.com.br/",
  },
} as const;

/**
 * O site so aceita ser indexado quando alguem liga a variavel de propósito.
 * Enquanto isso, `robots.txt` bloqueia tudo e cada pagina sai com `noindex`.
 * Homologacao publica e indexavel canibaliza a busca do cliente.
 */
export const INDEXAVEL = process.env.NEXT_PUBLIC_INDEXAVEL === "1";

/**
 * Rotas que abrem com HERÓI ESCURO em tela cheia.
 *
 * O cabeçalho some dentro da fotografia enquanto a página está no topo dessas
 * rotas, e volta sólido ao primeiro gesto de rolagem. Fora delas ele é branco
 * desde sempre, porque cabeçalho transparente sobre fundo claro é texto branco
 * invisível, que é o defeito clássico desse padrão.
 *
 * ⚠️ Esta lista e o `HeroiPagina` precisam andar juntos: rota nova com herói
 * escuro entra aqui no mesmo commit, senão a página nasce com uma barra branca
 * cortando a foto no primeiro terço.
 */
export const ROTAS_COM_HEROI = [
  "/",
  "/unidades",
  "/cremacao",
  "/obituario",
  "/serra-pet",
  "/contato",
  "/homenagens",
] as const;

/**
 * Raizes cujas rotas FILHAS tambem abrem com heroi escuro.
 *
 * `/obituario/benedita-alvim-rosseto` e `/unidades/valinhos` usam o mesmo
 * `HeroiPagina` que os pais delas. A comparacao era exata (`includes`), entao
 * cada pagina de falecido e cada pagina de unidade nascia com a barra branca do
 * cabecalho cortando a fotografia no primeiro terco: o defeito exato que o
 * aviso acima existe para impedir.
 */
const RAIZES_COM_HEROI = ["/obituario/", "/unidades/"] as const;

export function temHeroiEscuro(rota: string) {
  return (
    ROTAS_COM_HEROI.includes(rota as (typeof ROTAS_COM_HEROI)[number]) ||
    RAIZES_COM_HEROI.some((r) => rota.startsWith(r))
  );
}

export const NAV = [
  { href: "/planos", rotulo: "Planos" },
  { href: "/cremacao", rotulo: "Cremação" },
  { href: "/unidades", rotulo: "Unidades" },
  { href: "/obituario", rotulo: "Obituário" },
  { href: "/homenagens", rotulo: "Homenagens" },
  { href: "/blog", rotulo: "Blog" },
  { href: "/contato", rotulo: "Contato" },
] as const;
