import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { INCLUSOS, PLANOS, PLANOS_ESPECIAIS } from "@/data/planos";
import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { Pendencia } from "@/components/ui";
import { BarraFixaCelular } from "@/components/barra-emergencia";
import { IconeConfere, IconeTelefone, IconeWhatsApp } from "@/components/icones";

/**
 * Uma página por plano.
 *
 * O Florees tem seis páginas dedicadas, cada uma com título e Open Graph
 * próprios. Nós tínhamos uma rota só, esboçada. Página por plano é o que faz
 * cada um aparecer sozinho na busca e é o que dá um link para mandar no
 * WhatsApp quando o vendedor está explicando UM plano específico.
 */

const TODOS = [
  ...PLANOS.map((p) => ({ ...p, especial: false as const })),
  ...PLANOS_ESPECIAIS.map((p) => ({
    ...p,
    preco: undefined as number | undefined,
    chamada: "",
    destaques: [] as string[],
    especial: true as const,
  })),
];

const achar = (slug: string) => TODOS.find((p) => p.slug === slug);

export function generateStaticParams() {
  return TODOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/planos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = achar(slug);
  if (!p) return {};
  const desc = p.preco
    ? `${p.nome}: a partir de R$ ${p.preco.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
      })} por mês, com assistência 24 horas e traslado. ${p.descricao}`
    : `${p.nome}. ${p.descricao}`;
  return {
    title: p.nome,
    description: desc.slice(0, 175),
    alternates: { canonical: `/planos/${p.slug}` },
    openGraph: {
      title: `${p.nome} · Grupo Serra`,
      description: desc.slice(0, 175),
      url: `/planos/${p.slug}`,
    },
  };
}

export default async function Plano({ params }: PageProps<"/planos/[slug]">) {
  const { slug } = await params;
  const p = achar(slug);
  if (!p) notFound();

  const dados = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nome,
    description: p.descricao,
    brand: { "@type": "Organization", name: SITE.nomeCompleto },
    ...(p.preco
      ? {
          offers: {
            "@type": "Offer",
            price: p.preco,
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            url: `${SITE.url}/planos/${p.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
      />

      <section className="malha">
        <div className="mx-auto max-w-[76rem] px-5 py-16 md:py-20">
          <Link href="/planos" className="link-texto text-[0.9375rem] font-semibold text-serra-600">
            Todos os planos
          </Link>
          <h1 className="mt-6 max-w-[16ch] text-hero">{p.nome}</h1>
          {p.chamada ? (
            <p className="mt-5 max-w-[52ch] text-lead text-pedra-600">{p.chamada}</p>
          ) : null}

          {p.preco ? (
            <>
              <p className="mt-8 text-[0.9375rem] text-pedra-600">a partir de</p>
              <p className="numerais mt-1 flex items-baseline gap-1.5">
                <span className="font-display text-[1.5rem] font-bold text-pedra-600">R$</span>
                <span className="font-display text-[3.25rem] leading-none font-extrabold text-tinta">
                  {p.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[1.125rem] text-pedra-600">/mês</span>
              </p>
            </>
          ) : (
            <p className="mt-8 max-w-[52ch] text-[0.9375rem] text-pedra-600">
              O valor sai por proposta, porque depende de quantas pessoas entram.
            </p>
          )}

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mat-zap inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
            >
              <IconeWhatsApp className="size-5 shrink-0" />
              Falar sobre este plano
            </a>
            <a
              href={`tel:${SITE.emergencia.tel}`}
              className="inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra border border-serra-300 bg-white px-6 font-semibold text-serra-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-serra-50"
            >
              <IconeTelefone className="size-5 shrink-0" />
              <span className="numerais">{SITE.emergencia.rotulo}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[76rem] px-5">
          <p className="max-w-[62ch] text-lead leading-relaxed text-corpo">{p.descricao}</p>

          {p.destaques.length > 0 ? (
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {p.destaques.map((d) => (
                <li
                  key={d}
                  className="flex gap-2.5 rounded-serra border border-linha bg-papel p-4 text-[0.9375rem] text-corpo"
                >
                  <IconeConfere className="mt-0.5 size-[1.05rem] shrink-0 text-serra-500" />
                  {d}
                </li>
              ))}
            </ul>
          ) : null}

          <h2 className="mt-16 text-t2">O que está incluso</h2>
          <p className="mt-4 max-w-[62ch] text-pedra-600">
            Vale para todos os planos do Grupo Serra, sem exceção.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUSOS.map(({ item, nota }) => (
              <li key={item} className="flex gap-3 border-b border-linha pb-3 text-corpo">
                <IconeConfere className="mt-1 size-[1.05rem] shrink-0 text-serra-500" />
                <span>
                  {item}
                  {nota ? (
                    <span className="block text-[0.875rem] text-pedra-600">{nota}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 max-w-[74ch]">
            <Pendencia>
              <strong className="font-semibold text-tinta">Antes de contratar, pergunte:</strong>{" "}
              carência, idade limite e regra de reajuste. O Grupo Serra não publica esses números, e
              este site não estima nenhum deles. Peça por escrito.
            </Pendencia>
          </div>

          <p className="mt-10 text-[0.9375rem] text-pedra-600">
            Atendimento em {[...new Set(UNIDADES.map((u) => u.cidade))].join(", ")}.
          </p>
        </div>
      </section>
      <BarraFixaCelular />
    </>
  );
}
