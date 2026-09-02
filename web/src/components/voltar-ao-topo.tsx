"use client";

import { useEffect, useState } from "react";
import { IconeAbaixo } from "./icones";

/**
 * Voltar ao topo.
 *
 * A home tem mais de 13 mil pixels no desktop e mais de 22 mil no celular.
 * Sem isto, quem chega no rodapé e quer o telefone precisa rolar tudo de volta.
 *
 * Fica ACIMA do WhatsApp flutuante, que por sua vez fica acima da barra de
 * ligar: a ordem de empilhamento respeita a prioridade do produto, e o telefone
 * de emergência nunca perde espaço para nada.
 */
export function VoltarAoTopo() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 1400);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  if (!visivel) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Voltar ao topo da página"
      className="fixed right-4 bottom-[10rem] z-40 inline-flex size-12 items-center justify-center rounded-full border border-linha bg-white text-serra-600 shadow-media transition-all duration-300 hover:-translate-y-1 hover:shadow-alta md:right-6 md:bottom-[6.5rem]"
    >
      <IconeAbaixo className="size-6 rotate-180" />
    </button>
  );
}
