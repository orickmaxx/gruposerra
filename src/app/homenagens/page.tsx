import type { Metadata } from "next";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Botao, Faixa, Pendencia, Rotulo, Titulo } from "@/components/ui";
import { SITE } from "@/lib/site";
import {
  IconeCamera,
  IconeConfere,
  IconeCoracao,
  IconeFolha,
  IconeTelefone,
  IconeWhatsApp,
} from "@/components/icones";

const RESUMO =
  "Um mural para deixar uma mensagem de carinho, com foto, e compartilhar com quem não pôde estar presente. Toda homenagem passa por aprovação antes de aparecer.";

const META =
  "Mural para deixar uma mensagem com foto e compartilhar com quem não pôde estar presente. Toda homenagem passa por aprovação antes de aparecer.";

export const metadata: Metadata = {
  title: "Homenagens",
  description: META,
  alternates: { canonical: "/homenagens" },
  openGraph: { title: "Mural de Homenagens", description: META, url: "/homenagens" },
};

/**
 * Mural de homenagens.
 *
 * Verde, porque é a cor do serviço no código de cor da casa desde o topo da
 * home, e porque é a única página do site onde o assunto é a lembrança e não a
 * perda.
 *
 * ⛔ Pelo mesmo motivo do obituário: NENHUMA HOMENAGEM DE EXEMPLO. Encher o
 * mural com mensagens inventadas sobre pessoas inventadas, para a página "ficar
 * cheia" na demonstração de amanhã, seria fabricar luto. A página mostra como o
 * mural funciona e declara que ele ainda não está ligado.
 *
 * O que a página ensina, e o site antigo não ensinava: que a publicação é
 * MODERADA. Quem escreve precisa saber que não aparece na hora, senão volta em
 * cinco minutos achando que a mensagem se perdeu.
 */

const COMO = [
  {
    n: 1,
    Icone: IconeCamera,
    titulo: "Escolha uma foto",
    texto:
      "Uma foto quadrada da pessoa homenageada, em JPG ou PNG. É opcional: mensagem sem foto também é publicada.",
  },
  {
    n: 2,
    Icone: IconeCoracao,
    titulo: "Escreva a mensagem",
    texto:
      "Do tamanho que você quiser. Assine com o seu nome, ou com o nome da família, como preferir.",
  },
  {
    n: 3,
    Icone: IconeConfere,
    titulo: "A equipe aprova",
    texto:
      "Toda homenagem passa por leitura antes de entrar no ar. Não aparece na hora, e isso é de propósito: o mural é um lugar de respeito.",
  },
  {
    n: 4,
    Icone: IconeFolha,
    titulo: "Compartilhe",
    texto:
      "Depois de publicada, a homenagem tem link próprio para mandar por WhatsApp a quem não pôde estar presente.",
  },
];

export default function Pagina() {
  return (
    <>
      <HeroiPagina
        rotulo="Mural de homenagens"
        cor="var(--color-verde)"
        linhas={["Quem fica", "também fala."]}
        veu="verde"
        resumo={RESUMO}
        foto="/fotos/memorial-cafe.webp"
        posicao="object-[30%_center]"
      />

      <Faixa fundo="papel">
        <Titulo
          centro
          rotulo="Como funciona"
          cor="var(--color-verde-forte)"
          apoio="Quatro passos, e o terceiro é o que ninguém costuma explicar."
        >
          Deixar uma homenagem
        </Titulo>

        <ol className="mt-12 grid gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {COMO.map(({ n, Icone, titulo, texto }) => (
            <li key={n} className="item-cascata" style={{ ["--i" as string]: n }}>
              <article
                className="cartao-cine holofote aro-luz relative flex h-full flex-col overflow-hidden rounded-serra-lg border border-linha bg-white p-6 shadow-baixa"
                style={{ ["--luz" as string]: "var(--color-verde)" }}
              >
                <span
                  aria-hidden
                  className="numerais numero-fantasma pointer-events-none absolute -top-1 right-3 text-[5.5rem] select-none"
                >
                  {n}
                </span>
                <span className="selo-icone mat-homenagens inline-flex size-12 items-center justify-center rounded-serra text-white">
                  <Icone className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-[1.0625rem] font-bold text-tinta">{titulo}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-corpo">{texto}</p>
              </article>
            </li>
          ))}
        </ol>
      </Faixa>

      <Faixa>
        <div className="mx-auto max-w-[52rem]">
          <Titulo centro rotulo="O mural" cor="var(--color-verde-forte)">
            As homenagens publicadas
          </Titulo>

          <div className="mt-10">
            <Pendencia>
              <strong className="font-bold text-tinta">O mural ainda não está ligado.</strong> Ele
              depende do sistema de publicação e da fila de moderação da equipe, e conectar os dois é
              a próxima etapa. Nenhuma homenagem de exemplo foi escrita aqui: inventar mensagens de
              luto sobre pessoas inventadas para a página parecer cheia não é rascunho, é falsificação.
              Enquanto isso, a equipe recebe homenagens por WhatsApp e publica assim que o mural
              entrar no ar.
            </Pendencia>
          </div>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Botao
              href={SITE.whatsapp.link}
              externo
              ima
              tom="zap"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              Mandar uma homenagem
            </Botao>
            <Botao href="/obituario" tom="contorno">
              Ver o obituário
            </Botao>
          </div>
        </div>
      </Faixa>

      <Faixa fundo="escuro">
        <div className="mx-auto max-w-[46rem] text-center">
          <Rotulo claro>Se aconteceu agora</Rotulo>
          <Titulo claro centro apoio="A homenagem pode esperar. O atendimento, não. O plantão atende 24 horas, todos os dias.">
            Primeiro o essencial
          </Titulo>
          <div className="mt-9 flex justify-center">
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              ima
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergencia.rotulo}
            </Botao>
          </div>
        </div>
      </Faixa>
    </>
  );
}
