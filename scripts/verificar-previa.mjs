/**
 * Prova que o link deste site chega INTEIRO no WhatsApp.
 *
 * ⛔ POR QUE ESTE ARQUIVO EXISTE. Em 16/09/2026 o link de um obituário chegou
 * seco numa conversa: sem título, sem imagem, sem descrição — exatamente o
 * defeito do site antigo do cliente que este projeto existe para consertar, e o
 * argumento central da venda. Eram três causas somadas, nenhuma delas visível
 * em captura de tela, nenhuma com erro no console:
 *
 *   1. `robots.txt` com `Disallow: /` valendo para `User-Agent: *`, o que
 *      incluía `facebookexternalhit` e `WhatsApp`, que não indexam nada;
 *   2. `metadataBase` apontando para o domínio do CLIENTE, então `og:url` e
 *      `og:image` levavam o crawler para o site antigo, que não tem tag og
 *      nenhuma. A imagem dava 404;
 *   3. `openGraph` declarado em cada página SUBSTITUÍA o do layout inteiro
 *      (merge raso do Next), e as rotas internas saíam sem `og:image`.
 *
 * As três eram invisíveis até alguém mandar o link para si mesmo. Este script é
 * o que troca "mandar para si mesmo e torcer" por uma verificação.
 *
 * Uso, com o site servindo:
 *   node scripts/verificar-previa.mjs
 *   BASE=https://gruposerra.vercel.app node scripts/verificar-previa.mjs
 *
 * `SO=/obituario` limita a uma rota, para depurar rápido.
 */
import { chromium } from "playwright";

const BASE = (process.env.BASE ?? "http://127.0.0.1:4400").replace(/\/+$/, "");
const SO = process.env.SO ?? "";

/* O agente que a Meta usa para montar prévia, e que serve também o WhatsApp.
   Buscar com o agente REAL importa: um site pode responder diferente para ele. */
const UA_PREVIA =
  "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

const falhas = [];
const ok = (nome, cond, extra = "") => {
  if (!cond) falhas.push(`${nome}${extra ? "  " + extra : ""}`);
  return cond;
};

const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });
const ctx = await nav.newContext({
  userAgent: UA_PREVIA,
  extraHTTPHeaders: { "user-agent": UA_PREVIA },
});
const p = await ctx.newPage();

/* ── de onde sai a lista de rotas ────────────────────────────────────────────
   Do próprio sitemap, mais as que ficam FORA dele de propósito: os obituários
   de demonstração e o painel. Assim a cobertura acompanha o site sozinha —
   rota nova no sitemap já entra aqui no próximo commit, sem ninguém lembrar. */
async function rotas() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const doSitemap = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, "")
  );

  const html = await (await fetch(`${BASE}/obituario`, { headers: { "user-agent": UA_PREVIA } })).text();
  const obituarios = [
    ...new Set([...html.matchAll(/href="(\/obituario\/[a-z0-9-]+)"/g)].map((m) => m[1])),
  ];

  const todas = [...new Set([...doSitemap.map((r) => r || "/"), ...obituarios, "/painel"])];
  return SO ? todas.filter((r) => r.startsWith(SO)) : todas;
}

const LISTA = await rotas();
/* ⛔ A ORIGEM ESPERADA VEM DE `NEXT_PUBLIC_SITE_URL`, NAO DE `BASE`.
   `BASE` e so de ONDE o teste busca: pode ser 127.0.0.1:4400 num build que ja
   embutiu o dominio de producao. O que se cobra da tag e o dominio CANONICO,
   que e o mesmo que `lib/site.ts` usa. Comparar contra `BASE` acusaria falha
   em toda rodada local, e teste que sempre reprova deixa de ser sinal. */
const ORIGEM_ESPERADA = new URL(
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://gruposerra.vercel.app").replace(/\/+$/, "")
).origin;

console.log(`— prévia de link, agente ${UA_PREVIA.split(" ")[0]} —`);
console.log(`  base: ${BASE}`);
console.log(`  ${LISTA.length} rotas\n`);

/* Cache de imagens já baixadas: a imagem padrão serve dezenas de rotas, e não
   faz sentido baixar o mesmo PNG trinta vezes. */
const imagens = new Map();

async function medirImagem(url) {
  if (imagens.has(url)) return imagens.get(url);
  const t0 = Date.now();
  let r;
  try {
    r = await fetch(url, { headers: { "user-agent": UA_PREVIA } });
  } catch (e) {
    const falha = { erro: String(e) };
    imagens.set(url, falha);
    return falha;
  }
  const buf = Buffer.from(await r.arrayBuffer());
  const info = {
    status: r.status,
    tipo: r.headers.get("content-type") ?? "",
    bytes: buf.length,
    ms: Date.now() - t0,
    /* Dimensões lidas do cabeçalho do PNG: bytes 16..24 do chunk IHDR. Sem
       biblioteca, e é o suficiente para conferir 1200x630. */
    largura: buf.length > 24 ? buf.readUInt32BE(16) : 0,
    altura: buf.length > 24 ? buf.readUInt32BE(20) : 0,
  };
  imagens.set(url, info);
  return info;
}

