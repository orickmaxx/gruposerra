import { SITE } from "@/lib/site";
import { IconeBoleto, IconeTelefone, IconeVela, IconeWhatsApp } from "./icones";

/**
 * Faixa de utilidades, acima do cabecalho.
 *
 * Lida do Florees e do Bom Pastor: os dois poem os telefones ROTULADOS numa
 * faixa fina no topo, separando "central do cliente" de "acionamento 24h", e
 * deixam o cabecalho com UM botao so. Era o oposto do que estava aqui, onde o
 * cabecalho acumulava nav de 7 itens mais dois botoes mais o telefone.
 *
 * Aqui a divisao e: esta faixa carrega telefone e tarefa de associado; o
 * cabecalho carrega marca, navegacao e um unico botao de conversao.
 */
export function BarraEmergencia() {
  return (
    <div className="faixa-escura bg-serra-800 text-white">
      <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-2.5 md:justify-between">
        <a
          href={`tel:${SITE.emergencia.tel}`}
          className="group flex items-center gap-2.5 transition-colors hover:text-serra-200"
        >
          <IconeTelefone className="size-[1.15rem] shrink-0 text-serra-300" />
          <span className="text-[0.8125rem] leading-tight">
            <span className="block font-semibold tracking-wide text-serra-300 uppercase">
              Atendimento de óbito, 24h
            </span>
            <span className="numerais text-[1rem] font-bold text-white">
              {SITE.emergencia.rotulo}
            </span>
          </span>
        </a>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.875rem]">
          <a
            href={SITE.externos.segundaVia}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-serra-100 transition-colors hover:text-white"
          >
            <IconeBoleto className="size-[1.05rem] shrink-0 text-serra-300" />
            2ª via de boleto
          </a>
          <a
            href="/obituario"
            className="inline-flex items-center gap-2 font-medium text-serra-100 transition-colors hover:text-white"
          >
            <IconeVela className="size-[1.05rem] shrink-0 text-serra-300" />
            Obituário
          </a>
          <a
            href={SITE.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-serra-100 transition-colors hover:text-white"
          >
            <IconeWhatsApp className="size-[1.05rem] shrink-0 text-serra-300" />
            <span className="numerais">{SITE.whatsapp.rotulo}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export function BarraFixaCelular() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/12 bg-serra-800/95 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        <a
          href={`tel:${SITE.emergencia.tel}`}
          className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-serra bg-white px-3 font-semibold text-serra-700"
        >
          <IconeTelefone className="size-5 shrink-0" />
          <span>Ligar 24h</span>
        </a>
        <a
          href={SITE.whatsapp.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mat-zap flex min-h-[3.25rem] items-center justify-center gap-2 rounded-serra px-3 font-semibold text-white"
        >
          <IconeWhatsApp className="size-5 shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
