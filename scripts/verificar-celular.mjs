/**
 * O celular, com TOQUE de verdade.
 *
 * ⛔ Buraco que existiu por rodadas inteiras: as capturas de celular usavam
 * viewport de 390px e nada mais. Sem `hasTouch`, o Chrome continua se
 * declarando `hover: hover` e `pointer: fine`, entao TODA regra escrita para
 * `(hover: none)` e todo caminho de codigo de toque nunca foram executados uma
 * unica vez. Tela pequena nao e celular. Aqui usa-se o perfil de dispositivo do
 * Playwright, que liga toque, DPR e user agent juntos.
 *
 * O que este arquivo cobre e o que a pessoa faz com o polegar: tocar uma
 * resposta, arrastar um carrossel, arrastar a linha do tempo, e nao encontrar
 * rolagem lateral na pagina.
 */
import { chromium, devices } from "playwright";

const BASE = process.env.URL ?? "http://127.0.0.1:4400/";
const REDUZIDO = process.env.REDUZIDO === "1";

/* REDUZIDO=1 passa a significar `data-movimento="reduzido"`, nao mais
   `prefers-reduced-motion`. A media query deixou de desligar movimento por
   decisao do dono (ver `movimento.tsx`); quem desliga hoje e o atributo. */
if (REDUZIDO) process.env.MOVIMENTO = "reduzido";

const nav = await chromium.launch({ channel: "chrome", args: ["--headless=new"] });

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
  const criar = nav.newContext.bind(nav);
  nav.newContext = async (opcoes) => {
    const c = await criar(opcoes);
    await c.addInitScript((modo) => {
      try {
        localStorage.setItem("serra_movimento", modo);
      } catch {}
    }, MODO);
    return c;
  };
}

const ctx = await nav.newContext({
  ...devices["Pixel 7"],
  locale: "pt-BR",
  ...(REDUZIDO ? { reducedMotion: "reduce" } : {}),
});
await ctx.addInitScript(() => {
  try {
    localStorage.setItem("serra_consentimento", "recusado");
  } catch {}
});
const p = await ctx.newPage();

const falhas = [];
const ok = (nome, cond, extra = "") => {
  console.log(`${cond ? "ok  " : "FALHA"}  ${nome}${extra ? "  " + extra : ""}`);
  if (!cond) falhas.push(nome);
};

p.on("pageerror", (e) => falhas.push(`erro de pagina: ${String(e).slice(0, 200)}`));

await p.goto(BASE, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(900);

console.log(
  `— Pixel 7, toque ligado${REDUZIDO ? ", prefers-reduced-motion: reduce" : ""} —\n`
);

/* O ambiente precisa MESMO ser um celular, senao todo o resto e teatro. */
const ambiente = await p.evaluate(() => ({
  toque: "ontouchstart" in window || navigator.maxTouchPoints > 0,
  semHover: matchMedia("(hover: none)").matches,
  grosso: matchMedia("(pointer: coarse)").matches,
  reduz: matchMedia("(prefers-reduced-motion: reduce)").matches,
}));
ok("o navegador se declara um celular de verdade", ambiente.toque && ambiente.semHover && ambiente.grosso, JSON.stringify(ambiente));

/* --------------------------------------------------- sem rolagem lateral */
const vaza = await p.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
ok("a pagina nao rola de lado", vaza <= 1, `${vaza}px de sobra`);

/* ------------------------------------------ simulador: responder no dedo */
{
  const sim = p.locator("#comparador");
  await sim.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);

  const q1 = await sim.locator("legend").innerText();
  await sim.locator("button.opcao").first().tap();
  await p.waitForTimeout(900);
  const q2 = await sim.locator("legend").innerText();
  ok("responder no toque avanca a pergunta", q1 !== q2, `"${q1}" -> "${q2}"`);

  /* A resposta precisa ter sido GUARDADA, nao so ter animado. O painel de
     resultado e a unica prova visivel disso. */
  const cabeca = await sim.locator("aside p").first().innerText();
  ok("a resposta entrou na conta", /1 de 4|respostas/i.test(cabeca), cabeca);

  await sim.getByRole("button", { name: /Voltar/i }).tap();
  await p.waitForTimeout(900);
  const q3 = await sim.locator("legend").innerText();
  ok("voltar no toque devolve a pergunta", q3 === q1, `"${q3}"`);
}

