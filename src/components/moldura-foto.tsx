import Image from "next/image";
import type { ReactNode } from "react";
import { IconeCamera } from "./icones";

/**
 * Moldura de foto.
 *
 * Dois estados no mesmo componente:
 *
 *  - COM `src`: a foto real, com entrada suave e legenda opcional. Foi assim
 *    que as imagens do Complexo Memorial Hortolandia entraram no site: sao
 *    fotos do proprio grupo, baixadas do site do Memorial, nao banco de
 *    imagens.
 *
 *  - SEM `src`: o espaco reservado, na proporcao final, dizendo em voz alta o
 *    que precisa entrar ali. Inventar imagem de banco seria pior do que a
 *    ausencia: numa funeraria, foto generica de familia sorrindo e reconhecida
 *    a um quilometro. Quando o arquivo chegar, passa-se `src` e nada mais muda.
 */
export function MolduraFoto({
  proporcao = "4/3",
  titulo,
  detalhe,
  src,
  alt = "",
  legenda,
  prioridade = false,
  className = "",
  children,
}: {
  proporcao?: string;
  titulo: string;
  detalhe?: string;
  src?: string;
  alt?: string;
  legenda?: ReactNode;
  prioridade?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  if (src) {
    return (
      <figure className={className}>
        <div
          style={{ aspectRatio: proporcao }}
          className="group relative overflow-hidden rounded-serra-lg bg-serra-900 shadow-media"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 34rem, 100vw"
            priority={prioridade}
            loading={prioridade ? undefined : "lazy"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        {legenda ? (
          <figcaption className="mt-3 text-[0.875rem] leading-snug text-pedra-600">
            {legenda}
          </figcaption>
        ) : null}
      </figure>
    );
  }

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
