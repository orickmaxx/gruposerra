import type { Metadata } from "next";
import Image from "next/image";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Botao, Faixa, Pendencia, Rotulo, Titulo } from "@/components/ui";
import { SITE } from "@/lib/site";
import {
  IconeAmparo,
  IconeConfere,
  IconeFolha,
  IconePata,
  IconeRelogio,
  IconeTelefone,
  IconeWhatsApp,
} from "@/components/icones";

const RESUMO =
  "Assistência e cremação para animais de estimação, com remoção 24 horas na região de Campinas, frota própria e certificado de cremação. Até 3 pets no mesmo plano.";

const META =
  "Cremação e assistência para animais na região de Campinas, com remoção 24 horas, frota própria e certificado. Individual ou coletiva, até 3 pets no plano.";

export const metadata: Metadata = {
  title: "Serra Pet",
  description: META,
  alternates: { canonical: "/serra-pet" },
  openGraph: { title: "Serra Pet, assistência e cremação para animais", description: META, url: "/serra-pet" },
};

/**
 * Serra Pet.
 *
 * Marca própria do grupo, com laranja próprio (#E75C0D) e site próprio. Aqui
 * ela aparece como MARCA, não como um item de lista do plano principal: é o
 * laranja que manda na página inteira, do fio do rótulo ao botão.
 *
 * ⛔ Nenhum preço. O Serra Pet não publica valor em lugar nenhum, nem na LP nem
 * no site da marca, e o cliente não confirmou. A página descreve o que cada
 * plano cobre e manda falar com a equipe.
 *
 * ⛔ Cuidado de tom que vale o parágrafo: este é o único lugar do site onde a
 * imagem é alegre, porque a foto é de bichos vivos. Mas o assunto continua sendo
 * a morte deles, e quem chega aqui costuma estar com o animal doente ou recém
 * falecido. Nada de linguagem fofa.
 */

const PLANOS_PET = [
  {
    nome: "Plano Preventivo",
    chamada: "Contratado antes, com calma",
    itens: [
      "Cremação individual, com as cinzas devolvidas em urna",
      "Ou cremação coletiva, em espaço ecológico, sem devolução das cinzas",
      "Atendimento 24 horas",
      "Remoção na região de Campinas",
      "Certificado de cremação",
    ],
    destaque: true,
  },
  {
    nome: "Plano Emergencial",
    chamada: "Para quando não deu tempo de planejar",
    itens: [
      "Acionamento 24 horas para situação não prevista",
      "Remoção na região metropolitana de Campinas",
      "Cremação com a mesma estrutura do preventivo",
    ],
  },
];

const PRODUTOS = [
  {
    titulo: "Urnas cinerárias",
    texto:
      "Casinha ecológica em várias cores, cachorro e gato em cerâmica, e o modelo hidrante em vermelho.",
    Icone: IconeAmparo,
  },
  {
    titulo: "Pingentes cinerários",
    texto:
      "Gatinho, cruz, coração, patinha, esfera e chave. Guardam uma porção pequena das cinzas.",
    Icone: IconeFolha,
  },
  {
    titulo: "Plaquinhas personalizadas",
    texto: "Em cerâmica e em resina, com o nome do animal.",
    Icone: IconePata,
  },
];

