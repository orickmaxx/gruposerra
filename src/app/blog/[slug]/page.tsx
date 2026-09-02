import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTIGOS, artigoPor } from "@/data/artigos";
import { SITE } from "@/lib/site";
import { IconeRelogio, IconeSeta, IconeTelefone } from "@/components/icones";
import { BarraFixaCelular } from "@/components/barra-emergencia";

export function generateStaticParams() {
  return ARTIGOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = artigoPor(slug);
  if (!a) return {};
  return {
    title: a.titulo,
    description: a.resumo,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titulo,
      description: a.resumo,
      url: `/blog/${a.slug}`,
      publishedTime: a.atualizado,
    },
  };
}

export default async function Artigo({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const a = artigoPor(slug);
  if (!a) notFound();

  const dados = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.titulo,
    description: a.resumo,
    dateModified: a.atualizado,
    datePublished: a.atualizado,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: SITE.nomeCompleto },
    publisher: { "@id": `${SITE.url}/#organizacao` },
    mainEntityOfPage: `${SITE.url}/blog/${a.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
      />

      <article className="mx-auto max-w-[46rem] px-5 py-16 md:py-24">
        <Link href="/blog" className="link-texto text-[0.9375rem] font-semibold text-serra-600">
          Voltar para o blog
        </Link>

        <p className="mt-8 flex items-center gap-3 text-[0.8125rem] font-semibold text-serra-600">
          <span className="rounded-full bg-serra-500/10 px-3 py-1">{a.categoria}</span>
          <span className="inline-flex items-center gap-1.5 text-pedra-600">
            <IconeRelogio className="size-4 shrink-0" />
            {a.minutos} min de leitura
          </span>
        </p>

        <h1 className="mt-4 text-t1">{a.titulo}</h1>
        <p className="mt-5 text-lead text-pedra-600">{a.resumo}</p>

        <div className="mt-10 space-y-5">
          {a.blocos.map((b, i) =>
            b.t === "h" ? (
              <h2 key={i} className="pt-5 font-display text-[1.375rem] font-bold text-tinta">
                {b.texto}
              </h2>
            ) : b.t === "lista" ? (
              <ul key={i} className="space-y-3 border-l-2 border-serra-200 pl-5">
                {b.itens.map((it) => (
                  <li key={it} className="leading-relaxed text-corpo">
                    {it}
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i} className="text-[1.0625rem] leading-relaxed text-corpo">
                {b.texto}
              </p>
            )
          )}
        </div>

        <aside className="mt-14 rounded-serra-lg border border-serra-200 bg-serra-50 p-7">
          <h2 className="font-display text-[1.1875rem] font-bold text-tinta">
            Precisa de atendimento agora?
          </h2>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-corpo">
            O plantão do Grupo Serra atende óbito 24 horas, todos os dias, nas 8
            unidades da região de Campinas.
          </p>
          <a
            href={`tel:${SITE.emergencia.tel}`}
            className="botao-cheio mt-5 inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <IconeTelefone className="size-5 shrink-0" />
            <span className="numerais">{SITE.emergencia.rotulo}</span>
          </a>
        </aside>

        <nav className="mt-12 border-t border-linha pt-8">
          <p className="font-display text-[1.0625rem] font-bold text-tinta">Leia também</p>
          <ul className="mt-4 space-y-3">
            {ARTIGOS.filter((o) => o.slug !== a.slug).map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/blog/${o.slug}`}
                  className="group inline-flex items-center gap-2 font-semibold text-serra-600"
                >
                  {o.titulo}
                  <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <BarraFixaCelular />
    </>
  );
}
