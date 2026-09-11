import { SITE } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { INCLUSOS, PLANOS, PLANOS_ESPECIAIS } from "@/data/planos";
import { Contador } from "../contador";
import { Botao, Faixa, Rotulo, Titulo, TituloCine } from "../ui";
import { IconeAlerta, IconeConfere, IconePata, IconeAmparo } from "../icones";

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
      <Titulo centro rotulo="Planos e preços" apoio="Todo plano inclui assistência 24 horas, traslado e cobertura nacional. O que muda de um para o outro é quanta gente entra e quanto da cerimônia já está pago.">
        Três planos, a mesma assistência 24 horas
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
                {...(destaque ? { "data-ativo": "1" } : {})}
                className={`cartao-cine holofote aro-luz relative flex w-full flex-col overflow-hidden rounded-serra-lg ${
                  destaque
                    ? "mat-azul holofote-escuro text-serra-100 shadow-alta"
                    : "border border-linha bg-white shadow-media"
                }`}
              >
                {/* O aro de luz do plano recomendado fica SEMPRE aceso
                    (`data-ativo`), e o dos outros dois so acende no ponteiro.
                    E a mesma hierarquia da superficie azul dita outra vez, num
                    canal diferente: quem olha de longe ve o aro antes de ler a
                    faixa. */}
                {destaque && (
                  <p className="relative z-[1] bg-white/15 py-2.5 text-center text-[0.8125rem] font-bold tracking-[0.14em] text-white uppercase">
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
 * COM PLANO E SEM PLANO.
 *
 * ⛔ TERCEIRA VERSÃO, e as duas anteriores estão aqui porque as duas erraram
 * por motivos diferentes e opostos:
 *
 *   1ª  Dois cartões com cinco linhas rotuladas cada um. O dono: "extremamente
 *       feio, genérico, sem destaque, card muito longo na vertical". Cada
 *       célula era um bloco com ícone, rótulo em versalete e duas linhas de
 *       texto, e a peça esticava meia tela para dizer cinco coisas.
 *   2ª  Uma tabela de três colunas. Compacta e correta, mas tabela é peça de
 *       ficha técnica: ela COMPARA bem e não VENDE nada. O destaque sumiu
 *       junto com a altura.
 *
 * Esta terceira é a forma que o dono apontou com uma referência na mão, e a
 * referência é o par de cartões "Sem planejamento / Com um plano" do Florees.
 *
 * ⚠️ O QUE FOI APRENDIDO ALI É A ESTRUTURA, E SÓ ELA, o que o `CLAUDE.md` 0.1
 * permite e manda documentar onde acontece: um cartão claro e apagado à
 * esquerda, um cartão de cor cheia à direita, uma pílula "ou" entre os dois,
 * lista de marcadores curtos em vez de linhas rotuladas, e o preço com o botão
 * dentro do cartão que ganha. Nenhum número, nenhuma frase e nenhum argumento
 * deles veio junto: o conteúdo dos dois lados é fato do Grupo Serra, conferido
 * em `data/unidades.ts` e no material do cliente.
 *
 * O que esta versão faz A MAIS que a referência:
 *
 *   SUPERFÍCIE ESCURA. Lá os dois cartões vivem numa página branca, e o
 *   "sem planejamento" acaba tão sólido quanto o outro. Aqui a faixa é escura e
 *   o cartão de cima da esquerda é vidro fosco: ele existe, é legível e é
 *   nitidamente o lado apagado. O degrau de valor faz metade do argumento antes
 *   de qualquer palavra.
 *   LUZ DE MARCA. O cartão do plano leva o aro de 1px em gradiente do azul ao
 *   ouro SEMPRE aceso, holofote no ponteiro e elevação. É o mesmo vocabulário
 *   do plano recomendado lá em cima, então a página inteira diz "este é o
 *   destaque" do mesmo jeito nas duas seções.
 *   ENTRADA CONTADA. Os marcadores entram em cascata, 35ms cada, em vez de
 *   aparecerem juntos.
 *
 * ⚠️ O NÚMERO QUE O DONO PEDIU NÃO ESTÁ AQUI, e a ausência é deliberada. O
 * pedido original foi "com valores de custo de funeral", e não existe, em lugar
 * nenhum do material do cliente nem em fonte pública conferida, quanto custa um
 * funeral avulso. Publicar uma média de internet ao lado de "R$ 18,90 por mês"
 * seria inventar justamente o lado mais forte da comparação, e em página de
 * venda de plano funerário isso é problema de Procon, não licença criativa.
 * O rodapé do cartão da esquerda declara a lacuna em vez de chutar, e é onde o
 * valor entra no dia em que a empresa mandar a tabela por escrito.
 *
 * ⛔ SEM MEDO E SEM CULPA. O cartão da esquerda lista TAREFA, nunca tragédia:
 * "urna, flores e ornamentação" é um item de logística, e "não deixe esse peso
 * para sua família" seria chantagem. A regra vale principalmente aqui, que é
 * onde o setor inteiro apela.
 */
const SEM_PLANO = [
  "funerária e sala de velório",
  "urna, flores e ornamentação",
  "transporte e remoção",
  "certidão de óbito e autorizações",
  "cremação ou sepultamento",
];

const COM_PLANO = [
  "Você escolhe a cobertura hoje, com calma, conversando com a equipe",
  "20 itens já pagos, do velório à documentação",
  "Uma ligação aciona tudo, 24 horas, todo dia, inclusive no feriado",
  "Quem atende é a unidade da sua cidade, não uma central em outro estado",
  "Crematório do próprio grupo em Hortolândia, e traslado incluso até 100 km",
];

export function Inclusos() {
  return (
    <section
      className="malha-escura faixa-escura aurora mosaico grao relative isolate overflow-hidden py-20 text-serra-100 md:py-28"
      id="com-plano"
    >
      <div aria-hidden className="fio-luz absolute inset-x-0 top-0 z-[1]" />
      <Image
        src="/marca/simbolo-serra-branco.png"
        alt=""
        width={379}
        height={376}
        sizes="28rem"
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 w-[28rem] max-w-none opacity-[0.04]"
      />

      <div className="relative mx-auto max-w-[76rem] px-5" data-revela>
        <div className="mx-auto max-w-[44rem] text-center">
          <Rotulo claro>Com plano e sem plano</Rotulo>
          <TituloCine className="mx-auto max-w-[20ch] text-t2 text-white">
            A diferença aparece no primeiro telefonema
          </TituloCine>
          <p className="mx-auto mt-5 max-w-[54ch] text-lead text-serra-100/85">
            O plano não muda o que aconteceu. Muda quantas decisões a família
            toma no mesmo dia, e quantas empresas ela procura sozinha.
          </p>
        </div>

        <div className="relative mt-12 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-14">
          {/* --- SEM PLANO: vidro fosco, deliberadamente apagado --- */}
          <article className="holofote holofote-escuro relative flex flex-col rounded-serra-lg border border-white/12 bg-white/[0.05] p-7 md:p-9">
            <h3 className="flex items-center gap-3 font-display text-[1.3125rem] font-bold text-serra-100/75">
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-serra-100/50"
              >
                <IconeAlerta className="size-[1.15rem]" />
              </span>
              Sem plano
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-serra-100/55">
              A família pode precisar resolver, tudo no mesmo dia:
            </p>

            <ul className="mt-6 space-y-3.5">
              {SEM_PLANO.map((item, i) => (
                <li
                  key={item}
                  className="item-cascata flex items-start gap-3 text-[0.9375rem] leading-snug text-serra-100/65"
                  style={{ ["--i" as string]: i }}
                >
                  <span
                    aria-hidden
                    className="mt-[0.15rem] flex size-[1.3rem] shrink-0 items-center justify-center rounded-full border border-white/15"
                  >
                    <span className="h-px w-2 bg-serra-100/40" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-7 text-[0.9375rem] leading-relaxed text-serra-100/55">
              Tudo decidido em poucas horas, sem tempo de comparar nem de
              pesquisar com calma.
            </p>

            <p className="mt-auto border-t border-white/10 pt-6 text-[0.8125rem] leading-relaxed text-serra-100/45">
              <strong className="font-semibold text-serra-100/70">
                Falta publicar aqui:
              </strong>{" "}
              quanto custa um funeral contratado na hora. O Grupo Serra tem essa
              tabela e ela ainda não veio por escrito. Enquanto não vier, nenhum
              valor é estimado nesta página.
            </p>
          </article>

          {/* --- a pílula "ou", que separa os dois sem precisar de uma linha --- */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 z-[2] hidden size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06263a] text-[0.8125rem] font-bold tracking-[0.12em] text-serra-100/70 uppercase lg:flex"
          >
            ou
          </span>

          {/* --- COM O PLANO: azul cheio, aro sempre aceso --- */}
          <article
            data-ativo="1"
            style={{
              ["--luz" as string]: "var(--color-onda-400)",
              ["--aro" as string]:
                "linear-gradient(100deg, #22b8d4, #7fd8ea 42%, #c9b167)",
            }}
            className="cartao-cine holofote holofote-escuro aro-luz mat-azul relative flex flex-col overflow-hidden rounded-serra-lg border border-onda-400/30 p-7 shadow-alta md:p-9"
          >
            {/* Luz propria do cartao, para ele nao ser um retangulo de cor
                chapada. Um tom so, sobre superficie escura, como manda a regra
                das manchas de fundo. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full opacity-60 blur-[70px]"
              style={{ background: "radial-gradient(circle, rgba(34,184,212,.4), transparent 70%)" }}
            />

            <h3 className="flex items-center gap-3 font-display text-[1.3125rem] font-bold text-white">
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-onda-400/20 text-onda-400"
              >
                <IconeConfere className="size-[1.15rem]" />
              </span>
              Com o plano Serra
            </h3>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-serra-100/85">
              Você decide antes, com calma, e no dia a família só precisa fazer
              uma ligação.
            </p>

            <ul className="mt-6 space-y-3.5">
              {COM_PLANO.map((item, i) => (
                <li
                  key={item}
                  className="item-cascata flex items-start gap-3 text-[0.9375rem] leading-snug text-white"
                  style={{ ["--i" as string]: i }}
                >
                  <IconeConfere className="mt-[0.15rem] size-[1.15rem] shrink-0 text-onda-400" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-white/20 pt-7">
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[0.75rem] font-bold tracking-[0.14em] text-serra-100/70 uppercase">
                  Planos a partir de
                </span>
                <span className="numerais flex items-baseline gap-1 text-white">
                  <span className="font-display text-[1.25rem] font-medium">R$</span>
                  <span className="font-display text-[2.5rem] leading-none font-extrabold tracking-tight">
                    18,90
                  </span>
                  <span className="text-[1rem] text-serra-100/80">/mês</span>
                </span>
              </p>
              <Botao href="/planos" tom="claro" className="mt-6 w-full">
                Ver planos e preços
              </Botao>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
