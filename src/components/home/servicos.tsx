import Image from "next/image";
import Link from "next/link";
import { MEMORIAL } from "@/data/unidades";
import { Titulo } from "../ui";
import {
  IconeAviao,
  IconeCama,
  IconeFolha,
  IconeSeta,
} from "../icones";

/**
 * Serviços além do plano.
 *
 * Esta secao era a zona morta da pagina: um cartao de cremacao branco com um
 * icone dourado, seguido de quatro linhas com icone de 20px em fundo de 10% de
 * opacidade. Nenhuma cor, nenhuma foto, nada para o olho reconhecer.
 *
 * O que mudou, e por que agora e legitimo:
 *
 *  1. O CREMATORIO TEM MARCA PROPRIA e ela e do grupo. O logotipo do Complexo
 *     Memorial Hortolandia, a terracota #6D3316 e o dourado #C9B167 vieram do
 *     site do proprio Memorial, junto com as FOTOS REAIS da recepcao, do
 *     columbario, do cafe e da sala de velorio. Nada aqui e banco de imagens e
 *     nada e icone desenhado para fingir de logo: e o material da empresa.
 *
 *  2. O SERRA PET TEM COR PROPRIA, o laranja #E75C0D, e a foto que a propria
 *     marca usa. Antes o Serra Pet aparecia em azul, igual a tudo.
 *
 *  3. Homenagens continua verde e repatriacao e convalescenca ficam em azul e
 *     pedra. Cada servico e reconhecivel pela cor antes de ser lido, que era
 *     exatamente o que o codigo de cor herdado do site antigo prometia e a
 *     versao anterior nao entregava.
 */

const ESTRUTURA_FOTOS = [
  {
    src: "/fotos/memorial-recepcao.webp",
    alt: "Recepção do Complexo Memorial Hortolândia, com a marca na parede",
    legenda: "Recepção",
    objeto: "object-center",
  },
  {
    src: "/fotos/memorial-sala-velorio.webp",
    alt: "Uma das quatro salas de velório climatizadas do Memorial",
    legenda: "Sala de velório",
    objeto: "object-center",
  },
  {
    src: "/fotos/memorial-columbario.webp",
    alt: "Columbário do Memorial, com nichos de vidro e urnas cinerárias",
    legenda: "Columbário",
    objeto: "object-left",
  },
  {
    src: "/fotos/memorial-cafe.webp",
    alt: "Xícara de café com a marca do Memorial Hortolândia",
    legenda: "Espaço de café",
    objeto: "object-center",
  },
];

const OUTROS = [
  {
    href: "/homenagens",
    Icone: IconeFolha,
    material: "mat-homenagens",
    veu: "bg-verde",
    texto: "text-verde-forte",
    borda: "hover:border-verde/50",
    titulo: "Homenagens",
    resumo:
      "Um mural para deixar uma mensagem de carinho, com foto, e compartilhar com quem não pôde ir.",
  },
  {
    href: "/contato",
    Icone: IconeAviao,
    material: "botao-cheio",
    veu: "bg-serra-500",
    texto: "text-serra-600",
    borda: "hover:border-serra-300",
    titulo: "Repatriação",
    resumo:
      "Traslado do falecido até o país de origem, com a documentação conduzida pela equipe.",
  },
  {
    href: "/contato",
    Icone: IconeCama,
    material: "bg-pedra-600",
    veu: "bg-pedra-500",
    texto: "text-pedra-700",
    borda: "hover:border-pedra-300",
    titulo: "Materiais de convalescença",
    resumo:
      "Cama hospitalar, cadeira de rodas, cadeira de banho, andador, muleta e suporte de soro, para alugar. Associado tem desconto.",
  },
];

