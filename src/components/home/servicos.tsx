import Image from "next/image";
import Link from "next/link";
import { MEMORIAL } from "@/data/unidades";
import { Rotulo, Titulo, TituloCine } from "../ui";
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
    luz: "var(--color-verde)",
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
    luz: "var(--color-serra-500)",
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
    luz: "var(--color-pedra-500)",
    material: "bg-pedra-600",
    veu: "bg-pedra-500",
    texto: "text-pedra-700",
    borda: "hover:border-pedra-300",
    titulo: "Materiais de convalescença",
    resumo:
      "Cama hospitalar, cadeira de rodas, cadeira de banho, andador, muleta e suporte de soro, para alugar. Associado tem desconto.",
  },
];

/**
 * ⛔ REESTRUTURADO EM 11/09/2026, a pedido do dono, e o diagnostico dele estava
 * certo: "Além do plano" era uma seção-gaveta. Cremação, Serra Pet, homenagens,
 * repatriação e convalescença dividiam um título só, e o efeito era que as duas
 * MARCAS PRÓPRIAS do grupo, que têm CNPJ, paleta e site próprios, apareciam
 * como item de lista de uma seção genérica. O Serra Pet, em particular, entrava
 * depois da cremação e sem nenhum destaque.
 *
 * Agora são três seções com pesos diferentes, e o peso é a mensagem:
 *
 *   MEMORIAL   seção própria, superfície terracota, foto real por dentro.
 *   SERRA PET  seção própria, superfície LARANJA CLARA em tela cheia. É a única
 *              seção alegre que uma funerária pode ter sem soar falsa, porque o
 *              assunto é um animal que ainda está vivo quando alguém contrata.
 *   O RESTO    homenagens, repatriação e convalescença, que são serviços e não
 *              marcas, continuam juntos numa faixa menor.
 */
export function Servicos() {
  return (
    <>
      <Cremacao />
      <SerraPet />
      <OutrosServicos />
    </>
  );
}

/**
 * Os serviços que não são marca própria.
 *
 * Faixa menor de propósito: são três serviços reais, mas nenhum deles é uma
 * empresa com paleta própria, e dar a eles o mesmo peso do Memorial seria
 * achatar a hierarquia que as duas seções acima constroem.
 */
