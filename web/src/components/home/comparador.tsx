"use client";

import { useMemo, useState } from "react";
import { PLANOS } from "@/data/planos";
import { SITE } from "@/lib/site";
import { IconeConfere, IconePata, IconeSeta, IconeWhatsApp } from "../icones";

/**
 * Comparador de planos.
 *
 * É a peça de conversão mais trabalhada do site do Florees (42 referências no
 * JS deles), e nós não tínhamos nada parecido: jogávamos três cartões de preço
 * na cara da pessoa e torcíamos.
 *
 * Quatro perguntas, uma recomendação. Regras:
 *  - a recomendação é SUGESTÃO, e a tela diz isso com todas as letras. Preço de
 *    plano funerário depende de idade e de quantas pessoas entram, e nada disso
 *    o site sabe;
 *  - nenhuma pergunta é obrigatória para ver o resultado: dá para responder
 *    duas e já receber um caminho;
 *  - o resultado leva para o WhatsApp com o resumo montado, então a pessoa não
 *    precisa repetir tudo para o atendente.
 */

type Chave = "quem" | "cremacao" | "pet" | "prioridade";

const PERGUNTAS: {
  chave: Chave;
  titulo: string;
  opcoes: { valor: string; rotulo: string; nota?: string }[];
}[] = [
  {
    chave: "quem",
    titulo: "Quem você quer proteger?",
    opcoes: [
      { valor: "so-eu", rotulo: "Só eu, por enquanto" },
      { valor: "casal", rotulo: "Eu e meu cônjuge" },
      { valor: "familia", rotulo: "Minha família: cônjuge e filhos" },
      { valor: "estendida", rotulo: "A família toda, com pais e sogros" },
    ],
  },
  {
    chave: "cremacao",
    titulo: "Você já pensou em cremação?",
    opcoes: [
      { valor: "sim", rotulo: "Sim, quero cremação" },
      { valor: "nao", rotulo: "Não, prefiro sepultamento" },
      { valor: "talvez", rotulo: "Ainda não decidi" },
    ],
  },
  {
    chave: "pet",
    titulo: "Tem animal de estimação em casa?",
    opcoes: [
      { valor: "sim", rotulo: "Tenho" },
      { valor: "nao", rotulo: "Não tenho" },
    ],
  },
  {
    chave: "prioridade",
    titulo: "O que pesa mais na sua decisão?",
    opcoes: [
      { valor: "orcamento", rotulo: "Caber no orçamento todo mês" },
      { valor: "cobertura", rotulo: "Não sobrar nenhuma pergunta em aberto" },
    ],
  },
];

