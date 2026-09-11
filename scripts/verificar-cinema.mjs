/**
 * Prova de que a camada cinema FUNCIONA no navegador, e nao so existe no CSS.
 *
 * Cada checagem aqui nasceu de um jeito conhecido de o efeito falhar calado:
 * custom property que nunca e escrita, cortina que fica opaca por cima da foto
 * para sempre, titulo em mascara que nunca recebe a animacao. Nenhum desses
 * aparece numa captura estatica, e todos deixam a pagina pior do que estava.
 */
import { chromium } from "playwright";
const BASE = process.env.URL ?? "http://127.0.0.1:4400/";
const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, locale: "pt-BR" });
const p = await ctx.newPage();
const falhas = [];
const ok = (nome, cond, extra = "") => {
  console.log(`${cond ? "ok  " : "FALHA"}  ${nome}${extra ? "  " + extra : ""}`);
  if (!cond) falhas.push(nome);
};

await p.goto(BASE, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);

/* 1. holofote: a luz segue o ponteiro dentro do cartao */
/* Um `.holofote` FOLHA: holofote aninhado acende so o mais interno, que e
   o comportamento correto e faria o pai parecer quebrado no teste. */
const cartao = p.locator(".holofote:not(:has(.holofote))").first();
await cartao.hover();
await p.waitForTimeout(200);
const mx = await cartao.evaluate((el) => el.style.getPropertyValue("--mx"));
ok("holofote escreve --mx no cartao sob o ponteiro", mx.endsWith("%"), mx);

/* 2. ima: o botao principal do herói acompanha o cursor */
const botao = p.locator("a.ima").first();
const cx = await botao.boundingBox();
await p.mouse.move(cx.x + cx.width * 0.9, cx.y + cx.height * 0.8);
await p.waitForTimeout(220);
const ix = await botao.evaluate((el) => el.style.getPropertyValue("--ix"));
ok("ima desloca o botao no ponteiro", ix !== "" && parseFloat(ix) !== 0, ix);
ok("ima respeita o teto de 7px", Math.abs(parseFloat(ix || "0")) <= 7.01, ix);

/* 3. titulo em mascara: a linha chega em translateY(0) */
const linha = p.locator(".titulo-cine .linha-mascara > span").first();
await p.waitForTimeout(1400);
const t = await linha.evaluate((el) => getComputedStyle(el).transform);
ok("linha do titulo assenta em translate zero", t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)", t);

/* 3b. O TEXTO SOBREVIVE A MASCARA.
   A manchete e cortada em linhas que sao blocos vizinhos, e `textContent` cola
   as palavras na emenda: o h1 chegava ao Google como "Estamos perto,e
   atendemos aqualquer hora.". E invisivel na tela e fatal no buscador, que e
   a razao de este site existir. Le como um rastreador le. */
const emenda = await p.evaluate(() => {
  const falhas = [];
  for (const t of document.querySelectorAll(".titulo-cine")) {
    const linhas = [...t.querySelectorAll(":scope > .linha-mascara")];
    if (linhas.length < 2) continue;
    linhas.slice(0, -1).forEach((l, i) => {
      if (!/\s$/.test(l.textContent ?? "")) falhas.push(`${t.tagName} linha ${i + 1}`);
    });
  }
  return { falhas, h1: document.querySelector("h1")?.textContent ?? "" };
});
ok(
  "toda linha de titulo termina em espaco",
  emenda.falhas.length === 0,
  emenda.falhas.length ? emenda.falhas.join(", ") : emenda.h1
);

/* 3c. NENHUM titulo em mascara pode ficar escondido.
   O estado inicial e opacidade 0 dentro de um `overflow: hidden`. Um titulo
   em mascara fora de um bloco observado nunca receberia `data-visivel` e
   sumiria para sempre, sem erro nenhum no console. */
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(300);

/* 4. paralaxe: o fundo do herói anda ao rolar */
await p.evaluate(() => window.scrollTo(0, 600));
await p.waitForTimeout(400);
const par = await p.locator(".paralaxe").first().evaluate((el) => el.style.getPropertyValue("--par"));
ok("paralaxe escreve --par ao rolar", par !== "" && parseFloat(par) !== 0, par);

/* 5. trilho de progresso: cresce com a rolagem */
const prog = await p.locator(".progresso").evaluate((el) => getComputedStyle(el).transform);
ok("trilho de progresso saiu do zero", prog !== "matrix(0, 0, 0, 1, 0, 0)" && prog !== "none", prog);

