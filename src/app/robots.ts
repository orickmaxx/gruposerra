import type { MetadataRoute } from "next";
import { SITE, INDEXAVEL } from "@/lib/site";

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
 * nenhum: devolve a pagina 404 do CMS (ver CLAUDE.md 9.1).
 */
export default function robots(): MetadataRoute.Robots {
  if (!INDEXAVEL) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
