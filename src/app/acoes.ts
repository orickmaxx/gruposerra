"use server";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { headers } from "next/headers";
import { UNIDADES } from "@/data/unidades";

/**
 * Recebimento do lead.
 *
 * ⛔ REGRA QUE NÃO SE QUEBRA: só devolve sucesso se o lead REALMENTE foi
 * guardado ou entregue. Formulário que agradece e joga fora é pior do que
 * formulário nenhum, porque a pessoa vai embora achando que pediu contato.
 *
 * Ordem de entrega:
 *   1. `LEAD_WEBHOOK_URL`, se configurada (n8n, Make, CRM, o que o cliente usar);
 *   2. arquivo `.leads/leads.jsonl` na própria máquina, como rede de segurança.
 * Se as duas falharem, devolve erro e a interface manda a pessoa para o
 * WhatsApp, que é o caminho que sempre funciona.
 */

export type EstadoLead =
  | { estado: "ocioso" }
  | { estado: "ok"; canal: "webhook" | "arquivo" }
  | { estado: "erro"; campos?: Record<string, string>; mensagem?: string };

const APENAS_DIGITOS = /\D+/g;

/* ── Limite de envios por IP ──────────────────────────────────────────────
 *
 * ⛔ O QUE ISTO RESOLVE, E O QUE NÃO RESOLVE. Uma Server Action é um endpoint
 * público: qualquer um monta um POST e chama. Sem limite, um laço de shell
 * enche o CRM do cliente com milhares de leads falsos em minutos, e quem
 * descobre é a atendente que abre a fila na segunda-feira. O honeypot pega
 * robô burro de formulário; não pega quem chama a action direto.
 *
 * Isto é um balde em MEMÓRIA DO PROCESSO, e a limitação é honesta: na Vercel
 * cada instância tem o próprio balde, então o teto real é
 * `TETO × instâncias ativas`, e um ataque distribuído de muitos IPs passa. Para
 * um site de funerária regional, isso segura o flood que acontece de verdade.
 * Limite sério é Upstash, KV ou o WAF na frente, e nenhum dos três cabe aqui
 * sem dependência nova ou conta que o cliente ainda não tem.
 *
 * A troca deliberada: preferimos deixar passar um lead legítimo repetido a
 * derrubar o formulário inteiro. Por isso a janela é curta e o teto é alto o
 * bastante para uma pessoa que errou o telefone e reenviou quatro vezes.
 */
const JANELA_MS = 10 * 60 * 1000;
const TETO = 5;
/** Trava o crescimento do Map: sem isto, o próprio limitador vira o vazamento. */
const MAX_IPS = 5000;
const balde = new Map<string, number[]>();

/**
 * ⚠️ `x-forwarded-for` É CABEÇALHO, E CABEÇALHO O CLIENTE ESCREVE.
 *
 * Atrás da Vercel isto não é problema: a plataforma SOBRESCREVE o cabeçalho com
 * o IP real da conexão, então o que chega aqui é confiável. Num servidor cru,
 * sem proxy que reescreva, qualquer um manda um IP diferente por requisição e o
 * balde vira decoração.
 *
 * Fica escrito porque a hospedagem pode mudar: se este site um dia sair da
 * Vercel para um nginx do cliente, ou o limite passa a ler o IP do socket, ou
 * ele deixa de valer, e ninguém vai lembrar disso sozinho.
 *
 * É também o que permite `verificar-novos.mjs` testar o limite por IP sem que
 * uma rodada envenene a seguinte.
 */
async function ipDeQuemChamou() {
  const h = await headers();
  /* `x-forwarded-for` é uma lista; o primeiro é o cliente. Em desenvolvimento
     nenhum proxy escreve o cabeçalho, e aí todo mundo divide o mesmo balde
     "local", que é o comportamento certo para uma máquina só. */
  const bruto = h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "";
  return bruto.split(",")[0]!.trim() || "local";
}

function excedeu(ip: string) {
  const agora = Date.now();

  if (balde.size > MAX_IPS) {
    for (const [k, v] of balde) {
      if (v.every((t) => agora - t > JANELA_MS)) balde.delete(k);
    }
    if (balde.size > MAX_IPS) balde.clear();
  }

  const recentes = (balde.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  if (recentes.length >= TETO) {
    balde.set(ip, recentes);
    return true;
  }
  recentes.push(agora);
  balde.set(ip, recentes);
  return false;
}

function validar(f: FormData) {
  const campos: Record<string, string> = {};

  const nome = String(f.get("nome") ?? "").trim();
  if (nome.length < 3) campos.nome = "Escreva seu nome completo.";

  const bruto = String(f.get("whatsapp") ?? "").replace(APENAS_DIGITOS, "");
  if (bruto.length < 10 || bruto.length > 11)
    campos.whatsapp = "Informe o WhatsApp com DDD, como (19) 99999-9999.";

  const cidade = String(f.get("cidade") ?? "").trim();
  if (!cidade) campos.cidade = "Escolha a cidade mais perto de você.";

  const assunto = String(f.get("assunto") ?? "").trim();
  if (!assunto) campos.assunto = "Diga sobre o que você quer falar.";

  return {
    campos,
    dados: {
      nome,
      whatsapp: bruto,
      cidade,
      assunto,
      mensagem: String(f.get("mensagem") ?? "").trim().slice(0, 2000),
      /* Honeypot: campo invisível que só robô preenche. */
      isca: String(f.get("site") ?? ""),
      em: new Date().toISOString(),
      origem: "site/home",
    },
  };
}

export async function enviarLead(
  _anterior: EstadoLead,
  f: FormData
): Promise<EstadoLead> {
  const { campos, dados } = validar(f);

  if (Object.keys(campos).length > 0) return { estado: "erro", campos };

  /* Robô preencheu a isca: responde ok e não guarda nada. */
  if (dados.isca) return { estado: "ok", canal: "arquivo" };

  /* ⛔ A CONTAGEM VEM DEPOIS DA VALIDAÇÃO, e isso é de propósito: quem errou o
     formato do telefone e corrigiu não pode gastar tentativa. O balde conta
     envio VÁLIDO, que é o que chega no CRM do cliente. */
  if (await ipDeQuemChamou().then(excedeu)) {
    return {
      estado: "erro",
      mensagem:
        "Você já pediu contato há pouco e a mensagem foi registrada. Se for urgente, chame no WhatsApp ou ligue: o plantão atende 24 horas.",
    };
  }

  if (!UNIDADES.some((u) => u.cidade === dados.cidade)) {
    return { estado: "erro", campos: { cidade: "Escolha uma das cidades da lista." } };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      const r = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (r.ok) return { estado: "ok", canal: "webhook" };
    } catch {
      /* cai para o arquivo */
    }
  }

  try {
    const pasta = path.join(process.cwd(), ".leads");
    await mkdir(pasta, { recursive: true });
    await appendFile(path.join(pasta, "leads.jsonl"), JSON.stringify(dados) + "\n", "utf8");
    return { estado: "ok", canal: "arquivo" };
  } catch {
    return {
      estado: "erro",
      mensagem:
        "Não consegui registrar seu contato agora. Chame no WhatsApp que a gente responde do mesmo jeito.",
    };
  }
}