const OBRIGATORIAS = [
  "og:type",
  "og:site_name",
  "og:locale",
  "og:title",
  "og:description",
  "og:url",
  "og:image",
  "og:image:width",
  "og:image:height",
  "og:image:type",
  "og:image:alt",
];

for (const rota of LISTA) {
  const url = `${BASE}${rota === "/" ? "/" : rota}`;
  const resp = await p.goto(url, { waitUntil: "domcontentloaded" });
  const status = resp?.status() ?? 0;

  if (!ok(`${rota}: responde 200 ao crawler`, status === 200, `HTTP ${status}`)) {
    console.log(`FALHA ${rota}  HTTP ${status}`);
    continue;
  }

  const tags = await p.evaluate(() => {
    const m = {};
    for (const el of document.querySelectorAll("meta[property], meta[name]")) {
      const k = el.getAttribute("property") ?? el.getAttribute("name");
      if (k && (k.startsWith("og:") || k.startsWith("twitter:"))) {
        m[k] = el.getAttribute("content") ?? "";
      }
    }
    m["<title>"] = document.title;
    return m;
  });

  const faltando = OBRIGATORIAS.filter((t) => !tags[t]);
  ok(`${rota}: tem as ${OBRIGATORIAS.length} tags og obrigatórias`, faltando.length === 0, `faltam: ${faltando.join(", ")}`);

  /* ⛔ A CHECAGEM QUE PEGA O DEFEITO DE 16/09: domínio. Uma tag que aponta para
     outro host é pior que tag ausente, porque parece certa na leitura. */
  for (const campo of ["og:url", "og:image", "twitter:image"]) {
    const v = tags[campo];
    if (!v) continue;
    const absoluta = /^https?:\/\//.test(v);
    ok(`${rota}: ${campo} é absoluta`, absoluta, v);
    if (absoluta) {
      ok(
        `${rota}: ${campo} no domínio publicado`,
        new URL(v).origin === ORIGEM_ESPERADA,
        `${new URL(v).origin} (esperado ${ORIGEM_ESPERADA})`
      );
    }
  }

  /* ⛔ O TEXTO PRÓPRIO. As internas herdavam o twitter:title da home, então
     compartilhar /unidades/valinhos anunciava "8 unidades na região". */
  ok(`${rota}: twitter:card = summary_large_image`, tags["twitter:card"] === "summary_large_image", tags["twitter:card"] ?? "ausente");
  ok(`${rota}: twitter:title próprio`, Boolean(tags["twitter:title"]) && tags["twitter:title"] === tags["og:title"], `${tags["twitter:title"] ?? "ausente"}`);
  ok(`${rota}: twitter:description próprio`, Boolean(tags["twitter:description"]) && tags["twitter:description"] === tags["og:description"]);

  /* A imagem tem que EXISTIR e caber nos limites do WhatsApp. */
  let resumoImg = "";
  if (tags["og:image"]) {
    const img = await medirImagem(tags["og:image"]);
    if (img.erro) {
      ok(`${rota}: og:image responde`, false, img.erro);
    } else {
      ok(`${rota}: og:image responde 200`, img.status === 200, `HTTP ${img.status}`);
      ok(`${rota}: og:image é PNG ou JPEG`, /image\/(png|jpeg)/.test(img.tipo), img.tipo);
      /* Acima de 600 KB o WhatsApp descarta a imagem e mostra só texto. */
      ok(`${rota}: og:image abaixo de 600 KB`, img.bytes < 600 * 1024, `${(img.bytes / 1024).toFixed(1)} KB`);
      ok(`${rota}: og:image é 1200x630`, img.largura === 1200 && img.altura === 630, `${img.largura}x${img.altura}`);
      /* Crawler de rede social desiste em poucos segundos. */
      ok(`${rota}: og:image responde em menos de 3s`, img.ms < 3000, `${img.ms}ms`);
      resumoImg = `${(img.bytes / 1024).toFixed(0)}KB ${img.largura}x${img.altura} ${img.ms}ms`;
    }
  }

  console.log(
    `ok    ${rota.padEnd(42)} ${String(Object.keys(tags).filter((k) => k.startsWith("og:")).length).padStart(2)} og  ${resumoImg}`
  );
}

await nav.close();

if (falhas.length) {
  console.log(`\n${falhas.length} FALHA(S):`);
  for (const f of falhas) console.log(`  ✗ ${f}`);
  process.exit(1);
}
console.log("\ntoda rota chega inteira na prévia de link");
