/**
 * Prova os recursos novos, em vez de eu afirmar que funcionam.
 * Cookies com Consent Mode v2, formulário de lead, voltar ao topo e 404.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://127.0.0.1:4400";
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
  /* O rotulo no rodape mudou de "Rever minha escolha de cookies" para
     "Preferencias de cookies" numa rodada anterior e este teste ficou para
     tras, falhando por 30s de timeout. Teste quebrado no repositorio e pior
     que teste nenhum: ensina a ignorar o vermelho. */
  await p.getByRole("button", { name: /Prefer[eê]ncias de cookies/i }).click();
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

/* -------------------------------------------- consentimento em duas abas */
{
  /* ⛔ Este teste precisa de um contexto NOVO. A primeira tentativa foi
     pendurada no bloco de LGPD acima, que a essa altura ja tinha gravado
     "recusado": a segunda aba abria sem banner com toda razao, e o teste
     acusava falha de uma coisa que estava certa. Teste que depende do estado
     deixado por outro teste mede o outro teste. */
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 }, locale: "pt-BR" });
  const a = await ctx.newPage();
  const b = await ctx.newPage();
  await a.goto(BASE + "/", { waitUntil: "networkidle" });
  await b.goto(BASE + "/", { waitUntil: "networkidle" });
  /* ⛔ ESPERA A CONDICAO, NAO UM TEMPO. Aqui havia `waitForTimeout(700)` e o
     teste falhava de forma intermitente: o banner so aparece depois da
     hidratacao, e 700ms deixaram de bastar quando a maquina ja tinha rodado as
     outras cinco baterias. Palpite de tempo num teste de interface e uma falha
     intermitente esperando a hora, e intermitente e pior que vermelho fixo. */
  const bannerB = b.getByRole("dialog");
  const abertoNaB = await bannerB
    .waitFor({ state: "visible", timeout: 8000 })
    .then(() => true)
    .catch(() => false);

  await a.bringToFront();
  await a.getByRole("button", { name: "Aceitar", exact: true }).click();
  /* O fechamento na OUTRA aba depende do evento `storage`, que so chega depois
     do clique. Esperar o sumico e o que se quer provar. */
  const aindaNaB = await bannerB
    .waitFor({ state: "hidden", timeout: 8000 })
    .then(() => false)
    .catch(() => true);

  console.log(
    `duas abas         banner na 2a=${abertoNaB}, fechou sozinho=${!aindaNaB}   ${ok(
      abertoNaB && !aindaNaB
    )}  (a versao antiga lia o localStorage uma vez so, no efeito de montagem)`
  );
  await ctx.close();
}

/* ------------------------------------------------------------- formulario */
/* ⛔ CADA BLOCO QUE ENVIA O FORMULARIO USA UM IP PROPRIO, e isto nao e enfeite.
   `app/acoes.ts` limita envios por IP numa janela de 10 minutos. Sem IP proprio,
   rodar este arquivo duas vezes seguidas fazia o "envio valido" FALHAR na
   segunda: o teto ja tinha sido gasto pela rodada anterior, no mesmo IP, dentro
   da mesma janela. O teste media a rodada anterior, nao o site. E a armadilha
   que o CLAUDE.md 1.1 descreve, e ela reapareceu no dia em que o rate limit
   entrou.

   De quebra, IPs distintos provam uma coisa que interessa: o balde e POR IP, e
   nao um teto global que derrubaria o formulario para o site inteiro. */
/* ⛔ IP UNICO POR CHAMADA, E NAO SORTEADO. A primeira versao sorteava dentro de
   198.51.100.0/24, uma faixa de ~200 enderecos. Em rodadas seguidas dentro da
   janela de 10 minutos do balde, o "outro IP" caia num endereco que a rodada
   ANTERIOR ja tinha esgotado, e a checagem falhava intermitentemente: 1 em cada
   2 ou 3 execucoes. Falha intermitente e pior que vermelho fixo, porque ensina
   a ignorar o relatorio.

   Agora o endereco vem de um contador sobre 198.18.0.0/15, a faixa de teste de
   benchmarking da RFC 2544: sao 131 mil enderecos, e a semente em segundos
   garante que duas execucoes seguidas nunca dividam o mesmo. */
