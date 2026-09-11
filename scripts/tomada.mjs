import { chromium } from "playwright";
const url = process.env.URL ?? "http://127.0.0.1:4400/";
const out = process.env.OUT ?? "hero.png";
const h = Number(process.env.H ?? 1000);
const w = Number(process.env.W ?? 1440);
const y = Number(process.env.Y ?? 0);
const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });
const ctx = await nav.newContext({ viewport: { width: w, height: h }, locale: "pt-BR", deviceScaleFactor: 1 });
await ctx.addInitScript(() => {
  /* Dispensa o banner de cookies na captura: ele nao e o que esta sendo
     revisado e tapa um terco do primeiro viewport em toda tomada. */
  try { localStorage.setItem("serra_consentimento", "recusado"); } catch {}
  /* ⛔ O modo de movimento e DECLARADO pelo teste, nao herdado da maquina.
     O juiz de desempenho em `movimento.tsx` mede os quadros reais e rebaixa
     para "reduzido" quando o aparelho nao da conta. O Chrome headless daqui
     roda em software e reprova nessa medicao, entao sem esta linha metade da
     camada cinema era desligada no meio da bateria e os testes acusavam falhas
     que nao existem no navegador de ninguem. Escolha explicita vence o juiz. */
  try { localStorage.setItem("serra_movimento", "completo"); } catch {}

});
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.evaluate((yy) => window.scrollTo(0, yy), y);
await p.waitForTimeout(1800);
await p.screenshot({ path: out });
console.log("altura total", await p.evaluate(() => document.documentElement.scrollHeight));
await nav.close();
