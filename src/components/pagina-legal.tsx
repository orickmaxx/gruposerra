import type { ReactNode } from "react";
import { BarraFixaCelular } from "./barra-emergencia";

/**
 * Casca das páginas legais.
 *
 * O Florees tem um `legal.css` só para isso, e faz sentido: texto jurídico se
 * lê em coluna estreita, com numeração visível e âncora em cada seção, para dar
 * para mandar o link direto do artigo que interessa.
 */
export function PaginaLegal({
  titulo,
  atualizado,
  resumo,
  children,
}: {
  titulo: string;
  atualizado: string;
  resumo: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="malha border-b border-linha">
        <div className="mx-auto max-w-[52rem] px-5 py-14 md:py-18">
          <h1 className="text-t1">{titulo}</h1>
          <p className="mt-5 max-w-[58ch] text-lead text-pedra-600">{resumo}</p>
          <p className="mt-6 text-[0.875rem] text-pedra-600">
            Última atualização: {atualizado}
          </p>
        </div>
      </div>

      <article className="mx-auto max-w-[52rem] px-5 py-14 md:py-20">{children}</article>
      <BarraFixaCelular />
    </>
  );
}

export function Secao({
  n,
  titulo,
  children,
}: {
  n: number;
  titulo: string;
  children: ReactNode;
}) {
  const id = `secao-${n}`;
  return (
    <section id={id} className="mt-12 scroll-mt-32 first:mt-0">
      <h2 className="font-display text-[1.375rem] font-bold text-tinta">
        <a href={`#${id}`} className="link-texto">
          {n}. {titulo}
        </a>
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-corpo">{children}</div>
    </section>
  );
}

export function Lista({ itens }: { itens: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 border-l-2 border-serra-200 pl-5">
      {itens.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
