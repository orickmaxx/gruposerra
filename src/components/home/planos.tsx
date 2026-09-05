import { SITE } from "@/lib/site";
import Image from "next/image";
import { INCLUSOS, PLANOS, PLANOS_ESPECIAIS } from "@/data/planos";
import { Contador } from "../contador";
import { Botao, Faixa, Titulo } from "../ui";
import { IconeConfere, IconePata, IconeAmparo } from "../icones";

/** Base do WhatsApp, sem texto. O numero vive em lib/site.ts. */
const ZAP_BASE = SITE.whatsapp.link.split("?")[0];

const brl = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * WhatsApp com o plano JÁ dito na mensagem.
 *
 * Todos os tres botoes mandavam a mesma frase generica, entao o atendente nao
 * sabia se a pessoa tinha clicado no Essencial ou no Total e a conversa
 * comecava do zero. Uma linha de codigo que e conversao pura.
 */
function zapDoPlano(nome: string) {
  const texto = `Olá, vim pelo site e gostaria de informações sobre o ${nome}.`;
  return `${ZAP_BASE}?text=${encodeURIComponent(texto)}`;
}

export function Planos() {
  return (
    <Faixa id="planos">
      <Titulo centro apoio="Todo plano inclui assistência 24 horas, traslado e cobertura nacional. O que muda de um para o outro é quanta gente entra e quanto da cerimônia já está pago.">
        Planos
      </Titulo>

      {/*
        HIERARQUIA. Os tres cartoes eram identicos: mesma cor, mesmo tamanho,
        mesmo peso de preco, e so o botao do meio mudava de tom. O olho nao
        escolhia nada. Agora o plano recomendado e uma superficie AZUL CHEIA,
        sobe acima da linha dos outros dois e leva a faixa de recomendacao.
        O destaque e percebido antes de ser lido, que era o pedido.
      */}
      <ul className="mt-12 grid items-stretch gap-5 lg:grid-cols-3 lg:gap-4">
        {PLANOS.map((p) => {
          const destaque = Boolean(p.destaque);
          return (
            <li key={p.slug} className={`flex ${destaque ? "lg:-my-4" : ""}`}>
              <article
                className={`cartao relative flex w-full flex-col overflow-hidden rounded-serra-lg ${
                  destaque
                    ? "mat-azul text-serra-100 shadow-alta"
                    : "border border-linha bg-white shadow-media"
                }`}
              >
                {destaque && (
                  <p className="bg-white/15 py-2.5 text-center text-[0.8125rem] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-sm">
                    O mais escolhido
                  </p>
                )}

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h3 className={`text-t3 ${destaque ? "text-white" : ""}`}>
                    {p.nome}
                  </h3>
                  <p
                    className={`mt-1.5 text-[0.9375rem] font-medium ${
                      destaque ? "text-serra-100/85" : "text-pedra-600"
                    }`}
                  >
                    {p.chamada}
                  </p>

                  <p
                    className={`mt-7 text-[0.875rem] ${
                      destaque ? "text-serra-100/70" : "text-pedra-600"
                    }`}
                  >
                    a partir de
                  </p>
                  <p className="numerais mt-1 flex items-baseline gap-1">
                    <span
                      className={`font-display text-[1.375rem] font-medium ${
                        destaque ? "text-serra-100/80" : "text-pedra-600"
                      }`}
                    >
                      R$
                    </span>
                    <span
                      className={`font-display leading-none font-extrabold tracking-tight ${
                        destaque
                          ? "text-[3.25rem] text-white"
                          : "text-[2.75rem] text-tinta"
                      }`}
                    >
                      {brl.format(p.preco!)}
                    </span>
                    <span
                      className={`text-[1.0625rem] ${
                        destaque ? "text-serra-100/80" : "text-pedra-600"
                      }`}
                    >
                      /mês
                    </span>
                  </p>

                  <p
                    className={`mt-6 border-t pt-6 text-[0.9375rem] leading-relaxed ${
                      destaque
                        ? "border-white/20 text-serra-100/90"
                        : "border-linha text-corpo"
                    }`}
                  >
                    {p.descricao}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {p.destaques.map((d) => (
                      <li
                        key={d}
                        className={`flex gap-3 text-[0.9375rem] ${
                          destaque ? "text-white" : "text-corpo"
                        }`}
                      >
                        <IconeConfere
                          className={`mt-1 size-[1.05rem] shrink-0 ${
                            destaque ? "text-onda-400" : "text-serra-500"
                          }`}
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Botao
                      href={zapDoPlano(p.nome)}
                      externo
                      tom={destaque ? "claro" : "contorno"}
                      className="w-full"
                    >
                      Falar sobre o {p.nome.replace("Serra ", "")}
                    </Botao>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <ul className="mt-5 grid gap-5 sm:grid-cols-2">
        {PLANOS_ESPECIAIS.map((p) => {
          const Icone = p.slug === "serra-pet" ? IconePata : IconeAmparo;
          return (
            <li key={p.slug}>
              <article className="flex h-full gap-5 rounded-serra-lg border border-linha bg-white p-6 shadow-baixa">
                <Icone className="mt-0.5 size-7 shrink-0 text-pedra-500" />
                <div>
                  <h3 className="font-display text-[1.1875rem] font-semibold text-tinta">
                    {p.nome}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-corpo">
                    {p.descricao}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

    </Faixa>
  );
}

/**
 * O que já está pago quando você liga.
 *
 * O dono chamou a versão anterior de feia e tinha razão: era um título à
 * esquerda e vinte linhas com o mesmo ícone de check à direita, sobre azul
 * escuro. Um inventário formatado como inventário.
 *
 * O que faz esta seção funcionar agora:
 *
 *  1. O NÚMERO na frente. Vinte itens já pagos é o argumento, e ele estava
 *     escrito por extenso no meio de um parágrafo. Agora é um contador que
 *     sobe quando a seção entra na tela.
 *  2. ENTRADA EM CASCATA. Os vinte itens não aparecem juntos: entram em
 *     sequência, 35ms de diferença. O olho percebe a lista sendo CONTADA, que
 *     é exatamente o que se quer dizer aqui.
 *  3. Cada item tem superfície própria e responde ao ponteiro.
 *  4. As GARANTIAS foram trazidas para dentro deste bloco. Eram uma seção
 *     branca separada, também de três cartões iguais, e faziam a página perder
 *     o fôlego entre dois momentos fortes. Aqui elas fecham o argumento: isto
 *     está incluso, e isto está garantido.
 */
const GARANTIAS = [
  {
    titulo: "Assistência 24 horas em todos os planos",
    texto:
      "Não é vantagem de um plano específico. Está em todos, do mais simples ao mais completo, junto com o traslado.",
  },
  {
    titulo: "Cobertura nacional",
    texto:
      "Se a pessoa falecer longe de casa, o traslado está previsto. Não é preciso contratar nada por fora naquele momento.",
  },
  {
    titulo: "Dá para mudar de plano depois",
    texto:
      "Para mais cobertura ou para menos. É uma conversa com a equipe de qualquer uma das 8 unidades, sem contrato novo do zero.",
  },
];

export function Inclusos() {
  return (
    <section className="malha-escura faixa-escura relative overflow-hidden py-20 text-serra-100 md:py-28">
      <Image
        src="/marca/simbolo-serra-branco.png"
        alt=""
        width={379}
        height={376}
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 w-[28rem] max-w-none opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-[80rem] px-5" data-revela>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div>
            <p className="font-display text-[5rem] leading-[0.85] font-extrabold tracking-tight text-white sm:text-[6rem]">
              <Contador ate={INCLUSOS.length} />
            </p>
            <h2 className="mt-4 max-w-[16ch] text-t2 text-white">
              itens já pagos quando você liga
            </h2>
            <p className="mt-5 max-w-[42ch] text-lead text-serra-100/85">
              Não é uma lista de vantagens escrita para o site. É o que a
              família recebe, item por item, sem nenhuma conta para acertar
              naquele momento.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-2 sm:gap-2.5 xl:grid-cols-3">
            {INCLUSOS.map(({ item, nota }, i) => (
              <li
                key={item}
                className="item-cascata group flex items-start gap-2.5 rounded-serra border border-white/10 bg-white/[0.06] px-3 py-3 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.12] sm:px-4 sm:py-3.5"
                style={{ ["--i" as string]: i }}
              >
                <IconeConfere className="mt-0.5 size-[1.05rem] shrink-0 text-onda-400 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-[0.875rem] leading-snug text-white sm:text-[0.9375rem]">
                  {item}
                  {nota ? (
                    <span className="mt-0.5 block text-[0.8125rem] text-serra-200">
                      {nota}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- as garantias, que eram uma seção branca solta --- */}
        <div className="mt-16 border-t border-white/12 pt-12">
          <h3 className="text-[0.875rem] font-bold tracking-[0.14em] text-serra-300 uppercase">
            E o que está garantido em contrato
          </h3>
          <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {GARANTIAS.map((g, i) => (
              <li
                key={g.titulo}
                className="item-cascata"
                style={{ ["--i" as string]: INCLUSOS.length + i }}
              >
                <span
                  aria-hidden
                  className="block h-1 w-12 rounded-full bg-gradient-to-r from-onda-400 to-serra-300"
                />
                <h4 className="mt-5 font-display text-[1.125rem] font-bold text-white">
                  {g.titulo}
                </h4>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-serra-100/85">
                  {g.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

