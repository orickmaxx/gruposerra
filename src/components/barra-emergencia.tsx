import { SITE } from "@/lib/site";
import { IconeTelefone, IconeWhatsApp } from "./icones";

/**
 * Principio 1 do produto: o telefone de emergencia vence qualquer outra coisa
 * na tela. Quem chega as 3 da manha nao navega, procura um numero.
 *
 * Duas pecas: a faixa do topo, que explica que o balcao fecha mas o telefone
 * nao, e a barra fixa no rodape do celular, que segue o polegar em qualquer
 * ponto de rolagem.
 */
export function BarraEmergencia() {
  return (
    <div className="faixa-escura bg-serra-800 text-white">
      <div className="mx-auto flex max-w-[76rem] flex-wrap items-center justify-center gap-x-5 gap-y-1 px-5 py-2.5 text-center sm:justify-between sm:text-left">
        <p className="text-[0.9375rem] leading-snug text-serra-100">
          Em caso de falecimento, ligue a qualquer hora.{" "}
          <span className="text-white">Todo dia, inclusive feriado.</span>
        </p>
        <a
          href={`tel:${SITE.emergencia.tel}`}
          className="group inline-flex items-center gap-2 rounded-serra px-2 py-1 font-semibold text-white transition-colors hover:bg-white/10"
        >
          <IconeTelefone className="size-[1.15rem] shrink-0 text-serra-200 transition-colors group-hover:text-white" />
          <span className="numerais text-[1.0625rem] tracking-tight">
            {SITE.emergencia.rotulo}
          </span>
        </a>
      </div>
    </div>
  );
}

export function BarraFixaCelular() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-serra-800/95 backdrop-blur-md md:hidden">
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
          className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-serra border border-white/35 px-3 font-semibold text-white"
        >
          <IconeWhatsApp className="size-5 shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
