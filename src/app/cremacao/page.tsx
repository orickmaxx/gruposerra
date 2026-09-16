import type { Metadata } from "next";
import { metadados } from "@/lib/metadados";
import Image from "next/image";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Botao, Faixa, Pendencia, Rotulo, Titulo } from "@/components/ui";
import { MEMORIAL } from "@/data/unidades";
import { SITE } from "@/lib/site";
import {
  IconeAmparo,
  IconeChama,
  IconeConfere,
  IconeFolha,
  IconeSeta,
  IconeTelefone,
  IconeWhatsApp,
} from "@/components/icones";

const RESUMO =
  "Desde 2021 o Grupo Serra faz a cremação no próprio Complexo Memorial Hortolândia. Velório, cerimônia de despedida e cremação acontecem no mesmo lugar, e a família não se desloca entre empresas no pior dia.";

const META =
  "Crematório próprio em Hortolândia desde 2021: velório, despedida e cremação no mesmo endereço. Como funciona, o que diz a Lei 6.015/73 e o destino das cinzas.";

export const metadata: Metadata = metadados({
  titulo: "Cremação",
  tituloSocial: "Cremação em crematório próprio",
  descricao: META,
  caminho: "/cremacao",
});

/**
 * Cremação.
 *
 * É a página mais delicada do site depois do obituário, porque a pessoa que
 * chega aqui costuma estar decidindo algo irreversível, quase sempre sem ter
 * pensado no assunto antes, e quase sempre em desacordo com alguém da família.
 *
 * Três decisões editoriais, e nenhuma é de design:
 *
 *  1. A LEI APARECE PELO NÚMERO. A Lei Federal nº 6.015/73 exige autorização da
 *     família, e citar a norma responde a desconfiança antes de ela virar
 *     pergunta. É o que o site antigo já fazia, e era a melhor coisa dele.
 *  2. AS RELIGIÕES ENTRAM SEM VEREDITO. O site diz qual é a posição de cada uma
 *     e não recomenda nenhuma. Funerária não é lugar de convencer ninguém a
 *     mudar de fé.
 *  3. NENHUM NÚMERO DE PREÇO. "Custa menos que sepultamento" é argumento que o
 *     próprio cliente usa, e ele entra como comparação de ESTRUTURA de custo
 *     (não há jazigo nem taxa de manutenção), nunca como valor em reais, que
 *     ninguém confirmou.
 */

const ETAPAS = [
  {
    n: 1,
    titulo: "A família autoriza",
    texto:
      "A cremação exige autorização por escrito da família, e quando a pessoa deixou declaração em vida ela é o documento que vale. É a exigência da Lei Federal nº 6.015/73.",
  },
  {
    n: 2,
    titulo: "A documentação corre",
    texto:
      "Certidão de óbito e as autorizações necessárias são conduzidas pela equipe. É a parte que mais trava família em luto, e é a que você não encosta.",
  },
  {
    n: 3,
    titulo: "O velório acontece",
    texto:
      "Nas salas do próprio Memorial, climatizadas, com sala de homenagens e espaço de café. Quem está longe acompanha pelo velório virtual.",
  },
  {
    n: 4,
    titulo: "A cremação e as cinzas",
    texto:
      "A cremação é feita na estrutura do grupo. As cinzas são entregues em urna, e a família decide: levar para casa, espalhar em um lugar afetivo ou guardar no columbário.",
  },
];

const POSICOES = [
  { fe: "Catolicismo", texto: "Permitida desde 1963, com a orientação de que as cinzas sejam guardadas em lugar sagrado." },
  { fe: "Igrejas evangélicas", texto: "A posição varia entre denominações. Vale conversar com a liderança da sua igreja." },
  { fe: "Espiritismo", texto: "Não há restrição doutrinária à cremação." },
  { fe: "Hinduísmo", texto: "A cremação é a prática tradicional." },
  { fe: "Budismo", texto: "A cremação é aceita e é a prática mais comum." },
  { fe: "Judaísmo e islamismo", texto: "A tradição de ambos é o sepultamento." },
];