/* 6. cortina: NENHUM veu pode continuar opaco depois de revelado */
await p.evaluate(() => {
  const f = document.querySelector(".cortina");
  f?.scrollIntoView({ block: "center" });
});
await p.waitForTimeout(2200);
const presas = await p.evaluate(() =>
  [...document.querySelectorAll(".cortina-veu")].filter((el) => {
    const m = new DOMMatrix(getComputedStyle(el).transform);
    return m.d > 0.02;
  }).length
);
ok("nenhuma cortina ficou presa sobre a foto", presas === 0, `presas: ${presas}`);

/* 7. nada pode ficar invisivel depois que a pagina inteira foi percorrida */
await p.evaluate(async () => {
  const passo = window.innerHeight * 0.8;
  for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
});
await p.waitForTimeout(1200);
const invisiveis = await p.evaluate(() =>
  [...document.querySelectorAll("[data-revela]")].filter(
    (el) => parseFloat(getComputedStyle(el).opacity) < 0.9
  ).length
);
ok("nenhum bloco revelavel ficou invisivel", invisiveis === 0, `invisiveis: ${invisiveis}`);

const titulosSumidos = await p.evaluate(
  () =>
    [...document.querySelectorAll(".linha-mascara > span")].filter(
      (el) => parseFloat(getComputedStyle(el).opacity) < 0.9
    ).length
);
ok("nenhum titulo em mascara ficou escondido", titulosSumidos === 0, `sumidos: ${titulosSumidos}`);

const quantosTitulos = await p.evaluate(() => document.querySelectorAll(".titulo-cine").length);
ok("o sistema de titulo vale para a pagina inteira", quantosTitulos >= 12, `${quantosTitulos} titulos em mascara`);


/* ============================ efeitos de arrasto, 3D e particulas ======== */

/* 9. ESTEIRA: anda sozinha, e da para pegar.
   A versao antiga era `animation: translateX(-50%)` numa fita: bonita e morta,
   nao aceitava mouse, dedo nem teclado. Agora quem anda e a rolagem, entao as
   tres coisas sao de graca. Este teste cobre as duas metades. */
const esteira = p.locator(".esteira").first();
await esteira.scrollIntoViewIfNeeded();
await p.waitForTimeout(400);
const e1 = await esteira.evaluate((el) => el.scrollLeft);
await p.waitForTimeout(900);
const e2 = await esteira.evaluate((el) => el.scrollLeft);
ok("esteira anda sozinha", e2 > e1, `${e1.toFixed(0)} -> ${e2.toFixed(0)}`);

async function arrastar(loc, dx) {
  const c = await loc.boundingBox();
  const y = c.y + c.height / 2;
  const x = c.x + c.width / 2;
  const antes = await loc.evaluate((el) => el.scrollLeft);
  await p.mouse.move(x, y);
  await p.mouse.down();
  for (let i = 1; i <= 8; i++) await p.mouse.move(x + (dx * i) / 8, y);
  await p.mouse.up();
  await p.waitForTimeout(120);
  return { antes, depois: await loc.evaluate((el) => el.scrollLeft) };
}

const arrEsteira = await arrastar(esteira, -240);
ok(
  "esteira se deixa arrastar com o mouse",
  arrEsteira.depois > arrEsteira.antes + 60,
  `${arrEsteira.antes.toFixed(0)} -> ${arrEsteira.depois.toFixed(0)}`
);

/* 10. DEPOIMENTOS: o trilho tambem se pega, e arrastar NAO pode navegar.
   Cada cartao e um link para o Google. Um arrasto de 200px que termina em
   clique abriria uma aba nova no meio do gesto, que e o jeito classico de
   este efeito estragar a pagina. */
const trilhoDepo = p.locator("#depoimentos ul.trilho").first();
await trilhoDepo.scrollIntoViewIfNeeded();
await p.waitForTimeout(500);
const urlAntes = p.url();
const arrDepo = await arrastar(trilhoDepo, -300);
await p.waitForTimeout(500);
ok(
  "trilho de depoimentos se deixa arrastar",
  arrDepo.depois > arrDepo.antes + 80,
  `${arrDepo.antes.toFixed(0)} -> ${arrDepo.depois.toFixed(0)}`
);
ok("arrastar sobre o cartao nao navega", p.url() === urlAntes && ctx.pages().length === 1);

/* 11. RELEVO: o cartao inclina no eixo Z, e dentro do teto.
   O trilho volta ao inicio antes de medir: o teste de arrasto acima empurrou
   o primeiro cartao para fora da janela, e ponteiro em coordenada negativa nao
   acerta nada. */
