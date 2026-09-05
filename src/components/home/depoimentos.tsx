"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { DEPOIMENTOS, type Depoimento } from "@/data/depoimentos";
import { IconeGoogle, IconeSeta } from "../icones";

/**
 * Depoimentos reais do Google.
 *
 * Refeito pela terceira vez, e as duas primeiras estavam erradas por motivos
 * diferentes:
 *  1. esteira de CSS que so parava no `:hover`, que nao existe em celular;
 *  2. carrossel com as duas setas juntas num canto, andando de um em um e com
 *     autoplay, o que atropelava a leitura.
 *
 * O que o dono pediu, e o que o site do Florees faz de fato:
 *  - fundo ESCURO dramatico, com o conteudo branco saltando (`.palco`);
 *  - no maximo TRES cartoes por vez, nunca uma fila infinita;
 *  - uma seta em CADA borda do carrossel, nao duas grudadas num canto;
 *  - SEM autoplay: quem le um depoimento de luto decide quando passar.
 *
 * A navegacao anda de PAGINA em pagina (3, 2 ou 1 cartao conforme a largura),
 * nao de cartao em cartao, senao a seta parece nao fazer nada no desktop.
 */
export function Depoimentos() {
  const trilho = useRef<HTMLUListElement>(null);
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState(1);

  const medir = useCallback(() => {
    const t = trilho.current;
    if (!t) return;
    setPaginas(Math.max(1, Math.round(t.scrollWidth / t.clientWidth)));
    setPagina(Math.round(t.scrollLeft / t.clientWidth));
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

  const irPara = (p: number) => {
    const t = trilho.current;
    if (!t) return;
    const alvo = Math.min(Math.max(p, 0), paginas - 1);
    t.scrollTo({ left: alvo * t.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="depoimentos" className="palco relative overflow-hidden py-12 md:py-20">
      {/*
        MARCA D'AGUA. Antes era o LOGOTIPO INTEIRO, girado 8 graus no canto
        superior esquerdo, com a palavra "Grupo Serra Funerarias" legivel e
        torta. Ficava exatamente com cara de placeholder de gerador. O site do
        Florees usa so o simbolo, reto e centralizado, e e o certo: simbolo e
        ambiente, logotipo com texto e ruido. Este arquivo foi recortado do
        logotipo HD real do cliente.
      */}
      <Image
        src="/marca/simbolo-serra-branco.png"
        alt=""
        width={379}
        height={376}
        aria-hidden
        priority={false}
        className="pointer-events-none absolute top-1/2 left-1/2 w-[34rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.045]"
      />

      <div className="relative mx-auto max-w-[76rem] px-5 text-center" data-revela>
        <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-[0.875rem] font-semibold text-serra-100 backdrop-blur-sm">
          <IconeGoogle className="size-4 shrink-0" />
          Avaliações públicas no Google
        </p>
        <h2 className="mx-auto mt-5 max-w-[20ch] text-t2 text-white">
          Quem já passou por isso conta melhor
        </h2>
        <p className="mx-auto mt-5 max-w-[58ch] text-lead text-serra-100">
          Copiadas na íntegra, sem corte e sem retoque. Quase todas fazem
          questão de dizer o nome de quem atendeu.
        </p>
      </div>

      {/* Seta em cada borda, tres cartoes por vez, sem autoplay. */}
      <div className="relative mx-auto mt-12 max-w-[84rem] px-4 md:px-16">
        <button
          type="button"
          onClick={() => irPara(pagina - 1)}
          disabled={pagina === 0}
          aria-label="Depoimentos anteriores"
          className="seta absolute top-1/2 left-1 z-10 -translate-y-1/2 md:left-3"
        >
          <IconeSeta className="size-5 rotate-180" />
        </button>

        <ul
          ref={trilho}
          className="trilho grid snap-x snap-mandatory grid-flow-col gap-5 overflow-x-auto pb-2 [grid-auto-columns:100%] sm:[grid-auto-columns:calc(50%-0.625rem)] lg:[grid-auto-columns:calc(33.333%-0.834rem)]"
          aria-label="Depoimentos de clientes no Google"
        >
          {DEPOIMENTOS.map((d, i) => (
            <li
              key={d.slug}
              className="depo-entra flex snap-start"
              style={{ ["--i" as string]: i % 3 }}
            >
              <Cartao d={d} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => irPara(pagina + 1)}
          disabled={pagina >= paginas - 1}
          aria-label="Próximos depoimentos"
          className="seta absolute top-1/2 right-1 z-10 -translate-y-1/2 md:right-3"
        >
          <IconeSeta className="size-5" />
        </button>
      </div>

      <div className="relative mx-auto mt-8 flex max-w-[76rem] flex-wrap items-center justify-center gap-3 px-5">
        {Array.from({ length: paginas }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para a página ${i + 1} de depoimentos`}
            aria-current={i === pagina}
            onClick={() => irPara(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === pagina ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function Cartao({ d }: { d: Depoimento }) {
  return (
    <a
      href={d.link}
      target="_blank"
      rel="noopener noreferrer"
      className="depo-cartao group relative flex w-full flex-col overflow-hidden rounded-serra-xl bg-white p-7 shadow-alta md:p-8"
    >
      {/* Fio de cor que corre no topo do cartao ao passar o ponteiro. */}
      <span aria-hidden className="depo-fio" />
      {/* O depoimento mais longo tem 3x o tamanho do mais curto e esticava os
          tres cartoes da pagina. O corte deixa os curtos inteiros e so encurta
          os dois maiores, que continuam abrindo completos no Google. */}
      <p className="aspa relative line-clamp-[11] flex-1 text-[1.0625rem] leading-relaxed text-corpo">
        {d.texto}
      </p>

      <div className="relative mt-6 flex items-center gap-3.5 border-t border-linha pt-5">
        <Image
          src={d.foto}
          alt=""
          width={52}
          height={52}
          className="size-13 shrink-0 rounded-full bg-pedra-200 object-cover ring-2 ring-serra-100"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[1.0625rem] font-bold text-tinta">
            {d.autor}
          </p>
          <p className="mt-0.5 flex items-center gap-2">
            <Estrelas nota={d.estrelas} />
            <span className="text-[0.8125rem] text-pedra-600">{d.data}</span>
          </p>
        </div>
        <IconeGoogle className="size-5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
      </div>
    </a>
  );
}

function Estrelas({ nota }: { nota: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${nota} de 5 estrelas`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`size-[0.9375rem] ${i < nota ? "text-ouro" : "text-pedra-400"}`}
          fill="currentColor"
          aria-hidden
        >
          <path d="M10 1.6l2.47 5.28 5.53.73-4.08 3.9 1.05 5.62L10 14.42l-4.97 2.71 1.05-5.62L2 7.61l5.53-.73z" />
        </svg>
      ))}
    </span>
  );
}
