"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconeCoracao,
  IconeGrade,
  IconeRelogio,
  IconeSaida,
  IconeSeta,
  IconeVela,
} from "../icones";
import { TelaHomenagens, TelaHorarios, TelaObituarios } from "./telas";

/**
 * Painel de publicação — MAQUETE.
 *
 * ⛔ ISTO NÃO É UM SISTEMA. Não há autenticação, não há banco, não há
 * persistência e não há rota de API. Tudo vive em `useState` e some no F5. É
 * uma maquete de venda, e o arquivo diz isso em voz alta para que ninguém
 * daqui a três meses ache que existe um admin funcionando.
 *
 * Existe para responder UMA pergunta, que é a pergunta que a dona do Grupo
 * Serra vai fazer na reunião: "quem publica o velório às duas da manhã de
 * domingo?". A resposta não se dá com slide; se dá mostrando a tela em que a
 * pessoa de plantão digita seis campos e aperta publicar.
 *
 * ⛔ A ROTA INTEIRA É `noindex`, independente de `NEXT_PUBLIC_INDEXAVEL`, e
 * fica fora do sitemap. Um painel de mentira indexado no nome da empresa é
 * pior que painel nenhum.
 *
 * DENSIDADE, e não outro sistema de design: mesma paleta, mesma tipografia,
 * mesmos raios e sombras do site. O que muda é o espaçamento, porque
 * ferramenta interna é usada oito horas por dia e respiro de landing page vira
 * rolagem inútil. Nada aqui inventa um design system de admin.
 *
 * Por que a tela inteira é um `fixed inset-0`: o painel precisa cobrir o
 * cabeçalho, a barra de emergência e o rodapé do site, que vivem no layout raiz.
 * A alternativa seria mover TODAS as rotas para um route group só para dar ao
 * painel um layout raiz próprio, e refatorar quinze páginas que funcionam para
 * acomodar uma maquete é o contrário de uma boa troca.
 */

type Aba = "obituarios" | "homenagens" | "horarios";

const ABAS: { id: Aba; rotulo: string; Icone: typeof IconeVela }[] = [
  { id: "obituarios", rotulo: "Obituários", Icone: IconeVela },
  { id: "homenagens", rotulo: "Homenagens", Icone: IconeCoracao },
  { id: "horarios", rotulo: "Horários", Icone: IconeRelogio },
];

export function Painel() {
  const [dentro, setDentro] = useState(false);
  const [aba, setAba] = useState<Aba>("obituarios");
  const [pendentes, setPendentes] = useState(4);

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-pedra-100">
      {dentro ? (
        <>
          <Topo aba={aba} setAba={setAba} sair={() => setDentro(false)} pendentes={pendentes} />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[72rem] px-4 py-6 md:px-6 md:py-8">
              {aba === "obituarios" ? <TelaObituarios /> : null}
              {aba === "homenagens" ? <TelaHomenagens aoResolver={setPendentes} /> : null}
              {aba === "horarios" ? <TelaHorarios /> : null}
            </div>
          </main>
        </>
      ) : (
        <Login entrar={() => setDentro(true)} />
      )}
    </div>
  );
}

