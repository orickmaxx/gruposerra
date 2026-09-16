import type { Metadata } from "next";
import { Painel } from "@/components/painel/painel";

/**
 * `/painel` — maquete do painel de publicação.
 *
 * ⛔ `noindex` INCONDICIONAL. Todas as outras rotas do site herdam o robots do
 * layout, que abre quando `NEXT_PUBLIC_INDEXAVEL=1`. Esta não: ela sai com
 * `noindex, nofollow` sempre, inclusive no site definitivo, porque um painel de
 * mentira indexado no nome da empresa é pior do que painel nenhum. Também fica
 * fora do `sitemap.ts`.
 *
 * A trava que não depende de ninguém lembrar é `scripts/sem-exemplo.mjs`, que
 * quebra o build se esta rota existir com a indexação ligada.
 */
export const metadata: Metadata = {
  title: "Painel de publicação",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/painel" },
};

export default function Pagina() {
  return <Painel />;
}
