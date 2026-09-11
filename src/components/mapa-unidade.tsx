"use client";

import { useState } from "react";
import { IconeLocal, IconeSeta } from "./icones";

/**
 * Mini mapa da unidade, carregado só quando alguém pede.
 *
 * ⛔ O IFRAME NÃO NASCE NA PÁGINA. Um `<iframe>` do Google Maps é um documento
 * inteiro: traz o próprio JavaScript, as próprias fontes, os próprios tiles e o
 * próprio conjunto de cookies de terceiro. Oito unidades, oito iframes, e a
 * página de unidades ficaria mais pesada que a home inteira, com oito conexões
 * ao Google antes de a pessoa ter pedido mapa nenhum. Isso também é problema de
 * LGPD: carregar um embed de terceiro sem gesto é entregar o IP de quem visita
 * sem ter perguntado.
 *
 * Então: um cartão com o endereço e dois botões. "Ver o mapa" troca o cartão
 * pelo iframe, ali mesmo. "Traçar rota" abre o app de mapas já com o destino
 * preenchido, que é o que alguém dirigindo de madrugada realmente quer.
 *
 * O embed usa `output=embed`, que não exige chave de API. Trocar por Maps
 * Embed API com chave é possível depois; enquanto não houver conta do cliente,
 * chave inventada não entra no código.
 */
export function MapaUnidade({
  endereco,
  nome,
  className = "",
}: {
  endereco: string;
  nome: string;
  className?: string;
}) {
  const [aberto, setAberto] = useState(false);
  const busca = encodeURIComponent(`${nome}, ${endereco}`);

  return (
    <div className={`overflow-hidden rounded-serra border border-linha ${className}`}>
      {aberto ? (
        <iframe
          title={`Mapa da unidade ${nome}`}
          src={`https://www.google.com/maps?q=${busca}&output=embed&hl=pt-BR`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[14rem] w-full border-0"
        />
      ) : (
        <div className="flex flex-col gap-3 bg-serra-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-corpo">
            <IconeLocal className="mt-0.5 size-[1.05rem] shrink-0 text-serra-500" />
            <span>{endereco}</span>
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAberto(true)}
              className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-serra border border-serra-300 bg-white px-4 text-[0.9375rem] font-semibold text-serra-700 transition-colors hover:border-serra-500 hover:bg-serra-100"
            >
              <IconeLocal className="size-[1.05rem] shrink-0" />
              Ver o mapa
            </button>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${busca}`}
              target="_blank"
              rel="noopener noreferrer"
              className="botao-cheio varre group inline-flex min-h-[2.75rem] items-center gap-2 rounded-serra px-4 text-[0.9375rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-[1] inline-flex items-center gap-2">
                Traçar rota
                <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
