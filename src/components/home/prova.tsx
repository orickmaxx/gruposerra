"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { UNIDADES } from "@/data/unidades";
import { Contador } from "../contador";
import { Titulo } from "../ui";
import { IconeSeta } from "../icones";

/**
 * Linha do tempo da expansão, na HORIZONTAL.
 *
 * A versao vertical foi recusada pelo dono, com um argumento que eu deveria ter
 * antecipado: uma linha do tempo horizontal e a unica que deixa o olho fazer o
 * gesto do proprio conteudo, que e AVANÇAR. Na vertical, tempo virava lista.
 *
 * O que anda aqui, e cada coisa faz um trabalho:
 *
 *  1. TRILHO que arrasta no dedo, encaixa no cartao e responde a seta e ao
 *     teclado. Sem biblioteca: scroll-snap nativo mais scrollTo suave.
 *  2. ETAPA ATIVA. Um IntersectionObserver com o proprio trilho como raiz marca
 *     quais marcos estao na area central. O ponto do marco ativo cresce, ganha
 *     halo e o ano muda de cor. E o "passando por etapas" literal: a etapa
 *     acende quando chega, apaga quando sai.
 *  3. BARRA DE PROGRESSO embaixo, que preenche conforme o trilho anda. Diz onde
 *     a pessoa esta na historia da empresa sem precisar contar cartao.
 *  4. O SEGMENTO de linha vive DENTRO de cada cartao, entao os segmentos se
 *     emendam e formam um fio continuo que rola junto. Fio que fica parado
 *     enquanto o conteudo anda e o erro classico dessa peca.
 *
 * Tudo em transform e opacity, e tudo desligado em prefers-reduced-motion.
 */
const HISTORIA: { ano: number; o: string; nota?: string; marco?: boolean }[] = [
  { ano: 1961, o: "Primeira unidade", nota: "Campinas, no Centro", marco: true },
  { ano: 1988, o: "Valinhos" },
  { ano: 1993, o: "Artur Nogueira" },
  { ano: 1994, o: "Vinhedo" },
  { ano: 2003, o: "Hortolândia" },
  { ano: 2015, o: "Cosmópolis" },
  { ano: 2019, o: "Campinas", nota: "unidade Padre Anchieta" },
  {
    ano: 2021,
    o: "Crematório próprio",
    nota: "Complexo Memorial Hortolândia",
    marco: true,
  },
  { ano: 2024, o: "Sumaré" },
];

/** `prefers-reduced-motion` do jeito que da para consultar antes do primeiro
 *  render, inclusive no servidor, onde nao ha matchMedia. */
