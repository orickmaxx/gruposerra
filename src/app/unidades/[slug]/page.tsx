import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Botao, Faixa, Pendencia, Titulo } from "@/components/ui";
import { MapaUnidade } from "@/components/mapa-unidade";
import { MolduraFoto } from "@/components/moldura-foto";
import { CartaoObituario } from "@/components/obituario/cartao";
import { DadosUnidade } from "@/components/dados-estruturados";
import { UNIDADES } from "@/data/unidades";
import { OBITUARIOS_RECENTES } from "@/data/obituarios";
import { SITE } from "@/lib/site";
import {
  IconeLocal,
  IconeRelogio,
  IconeSeta,
  IconeTelefone,
  IconeWhatsApp,
} from "@/components/icones";

/**
 * A página de UMA unidade.
 *
 * ⛔ ELA JÁ ERA PROMETIDA E NÃO EXISTIA. O `sitemap.ts` publicava
 * `/unidades/<slug>` para as oito desde sempre, e as oito devolviam 404: um
 * terço do sitemap apontando para o nada, que é a primeira coisa que qualquer
 * auditoria de SEO encontra. O dado nunca foi o problema — ele está inteiro em
 * `data/unidades.ts`, com endereço, telefone, horário e coordenada.
 *
 * O que estas páginas ganham, e a listagem não dava: uma URL por CIDADE, com
 * `FuneralHome` próprio, título e descrição próprios. É o que disputa a busca
 * por "funerária em Valinhos", "velório em Vinhedo", "funerária Cosmópolis" —
 * quatro cidades onde o Grupo Serra tem casa e nenhum concorrente da praça tem
 * página dedicada. Contra o Zelo, que tem escala nacional, o trunfo do Serra é
 * exatamente este: estar na cidade. A página é onde isso vira busca.
 */

export function generateStaticParams() {
  return UNIDADES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/unidades/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const u = UNIDADES.find((x) => x.slug === slug);
  if (!u) return {};

  const titulo = `Funerária em ${u.cidade}`;
  const descricao = `Unidade ${u.nome} do Grupo Serra: ${u.logradouro}, ${u.bairro}, ${u.cidade}/${u.uf}. Telefone ${u.telefone}. Atendimento de óbito 24 horas, todos os dias.`;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: `/unidades/${u.slug}` },
    openGraph: {
      title: `${titulo} · ${SITE.nome}`,
      description: descricao,
      url: `/unidades/${u.slug}`,
    },
  };
}

