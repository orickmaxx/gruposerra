"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import {
  CHAVE_CONSENTIMENTO,
  MEDICAO,
  TEM_MEDICAO,
  type Consentimento,
} from "@/lib/medicao";
import { IconeFechar } from "./icones";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: ((...a: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

/**
 * Aviso de cookies em conformidade com a LGPD, com Google Consent Mode v2.
 *
 * A política do site ATUAL do cliente não nomeia a empresa, não traz o CNPJ, não
 * indica encarregado de dados e o banner só tem o botão "Aceitar", sem opção de
 * recusar (ver CLAUDE.md 9.5). Nada disso atende à LGPD.
 *
 * Aqui:
 *  - as tags entram com consentimento NEGADO por padrão, no <head>, antes de
 *    tudo (ver lib/medicao.ts);
 *  - RECUSAR tem o mesmo peso visual de aceitar, não é um link escondido;
 *  - a escolha fica em `localStorage`, no navegador da pessoa;
 *  - qualquer elemento com `data-cookies-abrir` reabre as preferências, então o
 *    rodapé pode oferecer "rever minha escolha" a qualquer momento;
 *  - as tags só são montadas na página DEPOIS do aceite.
 */
/* =========================================================================
   A ESCOLHA MORA NO `localStorage`, ENTÃO ELA É UMA LOJA EXTERNA.

   ⛔ A versão anterior lia o `localStorage` dentro de um `useEffect` e chamava
   `setEscolha` ali mesmo. Funcionava e tinha três defeitos:

     1. um render em cascata em toda visita, só para descobrir o que já estava
        decidido antes de a página abrir;
     2. duas abas do site discordavam entre si. Aceitar numa não fechava o
        banner na outra, e a segunda continuava com as tags desligadas;
     3. era exatamente o padrão que o `react-hooks/set-state-in-effect` acusa,
        o único erro vermelho que sobrava no repositório.

   `useSyncExternalStore` é a ferramenta feita para isto. O `subscribe` ouve o
   evento `storage` (que é o que atravessa abas) mais um evento próprio para a
   aba que fez a escolha, já que `storage` não dispara em quem escreveu.

   Os TRÊS valores são distintos de propósito:
     `undefined` .. ainda não se sabe (é o que o servidor devolve)
     `null` ....... sabe-se que não há escolha guardada, então o banner abre
     "aceito" / "recusado" .. a escolha da pessoa

   Se `undefined` e `null` fossem a mesma coisa, o HTML do servidor traria o
   banner para todo mundo, inclusive para quem já aceitou meses atrás.
   ========================================================================= */

const EVENTO = "serra:consentimento";

function assinar(aoMudar: () => void) {
  window.addEventListener("storage", aoMudar);
  window.addEventListener(EVENTO, aoMudar);
  return () => {
    window.removeEventListener("storage", aoMudar);
    window.removeEventListener(EVENTO, aoMudar);
  };
}

/* Devolve string ou `null`, nunca um objeto novo: `useSyncExternalStore`
   compara por identidade e um valor recriado a cada leitura entra em laço. */
function lerEscolha(): Consentimento | null {
  try {
    const v = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    /* navegação privada: trata como sem escolha */
    return null;
  }
}

export function Consentimento() {
  const escolha = useSyncExternalStore(assinar, lerEscolha, () => undefined);
  const [reaberto, setReaberto] = useState(false);
  const [fechado, setFechado] = useState(false);

  /* O banner abre quando o cliente JÁ SABE que não há escolha guardada, ou
     quando alguém pede para rever. Derivado, nunca sincronizado por efeito. */
  const aberto = reaberto || (escolha === null && !fechado);

  useEffect(() => {
    /* Único efeito que sobrou, e ele faz o que efeito serve para fazer:
       assinar um sistema externo. Qualquer elemento com `data-cookies-abrir`
       reabre as preferências, então o rodapé pode oferecer isso a qualquer
       momento sem conhecer este componente. */
    const reabrir = (e: Event) => {
      const alvo = e.target as HTMLElement | null;
      if (alvo?.closest("[data-cookies-abrir]")) {
        e.preventDefault();
        setFechado(false);
        setReaberto(true);
      }
    };
    document.addEventListener("click", reabrir);
    return () => document.removeEventListener("click", reabrir);
  }, []);

  const decidir = useCallback((valor: Consentimento) => {
    try {
      localStorage.setItem(CHAVE_CONSENTIMENTO, valor);
    } catch {
      /* segue sem guardar */
    }
    const estado = valor === "aceito" ? "granted" : "denied";
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    gtag("consent", "update", {
      ad_storage: estado,
      ad_user_data: estado,
      ad_personalization: estado,
      analytics_storage: estado,
    });
    setReaberto(false);
    setFechado(true);
    /* Avisa esta aba. As outras já ouvem o `storage` do próprio navegador. */
    window.dispatchEvent(new Event(EVENTO));
  }, []);

  const podeMedir = escolha === "aceito";

  return (
    <>
      {/* As tags só existem na página depois do aceite. */}
      {podeMedir && TEM_MEDICAO && (
        <>
          {MEDICAO.gtm && (
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${MEDICAO.gtm}');`}
            </Script>
          )}

          {MEDICAO.ga4 && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${MEDICAO.ga4}`}
                strategy="afterInteractive"
              />
              <Script id="ga4" strategy="afterInteractive">
                {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${MEDICAO.ga4}',{anonymize_ip:true});`}
              </Script>
            </>
          )}

          {MEDICAO.metaPixel && (
            <Script id="meta-pixel" strategy="afterInteractive">
              {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${MEDICAO.metaPixel}');fbq('track','PageView');`}
            </Script>
          )}
        </>
      )}

      {aberto && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookies-titulo"
          className="fixed inset-x-0 bottom-0 z-[60] p-3 md:p-5"
        >
          <div className="mx-auto max-w-[52rem] rounded-serra-lg border border-linha bg-white p-6 shadow-alta md:p-7">
            <div className="flex items-start justify-between gap-4">
              <h2 id="cookies-titulo" className="font-display text-[1.1875rem] font-bold text-tinta">
                Cookies e seus dados
              </h2>
              <button
                type="button"
                onClick={() => decidir("recusado")}
                aria-label="Fechar e recusar os cookies opcionais"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-serra text-pedra-500 transition-colors hover:bg-pedra-100 hover:text-tinta"
              >
                <IconeFechar className="size-5" />
              </button>
            </div>

            <p className="mt-3 max-w-[68ch] text-[0.9375rem] leading-relaxed text-corpo">
              Usamos cookies necessários para o site funcionar, e gostaríamos de
              usar também os de medição, para entender o que as pessoas procuram
              aqui. Os de medição só entram se você concordar, e você pode mudar
              de ideia depois.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => decidir("aceito")}
                className="botao-cheio min-h-[3rem] flex-1 rounded-serra px-5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Aceitar
              </button>
              <button
                type="button"
                onClick={() => decidir("recusado")}
                className="min-h-[3rem] flex-1 rounded-serra border border-serra-300 bg-white px-5 font-semibold text-serra-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-400 hover:bg-serra-50"
              >
                Recusar
              </button>
              <Link
                href="/privacidade"
                className="link-texto inline-flex min-h-[3rem] items-center justify-center px-2 text-[0.9375rem] font-semibold text-pedra-700"
              >
                Ler a política
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