function OutrosServicos() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24" id="servicos">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        <Titulo
          centro
          rotulo="Serviços"
          apoio="O plano cobre a cerimônia. Estes são os serviços em volta dela, alguns inclusos, outros contratados à parte."
        >
          O que mais a equipe resolve
        </Titulo>

        <ul className="trilho mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
          {OUTROS.map(({ href, Icone, luz, material, veu, texto, borda, titulo, resumo }) => (
            <li key={titulo} className="flex w-[78%] shrink-0 snap-start sm:w-[55%] md:w-auto md:shrink">
              <Link
                href={href}
                style={{ ["--luz" as string]: luz }}
                className={`cartao-cine holofote group flex w-full flex-col rounded-serra-lg border border-linha bg-white p-7 shadow-baixa ${borda}`}
              >
                <span
                  className={`selo-icone inline-flex size-12 items-center justify-center rounded-serra text-white ${material}`}
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
    /* ⛔ ISTO ERA UM CARTAO DENTRO DE UMA FAIXA, e virou a FAIXA INTEIRA a
     * pedido do dono, com a razao dita por ele: "é um diferencial que nenhuma
     * outra tem". Ele está certo, e a checagem da concorrência confirma:
     * Parque das Flores, Flamboyant e Bracalente terceirizam a cremação. Ter
     * crematório PRÓPRIO é a única coisa que o Grupo Serra faz e os vizinhos
     * de praça não fazem, e um cartão de 76rem no meio de uma seção genérica
     * dizia o contrário do que o fato vale.
     *
     * O desenho é o mesmo, e isso também foi pedido: painel de marca em
     * terracota à esquerda, grade de quatro fotos reais à direita. O que mudou
     * é que ele deixou de flutuar: não há mais contêiner, raio de cartão nem
     * sombra. A seção começa na borda esquerda da tela e termina na direita.
     */
    <section className="mat-memorial-escuro faixa-escura relative isolate overflow-hidden" id="cremacao">
      <div aria-hidden className="fio-luz absolute inset-x-0 top-0 z-[1]" />

      <div className="relative z-[1] mx-auto max-w-[76rem] px-5 pt-16 text-center md:pt-24" data-revela>
        <Rotulo claro cor="var(--color-dourado)">
          O diferencial que nenhuma outra funerária da região tem
        </Rotulo>
        <TituloCine className="mx-auto max-w-[20ch] text-t2 text-white">
          O crematório é nosso
        </TituloCine>
        <p className="mx-auto mt-5 max-w-[58ch] text-lead text-white/80">
          Não terceirizamos. O Complexo Memorial Hortolândia é empresa do grupo,
          com CNPJ e marca próprios, e velório, cerimônia de despedida e cremação
          acontecem todos no mesmo endereço.
        </p>
      </div>

      <div className="relative z-[1] mt-14 grid items-stretch lg:grid-cols-[1.02fr_1fr]" data-revela>
        {/* --- painel de marca --- */}
        <div className="relative px-5 pb-16 md:px-10 md:pb-24 lg:pl-[max(1.25rem,calc((100vw-76rem)/2))]">
          <Image
            src="/marca/logo-memorial.png"
            alt="Complexo Memorial Hortolândia, crematório"
            width={300}
            height={90}
            sizes="220px"
            className="h-14 w-auto"
          />

          <p className="mt-8 max-w-[46ch] text-lead leading-relaxed text-white/85">
            Desde {MEMORIAL.desde} a cremação é feita na própria estrutura. A
            família chega uma vez e não precisa atravessar a cidade no meio do
            dia, nem negociar com duas empresas no pior dia da vida dela.
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/cremacao"
              className="varre group relative inline-flex min-h-[3.25rem] items-center gap-2.5 overflow-hidden rounded-serra bg-white px-6 font-semibold text-memorial transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="relative z-[1] inline-flex items-center gap-2.5">
                Como funciona a cremação
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
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

        {/* --- a estrutura, em foto de verdade, colada na borda da tela --- */}
        <div className="grid grid-cols-2 grid-rows-2 gap-px bg-dourado/25 lg:h-full">
          {ESTRUTURA_FOTOS.map((f, i) => (
            <figure
              key={f.src}
              style={{ ["--i" as string]: i }}
              className="cortina group relative aspect-[4/3] overflow-hidden bg-memorial lg:aspect-auto lg:min-h-[15rem]"
            >
              <Image
                src={f.src}
                alt={f.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={`object-cover ${f.objeto} transition-transform duration-700 group-hover:scale-[1.05]`}
              />
              {/* A foto e DESCOBERTA por uma cortina que sobe, uma depois da
                  outra. Numa grade de quatro, revelar as quatro de uma vez le
                  como imagem que demorou a carregar; em sequencia, le como
                  quem esta mostrando o lugar. */}
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
    </section>
  );
}

/**
 * Serra Pet: SEÇÃO PRÓPRIA, em laranja claro e em tela cheia.
 *
 * ⛔ Era um cartão no meio de "Além do plano", depois da cremação, e o dono
 * apontou o óbvio: a marca não tinha destaque nenhum. Virou seção, com
 * superfície própria e o laranja oficial (#FC5C04) mandando nela inteira.
 *
 * É também a resposta ao "o site está muito escuro": esta é a faixa mais CLARA
 * e mais quente da home, e ela cai exatamente entre duas zonas frias.
 */
function SerraPet() {
  return (
    /* A foto e um recorte com fundo transparente, entao ela ASSENTA na base do
       cartao em vez de flutuar num quadradinho. Antes ficava com 17rem, presa
       numa coluna estreita e com o corte visivel na barriga do cachorro.
       Agora ocupa a altura toda do bloco e o cartao cresce junto. */
    <section className="mat-pet-fundo relative overflow-hidden" id="serra-pet">
      <div className="relative mx-auto grid max-w-[80rem] items-end gap-2 px-5 pt-16 pb-0 md:grid-cols-[1.05fr_minmax(0,28rem)] md:gap-6 md:pt-20" data-revela>
        <div className="pb-14 md:pb-20">
          <Rotulo cor="var(--color-pet)">Serra Pet</Rotulo>
          <TituloCine className="max-w-[18ch] text-t2 text-pet-forte">
            O plano também cuida de quem mora com você
          </TituloCine>
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
          sizes="(min-width: 768px) 28rem, 80vw"
          className="mx-auto -mb-px block w-[85%] max-w-[21rem] self-end sm:w-[70%] md:w-full md:max-w-none"
        />
      </div>
    </section>
  );
}
