import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";
import { SELO_DEMO, ESTILO_SELO } from "@/lib/metadados";
import {
  OBITUARIOS,
  dataPorExtenso,
  obituarioPorSlug,
  periodoDeVida,
  unidadeDo,
} from "@/data/obituarios";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aviso de falecimento · Grupo Serra Funerárias";

export function generateStaticParams() {
  return OBITUARIOS.map((o) => ({ slug: o.slug }));
}

/**
 * O cartão que aparece no WhatsApp.
 *
 * ⛔ TIPOGRÁFICO, SEM RETRATO, e isso é decisão e não limitação. As duas
 * alternativas eram piores: silhueta genérica num cartão de 1200x630 lê como
 * imagem quebrada, e rosto de banco de imagem seria a foto de uma pessoa viva
 * anunciando a morte de outra. Nome, período de vida e os dados da cerimônia
 * em tipografia limpa leem como decisão de design, e é o que uma família manda
 * para cem pessoas em um minuto.
 *
 * Esta é a entrega mais importante do projeto inteiro: hoje o link do obituário
 * do cliente chega ao WhatsApp sem título, sem imagem e sem descrição, porque o
 * site antigo não tem uma única tag Open Graph (CLAUDE.md 5.1).
 *
 * ⚠️ A fonte é a mesma de `app/opengraph-image.tsx` (Georgia). Manrope não está
 * disponível no runtime da `ImageResponse` sem embutir o arquivo da fonte, e
 * embutir custa peso em toda geração. As duas imagens OG do site usam a mesma
 * família, então elas são consistentes ENTRE SI, que é o que o olho compara.
 */
export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = obituarioPorSlug(slug);

  if (!o) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a4668",
            color: "#fff",
            fontSize: 48,
            fontFamily: "Georgia, serif",
          }}
        >
          {SITE.nomeCompleto}
        </div>
      ),
      size
    );
  }

  const u = unidadeDo(o);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          /* `relative` existe para o selo de demonstração lá embaixo se
             ancorar aqui. Sem isto ele se posiciona contra a raiz e sai da
             imagem. */
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a4668",
          padding: "64px 80px",
          color: "#fff",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#aed4ea",
          }}
        >
          {SITE.nomeCompleto}
        </div>

        {/* O nome ocupa o peso todo e fica no CENTRO ÓPTICO do cartão. Com o
            bloco encostado no topo sobrava um vazio de 200px no miolo, que lia
            como imagem que não terminou de carregar. */}
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: o.nome.length > 24 ? 62 : 74,
              lineHeight: 1.12,
              maxWidth: 1000,
            }}
          >
            {o.nome}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 34,
              color: "#aed4ea",
            }}
          >
            {periodoDeVida(o)}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 48,
            borderTop: "2px solid rgba(255,255,255,0.22)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
            <div style={{ display: "flex", fontSize: 23, color: "#aed4ea" }}>
              Velório · {dataPorExtenso(o.dataVelorio)}, das {o.horaInicio} às {o.horaTermino}
            </div>
            {/* SÓ O NOME DA UNIDADE, sem o logradouro. Com a rua inteira a
                linha quebrava em duas e o cartão virava um bloco de texto; o
                endereço completo está na página, que é onde alguém dirigindo
                vai buscá-lo de qualquer forma. */}
            <div style={{ display: "flex", fontSize: 36, marginTop: 8 }}>
              Unidade {u.nome}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <div style={{ display: "flex", fontSize: 21, color: "#aed4ea" }}>
              Atendimento 24 horas
            </div>
            <div style={{ display: "flex", fontSize: 34, marginTop: 6 }}>{u.telefone}</div>
          </div>
        </div>

        {/* O selo de demonstração, na mesma posição e no mesmo tom da imagem
            padrão do site. Some sozinho quando `NEXT_PUBLIC_INDEXAVEL=1` for
            ligada. Ver a nota em `lib/metadados.ts`: o cartão viaja sozinho. */}
        {SELO_DEMO || o.ehExemplo ? (
          <div style={ESTILO_SELO}>
            {o.ehExemplo ? "Demonstração · registro fictício" : SELO_DEMO}
          </div>
        ) : null}
      </div>
    ),
    size
  );
}
