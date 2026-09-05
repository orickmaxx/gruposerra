"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { IconeBoleto, IconeFechar, IconeMenu, IconeTelefone, IconeWhatsApp } from "./icones";

/**
 * Cabeçalho.
 *
 * O que o dono derrubou, e por que ele estava certo: o cabecalho tinha
 * navegacao de sete itens MAIS "Segunda via" MAIS "Falar agora" MAIS o
 * hamburguer, tudo em 56px de altura, com o logotipo espremido em 36px. Com
 * esse acumulo nenhum botao e destaque, porque destaque e o que sobra depois
 * que o resto sai.
 *
 * Como o Florees e o Bom Pastor resolvem, e conferi lendo o HTML dos dois: os
 * telefones e as tarefas de associado moram numa faixa ACIMA do cabecalho, com
 * rotulo em cima do numero, e o cabecalho fica com marca, navegacao e UM botao.
 *
 *  - o logotipo quase dobrou (36px para 56px no desktop);
 *  - sobrou um unico botao de conversao, o WhatsApp, na cor da propria marca;
 *  - a segunda via subiu para a faixa de utilidades, e continua a um clique;
 *  - a navegacao ganhou o sublinhado que cresce da esquerda no hover.
 */
export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 10);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          rolou
            ? "vidro border-linha shadow-[0_10px_30px_-24px_rgba(9,55,80,0.55)]"
            : "border-transparent bg-white"
        }`}
      >
        <div className="mx-auto flex max-w-[80rem] items-center gap-8 px-5 py-4 lg:py-5">
          <Link
            href="/"
            className="shrink-0 transition-opacity hover:opacity-80"
            aria-label={`${SITE.nomeCompleto}, ir para a página inicial`}
          >
            <Image
              src="/marca/logo-grupo-serra.png"
              alt=""
              width={1400}
              height={376}
              priority
              className="h-11 w-auto sm:h-12 lg:h-14"
            />
          </Link>

          <nav aria-label="Principal" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="relative block rounded-serra px-3.5 py-2.5 text-[0.9375rem] font-semibold text-pedra-700 transition-colors after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-serra-500 after:transition-transform after:duration-300 hover:text-serra-600 hover:after:scale-x-100"
                  >
                    {l.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-3 lg:ml-4">
            <a
              href={SITE.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mat-zap hidden min-h-[3rem] items-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 sm:inline-flex"
            >
              <IconeWhatsApp className="size-5 shrink-0" />
              Falar agora
            </a>
            <button
              type="button"
              onClick={() => setAberto(true)}
              aria-expanded={aberto}
              aria-controls="menu-celular"
              className="inline-flex size-12 items-center justify-center rounded-serra border border-linha text-tinta transition-colors hover:border-serra-400 hover:text-serra-600 lg:hidden"
            >
              <IconeMenu titulo="Abrir menu" />
            </button>
          </div>
        </div>
      </header>

      {/* --- menu do celular: tela inteira, composta para o polegar --- */}
      {aberto && (
        <div
          id="menu-celular"
          className="malha-escura faixa-escura fixed inset-0 z-50 flex flex-col overflow-y-auto lg:hidden"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <Image
              src="/marca/logo-grupo-serra-branco.png"
              alt=""
              width={347}
              height={93}
              className="h-10 w-auto"
            />
            <button
              type="button"
              onClick={() => setAberto(false)}
              className="inline-flex size-12 items-center justify-center rounded-serra border border-white/25 text-white"
            >
              <IconeFechar titulo="Fechar menu" />
            </button>
          </div>

          <nav aria-label="Principal, celular" className="flex-1 px-5 pt-6">
            <ul className="divide-y divide-white/12 border-y border-white/12">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setAberto(false)}
                    className="block py-4 text-[1.375rem] font-bold text-white"
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
                  onClick={() => setAberto(false)}
                  className="flex items-center gap-3 py-4 text-[1.375rem] font-bold text-serra-200"
                >
                  <IconeBoleto className="size-6 shrink-0" />
                  2ª via de boleto
                </a>
              </li>
            </ul>
          </nav>

          <div className="px-5 py-8">
            <p className="text-[0.8125rem] font-bold tracking-[0.14em] text-serra-300 uppercase">
              Atendimento de óbito
            </p>
            <a
              href={`tel:${SITE.emergencia.tel}`}
              className="numerais mt-3 flex items-center gap-3 font-display text-[2rem] leading-none font-extrabold tracking-tight text-white"
            >
              <IconeTelefone className="size-7 shrink-0 text-serra-300" />
              {SITE.emergencia.rotulo}
            </a>
            <p className="mt-3 text-[0.9375rem] text-serra-200">
              24 horas, todos os dias, inclusive feriado.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