function semMovimento() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Historia() {
  const trilho = useRef<HTMLOListElement>(null);
  /* Estado inicial IGUAL no servidor e no cliente: as tres primeiras etapas
     acesas. Quem pediu menos movimento recebe todas acesas logo em seguida,
     dentro do efeito, o que nao muda o HTML entregue. */
  const [ativos, setAtivos] = useState<Set<number>>(new Set([0, 1, 2]));
  const [progresso, setProgresso] = useState(0);
  const [naPonta, setNaPonta] = useState({ inicio: true, fim: false });

  /* Progresso e estado das setas, recalculados na rolagem do trilho. */
  const medir = useCallback(() => {
    const t = trilho.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    setProgresso(max > 0 ? t.scrollLeft / max : 1);
    setNaPonta({ inicio: t.scrollLeft <= 4, fim: t.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const t = trilho.current;
    if (!t) return;
    medir();
    let quadro = 0;
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(medir);
    };
    t.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      cancelAnimationFrame(quadro);
      t.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", medir);
    };
  }, [medir]);

  /* Etapa acesa: observa cada marco DENTRO do trilho, nao da janela. */
  useEffect(() => {
    const t = trilho.current;
    if (!t) return;
    /* Sem movimento, todas as etapas nascem acesas: isso e decidido no valor
       inicial do estado, nao dentro do efeito. */
    if (semMovimento()) {
      const q = requestAnimationFrame(() =>
        setAtivos(new Set(HISTORIA.map((_, i) => i)))
      );
      return () => cancelAnimationFrame(q);
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        setAtivos((antes) => {
          const agora = new Set(antes);
          for (const e of entradas) {
            const i = Number((e.target as HTMLElement).dataset.i);
            if (e.isIntersecting) agora.add(i);
            else agora.delete(i);
          }
          return agora;
        });
      },
      { root: t, threshold: 0.65 }
    );
    for (const li of t.querySelectorAll("[data-i]")) obs.observe(li);
    return () => obs.disconnect();
  }, []);

  const andar = (direcao: 1 | -1) => {
    const t = trilho.current;
    if (!t) return;
    t.scrollBy({ left: direcao * Math.round(t.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="bg-areia py-12 md:py-20" id="historia">
      <div className="mx-auto max-w-[80rem] px-5" data-revela>
        <Titulo apoio="A empresa nasceu em Campinas e nunca saiu da região. Cada abertura é uma cidade onde passou a haver alguém do Serra por perto.">
          Sempre na mesma região
        </Titulo>

        {/* Três números que resumem a história antes de ela ser percorrida. */}
        <ul className="mt-12 grid max-w-[46rem] gap-8 sm:grid-cols-3">
          {[
            {
              n: HISTORIA[HISTORIA.length - 1].ano - HISTORIA[0].ano,
              r: "anos de expansão",
            },
            { n: UNIDADES.length, r: "unidades próprias" },
            { n: 1, r: "crematório do grupo" },
          ].map((e) => (
            <li key={e.r}>
              <p className="font-display text-[3.25rem] leading-none font-extrabold tracking-tight text-serra-600">
                <Contador ate={e.n} />
              </p>
              <p className="mt-2 text-[0.9375rem] font-semibold text-pedra-600">{e.r}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* --- o trilho --- */}
      <div className="relative mx-auto mt-14 max-w-[80rem] px-5">
        <ol
          ref={trilho}
          className="trilho flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-4"
        >
          {HISTORIA.map((h, i) => {
            const aceso = ativos.has(i);
            return (
              <li
                key={h.ano}
                data-i={i}
                className="w-[13.5rem] shrink-0 snap-start pr-6 sm:w-[15.5rem] sm:pr-8"
              >
                <div className="relative pt-12">
                  {/* segmento do fio: rola junto com o cartao */}
                  <span
                    aria-hidden
                    className={`absolute top-[1.55rem] right-0 left-0 h-[2px] transition-colors duration-500 ${
                      aceso ? "bg-serra-400" : "bg-pedra-300/60"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`absolute top-[0.95rem] left-0 rounded-full ring-4 ring-areia transition-all duration-500 ${
                      aceso
                        ? h.marco
                          ? "size-5 -translate-x-px bg-dourado shadow-[0_0_0_6px_rgba(201,177,103,0.28)]"
                          : "size-4 bg-serra-500 shadow-[0_0_0_6px_rgba(0,105,163,0.16)]"
                        : "size-3 bg-pedra-300"
                    }`}
                  />

                  <p
                    className={`numerais font-display text-[2rem] leading-none font-extrabold tracking-tight transition-colors duration-500 sm:text-[2.25rem] ${
                      aceso ? (h.marco ? "text-dourado-forte" : "text-serra-600") : "text-pedra-400"
                    }`}
                  >
                    {h.ano}
                  </p>
                  <p
                    className={`mt-3 font-display text-[1.0625rem] font-bold transition-colors duration-500 ${
                      aceso ? "text-tinta" : "text-pedra-500"
                    }`}
                  >
                    {h.o}
                  </p>
                  {h.nota ? (
                    <p className="mt-1 text-[0.875rem] leading-snug text-pedra-600">
                      {h.nota}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        {/* --- controles: a barra de progresso e as setas moram juntas, logo
             abaixo do trilho, que e o que elas controlam --- */}
        <div className="mt-8 flex items-center gap-6">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-pedra-300/50">
            <div
              className="h-full rounded-full bg-gradient-to-r from-serra-500 to-dourado transition-[width] duration-200 ease-out"
              style={{ width: `${Math.max(8, progresso * 100)}%` }}
            />
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => andar(-1)}
              disabled={naPonta.inicio}
              aria-label="Anos anteriores"
              className="seta"
            >
              <IconeSeta className="size-5 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => andar(1)}
              disabled={naPonta.fim}
              aria-label="Próximos anos"
              className="seta"
            >
              <IconeSeta className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

