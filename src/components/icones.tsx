/**
 * Conjunto de icones desenhado para o Grupo Serra.
 * Traco unico de 1.75 em grade 24, cantos e juntas arredondados. Nada de emoji
 * e nada de biblioteca de terceiro: icone e desenho, nao caractere.
 */
import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { titulo?: string };

function Base({ titulo, children, ...p }: Props & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={titulo ? undefined : true}
      role={titulo ? "img" : undefined}
      {...p}
    >
      {titulo ? <title>{titulo}</title> : null}
      {children}
    </svg>
  );
}

export const IconeTelefone = (p: Props) => (
  <Base {...p}>
    <path d="M6.3 3.5h3l1.5 4-2 1.4a12.5 12.5 0 0 0 6.3 6.3l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 4.3 5.7a2 2 0 0 1 2-2.2Z" />
  </Base>
);

export const IconeRelogio = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.2V12l3.2 2" />
  </Base>
);

export const IconeLocal = (p: Props) => (
  <Base {...p}>
    <path d="M12 21c4-4.2 6-7.4 6-10a6 6 0 1 0-12 0c0 2.6 2 5.8 6 10Z" />
    <circle cx="12" cy="10.7" r="2.3" />
  </Base>
);

export const IconeBoleto = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
    <path d="M6.5 9v6M9 9v6M11 9v6M14 9v6M16 9v6M18 9v6" />
  </Base>
);

export const IconeChama = (p: Props) => (
  <Base {...p}>
    <path d="M12 3s4.5 3.6 4.5 8.2a4.5 4.5 0 0 1-9 0C7.5 9.4 9 8 9 8s.6 1.6 1.9 1.9C11.6 8 12 5.4 12 3Z" />
    <path d="M6 20.5h12" />
  </Base>
);

export const IconeFolha = (p: Props) => (
  <Base {...p}>
    <path d="M5 19c0-7 4.6-11.5 14-12 .5 8.6-4 13-11 13H5Z" />
    <path d="M5.5 19c2.4-3.4 5-5.9 8.5-7.6" />
  </Base>
);

export const IconePata = (p: Props) => (
  <Base {...p}>
    <ellipse cx="7.4" cy="9.2" rx="1.9" ry="2.4" />
    <ellipse cx="12" cy="7.4" rx="1.9" ry="2.5" />
    <ellipse cx="16.6" cy="9.2" rx="1.9" ry="2.4" />
    <path d="M12 12.6c3.2 0 5 2 5 4a3 3 0 0 1-3.4 3 9 9 0 0 0-3.2 0A3 3 0 0 1 7 16.6c0-2 1.8-4 5-4Z" />
  </Base>
);

export const IconeAmparo = (p: Props) => (
  <Base {...p}>
    <path d="M12 21s-7.5-4.2-7.5-9.8V6.3L12 3.4l7.5 2.9v4.9C19.5 16.8 12 21 12 21Z" />
    <path d="M9 11.8l2.1 2.2L15.2 10" />
  </Base>
);

export const IconeAviao = (p: Props) => (
  <Base {...p}>
    <path d="M10.5 3.6a1.5 1.5 0 0 1 3 0V9l7 4.1v2.2l-7-2.1v3.9l2.3 1.8v1.6L12 19.9l-3.8 1.6v-1.6l2.3-1.8v-3.9l-7 2.1v-2.2l7-4.1Z" />
  </Base>
);

export const IconeCama = (p: Props) => (
  <Base {...p}>
    <path d="M3 8v10M3 12h18v6M21 12v-1.5a2.5 2.5 0 0 0-2.5-2.5H12v4" />
    <circle cx="7.4" cy="10.2" r="1.8" />
  </Base>
);

export const IconeEtiqueta = (p: Props) => (
  <Base {...p}>
    <path d="M11 3.5H20a.5.5 0 0 1 .5.5v9l-8.6 8.6a1 1 0 0 1-1.4 0l-7.1-7.1a1 1 0 0 1 0-1.4Z" />
    <circle cx="16.4" cy="7.6" r="1.4" />
  </Base>
);

