/**
 * Quem esta comendo os quadros.
 *
 * Medir "esta travando" nao conserta nada: e preciso saber QUAL efeito custa.
 * Este arquivo roda a mesma medicao de rolagem varias vezes, desligando um
 * suspeito por vez via CSS injetado, e mostra quanto cada um devolve de fps.
 *
 * E o oposto de otimizar por intuicao. Sem isto, o caminho normal seria tirar o
 * efeito mais bonito por ser o mais suspeito, perder o visual e continuar
 * travando.
 *
 * DUAS ARMADILHAS DE MEDICAO, as duas ja caidas aqui:
 *
 *  1. ⛔ ORDEM VIRA RESULTADO. A primeira bateria mediu cada suspeito uma vez,
 *     em sequencia, contra uma unica base tirada no comeco. Os numeros subiam
 *     monotonicamente porque o navegador ia esquentando (JIT, cache de raster),
 *     e o ultimo da lista parecia sempre o mais caro. Agora a base e REMEDIDA
 *     antes de cada suspeito: o aquecimento afeta as duas medidas igual e se
 *     cancela na subtracao.
 *
 *  2. ⚠️ ESTE FPS NAO E O DA SUA MAQUINA. O Chrome headless daqui roda em
 *     SwiftShader, rasterizacao por SOFTWARE, e o processo de GPU chega a cair
 *     sozinho. O numero absoluto nao vale para ninguem. O que vale e a ORDEM e
 *     o TAMANHO RELATIVO do ganho: software penaliza exatamente o que a GPU
 *     tambem penaliza (blur, blend, camada), so que com lupa.
 */
import { chromium, devices } from "playwright";

const BASE = process.env.URL ?? "http://127.0.0.1:4400/";
const CELULAR = process.env.CELULAR === "1";
const FREIO = Number(process.env.CPU ?? (CELULAR ? 4 : 1));

const SUSPEITOS = [
  ["backdrop-filter", `*,*::before,*::after{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}`],
  ["will-change", `*,*::before,*::after{will-change:auto!important}`],
  ["aurora (blur 30px)", `.aurora::before{display:none!important}`],
  ["grao (blend overlay)", `.grao::after{display:none!important}`],
  ["mosaico (mask)", `.mosaico::before{display:none!important}`],
  ["ken burns", `.kenburns{animation:none!important}`],
  ["sombras", `*{box-shadow:none!important}`],
  ["vinheta", `.vinheta::before{display:none!important}`],
  ["foto de fundo", `.foto-marca{display:none!important}`],
  ["paralaxe", `.paralaxe{transform:none!important}`],
  ["revelacao no scroll", `.js-revela [data-revela]{transition:none!important}`],
];

const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });
const ctx = await nav.newContext({
  ...(CELULAR ? devices["Pixel 7"] : { viewport: { width: 1440, height: 900 } }),
  locale: "pt-BR",
});
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("serra_consentimento", "recusado");
  } catch {}
  /* ⛔ O modo de movimento e DECLARADO pelo teste, nao herdado da maquina.
     O juiz de desempenho em `movimento.tsx` mede os quadros reais e rebaixa
     para "reduzido" quando o aparelho nao da conta. O Chrome headless daqui
     roda em software e reprova nessa medicao, entao sem esta linha metade da
     camada cinema era desligada no meio da bateria e os testes acusavam falhas
     que nao existem no navegador de ninguem. Escolha explicita vence o juiz. */
  try { localStorage.setItem("serra_movimento", "completo"); } catch {}

});
const p = await ctx.newPage();
const cdp = await ctx.newCDPSession(p);
if (FREIO > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: FREIO });
await p.goto(BASE, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(800);

async function medir(css) {
  await p.evaluate((regra) => {
    let tag = document.getElementById("experimento");
    if (!tag) {
      tag = document.createElement("style");
      tag.id = "experimento";
      document.head.appendChild(tag);
    }
    tag.textContent = regra;
  }, css);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(600);

  return p.evaluate(async () => {
    const alt = document.documentElement.scrollHeight - window.innerHeight;
    let quadros = 0;
    let rodando = true;
    let anterior = performance.now();
    let travadas = 0;
    const contar = () => {
      const a = performance.now();
      if (a - anterior > 50) travadas++;
      anterior = a;
      quadros++;
      if (rodando) requestAnimationFrame(contar);
    };
    requestAnimationFrame(contar);
    const ini = performance.now();
    for (let i = 0; i <= 70; i++) {
      window.scrollTo(0, (alt * i) / 70);
      await new Promise((r) => setTimeout(r, 24));
    }
    const dur = performance.now() - ini;
    rodando = false;
    return { fps: +(quadros / (dur / 1000)).toFixed(1), travadas };
  });
}

console.log(`\n— ${CELULAR ? "Pixel 7" : "desktop 1440"}, CPU ${FREIO}x —`);
console.log("  fps de software: o que vale e o ganho relativo, nao o numero\n");

await medir(""); // a primeira leitura e sempre fria: descartada

const placar = [];
for (const [nome, css] of SUSPEITOS) {
  const base = await medir("");
  const r = await medir(css);
  placar.push({ nome, base: base.fps, com: r.fps, ganho: +(r.fps - base.fps).toFixed(1) });
}

placar.sort((a, b) => b.ganho - a.ganho);
for (const l of placar) {
  const marca = l.ganho >= 5 ? "  <<< CARO" : l.ganho >= 2.5 ? "  <<" : "";
  console.log(
    `  ${l.nome.padEnd(22)} ${String(l.base).padStart(5)} -> ${String(l.com).padStart(5)} fps   ` +
      `${l.ganho >= 0 ? "+" : ""}${l.ganho}${marca}`
  );
}
console.log("");

await nav.close();