await trilhoDepo.evaluate((el) => (el.scrollLeft = 0));
await p.waitForTimeout(400);
const cartao3d = p.locator("#depoimentos li.relevo").first();
const cx3d = await cartao3d.boundingBox();
await p.mouse.move(cx3d.x + cx3d.width * 0.85, cx3d.y + cx3d.height * 0.2);
await p.waitForTimeout(260);
const giro = await cartao3d.evaluate((el) => ({
  rx: parseFloat(el.style.getPropertyValue("--rx")),
  ry: parseFloat(el.style.getPropertyValue("--ry")),
}));
ok("relevo inclina o cartao no ponteiro", Math.abs(giro.ry) > 1, `rx=${giro.rx} ry=${giro.ry}`);
ok(
  "relevo respeita o teto de giro",
  Math.abs(giro.rx) <= 10.01 && Math.abs(giro.ry) <= 10.01,
  `rx=${giro.rx} ry=${giro.ry}`
);

/* 12. LINHA DO TEMPO: o fio do ano aceso esta DESENHADO, nao so colorido. */
const fio = p.locator("#historia .lt-aceso .lt-fio").first();
await p.locator("#historia").scrollIntoViewIfNeeded();
await p.waitForTimeout(1200);
const escalaFio = await fio.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
ok("fio da linha do tempo se desenha ate o fim", escalaFio > 0.95, `scaleX=${escalaFio.toFixed(2)}`);

/* 13. SIMULADOR: uma pergunta por vez, avanca ao responder, e volta.
   E a peca de conversao da pagina. Se o avanco quebrar, a pessoa fica presa na
   primeira pergunta sem nenhum erro na tela. */
const sim = p.locator("#comparador");
await sim.scrollIntoViewIfNeeded();
await p.waitForTimeout(600);
const q1 = await sim.locator("legend").innerText();
await sim.locator("button.opcao").first().click();
await p.waitForTimeout(700);
const q2 = await sim.locator("legend").innerText();
ok("responder avanca para a proxima pergunta", q1 !== q2, `"${q1}" -> "${q2}"`);

await sim.getByRole("button", { name: /Voltar/i }).click();
await p.waitForTimeout(700);
const q3 = await sim.locator("legend").innerText();
ok("voltar devolve a pergunta anterior", q3 === q1, `"${q3}"`);

/* 14. PARTICULAS: a tela realmente pinta durante a transicao.
   Le os pixels do canvas no meio do gesto. Canvas vazio aqui significaria um
   efeito que existe so no codigo. */
const pintou = await sim.evaluate(async (raiz) => {
  const cv = raiz.querySelector("canvas");
  /* A SEGUNDA opcao, nao a primeira: a primeira ja esta marcada por causa do
     teste de avanco acima, e clicar de novo DESMARCA, o que nao avanca e
     portanto nao dispara particula nenhuma. O teste estava medindo o
     comportamento certo e chamando de falha. */
  const opcao = raiz.querySelectorAll("button.opcao")[1];
  if (!cv || !opcao) return -1;
  opcao.click();
  await new Promise((r) => setTimeout(r, 160));
  const cx = cv.getContext("2d");
  const d = cx.getImageData(0, 0, cv.width, cv.height).data;
  let pintados = 0;
  for (let i = 3; i < d.length; i += 4) if (d[i] > 8) pintados++;
  return pintados;
});
ok("as particulas pintam a tela de verdade", pintou > 200, `${pintou} pixels`);

/* 8. reduced motion derruba a camada inteira */
const ctx2 = await nav.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const p2 = await ctx2.newPage();
await p2.goto(BASE, { waitUntil: "networkidle" });
await p2.waitForTimeout(600);
const anima = await p2.evaluate(() => {
  const el = document.querySelector(".kenburns");
  return el ? getComputedStyle(el).animationName : "sem elemento";
});
ok("ken burns parado em prefers-reduced-motion", anima === "none", anima);
const veu2 = await p2.evaluate(() => {
  const el = document.querySelector(".cortina-veu");
  return el ? new DOMMatrix(getComputedStyle(el).transform).d : -1;
});
ok("cortina ja aberta em prefers-reduced-motion", veu2 <= 0.02, String(veu2));

await nav.close();
console.log(falhas.length ? `\n${falhas.length} FALHA(S)` : "\ntudo verde");
process.exit(falhas.length ? 1 : 0);
