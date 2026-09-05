import { FAQ } from "@/data/planos";
import { SITE } from "@/lib/site";
import { Botao, Faixa, Titulo } from "../ui";
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
      <Titulo centro apoio="As perguntas que mais chegam na central, respondidas sem rodeio.">
        Dúvidas frequentes
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

export function Fechamento() {
  return (
    <Faixa fundo="escuro">
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <p className="text-[0.875rem] font-bold tracking-[0.14em] text-serra-300 uppercase">
            Plantão 24 horas
          </p>
          <h2 className="mt-4 max-w-[16ch] text-t1 text-white">
            Aconteceu agora? É só ligar.
          </h2>
          <p className="mt-5 max-w-[54ch] text-lead text-serra-100">
            Alguém atende a qualquer hora, todos os dias, e conduz tudo a partir
            daí. Você não precisa ter documento em mãos nem saber o que dizer.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergencia.rotulo}
            </Botao>
            <Botao
              href={`tel:${SITE.emergenciaAlt.tel}`}
              externo
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergenciaAlt.rotulo}
            </Botao>
          </div>
        </div>

        <div className="rounded-serra-lg border border-white/15 bg-white/[0.06] p-7">
          <h3 className="font-display text-[1.25rem] font-semibold text-white">
            Ainda dá tempo de planejar
          </h3>
          <p className="mt-3 leading-relaxed text-serra-100">
            Contratar antes é o que evita que a família tenha que decidir preço
            no pior dia. Fale com a equipe e monte a cobertura com calma.
          </p>
          <div className="mt-6">
            <Botao
              href={SITE.whatsapp.link}
              externo
              tom="claro"
              className="w-full"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              Falar sobre os planos
            </Botao>
          </div>
        </div>
      </div>
    </Faixa>
  );
}