export function Servicos() {
  return (
    <section className="mat-memorial-fundo overflow-hidden py-12 md:py-20" id="servicos">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        <Titulo centro apoio="O plano cobre a cerimônia. Estes são os serviços em volta dela, alguns inclusos, outros contratados à parte.">
          Além do plano
        </Titulo>

        <Cremacao />
        <SerraPet />

        <ul className="trilho mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
          {OUTROS.map(({ href, Icone, material, veu, texto, borda, titulo, resumo }) => (
            <li key={titulo} className="flex w-[78%] shrink-0 snap-start sm:w-[55%] md:w-auto md:shrink">
              <Link
                href={href}
                className={`cartao group flex w-full flex-col rounded-serra-lg border border-white bg-white/85 p-7 shadow-media backdrop-blur-sm ${borda}`}
              >
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-serra text-white ${material}`}
                >
                  <Icone className="size-6" />
                </span>
                <span className={`mt-5 flex items-center gap-2 font-display text-[1.1875rem] font-bold ${texto}`}>
                  {titulo}
                  <IconeSeta className="size-[1.05rem] shrink-0 opacity-60 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="mt-2.5 block text-[0.9375rem] leading-relaxed text-pedra-600">
                  {resumo}
                </span>
                <span aria-hidden className={`mt-6 h-1 w-14 rounded-full ${veu}`} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Cremação, com a marca e as fotos do próprio Memorial Hortolândia.
 *
 * O crematorio nao e "um servico a mais" do Grupo Serra: e uma empresa do
 * grupo (CNPJ 34.503.357/0001-04), com marca, fachada e paleta propria. Tratar
 * assim, e nao como um item de lista, e o que da a esta secao o peso que ela
 * tem na vida real.
 */
function Cremacao() {
  return (
    <article className="mt-12 overflow-hidden rounded-serra-xl shadow-alta">
      <div className="grid lg:grid-cols-[1.02fr_1fr]">
        {/* --- painel de marca, na terracota do Memorial --- */}
        <div className="mat-memorial-escuro relative p-8 md:p-11">
          <Image
            src="/marca/logo-memorial.png"
            alt="Complexo Memorial Hortolândia, crematório"
            width={300}
            height={90}
            className="h-14 w-auto"
          />

          <h3 className="mt-8 max-w-[16ch] text-t2 text-white">
            Cremação em crematório próprio
          </h3>

          <p className="mt-5 max-w-[46ch] leading-relaxed text-white/85">
            Desde {MEMORIAL.desde} o Grupo Serra faz a cremação na própria
            estrutura. Velório, cerimônia de despedida e cremação acontecem no
            mesmo lugar, sem a família ter que se deslocar entre empresas no
            pior dia.
          </p>

          <ul className="mt-8 grid gap-y-2.5 border-t border-dourado/30 pt-7 sm:grid-cols-2 sm:gap-x-6">
            {MEMORIAL.estrutura.map((e) => (
              <li key={e} className="flex gap-3 text-[0.9375rem] text-white/85">
                <span
                  aria-hidden
                  className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-dourado"
                />
                {e}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-[0.9375rem] text-white/65">
            {MEMORIAL.logradouro}, {MEMORIAL.bairro}, {MEMORIAL.cidade}/
            {MEMORIAL.uf}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/cremacao"
              className="group inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-serra bg-white px-6 font-semibold text-memorial transition-all duration-300 hover:-translate-y-0.5 hover:bg-dourado-claro"
            >
              Como funciona a cremação
              <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={MEMORIAL.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3.25rem] items-center rounded-serra border border-dourado/60 px-6 font-semibold text-dourado transition-all duration-300 hover:-translate-y-0.5 hover:bg-dourado/15"
            >
              Site do Memorial
            </a>
          </div>
        </div>

        {/* --- a estrutura, em foto de verdade ---
            Grade de quatro celulas iguais que ESTICA ate a altura do painel de
            marca ao lado. A versao anterior tinha proporcao fixa por foto e
            sobrava um retangulo vazio embaixo, que e o tipo de buraco que
            entrega montagem. */}
        <div className="grid grid-cols-2 grid-rows-2 gap-px bg-dourado/25 lg:h-full">
          {ESTRUTURA_FOTOS.map((f) => (
            <figure
              key={f.src}
              className="group relative aspect-[4/3] overflow-hidden bg-memorial lg:aspect-auto lg:min-h-[13rem]"
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 1024px) 18rem, 50vw"
                className={`object-cover ${f.objeto} transition-transform duration-700 group-hover:scale-[1.05]`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-memorial/90 via-memorial/40 to-transparent px-4 pt-12 pb-3 text-[0.8125rem] font-semibold text-white">
                {f.legenda}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
}

/**
 * Serra Pet, no laranja da propria marca e com a imagem que ela ja usa.
 */
function SerraPet() {
  return (
    /* A foto e um recorte com fundo transparente, entao ela ASSENTA na base do
       cartao em vez de flutuar num quadradinho. Antes ficava com 17rem, presa
       numa coluna estreita e com o corte visivel na barriga do cachorro.
       Agora ocupa a altura toda do bloco e o cartao cresce junto. */
    <article className="mat-pet-fundo cartao relative mt-6 overflow-hidden rounded-serra-xl border border-pet/25 shadow-media">
      <div className="relative grid items-end gap-2 p-7 pb-0 md:grid-cols-[1.05fr_minmax(0,26rem)] md:gap-4 md:p-11 md:pb-0">
        <div className="pb-2 md:pb-11">
          <span className="mat-pet inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.8125rem] font-bold tracking-wide text-white uppercase">
            Serra Pet
          </span>
          <h3 className="mt-5 max-w-[18ch] text-t2 text-pet-forte">
            O plano também cuida de quem mora com você
          </h3>
          <p className="mt-5 max-w-[52ch] text-lead leading-relaxed text-pedra-700">
            Remoção 24 horas na região de Campinas, cremação individual com as
            cinzas devolvidas em urna, ou coletiva em espaço ecológico, e
            certificado de cremação. Até 3 pets no mesmo plano.
          </p>
          <Link
            href="/serra-pet"
            className="mat-pet group mt-8 inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            Conhecer o Serra Pet
            <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <Image
          src="/fotos/serra-pet-animais.webp"
          alt="Um cachorro e um gato, as duas espécies atendidas pelo Serra Pet"
          width={760}
          height={659}
          sizes="(min-width: 768px) 26rem, 80vw"
          className="mx-auto -mb-px block w-[85%] max-w-[19rem] self-end sm:w-[70%] md:w-full md:max-w-none"
        />
      </div>
    </article>
  );
}
