import Image from "next/image";
import Link from "next/link";
import { MEMORIAL } from "@/data/unidades";
import { Rotulo, Titulo, TituloCine } from "../ui";
import { Ima } from "../movimento";
import {
  IconeAviao,
  IconeCama,
  IconeFolha,
  IconePata,
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

/**
 * Os tres fatos do Serra Pet, tirados de dentro do paragrafo.
 *
 * Estavam os quatro numa frase so ("Remocao 24 horas na regiao de Campinas,
 * cremacao individual com as cinzas devolvidas em urna, ou coletiva em espaco
 * ecologico, e certificado de cremacao. Ate 3 pets no mesmo plano."), que e
 * mais informacao do que qualquer pessoa le de uma vez numa linha corrida.
 * Fonte: material do proprio Serra Pet, CLAUDE.md parte 4.5.
 */
const PET_FATOS = [
  { titulo: "Remoção 24h", detalhe: "frota própria, região de Campinas" },
  { titulo: "Cremação individual", detalhe: "cinzas em urna, com certificado" },
  { titulo: "Até 3 pets", detalhe: "no mesmo plano" },
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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {/* O ima e o gesto de CTA principal do site, e esta secao era a
                unica faixa de marca da home que nao o tinha. */}
            <Ima>
              <Link
                href="/cremacao"
                className="varre group relative inline-flex min-h-[3.25rem] items-center gap-2.5 overflow-hidden rounded-serra bg-white px-6 font-semibold text-memorial transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-[1] inline-flex items-center gap-2.5">
                  Como funciona a cremação
                  <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Ima>
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

            ⛔ A grade NASCEU COLADA nas bordas da tela e com as quatro quinas
            em angulo reto, e o dono apontou as duas coisas na mesma frase:
            "o grid das fotos está muito ao canto, bordas todas pontudas". O
            desenho colado era proposital e estava errado: num painel que ja e
            uma faixa de marca inteira, a foto sem moldura le como imagem que
            vazou do layout, nao como escolha. E no celular ela encostava nos
            dois lados enquanto todo o resto da pagina respira 20px.

            Agora a grade tem o mesmo respiro do painel de texto do outro lado,
            canto arredondado, moldura de um fio de ouro e sombra. E ela deixou
            de ser um mosaico parado: o conjunto inteiro e UM objeto que inclina
            de leve seguindo o ponteiro, com o brilho especular correndo junto,
            enquanto cada foto continua com a cortina que a descobre, o holofote
            na cor da marca do Memorial e a legenda que sobe com um fio de ouro
            ao passar por cima.

            ⛔ SEM BRILHO ESPECULAR. O `.relevo-luz` corre um facho branco pela
            superficie quando ela inclina, e em cartao de texto isso le como
            vidro. Em cima de FOTOGRAFIA ele lava a imagem e some com a cor do
            Memorial, e o dono pediu para tirar: "adorei o novo 3d, mantenha,
            mas tire o brilho branco de quando passa o mouse". A inclinacao
            sozinha ja diz que o bloco tem superficie.

            O giro e 4 graus, metade do teto do projeto: o bloco e grande e
            carrega fotografia, e acima disso a borda de cima comeca a desfocar.
            `.relevo` mora no INVOLUCRO e a escala de cada foto no `<img>`, que
            sao elementos diferentes, entao os dois `transform` nao se apagam. */}
        <div className="palco3d px-5 pb-16 md:px-10 md:pb-24 lg:pr-[max(1.25rem,calc((100vw-76rem)/2))] lg:pl-0">
          <div
            data-giro="4"
            className="relevo aro-luz relative grid grid-cols-2 grid-rows-2 gap-px overflow-hidden rounded-serra-lg bg-dourado/30 shadow-cine ring-1 ring-dourado/35 lg:h-full lg:min-h-[30rem]"
            style={{
              ["--luz" as string]: "var(--color-dourado)",
              ["--aro" as string]:
                "linear-gradient(100deg, #6d3316, #c9b167 55%, #e3d3a0)",
            }}
          >
            {ESTRUTURA_FOTOS.map((f, i) => (
              <figure
                key={f.src}
                style={{ ["--i" as string]: i }}
                className="cortina holofote holofote-escuro group relative aspect-[4/3] overflow-hidden bg-memorial lg:aspect-auto lg:min-h-[15rem]"
              >
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className={`object-cover ${f.objeto} transition-transform duration-700 group-hover:scale-[1.06]`}
                />
                {/* A foto e DESCOBERTA por uma cortina que sobe, uma depois da
                    outra. Numa grade de quatro, revelar as quatro de uma vez le
                    como imagem que demorou a carregar; em sequencia, le como
                    quem esta mostrando o lugar. */}
                <span
                  aria-hidden
                  className="cortina-veu pointer-events-none absolute inset-0 z-[2] origin-bottom bg-memorial"
                />
                <figcaption className="absolute inset-x-0 bottom-0 z-[3] bg-gradient-to-t from-memorial/95 via-memorial/45 to-transparent px-4 pt-12 pb-3.5 text-[0.8125rem] font-semibold text-white">
                  <span
                    aria-hidden
                    className="mb-2 block h-px w-6 origin-left scale-x-100 bg-dourado transition-transform duration-500 group-hover:scale-x-[2.6]"
                  />
                  {f.legenda}
                </figcaption>
              </figure>
            ))}
          </div>
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
    /* ⛔ "Seção pet extremamente simples e sem vida nenhuma", e era mesmo: um
       título, um parágrafo de cinco linhas, um botão e uma foto. Nenhum dos
       gestos que a home usa em toda parte chegava aqui, e o parágrafo carregava
       sozinho quatro fatos diferentes, então ninguém lia nenhum dos quatro.

       O que entrou, e cada coisa resolve uma das duas queixas:

       VIDA.  Grão de filme, um brilho quente atrás dos animais, a pata da marca
              em marca d'água no canto, e a foto flutuando em paralaxe enquanto
              a página rola. A superfície continua sendo a faixa mais clara da
              home, que é o papel dela no ritmo.
       PESO.  Os três fatos saíram do parágrafo e viraram cartões com elevação,
              holofote na cor da marca e aro de luz, que é o mesmo tratamento
              que os planos e os serviços recebem. O parágrafo que sobrou fala
              com quem está lendo em vez de listar cobertura.

       O laranja é o oficial da marca (#FC5C04), e a luz dos cartões é ele. */
    <section className="mat-pet-fundo grao relative isolate overflow-hidden" id="serra-pet">
      {/* ⛔ O BRILHO LARANJA SAIU DE TRAS DA FOTO. Ele era uma mancha de
          rgba(252,92,4,.32) bem no lugar onde a imagem fica, e o dono viu o
          efeito antes de saber a causa: "o recorte da imagem da familia ta
          extremamente evidente pois voce aplica o efeito laranja por baixo".
          Ele acertou. A foto e um retangulo de estudio com fundo BRANCO, e o
          que denuncia a emenda de um branco e qualquer cor atras dele. A
          mascara radial dissolvia a borda, mas dissolvia branco POR CIMA DE
          LARANJA, o que so trocava um degrau seco por um degrau suave.

          Agora sao duas coisas, e elas se somam: o laranja foi para tras do
          TEXTO, onde nao ha nada para denunciar, e no lugar dele, atras da
          foto, entrou um halo BRANCO maior que a imagem. O fundo do estudio
          passa a assentar em cima de branco, entao nao existe mais emenda para
          enxergar, e quem se dissolve na cor da secao e o halo, que nao tem
          borda nenhuma. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[-14%] -z-10 size-[30rem] -translate-y-1/2 rounded-full opacity-45 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(252,92,4,.26), transparent 70%)" }}
      />
      {/* ⛔ A FOTO E FUNDO DA SECAO, NAO UM ELEMENTO EM CIMA DELA. O dono:
          "qual a dificuldade de colocar essa familia como background da secao
          pra nao ficar essa merda feia com recorte". Ele esta certo e o
          diagnostico e simples: toda mascara que recorta uma imagem cria uma
          BORDA, e borda arredondada em cima de uma superficie de cor e
          exatamente o "recorte" que ele esta vendo. Nenhum ajuste de raio
          resolve isso, porque o problema e a existencia da borda.

          A saida e nao ter borda em lado nenhum. A foto encosta no topo, na
          base e na direita da secao, entao esses tres lados somem dentro dos
          limites da propria faixa. Sobra UM lado, o esquerdo, e ele e um
          degrade linear, que nao e recorte, e transicao.

          Esta lavagem branca e o que faz isso funcionar: o fundo do estudio e
          branco puro, e branco em cima de creme sempre denuncia a emenda. Com
          a metade direita da secao lavada de branco, a foto assenta em cima da
          propria cor dela e quem se dissolve no creme e a lavagem, que nao tem
          contorno nenhum. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full md:w-[74%]"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.55) 26%, #ffffff 46%)",
        }}
      />
      <IconePata
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 -z-10 size-[22rem] text-pet opacity-[0.06]"
      />

      <div
        className="relative mx-auto max-w-[80rem] px-5 pt-16 pb-0 md:pt-20"
        data-revela
      >
        <div className="grid items-end gap-4 md:grid-cols-[minmax(0,30rem)_1fr] md:gap-8">
          <div className="pb-10 md:pb-16">
            <Rotulo cor="var(--color-pet)">Serra Pet</Rotulo>
            <TituloCine className="max-w-[18ch] text-t2 text-pet-forte">
              O plano também cuida de quem mora com você
            </TituloCine>
            <p className="mt-5 max-w-[46ch] text-lead leading-relaxed text-pedra-700">
              Quando o animal da casa morre, quase ninguém sabe para quem ligar,
              e a pressa faz decidir mal. O Serra Pet atende essa hora com a
              mesma equipe e a mesma frota do resto do grupo.
            </p>

            <Ima className="mt-8 inline-block">
              <Link
                href="/serra-pet"
                className="mat-pet varre group relative inline-flex min-h-[3.25rem] items-center gap-2.5 overflow-hidden rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-[1] inline-flex items-center gap-2.5">
                  Conhecer o Serra Pet
                  <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Ima>
          </div>

          {/* A FOTO DA FAMILIA, escolhida pelo dono em 11/09/2026 no lugar do
              recorte do cachorro com o gato. A troca faz sentido alem do gosto:
              o recorte mostrava o PRODUTO (dois bichos), e o argumento desta
              secao nao e o bicho, e a casa. Tres geracoes e dois animais dizem
              "quem mora com voce" melhor do que o titulo consegue sozinho.

              Ela sangra ate a borda da tela a direita de proposito, e o
              `overflow-hidden` da secao corta ali. */}
          <div className="relative -mb-px self-end md:-mr-[max(1.25rem,calc((100vw-80rem)/2))]">
            <Image
              src="/fotos/serra-pet-familia.webp"
              alt="Três gerações de uma família, um cachorro e um gato"
              width={905}
              height={625}
              sizes="(min-width: 768px) 58rem, 112vw"
              className="ml-auto block h-auto w-[112%] max-w-none md:w-full"
              style={{
                /* So o lado esquerdo. Os outros tres encostam nos limites da
                   secao e nao tem o que dissolver. */
                maskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,.55) 12%, #000 30%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, rgba(0,0,0,.55) 12%, #000 30%)",
              }}
            />
          </div>
        </div>

        {/* ⛔ OS TRES FATOS SAIRAM DA COLUNA DE TEXTO. Enquanto moravam ao lado
            do parágrafo, cada um tinha um terço de 26rem para existir, e o dono
            viu o resultado: "voce expremeu eles". "Remoção 24h" quebrava em
            duas linhas dentro de um cartão de 140px, o que é o oposto de um
            cartão. Aqui embaixo eles têm a largura inteira da seção, ficam
            horizontais de verdade e a coluna de texto deixa de disputar espaço
            com a foto. */}
        <ul className="grid gap-4 border-t border-pet/15 py-10 sm:grid-cols-3 md:gap-5 md:py-12">
          {PET_FATOS.map(({ titulo, detalhe }, i) => (
            <li key={titulo} className="item-cascata" style={{ ["--i" as string]: i }}>
              <div
                className="cartao-cine holofote aro-luz flex h-full items-start gap-4 rounded-serra-lg border border-pet/25 bg-white/80 px-5 py-5"
                style={{
                  ["--luz" as string]: "var(--color-pet)",
                  ["--aro" as string]:
                    "linear-gradient(100deg, #b84100, #fc5c04 55%, #ff9350)",
                }}
              >
                <span className="selo-icone mat-pet flex size-11 shrink-0 items-center justify-center rounded-serra text-white">
                  <IconePata className="size-[1.35rem]" />
                </span>
                <span>
                  <span className="block font-display text-[1.0625rem] leading-tight font-bold text-pet-forte">
                    {titulo}
                  </span>
                  <span className="mt-1.5 block text-[0.875rem] leading-snug text-pedra-600">
                    {detalhe}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
