import { SITE } from "@/lib/site";
import { Faixa, Titulo } from "../ui";
import { IconeTelefone } from "../icones";

/* ⛔ A BARRA DE CONFIANCA SAIU EM 11/09/2026, a pedido do dono ("remova toda
   essa parte"), e a estrutura dava razao a ele. Eram cinco selos numa faixa
   fina logo abaixo do herói, e quatro dos cinco repetiam, com menos peso, o
   que o proprio herói tinha acabado de dizer dois dedos acima: plantao 24
   horas, 8 unidades proprias, crematorio proprio e a idade da empresa ja sao
   os quatro numeros do rodape do herói. A faixa cobrava uma leitura a mais
   para entregar a mesma informacao pela segunda vez, e ainda empurrava a
   primeira secao de verdade para baixo da dobra.

   O unico item que nao se repetia era a Lei Federal nº 13.261/16. Ele continua
   no site, na pagina de planos e no rodape, que e onde quem procura a norma
   vai olhar. */

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
          É o passo 1. Do passo 2 em diante, ninguém da família precisa ligar
          para mais ninguém.
        </p>
      </div>
    </Faixa>
  );
}

/* ⛔ AQUI VIVIA `Garantias`, e ela foi APAGADA em 16/09/2026.
   Estava exportada, completa e bem escrita, e nao era renderizada por ninguem:
   nao aparecia em `app/page.tsx` nem em nenhuma outra rota. Codigo morto que
   PARECE vivo e pior que codigo morto declarado, porque a proxima pessoa le,
   acredita e decide com base nele. O comentario de ordem das secoes em
   `app/page.tsx` chegou a listar essa secao como se ela estivesse no ar.
   O conteudo dela (assistencia 24h em todos os planos, atendimento pela unidade
   da cidade, troca de plano depois) continua no site, em `/planos` e na secao de
   inclusos. Se um dia precisar voltar como secao propria, esta no historico:
   `git show 87ea17f -- src/components/home/confianca.tsx`. */
