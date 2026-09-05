import { SITE } from "@/lib/site";
import { IconeWhatsApp } from "./icones";

/**
 * Botao flutuante de WhatsApp, nas cores da propria marca para o
 * reconhecimento ser imediato.
 *
 * ⛔ SÓ no desktop. No celular a barra fixa de baixo já tem um botão de
 * WhatsApp, do mesmo tamanho e da mesma cor, e os dois juntos ficavam
 * empilhados no canto tapando o CTA do herói. Dois botões para a mesma ação, um
 * em cima do outro, não é ênfase, é ruído.
 *
 * O pulso é um anel que sai e some, sem piscar, e para inteiro com
 * `prefers-reduced-motion`.
 */
export function WhatsAppFlutuante() {
  return (
    <a
      href={SITE.whatsapp.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Grupo Serra no WhatsApp"
      className="mat-zap pulso group fixed right-6 bottom-6 z-40 hidden min-h-[3.5rem] items-center gap-3 rounded-full pr-5 pl-4 font-semibold text-white transition-transform duration-300 hover:scale-105 md:inline-flex"
    >
      <IconeWhatsApp className="size-7 shrink-0" />
      <span>Falar no WhatsApp</span>
    </a>
  );
}
