import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { Botao, TituloCine } from "../ui";
import { Contador } from "../contador";
import { Paralaxe } from "../movimento";
import {
  IconeAmparo,
  IconeChama,
  IconeGoogle,
  IconeRelogio,
  IconeSeta,
  IconeTelefone,
  IconeVela,
  IconeLocal,
} from "../icones";

/**
 * Primeiro viewport.
 *
 * ⛔ O que estava aqui e por que saiu: uma lavagem azul clarissima, um titulo
 * preto e uma lista de telefones num cartao branco. Tecnicamente correto, e
 * morto. O dono resumiu em uma frase: "esta morto, sem cores". Ele tem razao, e
 * a razao e estrutural, nao de gosto. Numa pagina em que TODA superficie e
 * clara, nada pode ser destaque, porque destaque e diferenca. Faltava contraste
 * de VALOR, nao de saturacao.
 *
 * O que entrou:
 *
 *   FOTOGRAFIA REAL EM TELA CHEIA. A recepcao do Complexo Memorial Hortolandia,
 *   foto do proprio cliente. Uma funeraria vende uma coisa so, presenca fisica,
 *   e a unica prova disso e o lugar. Concorrente nenhum da praca mostra o
 *   predio no primeiro viewport: o Zelo abre com ilustracao, o Parque das
 *   Flores com banner de texto.
 *
 *   TRATAMENTO DE MARCA. A foto crua e bege e briga com o azul. Dessaturada,
 *   escurecida e coberta por um veu de azul institucional, ela vira material da
 *   marca sem deixar de ser o lugar de verdade.
 *
 *   PROFUNDIDADE DE VERDADE. Ken Burns de 30s, paralaxe na rolagem, grao de
 *   filme e vinheta. Nenhum desses quatro se percebe isolado. Juntos, sao a
 *   diferenca entre uma foto colada de fundo e um plano filmado.
 *
 * O que NAO mudou, e nao muda: o telefone de 24 horas continua sendo o primeiro
 * elemento acionavel da pagina, e TODO texto do herói foi medido no pixel, em
 * cima da foto ja renderizada, por `scripts/contraste-foto.mjs`: manchete
 * 9,9:1, paragrafo 9,0:1, selo 10,2:1, linha de cidades 6,0:1, contra um
 * minimo WCAG AA de 4,5:1. Cinema aqui nao pode custar um segundo a mais nem
 * um ponto de legibilidade para quem esta ligando de madrugada.
 */
export function Topo() {
  const cidades = [...new Set(UNIDADES.map((u) => u.cidade))];

  return (
    <>
      <section
        className="grao vinheta relative isolate overflow-hidden bg-serra-900 text-white"
        style={{
          marginTop: "calc(var(--alt-cabecalho) * -1)",
          paddingTop: "var(--alt-cabecalho)",
        }}
      >
        {/* --- o plano de fundo: foto real, tratada, em movimento lento --- */}
        <Paralaxe fator={0.18} className="absolute inset-0 -z-10">
          <div className="foto-marca-veu absolute inset-[-8%]">
            <Image
              src="/fotos/memorial-recepcao.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              aria-hidden
              className="kenburns foto-marca object-cover object-[60%_center]"
            />
          </div>
        </Paralaxe>

        {/* Simbolo da marca em marca d'agua, recortado do logotipo real. */}
        <Image
          src="/marca/simbolo-serra-branco.png"
          alt=""
          width={379}
          height={376}
          sizes="(min-width: 768px) 36rem, 24rem"
          aria-hidden
          priority
          className="pointer-events-none absolute -top-28 -right-28 z-[1] w-[24rem] max-w-none opacity-[0.045] md:-right-36 md:w-[36rem]"
        />

        <div className="relative z-10 mx-auto grid max-w-[80rem] items-center gap-12 px-5 pt-16 pb-14 md:pt-24 md:pb-20 lg:grid-cols-[1.15fr_minmax(0,23rem)] lg:gap-16 lg:pt-28 lg:pb-24">
          <div>
            <SeloGoogle />

            <TituloCine
              como="h1"
              entraJa
              atraso={120}
              className="mt-8 max-w-[16ch] text-hero text-white"
              linhas={["Estamos perto,", "e atendemos a", "qualquer hora."]}
            />

            <p
              className="revela-texto mt-8 max-w-[54ch] text-lead text-white/80"
              style={{ ["--i" as string]: 4 }}
            >
              O Grupo Serra atende famílias na região de Campinas {SITE.idadeTexto}.
              São {UNIDADES.length} unidades com equipe própria, e o telefone do
              atendimento de óbito não fecha nunca, nem no fim de semana, nem no
              feriado.
            </p>

            <div
              className="revela-texto mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ ["--i" as string]: 5 }}
            >
              <Botao
                href={`tel:${SITE.emergencia.tel}`}
                externo
                ima
                tom="claro"
                icone={<IconeTelefone className="size-5 shrink-0" />}
              >
                Ligar agora, {SITE.emergencia.rotulo}
              </Botao>
              <Botao href="/planos" tom="vidro">
                Ver planos e preços
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Botao>
            </div>

            <p
              className="revela-texto mt-8 flex max-w-[54ch] items-start gap-2.5 text-[0.9375rem] text-white/65"
              style={{ ["--i" as string]: 6 }}
            >
              <IconeLocal className="mt-0.5 size-[1.15rem] shrink-0 text-onda-400" />
              <span>Atendimento em {cidades.join(", ")}.</span>
            </p>
          </div>

          <ListaTelefones />
        </div>

        <Numeros />
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
      className="revela-texto vidro-escuro group inline-flex items-center gap-3 rounded-full border border-white/25 py-2.5 pr-5 pl-3 transition-all duration-400 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15"
      style={{ ["--i" as string]: 0 }}
    >
      <span className="flex size-7 items-center justify-center rounded-full bg-white">
        <IconeGoogle className="size-[1.15rem] shrink-0" />
      </span>
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
      <span className="text-[0.9375rem] font-semibold text-white">
        Avaliações de famílias no Google
      </span>
      <IconeSeta className="size-4 shrink-0 rotate-90 text-white/50 transition-transform duration-300 group-hover:translate-y-0.5" />
    </a>
  );
}

