"use client";

import { useMemo, useState } from "react";
import { UNIDADES } from "@/data/unidades";
import { OBITUARIOS_RECENTES, dataCurta, unidadeDo } from "@/data/obituarios";
import {
  IconeBusca,
  IconeCamera,
  IconeConfere,
  IconeFechar,
  IconeLapis,
  IconeMais,
  IconeSeta,
} from "../icones";

/**
 * As três telas do painel. Todas de mentira, todas em `useState`.
 *
 * ⛔ Nada aqui grava, nada aqui envia e nada aqui sobrevive ao F5. Aprovar uma
 * homenagem tira o cartão da fila NA TELA e acabou. Ver o cabeçalho de
 * `painel.tsx`.
 */

/* ── Tela 1: obituários ─────────────────────────────────────────────────── */

export function TelaObituarios() {
  const [busca, setBusca] = useState("");
  const [novo, setNovo] = useState(false);

  const lista = useMemo(() => {
    const t = busca.trim().toLowerCase();
    if (!t) return OBITUARIOS_RECENTES;
    return OBITUARIOS_RECENTES.filter((o) => o.nome.toLowerCase().includes(t));
  }, [busca]);

  if (novo) return <FormularioObituario voltar={() => setNovo(false)} />;

  return (
    <section>
      <Cabeca titulo="Obituários publicados" apoio={`${OBITUARIOS_RECENTES.length} no ar agora`}>
        <button
          type="button"
          onClick={() => setNovo(true)}
          className="botao-cheio inline-flex min-h-[3.25rem] items-center gap-2 rounded-serra px-5 text-[0.9375rem] font-semibold text-white transition-[filter] hover:brightness-110"
        >
          <IconeMais className="size-[1.05rem]" />
          Publicar novo
        </button>
      </Cabeca>

      <div className="relative mt-5">
        <IconeBusca
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-4 size-[1.05rem] -translate-y-1/2 text-pedra-400"
        />
        <label htmlFor="painel-busca" className="sr-only">
          Buscar obituário publicado
        </label>
        <input
          id="painel-busca"
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar pelo nome"
          className="min-h-[3.25rem] w-full rounded-serra border border-linha bg-white pl-11 text-[0.9375rem] text-tinta placeholder:text-pedra-400"
        />
      </div>

      {/* Tabela no desktop, cartão no celular: a pessoa de plantão publica do
          telefone às duas da manhã tanto quanto do balcão às dez. */}
      <div className="mt-4 overflow-hidden rounded-serra border border-linha bg-white">
        <table className="w-full text-left text-[0.875rem]">
          <thead className="hidden border-b border-linha bg-pedra-100/60 sm:table-header-group">
            <tr className="text-[0.75rem] tracking-[0.1em] text-pedra-600 uppercase">
              <th scope="col" className="px-4 py-3 font-bold">
                Nome
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Velório
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Unidade
              </th>
              <th scope="col" className="px-4 py-3 text-right font-bold">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {lista.map((o) => (
              <tr
                key={o.slug}
                className="flex flex-wrap gap-x-4 gap-y-1 border-b border-linha px-4 py-3 last:border-0 sm:table-row sm:px-0 sm:py-0"
              >
                <td className="w-full font-semibold text-tinta sm:w-auto sm:px-4 sm:py-3 sm:font-normal">
                  {o.nome}
                </td>
                <td className="numerais text-pedra-600 sm:px-4 sm:py-3">
                  {dataCurta(o.dataVelorio)} · {o.horaInicio} às {o.horaTermino}
                </td>
                <td className="text-pedra-600 sm:px-4 sm:py-3">{unidadeDo(o).nome}</td>
                <td className="ml-auto sm:px-4 sm:py-3 sm:text-right">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-serra border border-linha px-3 py-2 text-[0.8125rem] font-semibold text-serra-700 transition-colors hover:border-serra-300"
                  >
                    <IconeLapis className="size-4" />
                    Editar
                  </button>
                </td>
              </tr>
            ))}
            {lista.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-pedra-600">
                  Nenhum obituário com esse nome.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Maquete />
    </section>
  );
}

/* ── Tela 2: cadastro ───────────────────────────────────────────────────── */

/**
 * Os mesmos campos do tipo `Obituario` em `data/obituarios.ts`, na ordem em que
 * quem atende recebe a informação da família. É essa correspondência que faz a
 * maquete valer alguma coisa: o formulário real vai ter exatamente estes campos.
 */
function FormularioObituario({ voltar }: { voltar: () => void }) {
  return (
    <section>
      <button
        type="button"
        onClick={voltar}
        className="link-texto mb-5 inline-flex min-h-[3.25rem] items-center gap-2 text-[0.9375rem] font-semibold text-serra-700"
      >
        <IconeSeta className="size-4 rotate-180" />
        Voltar para a lista
      </button>

      <Cabeca titulo="Publicar uma despedida" apoio="Seis campos obrigatórios. Leva menos de um minuto." />

      <form
        className="mt-5 rounded-serra border border-linha bg-white p-5 md:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo rotulo="Nome completo" id="f-nome" className="sm:col-span-2" />
          <Campo rotulo="Data de nascimento" id="f-nasc" tipo="date" />
          <Campo rotulo="Data do falecimento" id="f-falec" tipo="date" />

          <div className="sm:col-span-2">
            <span className="mb-2 block text-[0.8125rem] font-bold tracking-[0.08em] text-pedra-600 uppercase">
              Cerimônia
            </span>
            <div className="grid gap-4 sm:grid-cols-3">
              <Campo rotulo="Dia do velório" id="f-velorio" tipo="date" />
              <Campo rotulo="Início" id="f-inicio" tipo="time" />
              <Campo rotulo="Término" id="f-termino" tipo="time" />
            </div>
          </div>

          <div>
            <label htmlFor="f-unidade" className="block text-[0.875rem] font-semibold text-tinta">
              Unidade
            </label>
            <select
              id="f-unidade"
              defaultValue=""
              className="mt-2 min-h-[3.25rem] w-full rounded-serra border border-linha bg-white px-4 text-[0.9375rem] text-corpo"
            >
              <option value="" disabled>
                Escolha a unidade
              </option>
              {UNIDADES.map((u) => (
                <option key={u.slug} value={u.slug}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          <Campo rotulo="Sepultamento ou cremação" id="f-destino" />

          <div className="sm:col-span-2">
            <label htmlFor="f-texto" className="block text-[0.875rem] font-semibold text-tinta">
              Uma frase da família{" "}
              <span className="font-normal text-pedra-600">(opcional)</span>
            </label>
            <textarea
              id="f-texto"
              rows={3}
              className="mt-2 w-full rounded-serra border border-linha bg-white p-4 text-[0.9375rem] text-tinta"
            />
          </div>

          <div className="sm:col-span-2">
            <span className="block text-[0.875rem] font-semibold text-tinta">
              Retrato <span className="font-normal text-pedra-600">(opcional)</span>
            </span>
            <div className="mt-2 flex items-center gap-3 rounded-serra border border-dashed border-linha bg-pedra-100/50 px-4 py-5">
              <IconeCamera className="size-5 shrink-0 text-pedra-400" />
              <span className="text-[0.875rem] text-pedra-600">
                Enviado pela família por WhatsApp, ou anexado aqui. Sem foto, a página usa a
                silhueta neutra.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-linha pt-5">
          <button
            type="submit"
            className="botao-cheio inline-flex min-h-[3.25rem] items-center gap-2 rounded-serra px-6 text-[0.9375rem] font-semibold text-white transition-[filter] hover:brightness-110"
          >
            <IconeConfere className="size-[1.05rem]" />
            Publicar agora
          </button>
          <span className="text-[0.8125rem] text-pedra-600">
            Publicado, o link já sai pronto para o WhatsApp da família.
          </span>
        </div>
      </form>

      <Maquete />
    </section>
  );
}

/* ── Tela 3: fila de homenagens ─────────────────────────────────────────── */

/** Mensagens de demonstração, no mesmo regime dos obituários de exemplo. */
const FILA = [
  {
    id: 1,
    autor: "Sobrinha, Marli",
    sobre: "Benedita Alvim Rosseto",
    quando: "há 12 minutos",
    texto: "Tia Dita fez bolo pra todo mundo dessa família. Vai fazer falta em todo domingo.",
  },
  {
    id: 2,
    autor: "Vizinho, Jorge",
    sobre: "Oswaldo Marchetti Braz",
    quando: "há 40 minutos",
    texto: "Consertou minha bicicleta de graça por vinte anos. Descanse, seu Oswaldo.",
  },
  {
    id: 3,
    autor: "Ex-aluno, Antônio",
    sobre: "Therezinha Pedrozo Galhardo",
    quando: "há 2 horas",
    texto:
      "Foi ela que me ensinou a ler. Lembro do nome dela até hoje e ela lembrava do meu. Obrigado, professora.",
  },
  {
    id: 4,
    autor: "Anônimo",
    sobre: "Waldemar Siqueira Lombardi",
    quando: "há 3 horas",
    texto: "COMPRE SEU PLANO AQUI >> link promocional <<",
  },
];

export function TelaHomenagens({ aoResolver }: { aoResolver: (n: number) => void }) {
  const [fila, setFila] = useState(FILA);

  const resolver = (id: number) => {
    const resto = fila.filter((h) => h.id !== id);
    setFila(resto);
    aoResolver(resto.length);
  };

  return (
    <section>
      <Cabeca
        titulo="Homenagens aguardando aprovação"
        apoio="Nada entra no mural sem alguém ler antes."
      />

      {fila.length === 0 ? (
        <p className="mt-5 rounded-serra border border-linha bg-white px-5 py-8 text-center text-[0.9375rem] text-pedra-600">
          Fila vazia. Toda homenagem enviada já foi lida.
        </p>
      ) : (
        <ul className="mt-5 space-y-3">
          {fila.map((h) => (
            <li
              key={h.id}
              className="rounded-serra border border-linha bg-white p-5 md:flex md:items-start md:gap-5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[0.8125rem] text-pedra-600">
                  <span className="font-semibold text-tinta">{h.autor}</span> · para {h.sobre} ·{" "}
                  {h.quando}
                </p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-corpo">{h.texto}</p>
              </div>
              <div className="mt-4 flex shrink-0 gap-2 md:mt-0">
                <button
                  type="button"
                  onClick={() => resolver(h.id)}
                  className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-serra bg-verde-forte px-5 text-[0.875rem] font-semibold text-white transition-[filter] hover:brightness-110"
                >
                  <IconeConfere className="size-4" />
                  Aprovar
                </button>
                <button
                  type="button"
                  onClick={() => resolver(h.id)}
                  className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-serra border border-linha px-5 text-[0.875rem] font-semibold text-pedra-700 transition-colors hover:border-pedra-300"
                >
                  <IconeFechar className="size-4" />
                  Recusar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* A quarta mensagem da fila é spam de propósito. É o argumento de venda
          da moderação: sem fila, isso vai direto para o mural de um velório. */}
      <p className="mt-4 rounded-serra border border-dashed border-bronze/60 bg-bronze/[0.07] px-4 py-3 text-[0.8125rem] leading-relaxed text-pedra-700">
        A última mensagem da fila é spam, e está aí de propósito: é o que chega num mural aberto sem
        moderação, na página de um velório.
      </p>

      <Maquete />
    </section>
  );
}

/* ── Tela 4: horários por unidade ───────────────────────────────────────── */

export function TelaHorarios() {
  return (
    <section>
      <Cabeca
        titulo="Horário de atendimento"
        apoio="O balcão tem horário. O plantão de óbito, não: 24 horas nas oito unidades."
      />

      <div className="mt-5 overflow-hidden rounded-serra border border-linha bg-white">
        <table className="w-full text-left text-[0.875rem]">
          <thead className="hidden border-b border-linha bg-pedra-100/60 sm:table-header-group">
            <tr className="text-[0.75rem] tracking-[0.1em] text-pedra-600 uppercase">
              <th scope="col" className="px-4 py-3 font-bold">
                Unidade
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Segunda a sexta
              </th>
              <th scope="col" className="px-4 py-3 font-bold">
                Sábado
              </th>
              <th scope="col" className="px-4 py-3 text-right font-bold">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {UNIDADES.map((u) => {
              const [semana, sabado] = u.horario.split(" · ");
              return (
                <tr
                  key={u.slug}
                  className="flex flex-wrap gap-x-4 gap-y-1 border-b border-linha px-4 py-3 last:border-0 sm:table-row sm:px-0 sm:py-0"
                >
                  <td className="w-full font-semibold text-tinta sm:w-auto sm:px-4 sm:py-3 sm:font-normal">
                    {u.nome}
                  </td>
                  <td className="numerais text-pedra-600 sm:px-4 sm:py-3">{semana}</td>
                  <td className="numerais text-pedra-600 sm:px-4 sm:py-3">{sabado}</td>
                  <td className="ml-auto sm:px-4 sm:py-3 sm:text-right">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-serra border border-linha px-3 py-2 text-[0.8125rem] font-semibold text-serra-700 transition-colors hover:border-serra-300"
                    >
                      <IconeLapis className="size-4" />
                      Alterar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-serra border border-dashed border-bronze/60 bg-bronze/[0.07] px-4 py-3 text-[0.8125rem] leading-relaxed text-pedra-700">
        Hoje o site antigo se contradiz no sábado: a home diz 8h e a página de contato diz 9h. Com
        esta tela, o horário tem um lugar só, e quem corrige é a equipe, não o desenvolvedor.
      </p>

      <Maquete />
    </section>
  );
}

/* ── Peças compartilhadas ───────────────────────────────────────────────── */

function Cabeca({
  titulo,
  apoio,
  children,
}: {
  titulo: string;
  apoio: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-[1.25rem] font-bold text-tinta">{titulo}</h2>
        <p className="mt-1 text-[0.875rem] text-pedra-600">{apoio}</p>
      </div>
      {children}
    </div>
  );
}

function Campo({
  rotulo,
  id,
  tipo = "text",
  className = "",
}: {
  rotulo: string;
  id: string;
  tipo?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.875rem] font-semibold text-tinta">
        {rotulo}
      </label>
      <input
        id={id}
        type={tipo}
        className="mt-2 min-h-[3.25rem] w-full rounded-serra border border-linha bg-white px-4 text-[0.9375rem] text-tinta"
      />
    </div>
  );
}

function Maquete() {
  return (
    <p className="mt-6 text-center text-[0.8125rem] text-pedra-500">
      Maquete de demonstração. Nenhum botão desta tela grava, envia ou apaga nada.
    </p>
  );
}
