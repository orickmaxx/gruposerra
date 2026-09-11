import { FAQ } from "@/data/planos";
import { SITE } from "@/lib/site";
import Image from "next/image";
import { Botao, Faixa, Rotulo, Titulo, TituloCine } from "../ui";
import { Paralaxe } from "../movimento";
import { IconeTelefone, IconeWhatsApp } from "../icones";

/**
 * Dúvidas frequentes.
 *
 * A versão anterior era uma pilha de `<summary>` separados por fio, com um
 * chevron cinza. Funcionava e era feia: nada dizia que aquilo abria, a área de
 * toque era a altura do texto e a resposta aparecia sem transição.
 *
 * O que mudou, seguindo as regras da skill de UI/UX:
 *
 *  - TOUCH TARGET. Cada pergunta agora tem 64px de altura mínima, acima dos
 *    44pt exigidos, e o alvo é a linha inteira, não só o texto.
 *  - AFFORDANCE. O indicador é um mais que vira menos, dentro de um alvo
 *    circular com cor de marca. Chevron cinza não diz "isto abre".
 *  - MOTION COM SIGNIFICADO. A resposta desliza e some em 260ms, dentro da
 *    faixa de 150 a 300ms recomendada, com `ease-out` na entrada. Nada de
 *    aparecer de estalo.
 *  - ESTADO VISÍVEL. O cartão aberto muda de superfície e ganha uma barra de
 *    cor à esquerda: dá para ver qual está aberto sem ler.
 *  - Continua sendo `<details>` nativo, então funciona sem JavaScript, é
 *    navegável por teclado e o leitor de tela anuncia expandido/recolhido
 *    sozinho. Acordeão em JavaScript aqui seria regressão de acessibilidade.
 *
 * O bloco de contato ao lado existe porque uma dúvida não respondida na FAQ é
 * exatamente o momento em que a pessoa desiste ou liga. Aqui ela liga.
 */
export function Duvidas() {
  return (
    <Faixa fundo="papel" id="duvidas">
      <Titulo centro rotulo="Dúvidas" apoio="As perguntas que mais chegam na central, respondidas sem rodeio.">
        O que as famílias mais perguntam
      </Titulo>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <ul className="space-y-3">
          {FAQ.map((f) => (
            <li key={f.p}>
              <details className="faq group overflow-hidden rounded-serra-lg border border-linha bg-white transition-colors duration-300 open:border-serra-200 open:bg-serra-50/40">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 md:px-6">
                  <span className="font-display text-[1.0625rem] leading-snug font-semibold text-tinta transition-colors group-hover:text-serra-600 md:text-[1.125rem]">
                    {f.p}
                  </span>
                  <span
                    aria-hidden
                    className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-serra-200 bg-white text-serra-600 transition-colors duration-300 group-hover:border-serra-400 group-open:border-transparent group-open:bg-serra-500 group-open:text-white"
                  >
                    <span className="block h-[2px] w-3.5 rounded-full bg-current" />
                    <span className="absolute block h-3.5 w-[2px] rounded-full bg-current transition-transform duration-300 group-open:rotate-90 group-open:scale-y-0" />
                  </span>
                </summary>
                <div className="faq-corpo">
                  <p className="max-w-[68ch] border-t border-linha px-5 py-5 leading-relaxed text-corpo md:px-6">
                    {f.r}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>

        {/* Saída para quem não achou a resposta. É onde a pessoa desiste. */}
        <aside className="rounded-serra-lg border border-serra-200 bg-white p-7 shadow-media lg:sticky lg:top-28">
          <h3 className="font-display text-[1.25rem] font-bold text-tinta">
            Não achou sua dúvida?
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-pedra-600">
            Fale com alguém da equipe. Sem script de venda e sem compromisso, a
            qualquer hora do dia.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              className="w-full"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              <span className="numerais">{SITE.emergencia.rotulo}</span>
            </Botao>
            <a
              href={SITE.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mat-zap inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
            >
              <IconeWhatsApp className="size-5 shrink-0" />
              Falar no WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </Faixa>
  );
}

/**
 * Fechamento.
 *
 * A ultima coisa que a pagina diz, e a unica secao em que ela pode se dar ao
 * luxo de nao vender nada. Depois de dezessete secoes, quem chegou aqui ou vai
 * ligar ou vai fechar a aba.
 *
 * Por isso o fecho e o ESPELHO do herói: a mesma linguagem de fotografia real
 * tratada na cor da marca, o mesmo tipo de manchete em mascara, o mesmo
 * telefone. A pagina abre e fecha no mesmo acorde, e o meio dela e o argumento.
 * A foto aqui e a sala de atendimento, nao a de velorio: o fecho e sobre
 * conversar antes, nao sobre o dia.
 */
export function Fechamento() {
  return (
    <section className="grao vinheta relative isolate overflow-hidden bg-serra-900 text-white">
      <Paralaxe fator={0.12} className="absolute inset-0 -z-10">
        <div className="foto-marca-veu absolute inset-[-8%]">
          <Image
            src="/fotos/memorial-atendimento.webp"
            alt=""
            fill
            sizes="100vw"
            aria-hidden
            className="kenburns foto-marca object-cover object-[35%_center]"
          />
        </div>
      </Paralaxe>

      <div
        className="relative z-10 mx-auto grid max-w-[76rem] items-center gap-12 px-5 py-20 md:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
        data-revela
      >
        <div>
          <Rotulo claro>Plantão 24 horas</Rotulo>
          <TituloCine
            className="max-w-[15ch] text-t1 text-white"
            linhas={["Aconteceu agora?", "É só ligar."]}
          />
          <p className="mt-6 max-w-[52ch] text-lead text-white/80">
            Alguém atende a qualquer hora, todos os dias, e conduz tudo a partir
            daí. Você não precisa ter documento em mãos nem saber o que dizer.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              href={`tel:${SITE.emergenciaAlt.tel}`}
              externo
              tom="vidro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergenciaAlt.rotulo}
            </Botao>
          </div>

          <p className="mt-7 text-[0.9375rem] text-white/60">
            Os dois números atendem óbito 24 horas, inclusive no feriado.
          </p>
        </div>

        <div className="holofote holofote-escuro rounded-serra-lg border border-white/20 bg-[#04202f]/88 p-7 shadow-cine md:p-8">
          <h3 className="font-display text-[1.375rem] leading-tight font-bold text-white">
            Ainda dá tempo de planejar
          </h3>
          <p className="mt-4 leading-relaxed text-white/75">
            Contratar antes é o que evita que a família tenha que decidir preço
            no pior dia. Fale com a equipe e monte a cobertura com calma.
          </p>
          <div className="mt-7">
            <Botao
              href={SITE.whatsapp.link}
              externo
              tom="zap"
              className="w-full"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              Falar sobre os planos
            </Botao>
          </div>
        </div>
      </div>
    </section>
  );
}