export default async function Unidade({ params }: PageProps<"/unidades/[slug]">) {
  const { slug } = await params;
  const u = UNIDADES.find((x) => x.slug === slug);
  if (!u) notFound();

  const endereco = `${u.logradouro}, ${u.bairro}, ${u.cidade}/${u.uf}`;
  const daUnidade = OBITUARIOS_RECENTES.filter((o) => o.unidade === u.slug).slice(0, 3);
  const outras = UNIDADES.filter((x) => x.slug !== u.slug);

  return (
    <>
      <DadosUnidade u={u} />

      <HeroiPagina
        /* ⛔ A MATRIZ NÃO GANHA "desde 1961" AQUI. O ano está em
           `unidades.ts`, mas `SITE.fundacaoConfirmada` é false e não existe
           prova pública de 1961 (CLAUDE.md 4.1). Não vou criar uma afirmação
           nova enquanto o documento não chegar. */
        rotulo={u.matriz ? "Matriz" : `Unidade desde ${u.desde}`}
        titulo={u.nome}
        resumo={`${endereco}. Equipe e telefone na própria cidade, e atendimento de óbito 24 horas, todos os dias, inclusive no feriado.`}
        foto="/fotos/memorial-atendimento.webp"
        posicao="object-[50%_40%]"
        acoes={
          <Botao
            href={`tel:${u.tel}`}
            externo
            ima
            tom="claro"
            icone={<IconeTelefone className="size-5 shrink-0" />}
          >
            {u.telefone}
          </Botao>
        }
      />

      <Faixa fundo="papel">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <Titulo rotulo="Onde fica" apoio="O telefone leva direto para a equipe desta cidade, não para uma central.">
              {u.cidade}
            </Titulo>

            <dl className="mt-10 space-y-5">
              <Item rotulo="Endereço" Icone={IconeLocal}>
                {u.logradouro}
                <span className="mt-0.5 block text-[0.9375rem] font-normal text-pedra-600">
                  {u.bairro}, {u.cidade}/{u.uf}
                  {u.cep ? ` · CEP ${u.cep}` : ""}
                </span>
              </Item>

              <Item rotulo="Telefone" Icone={IconeTelefone}>
                <a href={`tel:${u.tel}`} className="numerais link-texto">
                  {u.telefone}
                </a>
              </Item>

              <Item rotulo="Balcão" Icone={IconeRelogio}>
                <span className="numerais text-[1.0625rem] font-normal text-corpo">
                  {u.horario}
                </span>
                <span className="mt-1 block text-[0.9375rem] font-bold text-tinta">
                  Óbito: 24 horas, todos os dias.
                </span>
              </Item>
            </dl>

            <MapaUnidade className="mt-8" nome={u.nome} endereco={endereco} />

            {!u.cep ? (
              <div className="mt-6">
                <Pendencia>
                  O CEP desta unidade não consta do material do cliente e não foi preenchido por
                  estimativa. Endereço errado numa página de funerária manda uma família para a rua
                  errada no pior dia da vida dela.
                </Pendencia>
              </div>
            ) : null}
          </div>

          <div>
            {/* O espaço da fachada já está dimensionado. Quando a foto chegar,
                passa-se `src` e nada mais muda. Ver `moldura-foto.tsx`. */}
            <MolduraFoto
              proporcao="4/3"
              titulo={`Fachada da unidade ${u.nome}`}
              detalhe="Foto pendente com o cliente. É a prova de presença física que nenhum concorrente da praça mostra."
            />

            <div className="mt-6 rounded-serra-lg border border-linha bg-white p-6">
              <h3 className="font-display text-[1.0625rem] font-bold text-tinta">
                Precisa de atendimento agora
              </h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-corpo">
                Ligue para esta unidade a qualquer hora. Se preferir mensagem, o WhatsApp é o mesmo
                para as oito.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={`tel:${u.tel}`}
                  className="botao-cheio numerais inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-5 text-[1.0625rem] font-semibold text-white transition-[filter] hover:brightness-110"
                >
                  <IconeTelefone className="size-5 shrink-0" />
                  {u.telefone}
                </a>
                <a
                  href={SITE.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mat-zap inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-5 text-[1.0625rem] font-semibold text-white transition-[filter] hover:brightness-105"
                >
                  <IconeWhatsApp className="size-5 shrink-0" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </Faixa>

      {daUnidade.length > 0 ? (
        <Faixa>
          <Titulo
            rotulo="Obituário"
            apoio={`Cerimônias em andamento nesta unidade. Esta parte do site não vende nada.`}
          >
            Despedidas em {u.cidade}
          </Titulo>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {daUnidade.map((o, i) => (
              <CartaoObituario key={o.slug} o={o} indice={i} />
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/obituario"
              className="link-texto inline-flex min-h-[3.25rem] items-center gap-2 text-[1.0625rem] font-semibold text-serra-700"
            >
              Ver o obituário completo
              <IconeSeta className="size-4" />
            </Link>
          </div>
        </Faixa>
      ) : null}

      <Faixa fundo="escuro">
        <Titulo
          claro
          centro
          rotulo="As outras sete"
          apoio="São oito unidades próprias na região metropolitana de Campinas, cada uma com equipe na própria cidade."
        >
          Se não for esta a mais perto
        </Titulo>
        <ul className="mt-12 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {outras.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/unidades/${o.slug}`}
                className="holofote holofote-escuro group flex items-center justify-between gap-3 rounded-serra border border-white/12 px-4 py-3 transition-colors hover:border-white/30 hover:bg-white/[0.06]"
              >
                <span className="text-[0.9375rem] text-white/75 group-hover:text-white">
                  {o.nome}
                </span>
                <span className="numerais text-[0.9375rem] font-bold whitespace-nowrap text-onda-400">
                  {o.telefone}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Faixa>
    </>
  );
}

/** Mesma regra de `<dl>` da página de despedida: só `<dt>`, `<dd>` e o `<div>`
 *  que agrupa o par. O ícone vai dentro do `<dt>`. */
function Item({
  rotulo,
  Icone,
  children,
}: {
  rotulo: string;
  Icone: typeof IconeLocal;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="flex items-center gap-2 text-[0.75rem] font-bold tracking-[0.14em] text-pedra-600 uppercase">
        <Icone aria-hidden className="size-[1.15rem] shrink-0 text-serra-500" />
        {rotulo}
      </dt>
      <dd className="mt-1.5 font-display text-[1.0625rem] leading-snug font-bold text-tinta">
        {children}
      </dd>
    </div>
  );
}
