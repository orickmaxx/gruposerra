import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Faixa } from "@/components/ui";
import { MapaUnidade } from "@/components/mapa-unidade";
import { Retrato } from "@/components/obituario/retrato";
import { DadosObituario } from "@/components/dados-estruturados";
import {
  IconeAlerta,
  IconeCoracao,
  IconeLocal,
  IconeRelogio,
  IconeSeta,
  IconeTelefone,
  IconeVela,
} from "@/components/icones";
import {
  OBITUARIOS,
  dataPorExtenso,
  idadeAoFalecer,
  obituarioPorSlug,
  periodoDeVida,
  unidadeDo,
} from "@/data/obituarios";

/**
 * A página de UMA despedida.
 *
 * ⛔ É A RAZÃO DE O SITE SER RENDERIZADO NO SERVIDOR. Todo o resto do projeto
 * poderia ser um site estático qualquer; esta rota não. O obituário é a página
 * mais compartilhada de qualquer funerária, o compartilhamento acontece por
 * WhatsApp dezenas de vezes por dia, e hoje o link do cliente chega PELADO
 * porque o site antigo não tem uma única tag Open Graph (CLAUDE.md 5.1).
 *
 * Aqui cada falecido tem `generateMetadata()` e `opengraph-image` próprios: o
 * cartão que aparece no WhatsApp traz o nome, o período de vida, a data e o
 * local do velório antes de alguém tocar no link. Uma família manda isso para
 * cem pessoas em um minuto, e cada uma dessas cem vê a marca da funerária
 * apresentada com cuidado em vez de uma URL crua.
 *
 * ⛔ E ESTA PÁGINA TAMBÉM NÃO VENDE NADA. Regra 5. O único botão de ação é
 * deixar uma homenagem, que é serviço para quem está aqui, e o único telefone
 * é o da unidade que está com a família, que é informação, não conversão.
 */

