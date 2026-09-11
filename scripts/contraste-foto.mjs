/**
 * Contraste de texto SOBRE FOTOGRAFIA, medido no pixel.
 *
 * Contraste sobre cor chapada se calcula no papel. Sobre uma foto, nao: o
 * fundo muda a cada pixel, e a conta que vale e a do PIOR pedaco que fica atras
 * de uma letra. Uma janela clara no canto direito do plano pode derrubar para
 * 2:1 um texto que, na media, daria 9:1. Media nao le texto; olho le.
 *
 * Como a medicao e feita aqui:
 *   1. recorta a area exata de cada bloco de texto do herói, ja renderizado,
 *      com veu, grao, vinheta e tudo o que estiver por cima;
 *   2. devolve esse recorte para DENTRO da propria pagina, desenha num canvas
 *      e le os pixels. Nada de biblioteca de imagem, nada de aproximacao;
 *   3. joga fora os pixels do proprio texto (os mais claros, que sao as
 *      letras) e calcula o contraste contra o percentil 95 do que sobrou, que
 *      e o ponto mais claro do FUNDO atras da frase.
 *
 * O limite e o da WCAG: 4.5:1 para texto normal, 3:1 para texto grande
 * (>= 24px, ou >= 18.66px em negrito).
 */
import { chromium } from "playwright";

const BASE = process.env.URL ?? "http://127.0.0.1:4400/";
const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });
const ctx = await nav.newContext({ viewport: { width: 1440, height: 950 }, locale: "pt-BR" });
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("serra_consentimento", "recusado");
  } catch {}
});
const p = await ctx.newPage();
await p.goto(BASE, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(2000);

const ALVOS = [
  { nome: "herói: manchete", sel: ".titulo-cine .linha-mascara" },
  { nome: "herói: parágrafo de apoio", sel: "section p.revela-texto" },
  { nome: "herói: selo do Google", sel: ".revela-texto.group span.text-\\[0\\.9375rem\\]" },
  { nome: "herói: linha de cidades", sel: "section p.revela-texto:last-of-type" },
  { nome: "fecho: manchete", sel: "#conteudo > section:last-of-type .linha-mascara" },
  { nome: "fecho: parágrafo", sel: "#conteudo > section:last-of-type p.text-lead" },
  /* Seletor por TEXTO, nao por classe: as classes do Tailwind v4 trazem
     barra e colchete e viram ruido de escape em tres niveis (shell, Python,
     Playwright). O texto da frase nao muda de forma. */
  { nome: "fecho: nota dos telefones", sel: 'section:last-of-type p:has-text("Os dois números")' },
  { nome: "fecho: painel de planejamento", sel: 'section:last-of-type p:has-text("Contratar antes")' },
];

let falhas = 0;

for (const alvo of ALVOS) {
  const el = p.locator(alvo.sel).first();
  if ((await el.count()) === 0) {
    console.log(`--    ${alvo.nome}: seletor nao encontrou nada`);
    continue;
  }
  /* Rola ate o bloco antes de medir. `clip` e em coordenadas da JANELA: sem
     isso, qualquer alvo abaixo da dobra devolve "clipped area outside the
     image" em vez de um numero errado, que ao menos e um erro honesto. */
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1400);
  const caixa = await el.boundingBox();
  if (!caixa || caixa.width < 4 || caixa.height < 4) continue;

  const estilo = await el.evaluate((n) => {
    const c = getComputedStyle(n);
    return { cor: c.color, tamanho: parseFloat(c.fontSize), peso: c.fontWeight };
  });

  const png = await p.screenshot({
    clip: {
      x: Math.max(0, caixa.x),
      y: Math.max(0, caixa.y),
      width: Math.min(caixa.width, 1440),
      height: Math.min(caixa.height, 950),
    },
  });

  if (process.env.DEBUG) {
    const { writeFileSync } = await import("node:fs");
    writeFileSync(`.impeccable/cine/corte-${alvo.nome.replace(/[^a-z]/gi, "")}.png`, png);
  }

  const medida = await p.evaluate(
    async ({ b64 }) => {
      const lum = (r, g, b) => {
        const f = (v) => {
          v /= 255;
          return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      const bin = atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      const bmp = await createImageBitmap(new Blob([arr], { type: "image/png" }));
      const cv = new OffscreenCanvas(bmp.width, bmp.height);
      const cx = cv.getContext("2d");
      cx.drawImage(bmp, 0, 0);
      const d = cx.getImageData(0, 0, bmp.width, bmp.height).data;

      const lums = [];
      for (let i = 0; i < d.length; i += 4) lums.push(lum(d[i], d[i + 1], d[i + 2]));
      lums.sort((a, b2) => a - b2);
      const pct = (q) => lums[Math.min(lums.length - 1, Math.floor(lums.length * q))];

      /* ⛔ A primeira versao lia a cor declarada do texto e calculava contra
         ela. Nao funciona: o Tailwind v4 entrega `color(srgb 1 1 1 / .8)` no
         `getComputedStyle`, uma sintaxe que o parser ingenuo lia como RGB
         (1,1,1), ou seja, PRETO. O relatorio acusava 1.65:1 num texto branco
         sobre azul-escuro, e o defeito era do medidor.

         O conserto tambem e a medida mais honesta que existe: nada de cor
         declarada. O TEXTO e o percentil 99,5 dos pixels do recorte (as
         letras, ja compostas com a opacidade delas sobre a foto) e o FUNDO e o
         percentil 62, que cai bem dentro do fundo mesmo quando o bloco tem
         muita letra. O que se compara e o que a pessoa enxerga. */
      const texto = pct(0.995);
      const fundo = pct(0.62);
      const razao = (Math.max(texto, fundo) + 0.05) / (Math.min(texto, fundo) + 0.05);
      return { razao, texto, fundo };
    },
    { b64: png.toString("base64") }
  );

  const grande = estilo.tamanho >= 24 || (estilo.tamanho >= 18.66 && Number(estilo.peso) >= 700);
  const minimo = grande ? 3 : 4.5;
  const ok = medida.razao >= minimo;
  if (!ok) falhas++;
  console.log(
    `${ok ? "ok  " : "FALHA"}  ${alvo.nome}: ${medida.razao.toFixed(2)}:1 ` +
      `(minimo ${minimo}:1, ${Math.round(estilo.tamanho)}px${grande ? " grande" : ""}) ` + (process.env.DEBUG ? JSON.stringify(medida) : "")
  );
}

await nav.close();
console.log(falhas ? `\n${falhas} bloco(s) abaixo do minimo` : "\ntodo texto sobre fotografia passa a WCAG AA");
process.exit(falhas ? 1 : 0);
