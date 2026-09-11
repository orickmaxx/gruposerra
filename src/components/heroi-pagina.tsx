import Image from "next/image";
import type { ReactNode } from "react";
import { Paralaxe } from "./movimento";
import { Rotulo, TituloCine } from "./ui";

/**
 * Herói de página interna.
 *
 * As rotas derivadas nasceram como esboço: um `<h1>` preto sobre branco e uma
 * lista do que ainda não existia. Funcionava como recado interno e denunciava
 * protótipo para qualquer visitante.
 *
 * Este componente dá a elas a MESMA gramática da home, e não uma imitação dela:
 * fotografia real do cliente tratada no azul da marca, manchete subindo de
 * dentro de uma máscara, grão, vinheta e paralaxe. O que muda entre páginas é a
 * foto, o rótulo e a cor do fio, e essa cor é a do SERVIÇO daquela página, o que
 * faz a pessoa reconhecer onde está antes de ler o título.
 *
 * ⛔ Por que o herói interno é mais BAIXO que o da home: hierarquia. Se toda
 * página abrir com um herói de tela cheia, nenhuma abre. O da home ocupa o
 * primeiro viewport inteiro porque é a porta; os internos ocupam cerca de um
 * terço porque o que interessa neles começa logo abaixo.
 */
export function HeroiPagina({
  rotulo,
  titulo,
  linhas,
  resumo,
  foto,
  posicao = "object-center",
  cor,
  veu,
  acoes,
  children,
}: {
  rotulo: string;
  /** Título em uma linha só. Use `linhas` quando quiser escolher as quebras. */
  titulo?: string;
  linhas?: readonly string[];
  resumo: ReactNode;
  foto: string;
  posicao?: string;
  /** Cor do fio do rótulo. Por padrão o ciano de apoio sobre escuro. */
  cor?: string;
  /**
   * Véu da fotografia, na cor do SERVIÇO da página.
   *
   * O azul institucional é o padrão. Páginas de marca própria do grupo usam a
   * cor delas: lavar a foto do Serra Pet de azul diria que a cor por serviço
   * vale no cartão e não vale no herói, que é onde ela mais pesa.
   */
  veu?: "azul" | "memorial" | "pet" | "verde";
  acoes?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className="grao vinheta relative isolate overflow-hidden bg-serra-900 text-white"
      style={{
        marginTop: "calc(var(--alt-cabecalho) * -1)",
        paddingTop: "var(--alt-cabecalho)",
      }}
    >
      <Paralaxe fator={0.12} className="absolute inset-0 -z-10">
        <div
          className={`foto-marca-veu absolute inset-[-8%] ${
            veu && veu !== "azul" ? `veu-${veu}` : ""
          }`}
        >
          <Image
            src={foto}
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden
            className={`kenburns foto-marca object-cover ${posicao}`}
          />
        </div>
      </Paralaxe>

      <div className="relative z-10 mx-auto max-w-[76rem] px-5 pt-14 pb-16 md:pt-20 md:pb-20">
        <Rotulo claro cor={cor}>
          {rotulo}
        </Rotulo>

        <TituloCine
          como="h1"
          entraJa
          atraso={80}
          className="max-w-[18ch] text-t1 text-white"
          linhas={linhas}
        >
          {titulo}
        </TituloCine>

        <div
          className="revela-texto mt-7 max-w-[58ch] text-lead text-white/80"
          style={{ ["--i" as string]: 2 }}
        >
          {resumo}
        </div>

        {acoes ? (
          <div
            className="revela-texto mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ ["--i" as string]: 3 }}
          >
            {acoes}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  );
}
