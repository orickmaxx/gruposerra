import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Cabecalho } from "@/components/cabecalho";
import { Rodape } from "@/components/rodape";
import { BarraEmergencia } from "@/components/barra-emergencia";
import { Revelacao } from "@/components/revelacao";
import { Consentimento } from "@/components/consentimento";
import { VoltarAoTopo } from "@/components/voltar-ao-topo";
import { SCRIPT_PADRAO_NEGADO } from "@/lib/medicao";

const display = Manrope({
  variable: "--fonte-display",
  subsets: ["latin"],
  display: "swap",
});

const texto = Inter({
  variable: "--fonte-texto",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0069a3",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nomeCompleto} · Plano funerário e atendimento 24h em Campinas`,
    template: `%s · ${SITE.nome}`,
  },
  description:
    "Atendimento de óbito 24 horas em 8 unidades da região de Campinas. Plano funerário a partir de R$ 18,90 por mês, cremação em crematório próprio, Serra Pet e segunda via de boleto online.",
  applicationName: SITE.nomeCompleto,
  authors: [{ name: SITE.nomeCompleto }],
  generator: "Next.js",
  keywords: [
    "plano funerário Campinas",
    "funerária Campinas",
    "cremação Campinas",
    "assistência funeral 24 horas",
    "Grupo Serra",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.nomeCompleto,
    title: `${SITE.nomeCompleto} · ${SITE.slogan}`,
    description:
      "8 unidades na região de Campinas, atendimento de óbito 24 horas, plano funerário a partir de R$ 18,90 por mês.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nomeCompleto} · ${SITE.slogan}`,
    description:
      "8 unidades na região de Campinas, atendimento de óbito 24 horas.",
  },
  robots: { index: true, follow: true },
  category: "Serviços funerários",
  formatDetection: { telephone: true, address: true },
};

/**
 * Contrato da direcao. Vai como comentario HTML de verdade para sobreviver ao
 * build de producao e poder ser auditado no output. Seed: 3cf85566.
 */
const CONTRATO = `
THESIS: o padrao da categoria executado melhor que o dos concorrentes diretos, no registro moderno e
fluido dos sites do Plano Florees que a casa ja fez. Revisao de 03/09/2026: a serifa editorial foi
recusada por parecer juridica e antiga; entraram gradiente, vidro, revelacao no scroll e raio grande.
OWN-WORLD: azul #0069A3 e cinza pedra #74726C medidos no logo real; cor por servico herdada (bronze
cremacao, verde homenagens); Manrope para titulos e Inter para texto; superficies do navegador
tematizadas; icones desenhados, zero emoji.
STORY: quem chega em luto acha o telefone sem procurar; quem e associado tira a 2a via sem ligar; quem
pesquisa entende os 20 itens inclusos antes de falar com vendedor.
FIRST VIEWPORT: faixa 24h no topo com o telefone; malha de luz azul e ciano; titulo grande em Manrope,
as 8 unidades como prova de proximidade e as tres acoes rapidas em cartoes de vidro.
SIGNATURE: (1) carrossel de 9 depoimentos reais do Google com foto, seta, marcador, autoplay e pausa
visivel, que arrasta no dedo; (2) o site pergunta a localizacao e ja escolhe a unidade mais perto,
mostrando endereco e os dois telefones, com botao para ver as outras 7.
COR: azul da marca no institucional, laranja vivo so no Clube de Beneficios (a unica secao alegre de
um site de funeraria), verde da propria marca WhatsApp no botao flutuante com pulso.
FORM: candidato canon (saida padrao), seed 3cf85566, regua = Zelo, Flamboyant e Parque das Flores.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict,
DESIGN.md, and every shipping raster carrying its provenance.
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${texto.variable} antialiased`}
    >
      <head>
        {/* Consent Mode v2: tudo NEGADO por padrao. Precisa rodar antes de
            qualquer tag, por isso vai inline aqui e nao num componente. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_PADRAO_NEGADO }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="flex min-h-dvh flex-col bg-white">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--${CONTRATO}-->` }} />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-serra focus:bg-serra-700 focus:px-4 focus:py-3 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Revelacao />
        <BarraEmergencia />
        <Cabecalho />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Rodape />
        <VoltarAoTopo />
        <Consentimento />
      </body>
    </html>
  );
}
