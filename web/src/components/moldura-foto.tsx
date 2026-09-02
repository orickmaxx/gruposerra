import type { ReactNode } from "react";
import { IconeCamera } from "./icones";

/**
 * Espaço reservado para foto real do cliente.
 *
 * O dono apontou, com razao, que a versao anterior nao tinha NENHUM lugar para
 * foto de familia, de equipe ou da empresa, e que isso e uma das coisas que
 * entrega site feito por robo. Nao ha foto do Grupo Serra ainda, e inventar
 * uma imagem de banco seria pior: o visitante reconhece stock de funeraria a
 * um quilometro.
 *
 * Entao o espaco existe, esta dimensionado na proporcao certa, e diz em voz
 * alta o que precisa entrar ali. Quando a foto chegar, troca-se este
 * componente por um `next/image` no mesmo lugar e nada mais muda.
 */
export function MolduraFoto({
  proporcao = "4/3",
  titulo,
  detalhe,
  className = "",
  children,
}: {
  proporcao?: string;
  titulo: string;
  detalhe?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      style={{ aspectRatio: proporcao }}
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-serra-lg border-2 border-dashed border-serra-200 bg-serra-50/70 p-6 text-center ${className}`}
    >
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-serra-500 shadow-baixa">
        <IconeCamera className="size-6" />
      </span>
      <p className="mt-4 max-w-[26ch] font-display text-[0.9375rem] font-bold text-serra-700">
        {titulo}
      </p>
      {detalhe ? (
        <p className="mt-1.5 max-w-[32ch] text-[0.8125rem] leading-relaxed text-pedra-600">
          {detalhe}
        </p>
      ) : null}
      {children}
    </div>
  );
}
