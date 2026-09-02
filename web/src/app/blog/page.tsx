import type { Metadata } from "next";
import Link from "next/link";
import { ARTIGOS } from "@/data/artigos";
import { Faixa, Titulo } from "@/components/ui";
import { IconeRelogio, IconeSeta } from "@/components/icones";
import { BarraFixaCelular } from "@/components/barra-emergencia";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Textos práticos sobre o que fazer quando alguém morre, sobre luto e sobre planejamento funerário. Escritos pelo Grupo Serra, sem enrolação.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog do Grupo Serra", url: "/blog" },
};

export default function Blog() {
  return (
    <>
      <Faixa>
        <Titulo apoio="Textos práticos para quem está passando por isso agora, e para quem quer se organizar antes. Nenhum deles vende nada.">
          Blog
        </Titulo>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {ARTIGOS.map((a) => (
            <li key={a.slug} className="flex">
              <Link
                href={`/blog/${a.slug}`}
                className="cartao group flex h-full flex-col rounded-serra-lg border border-linha bg-white p-7 shadow-baixa"
              >
                <p className="flex items-center gap-3 text-[0.8125rem] font-semibold text-serra-600">
                  <span className="rounded-full bg-serra-500/10 px-3 py-1">{a.categoria}</span>
                  <span className="inline-flex items-center gap-1.5 text-pedra-600">
                    <IconeRelogio className="size-4 shrink-0" />
                    {a.minutos} min
                  </span>
                </p>
                <h2 className="mt-4 font-display text-[1.25rem] leading-snug font-bold text-tinta">
                  {a.titulo}
                </h2>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-corpo">
                  {a.resumo}
                </p>
                <p className="mt-5 inline-flex items-center gap-2 border-t border-linha pt-4 font-semibold text-serra-600">
                  Ler
                  <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Faixa>
      <BarraFixaCelular />
    </>
  );
}
