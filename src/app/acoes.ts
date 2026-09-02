"use server";

import { appendFile, mkdir } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
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
