"use client";

import { useId, useMemo, useState } from "react";
import { OBITUARIOS_RECENTES } from "@/data/obituarios";
import { UNIDADES } from "@/data/unidades";
import { IconeBusca, IconeFechar } from "../icones";
import { CartaoObituario } from "./cartao";

/**
 * Listagem com busca e filtro.
 *
 * ⛔ SEM ENDPOINT, DE PROPÓSITO. São oito registros; mandar isso para um
 * servidor a cada tecla seria inventar latência. O filtro roda em memória, o
 * resultado aparece enquanto a pessoa digita, e o site continua funcionando
 * inteiro se o JavaScript não carregar: sem JS a lista sai completa do
 * servidor, que é a resposta certa para quem está procurando um velório.
 *
 * ⛔ E A REGRA QUE VALE MAIS QUE AS OUTRAS: quando a busca não acha nada, a
 * tela NÃO diz só "nenhum resultado". Diz o telefone do plantão. Uma família
 * que digitou o nome errado, ou que chegou antes da publicação, não pode
 * receber uma tela vazia como resposta final.
 */
export function ListaObituarios() {
  const id = useId();
  const [termo, setTermo] = useState("");
  const [unidade, setUnidade] = useState("");

  const achados = useMemo(() => {
    const t = normalizar(termo);
    return OBITUARIOS_RECENTES.filter((o) => {
      if (unidade && o.unidade !== unidade) return false;
      if (!t) return true;
      return normalizar(o.nome).includes(t);
    });
  }, [termo, unidade]);

  const filtrando = Boolean(termo || unidade);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor={`${id}-busca`} className="sr-only">
            Buscar pelo nome da pessoa
          </label>
          <IconeBusca
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-pedra-400"
          />
          <input
            id={`${id}-busca`}
            type="search"
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar pelo nome"
            autoComplete="off"
            className="min-h-[3.25rem] w-full rounded-serra border border-linha bg-white pr-11 pl-12 text-[1.0625rem] text-tinta placeholder:text-pedra-400"
          />
          {termo ? (
            <button
              type="button"
              onClick={() => setTermo("")}
              aria-label="Limpar a busca"
              className="absolute top-1/2 right-2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-pedra-500 transition-colors hover:bg-pedra-100 hover:text-tinta"
            >
              <IconeFechar className="size-4" />
            </button>
          ) : null}
        </div>

        <div className="sm:w-[16rem]">
          <label htmlFor={`${id}-unidade`} className="sr-only">
            Filtrar por unidade
          </label>
          <select
            id={`${id}-unidade`}
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            className="min-h-[3.25rem] w-full rounded-serra border border-linha bg-white px-4 text-[1.0625rem] text-corpo"
          >
            <option value="">Todas as unidades</option>
            {UNIDADES.map((u) => (
              <option key={u.slug} value={u.slug}>
                {u.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="numerais mt-4 text-[0.875rem] text-pedra-600" aria-live="polite">
        {achados.length === 0
          ? "Nenhuma despedida encontrada"
          : achados.length === 1
            ? "1 despedida"
            : `${achados.length} despedidas`}
        {filtrando ? " com esse filtro" : " publicadas"}
      </p>

      {achados.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achados.map((o, i) => (
            <CartaoObituario key={o.slug} o={o} indice={i} />
          ))}
        </ul>
      ) : (
        <SemResultado
          termo={termo}
          unidade={unidade}
          limpar={() => {
            setTermo("");
            setUnidade("");
          }}
        />
      )}
    </div>
  );
}

function SemResultado({
  termo,
  unidade,
  limpar,
}: {
  termo: string;
  unidade: string;
  limpar: () => void;
}) {
  const u = unidade ? UNIDADES.find((x) => x.slug === unidade) : undefined;

  return (
    <div className="mt-6 rounded-serra-lg border border-linha bg-papel p-7 text-center">
      <p className="font-display text-[1.125rem] font-bold text-tinta">
        Não encontramos {termo ? <>ninguém com esse nome</> : <>despedida nesta unidade</>}
      </p>
      <p className="mx-auto mt-3 max-w-[48ch] text-[0.9375rem] leading-relaxed text-corpo">
        Pode ser grafia diferente, ou a cerimônia pode ainda não ter sido publicada. O plantão
        confirma local e horário na hora, a qualquer hora do dia ou da noite.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={limpar}
          className="inline-flex min-h-[3.25rem] items-center rounded-serra border border-serra-300 bg-white px-6 text-[1.0625rem] font-semibold text-serra-700 transition-colors hover:border-serra-500"
        >
          Ver todas as despedidas
        </button>
        <a
          href={`tel:${(u ?? UNIDADES[0]).tel}`}
          className="numerais inline-flex min-h-[3.25rem] items-center rounded-serra bg-serra-700 px-6 text-[1.0625rem] font-semibold text-white transition-[filter] hover:brightness-110"
        >
          {u ? `Ligar para ${u.nome}` : `Plantão ${UNIDADES[0].telefone}`}
        </a>
      </div>
    </div>
  );
}

/** Sem acento e sem caixa: "Therezinha" tem que aparecer para quem digita "terezinha". */
function normalizar(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/*
 * Nota sobre "e sem JavaScript?": não é preciso um segundo componente. O estado
 * inicial deste aqui é busca vazia e filtro vazio, então o HTML que o servidor
 * entrega já traz as oito despedidas na grade. O React só assume quando hidrata.
 * Sem JS a pessoa perde a busca, não a lista, e é a lista que ela precisa.
 */
