import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.nomeCompleto} · atendimento de óbito 24 horas na região de Campinas`;

/**
 * Imagem de compartilhamento, desenhada no sistema da marca.
 *
 * Existe porque o site atual do cliente nao tem UMA tag Open Graph, e a pagina
 * mais compartilhada dele, o obituario, chega ao WhatsApp pelada. Ver CLAUDE.md
 * secao 9.1. A mesma rota vai servir por falecido em /obituario/[slug].
 */
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a4668",
          padding: "72px 80px",
          color: "#fff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#aed4ea",
            }}
          >
            {SITE.nomeCompleto}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 68,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            {SITE.slogan}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(255,255,255,0.22)",
            paddingTop: 30,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 25, color: "#aed4ea" }}>
              Atendimento de óbito, 24 horas
            </div>
            <div style={{ display: "flex", fontSize: 60, marginTop: 6 }}>
              {SITE.emergencia.rotulo}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 25,
              color: "#aed4ea",
              textAlign: "right",
            }}
          >
            {UNIDADES.length} unidades · região de Campinas
          </div>
        </div>
      </div>
    ),
    size
  );
}
