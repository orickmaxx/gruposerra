import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { Faixa, Titulo } from "../ui";
import {
  IconeAmparo,
  IconeChama,
  IconeConfere,
  IconeLocal,
  IconeRelogio,
  IconeTelefone,
} from "../icones";

/**
 * Barra de confiança, logo abaixo do herói.
 *
 * Copiada em ESTRUTURA do Florees, não em conteúdo: eles põem cinco selos antes
 * de qualquer venda, e um deles cita a lei federal PELO NÚMERO. Plano funerário
 * é setor regulado e citar a norma responde a desconfiança antes de ela virar
 * pergunta.
 *
 * ⛔ O que eu NÃO copiei: eles escrevem "Empresa Licenciada". Não tenho como
 * provar registro do Grupo Serra, então aqui o selo diz o que é verificável (a
 * lei que rege o contrato), não uma condição que a empresa teria.
 */
export function BarraConfianca() {
  return (
    <section className="border-y border-linha bg-white">
      <div className="mx-auto max-w-[76rem] px-5 py-7">
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              Icone: IconeRelogio,
              titulo: "Plantão 24 horas",
              texto: "Óbito atendido todo dia, inclusive feriado",
            },
            {
              Icone: IconeLocal,
              titulo: `${UNIDADES.length} unidades próprias`,
              texto: "Equipe e telefone em cada cidade",
            },
            {
              Icone: IconeChama,
              titulo: "Crematório próprio",
              texto: "Memorial Hortolândia, desde 2021",
            },
            {
              Icone: IconeAmparo,
              titulo: `Na região ${SITE.idadeTexto}`,
              texto: "Sempre na mesma praça, sem mudar de dono",
            },
            {
              Icone: IconeConfere,
              titulo: "Lei Federal nº 13.261/16",
              texto: "A norma que rege o plano de assistência funerária",
            },
          ].map(({ Icone, titulo, texto }) => (
            <li
              key={titulo}
              className="holofote group flex gap-3.5 rounded-serra p-2 transition-colors duration-500"
            >
              <span className="selo-icone mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-serra bg-serra-500/10 text-serra-600 group-hover:bg-serra-500 group-hover:text-white">
                <Icone className="size-[1.3rem]" />
              </span>
              <span>
                <span className="block font-display text-[0.9375rem] leading-snug font-bold text-tinta">
                  {titulo}
                </span>
                <span className="mt-1 block text-[0.8125rem] leading-relaxed text-pedra-600">
                  {texto}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Como funciona o acionamento.
 *
 * O site explicava o que está incluso, mas nunca explicava a SEQUÊNCIA. Quem
 * nunca enterrou ninguém não sabe o que acontece depois da ligação, e essa
 * ignorância é uma das coisas que mais assusta.
 */
const PASSOS = [
  {
    n: 1,
    titulo: "Você liga",
    texto:
      "A qualquer hora, para a unidade mais perto ou para o plantão. Não precisa ter documento em mãos nem saber o que dizer. Só o nome da pessoa e onde ela está.",
  },
  {
    n: 2,
    titulo: "A equipe assume",
    texto:
      "O carro assistencial faz a remoção e a equipe conduz o resto. A partir daqui você não precisa ligar para mais ninguém, nem negociar preço com quem quer que seja.",
  },
  {
    n: 3,
    titulo: "A papelada corre por nossa conta",
    texto:
      "Certidão de óbito, autorizações e a orientação jurídica estão no plano. É a parte que mais trava família em luto, e é a que você não vai encostar.",
  },
  {
    n: 4,
    titulo: "A despedida acontece",
    texto:
      "Velório, ornamentação, cerimonial e sepultamento ou cremação. Tudo o que está no plano já está pago: não há conta para acertar naquele momento.",
  },
];

export function ComoFunciona() {
  return (
    <Faixa fundo="papel" id="como-funciona">
      <Titulo rotulo="O acionamento" apoio="Quem nunca precisou não sabe o que acontece depois da ligação. É isto, na ordem.">
        Como funciona quando você precisa
      </Titulo>

      {/* O numero deixou de ser uma bolinha de 44px e virou o maior elemento do
          cartao, em contorno. Quatro passos numerados sao uma SEQUENCIA, e a
          unica coisa que o olho precisa ler antes do texto e a ordem. O fio de
          cima ligando os cartaos completa o gesto: da para ver que sao etapas
          de uma coisa so, nao quatro beneficios soltos. */}
      <ol className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {PASSOS.map((p) => (
          <li key={p.n} className="item-cascata" style={{ ["--i" as string]: p.n }}>
            <article className="cartao-cine holofote aro-luz relative flex h-full flex-col overflow-hidden rounded-serra-lg border border-linha bg-white p-5 shadow-baixa sm:p-6">
              <span
                aria-hidden
                className="numerais numero-fantasma pointer-events-none absolute -top-1 right-3 text-[5.5rem] select-none"
              >
                {p.n}
              </span>
              <span
                aria-hidden
                className="h-1 w-10 rounded-full bg-linha transition-[width,background-color] duration-700 group-hover:w-16"
                style={{ backgroundImage: "var(--luz-serra)" }}
              />
              <h3 className="mt-5 font-display text-[1rem] font-bold text-tinta sm:text-[1.125rem]">
                {p.titulo}
              </h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-corpo sm:text-[0.9375rem]">
                {p.texto}
              </p>
            </article>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={`tel:${SITE.emergencia.tel}`}
          className="botao-cheio inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
        >
          <IconeTelefone className="size-5 shrink-0" />
          <span className="numerais">{SITE.emergencia.rotulo}</span>
        </a>
        <p className="text-[0.9375rem] text-pedra-600">
          É o passo 1. O resto é com a gente.
        </p>
      </div>
    </Faixa>
  );
}

/**
 * Garantias.
 *
 * Aqui é onde o Florees mata objeção de compra, e onde eu preciso de mais
 * cuidado: cada linha abaixo é sustentada por algo que o próprio Grupo Serra
 * publica. O que a empresa NÃO diz em lugar nenhum, principalmente carência e
 * reajuste, sai declarado como lacuna em vez de virar promessa.
 */
export function Garantias() {
  return (
    <Faixa>
      <Titulo centro rotulo="Compromisso" apoio="Contratar plano funerário é assinar um compromisso de décadas. Vale saber exatamente o que está garantido, e o que ainda não dá para afirmar.">
        O que está garantido
      </Titulo>

      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {[
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
        ].map((g) => (
          <li key={g.titulo}>
            <article className="cartao-cine holofote flex h-full flex-col rounded-serra-lg border border-linha bg-white p-5 shadow-baixa sm:p-6">
              <IconeConfere className="size-7 shrink-0 text-verde-forte" />
              <h3 className="mt-4 font-display text-[1rem] font-bold text-tinta sm:mt-5 sm:text-[1.125rem]">
                {g.titulo}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-corpo sm:text-[0.9375rem]">
                {g.texto}
              </p>
            </article>
          </li>
        ))}
      </ul>

    </Faixa>
  );
}
