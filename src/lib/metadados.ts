import type { Metadata } from "next";
import { SITE, URL_SITE, INDEXAVEL } from "./site";

/**
 * O metadata de TODA rota do site, montado num lugar só.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ⛔ POR QUE ISTO EXISTE, E POR QUE CORRIGIR PÁGINA POR PÁGINA SERIA ERRADO.
 *
 * A doc do Next é explícita (`generate-metadata.md`, linha 1348): os objetos de
 * metadata de segmentos diferentes são mesclados de forma **RASA**, e um campo
 * aninhado como `openGraph` definido num filho **substitui inteiro** o do pai.
 * Não há merge profundo. Não há herança de campo.
 *
 * Como cada página declarava o próprio `openGraph: { title, description, url }`,
 * todas elas jogavam fora, sem aviso, o `og:type`, o `og:site_name`, o
 * `og:locale` e a IMAGEM que o layout raiz definia. Medido em produção em
 * 16/09/2026: `/planos`, `/cremacao`, `/unidades/[slug]` e `/obituario` saíam
 * com **3 tags og e nenhuma imagem**. Prévia sem imagem no WhatsApp é meia
 * prévia, e era metade do argumento de venda deste projeto indo embora.
 *
 * O mesmo vale para `twitter`: as internas nem sequer declaravam, então
 * herdavam o `twitter:title` e o `twitter:description` GENÉRICOS da home. Quem
 * compartilhasse `/unidades/valinhos` via "8 unidades na região de Campinas".
 *
 * Corrigir isso página por página resolveria as rotas de hoje e deixaria a
 * armadilha armada para a próxima: a rota nº 27 nasceria com o mesmo defeito, e
 * ninguém iria lembrar. Por isso a correção é estrutural. **Nenhuma rota deste
 * projeto deve declarar `openGraph` ou `twitter` na mão.** Chame `metadados()`.
 *
 * `scripts/verificar-previa.mjs` varre todas as rotas e falha se alguma sair
 * sem imagem ou apontando para um domínio que não seja `NEXT_PUBLIC_SITE_URL`.
 */

/** A imagem que as rotas SEM `opengraph-image.tsx` próprio usam. */
const IMAGEM_PADRAO = {
  url: `${URL_SITE}/opengraph-image`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${SITE.nomeCompleto} · ${SITE.slogan}`,
};

export type Metadados = {
  /** Vai para `<title>`, com o template do layout aplicado por cima. */
  titulo: string;
  /** Uma frase. Serve a `<meta description>`, ao `og:description` e ao Twitter. */
  descricao: string;
  /** Caminho relativo, sempre começando com `/`. A absoluta é montada aqui. */
  caminho: string;
  /**
   * Título do cartão social, quando precisa ser diferente do `<title>`. O
   * `<title>` compete no Google; o `og:title` compete numa conversa. Nem sempre
   * a mesma frase serve às duas coisas.
   */
  tituloSocial?: string;
  tipo?: "website" | "article" | "profile";
  /**
   * `true` para rotas que têm `opengraph-image.tsx` no próprio segmento (`/` e
   * `/obituario/[slug]`). Nelas o arquivo do segmento manda, e declarar
   * `images` aqui substituiria o cartão específico pelo genérico da marca.
   */
  imagemPropria?: boolean;
  /** Fora do índice mesmo quando o site inteiro estiver indexável. */
  foraDoIndice?: boolean;
  /** Campos de `openGraph` que só uma rota usa, como `publishedTime`. */
  extraOg?: Record<string, unknown>;
};

export function metadados({
  titulo,
  descricao,
  caminho,
  tituloSocial,
  tipo = "website",
  imagemPropria = false,
  foraDoIndice = false,
  extraOg,
}: Metadados): Metadata {
  const social = tituloSocial ?? titulo;
  const imagens = imagemPropria ? {} : { images: [IMAGEM_PADRAO] };

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: caminho },

    openGraph: {
      /* Os quatro campos que o merge raso do Next fazia sumir. Eles são
         repetidos em toda rota DE PROPÓSITO: não há como herdá-los. */
      type: tipo,
      locale: "pt_BR",
      siteName: SITE.nomeCompleto,
      url: `${URL_SITE}${caminho === "/" ? "" : caminho}`,
      title: social,
      description: descricao,
      ...imagens,
      ...extraOg,
    },

    /* ⛔ `twitter` TAMBÉM É SUBSTITUÍDO INTEIRO, e por isso é montado aqui.
       Sem isto, cada rota interna herdava o texto da home e o cartão do
       LinkedIn e do Slack (que leem Twitter Cards) anunciava a página errada. */
    twitter: {
      card: "summary_large_image",
      title: social,
      description: descricao,
      ...imagens,
    },

    ...(foraDoIndice || !INDEXAVEL
      ? { robots: { index: false, follow: false, nocache: true } }
      : { robots: { index: true, follow: true } }),
  };
}

/**
 * O selo de demonstração que vai em TODA imagem OG do site.
 *
 * ⛔ É O ÚNICO ERRO DESTE PROJETO QUE NÃO TEM CONSERTO DEPOIS. A página traz
 * marca d'água e um parágrafo dizendo que o registro é inventado, mas o cartão
 * do WhatsApp VIAJA SOZINHO: é encaminhado, printado e reenviado sem que
 * ninguém abra o link. Nome de falecido fictício circulando com a marca Grupo
 * Serra, sem aviso, é uma publicação sobre a morte de uma pessoa que não existe
 * feita em nome de uma funerária de verdade. Não há retratação depois que isso
 * sai de um grupo de família.
 *
 * ⚠️ E ELE SOME SOZINHO NO LANÇAMENTO. A condição é `!INDEXAVEL`: no dia em que
 * `NEXT_PUBLIC_INDEXAVEL=1` for ligada, o selo desaparece de todas as imagens
 * sem ninguém precisar lembrar de tirar. Amarrar o aviso à mesma chave que
 * governa a indexação é o que impede as duas coisas de andarem separadas.
 */
export const SELO_DEMO = INDEXAVEL ? null : "Demonstração · conteúdo de teste";

/** Estilo do selo, compartilhado pelas duas imagens OG. Dourado da casa. */
export const ESTILO_SELO = {
  position: "absolute" as const,
  right: 80,
  bottom: 22,
  display: "flex",
  fontSize: 17,
  letterSpacing: 3,
  textTransform: "uppercase" as const,
  color: "#c9b167",
};
