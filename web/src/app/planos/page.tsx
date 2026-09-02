import type { Metadata } from "next";
import Link from "next/link";
import { INCLUSOS, PLANOS, PLANOS_ESPECIAIS } from "@/data/planos";
import { SITE } from "@/lib/site";
import { Faixa, Pendencia, Titulo } from "@/components/ui";
import { BarraFixaCelular } from "@/components/barra-emergencia";
import { IconeConfere, IconeSeta } from "@/components/icones";

export const metadata: Metadata = {
  title: "Planos e preços",
  description:
    "Serra Essencial a partir de R$ 18,90, Pérola R$ 97,90 e Total R$ 132,90 por mês. Todos com assistência 24 horas, traslado e cobertura nacional, mais os 20 itens inclusos.",
  alternates: { canonical: "/planos" },
  openGraph: { title: "Planos e preços · Grupo Serra", url: "/planos" },
};

export default function Planos() {
  return (
    <>
      <Faixa>
        <Titulo apoio="Todo plano inclui assistência 24 horas, traslado e cobertura nacional. O que muda de um para o outro é quanta gente entra e quanto da cerimônia já está pago.">
          Planos e preços
        </Titulo>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {PLANOS.map((p) => (
            <li key={p.slug} className="flex">
              <Link
                href={`/planos/${p.slug}`}
                className={`cartao group flex w-full flex-col rounded-serra-lg border bg-white p-7 ${
                  p.destaque
                    ? "border-serra-400 shadow-media ring-1 ring-serra-200"
                    : "border-linha shadow-baixa"
                }`}
              >
                <h2 className="text-t3">{p.nome}</h2>
                <p className="mt-1.5 text-[0.9375rem] font-medium text-pedra-600">{p.chamada}</p>
                <p className="numerais mt-6 flex items-baseline gap-1">
                  <span className="font-display text-[1.375rem] font-bold text-pedra-600">R$</span>
                  <span className="font-display text-[2.75rem] leading-none font-extrabold text-tinta">
                    {p.preco!.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[1.0625rem] text-pedra-600">/mês</span>
                </p>
                <p className="mt-5 flex-1 border-t border-linha pt-5 text-[0.9375rem] leading-relaxed text-corpo">
                  {p.descricao}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 font-semibold text-serra-600">
                  Ver o plano
                  <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2">
          {PLANOS_ESPECIAIS.map((p) => (
            <li key={p.slug} className="flex">
              <Link
                href={`/planos/${p.slug}`}
                className="cartao group flex w-full flex-col rounded-serra-lg border border-linha bg-white p-6 shadow-baixa"
              >
                <h2 className="font-display text-[1.1875rem] font-bold text-tinta">{p.nome}</h2>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-corpo">
                  {p.descricao}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 font-semibold text-serra-600">
                  Ver o plano
                  <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-20 text-t2">Os 20 itens que todo plano inclui</h2>
        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUSOS.map(({ item, nota }) => (
            <li key={item} className="flex gap-3 border-b border-linha pb-3 text-corpo">
              <IconeConfere className="mt-1 size-[1.05rem] shrink-0 text-serra-500" />
              <span>
                {item}
                {nota ? <span className="block text-[0.875rem] text-pedra-600">{nota}</span> : null}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-[74ch]">
          <Pendencia>
            <strong className="font-semibold text-tinta">Falta publicar aqui:</strong> carência,
            limite de idade e regra de reajuste. Precisam vir do Grupo Serra por escrito antes de o
            site ir ao ar. Nenhum deles foi estimado.
          </Pendencia>
        </div>

        <p className="mt-8 text-[0.9375rem] text-pedra-600">
          Dúvida sobre qual escolher? Fale no WhatsApp {SITE.whatsapp.rotulo}.
        </p>
      </Faixa>
      <BarraFixaCelular />
    </>
  );
}
