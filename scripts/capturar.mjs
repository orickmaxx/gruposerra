/**
 * Captura de evidencia para a revisao de acabamento.
 *
 * Regras que a captura precisa obedecer para VALER como prova:
 *  - animacao de entrada assentada antes do obturador, senao um elemento
 *    escondido pelo timing le como elemento faltando e vira regressao;
 *  - pagina inteira, a partir do topo do documento;
 *  - Chrome de verdade, nao o Chromium de automacao.
 *
 * ⛔ ARMADILHA QUE INVALIDOU A PRIMEIRA RODADA: `fullPage: true` NAO avisa
 * quando estoura. O Chrome corta em ~16384px e devolve a imagem cortada como se
 * fosse a pagina toda. A home no celular tem mais de 24 mil px, entao 40% dela
 * (unidades, depoimentos, linha do tempo, FAQ, fecho e rodape) nunca foi olhada,
 * e o numero cortado ainda foi reportado como se fosse a altura da pagina.
 * Por isso o celular sai em SEGMENTOS, e a altura e conferida contra o
 * scrollHeight real antes de qualquer coisa ser dada como capturada.
 *
 * E `position: fixed` so aparece uma vez numa captura de pagina inteira, no
 * primeiro viewport. Para saber se a barra de ligar tapa alguma coisa la
 * embaixo, a unica prova possivel e uma tomada do TAMANHO DO VIEWPORT com a
 * pagina rolada ate o fim.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://127.0.0.1:4313";
const SAIDA = process.argv[2] ?? "../.impeccable/review";
const TETO_SEGMENTO = 7800; // folga confortavel abaixo do teto do Chrome
const SOBREPOSICAO = 120; // nada pode cair na emenda

mkdirSync(SAIDA, { recursive: true });

const navegador = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });

async function preparar(pagina, url) {
  await pagina.goto(url, { waitUntil: "networkidle" });
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.waitForTimeout(350);
}

async function medir(pagina) {
  return pagina.evaluate(() => ({
    altura: document.documentElement.scrollHeight,
    largura: document.documentElement.scrollWidth,
  }));
}

/* ---------------------------------------------------------------- desktop */
{
  const ctx = await navegador.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    locale: "pt-BR",
    reducedMotion: "reduce",
  });
  const pagina = await ctx.newPage();
  await preparar(pagina, BASE + "/");
  const { altura, largura } = await medir(pagina);
  await pagina.screenshot({ path: `${SAIDA}/desktop.png`, fullPage: true });
  console.log(
    `desktop   ${largura}x${altura}  ${largura > 1441 ? "!! ROLAGEM HORIZONTAL !!" : "sem rolagem horizontal"}  -> desktop.png`
  );
  await ctx.close();
}

/* ------------------------------------------- celular, em segmentos reais */
{
  const ctx = await navegador.newContext({
    viewport: { width: 390, height: TETO_SEGMENTO },
    deviceScaleFactor: 1,
    isMobile: false, // viewport alto: o layout depende so da largura de 390
    locale: "pt-BR",
    reducedMotion: "reduce",
  });
  const pagina = await ctx.newPage();
  await preparar(pagina, BASE + "/");
  const { altura, largura } = await medir(pagina);

  const passo = TETO_SEGMENTO - SOBREPOSICAO;
  const total = Math.max(1, Math.ceil((altura - SOBREPOSICAO) / passo));
  console.log(
    `celular   ${largura}x${altura}  ${largura > 391 ? "!! ROLAGEM HORIZONTAL !!" : "sem rolagem horizontal"}  -> ${total} segmentos`
  );

  for (let i = 0; i < total; i++) {
    const y = Math.min(i * passo, Math.max(0, altura - TETO_SEGMENTO));
    await pagina.evaluate((py) => window.scrollTo(0, py), y);
    await pagina.waitForTimeout(250);
    const arquivo = `${SAIDA}/mobile-${i + 1}.png`;
    await pagina.screenshot({ path: arquivo });
    console.log(`  segmento ${i + 1}/${total}  y=${y}..${y + TETO_SEGMENTO}  -> mobile-${i + 1}.png`);
  }
  await ctx.close();
}

/* ---------- celular de verdade: barra fixa, FAQ fechado e FAQ aberto ---- */
{
  const ctx = await navegador.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    locale: "pt-BR",
    reducedMotion: "reduce",
  });
  const pagina = await ctx.newPage();
  await preparar(pagina, BASE + "/");

  // 1. fim do documento: a barra de ligar esta tapando o rodape?
  await pagina.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await pagina.waitForTimeout(400);
  await pagina.screenshot({ path: `${SAIDA}/mobile-fundo.png` });
  const tapado = await pagina.evaluate(() => {
    const barra = document.querySelector(".fixed.inset-x-0.bottom-0");
    if (!barra) return "barra fixa NAO ENCONTRADA";
    const b = barra.getBoundingClientRect();
    const alvos = [...document.querySelectorAll("footer a, footer p")];
    const cobertos = alvos.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > b.top && r.top < b.bottom && r.bottom > 0 && r.top < innerHeight;
    });
    return `barra ocupa ${Math.round(b.height)}px; elementos do rodape sob ela agora: ${cobertos.length}`;
  });
  console.log(`fundo     ${tapado}  -> mobile-fundo.png`);

  // 2. FAQ fechado
  await pagina.evaluate(() => {
    const d = document.querySelector("details");
    d?.scrollIntoView({ block: "center", behavior: "instant" });
  });
  await pagina.waitForTimeout(350);
  await pagina.screenshot({ path: `${SAIDA}/mobile-faq.png` });

  // 3. FAQ aberto: o unico estado interativo da pagina, ausente na 1a rodada
  await pagina.evaluate(() => {
    const d = document.querySelector("details");
    if (d) d.open = true;
    d?.scrollIntoView({ block: "center", behavior: "instant" });
  });
  await pagina.waitForTimeout(400);
  await pagina.screenshot({ path: `${SAIDA}/mobile-faq-aberto.png` });
  console.log("faq       fechado e aberto  -> mobile-faq.png, mobile-faq-aberto.png");

  await ctx.close();
}

await navegador.close();
