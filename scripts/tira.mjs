/* Tira a home em fatias de viewport, para revisar secao a secao sem estourar
   o teto de 16384px do Chrome numa captura de pagina inteira. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const BASE = process.env.URL ?? "http://127.0.0.1:4400/";
const SAIDA = process.env.SAIDA ?? ".impeccable/cine";
const W = Number(process.env.W ?? 1440);
const H = Number(process.env.H ?? 1000);
mkdirSync(SAIDA, { recursive: true });
const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });
const ctx = await nav.newContext({ viewport: { width: W, height: H }, locale: "pt-BR", deviceScaleFactor: 1 });
await ctx.addInitScript(() => {
  /* Dispensa o banner de cookies na captura: ele nao e o que esta sendo
     revisado e tapa um terco do primeiro viewport em toda tomada. */
  try { localStorage.setItem("serra_consentimento", "recusado"); } catch {}
});
const p = await ctx.newPage();
const erros = [];
p.on("console", (m) => m.type() === "error" && erros.push(m.text()));
p.on("pageerror", (e) => erros.push(String(e)));
await p.goto(BASE, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
const total = await p.evaluate(() => document.documentElement.scrollHeight);
const n = Math.ceil(total / H);
for (let i = 0; i < n; i++) {
  await p.evaluate((y) => window.scrollTo(0, y), i * H);
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${SAIDA}/f${String(i).padStart(2, "0")}.png` });
}
console.log("altura", total, "fatias", n);
if (erros.length) console.log("ERROS:", erros.slice(0, 10).join("\n"));
await nav.close();
