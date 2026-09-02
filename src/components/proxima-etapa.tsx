import { SITE } from "@/lib/site";
import { Botao, Faixa } from "./ui";
import { BarraFixaCelular } from "./barra-emergencia";
import { IconeSeta, IconeTelefone } from "./icones";

/**
 * Rota esboçada.
 *
 * Escopo combinado com o dono em 02/09/2026: a primeira versão entrega a HOME
 * completa mais o sistema de design, e as demais rotas ficam esboçadas para a
 * navegação não quebrar. Esta página herda o sistema inteiro e diz honestamente
 * o que ainda não existe, em vez de fingir conteúdo.
 */
export function ProximaEtapa({
  titulo,
  resumo,
  previsto,
}: {
  titulo: string;
  resumo: string;
  previsto: string[];
}) {
  return (
    <>
      <Faixa>
        <p className="text-[0.9375rem] font-semibold tracking-wide text-serra-600 uppercase">
          Protótipo, próxima etapa
        </p>
        <h1 className="mt-3 max-w-[20ch] text-t1">{titulo}</h1>
        <p className="mt-5 max-w-[62ch] text-lead text-pedra-600">{resumo}</p>

        <h2 className="mt-14 font-display text-[1.25rem] font-semibold text-tinta">
          O que entra nesta página
        </h2>
        <ul className="mt-5 max-w-[62ch] space-y-3 border-t border-linha pt-5">
          {previsto.map((p) => (
            <li key={p} className="flex gap-3 border-b border-linha pb-3 text-corpo">
              <span
                aria-hidden
                className="mt-[0.62rem] size-1.5 shrink-0 rounded-full bg-serra-400"
              />
              {p}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Botao
            href={`tel:${SITE.emergencia.tel}`}
            externo
            icone={<IconeTelefone className="size-5 shrink-0" />}
          >
            Ligar agora, {SITE.emergencia.rotulo}
          </Botao>
          <Botao href="/" tom="contorno" icone={<IconeSeta className="size-5 shrink-0 rotate-180" />}>
            Voltar para a home
          </Botao>
        </div>
      </Faixa>
      <BarraFixaCelular />
    </>
  );
}
