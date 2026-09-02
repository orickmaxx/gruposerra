import { SITE } from "@/lib/site";
import { IconeWhatsApp } from "./icones";

/**
 * Botao flutuante de WhatsApp, nas cores da propria marca para o
 * reconhecimento ser imediato.
 *
 * Fica ACIMA da barra fixa de ligar no celular, nunca no lugar dela: o telefone
 * e a acao de emergencia e nao divide espaco com venda. Por isso o
 * `bottom-[5.5rem]` no celular, que e a altura da barra de ligar mais folga.
 *
 * O pulso e um anel que sai e some, sem piscar, e para inteiro com
 * `prefers-reduced-motion`.
 */
export function WhatsAppFlutuante() {
  return (
    <a
      href={SITE.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Grupo Serra no WhatsApp"
      className="mat-zap pulso group fixed right-4 bottom-[5.75rem] z-40 inline-flex min-h-[3.5rem] items-center gap-3 rounded-full pr-5 pl-4 font-semibold text-white transition-transform duration-300 hover:scale-105 md:right-6 md:bottom-6"
    >
      <IconeWhatsApp className="size-7 shrink-0" />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
}