function Topo({
  aba,
  setAba,
  sair,
  pendentes,
}: {
  aba: Aba;
  setAba: (a: Aba) => void;
  sair: () => void;
  pendentes: number;
}) {
  return (
    <header className="shrink-0 border-b border-linha bg-white">
      <div className="mx-auto flex max-w-[72rem] items-center gap-4 px-4 py-3 md:px-6">
        <span className="inline-flex items-center gap-2.5">
          <IconeGrade className="size-5 text-serra-600" />
          <span className="font-display text-[0.9375rem] font-bold text-tinta">
            Painel de publicação
          </span>
        </span>

        <span className="ml-auto hidden items-center gap-2 text-[0.8125rem] text-pedra-600 sm:inline-flex">
          <span className="size-2 rounded-full bg-zap-solido" />
          Plantão · Rosemeire
        </span>

        <button
          type="button"
          onClick={sair}
          aria-label="Sair do painel"
          className="inline-flex size-10 items-center justify-center rounded-serra border border-linha text-pedra-600 transition-colors hover:border-pedra-300 hover:text-tinta"
        >
          <IconeSaida className="size-[1.15rem]" />
        </button>
      </div>

      {/* Abas em vez de menu lateral: são três seções, e barra lateral para três
          itens é cromo ocupando 240px de largura útil o dia inteiro. */}
      <nav className="mx-auto flex max-w-[72rem] gap-1 overflow-x-auto px-4 md:px-6">
        {ABAS.map(({ id, rotulo, Icone }) => (
          <button
            key={id}
            type="button"
            onClick={() => setAba(id)}
            aria-current={aba === id ? "page" : undefined}
            className={`-mb-px inline-flex min-h-[3.25rem] shrink-0 items-center gap-2 border-b-2 px-4 text-[0.9375rem] font-semibold transition-colors ${
              aba === id
                ? "border-serra-600 text-serra-700"
                : "border-transparent text-pedra-600 hover:text-tinta"
            }`}
          >
            <Icone className="size-[1.05rem]" />
            {rotulo}
            {id === "homenagens" && pendentes > 0 ? (
              <span className="numerais ml-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-bronze/20 px-1.5 py-0.5 text-[0.6875rem] font-bold text-bronze-forte">
                {pendentes}
              </span>
            ) : null}
          </button>
        ))}
      </nav>
    </header>
  );
}

/**
 * Login — VISUAL. O botão entra com qualquer coisa nos campos, inclusive vazios.
 * Nada é enviado a lugar nenhum: o formulário não tem `action`, não tem
 * `onSubmit` que faça rede, e os campos não saem deste navegador.
 */
function Login({ entrar }: { entrar: () => void }) {
  return (
    <div className="malha-escura flex h-full items-center justify-center overflow-y-auto px-5 py-10">
      <div className="w-full max-w-[24rem]">
        <Image
          src="/marca/simbolo-serra-branco.png"
          alt=""
          width={379}
          height={376}
          sizes="56px"
          className="mx-auto w-14 opacity-90"
        />
        <h1 className="mt-6 text-center font-display text-[1.375rem] font-bold text-white">
          Painel de publicação
        </h1>
        <p className="mt-2 text-center text-[0.875rem] text-serra-100">
          Obituário, homenagens e horários das oito unidades.
        </p>

        <form
          className="mt-8 rounded-serra-lg border border-white/12 bg-white/[0.06] p-6"
          onSubmit={(e) => {
            e.preventDefault();
            entrar();
          }}
        >
          <label htmlFor="painel-email" className="block text-[0.875rem] font-semibold text-white">
            E-mail
          </label>
          <input
            id="painel-email"
            type="email"
            autoComplete="off"
            placeholder="voce@gruposerra.com.br"
            className="mt-2 min-h-[3.25rem] w-full rounded-serra border border-white/20 bg-white/10 px-4 text-[1.0625rem] text-white placeholder:text-white/40"
          />

          <label
            htmlFor="painel-senha"
            className="mt-5 block text-[0.875rem] font-semibold text-white"
          >
            Senha
          </label>
          <input
            id="painel-senha"
            type="password"
            autoComplete="off"
            placeholder="••••••••"
            className="mt-2 min-h-[3.25rem] w-full rounded-serra border border-white/20 bg-white/10 px-4 text-[1.0625rem] text-white placeholder:text-white/40"
          />

          <button
            type="submit"
            className="botao-cheio varre mt-7 inline-flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-serra px-6 text-[1.0625rem] font-semibold text-white"
          >
            Entrar
            <IconeSeta className="size-4" />
          </button>
        </form>

        <p className="mt-6 rounded-serra border border-dashed border-bronze/50 bg-bronze/[0.12] px-4 py-3 text-center text-[0.8125rem] leading-relaxed text-white/85">
          <strong className="font-bold text-white">Maquete.</strong> Não há login de verdade, nem
          banco de dados. Entre com os campos vazios para ver as telas. O sistema real é a próxima
          etapa.
        </p>

        <p className="mt-5 text-center">
          <Link href="/" className="link-texto text-[0.875rem] text-serra-100">
            Voltar para o site
          </Link>
        </p>
      </div>
    </div>
  );
}