/* ------------------------------------- linha do tempo: colorir ao arrastar */
{
  const secao = p.locator("#historia");
  await secao.scrollIntoViewIfNeeded();
  await p.waitForTimeout(900);

  const trilho = secao.locator("ol.trilho");
  const antes = await secao.locator(".lt-aceso").count();

  /* Swipe de verdade, com passos intermediarios: um `dragTo` sem passos nao
     gera `touchmove` suficiente e o trilho nem se mexe. */
  const c = await trilho.boundingBox();
  const y = c.y + c.height / 2;
  await p.touchscreen.tap(c.x + c.width / 2, y);
  for (let n = 0; n < 3; n++) {
    await trilho.evaluate((el) => el.scrollBy({ left: el.clientWidth * 0.8 }));
    await p.waitForTimeout(700);
  }
  const depois = await secao.locator(".lt-aceso").count();
  /* Vale nos DOIS modos. Com `prefers-reduced-motion` o fio preenche de estalo
     em vez de se desenhar, mas a catraca continua andando: reduzir movimento e
     tirar a animacao, nunca a informacao de ate onde ja se chegou. */
  ok("a linha do tempo acende os anos ao avancar", depois > antes, `${antes} -> ${depois} anos acesos`);

  const fio = await secao
    .locator(".lt-aceso .lt-fio")
    .first()
    .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);
  ok("o fio do ano aceso esta desenhado", fio > 0.95, `scaleX=${fio.toFixed(2)}`);
}

/* ------------------------------------- trilho da linha do tempo no dedo
   Apontava para o carrossel de depoimentos, removido em 16/09/2026 por falta de
   autorizacao de uso de nome e imagem. A mecanica e a mesma. */
{
  const trilho = p.locator("#historia ol.trilho");
  await trilho.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  const antes = await trilho.evaluate((el) => el.scrollLeft);
  await trilho.evaluate((el) => el.scrollBy({ left: el.clientWidth }));
  await p.waitForTimeout(800);
  const depois = await trilho.evaluate((el) => el.scrollLeft);
  ok("o trilho da linha do tempo anda no dedo", depois > antes + 50, `${antes} -> ${depois}`);

  /* Em tela sem ponteiro o relevo 3D nao pode existir: sem cursor nao ha de
     onde tirar o angulo, e um cartao torto parado le como defeito. */
  const giro = await p
    .locator("#historia li.relevo")
    .first()
    .evaluate((el) => getComputedStyle(el).transform);
  ok("o relevo 3D fica desligado sem ponteiro", giro === "none", giro);
}

/* --------------------------------------------------- esteira de parceiros */
{
  const esteira = p.locator(".esteira").first();
  await esteira.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  const e1 = await esteira.evaluate((el) => el.scrollLeft);
  await p.waitForTimeout(1200);
  const e2 = await esteira.evaluate((el) => el.scrollLeft);
  if (REDUZIDO) {
    ok("esteira parada em movimento reduzido", Math.abs(e2 - e1) < 2, `${e1} -> ${e2}`);
  } else {
    ok("esteira anda sozinha no celular", e2 > e1, `${e1.toFixed(0)} -> ${e2.toFixed(0)}`);
  }
  const podeRolar = await esteira.evaluate(
    (el) => getComputedStyle(el).overflowX === "auto" || getComputedStyle(el).overflowX === "scroll"
  );
  ok("esteira rola no dedo", podeRolar);
}

/* ------------------------- o hover que o dedo nao da: foco por posicao */
{
  /* Sem isto, o celular recebia a pagina com holofote, aro de luz, varredura e
     elevacao todos desligados, porque os quatro dependem de `:hover`.

     ⛔ A primeira versao deste teste parava numa unica altura (35% da pagina) e
     acusava falha. O recurso estava certo: naquela altura o meio da tela cai
     numa secao de lista, que nao tem cartao nenhum. Teste de efeito ligado a
     POSICAO precisa varrer posicoes, senao mede o acaso. */
  const varredura = await p.evaluate(async () => {
    const alt = document.documentElement.scrollHeight;
    let maximo = 0;
    let sombra = null;
    for (let f = 0.08; f < 0.95; f += 0.06) {
      window.scrollTo(0, alt * f);
      await new Promise((r) => setTimeout(r, 320));
      const acesos = document.querySelectorAll('[data-emfoco="1"]');
      if (acesos.length > maximo) maximo = acesos.length;
      const cartao = document.querySelector('.cartao-cine[data-emfoco="1"]');
      if (cartao && !sombra) sombra = getComputedStyle(cartao).boxShadow;
    }
    return { maximo, sombra };
  });
  ok(
    "cartoes acendem ao passar pelo meio da tela",
    varredura.maximo > 0,
    `ate ${varredura.maximo} ao mesmo tempo`
  );
  ok(
    "o cartao em foco ganha profundidade de verdade",
    Boolean(varredura.sombra) && varredura.sombra !== "none",
    (varredura.sombra ?? "sem sombra").slice(0, 60)
  );
}