const DESTINOS = [
  { Icone: IconeAmparo, titulo: "Levar para casa", texto: "As cinzas são entregues em urna e ficam com a família." },
  { Icone: IconeFolha, titulo: "Espalhar em um lugar afetivo", texto: "Um lugar que tinha significado para a pessoa. Vale confirmar se o local permite." },
  { Icone: IconeChama, titulo: "Guardar no columbário", texto: "Nicho no próprio Memorial Hortolândia, com identificação e visitação." },
];

const FOTOS = [
  { src: "/fotos/memorial-sala-velorio.webp", alt: "Uma das quatro salas de velório climatizadas do Memorial", legenda: "Sala de velório" },
  { src: "/fotos/memorial-columbario.webp", alt: "Columbário do Memorial, com nichos de vidro e urnas cinerárias", legenda: "Columbário", objeto: "object-left" },
  { src: "/fotos/memorial-recepcao.webp", alt: "Recepção do Complexo Memorial Hortolândia", legenda: "Recepção" },
  { src: "/fotos/memorial-cafe.webp", alt: "Xícara de café com a marca do Memorial Hortolândia", legenda: "Espaço de café" },
];

export default function Pagina() {
  return (
    <>
      <HeroiPagina
        rotulo="Complexo Memorial Hortolândia"
        cor="var(--color-dourado)"
        linhas={["Cremação em", "crematório próprio."]}
        veu="memorial"
        resumo={RESUMO}
        foto="/fotos/memorial-columbario.webp"
        posicao="object-center"
        acoes={
          <>
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              ima
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              Falar agora, {SITE.emergencia.rotulo}
            </Botao>
            <Botao href={MEMORIAL.site} externo tom="vidro">
              Site do Memorial
              <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Botao>
          </>
        }
      />

      {/* --- como funciona, na ordem --- */}
      <Faixa fundo="areia" id="como-funciona">
        <Titulo
          rotulo="O processo"
          cor="var(--color-memorial)"
          apoio="Quem nunca precisou não sabe o que acontece, e a dúvida é uma das coisas que mais assusta. É isto, na ordem."
        >
          Como funciona, do começo ao fim
        </Titulo>

        <ol className="mt-12 grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ETAPAS.map((e) => (
            <li key={e.n} className="item-cascata" style={{ ["--i" as string]: e.n }}>
              <article
                className="cartao-cine holofote aro-luz relative flex h-full flex-col overflow-hidden rounded-serra-lg border border-dourado/30 bg-white p-6 shadow-baixa"
                style={{ ["--luz" as string]: "var(--color-memorial)" }}
              >
                <span
                  aria-hidden
                  className="numerais numero-fantasma pointer-events-none absolute -top-1 right-3 text-[5.5rem] select-none"
                >
                  {e.n}
                </span>
                <span
                  aria-hidden
                  className="h-1 w-10 rounded-full bg-gradient-to-r from-memorial to-dourado"
                />
                <h3 className="mt-5 font-display text-[1.0625rem] font-bold text-tinta">{e.titulo}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-corpo">{e.texto}</p>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-[62rem]">
          <Pendencia>
            O <strong className="font-bold">prazo</strong> entre a autorização e a entrega das cinzas
            varia com a documentação de cada caso, e o Grupo Serra não publica um número. Pergunte à
            equipe: prazo prometido por site e não cumprido vira processo, não vira venda.
          </Pendencia>
        </div>
      </Faixa>

      {/* --- a estrutura, em foto de verdade --- */}
      <section className="mat-memorial-escuro faixa-escura relative isolate overflow-hidden">
        <div aria-hidden className="fio-luz absolute inset-x-0 top-0 z-[1]" />
        <div className="relative z-[1] mx-auto max-w-[80rem] px-5 py-16 md:py-24" data-revela>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <Image
                src="/marca/logo-memorial.png"
                alt="Complexo Memorial Hortolândia, crematório"
                width={300}
                height={90}
                sizes="220px"
                className="h-14 w-auto"
              />
              <Titulo claro apoio="Tudo no mesmo endereço: velório, despedida e cremação. A família chega uma vez e não precisa atravessar a cidade no meio do dia.">
                A estrutura, por dentro
              </Titulo>

              <ul className="mt-8 grid gap-y-2.5 border-t border-dourado/30 pt-7 sm:grid-cols-2">
                {MEMORIAL.estrutura.map((e) => (
                  <li key={e} className="flex gap-3 text-[0.9375rem] text-white/85">
                    <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-dourado" />
                    {e}
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-[0.9375rem] text-white/65">
                {MEMORIAL.logradouro}, {MEMORIAL.bairro}, {MEMORIAL.cidade}/{MEMORIAL.uf}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px rounded-serra-xl bg-dourado/25 p-px">
              {FOTOS.map((f, i) => (
                <figure
                  key={f.src}
                  style={{ ["--i" as string]: i }}
                  className="cortina group relative aspect-[4/3] overflow-hidden bg-memorial first:rounded-tl-serra-xl last:rounded-br-serra-xl [&:nth-child(2)]:rounded-tr-serra-xl [&:nth-child(3)]:rounded-bl-serra-xl"
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 20rem, 45vw"
                    className={`object-cover ${f.objeto ?? "object-center"} transition-transform duration-700 group-hover:scale-[1.05]`}
                  />
                  <span
                    aria-hidden
                    className="cortina-veu pointer-events-none absolute inset-0 z-[2] origin-bottom bg-memorial"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-memorial/90 via-memorial/40 to-transparent px-4 pt-12 pb-3 text-[0.8125rem] font-semibold text-white">
                    {f.legenda}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- destino das cinzas --- */}
      <Faixa>
        <Titulo
          centro
          rotulo="Depois"
          cor="var(--color-memorial)"
          apoio="A urna é entregue à família, e a decisão é dela. Não há prazo para decidir e não há uma escolha certa."
        >
          O que fazer com as cinzas
        </Titulo>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {DESTINOS.map(({ Icone, titulo, texto }, i) => (
            <li key={titulo} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <article
                className="cartao-cine holofote flex w-full flex-col rounded-serra-lg border border-linha bg-white p-7 shadow-baixa"
                style={{ ["--luz" as string]: "var(--color-memorial)" }}
              >
                <span className="selo-icone mat-cremacao inline-flex size-12 items-center justify-center rounded-serra text-white">
                  <Icone className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-[1.125rem] font-bold text-tinta">{titulo}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pedra-600">{texto}</p>
              </article>
            </li>
          ))}
        </ul>
      </Faixa>

      {/* --- religiões --- */}
      <Faixa fundo="papel">
        <Titulo
          rotulo="A pergunta que sempre vem"
          cor="var(--color-memorial)"
          apoio="Esta seção informa e não recomenda. A decisão é da família, e o site não tem opinião sobre a fé de ninguém."
        >
          A minha religião permite cremação?
        </Titulo>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {POSICOES.map((p, i) => (
            <li
              key={p.fe}
              className="holofote item-cascata rounded-serra-lg border border-linha bg-white p-6 transition-colors duration-500"
              style={{ ["--i" as string]: i, ["--luz" as string]: "var(--color-memorial)" }}
            >
              <h3 className="font-display text-[1.0625rem] font-bold text-tinta">{p.fe}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-corpo">{p.texto}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex max-w-[64rem] gap-4 rounded-serra-lg border border-serra-200 bg-white p-6 shadow-baixa">
          <IconeConfere className="mt-0.5 size-6 shrink-0 text-serra-500" />
          <p className="text-[0.9375rem] leading-relaxed text-corpo">
            <strong className="font-bold text-tinta">Lei Federal nº 6.015/73.</strong> A cremação só
            acontece com autorização da família. Quando a pessoa deixou declaração de vontade em
            vida, é esse documento que orienta a decisão, e é por isso que vale escrever e guardar
            junto com os documentos pessoais.
          </p>
        </div>
      </Faixa>

      {/* --- fecho --- */}
      <Faixa fundo="escuro">
        <div className="mx-auto max-w-[46rem] text-center">
          <Rotulo claro>Ainda em dúvida</Rotulo>
          <Titulo
            claro
            centro
            apoio="Se a decisão é para agora, ligue. Se é para planejar com calma, também ligue: a equipe explica o que entra no plano e o que é contratado à parte, sem script de venda."
          >
            Pergunte antes de decidir
          </Titulo>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              ima
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergencia.rotulo}
            </Botao>
            <Botao
              href={SITE.whatsapp.link}
              externo
              tom="zap"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              Falar no WhatsApp
            </Botao>
          </div>
        </div>
      </Faixa>
    </>
  );
}
