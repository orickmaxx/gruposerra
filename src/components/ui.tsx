import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Largura de leitura e respiro vertical unicos do site.
 *
 * SUPERFICIES. A medicao da versao anterior deu 75,5% da pagina em branco ou
 * cinza e 2,1% de area com cor: seis faixas seguidas quase identicas, porque
 * "papel" era 2% diferente do branco e quase toda secao caia no padrao. Agora
 * sao seis degraus de verdade, e a home nunca repete o mesmo em vizinhas.
 *
 *   branco ... o respiro, usado com parcimonia
 *   papel .... azul-gelo institucional
 *   areia .... quente, vizinha das zonas de terracota e ouro
 *   azul ..... azul cheio da marca, texto branco
 *   escuro ... o quase preto azulado, para os momentos dramaticos
 */
export function Faixa({
  children,
  fundo = "branco",
  className = "",
  id,
  revela = true,
}: {
  children: ReactNode;
  fundo?: "branco" | "papel" | "areia" | "azul" | "escuro";
  className?: string;
  id?: string;
  revela?: boolean;
}) {
  const fundos = {
    branco: "bg-white",
    papel: "bg-papel",
    areia: "bg-areia",
    azul: "faixa-escura mat-azul text-serra-100",
    escuro: "faixa-escura malha-escura text-serra-100",
  } as const;
  return (
    <section id={id} className={`${fundos[fundo]} ${className}`}>
      <div
        className="mx-auto max-w-[76rem] px-5 py-12 md:py-20"
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
  centro = false,
}: {
  children: ReactNode;
  apoio?: ReactNode;
  claro?: boolean;
  /**
   * Cabeca centralizada.
   *
   * A pagina inteira estava alinhada a esquerda, secao apos secao, e o dono
   * apontou que isso deixa tudo com a mesma cadencia. As secoes de OFERTA
   * (planos, servicos, unidades, clube, duvidas) passam a abrir centralizadas,
   * que e o gesto de landing page, e as de NARRATIVA (historia, como funciona)
   * continuam a esquerda, que e o gesto de leitura. A alternancia e o que da
   * ritmo horizontal a pagina.
   */
  centro?: boolean;
}) {
  return (
    <div className={centro ? "mx-auto max-w-[46rem] text-center" : "max-w-[34ch]"}>
      <h2 className={`text-t2 ${claro ? "text-white" : ""}`}>{children}</h2>
      {apoio ? (
        <p
          className={`mt-5 text-lead ${centro ? "mx-auto max-w-[58ch]" : "max-w-[58ch]"} ${
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
