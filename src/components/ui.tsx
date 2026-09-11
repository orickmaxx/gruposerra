import Link from "next/link";
import type { ElementType, ReactNode } from "react";
import { Ima } from "./movimento";

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
    azul: "faixa-escura mat-azul text-serra-100 aurora mosaico",
    escuro: "faixa-escura malha-escura text-serra-100 aurora mosaico",
  } as const;
  const escura = fundo === "azul" || fundo === "escuro";
  return (
    <section
      id={id}
      className={`relative isolate overflow-hidden ${fundos[fundo]} ${className}`}
    >
      {/* Costura entre uma secao clara e uma escura. O olho procura a emenda
          exatamente aqui, e um fio de luz e mais honesto que fingir que ela
          nao existe. */}
      {escura ? <div aria-hidden className="fio-luz absolute inset-x-0 top-0 z-[1]" /> : null}
      <div
        className="relative z-[1] mx-auto max-w-[76rem] px-5 py-16 md:py-24"
        {...(revela ? { "data-revela": "" } : {})}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * Rotulo de secao.
 *
 * Um fio curto na cor do servico, o texto em versalete e nada mais. Serve para
 * a mesma coisa em toda a pagina: dizer de que ASSUNTO e a secao antes do
 * titulo dizer o que ela AFIRMA. Sem ele, dezessete titulos grandes seguidos
 * viram uma lista de manchetes sem indice.
 */
export function Rotulo({
  children,
  cor = "var(--color-serra-500)",
  claro = false,
}: {
  children: ReactNode;
  cor?: string;
  claro?: boolean;
}) {
  return (
    <span
      className={`mb-5 inline-flex items-center gap-3 text-[0.75rem] font-bold tracking-[0.18em] uppercase ${
        claro ? "text-white/70" : "text-pedra-600"
      }`}
    >
      <span
        aria-hidden
        className="h-px w-8 shrink-0"
        style={{ background: claro ? "rgba(255,255,255,.5)" : cor }}
      />
      {children}
    </span>
  );
}

/**
 * Titulo cinematografico.
 *
 * A manchete sobe LINHA POR LINHA, de dentro de uma mascara, como legenda de
 * filme. As linhas sao declaradas a mao, e isso e proposital: quebra
 * automatica nao existe antes do layout, e uma manchete que se anima em
 * pedacos aleatorios le como defeito. Quem escreve a frase decide onde ela
 * respira.
 *
 * O texto continua sendo texto corrido para leitor de tela e para o buscador.
 * A mascara e pintura, nao estrutura.
 */
export function TituloCine({
  linhas,
  children,
  como: Como = "h2",
  className = "",
  entraJa = false,
  atraso = 0,
}: {
  /** Quebras escolhidas à mão. Reservado para as pontas da página. */
  linhas?: readonly string[];
  /** Texto livre: sobe como um bloco só. É o caso das seções do meio. */
  children?: ReactNode;
  como?: ElementType;
  className?: string;
  /** Titulo do primeiro viewport: anima por CSS, sem esperar o JavaScript. */
  entraJa?: boolean;
  atraso?: number;
}) {
  const conteudo = linhas ?? [];
  if (!linhas) {
    return (
      <Como
        className={`titulo-cine ${entraJa ? "entra-ja" : ""} ${className}`}
        style={{ ["--atraso-linha" as string]: `${atraso}ms` }}
      >
        <span className="linha-mascara">
          <span>{children}</span>
        </span>
      </Como>
    );
  }
  return (
    <Como
      className={`titulo-cine ${entraJa ? "entra-ja" : ""} ${className}`}
      style={{ ["--atraso-linha" as string]: `${atraso}ms` }}
    >
      {conteudo.map((linha, i) => (
        <span key={linha} className="linha-mascara" style={{ ["--i" as string]: i }}>
          {/* ⛔ O ESPAÇO NO FIM DA LINHA NÃO É ENFEITE. Sem ele, as linhas são
              blocos vizinhos e `textContent` cola as palavras na emenda: o
              `<h1>` do herói chegava ao Google e ao leitor de tela como
              "Estamos perto,e atendemos aqualquer hora.". Num site cuja
              justificativa inteira é SEO e compartilhamento, isso é gol contra.
              O espaço é colapsado no fim da linha, então não muda um pixel.
              Medido com `curl | sed 's/<[^>]*>//g'`, que é como um rastreador
              lê. */}
          <span>{i < conteudo.length - 1 ? `${linha} ` : linha}</span>
        </span>
      ))}
    </Como>
  );
}

/**
 * Cabeca de secao: rotulo opcional, titulo em mascara e apoio.
 *
 * ⛔ A regra antiga era "nada de rotulo miudo por cima do titulo, o titulo
 * carrega o proprio peso". Isso vale numa pagina de cinco secoes. Nesta home
 * ha dezessete, todas com titulo do mesmo tamanho, e sem indice elas viram uma
 * pilha de manchetes em que nenhuma diz de que ASSUNTO e. O rotulo nao disputa
 * peso com o titulo; ele nomeia o capitulo.
 */
export function Titulo({
  children,
  apoio,
  claro = false,
  centro = false,
  rotulo,
  cor,
}: {
  children: ReactNode;
  apoio?: ReactNode;
  claro?: boolean;
  /**
   * Assunto da secao, em versalete, acima do titulo.
   *
   * A versao anterior proibia rotulo por principio: "o titulo carrega o
   * proprio peso". Isso vale numa pagina de cinco secoes. Nesta home ha
   * dezessete, e sem indice elas viram uma pilha de manchetes do mesmo tamanho
   * sem nenhuma dizendo de que assunto e. O rotulo nao rouba peso do titulo,
   * ele diz o CAPITULO antes da frase dizer a afirmacao.
   */
  rotulo?: ReactNode;
  /** Cor do fio do rotulo. Por padrao, o azul da marca. */
  cor?: string;
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
    <div className={centro ? "mx-auto max-w-[46rem] text-center" : "max-w-[38rem]"}>
      {rotulo ? (
        <Rotulo cor={cor} claro={claro}>
          {rotulo}
        </Rotulo>
      ) : null}
      {/* A CABEÇA DE SEÇÃO SOBE DE DENTRO DE UMA MÁSCARA, sempre, sem ninguém
          precisar lembrar.

          ⛔ Antes disto, o gesto existia em dois lugares (o herói e o fecho) e
          faltava nas outras quatorze seções. Meio sistema aplicado é pior que
          sistema nenhum: lê como descuido, não como decisão. A hierarquia que
          ficou é de propósito, e é a de um filme: as PONTAS da página animam
          linha por linha, com as quebras escolhidas à mão (`TituloCine`), e as
          seções do meio sobem como um bloco só. Bloco não precisa de quebra
          declarada, então vale para qualquer texto, inclusive o que o cliente
          ainda vai trocar. */}
      <TituloCine className={`text-t2 ${claro ? "text-white" : ""}`}>
        {children}
      </TituloCine>
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
  tom?: "azul" | "contorno" | "claro" | "vidro" | "zap";
  externo?: boolean;
  className?: string;
  icone?: ReactNode;
  /** Atracao magnetica no ponteiro. Reservado para o CTA principal do bloco. */
  ima?: boolean;
};

/**
 * Botao.
 *
 * Tres camadas de acabamento, todas sem custo de legibilidade:
 *
 *   VARREDURA  um facho diagonal atravessa o fundo no ponteiro, 780ms;
 *   IMA        o botao principal acompanha o cursor por ate 7px e volta;
 *   ENCHE      o botao de contorno se enche de cor a partir da base, em vez
 *              de trocar de cor de uma vez, que e o gesto de template.
 *
 * A altura minima e 3.25rem, acima dos 44px do alvo de toque. Este site e lido
 * por gente idosa, muitas vezes chorando e com a mao tremendo. Alvo pequeno
 * aqui nao e economia de espaco, e falha de produto.
 */
export function Botao({
  children,
  href,
  tom = "azul",
  externo,
  className = "",
  icone,
  ima = false,
}: BotaoProps) {
  const tons = {
    azul: "botao-cheio varre text-white hover:brightness-110 hover:shadow-[0_18px_44px_-12px_rgba(0,105,163,.75)]",
    contorno:
      "enche border border-serra-300 bg-white text-serra-700 shadow-baixa hover:border-serra-500 hover:text-white",
    claro: "varre bg-white text-serra-700 shadow-media hover:shadow-alta",
    vidro: "varre vidro-escuro border border-white/30 text-white hover:border-white/60 hover:bg-white/15",
    zap: "mat-zap varre text-white hover:brightness-110",
  } as const;

  const classe = `group ima relative inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 text-[1.0625rem] font-semibold transition-[transform,box-shadow,color,border-color,filter] duration-300 hover:-translate-y-0.5 active:translate-y-0 ${tons[tom]} ${className}`;

  const miolo = (
    <span className="relative z-[1] inline-flex items-center gap-2.5">
      {icone}
      {children}
    </span>
  );

  /* `tel:` e `mailto:` NUNCA abrem aba nova. No desktop isso deixa uma janela
     em branco para tras depois que o discador assume, e no celular so atrapalha
     a volta. Era o comportamento antigo do botao de ligar, em toda chamada de
     emergencia do site. */
  const protocolo = href.startsWith("tel:") || href.startsWith("mailto:");
  const novaAba = externo && !protocolo;

  const elemento = externo ? (
    <a
      href={href}
      {...(novaAba ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={classe}
    >
      {miolo}
    </a>
  ) : (
    <Link href={href} className={classe}>
      {miolo}
    </Link>
  );

  return ima ? <Ima>{elemento}</Ima> : elemento;
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
