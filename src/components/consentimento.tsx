"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
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
export function Consentimento() {
  const [escolha, setEscolha] = useState<Consentimento | null>(null);
  const [aberto, setAberto] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(CHAVE_CONSENTIMENTO);
    } catch {
      /* navegação privada: trata como sem escolha */
    }
    if (guardado === "aceito" || guardado === "recusado") {
      setEscolha(guardado);
    } else {
      setAberto(true);
    }

    const reabrir = (e: Event) => {
      const alvo = e.target as HTMLElement | null;
      if (alvo?.closest("[data-cookies-abrir]")) {
        e.preventDefault();
        setAberto(true);
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
    // eslint-disable-next-line prefer-rest-params
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    gtag("consent", "update", {
      ad_storage: estado,
      ad_user_data: estado,
      ad_personalization: estado,
      analytics_storage: estado,
    });
    setEscolha(valor);
    setAberto(false);
  }, []);

  const podeMedir = escolha === "aceito";

  return (
    <>
      {/* As tags só existem na página depois do aceite. */}
      {montado && podeMedir && TEM_MEDICAO && (
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
