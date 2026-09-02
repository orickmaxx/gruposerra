/**
 * Prova os recursos novos, em vez de eu afirmar que funcionam.
 * Cookies com Consent Mode v2, formulário de lead, voltar ao topo e 404.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:4360";
const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });
const ok = (b) => (b ? "OK ✓" : "FALHOU ✗");

/* --------------------------------------------------- consentimento (LGPD) */
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, locale: "pt-BR" });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.waitForTimeout(700);

  // o padrao NEGADO precisa ter entrado no dataLayer antes de qualquer tag
  const padrao = await p.evaluate(() => {
    const dl = window.dataLayer || [];
    const c = [...dl].find((a) => a && a[0] === "consent" && a[1] === "default");
    return c ? c[2] : null;
  });
  console.log(
    `consent default   analytics=${padrao?.analytics_storage} ads=${padrao?.ad_storage}   ${ok(
      padrao?.analytics_storage === "denied" && padrao?.ad_storage === "denied"
    )}`
  );

  const banner = await p.getByRole("dialog").isVisible().catch(() => false);
  console.log(`banner aparece    ${ok(banner)}`);

  const temRecusar = await p.getByRole("button", { name: "Recusar", exact: true }).isVisible().catch(() => false);
  console.log(`botao RECUSAR     ${ok(temRecusar)}  (o site atual do cliente so tem "Aceitar")`);

  await p.getByRole("button", { name: "Recusar", exact: true }).click();
  await p.waitForTimeout(500);
  const guardado = await p.evaluate(() => localStorage.getItem("serra_consentimento"));
  const sumiu = !(await p.getByRole("dialog").isVisible().catch(() => false));
  console.log(`recusa gravada    "${guardado}" e banner fechou   ${ok(guardado === "recusado" && sumiu)}`);

  // recarrega: nao pode reaparecer
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(600);
  const voltou = await p.getByRole("dialog").isVisible().catch(() => false);
  console.log(`nao insiste       ${ok(!voltou)}`);

  // reabrir pelo rodape
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(400);
  await p.getByRole("button", { name: /Rever minha escolha/i }).click();
  await p.waitForTimeout(400);
  const reabriu = await p.getByRole("dialog").isVisible().catch(() => false);
  console.log(`reabre no rodape  ${ok(reabriu)}`);

  await p.getByRole("button", { name: "Aceitar", exact: true }).click();
  await p.waitForTimeout(500);
  const update = await p.evaluate(() => {
    const dl = window.dataLayer || [];
    const c = [...dl].reverse().find((a) => a && a[0] === "consent" && a[1] === "update");
    return c ? c[2] : null;
  });
  console.log(
    `aceite atualiza   analytics=${update?.analytics_storage}   ${ok(update?.analytics_storage === "granted")}`
  );
  await ctx.close();
}

/* ------------------------------------------------------------- formulario */
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 1000 }, locale: "pt-BR" });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelector("#contato")?.scrollIntoView());
  await p.waitForTimeout(500);

  // mascara de telefone
  await p.getByLabel("WhatsApp com DDD").fill("");
  await p.getByLabel("WhatsApp com DDD").type("19992406881", { delay: 12 });
  const mascarado = await p.getByLabel("WhatsApp com DDD").inputValue();
  console.log(`mascara telefone  "${mascarado}"   ${ok(mascarado === "(19) 99240-6881")}`);

  // envio vazio: precisa mostrar erro em portugues, nao passar
  await p.getByLabel("WhatsApp com DDD").fill("");
  await p.getByRole("button", { name: "Pedir contato" }).click();
  await p.waitForTimeout(1200);
  const erros = await p.locator("p.text-red-700").allTextContents();
  console.log(`valida vazio      ${erros.length} erros   ${ok(erros.length >= 3)}`);
  console.log(`  exemplo: "${erros[0] ?? "-"}"`);

  // envio valido
  await p.getByLabel("Seu nome completo").fill("Maria de Teste");
  await p.getByLabel("WhatsApp com DDD").type("19992406881", { delay: 8 });
  await p.getByLabel("Cidade mais perto de você").selectOption("Sumaré");
  await p.getByLabel("Sobre o que você quer falar").selectOption("Contratar um plano");
  await p.getByRole("button", { name: "Pedir contato" }).click();
  await p.waitForTimeout(2500);
  const agradeceu = await p.getByText("Recebemos o seu contato").isVisible().catch(() => false);
  console.log(`envio valido      ${ok(agradeceu)}`);
  await ctx.close();
}

/* --------------------------------------------------- voltar ao topo e 404 */
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, locale: "pt-BR" });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const antes = await p.getByLabel("Voltar ao topo da página").isVisible().catch(() => false);
  await p.evaluate(() => window.scrollTo(0, 4000));
  await p.waitForTimeout(500);
  const depois = await p.getByLabel("Voltar ao topo da página").isVisible().catch(() => false);
  console.log(`voltar ao topo    escondido no topo=${!antes} aparece ao rolar=${depois}   ${ok(!antes && depois)}`);

  const r = await p.goto(BASE + "/pagina-que-nao-existe");
  await p.waitForTimeout(400);
  const tem404 = await p.getByText("Esta página não existe mais").isVisible().catch(() => false);
  console.log(`404 desenhada     status=${r.status()}   ${ok(r.status() === 404 && tem404)}`);
  await ctx.close();
}

/* ------------------------------------------------------ rotas novas no ar */
{
  const ctx = await nav.newContext({ locale: "pt-BR" });
  const p = await ctx.newPage();
  for (const rota of [
    "/blog",
    "/blog/as-fases-do-luto",
    "/planos",
    "/planos/serra-perola",
    "/termos",
    "/privacidade",
  ]) {
    const r = await p.goto(BASE + rota, { waitUntil: "domcontentloaded" });
    const t = await p.title();
    console.log(`${rota.padEnd(34)} ${r.status()}  ${t.slice(0, 46)}`);
  }
  await ctx.close();
}

await nav.close();