export default function Pagina() {
  return (
    <>
      <HeroiPagina
        rotulo="Serra Pet"
        cor="var(--color-pet-claro)"
        linhas={["Ele também faz", "parte da família."]}
        veu="pet"
        resumo={RESUMO}
        foto="/fotos/serra-pet-animais.webp"
        posicao="object-[70%_center]"
        acoes={
          <>
            <Botao
              href={SITE.whatsapp.link}
              externo
              ima
              tom="claro"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              Falar sobre o Serra Pet
            </Botao>
            <Botao href={`tel:${SITE.emergencia.tel}`} externo tom="vidro" icone={<IconeTelefone className="size-5 shrink-0" />}>
              {SITE.emergencia.rotulo}
            </Botao>
          </>
        }
      >
        <ul
          className="revela-texto mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/15 pt-9 md:grid-cols-4"
          style={{ ["--i" as string]: 4 }}
        >
          {[
            { v: "24h", r: "remoção e acionamento", I: IconeRelogio },
            { v: "3", r: "pets no mesmo plano", I: IconePata },
            { v: "RMC", r: "região de cobertura", I: IconeAmparo },
            { v: "Própria", r: "frota de transporte", I: IconeConfere },
          ].map(({ v, r, I }) => (
            <li key={r} className="flex items-center gap-3.5">
              <I className="size-6 shrink-0 text-pet-claro" />
              <span>
                <span className="numerais block font-display text-[1.5rem] leading-none font-extrabold tracking-tight text-white">
                  {v}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-tight text-white/60">{r}</span>
              </span>
            </li>
          ))}
        </ul>
      </HeroiPagina>

      <Faixa fundo="areia" id="planos-pet">
        <Titulo
          centro
          rotulo="Os dois planos"
          cor="var(--color-pet-forte)"
          apoio="A diferença entre eles é quando são contratados. A estrutura de atendimento é a mesma."
        >
          Contratar antes ou acionar na hora
        </Titulo>

        <ul className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
          {PLANOS_PET.map((p, i) => (
            <li key={p.nome} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <article
                {...(p.destaque ? { "data-ativo": "1" } : {})}
                className={`cartao-cine holofote aro-luz relative flex w-full flex-col overflow-hidden rounded-serra-lg ${
                  p.destaque
                    ? "mat-pet holofote-escuro text-white shadow-alta"
                    : "border border-pet/25 bg-white shadow-media"
                }`}
                style={{ ["--luz" as string]: "var(--color-pet)" }}
              >
                {p.destaque ? (
                  <p className="relative z-[1] bg-white/20 py-2.5 text-center text-[0.8125rem] font-bold tracking-[0.14em] text-white uppercase">
                    O mais procurado
                  </p>
                ) : null}

                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h2 className={`font-display text-t3 font-bold ${p.destaque ? "text-white" : "text-tinta"}`}>
                    {p.nome}
                  </h2>
                  <p className={`mt-1.5 text-[0.9375rem] font-medium ${p.destaque ? "text-white/85" : "text-pedra-600"}`}>
                    {p.chamada}
                  </p>

                  <ul className={`mt-7 space-y-3 border-t pt-6 ${p.destaque ? "border-white/25" : "border-linha"}`}>
                    {p.itens.map((it) => (
                      <li
                        key={it}
                        className={`flex gap-3 text-[0.9375rem] leading-relaxed ${p.destaque ? "text-white" : "text-corpo"}`}
                      >
                        <IconeConfere
                          className={`mt-1 size-[1.05rem] shrink-0 ${p.destaque ? "text-white" : "text-pet-forte"}`}
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Botao
                      href={SITE.whatsapp.link}
                      externo
                      tom={p.destaque ? "claro" : "zap"}
                      className="w-full"
                      icone={<IconeWhatsApp className="size-5 shrink-0" />}
                    >
                      Falar sobre o {p.nome.replace("Plano ", "")}
                    </Botao>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-[64rem]">
          <Pendencia>
            O <strong className="font-bold">preço</strong> do Serra Pet não é publicado pela marca em
            nenhum canal, e não foi confirmado pelo cliente. Ele depende do porte do animal e de
            quantos entram no plano, então sai por conversa com a equipe. A{" "}
            <strong className="font-bold">carência</strong> também precisa ser confirmada.
          </Pendencia>
        </div>
      </Faixa>

      <Faixa>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Rotulo cor="var(--color-pet-forte)">Individual ou coletiva</Rotulo>
            <Titulo apoio="É a única escolha que muda o que acontece com as cinzas, e é melhor entender antes de precisar decidir.">
              A diferença entre as duas cremações
            </Titulo>

            <dl className="mt-9 space-y-6">
              <div className="holofote rounded-serra-lg border border-pet/25 bg-pet-veu p-6" style={{ ["--luz" as string]: "var(--color-pet)" }}>
                <dt className="font-display text-[1.0625rem] font-bold text-tinta">Cremação individual</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-corpo">
                  O animal é cremado sozinho e as cinzas voltam para a família, em urna padrão, com
                  certificado. É a opção de quem quer guardar.
                </dd>
              </div>
              <div className="holofote rounded-serra-lg border border-linha bg-white p-6" style={{ ["--luz" as string]: "var(--color-pet)" }}>
                <dt className="font-display text-[1.0625rem] font-bold text-tinta">Cremação coletiva</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-corpo">
                  As cinzas ficam em um espaço ecológico e não são devolvidas. É a opção de quem não
                  pretende guardar, e custa menos que a individual.
                </dd>
              </div>
            </dl>
          </div>

          <figure className="revela-escala relative overflow-hidden rounded-serra-xl shadow-alta" data-revela>
            <Image
              src="/fotos/serra-pet-animais.webp"
              alt="Um cachorro e um gato, a imagem que a marca Serra Pet usa"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 34rem, 92vw"
              className="h-full w-full object-cover"
            />
          </figure>
        </div>
      </Faixa>

      <Faixa fundo="papel">
        <Titulo
          centro
          rotulo="Depois"
          cor="var(--color-pet-forte)"
          apoio="Objetos para guardar as cinzas ou uma lembrança do animal. Todos feitos sob encomenda."
        >
          Urnas, pingentes e plaquinhas
        </Titulo>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {PRODUTOS.map(({ titulo, texto, Icone }, i) => (
            <li key={titulo} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <article
                className="cartao-cine holofote flex w-full flex-col rounded-serra-lg border border-linha bg-white p-7 shadow-baixa"
                style={{ ["--luz" as string]: "var(--color-pet)" }}
              >
                <span className="selo-icone mat-pet inline-flex size-12 items-center justify-center rounded-serra text-white">
                  <Icone className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-[1.125rem] font-bold text-tinta">{titulo}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pedra-600">{texto}</p>
              </article>
            </li>
          ))}
        </ul>
      </Faixa>

      <Faixa fundo="escuro">
        <div className="mx-auto max-w-[46rem] text-center">
          <Rotulo claro cor="var(--color-pet-claro)">Aconteceu agora</Rotulo>
          <Titulo claro centro apoio="A remoção é 24 horas na região de Campinas, com frota própria. Ligue e a equipe assume a partir daí.">
            Se foi agora, é só ligar
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
            <Botao href={SITE.whatsapp.link} externo tom="zap" icone={<IconeWhatsApp className="size-5 shrink-0" />}>
              Falar no WhatsApp
            </Botao>
          </div>
          <p className="mt-7 text-[0.9375rem] text-white/60">
            Também dá para conhecer a marca no site próprio dela,{" "}
            <a
              href="https://serrapet.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="link-texto font-semibold text-pet-claro"
            >
              serrapet.com.br
            </a>
            .
          </p>
        </div>
      </Faixa>
    </>
  );
}
