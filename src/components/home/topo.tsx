import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { Botao } from "../ui";
import {
  IconeAmparo,
  IconeGoogle,
  IconeSeta,
  IconeTelefone,
  IconeVela,
} from "../icones";

/**
 * Primeiro viewport.
 */
export function Topo() {
  const cidades = [...new Set(UNIDADES.map((u) => u.cidade))];

  return (
    <>
      <section className="malha relative overflow-hidden">
        {/* Marca d'agua do simbolo, recortado do logotipo HD real do cliente. */}
        <Image
          src="/marca/simbolo-serra.png"
          alt=""
          width={379}
          height={376}
          aria-hidden
          priority
          className="pointer-events-none absolute -top-24 -right-24 w-[30rem] max-w-none opacity-[0.05] md:-right-32 md:w-[42rem] lg:opacity-[0.07]"
        />

        <div className="relative mx-auto grid max-w-[80rem] items-start gap-14 px-5 pt-14 pb-16 md:pt-20 lg:grid-cols-[1.1fr_minmax(0,24rem)] lg:gap-16 lg:pb-24">
          <div className="revela">
            <SeloGoogle />

            <h1 className="mt-7 max-w-[15ch] text-hero" style={{ ["--i" as string]: 1 }}>
              Estamos perto, e atendemos a qualquer hora.
            </h1>

            <p
              className="mt-7 max-w-[52ch] text-lead text-pedra-600"
              style={{ ["--i" as string]: 2 }}
            >
              O Grupo Serra atende famílias na região de Campinas{" "}
              {SITE.idadeTexto}. São {UNIDADES.length} unidades, e o telefone do
              atendimento de óbito não fecha nunca, nem no fim de semana, nem no
              feriado.
            </p>

            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ ["--i" as string]: 3 }}
            >
              <Botao
                href={`tel:${SITE.emergencia.tel}`}
                externo
                icone={<IconeTelefone className="size-5 shrink-0" />}
              >
                Ligar agora, {SITE.emergencia.rotulo}
              </Botao>
              <Botao href="/planos" tom="contorno">
                Ver planos e preços
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Botao>
            </div>

            <p
              className="mt-7 max-w-[52ch] text-[0.9375rem] text-pedra-600"
              style={{ ["--i" as string]: 4 }}
            >
              Atendimento em {cidades.join(", ")}.
            </p>
          </div>

          <ListaTelefones />
        </div>
      </section>

      <Caminhos />
    </>
  );
}

/**
 * Selo do Google.
 *
 * ⛔ SEM contagem. O dono pediu o icone e as cinco estrelas, sem numero, e a
 * razao e boa: "9 famílias contaram no Google" e um numero pequeno que trabalha
 * CONTRA a prova social. Nove avaliacoes nao impressionam ninguem; cinco
 * estrelas cheias, sim. A contagem continua no carrossel para quem quiser
 * conferir, e cada depoimento leva ao Google de origem.
 */
function SeloGoogle() {
  return (
    <a
      href="#depoimentos"
      className="group inline-flex items-center gap-3 rounded-full border border-serra-200/80 bg-white/80 py-2.5 pr-5 pl-3 shadow-baixa backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-300 hover:shadow-media"
      style={{ ["--i" as string]: 0 }}
    >
      <IconeGoogle className="size-6 shrink-0" />
      <span className="flex items-center gap-1" role="img" aria-label="5 de 5 estrelas">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className="size-[1.0625rem] text-ouro"
            fill="currentColor"
            aria-hidden
          >
            <path d="M10 1.6l2.47 5.28 5.53.73-4.08 3.9 1.05 5.62L10 14.42l-4.97 2.71 1.05-5.62L2 7.61l5.53-.73z" />
          </svg>
        ))}
      </span>
      <span className="text-[0.9375rem] font-semibold text-tinta">
        Avaliações de famílias no Google
      </span>
      <IconeSeta className="size-4 shrink-0 rotate-90 text-pedra-400 transition-transform duration-300 group-hover:translate-y-0.5" />
    </a>
  );
}

/**
 * A coluna direita do herói: o telefone da cidade da pessoa, sem rolar nada.
 */
