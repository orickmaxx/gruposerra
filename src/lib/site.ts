/**
 * Fonte unica dos dados da empresa no site.
 * Tudo aqui foi conferido em 02/09/2026 contra a Receita Federal e o site do
 * cliente. Ver ../../../CLAUDE.md. Nada de numero novo sem passar por la.
 */

export const SITE = {
  nome: "Grupo Serra",
  nomeCompleto: "Grupo Serra Funerárias",
  razaoSocial: "Empresa Funerária e Plano Assistencial Serra Ltda",
  cnpj: "68.932.722/0001-18",
  slogan: "Essencial nos momentos mais difíceis da vida.",
  url: "https://www.gruposerra.com.br",

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

export const NAV = [
  { href: "/planos", rotulo: "Planos" },
  { href: "/cremacao", rotulo: "Cremação" },
  { href: "/unidades", rotulo: "Unidades" },
  { href: "/obituario", rotulo: "Obituário" },
  { href: "/homenagens", rotulo: "Homenagens" },
  { href: "/blog", rotulo: "Blog" },
  { href: "/contato", rotulo: "Contato" },
] as const;