let contadorIp = 0;
const sementeIp = Math.floor(Date.now() / 1000);
const ipFalso = () => {
  contadorIp += 1;
  const n = (sementeIp * 8 + contadorIp) % 65536;
  return `198.18.${Math.floor(n / 256)}.${n % 256}`;
};

{
  const ctx = await nav.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "pt-BR",
    extraHTTPHeaders: { "x-forwarded-for": ipFalso() },
  });
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

/* --------------------------------------------- teto de envios por IP
   Uma Server Action e um endpoint publico: sem teto, um laco de shell enche o
   CRM do cliente com milhares de leads falsos. O honeypot pega robo de
   formulario; nao pega quem chama a action direto.

   O teste preenche e envia ate o site recusar. `TETO` em `app/acoes.ts` e 5 por
   10 minutos, e o bloco anterior ja gastou 1 neste mesmo IP, entao a recusa
   precisa chegar dentro das tentativas abaixo. A verificacao nao e so "parou":
   e que a tela de recusa OFERECE SAIDA, porque erro sem saida e pior que erro. */
{
  const ctx = await nav.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "pt-BR",
    extraHTTPHeaders: { "x-forwarded-for": ipFalso() },
  });
  const p = await ctx.newPage();
  let recusou = false;
  let gastos = 0;

  for (let i = 0; i < 8 && !recusou; i++) {
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    await p.evaluate(() => document.querySelector("#contato")?.scrollIntoView());
    await p.waitForTimeout(250);
    await p.getByLabel("Seu nome completo").fill(`Teste Limite ${i}`);
    await p.getByLabel("WhatsApp com DDD").type("19992406881", { delay: 4 });
    await p.getByLabel("Cidade mais perto de você").selectOption("Sumaré");
    await p.getByLabel("Sobre o que você quer falar").selectOption("Contratar um plano");
    await p.getByRole("button", { name: "Pedir contato" }).click();
    await p.waitForTimeout(1500);
    gastos++;
    recusou = await p
      .getByText("Você já pediu contato há pouco")
      .isVisible()
      .catch(() => false);
  }

  console.log(`teto por IP       recusou na ${gastos}a tentativa   ${ok(recusou && gastos <= 6)}`);

  const temZap = recusou
    ? await p.getByRole("link", { name: "Falar no WhatsApp" }).last().isVisible().catch(() => false)
    : false;
  console.log(`recusa da saida   WhatsApp no bloco de erro   ${ok(temZap)}`);
  await ctx.close();

  /* O teto e por IP: outro IP tem que passar na primeira, mesmo com o anterior
     ja bloqueado. Sem esta checagem, um limitador GLOBAL passaria no teste
     acima e derrubaria o formulario para o site inteiro no primeiro flood. */
  const ctx2 = await nav.newContext({
    viewport: { width: 1440, height: 1000 },
    locale: "pt-BR",
    extraHTTPHeaders: { "x-forwarded-for": ipFalso() },
  });
  const q = await ctx2.newPage();
  await q.goto(BASE + "/", { waitUntil: "networkidle" });
  await q.evaluate(() => document.querySelector("#contato")?.scrollIntoView());
  await q.waitForTimeout(250);
  await q.getByLabel("Seu nome completo").fill("Outro IP");
  await q.getByLabel("WhatsApp com DDD").type("19992406881", { delay: 4 });
  await q.getByLabel("Cidade mais perto de você").selectOption("Sumaré");
  await q.getByLabel("Sobre o que você quer falar").selectOption("Contratar um plano");
  await q.getByRole("button", { name: "Pedir contato" }).click();
  await q.waitForTimeout(1800);
  const outroPassou = await q
    .getByText("Recebemos o seu contato")
    .isVisible()
    .catch(() => false);
  console.log(`teto e por IP     outro IP nao foi bloqueado junto   ${ok(outroPassou)}`);
  await ctx2.close();
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