/* --------------------------------- nada escondido depois de percorrer tudo */
await p.evaluate(async () => {
  const passo = window.innerHeight * 0.7;
  for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
});
await p.waitForTimeout(1400);
const escondidos = await p.evaluate(() => {
  const blocos = [...document.querySelectorAll("[data-revela]")].filter(
    (el) => parseFloat(getComputedStyle(el).opacity) < 0.9
  );
  const titulos = [...document.querySelectorAll(".linha-mascara > span")].filter(
    (el) => parseFloat(getComputedStyle(el).opacity) < 0.9
  );
  return { blocos: blocos.length, titulos: titulos.length };
});
ok("nenhum bloco ficou invisivel no celular", escondidos.blocos === 0, `${escondidos.blocos}`);
ok("nenhum titulo ficou invisivel no celular", escondidos.titulos === 0, `${escondidos.titulos}`);

/* --------------------------------------------- a barra fixa nao tapa nada */
await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
await p.waitForTimeout(600);
const tapado = await p.evaluate(() => {
  const barra = document.querySelector(".fixed.inset-x-0.bottom-0");
  if (!barra) return "sem barra";
  const b = barra.getBoundingClientRect();
  const alvos = [...document.querySelectorAll("a, button")].filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return false;
    if (barra.contains(el)) return false;
    return r.bottom > b.top + 4 && r.top < window.innerHeight;
  });
  return alvos.length;
});
ok("a barra de ligar nao cobre nenhum link no fim da pagina", tapado === 0, `${tapado} alvos cobertos`);

/* ================================================== as rotas novas no dedo ===
   ⛔ POR QUE ISTO E UM BLOCO SEPARADO E NAO MAIS UMA CHECAGEM NA HOME. Todo o
   arquivo acima roda contra `/`. As rotas de 16/09/2026 (obituario, despedida,
   unidade, painel) nasceram depois e nunca passaram por um aparelho com toque:
   e exatamente assim que o buraco de "tela pequena nao e celular" se reabre,
   uma rota de cada vez. Aqui cada uma e aberta no Pixel 7 e cobrada pelas duas
   coisas que quebram calado no celular: rolagem lateral e bloco invisivel. */
for (const rota of [
  "/obituario",
  "/obituario/therezinha-pedrozo-galhardo",
  "/unidades/valinhos",
  "/painel",
]) {
  const ctx2 = await nav.newContext({ ...devices["Pixel 7"], locale: "pt-BR" });
  await ctx2.addInitScript(() => {
    try { localStorage.setItem("serra_consentimento", "recusado"); } catch {}
  });
  const q = await ctx2.newPage();
  await q.goto(new URL(rota, BASE).href, { waitUntil: "networkidle" });
  await q.evaluate(() => document.fonts.ready);

  /* Percorre a pagina inteira: revelacao so dispara em quem cruza a tela. */
  await q.evaluate(async () => {
    const passo = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await q.waitForTimeout(900);

  const sobra = await q.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  const sumidos = await q.evaluate(
    () => [...document.querySelectorAll("[data-revela], .linha-mascara > span")]
      .filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.9).length
  );
  ok(`${rota}: nao rola de lado`, sobra <= 0, `${sobra}px de sobra`);
  ok(`${rota}: nada invisivel`, sumidos === 0, `${sumidos} escondidos`);
  await ctx2.close();
}

/* A BUSCA DO OBITUARIO NO DEDO. No desktop ela ja e testada em
   `verificar-interacao.mjs`; aqui o que se prova e outra coisa: que o campo e o
   seletor cabem e respondem num aparelho de 390px, onde a pessoa que perdeu
   alguem realmente vai procurar. */
{
  const ctx2 = await nav.newContext({ ...devices["Pixel 7"], locale: "pt-BR" });
  await ctx2.addInitScript(() => {
    try { localStorage.setItem("serra_consentimento", "recusado"); } catch {}
  });
  const q = await ctx2.newPage();
  await q.goto(new URL("/obituario", BASE).href, { waitUntil: "networkidle" });
  await q.getByPlaceholder("Buscar pelo nome").tap();
  await q.getByPlaceholder("Buscar pelo nome").fill("quiricio");
  await q.waitForTimeout(400);
  const achou = await q.locator("#conteudo ul li article").count();
  ok("a busca do obituario responde no dedo", achou === 1, `${achou} resultado(s)`);
  await ctx2.close();
}

await nav.close();
console.log(falhas.length ? `\n${falhas.length} FALHA(S)` : "\ntudo verde no celular");
process.exit(falhas.length ? 1 : 0);