export const IconeVela = (p: Props) => (
  <Base {...p}>
    <path d="M12 3.2c1.4 1.5 2.1 2.6 2.1 3.6a2.1 2.1 0 0 1-4.2 0c0-1 .7-2.1 2.1-3.6Z" />
    <rect x="8.6" y="10" width="6.8" height="10.8" rx="1.4" />
    <path d="M12 10v-.9" />
  </Base>
);

export const IconeCamera = (p: Props) => (
  <Base {...p}>
    <path d="M3 8.6a2 2 0 0 1 2-2h2.1l1.3-2h7.2l1.3 2H19a2 2 0 0 1 2 2v8.8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
    <circle cx="12" cy="12.8" r="3.5" />
  </Base>
);

export const IconeCoracao = (p: Props) => (
  <Base {...p}>
    <path d="M12 20.4S3.8 15.6 3.8 9.9A4.4 4.4 0 0 1 12 7.5a4.4 4.4 0 0 1 8.2 2.4c0 5.7-8.2 10.5-8.2 10.5Z" />
  </Base>
);

export const IconeConfere = (p: Props) => (
  <Base {...p} strokeWidth={2.1}>
    <path d="M4.8 12.4l4.6 4.6L19.2 7.2" />
  </Base>
);

export const IconeSeta = (p: Props) => (
  <Base {...p}>
    <path d="M4.5 12h14M13 6.5l5.5 5.5-5.5 5.5" />
  </Base>
);

export const IconeAbaixo = (p: Props) => (
  <Base {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </Base>
);

export const IconeMenu = (p: Props) => (
  <Base {...p} strokeWidth={2}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const IconeFechar = (p: Props) => (
  <Base {...p} strokeWidth={2}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
);

export const IconeEnvelope = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="1.8" />
    <path d="M3.8 7l7.1 5.4a1.8 1.8 0 0 0 2.2 0L20.2 7" />
  </Base>
);

/* Glifos de marca. Preenchidos, porque e assim que cada marca se desenha. */

export const IconeWhatsApp = ({ titulo, ...p }: Props) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden={titulo ? undefined : true} role={titulo ? "img" : undefined} {...p}>
    {titulo ? <title>{titulo}</title> : null}
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2.1 22l5.35-1.4a9.8 9.8 0 0 0 4.59 1.17h.01c5.43 0 9.84-4.4 9.84-9.84 0-2.63-1.02-5.1-2.88-6.96A9.78 9.78 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.15 8.15 0 0 1-1.25-4.34c0-4.51 3.68-8.18 8.2-8.18a8.14 8.14 0 0 1 8.19 8.19c0 4.51-3.67 8.17-8.19 8.17Zm4.49-6.12c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.04-.39-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.15-.25-.02-.39.1-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42l-.47-.01c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.18 1.14.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

export const IconeInstagram = ({ titulo, ...p }: Props) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden={titulo ? undefined : true} role={titulo ? "img" : undefined} {...p}>
    {titulo ? <title>{titulo}</title> : null}
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17" cy="7" r="1.15" fill="currentColor" stroke="none" />
  </svg>
);

export const IconeGoogle = ({ titulo, ...p }: Props) => (
  <svg viewBox="0 0 24 24" width={24} height={24} aria-hidden={titulo ? undefined : true} role={titulo ? "img" : undefined} {...p}>
    {titulo ? <title>{titulo}</title> : null}
    <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.5 5.5 0 0 1-2.39 3.61v3h3.86c2.26-2.08 3.58-5.15 3.58-8.8Z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.08 7.94-2.91l-3.86-3c-1.07.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z" />
    <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.63H1.29a12 12 0 0 0 0 10.74l3.98-3.09Z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.63l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z" />
  </svg>
);

export const IconeFacebook = ({ titulo, ...p }: Props) => (
  <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor" aria-hidden={titulo ? undefined : true} role={titulo ? "img" : undefined} {...p}>
    {titulo ? <title>{titulo}</title> : null}
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);
