"use client";

import { usePathname } from "next/navigation";
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
/* ⛔ OS OBSERVADORES PRECISAM RENASCER A CADA ROTA.
 *
 * Estes componentes vivem no LAYOUT, que o App Router NÃO remonta quando a
 * pessoa navega por um link: só o conteúdo do `<main>` troca. Com a lista de
 * dependências vazia, o `querySelectorAll` rodava uma única vez, na primeira
 * carga, e os elementos da página seguinte nunca eram observados. Resultado:
 * quem chegava ao obituário pelo menu via metade das seções em branco, e só
 * um F5 resolvia, porque aí o layout remontava.
 *
 * Era exatamente o sintoma relatado: "às vezes não carrega por completo, tem
 * que dar F5". Não era carregamento, era observador cego.
 *
 * `usePathname()` na dependência faz o efeito se refazer a cada rota. O
 * `MutationObserver` cobre o resto: conteúdo que aparece SEM mudar de rota,
 * como a lista de unidades que expande ao clicar em "ver as outras 7".
 */
  const rota = usePathname();

  useEffect(() => {
    const raiz = document.documentElement;
    const semMovimento = document.documentElement.dataset.movimento === "reduzido";
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

    /* ⛔ REDE DE SEGURANCA QUE NAO DEPENDE DE ROLAGEM NEM DE TEMPO CERTO.
     *
     * O defeito relatado era "a pagina as vezes nao carrega por completo, tem
     * que dar F5", e o caso que o reproduziu foi o BOTAO VOLTAR: ao retornar
     * para a home, os DEZESSEIS blocos ficavam com opacidade 0. A causa e uma
     * corrida: o App Router troca a rota (e este efeito re-executa) num
     * instante em que o `<main>` ainda nao tem o conteudo novo, entao o
     * `querySelectorAll` observa uma lista vazia e a restauracao de rolagem
     * acontece depois de tudo.
     *
     * Tentar acertar o instante certo e perder: cada navegacao tem um timing.
     * Entao nao se aposta em instante nenhum. Varre-se algumas vezes ao longo
     * do primeiro segundo e meio, e tambem quando a rolagem para, quando a
     * pagina volta do cache do navegador e quando o historico muda.
     *
     * Uma varredura custa um `getBoundingClientRect` por bloco pendente, e
     * blocos ja revelados saem da conta. Ou seja: cinco varreduras de uma
     * pagina inteira custam menos que um unico quadro de rolagem.
     */
    const varrer = () => {
      const pendentes = document.querySelectorAll<HTMLElement>(
        "[data-revela]:not([data-visivel])"
      );
      for (const alvo of pendentes) {
        if (alvo.getBoundingClientRect().top < window.innerHeight * 0.95) {
          revelar(alvo);
        } else {
          observador.observe(alvo);
        }
      }
    };

    /* A primeira varredura e imediata; as outras cobrem a restauracao de
       rolagem, a hidratacao e o conteudo que chega depois. */
    const relogios = [0, 120, 350, 700, 1500].map((atraso) =>
      window.setTimeout(varrer, atraso)
    );

    /* ⛔ SEGURO DE VIDA: 2,5s DEPOIS, TUDO APARECE, DOU O QUE DER.
     *
     * O dono relatou que a pagina "as vezes nao carrega por completo, so
     * algumas secoes, e precisa de F5". Nao consegui reproduzir: nem local, nem
     * em producao com 3G lento, nem por link, ancora ou botao voltar. Em toda
     * medicao, nada que estivesse NA TELA ficou escondido.
     *
     * Nao reproduzir nao e o mesmo que nao existir. E quando o efeito de um
     * defeito e "sumiu conteudo de um site de funeraria", cacar a causa exata
     * antes de estancar o sangramento e a ordem errada de fazer as coisas.
     *
     * Entao este temporizador apaga a CLASSE inteira de problema: passados
     * 2,5s da montagem, todo bloco pendente que esteja ATE UMA TELA E MEIA
     * abaixo da dobra aparece, sem depender de observador, de rolagem ou de
     * rota.
     *
     * ⛔ A primeira versao revelava TUDO, a pagina inteira, e isso era um erro
     * meu de projeto: em 2,5s a home inteira ficava visivel e a revelacao ao
     * rolar deixava de existir para todo mundo. O seguro cobriria o defeito
     * matando o efeito. A margem de uma tela e meia e o meio-termo honesto:
     * cobre qualquer bloco que a pessoa consiga alcancar sem rolar de verdade,
     * e deixa o resto para o observador, que e quem deve trabalhar.
     */
    const seguro = window.setTimeout(() => {
      const limite = window.innerHeight * 1.5;
      for (const alvo of document.querySelectorAll<HTMLElement>(
        "[data-revela]:not([data-visivel])"
      )) {
        if (alvo.getBoundingClientRect().top < limite) alvo.dataset.visivel = "1";
      }
    }, 2500);
    relogios.push(seguro);

    let ocioso = 0;
    const aoRolar = () => {
      window.clearTimeout(ocioso);
      ocioso = window.setTimeout(varrer, 160);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("pageshow", varrer);
    window.addEventListener("popstate", varrer);

    /* E o conteúdo que nasce SEM troca de rota, como a lista de unidades que
       abre ao clicar em "ver as outras 7". O observador de mutação não decide
       nada sozinho: ele só avisa que apareceu gente nova e manda varrer. */
    const mutacoes = new MutationObserver(() => {
      window.clearTimeout(ocioso);
      ocioso = window.setTimeout(varrer, 80);
    });
    mutacoes.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("pageshow", varrer);
      window.removeEventListener("popstate", varrer);
      window.clearTimeout(ocioso);
      for (const r of relogios) window.clearTimeout(r);
      mutacoes.disconnect();
      observador.disconnect();
      raiz.classList.remove("js-revela");
    };
  }, [rota]);

  return null;
}