export function Comparador() {
  const [resp, setResp] = useState<Partial<Record<Chave, string>>>({});
  const respondidas = Object.keys(resp).length;

  const recomendado = useMemo(() => {
    /* Pontuação simples e legível de propósito: quem for mexer nisso depois
       precisa entender a regra sem abrir depurador. */
    let ponto = 0;
    if (resp.quem === "casal") ponto += 1;
    if (resp.quem === "familia") ponto += 2;
    if (resp.quem === "estendida") ponto += 3;
    if (resp.cremacao === "sim") ponto += 2;
    if (resp.cremacao === "talvez") ponto += 1;
    if (resp.prioridade === "cobertura") ponto += 2;
    if (resp.prioridade === "orcamento") ponto -= 1;

    const slug = ponto >= 5 ? "serra-total" : ponto >= 2 ? "serra-perola" : "serra-essencial";
    return PLANOS.find((p) => p.slug === slug)!;
  }, [resp]);

  const comPet = resp.pet === "sim";

  const mensagem = useMemo(() => {
    const partes = [
      `Olá! Vim pelo site e o comparador sugeriu o ${recomendado.nome}.`,
      resp.quem && `Quero proteger: ${rotuloDe("quem", resp.quem)}.`,
      resp.cremacao && `Cremação: ${rotuloDe("cremacao", resp.cremacao)}.`,
      comPet && "Tenho pet e quero saber do Serra Pet.",
      "Pode me explicar carência, idade limite e o valor para o meu caso?",
    ].filter(Boolean);
    return encodeURIComponent(partes.join(" "));
  }, [recomendado, resp, comPet]);

  return (
    <Secao>
      <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div>
          <h2 className="max-w-[18ch] text-t2">
            Qual plano faz sentido para a sua família?
          </h2>
          <p className="mt-5 max-w-[54ch] text-lead text-pedra-600">
            Quatro perguntas, e o site aponta um caminho. Não precisa responder
            todas.
          </p>

          <div className="mt-10 space-y-8">
            {PERGUNTAS.map((p) => (
              <fieldset key={p.chave}>
                <legend className="font-display text-[1.0625rem] font-bold text-tinta">
                  {p.titulo}
                </legend>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  {p.opcoes.map((o) => {
                    const ativo = resp[p.chave] === o.valor;
                    return (
                      <button
                        key={o.valor}
                        type="button"
                        aria-pressed={ativo}
                        onClick={() =>
                          setResp((r) => ({
                            ...r,
                            [p.chave]: ativo ? undefined : o.valor,
                          }))
                        }
                        className={`min-h-[2.875rem] rounded-full border px-4 text-[0.9375rem] font-semibold transition-all duration-300 ${
                          ativo
                            ? "border-serra-500 bg-serra-500 text-white shadow-azul"
                            : "border-linha bg-white text-pedra-700 hover:-translate-y-0.5 hover:border-serra-300 hover:text-serra-600"
                        }`}
                      >
                        {o.rotulo}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        {/* Resultado */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="overflow-hidden rounded-serra-xl border border-serra-200 bg-white shadow-media">
            <div className="botao-cheio px-7 py-5 text-white">
              <p className="text-[0.875rem] font-semibold text-serra-100">
                {respondidas === 0
                  ? "Comece respondendo ao lado"
                  : `Com ${respondidas} de 4 respostas, o caminho é`}
              </p>
              <p className="mt-1 font-display text-[1.625rem] leading-tight font-extrabold">
                {recomendado.nome}
              </p>
            </div>

            <div className="p-7">
              <p className="numerais flex items-baseline gap-1.5">
                <span className="text-[0.9375rem] text-pedra-600">a partir de</span>
              </p>
              <p className="numerais mt-1 flex items-baseline gap-1">
                <span className="font-display text-[1.375rem] font-bold text-pedra-600">R$</span>
                <span className="font-display text-[2.5rem] leading-none font-extrabold text-tinta">
                  {recomendado.preco!.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                <span className="text-[1.0625rem] text-pedra-600">/mês</span>
              </p>

              <p className="mt-5 border-t border-linha pt-5 text-[0.9375rem] leading-relaxed text-corpo">
                {recomendado.descricao}
              </p>

              <ul className="mt-5 space-y-2.5">
                {recomendado.destaques.map((d) => (
                  <li key={d} className="flex gap-2.5 text-[0.9375rem] text-corpo">
                    <IconeConfere className="mt-1 size-[1.05rem] shrink-0 text-serra-500" />
                    {d}
                  </li>
                ))}
                {comPet && (
                  <li className="flex gap-2.5 text-[0.9375rem] font-semibold text-corpo">
                    <IconePata className="mt-1 size-[1.05rem] shrink-0 text-serra-500" />
                    Somar o Serra Pet, até 3 animais
                  </li>
                )}
              </ul>

              <a
                href={`${SITE.whatsapp.link.split("?")[0]}?text=${mensagem}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mat-zap group mt-7 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-serra px-5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
              >
                <IconeWhatsApp className="size-5 shrink-0" />
                Falar sobre o {recomendado.nome.replace("Serra ", "")}
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <p className="mt-4 text-[0.8125rem] leading-relaxed text-pedra-600">
                É uma sugestão, não um orçamento. O valor final depende da idade
                e de quantas pessoas entram no contrato, e a carência precisa ser
                confirmada pela equipe.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </Secao>
  );
}

function Secao({ children }: { children: React.ReactNode }) {
  return (
    <section id="comparador" className="bg-papel py-20 md:py-28">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        {children}
      </div>
    </section>
  );
}

function rotuloDe(chave: Chave, valor: string) {
  return (
    PERGUNTAS.find((p) => p.chave === chave)?.opcoes.find((o) => o.valor === valor)
      ?.rotulo ?? valor
  );
}