function ListaTelefones() {
  return (
    <aside className="vidro overflow-hidden rounded-serra-lg border border-white/70 shadow-alta lg:mt-2">
      <h2 className="border-b border-linha/80 px-6 py-4 font-display text-[1.0625rem] font-bold text-tinta">
        Ligue para a unidade mais perto
      </h2>
      <ul className="divide-y divide-linha/80">
        {UNIDADES.map((u, i) => (
          <li key={u.slug} className={i > 3 ? "hidden sm:block" : undefined}>
            <a
              href={`tel:${u.tel}`}
              className="group flex items-center justify-between gap-3 px-6 py-3 transition-colors hover:bg-serra-500/[0.07]"
            >
              <span className="text-[0.9375rem] text-corpo">
                {u.cidade}
                {u.nome.includes("Padre Anchieta") ? (
                  <span className="text-pedra-500"> · Padre Anchieta</span>
                ) : null}
                {u.matriz ? <span className="text-pedra-500"> · Centro</span> : null}
              </span>
              <span className="numerais text-[0.9375rem] font-bold whitespace-nowrap text-serra-600">
                {u.telefone}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="border-t border-linha/80 bg-white/50 px-6 py-4 text-[0.875rem] leading-relaxed text-pedra-600">
        <a href="#unidades" className="link-texto font-semibold text-serra-600 sm:hidden">
          Ver as {UNIDADES.length} unidades
        </a>
        <span className="sm:hidden"> · </span>
        Óbito é atendido 24 horas, todos os dias.
      </p>
    </aside>
  );
}

/**
 * Roteador por intenção.
 *
 * ⛔ O que estava aqui: tres cartoes brancos com "Segunda via", "Obituário" e
 * "Falar no WhatsApp". O dono chamou de "sem destaque ou inúteis" e as duas
 * coisas eram verdade ao mesmo tempo: eram palidos E repetiam exatamente os
 * tres links que agora moram na faixa de utilidades do topo.
 *
 * No lugar entrou outra pergunta. Quem abre este site chega por UM de tres
 * motivos, e cada motivo quer uma pagina diferente. A faixa pergunta o motivo e
 * leva direto. Em azul cheio, entao e impossivel passar batido, e ainda da o
 * degrau de cor que faltava logo abaixo do herói.
 */
function Caminhos() {
  const caminhos = [
    {
      href: `tel:${SITE.emergencia.tel}`,
      externo: true,
      Icone: IconeTelefone,
      etiqueta: "Aconteceu agora",
      titulo: "Preciso de atendimento",
      texto: "Ligue e alguém assume tudo a partir daí, a qualquer hora do dia ou da noite.",
      acao: SITE.emergencia.rotulo,
    },
    {
      href: "/planos",
      externo: false,
      Icone: IconeAmparo,
      etiqueta: "Quero me antecipar",
      titulo: "Contratar um plano",
      texto: "A partir de R$ 18,90 por mês, com assistência 24 horas e traslado inclusos.",
      acao: "Ver planos e preços",
    },
    {
      href: "/obituario",
      externo: false,
      Icone: IconeVela,
      etiqueta: "Vou a uma despedida",
      titulo: "Procuro um velório",
      texto: "Local e horário da cerimônia, atualizado ao longo do dia.",
      acao: "Abrir o obituário",
    },
  ];

  return (
    <section
      className="mat-azul faixa-escura relative overflow-hidden"
      aria-label="Por onde começar"
    >
      <ul className="mx-auto grid max-w-[80rem] md:grid-cols-3" data-revela>
        {caminhos.map(({ href, externo, Icone, etiqueta, titulo, texto, acao }, i) => {
          const miolo = (
            <>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-serra bg-white/15 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-serra-600">
                <Icone className="size-6" />
              </span>
              <span className="mt-6 block text-[0.8125rem] font-bold tracking-[0.14em] text-serra-200 uppercase">
                {etiqueta}
              </span>
              <span className="mt-2 block font-display text-[1.375rem] font-bold text-white">
                {titulo}
              </span>
              <span className="mt-2.5 block max-w-[34ch] flex-1 text-[0.9375rem] leading-relaxed text-serra-100/85">
                {texto}
              </span>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">
                <span className="numerais border-b border-white/40 pb-0.5 transition-colors group-hover:border-white">
                  {acao}
                </span>
                <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </>
          );
          const classe =
            "group flex h-full flex-col px-6 py-10 transition-colors duration-300 hover:bg-white/[0.07] md:px-9 md:py-12";
          return (
            <li
              key={titulo}
              className={`flex ${
                i > 0 ? "border-t border-white/12 md:border-t-0 md:border-l" : ""
              }`}
            >
              {externo ? (
                <a href={href} className={classe}>
                  {miolo}
                </a>
              ) : (
                <Link href={href} className={classe}>
                  {miolo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
