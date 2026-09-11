/**
 * Fluidez, medida em vez de opinada.
 *
 * "Está travando" é sintoma, não diagnóstico. Este arquivo devolve números:
 * quantos quadros o navegador perdeu enquanto a página rolava, quanto tempo a
 * thread principal ficou bloqueada, e quantas camadas caras existem na página.
 *
 * O método: rola a página inteira em passos constantes contando `rAF`. Se o
 * navegador entregasse 60fps, o número de quadros seria o tempo dividido por
 * 16,7ms. O que falta disso é o que a pessoa sente como travamento.
 *
 * `--cpu N` desacelera a CPU por N vezes, que é como se mede celular de
 * verdade num PC. 4x é o preset de "celular mediano" do Lighthouse.
 */
import { chromium, devices } from "playwright";

const BASE = process.env.URL ?? "http://127.0.0.1:4400/";
const ROTA = process.env.ROTA ?? "/";
const CELULAR = process.env.CELULAR === "1";
const FREIO = Number(process.env.CPU ?? (CELULAR ? 4 : 1));

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

await p.goto(BASE.replace(/\/$/, "") + ROTA, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1200);

/* ------------------------------------------------ o que custa caro na pagina */
const inventario = await p.evaluate(() => {
  const todos = [...document.querySelectorAll("*")];
  const conta = (fn) => todos.filter(fn).length;
  const c = (el) => getComputedStyle(el);
  return {
    elementos: todos.length,
    willChange: conta((el) => c(el).willChange !== "auto"),
    backdrop: conta((el) => {
      const v = c(el);
      return (v.backdropFilter || v.webkitBackdropFilter || "none") !== "none";
    }),
    blend: conta((el) => c(el).mixBlendMode !== "normal"),
    filtros: conta((el) => c(el).filter !== "none"),
    animando: conta((el) => c(el).animationName !== "none"),
    sombras: conta((el) => c(el).boxShadow !== "none"),
  };
});

/* --------------------------------------------- quadros perdidos ao rolar

   Mede DUAS vezes de proposito, e as duas importam por motivos diferentes:

   FRIA   a primeira descida da pagina, com as imagens ainda decodificando e o
          JavaScript assentando. E o que a pessoa sente ao chegar, e portanto o
          que ela julga.
   QUENTE a segunda descida, com tudo em cache. E o custo REAL dos efeitos, sem
          o carregamento por cima, e e o unico numero que responde "o desenho
          esta pesado?".

   Confundir as duas leva a conserto errado: fria ruim com quente boa e problema
   de CARGA (imagem, fonte, JS); as duas ruins e problema de PINTURA (camada,
   blur, sombra).
   ------------------------------------------------------------------------- */
async function descer() {
  return p.evaluate(async () => {
    const alt = document.documentElement.scrollHeight - window.innerHeight;
    let quadros = 0;
    let travadas = 0;
    let anterior = performance.now();
    let rodando = true;
    const contar = () => {
      const agora = performance.now();
      if (agora - anterior > 50) travadas++;
      anterior = agora;
      quadros++;
      if (rodando) requestAnimationFrame(contar);
    };
    requestAnimationFrame(contar);
    const inicio = performance.now();
    const PASSOS = 90;
    for (let i = 0; i <= PASSOS; i++) {
      window.scrollTo(0, (alt * i) / PASSOS);
      await new Promise((r) => setTimeout(r, 24));
    }
    const duracao = performance.now() - inicio;
    rodando = false;
    return {
      duracao: Math.round(duracao),
      quadros,
      fps: +(quadros / (duracao / 1000)).toFixed(1),
      quadrosEsperados: Math.round(duracao / 16.7),
      travadas,
    };
  });
}

const fria = await descer();
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(1200);
const fluidez = await descer();

const perdidos = Math.max(0, fluidez.quadrosEsperados - fluidez.quadros);
const perda = ((perdidos / fluidez.quadrosEsperados) * 100).toFixed(0);

console.log(`\n— ${CELULAR ? "Pixel 7" : "desktop 1440"}, CPU ${FREIO}x, rota ${ROTA} —\n`);
console.log("camadas e custo por pintura");
for (const [k, v] of Object.entries(inventario)) console.log(`  ${k.padEnd(14)} ${v}`);
console.log("\nfluidez na rolagem");
console.log(
  `  1a descida     ${String(fria.fps).padStart(5)} fps   ${fria.travadas} engasgos   <- carga: imagem, fonte, JS`
);
console.log(
  `  2a descida     ${String(fluidez.fps).padStart(5)} fps   ${fluidez.travadas} engasgos   <- custo real dos efeitos`
);
console.log(`  perdidos na 2a ${perdidos} de ${fluidez.quadrosEsperados} (${perda}%)`);

const veredito = fluidez.fps >= 50 ? "FLUIDO" : fluidez.fps >= 35 ? "ACEITAVEL" : "TRAVANDO";
console.log(`\n  ${veredito}\n`);

await nav.close();
