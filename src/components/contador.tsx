"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Número que sobe quando entra na tela.
 *
 * É o único recurso que copiei direto do site do Florees, e copiei porque
 * funciona: eles têm um `statsObserver` que dispara a contagem no primeiro
 * cruzamento e nunca mais. Número que sobe faz o olho parar; número parado,
 * não. O Bom Pastor faz o mesmo, via plugin `counterup`.
 *
 * Aqui é sem biblioteca: um IntersectionObserver que se desconecta no primeiro
 * disparo e um requestAnimationFrame com desaceleração cúbica, para o número
 * chegar em vez de frear de repente.
 *
 * ⚠️ Duas armadilhas que estão resolvidas aqui de propósito:
 *
 *  1. HIDRATAÇÃO. O estado inicial é o valor FINAL, igual no servidor e no
 *     cliente. Começar em zero faria o HTML do servidor dizer "0 unidades
 *     próprias", o que é ruim para quem lê sem JS e para o buscador, além de
 *     divergir do primeiro render do cliente.
 *  2. `setState` SÍNCRONO DENTRO DO EFEITO. O zerar acontece dentro de um
 *     requestAnimationFrame, não no corpo do efeito.
 *
 * Sem JS, sem IntersectionObserver ou com `prefers-reduced-motion`, o número
 * simplesmente fica no valor final e nada anima.
 */
function podeContar() {
  if (typeof window === "undefined") return false;
  if (!("IntersectionObserver" in window)) return false;
  if (typeof window.matchMedia !== "function") return true;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Contador({
  ate,
  className = "",
  sufixo = "",
}: {
  ate: number;
  className?: string;
  sufixo?: string;
}) {
  const alvo = useRef<HTMLSpanElement>(null);
  const [valor, setValor] = useState(ate);

  useEffect(() => {
    const el = alvo.current;
    if (!el || !podeContar()) return;

    let quadro = 0;
    let obs: IntersectionObserver | null = null;

    /* Zera e arma o observador no quadro seguinte, nunca no corpo do efeito. */
    quadro = requestAnimationFrame(() => {
      setValor(0);
      obs = new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) return;
          obs?.disconnect();
          const duracao = 1200;
          const inicio = performance.now();
          const passo = (agora: number) => {
            const t = Math.min(1, (agora - inicio) / duracao);
            setValor(Math.round(ate * (1 - Math.pow(1 - t, 3))));
            if (t < 1) quadro = requestAnimationFrame(passo);
          };
          quadro = requestAnimationFrame(passo);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
    });

    return () => {
      cancelAnimationFrame(quadro);
      obs?.disconnect();
    };
  }, [ate]);

  return (
    <span ref={alvo} className={`numerais ${className}`}>
      {valor}
      {sufixo}
    </span>
  );
}
