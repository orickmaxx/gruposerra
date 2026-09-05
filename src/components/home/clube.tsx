import Image from "next/image";
import {
  BENEFICIOS_URL,
  CATEGORIAS,
  MARCAS_PARCEIRAS,
  TOTAL_BENEFICIOS,
  VITRINES,
} from "@/data/beneficios";
import { IconeSeta } from "../icones";

/**
 * Clube de Benefícios.
 *
 * ⛔ O que caiu, a pedido do dono: o quadradinho de ícone dourado e as nove
 * pílulas de categoria. Nenhum dos dois vendia: a pílula "Gastronomia" não diz
 * nada, e o ícone de etiqueta desenhado em SVG é o sinal mais barato de
 * interface montada.
 *
 * O que entrou, com dado real da API do clube (96 benefícios ativos): TRÊS
 * vitrines com três parceiros cada, com o LOGOTIPO da marca. O clube do Grupo
 * Serra tem Cinemark, Beto Carrero, Leroy Merlin, Casas Bahia, USP, Mackenzie,
 * Shell, Natura e Domino's. Isso estava escondido atrás de uma taxonomia.
 *
 * Abaixo das vitrines corre uma esteira com o resto das marcas, e um botão
 * único leva ao catálogo completo, que é onde ele se atualiza sozinho.
 */
export function Clube() {
  return (
    <section className="mat-clube-fundo overflow-hidden py-12 md:py-20" id="beneficios">
      <div className="mx-auto max-w-[80rem] px-5" data-revela>
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="text-[0.875rem] font-bold tracking-[0.14em] text-clube-forte uppercase">
            Clube de Benefícios
          </p>
          <h2 className="mt-4 text-t2">Ser associado dá desconto na vida toda</h2>
          <p className="mx-auto mt-5 max-w-[56ch] text-lead text-pedra-600">
            Quem tem plano no Grupo Serra entra numa rede de{" "}
            <strong className="font-bold text-tinta">
              {TOTAL_BENEFICIOS} benefícios
            </strong>{" "}
            em {CATEGORIAS.length} categorias. O desconto vale todo mês, e não só
            no dia em que você precisar da funerária.
          </p>
        </div>

        {/* --- as tres vitrines --- */}
        <ul className="trilho mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible">
          {VITRINES.map((v) => (
            <li key={v.slug} className="flex w-[85%] shrink-0 snap-start sm:w-[62%] lg:w-auto lg:shrink">
              <article className="cartao flex w-full flex-col rounded-serra-lg border border-clube/25 bg-white/90 p-7 shadow-media backdrop-blur-sm">
                <h3 className="font-display text-[1.25rem] font-bold text-tinta">
                  {v.titulo}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-pedra-600">
                  {v.resumo}
                </p>

                <ul className="mt-6 flex-1 divide-y divide-linha border-y border-linha">
                  {v.parceiros.map((p) => (
                    <li key={p.nome} className="flex items-center gap-4 py-4">
                      <span className="flex size-14 shrink-0 items-center justify-center rounded-serra border border-linha bg-white p-2">
                        <Image
                          src={p.logo}
                          alt={p.nome}
                          width={160}
                          height={70}
                          className="h-auto max-h-9 w-auto object-contain"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display text-[0.9375rem] font-bold text-tinta">
                          {p.nome}
                        </span>
                        <span className="mt-0.5 block text-[0.875rem] leading-snug font-semibold text-clube-forte">
                          {p.oferta}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-2 font-semibold text-clube-forte"
                >
                  <span className="link-texto">Ver {v.titulo.toLowerCase()}</span>
                  <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            </li>
          ))}
        </ul>

        {/* --- esteira das outras marcas --- */}
        <div className="mt-12">
          <p className="text-center text-[0.875rem] font-semibold text-pedra-600">
            E mais {TOTAL_BENEFICIOS - 9} benefícios com marcas como
          </p>
          <div className="esteira mt-6" aria-hidden>
            <ul className="esteira-fita">
              {[...MARCAS_PARCEIRAS, ...MARCAS_PARCEIRAS].map((m, i) => (
                <li key={`${m.nome}-${i}`} className="shrink-0 px-7">
                  <Image
                    src={m.logo}
                    alt=""
                    width={160}
                    height={70}
                    className="h-10 w-auto object-contain opacity-80 grayscale-[0.35] transition duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </li>
              ))}
            </ul>
          </div>
          <p className="sr-only">
            Outras marcas parceiras: {MARCAS_PARCEIRAS.map((m) => m.nome).join(", ")}.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={BENEFICIOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mat-clube group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-7 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            Ver o catálogo completo
            <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href={BENEFICIOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-serra border border-clube/50 bg-white px-7 font-semibold text-clube-forte transition-all duration-300 hover:-translate-y-0.5 hover:border-clube"
          >
            Acessar minha conta
          </a>
        </div>
      </div>
    </section>
  );
}
