"use client";

import { useActionState, useId, useState } from "react";
import { enviarLead, type EstadoLead } from "@/app/acoes";
import { UNIDADES } from "@/data/unidades";
import { SITE } from "@/lib/site";
import { Rotulo, TituloCine } from "../ui";
import { IconeConfere, IconeSeta, IconeTelefone, IconeWhatsApp } from "../icones";

/**
 * Captação de contato.
 *
 * Faltava por inteiro, e era a lacuna mais cara do site: quem pesquisa plano
 * funerário às 23h não quer falar com ninguém ainda, e sem formulário essa
 * pessoa ia embora sem deixar rastro. A LP do Florees tem esse formulário e é
 * por isso que ela capta.
 *
 * Cuidados que o público exige:
 *  - máscara de telefone enquanto digita, porque errar o número aqui é perder
 *    o contato para sempre;
 *  - erro em português dizendo O QUE fazer, nunca "campo inválido";
 *  - erro aparece no `blur` e some enquanto a pessoa corrige, não a cada tecla;
 *  - o telefone 24h fica ao lado do formulário, porque quem precisa AGORA não
 *    pode ser empurrado para um campo de texto.
 */
export function Formulario() {
  const [estado, acao, enviando] = useActionState<EstadoLead, FormData>(
    enviarLead,
    { estado: "ocioso" }
  );
  const id = useId();
  const [fone, setFone] = useState("");
  const cidades = [...new Set(UNIDADES.map((u) => u.cidade))];

  const erro = estado.estado === "erro" ? estado.campos : undefined;

  /** (19) 99999-9999, montado conforme digita. */
  const mascarar = (v: string) => {
    const d = v.replace(/\D+/g, "").slice(0, 11);
    if (d.length <= 2) return d.length ? `(${d}` : "";
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  if (estado.estado === "ok") {
    return (
      <section id="contato" className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[46rem] px-5 text-center" data-revela>
          <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-verde/15 text-verde-forte">
            <IconeConfere className="size-8" />
          </span>
          <h2 className="mt-6 text-t2">Recebemos o seu contato</h2>
          <p className="mt-5 text-lead text-pedra-600">
            Alguém da unidade que você escolheu vai falar com você. Se precisar
            antes disso, ou se for uma urgência agora, ligue.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${SITE.emergencia.tel}`}
              className="botao-cheio inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
            >
              <IconeTelefone className="size-5 shrink-0" />
              {SITE.emergencia.rotulo}
            </a>
            <a
              href={SITE.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mat-zap inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
            >
              <IconeWhatsApp className="size-5 shrink-0" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Rotulo>Contato</Rotulo>
            <TituloCine className="max-w-[18ch] text-t2">
              Prefere que a gente ligue para você?
            </TituloCine>
            <p className="mt-5 max-w-[52ch] text-lead text-pedra-600">
              Deixe o contato e alguém da unidade mais perto fala com você, sem
              compromisso e sem script de venda.
            </p>

            <div className="mt-8 rounded-serra-lg border border-serra-200 bg-white p-6 shadow-baixa">
              <p className="font-display text-[1.0625rem] font-bold text-tinta">
                É uma urgência agora?
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-pedra-600">
                Não preencha nada. Ligue, que atende na hora, todo dia.
              </p>
              <a
                href={`tel:${SITE.emergencia.tel}`}
                className="botao-cheio mt-5 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-serra px-5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <IconeTelefone className="size-5 shrink-0" />
                <span className="numerais">{SITE.emergencia.rotulo}</span>
              </a>
            </div>
          </div>

          <form
            action={acao}
            noValidate
            className="rounded-serra-lg border border-linha bg-white p-7 shadow-media md:p-8"
          >
            {/* Isca para robô. Fica fora da ordem de tabulação e do leitor de tela. */}
            <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
              <label htmlFor={`${id}-site`}>Não preencha</label>
              <input id={`${id}-site`} name="site" tabIndex={-1} autoComplete="off" />
            </div>

            <Campo
              id={`${id}-nome`}
              nome="nome"
              rotulo="Seu nome completo"
              autoComplete="name"
              erro={erro?.nome}
            />

            <Campo
              id={`${id}-whatsapp`}
              nome="whatsapp"
              rotulo="WhatsApp com DDD"
              tipo="tel"
              inputMode="tel"
              autoComplete="tel"
              valor={fone}
              aoMudar={(v) => setFone(mascarar(v))}
              dica="É por aqui que a gente responde."
              erro={erro?.whatsapp}
            />

            <div className="mt-5">
              <label
                htmlFor={`${id}-cidade`}
                className="block font-semibold text-tinta"
              >
                Cidade mais perto de você
              </label>
              <select
                id={`${id}-cidade`}
                name="cidade"
                defaultValue=""
                aria-invalid={erro?.cidade ? true : undefined}
                aria-describedby={erro?.cidade ? `${id}-cidade-erro` : undefined}
                className={`mt-2 min-h-[3.25rem] w-full rounded-serra border bg-white px-4 text-[1.0625rem] text-corpo ${
                  erro?.cidade ? "border-red-500" : "border-linha"
                }`}
              >
                <option value="" disabled>
                  Escolha a cidade
                </option>
                {cidades.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {erro?.cidade && (
                <p id={`${id}-cidade-erro`} className="mt-2 text-[0.875rem] font-medium text-red-700">
                  {erro.cidade}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor={`${id}-assunto`} className="block font-semibold text-tinta">
                Sobre o que você quer falar
              </label>
              <select
                id={`${id}-assunto`}
                name="assunto"
                defaultValue=""
                aria-invalid={erro?.assunto ? true : undefined}
                aria-describedby={erro?.assunto ? `${id}-assunto-erro` : undefined}
                className={`mt-2 min-h-[3.25rem] w-full rounded-serra border bg-white px-4 text-[1.0625rem] text-corpo ${
                  erro?.assunto ? "border-red-500" : "border-linha"
                }`}
              >
                <option value="" disabled>
                  Escolha o assunto
                </option>
                <option>Contratar um plano</option>
                <option>Dúvida sobre o meu plano</option>
                <option>Segunda via de boleto</option>
                <option>Cremação</option>
                <option>Serra Pet</option>
                <option>Plano para a minha empresa</option>
                <option>Outro assunto</option>
              </select>
              {erro?.assunto && (
                <p id={`${id}-assunto-erro`} className="mt-2 text-[0.875rem] font-medium text-red-700">
                  {erro.assunto}
                </p>
              )}
            </div>

            <div className="mt-5">
              <label htmlFor={`${id}-mensagem`} className="block font-semibold text-tinta">
                Quer contar mais alguma coisa?{" "}
                <span className="font-normal text-pedra-600">(opcional)</span>
              </label>
              <textarea
                id={`${id}-mensagem`}
                name="mensagem"
                rows={3}
                className="mt-2 w-full rounded-serra border border-linha bg-white px-4 py-3 text-[1.0625rem] text-corpo"
              />
            </div>

            {/* ⛔ ERRO SEM SAÍDA É PIOR QUE ERRO. `acoes.ts` diz, em comentário,
                que quando a gravação falha "a interface manda a pessoa para o
                WhatsApp, que é o caminho que sempre funciona". A interface não
                mandava: exibia o texto e deixava a pessoa parada diante de um
                formulário que acabou de recusá-la. Agora os dois caminhos que
                nunca dependem do nosso servidor ficam no próprio bloco de erro. */}
            {estado.estado === "erro" && estado.mensagem && (
              <div className="mt-5 rounded-serra border border-red-200 bg-red-50 px-4 py-4">
                <p className="text-[0.9375rem] leading-relaxed text-red-800">{estado.mensagem}</p>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={SITE.whatsapp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mat-zap inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-serra px-5 text-[0.9375rem] font-semibold text-white transition-[filter] hover:brightness-105"
                  >
                    <IconeWhatsApp className="size-5 shrink-0" />
                    Falar no WhatsApp
                  </a>
                  <a
                    href={`tel:${SITE.emergencia.tel}`}
                    className="numerais inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-serra border border-serra-300 bg-white px-5 text-[0.9375rem] font-semibold text-serra-700 transition-colors hover:border-serra-500"
                  >
                    <IconeTelefone className="size-5 shrink-0" />
                    {SITE.emergencia.rotulo}
                  </a>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="botao-cheio mt-7 inline-flex min-h-[3.5rem] w-full items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:translate-y-0 disabled:opacity-70"
            >
              {enviando ? "Enviando…" : "Pedir contato"}
              {!enviando && <IconeSeta className="size-5 shrink-0" />}
            </button>

            <p className="mt-4 text-[0.8125rem] leading-relaxed text-pedra-600">
              Seus dados servem só para o Grupo Serra responder. Não vendemos,
              não repassamos e você pode pedir a exclusão quando quiser, pela{" "}
              <a href="/privacidade" className="link-texto font-semibold">
                política de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Campo({
  id,
  nome,
  rotulo,
  tipo = "text",
  inputMode,
  autoComplete,
  valor,
  aoMudar,
  dica,
  erro,
}: {
  id: string;
  nome: string;
  rotulo: string;
  tipo?: string;
  inputMode?: "tel" | "text" | "email";
  autoComplete?: string;
  valor?: string;
  aoMudar?: (v: string) => void;
  dica?: string;
  erro?: string;
}) {
  return (
    <div className="mt-5 first:mt-0">
      <label htmlFor={id} className="block font-semibold text-tinta">
        {rotulo}
      </label>
      <input
        id={id}
        name={nome}
        type={tipo}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={valor}
        onChange={aoMudar ? (e) => aoMudar(e.target.value) : undefined}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : dica ? `${id}-dica` : undefined}
        className={`mt-2 min-h-[3.25rem] w-full rounded-serra border bg-white px-4 text-[1.0625rem] text-corpo ${
          erro ? "border-red-500" : "border-linha"
        }`}
      />
      {erro ? (
        <p id={`${id}-erro`} className="mt-2 text-[0.875rem] font-medium text-red-700">
          {erro}
        </p>
      ) : dica ? (
        <p id={`${id}-dica`} className="mt-2 text-[0.875rem] text-pedra-600">
          {dica}
        </p>
      ) : null}
    </div>
  );
}