/**
 * A coluna direita do herói: o telefone da cidade da pessoa, sem rolar nada.
 *
 * Em vidro escuro, porque agora ela flutua sobre a fotografia. O holofote
 * acompanha o ponteiro linha a linha: numa lista de oito telefones parecidos,
 * ele e o que confirma qual linha esta sob o dedo antes do clique.
 */
function ListaTelefones() {
  return (
    <div
      className="revela-texto overflow-hidden rounded-serra-lg border border-white/20 bg-[#04202f]/88 shadow-cine"
    >
      <h2 className="flex items-center gap-2.5 border-b border-white/15 px-6 py-4 font-display text-[1.0625rem] font-bold text-white">
        <IconeTelefone className="size-[1.15rem] shrink-0 text-onda-400" />
        Ligue para a unidade mais perto
      </h2>
      <ul className="divide-y divide-white/12">
        {UNIDADES.map((u, i) => (
          <li key={u.slug} className={i > 3 ? "hidden sm:block" : undefined}>
            <a
              href={`tel:${u.tel}`}
              className="holofote holofote-escuro group flex items-center justify-between gap-3 px-6 py-3 transition-colors hover:bg-white/[0.06]"
            >
              <span className="text-[0.9375rem] text-white/75 transition-colors group-hover:text-white">
                {u.cidade}
                {u.nome.includes("Padre Anchieta") ? (
                  <span className="text-white/45"> · Padre Anchieta</span>
                ) : null}
                {u.matriz ? <span className="text-white/45"> · Centro</span> : null}
              </span>
              <span className="numerais text-[0.9375rem] font-bold whitespace-nowrap text-onda-400 transition-transform duration-300 group-hover:-translate-x-0.5">
                {u.telefone}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="border-t border-white/15 bg-black/20 px-6 py-4 text-[0.875rem] leading-relaxed text-white/65">
        <a href="#unidades" className="link-texto font-semibold text-onda-400 sm:hidden">
          Ver as {UNIDADES.length} unidades
        </a>
        <span className="sm:hidden"> · </span>
        Óbito é atendido 24 horas, todos os dias.
      </p>
    </div>
  );
}

/**
 * Os quatro numeros que sustentam a promessa do titulo.
 *
 * Vive DENTRO do herói, na costura com a proxima secao. Cada um e verificavel:
 * as 8 unidades estao no `data/unidades.ts` com endereco e telefone, o
 * crematorio proprio e o Memorial Hortolandia desde 2021, e a idade sai do
 * `SITE.idadeTexto`, que so afirma o que o CNPJ sustenta enquanto ninguem
 * entregar documento de 1961.
 *
 * ⛔ Nao entra numero de associados nem de familias atendidas aqui. Nenhum dos
 * dois foi confirmado pelo cliente (CLAUDE.md secao 12), e numero inventado em
 * pagina de venda de plano funerario e problema de Procon, nao licenca poetica.
 */
function Numeros() {
  const itens: { valor: number | string; sufixo: string; rotulo: string; Icone: typeof IconeLocal }[] = [
    { valor: UNIDADES.length, sufixo: "", rotulo: "unidades próprias", Icone: IconeLocal },
    { valor: 24, sufixo: "h", rotulo: "plantão de óbito", Icone: IconeRelogio },
    { valor: 30, sufixo: "+", rotulo: "anos na mesma região", Icone: IconeAmparo },
    /* ⛔ Era "1 · crematório próprio". O numero 1 nao impressiona ninguem e
       ainda por cima enfraquece o argumento, porque parece pouco. O que vale e
       a PALAVRA: crematorio proprio e a unica coisa que o Grupo Serra faz e os
       concorrentes da praca terceirizam. */
    { valor: "Próprio", sufixo: "", rotulo: "crematório, em Hortolândia", Icone: IconeChama },
  ];

  return (
    <div className="relative z-10 border-t border-white/12 bg-black/35">
      <ul className="mx-auto grid max-w-[80rem] grid-cols-2 divide-x divide-y divide-white/12 md:grid-cols-4 md:divide-y-0">
        {itens.map(({ valor, sufixo, rotulo, Icone }) => (
          <li
            key={rotulo}
            className="holofote holofote-escuro flex items-center gap-4 px-5 py-6 md:px-8"
          >
            <Icone className="size-6 shrink-0 text-onda-400/80" />
            <span>
              <span className="block font-display text-[1.75rem] leading-none font-extrabold tracking-tight text-white md:text-[2.125rem]">
                {/* Contar de 0 a 1 mostraria "0 crematório próprio" por um
                    segundo, que e pior do que nao animar nada. */}
                {typeof valor === "number" && valor > 1 ? (
                  <Contador ate={valor} sufixo={sufixo} />
                ) : (
                  <span className="numerais">
                    {valor}
                    {sufixo}
                  </span>
                )}
              </span>
              <span className="mt-1.5 block text-[0.8125rem] leading-tight text-white/60">
                {rotulo}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Roteador por intenção.
 *
 * Quem abre este site chega por UM de tres motivos, e cada motivo quer uma
 * pagina diferente. A faixa pergunta o motivo e leva direto.
 *
 * ⛔ O que estava aqui antes: tres cartoes brancos com "Segunda via",
 * "Obituário" e "Falar no WhatsApp". O dono chamou de "sem destaque ou
 * inúteis", e as duas coisas eram verdade ao mesmo tempo: eram palidos E
 * repetiam exatamente os tres links da faixa de utilidades do topo.
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
      className="mat-azul faixa-escura aurora mosaico relative isolate overflow-hidden"
      aria-label="Por onde começar"
    >
      <div aria-hidden className="fio-luz absolute inset-x-0 top-0 z-[1]" />
      <ul className="relative z-[1] mx-auto grid max-w-[80rem] md:grid-cols-3">
        {caminhos.map(({ href, externo, Icone, etiqueta, titulo, texto, acao }, i) => {
          const miolo = (
            <>
              <span
                aria-hidden
                className="numero-fantasma absolute top-6 right-7 text-[4.5rem] opacity-70 md:right-9"
                style={{ ["--luz" as string]: "#ffffff" }}
              >
                {i + 1}
              </span>
              <span className="selo-icone flex size-13 shrink-0 items-center justify-center rounded-serra bg-white/15 text-white group-hover:bg-white group-hover:text-serra-600">
                <Icone className="size-6" />
              </span>
              <span className="mt-6 block text-[0.8125rem] font-bold tracking-[0.14em] text-serra-200 uppercase">
                {etiqueta}
              </span>
              <span className="mt-2 block font-display text-[1.4375rem] font-bold text-white">
                {titulo}
              </span>
              <span className="mt-2.5 block max-w-[34ch] flex-1 text-[0.9375rem] leading-relaxed text-serra-100/85">
                {texto}
              </span>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold text-white">
                <span className="numerais risco pb-0.5">{acao}</span>
                <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </>
          );
          const classe =
            "holofote holofote-escuro grupo-risco group relative flex h-full flex-col overflow-hidden px-6 py-11 transition-colors duration-500 hover:bg-white/[0.06] md:px-9 md:py-14";
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
