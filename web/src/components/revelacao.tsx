"use client";

import { useEffect } from "react";

/**
 * Revelacao no scroll.
 *
 * Um unico componente cliente para a pagina inteira: as secoes continuam
 * renderizadas no servidor e so marcam `data-revela`. O estado escondido e
 * aplicado por CSS SOMENTE depois que este componente confirma que vai
 * observar (classe `js-revela` no <html>), entao uma pagina sem JS, ou com o
 * JS falhando, nunca fica com conteudo invisivel. Isso importa mais aqui do
 * que na media: quem abre este site pode estar em conexao ruim, de madrugada.
 *
 * Respeita `prefers-reduced-motion`: nesse caso nem liga a classe.
 */
export function Revelacao() {
  useEffect(() => {
    const raiz = document.documentElement;
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semMovimento || !("IntersectionObserver" in window)) return;

    raiz.classList.add("js-revela");

    const alvos = document.querySelectorAll<HTMLElement>("[data-revela]");

    /**
     * ⛔ Defeito encontrado ao FORCAR a deteccao, nao ao olhar a tela: com um
     * salto instantaneo ate o fim da pagina (Ctrl+End, link com ancora, botao
     * "ir para o rodape"), 7 dos 9 blocos ficavam com opacidade 0 para sempre,
     * porque nunca chegaram a INTERSECTAR nada. Revelar so quem entra na tela
     * nao basta: quem JA PASSOU tambem tem que aparecer. Por isso o teste do
     * `top < innerHeight`, que cobre os dois casos de uma vez.
     */
    const revelar = (el: HTMLElement) => {
      el.dataset.visivel = "1";
      observador.unobserve(el);
    };

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting || e.boundingClientRect.top < window.innerHeight) {
            revelar(e.target as HTMLElement);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    for (const alvo of alvos) {
      // O que ja esta na tela no primeiro paint nao anima: animar o que a
      // pessoa ja esta lendo e piscada, nao revelacao.
      if (alvo.getBoundingClientRect().top < window.innerHeight * 0.9) {
        alvo.dataset.visivel = "1";
        continue;
      }
      observador.observe(alvo);
    }

    /* Rede de seguranca: se por qualquer motivo um bloco ficar escondido
       (aba em segundo plano na hora do salto, observador estrangulado), ele
       aparece assim que a rolagem para. Conteudo invisivel nunca e aceitavel. */
    const varrer = () => {
      for (const alvo of alvos) {
        if (alvo.dataset.visivel === "1") continue;
        if (alvo.getBoundingClientRect().top < window.innerHeight) revelar(alvo);
      }
    };
    let ocioso = 0;
    const aoRolar = () => {
      window.clearTimeout(ocioso);
      ocioso = window.setTimeout(varrer, 160);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });

    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.clearTimeout(ocioso);
      observador.disconnect();
      raiz.classList.remove("js-revela");
    };
  }, []);

  return null;
}
