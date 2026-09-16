import type { Metadata } from "next";
import { metadados } from "@/lib/metadados";
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
export const metadata: Metadata = metadados({
  titulo: "Painel de publicação",
  descricao:
    "Maquete do painel onde a equipe do Grupo Serra publica obituários, aprova homenagens e ajusta o horário das unidades.",
  caminho: "/painel",
  /* `foraDoIndice` INCONDICIONAL: esta rota sai com noindex mesmo depois de o
     site inteiro virar indexável, porque painel de mentira indexado no nome da
     empresa é pior do que painel nenhum. */
  foraDoIndice: true,
});

export default function Pagina() {
  return <Painel />;
}
