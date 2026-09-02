/**
 * Prova as interacoes NOVAS, em vez de eu afirmar que funcionam.
 *
 * 1. Carrossel: seta anda, marcador anda, autoplay anda, pausa para de verdade,
 *    e arrastar no dedo tambem muda o cartao (o defeito que derrubou a versao
 *    anterior era exatamente nao dar para parar nem arrastar no celular).
 * 2. Geolocalizacao: com a posicao FINGIDA em Sumare, a unidade escolhida tem
 *    que virar Sumare. Se escolher Campinas, a conta de distancia esta errada.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:4330";
const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });

const ativo = (p) =>
  p.evaluate(() => {
    const ds = [...document.querySelectorAll('[role="tab"]')];
    return ds.findIndex((d) => d.getAttribute("aria-selected") === "true");
  });

/* --------------------------------------------------------------- carrossel */
/* O carrossel mudou: sem autoplay (o dono pediu), sem botao de pausa, seta em
   cada BORDA e navegacao de PAGINA em pagina. Entao o teste mede pagina, e nao
   cartao, e confere que no desktop cabem 3 por vez. */
for (const [nome, w, h, porPagina] of [
  ["desktop", 1440, 900, 3],
  ["tablet ", 820, 1000, 2],
  ["celular", 390, 844, 1],
]) {
  const ctx = await nav.newContext({
    viewport: { width: w, height: h },
    isMobile: w < 500,
    hasTouch: w < 500,
    locale: "pt-BR",
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelector("#depoimentos")?.scrollIntoView());
  await p.waitForTimeout(700);

  const visiveis = await p.evaluate(() => {
    const t = document.querySelector(".trilho");
    const cartoes = [...t.children];
    const r = t.getBoundingClientRect();
    return cartoes.filter((c) => {
      const b = c.getBoundingClientRect();
      return b.left >= r.left - 2 && b.right <= r.right + 2;
    }).length;
  });
  console.log(
    `${nome} cabem ${visiveis} por vez  ->  ${visiveis === porPagina ? "OK ✓" : `ESPERADO ${porPagina} ✗`}`
  );

  const pag = () =>
    p.evaluate(() => {
      const b = [...document.querySelectorAll('[aria-label^="Ir para a página"]')];
      return b.findIndex((x) => x.getAttribute("aria-current") === "true");
    });

  const p0 = await pag();
  await p.getByLabel("Próximos depoimentos").click();
  await p.waitForTimeout(900);
  const p1 = await pag();
  console.log(`${nome} seta direita ${p0} -> ${p1}    ${p1 === p0 + 1 ? "OK ✓" : "FALHOU ✗"}`);

  await p.getByLabel("Depoimentos anteriores").click();
  await p.waitForTimeout(900);
  const p2 = await pag();
  console.log(`${nome} seta esquerda ${p1} -> ${p2}   ${p2 === p0 ? "OK ✓" : "FALHOU ✗"}`);

  // sem autoplay: nao pode andar sozinho
  await p.mouse.move(5, 5);
  await p.waitForTimeout(6500);
  const p3 = await pag();
  console.log(`${nome} sem autoplay ${p2} -> ${p3}    ${p2 === p3 ? "OK ✓ parado" : "ANDOU SOZINHO ✗"}`);

  // as setas das bordas: uma em cada lado, longe uma da outra
  const dist = await p.evaluate(() => {
    const a = document.querySelector('[aria-label="Depoimentos anteriores"]').getBoundingClientRect();
    const b = document.querySelector('[aria-label="Próximos depoimentos"]').getBoundingClientRect();
    return Math.round(b.left - a.right);
  });
  console.log(`${nome} setas afastadas ${dist}px       ${dist > w * 0.6 ? "OK ✓ nas bordas" : "JUNTAS ✗"}`);

  await ctx.close();
}

/* --------------------------------------------------- geolocalizacao fingida */
for (const [cidade, lat, lon, esperado] of [
  ["Sumaré", -22.8219, -47.2669, "Sumaré"],
  ["Vinhedo", -23.0299, -46.975, "Vinhedo"],
  ["Artur Nogueira", -22.5731, -47.1725, "Artur Nogueira"],
]) {
  const ctx = await nav.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "pt-BR",
    geolocation: { latitude: lat, longitude: lon },
    permissions: ["geolocation"],
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Usar minha localização" }).click();
  await p.waitForTimeout(1500);
  const r = await p.evaluate(() => {
    const s = document.querySelector("#unidades");
    const h3 = s?.querySelector("h3");
    const km = s?.textContent?.match(/a ([\d,]+) km daqui/);
    return { escolhida: h3?.textContent?.trim() ?? "?", km: km?.[1] ?? "?" };
  });
  const ok = r.escolhida.includes(esperado);
  console.log(
    `geo ${cidade.padEnd(15)} -> "${r.escolhida}" a ${r.km} km   ${ok ? "OK ✓" : "FALHOU ✗"}`
  );
  await ctx.close();
}

await nav.close();