export function generateStaticParams() {
  return OBITUARIOS.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/obituario/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const o = obituarioPorSlug(slug);
  if (!o) return {};

  const u = unidadeDo(o);
  const titulo = `${o.nome} (${periodoDeVida(o)})`;
  const descricao = `Velório em ${dataPorExtenso(o.dataVelorio)}, das ${o.horaInicio} às ${
    o.horaTermino
  }, na unidade ${u.nome} do Grupo Serra. ${u.logradouro}, ${u.bairro}, ${u.cidade}.`;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: `/obituario/${o.slug}` },
    openGraph: {
      type: "profile",
      title: titulo,
      description: descricao,
      url: `/obituario/${o.slug}`,
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao },
    /* Registro de demonstração nunca é indexável, mesmo que o site inteiro
       esteja. A trava real é `scripts/sem-exemplo.mjs`, no build; isto aqui é o
       cinto por cima do suspensório. */
    ...(o.ehExemplo ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function Despedida({ params }: PageProps<"/obituario/[slug]">) {
  const { slug } = await params;
  const o = obituarioPorSlug(slug);
  if (!o) notFound();

  const u = unidadeDo(o);
  const endereco = `${u.logradouro}, ${u.bairro}, ${u.cidade} - ${u.uf}`;

  return (
    <>
      <DadosObituario o={o} />

      <HeroiPagina
        rotulo="Despedida"
        titulo={o.nome}
        resumo={
          <span className="numerais">
            {periodoDeVida(o)} · {idadeAoFalecer(o)} anos
          </span>
        }
        foto="/fotos/memorial-sala-velorio.webp"
        posicao="object-[40%_60%]"
      />

      <Faixa fundo="papel">
        <div className="relative mx-auto max-w-[56rem]">
          {o.ehExemplo ? <MarcaExemplo /> : null}

          <div className="relative flex flex-col items-center gap-7 text-center sm:flex-row sm:items-start sm:text-left">
            <Retrato nome={o.nome} className="w-36 shrink-0 shadow-baixa sm:w-44" />
            {/* ⛔ O NOME NÃO SE REPETE AQUI. Ele é o `<h1>` do herói, 400px
                acima, e escrevê-lo de novo ao lado do retrato fazia a mesma
                frase aparecer duas vezes na mesma dobra. O que falta ao lado do
                retrato são as datas por extenso, que no herói só aparecem como
                período. */}
            <div className="min-w-0">
              <p className="numerais font-display text-t3 leading-tight font-bold text-tinta">
                {dataPorExtenso(o.dataNascimento)} — {dataPorExtenso(o.dataFalecimento)}
              </p>
              {o.texto ? (
                <p className="mt-5 max-w-[52ch] text-[1.0625rem] leading-relaxed text-corpo">
                  {o.texto}
                </p>
              ) : null}
            </div>
          </div>

          {/* A CERIMÔNIA. É o bloco pelo qual a pessoa abriu esta página, então
              vem antes de qualquer outra coisa e não disputa espaço com nada. */}
          <div className="mt-10 rounded-serra-lg border border-linha bg-white p-6 shadow-baixa md:p-8">
            <h3 className="flex items-center gap-2.5 font-display text-[1.125rem] font-bold text-tinta">
              <IconeVela className="size-5 shrink-0 text-serra-500" />
              Velório e despedida
            </h3>

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <Linha rotulo="Dia" Icone={IconeRelogio}>
                <span className="numerais">{dataPorExtenso(o.dataVelorio)}</span>
              </Linha>
              <Linha rotulo="Horário" Icone={IconeRelogio}>
                <span className="numerais">
                  das {o.horaInicio} às {o.horaTermino}
                </span>
              </Linha>
              <Linha rotulo="Onde" Icone={IconeLocal}>
                {u.nome}
                <span className="mt-0.5 block text-[0.9375rem] font-normal text-pedra-600">
                  {endereco}
                </span>
              </Linha>
              <Linha rotulo="Depois" Icone={IconeLocal}>
                {o.localSepultamento}
              </Linha>
            </dl>

            <MapaUnidade nome={u.nome} endereco={endereco} className="mt-7" />

            <a
              href={`tel:${u.tel}`}
              className="mt-5 flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra bg-serra-700 px-6 text-[1.0625rem] font-semibold text-white transition-[filter] hover:brightness-110"
            >
              <IconeTelefone className="size-5 shrink-0" />
              <span className="numerais">
                {u.nome} · {u.telefone}
              </span>
            </a>
            <p className="mt-3 text-center text-[0.875rem] text-pedra-600">
              A unidade que está com a família atende 24 horas, todos os dias.
            </p>
          </div>

          {/* Homenagem: o único caminho de saída desta página, e é serviço. */}
          <div className="mt-8 flex flex-col items-center gap-4 rounded-serra-lg border border-verde/30 bg-verde/[0.06] p-6 text-center sm:flex-row sm:text-left">
            <span className="mat-homenagens inline-flex size-12 shrink-0 items-center justify-center rounded-serra text-white">
              <IconeCoracao className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[1.0625rem] font-bold text-tinta">
                Deixar uma homenagem
              </h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-corpo">
                Uma mensagem para a família, com foto se quiser. Toda homenagem passa por leitura
                antes de aparecer.
              </p>
            </div>
            <Link
              href="/homenagens"
              className="inline-flex min-h-[3.25rem] shrink-0 items-center gap-2 rounded-serra border border-verde-forte/40 bg-white px-6 text-[1.0625rem] font-semibold text-verde-forte transition-colors hover:border-verde-forte"
            >
              Escrever
              <IconeSeta className="size-4" />
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/obituario"
              className="link-texto inline-flex min-h-[3.25rem] items-center gap-2 text-[1.0625rem] font-semibold text-serra-700"
            >
              <IconeSeta className="size-4 rotate-180" />
              Ver todas as despedidas
            </Link>
          </div>
        </div>
      </Faixa>
    </>
  );
}

function Linha({
  rotulo,
  Icone,
  children,
}: {
  rotulo: string;
  Icone: typeof IconeLocal;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icone aria-hidden className="mt-1 size-[1.05rem] shrink-0 text-serra-500" />
      <div className="min-w-0">
        <dt className="text-[0.75rem] font-bold tracking-[0.14em] text-pedra-600 uppercase">
          {rotulo}
        </dt>
        <dd className="mt-1 font-display text-[1.0625rem] leading-snug font-bold text-tinta">
          {children}
        </dd>
      </div>
    </div>
  );
}

/**
 * Marca d'água de demonstração.
 *
 * Usa `numero-fantasma`, que é o gesto que a casa já tem para "texto grande em
 * contorno atrás do conteúdo", na cor do bronze das pendências. Fica atrás de
 * tudo (`-z-10`), não recebe ponteiro e some do leitor de tela, que recebe o
 * aviso escrito logo abaixo em vez de uma palavra solta no meio da leitura.
 */
function MarcaExemplo() {
  return (
    <>
      <span
        aria-hidden
        className="numero-fantasma pointer-events-none absolute -top-6 left-1/2 -z-10 -translate-x-1/2 text-[7rem] whitespace-nowrap select-none md:text-[11rem]"
        /* `numero-fantasma` já desenha o contorno a 32% da cor. Passando um
           bronze que JÁ é meio transparente, a conta compõe e o resultado fica
           em torno de 14%: presente quando se procura, e sem competir com o
           texto do aviso que passa por cima dele. No cheio, as letras atrás do
           parágrafo atrapalhavam a leitura. */
        style={{
          ["--luz" as string]: "color-mix(in srgb, var(--color-bronze) 45%, transparent)",
        }}
      >
        EXEMPLO
      </span>
      <p className="mb-8 flex items-start gap-3 rounded-serra border border-dashed border-bronze/60 bg-bronze/[0.07] px-5 py-4 text-[0.9375rem] leading-relaxed text-pedra-700">
        <IconeAlerta className="mt-0.5 size-5 shrink-0 text-bronze-forte" />
        <span>
          <strong className="font-bold text-tinta">Registro de demonstração.</strong> Este nome é
          inventado e não corresponde a nenhuma pessoa. A página existe para mostrar como cada
          despedida vai aparecer, e principalmente como o link dela chega ao WhatsApp.
        </span>
      </p>
    </>
  );
}
