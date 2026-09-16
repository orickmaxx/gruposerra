/**
 * Prova as interacoes NOVAS, em vez de eu afirmar que funcionam.
 *
 * 1. Busca do obituario: acha com acento errado, filtra por unidade, e quando
 *    nao acha NADA oferece o telefone do plantao em vez de uma tela vazia.
 * 2. Geolocalizacao: com a posicao FINGIDA em Sumare, a unidade escolhida tem
 *    que virar Sumare. Se escolher Campinas, a conta de distancia esta errada.
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


/* ------------------------------------------------------- busca do obituario */
/* ⛔ ESTE BLOCO TESTAVA O CARROSSEL DE DEPOIMENTOS, que saiu em 16/09/2026 por
   falta de autorizacao de uso de nome e imagem. O teste ficou quebrado e
   estourava em timeout de 30s procurando uma seta que nao existe mais.

   No lugar entrou a interacao nova que ninguem estava provando, e que e a peca
   central da demonstracao: a busca do obituario. Ela e client-side, sem
   endpoint, e tem tres jeitos conhecidos de falhar calada:
     1. nao normalizar acento, e "terezinha" nao achar "Therezinha";
     2. o filtro de unidade e a busca se atrapalharem;
     3. a tela de "nao encontrei" nao oferecer saida nenhuma, que numa pagina de
        velorio e a falha mais grave das tres. */
for (const [nome, w, h] of [
  ["desktop", 1440, 900],
  ["tablet ", 820, 1000],
  ["celular", 390, 844],
]) {
  const ctx = await nav.newContext({
    viewport: { width: w, height: h },
    isMobile: w < 500,
    hasTouch: w < 500,
    locale: "pt-BR",
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "/obituario", { waitUntil: "networkidle" });
  await p.waitForTimeout(400);

  const cartoes = () => p.locator("#conteudo ul li article").count();

  const todos = await cartoes();
  console.log(`${nome} lista completa ${todos} despedidas   ${todos === 8 ? "OK ✓" : "ESPERADO 8 ✗"}`);

  /* Acento: quem digita "quiricio" tem que achar "Quirício". Ninguem escreve o
     nome de quem morreu com a grafia certa no pior dia da vida.
     ⚠️ O alvo tem que ser diferenca de ACENTO, nao de letra: a primeira versao
     deste teste procurava "terezinha" esperando achar "Therezinha", e falhava
     com razao. O "h" de Th e letra, nao acento, e normalizar acento nao e nem
     deve virar busca aproximada. */
  const busca = p.getByPlaceholder("Buscar pelo nome");
  await busca.fill("quiricio");
  await p.waitForTimeout(350);
  const semAcento = await cartoes();
  console.log(`${nome} busca sem acento ${semAcento}   ${semAcento === 1 ? "OK ✓" : "FALHOU ✗"}`);

  /* Sem resultado: a tela NAO pode terminar em "nada encontrado". Precisa de
     telefone, que e a resposta que serve para quem esta procurando um velorio. */
  await busca.fill("zzzzzz");
  await p.waitForTimeout(350);
  const vazio = await cartoes();
  const temTelefone = await p
    .getByRole("link", { name: /Plantão|Ligar para/ })
    .isVisible()
    .catch(() => false);
  console.log(
    `${nome} sem resultado ${vazio} cartoes, oferece telefone=${temTelefone}   ${
      vazio === 0 && temTelefone ? "OK ✓" : "FALHOU ✗"
    }`
  );

  /* Filtro por unidade, com a busca limpa. */
  await busca.fill("");
  await p.waitForTimeout(250);
  await p.getByLabel("Filtrar por unidade").selectOption("valinhos");
  await p.waitForTimeout(350);
  const deValinhos = await cartoes();
  console.log(`${nome} filtro por unidade ${deValinhos}   ${deValinhos === 1 ? "OK ✓" : "FALHOU ✗"}`);

  /* O cartao leva para a pagina da despedida: sem isso a listagem e decoracao. */
  await p.locator("#conteudo ul li article a").first().click();
  await p.waitForTimeout(900);
  const naDespedida = /\/obituario\/[a-z-]+$/.test(new URL(p.url()).pathname);
  console.log(`${nome} cartao abre a despedida   ${naDespedida ? "OK ✓" : "FALHOU ✗"}`);

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
