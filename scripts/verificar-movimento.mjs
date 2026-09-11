/**
 * Prova que os efeitos EXISTEM, em vez de eu afirmar que existem.
 *
 * 1. Esteira: mede o transform do trilho em dois instantes. Se nao mudar, a
 *    animacao nao esta rodando, por mais bonito que o CSS pareca.
 * 2. Pausa no hover: passa o ponteiro e confere que o transform congela.
 * 3. Revelacao: confere que os blocos abaixo da dobra comecam escondidos e
 *    ficam visiveis depois de rolar ate eles.
 * 4. Sem JS: confere que NADA fica invisivel (o conteudo nao pode depender do
 *    observador para existir).
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:4400";
const navegador = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });

/* ⛔ TODO CONTEXTO DESTE ARQUIVO NASCE COM O MODO DE MOVIMENTO DECLARADO.
   O juiz de desempenho em `movimento.tsx` mede os quadros reais e rebaixa para
   "reduzido" quando o aparelho nao da conta. O Chrome headless daqui roda em
   SOFTWARE e reprova nessa medicao: sem esta declaracao, metade da camada
   cinema era desligada no meio da bateria e os testes acusavam falhas que nao
   existem no navegador de ninguem. Escolha explicita vence o juiz.

   O `newContext` e embrulhado em vez de cada chamada receber a linha porque
   alguns destes arquivos abrem cinco ou seis contextos, e um esquecido volta a
   produzir a falha intermitente que custou esta rodada. */
{
  const MODO = process.env.MOVIMENTO ?? "completo";
  const criar = navegador.newContext.bind(navegador);
  navegador.newContext = async (opcoes) => {
    const c = await criar(opcoes);
    await c.addInitScript((modo) => {
      try {
        localStorage.setItem("serra_movimento", modo);
      } catch {}
    }, MODO);
    return c;
  };
}


function tx(el) {
  const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
  return Math.round(m.m41);
}

/* ---------------------------------------------------- com JS e com movimento */
{
  const ctx = await navegador.newContext({
    viewport: { width: 1440, height: 900 },
    locale: "pt-BR",
    reducedMotion: "no-preference",
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);

  /* A esteira de CSS virou carrossel de verdade; ele e testado em
     verificar-interacao.mjs, que mede seta, marcador, pausa e arrasto. */

  // revelacao
  const antes = await p.evaluate(() => {
    const alvos = [...document.querySelectorAll("[data-revela]")];
    return {
      total: alvos.length,
      jsLigado: document.documentElement.classList.contains("js-revela"),
      visiveis: alvos.filter((e) => e.dataset.visivel === "1").length,
    };
  });
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await p.waitForTimeout(1800);
  const depois = await p.evaluate(
    () =>
      [...document.querySelectorAll("[data-revela]")].filter(
        (e) => e.dataset.visivel === "1"
      ).length
  );
  console.log(
    `revelacao      classe js-revela=${antes.jsLigado}  blocos=${antes.total}  visiveis no topo=${antes.visiveis}  apos rolar=${depois}  ->  ${
      antes.jsLigado && depois > antes.visiveis ? "REVELANDO ✓" : "SEM EFEITO ✗"
    }`
  );

  // nenhum texto pode ficar com opacidade 0 depois de tudo assentado
  const invisiveis = await p.evaluate(
    () =>
      [...document.querySelectorAll("[data-revela]")].filter(
        (e) => parseFloat(getComputedStyle(e).opacity) < 0.9
      ).length
  );
  console.log(`nada invisivel blocos com opacidade < 0.9 ao fim: ${invisiveis}  ->  ${invisiveis === 0 ? "OK ✓" : "PROBLEMA ✗"}`);

  await ctx.close();
}

/* ------------------------------------------------------------------- sem JS */
{
  const ctx = await navegador.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
    locale: "pt-BR",
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(800);
  const r = await p.evaluate(() => 0).catch(() => null);
  const escondidos = await p
    .$$eval("[data-revela]", (els) =>
      els.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.9).length
    )
    .catch(() => "?");
  const texto = await p.$$eval("h1", (els) => els[0]?.textContent?.trim() ?? "");
  console.log(
    `sem JS         blocos escondidos=${escondidos}  h1="${texto.slice(0, 34)}"  ->  ${
      escondidos === 0 && texto ? "PAGINA INTEIRA LEGIVEL ✓" : "CONTEUDO SUMIU ✗"
    }`
  );
  void r;
  await ctx.close();
}

/* -------------------------------------------- com preferencia por menos movimento */
{
  const ctx = await navegador.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    locale: "pt-BR",
    reducedMotion: "reduce",
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/", { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const t = document.querySelector(".trilho");
    if (!t) return null;
    return {
      rolavel: getComputedStyle(t).overflowX,
      largura: Math.round(t.scrollWidth),
      janela: Math.round(t.clientWidth),
    };
  });
  console.log(
    `reduced-motion overflow-x=${r?.rolavel}  trilho=${r?.largura}px em janela de ${r?.janela}px  ->  ${
      r?.rolavel === "auto" ? "ROLA NA MAO ✓" : "CARTOES PRESOS ✗"
    }`
  );
  await ctx.close();
}

void tx;
await navegador.close();
