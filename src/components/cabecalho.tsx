"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { IconeBoleto, IconeFechar, IconeMenu, IconeWhatsApp } from "./icones";

export function Cabecalho() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header className="vidro sticky top-0 z-40 border-b border-linha/70">
      <div className="mx-auto flex max-w-[76rem] items-center gap-4 px-5 py-3.5">
        <Link
          href="/"
          className="shrink-0"
          aria-label={`${SITE.nomeCompleto}, ir para a página inicial`}
        >
          <Image
            src="/marca/logo-grupo-serra.png"
            alt=""
            width={485}
            height={130}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav aria-label="Principal" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-serra px-3 py-2 text-[0.9375rem] font-semibold text-pedra-700 transition-colors hover:bg-serra-500/10 hover:text-serra-600"
                >
                  {l.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={SITE.externos.segundaVia}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-serra border border-serra-200 bg-white/80 px-4 py-2.5 text-[0.9375rem] font-semibold text-serra-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-400 hover:bg-serra-50 sm:inline-flex"
          >
            <IconeBoleto className="size-[1.15rem] shrink-0" />
            Segunda via
          </a>
          <a
            href={SITE.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="botao-cheio hidden items-center gap-2 rounded-serra px-4 py-2.5 text-[0.9375rem] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
          >
            <IconeWhatsApp className="size-[1.15rem] shrink-0" />
            Falar agora
          </a>
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-celular"
            className="inline-flex size-11 items-center justify-center rounded-serra border border-linha text-tinta lg:hidden"
          >
            {aberto ? <IconeFechar titulo="Fechar menu" /> : <IconeMenu titulo="Abrir menu" />}
          </button>
        </div>
      </div>

      {aberto && (
        <div id="menu-celular" className="border-t border-linha bg-white lg:hidden">
          <nav aria-label="Principal, celular" className="mx-auto max-w-[76rem] px-5 py-3">
            <ul className="divide-y divide-linha">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setAberto(false)}
                    className="block py-3.5 text-lg font-medium text-tinta"
                  >
                    {l.rotulo}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SITE.externos.segundaVia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-3.5 text-lg font-medium text-serra-600"
                >
                  <IconeBoleto className="size-5 shrink-0" />
                  Segunda via de boleto
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
