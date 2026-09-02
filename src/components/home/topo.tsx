import Link from "next/link";
import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { DEPOIMENTOS } from "@/data/depoimentos";
import { Botao } from "../ui";
import {
  IconeBoleto,
  IconeGoogle,
  IconeSeta,
  IconeTelefone,
  IconeVela,
  IconeWhatsApp,
} from "../icones";

/**
 * Primeiro viewport.
 *
 * Ordem deliberada: quem esta em luto acha o telefone antes de qualquer outra
 * coisa, e so depois vem a venda. As 8 unidades aparecem aqui porque
 * proximidade e o posicionamento da empresa contra o Grupo Zelo, que tem
 * escala nacional, e nao um detalhe do rodape.
 */
export function Topo() {
  const cidades = [...new Set(UNIDADES.map((u) => u.cidade))];

  return (
    <section className="malha relative overflow-hidden">
      <div className="relative mx-auto grid max-w-[76rem] items-start gap-14 px-5 pt-14 pb-16 md:pt-20 lg:grid-cols-[1.1fr_minmax(0,24rem)] lg:gap-16 lg:pb-24">
        <div className="revela">
          <a
            href="#depoimentos"
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-serra-200/70 bg-white/70 py-2 pr-4 pl-2.5 shadow-baixa backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-300"
            style={{ ["--i" as string]: 0 }}
          >
            <IconeGoogle className="size-5 shrink-0" />
            <span className="text-[0.9375rem] font-semibold text-tinta">
              {DEPOIMENTOS.length} famílias contaram no Google como foram
              atendidas
            </span>
            <IconeSeta className="size-4 shrink-0 rotate-90 text-pedra-400" />
          </a>

          <h1 className="max-w-[15ch] text-hero" style={{ ["--i" as string]: 1 }}>
            Estamos perto, e atendemos a qualquer hora.
          </h1>

          <p
            className="mt-7 max-w-[52ch] text-lead text-pedra-600"
            style={{ ["--i" as string]: 2 }}
          >
            O Grupo Serra atende famílias na região de Campinas{" "}
            {SITE.idadeTexto}. São {UNIDADES.length} unidades, e o telefone do
            atendimento de óbito não fecha nunca, nem no fim de semana, nem no
            feriado.
          </p>

          <div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ ["--i" as string]: 3 }}
          >
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              Ligar agora, {SITE.emergencia.rotulo}
            </Botao>
            <Botao
              href="/planos"
              tom="contorno"
              icone={
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              }
            >
              Ver planos e preços
            </Botao>
          </div>

          <p
            className="mt-7 max-w-[52ch] text-[0.9375rem] text-pedra-600"
            style={{ ["--i" as string]: 4 }}
          >
            Atendimento em {cidades.join(", ")}.
          </p>
        </div>

        <ListaTelefones />
      </div>

      <AcoesRapidas />
    </section>
  );
}

/**
 * O que ocupa a coluna direita do heroi.
 *
 * O lugar onde a categoria poe uma foto de banco. Nao temos foto do cliente, e
 * inventar uma seria pior do que a ausencia. Entao o espaco carrega a coisa
 * mais util que existe para quem abriu este site em panico: o telefone da
 * unidade da cidade dele, discavel, sem rolar a pagina.
 */
function ListaTelefones() {
  return (
    <aside className="vidro overflow-hidden rounded-serra-lg border border-white/70 shadow-alta lg:mt-2">
      <h2 className="border-b border-linha/80 px-6 py-4 font-display text-[1.0625rem] font-bold text-tinta">
        Ligue para a unidade mais perto
      </h2>
      <ul className="divide-y divide-linha/80">
        {UNIDADES.map((u) => (
          <li key={u.slug}>
            <a
              href={`tel:${u.tel}`}
              className="group flex items-center justify-between gap-3 px-6 py-3 transition-colors hover:bg-serra-500/[0.07]"
            >
              <span className="text-[0.9375rem] text-corpo">
                {u.cidade}
                {u.nome.includes("Padre Anchieta") ? (
                  <span className="text-pedra-500"> · Padre Anchieta</span>
                ) : null}
                {u.matriz ? <span className="text-pedra-500"> · Centro</span> : null}
              </span>
              <span className="numerais text-[0.9375rem] font-bold whitespace-nowrap text-serra-600">
                {u.telefone}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="border-t border-linha/80 bg-white/50 px-6 py-4 text-[0.875rem] leading-relaxed text-pedra-600">
        Óbito é atendido 24 horas, todos os dias.
      </p>
    </aside>
  );
}

/**
 * As tres tarefas reais do site, lado a lado. A segunda via vem primeiro entre
 * as tarefas de associado porque e a reclamacao numero 1 da empresa no
 * Reclame Aqui (ver CLAUDE.md secao 6.2).
 */
function AcoesRapidas() {
  const acoes = [
    {
      href: SITE.externos.segundaVia,
      externo: true,
      Icone: IconeBoleto,
      cor: "bg-serra-500/10 text-serra-600",
      titulo: "Segunda via de boleto",
      texto: "Emita o boleto da mensalidade sem precisar ligar na central.",
    },
    {
      href: "/obituario",
      externo: false,
      Icone: IconeVela,
      cor: "bg-pedra-500/10 text-pedra-600",
      titulo: "Obituário",
      texto: "Local e horário do velório e da despedida, atualizado o dia todo.",
    },
    {
      href: SITE.whatsapp.link,
      externo: true,
      Icone: IconeWhatsApp,
      cor: "bg-verde-forte/10 text-verde-forte",
      titulo: "Falar no WhatsApp",
      texto: "Dúvida sobre plano, cobertura ou pagamento com uma pessoa de verdade.",
    },
  ];

  return (
    <div className="relative mx-auto max-w-[76rem] px-5 pb-16 md:pb-24" data-revela>
      <ul className="grid gap-4 sm:grid-cols-3">
        {acoes.map(({ href, externo, Icone, cor, titulo, texto }) => {
          const conteudo = (
            <>
              <span
                className={`inline-flex size-12 items-center justify-center rounded-serra ${cor}`}
              >
                <Icone className="size-6" />
              </span>
              <span className="mt-5 flex items-center gap-1.5 font-display text-[1.1875rem] font-bold text-tinta">
                {titulo}
                <IconeSeta className="size-[1.05rem] shrink-0 text-pedra-400 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="mt-2 block text-[0.9375rem] leading-relaxed text-pedra-600">
                {texto}
              </span>
            </>
          );
          const classe =
            "cartao group flex h-full flex-col rounded-serra-lg border border-white/70 bg-white/80 p-6 shadow-media backdrop-blur-sm hover:border-serra-200 md:p-7";
          return (
            <li key={titulo} className="flex">
              {externo ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
                  {conteudo}
                </a>
              ) : (
                <Link href={href} className={classe}>
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
