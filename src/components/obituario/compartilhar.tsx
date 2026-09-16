"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { IconeConfere, IconeLink, IconeWhatsApp } from "../icones";

/**
 * Compartilhar a despedida.
 *
 * ⛔ ISTO NÃO QUEBRA A REGRA 5. A página do obituário não vende nada, e este
 * botão não vende: ele faz o que a família já ia fazer de qualquer jeito, que é
 * avisar quem precisa saber. Hoje ela copia a URL da barra do navegador e cola
 * no grupo; o botão só tira os três passos do caminho. Nenhum texto aqui fala
 * de plano, de preço ou da empresa.
 *
 * É também o gesto que fecha o argumento do projeto inteiro: o cartão que sai
 * daqui chega ao WhatsApp com nome, período de vida, data, horário e unidade,
 * contra o link pelado que o site antigo do cliente entrega hoje.
 *
 * ⛔ A URL VEM DO SERVIDOR, NÃO DE `window.location`. A barra do navegador pode
 * ter `?v=2`, `#âncora` ou um parâmetro de campanha grudado, e o que precisa
 * circular é a URL canônica — a mesma que a página declara em `og:url`. Link
 * compartilhado com parâmetro de rastreio colado também é o jeito mais fácil de
 * a prévia vir de um cache errado.
 *
 * ⛔ E O TOM. "Compartilhe!" é linguagem de post. Aqui é "avisar quem precisa
 * saber", porque é isso que a pessoa está fazendo.
 */
export function Compartilhar({ nome, url }: { nome: string; url: string }) {
  const [copiado, setCopiado] = useState(false);

  /* ⛔ `useSyncExternalStore`, NÃO `useState` + `useEffect`. `navigator.share`
     só existe em parte dos aparelhos, e ler isso durante a renderização faria o
     HTML do servidor discordar do navegador. A primeira versão resolvia com um
     `setState` no efeito de montagem, e o próprio lint do React barrou: chamar
     `setState` dentro de um efeito dispara uma cascata de renderizações.
     Este é o mesmo padrão que `components/consentimento.tsx` já usa para o
     `localStorage`, e pelo mesmo motivo: a capacidade do navegador é uma LOJA
     EXTERNA. O terceiro argumento é o que o servidor vê (false), então o HTML
     nasce com "Copiar link" e o botão só vira "Outros apps" onde há suporte. */
  const temNativo = useSyncExternalStore(
    () => () => {},
    /* ⛔ `navigator.share` NAO BASTA SOZINHO. O Chrome do Windows tambem o
       implementa, e ali ele abre a folha de compartilhamento do sistema, que
       para quem esta num desktop e pior do que simplesmente copiar o link. O
       compartilhamento nativo so ganha onde nao ha ponteiro, que e o mesmo
       teste que o resto do site usa para decidir "isto e um celular". */
    () =>
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      window.matchMedia("(hover: none)").matches,
    () => false
  );

  useEffect(() => {
    if (!copiado) return;
    const t = setTimeout(() => setCopiado(false), 2600);
    return () => clearTimeout(t);
  }, [copiado]);

  /* O texto vai curto de propósito: o cartão da prévia já mostra data, horário e
     unidade, e repetir tudo na mensagem faz o WhatsApp exibir um parágrafo em
     cima de um cartão que diz a mesma coisa. */
  const mensagem = `Velório de ${nome}. Local e horário: ${url}`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
    } catch {
      /* Clipboard bloqueado (contexto sem HTTPS, permissão negada). Em vez de
         falhar calado, seleciona a URL para a pessoa copiar na mão. */
      const campo = document.createElement("input");
      campo.value = url;
      document.body.appendChild(campo);
      campo.select();
      try {
        document.execCommand("copy");
        setCopiado(true);
      } catch {
        window.prompt("Copie o link da despedida:", url);
      }
      campo.remove();
    }
  };

  const compartilharNativo = async () => {
    try {
      await navigator.share({ title: `Velório de ${nome}`, text: mensagem, url });
    } catch {
      /* A pessoa fechou a folha de compartilhamento. Não é erro. */
    }
  };

  return (
    <div className="mt-6 border-t border-linha pt-5">
      <p className="text-[0.875rem] text-pedra-600">
        Avisar quem precisa saber. O link abre com o local e o horário já visíveis.
      </p>

      <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(mensagem)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mat-zap inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-serra px-5 text-[1.0625rem] font-semibold text-white transition-[filter] hover:brightness-105"
        >
          <IconeWhatsApp className="size-5 shrink-0" />
          Enviar no WhatsApp
        </a>

        <button
          type="button"
          onClick={temNativo ? compartilharNativo : copiar}
          aria-live="polite"
          className="inline-flex min-h-[3.25rem] flex-1 items-center justify-center gap-2.5 rounded-serra border border-serra-300 bg-white px-5 text-[1.0625rem] font-semibold text-serra-700 transition-colors hover:border-serra-500"
        >
          {copiado ? (
            <>
              <IconeConfere className="size-5 shrink-0 text-verde-forte" />
              Link copiado
            </>
          ) : (
            <>
              <IconeLink className="size-5 shrink-0" />
              {temNativo ? "Outros apps" : "Copiar link"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
