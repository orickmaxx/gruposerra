import Link from "next/link";
import type { ReactNode } from "react";

/** Largura de leitura e respiro vertical unicos do site. */
export function Faixa({
  children,
  fundo = "branco",
  className = "",
  id,
  revela = true,
}: {
  children: ReactNode;
  fundo?: "branco" | "papel" | "escuro";
  className?: string;
  id?: string;
  revela?: boolean;
}) {
  const fundos = {
    branco: "bg-white",
    papel: "bg-papel",
    escuro: "faixa-escura malha-escura text-serra-100",
  } as const;
  return (
    <section id={id} className={`${fundos[fundo]} ${className}`}>
      <div
        className="mx-auto max-w-[76rem] px-5 py-20 md:py-28"
        {...(revela ? { "data-revela": "" } : {})}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Cabeca de secao. Titulo e apoio, e so. Nada de rotulo miudo por cima do
 * titulo: o titulo carrega o proprio peso.
 */
export function Titulo({
  children,
  apoio,
  claro = false,
}: {
  children: ReactNode;
  apoio?: ReactNode;
  claro?: boolean;
}) {
  return (
    <div className="max-w-[34ch]">
      <h2 className={`text-t2 ${claro ? "text-white" : ""}`}>{children}</h2>
      {apoio ? (
        <p
          className={`mt-5 max-w-[58ch] text-lead ${
            claro ? "text-serra-100" : "text-pedra-600"
          }`}
        >
          {apoio}
        </p>
      ) : null}
    </div>
  );
}

type BotaoProps = {
  children: ReactNode;
  href: string;
  tom?: "azul" | "contorno" | "claro" | "vidro";
  externo?: boolean;
  className?: string;
  icone?: ReactNode;
};

export function Botao({
  children,
  href,
  tom = "azul",
  externo,
  className = "",
  icone,
}: BotaoProps) {
  const tons = {
    azul: "botao-cheio text-white hover:brightness-110",
    contorno:
      "border border-serra-200 bg-white text-serra-600 shadow-baixa hover:border-serra-400 hover:bg-serra-50",
    claro: "bg-white text-serra-700 shadow-media hover:bg-serra-50",
    vidro: "vidro-escuro border border-white/25 text-white hover:bg-white/15",
  } as const;

  const classe = `group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 text-[1.0625rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${tons[tom]} ${className}`;

  const miolo = (
    <>
      {icone}
      {children}
    </>
  );

  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classe}>
        {miolo}
      </a>
    );
  }
  return (
    <Link href={href} className={classe}>
      {miolo}
    </Link>
  );
}

/**
 * Lacuna declarada. Quando o cliente ainda nao respondeu um dado que o
 * visitante precisa (carencia, idade limite), a interface DIZ que falta em vez
 * de esconder ou de chutar. Omitir carencia em pagina de venda vira Procon.
 */
export function Pendencia({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-serra border border-dashed border-bronze/60 bg-bronze/[0.07] px-5 py-4 text-[0.9375rem] leading-relaxed text-pedra-700">
      {children}
    </p>
  );
}
