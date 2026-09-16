import type { MetadataRoute } from "next";
import { SITE, INDEXAVEL, URL_SITE } from "@/lib/site";

/**
 * robots.txt
 *
 * ⛔ BLOQUEIA A INDEXACAO POR PADRAO, e so libera quando
 * `NEXT_PUBLIC_INDEXAVEL=1` estiver definida.
 *
 * O motivo nao e paranoia: enquanto este site vive em `gruposerra.vercel.app`,
 * ele e uma COPIA do site do cliente. Se o Google indexar a homologacao, ela
 * passa a competir com o site real por conteudo duplicado, e o prejuizo cai no
 * cliente, nao em nos. A variavel so deve ser ligada quando o site estiver no
 * dominio definitivo.
 *
 * O site atual do cliente, para efeito de comparacao, nao tem robots.txt
 * nenhum: devolve a pagina 404 do CMS (ver CLAUDE.md 5.1).
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⛔ CRAWLER DE PREVIA NAO E BUSCADOR, E FOI ISSO QUE QUEBROU O WHATSAPP.
 *
 * Em 16/09/2026 o link de um obituario chegou SECO no WhatsApp, sem titulo,
 * imagem nem descricao, que e exatamente o defeito do site antigo que este
 * projeto existe para consertar. Uma das tres causas era este arquivo: o
 * `Disallow: /` valia para `User-Agent: *`, e `facebookexternalhit`,
 * `WhatsApp`, `Twitterbot`, `LinkedInBot`, `Slackbot` e `TelegramBot` caiam
 * nele junto com o Googlebot.
 *
 * Esses seis nao indexam nada. Eles leem o `<head>` para montar o cartao da
 * conversa. Bloquea-los nao protege a busca do cliente de nada: so apaga a
 * previa. Entao cada um ganha regra propria, ANTES do coringa, porque
 * robots.txt casa o agente pelo bloco mais especifico.
 *
 * ⚠️ E A LICAO MAIOR, QUE VALE PARA O DIA DO LANCAMENTO: bloquear por robots
 * NAO DESINDEXA. O buscador que nao pode LER a pagina tambem nao pode ler a
 * `<meta name="robots" content="noindex">` dela, e uma URL ja conhecida
 * continua aparecendo no resultado, so que sem titulo nem descricao. O arranjo
 * correto para tirar algo do indice e o oposto do intuitivo: deixar rastrear e
 * responder `noindex`.
 *
 * Por isso, no dia em que `NEXT_PUBLIC_INDEXAVEL=1` for ligada, o robots abre
 * inteiro (o `else` abaixo) e quem segura a indexacao passa a ser o `noindex`
 * por pagina, que o layout raiz ja emite. Decisao do dono em 16/09/2026:
 * manter os seis liberados agora, inverter no lancamento.
 */

/**
 * Os agentes que montam previa de link. Nomes como as plataformas se declaram:
 *  - `facebookexternalhit` serve Facebook, Instagram e tambem o WhatsApp,
 *    que na pratica usa o rastreador da Meta;
 *  - `WhatsApp` aparece sozinho em algumas versoes do aplicativo;
 *  - `Slackbot-LinkExpanding` e o que desdobra link no Slack.
 */
const PREVIA = [
  "facebookexternalhit",
  "WhatsApp",
  "Twitterbot",
  "LinkedInBot",
  "Slackbot-LinkExpanding",
  "Slackbot",
  "TelegramBot",
  "Discordbot",
];

export default function robots(): MetadataRoute.Robots {
  if (!INDEXAVEL) {
    return {
      rules: [
        /* Os especificos vem primeiro: robots.txt casa pelo bloco mais
           especifico, e um agente que encontra o proprio nome ignora o `*`. */
        ...PREVIA.map((userAgent) => ({ userAgent, allow: "/" })),
        { userAgent: "*", disallow: "/" },
      ],
    };
  }

  /* Indexacao ligada: o robots abre inteiro, DE PROPOSITO. Ver a nota acima
     sobre bloquear nao desindexar. Quem controla indice aqui e o `noindex`. */
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${URL_SITE}/sitemap.xml`,
    host: SITE.url,
  };
}
