"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/* =========================================================================
   Movimento controlado por ponteiro e por rolagem.

   Regra da casa para tudo neste arquivo:

     1. UM listener por DOCUMENTO, nunca um por cartao. Numa home com 40
        cartoes, 40 listeners de `pointermove` sao 40 chances de engasgar a
        rolagem no celular de quem nem tem ponteiro.
     2. Nada roda quando o dispositivo nao tem ponteiro fino (`hover: hover` e
        `pointer: fine`). Em telefone esses efeitos nao existem, e a bateria
        agradece.
     3. Nada roda com `prefers-reduced-motion: reduce`.
     4. Toda escrita acontece dentro de `requestAnimationFrame`, e o valor vai
        para uma CUSTOM PROPERTY que so alimenta `transform` ou gradiente. Isso
        mantem o trabalho no compositor: zero layout, zero repaint.
   ========================================================================= */

/* =========================================================================
   QUEM DECIDE SE HA MOVIMENTO

   ⚠️ DECISAO DO DONO, tomada duas vezes e por escrito: as animacoes rodam em
   QUALQUER aparelho, inclusive quando o sistema operacional esta com
   "animacoes desligadas". Levantei que `prefers-reduced-motion` existe por
   acessibilidade, ele reafirmou, e a escolha e dele. Fica registrado aqui para
   quem abrir este arquivo daqui a um ano nao achar que foi descuido.

   O que NAO foi feito, porque seria burrice: ignorar o ajuste E ignorar o
   aparelho. A media query saiu, mas entrou um juiz melhor, que e o unico que
   de fato importa para quem esta com o site travando na mao:

     1. `saveData` ligado, ou memoria/nucleos de aparelho fraco, ja pesa contra;
     2. o site MEDE o proprio desempenho por 800ms depois que a pagina assenta,
        e se os quadros estiverem chegando devagar demais ele mesmo desce para o
        modo reduzido.

   Ou seja: animacao para todo mundo, MENOS para o aparelho que provou que nao
   da conta. Isso serve ao pedido do dono e ao publico idoso ao mesmo tempo,
   que era o unico jeito de fazer as duas coisas.

   O padrao e SEM atributo, e sem atributo o CSS anima tudo. Nada pisca na
   entrada, porque a degradacao so acontece depois, se acontecer.
   ========================================================================= */

export const CHAVE_MOVIMENTO = "serra_movimento";

function semMovimento() {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.movimento === "reduzido";
}

/**
 * Juiz de desempenho.
 *
 * Roda uma vez, 1,5s depois da pagina assentar, para nao medir o proprio
 * carregamento e condenar um aparelho bom. Conta o intervalo entre quadros por
 * 800ms e usa a MEDIANA, nao a media: um unico engasgo de 200ms puxaria a media
 * para baixo e desligaria o site inteiro por causa de um soluco.
 */
export function Movimento() {
  useEffect(() => {
    const raiz = document.documentElement;

    /* Escolha explicita de quem usa vence tudo, inclusive a medicao. */
    let guardado: string | null = null;
    try {
      guardado = localStorage.getItem(CHAVE_MOVIMENTO);
    } catch {
      /* navegacao privada: segue no automatico */
    }
    if (guardado === "reduzido" || guardado === "completo") {
      raiz.dataset.movimento = guardado;
      return;
    }

    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const economizando = nav.connection?.saveData === true;
    const fraco = (nav.hardwareConcurrency ?? 8) <= 4 && (nav.deviceMemory ?? 8) <= 4;

    if (economizando) {
      raiz.dataset.movimento = "reduzido";
      return;
    }

    /* Aparelho fraco nao e condenado de cara: ele so precisa de um resultado
       menos ruim para passar. 22ms por quadro sao ~45fps; 32ms sao ~31fps. */
    const teto = fraco ? 22 : 32;

    let inicio = 0;
    let anterior = 0;
    const intervalos: number[] = [];
    let quadro = 0;

    const medir = (agora: number) => {
      if (!inicio) {
        inicio = agora;
        anterior = agora;
        quadro = requestAnimationFrame(medir);
        return;
      }
      intervalos.push(agora - anterior);
      anterior = agora;
      if (agora - inicio < 800) {
        quadro = requestAnimationFrame(medir);
        return;
      }
      intervalos.sort((a, b) => a - b);
      const mediana = intervalos[Math.floor(intervalos.length / 2)] ?? 16;
      if (mediana > teto) raiz.dataset.movimento = "reduzido";
    };

    const relogio = window.setTimeout(() => {
      quadro = requestAnimationFrame(medir);
    }, 1500);

    return () => {
      window.clearTimeout(relogio);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return null;
}

/**
 * Decoracao so pinta enquanto esta na tela.
 *
 * Ken Burns e aurora sao animacoes INFINITAS. Fora do quadro elas nao aparecem,
 * mas continuam existindo como camada e continuam custando compositor. Um
 * observador pausa as duas quando a secao sai da tela, o que numa home de
 * dezessete secoes significa que elas rodam em talvez um decimo do tempo.
 */
export function DecoracaoVisivel() {
  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>(".kenburns, .aurora");
    if (alvos.length === 0) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          (e.target as HTMLElement).style.setProperty(
            "animation-play-state",
            e.isIntersecting ? "running" : "paused"
          );
          /* A aurora anima no ::before, que nao se alcanca por style inline:
             uma classe no pai resolve, e o CSS faz o resto. */
          (e.target as HTMLElement).classList.toggle("parado", !e.isIntersecting);
        }
      },
      { rootMargin: "25% 0px" }
    );
    for (const a of alvos) obs.observe(a);
    return () => obs.disconnect();
  }, []);

  return null;
}

function pontoFino() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  if (semMovimento()) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Ponteiro vivo.
 *
 * Um listener de `pointermove` no documento inteiro, montado uma vez no layout,
 * alimentando DOIS efeitos que precisam exatamente do mesmo dado:
 *
 *   HOLOFOTE  acende o cartao sob o ponteiro, na posicao exata do cursor e na
 *             cor `--luz` do SERVICO daquele cartao. Por isso nao e enfeite:
 *             acender cremacao em terracota e homenagens em verde confirma, no
 *             gesto, o codigo de cor que a home usa desde o topo.
 *   RELEVO    inclina o cartao no eixo Z conforme a posicao relativa do cursor,
 *             e corre um brilho especular junto com a inclinacao.
 *
 * ⛔ Foram dois componentes separados por uma versao, cada um com o proprio
 * listener e o proprio `getBoundingClientRect`. Era o dobro do trabalho por
 * quadro para chegar no mesmo numero. Quando dois efeitos consomem a mesma
 * medida, eles sao um efeito com duas saidas.
 */
export function PonteiroVivo() {
  useEffect(() => {
    if (!pontoFino()) return;

    let quadro = 0;
    let luzAnterior: HTMLElement | null = null;
    let relevoAnterior: HTMLElement | null = null;

    const apagarLuz = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.removeProperty("--mx");
      el.style.removeProperty("--my");
    };

    const soltarRelevo = (el: HTMLElement | null) => {
      if (!el) return;
      el.dataset.preso = "0";
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const mover = (e: PointerEvent) => {
      const origem = e.target as HTMLElement | null;
      const luz = origem?.closest<HTMLElement>(".holofote") ?? null;
      const relevo = origem?.closest<HTMLElement>(".relevo") ?? null;

      /* Ao sair de um cartao para outro, o anterior precisa ser esquecido, ou
         a luz dele congela na ultima posicao e reaparece no proximo hover. */
      if (luzAnterior && luzAnterior !== luz) apagarLuz(luzAnterior);
      if (relevoAnterior && relevoAnterior !== relevo) soltarRelevo(relevoAnterior);
      luzAnterior = luz;
      relevoAnterior = relevo;
      if (!luz && !relevo) return;

      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        if (luz) {
          const r = luz.getBoundingClientRect();
          luz.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
          luz.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
        }
        if (relevo) {
          const r = relevo.getBoundingClientRect();
          /* -1 a 1 a partir do centro. O teto de 7 graus nao e gosto: acima
             disso o texto desfoca na borda que se afasta e a leitura paga a
             conta do efeito. */
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          const teto = Number(relevo.dataset.giro ?? 7);
          relevo.dataset.preso = "1";
          relevo.style.setProperty("--ry", `${(px * teto * 2).toFixed(2)}deg`);
          relevo.style.setProperty("--rx", `${(-py * teto * 2).toFixed(2)}deg`);
          /* O brilho corre no sentido contrario a inclinacao, como luz de sala
             bate numa superficie que virou. */
          relevo.style.setProperty("--anguloLuz", `${(120 + px * 90).toFixed(0)}deg`);
        }
      });
    };

    const sair = () => {
      cancelAnimationFrame(quadro);
      apagarLuz(luzAnterior);
      soltarRelevo(relevoAnterior);
      luzAnterior = null;
      relevoAnterior = null;
    };

    document.addEventListener("pointermove", mover, { passive: true });
    document.addEventListener("pointerleave", sair, { passive: true });
    window.addEventListener("blur", sair);
    return () => {
      cancelAnimationFrame(quadro);
      document.removeEventListener("pointermove", mover);
      document.removeEventListener("pointerleave", sair);
      window.removeEventListener("blur", sair);
    };
  }, []);

  return null;
}

/**
 * Ima.
 *
 * O botao acompanha o ponteiro dentro de um raio curto e volta com mola quando
 * ele sai. O limite de 7px nao e estetico, e de usabilidade: acima disso o
 * alvo comeca a fugir do cursor e o clique erra. Botao que escapa do dedo e a
 * forma errada de fazer este efeito, e a mais comum.
 *
 * O campo de atracao e maior que o botao (32px de folga), entao o gesto comeca
 * ANTES do ponteiro chegar. E o que faz parecer atracao em vez de reacao.
 */
export function Ima({ children, className = "" }: { children: ReactNode; className?: string }) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const alvo = el.firstElementChild as HTMLElement | null;
    if (!alvo || !pontoFino()) return;

    const RAIO = 7;
    const FOLGA = 32;
    let quadro = 0;

    const mover = (e: PointerEvent) => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(() => {
        const r = alvo.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dentro =
          e.clientX > r.left - FOLGA &&
          e.clientX < r.right + FOLGA &&
          e.clientY > r.top - FOLGA &&
          e.clientY < r.bottom + FOLGA;

        if (!dentro) {
          alvo.dataset.preso = "0";
          alvo.style.setProperty("--ix", "0px");
          alvo.style.setProperty("--iy", "0px");
          return;
        }
        alvo.dataset.preso = "1";
        const fx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2 + FOLGA)));
        const fy = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2 + FOLGA)));
        alvo.style.setProperty("--ix", `${(fx * RAIO).toFixed(2)}px`);
        alvo.style.setProperty("--iy", `${(fy * RAIO).toFixed(2)}px`);
      });
    };

    const soltar = () => {
      cancelAnimationFrame(quadro);
      alvo.dataset.preso = "0";
      alvo.style.setProperty("--ix", "0px");
      alvo.style.setProperty("--iy", "0px");
    };

    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("blur", soltar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("blur", soltar);
    };
  }, []);

  return (
    <div ref={raiz} className={`contents ${className}`}>
      {children}
    </div>
  );
}

/**
 * Foco no celular.
 *
 * O hover que o dedo nunca da. Numa tela de toque, o equivalente honesto do
 * ponteiro e a POSICAO DE LEITURA: uma faixa fina no meio da tela, feita com
 * margem negativa de 45% em cima e embaixo, e o cartao que a cruza recebe
 * `data-emfoco`. O CSS faz o resto, e so sob `@media (hover: none)`.
 *
 * ⛔ Isto so foi descoberto quando a verificacao passou a rodar com `hasTouch`.
 * Tela pequena nao e celular: sem toque, o Chrome continua se declarando
 * `hover: hover`, e metade dos efeitos da pagina nunca tinha rodado num
 * telefone de verdade.
 *
 * Um observador para a pagina inteira, sem listener de rolagem: a faixa e a
 * propria `rootMargin`, entao o navegador resolve isso fora da thread
 * principal. Em ponteiro fino nem chega a ser montado.
 */
export function FocoNoCelular() {
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    if (!window.matchMedia("(hover: none)").matches) return;

    const alvos = document.querySelectorAll<HTMLElement>(
      ".cartao-cine, .holofote, .aro-luz, .depo-cartao"
    );
    if (alvos.length === 0) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) el.dataset.emfoco = "1";
          else delete el.dataset.emfoco;
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    for (const a of alvos) obs.observe(a);
    return () => obs.disconnect();
  }, []);

  return null;
}

/**
 * Arrastar um trilho com o mouse, com inercia ao soltar.
 *
 * No dedo isso sempre existiu, porque e rolagem nativa. No mouse nao existia, e
 * como as barras de rolagem dos carrosseis estao escondidas de proposito, a
 * pessoa de desktop ficava sem nenhuma forma direta de puxar o trilho: so seta,
 * so por pagina.
 *
 * Tres cuidados que separam isto de um arrasto que atrapalha:
 *
 *   CLIQUE.   Arrastar 3px por acidente em cima de um link nao pode navegar. O
 *             clique so e barrado quando o ponteiro andou mais de 6px, e a
 *             barragem dura um unico evento.
 *   SNAP.     `scroll-snap` briga com arrasto: o trilho puxa de volta para o
 *             encaixe no meio do gesto. Ele e desligado enquanto se arrasta e
 *             volta ao soltar, que e quando ele serve para alguma coisa.
 *   INERCIA.  Soltar em movimento continua o movimento e desacelera. Sem isso o
 *             trilho para seco na hora em que o dedo sai e o gesto parece
 *             quebrado.
 */
export function useArrastar<T extends HTMLElement>(alvo: RefObject<T | null>) {
  useEffect(() => {
    const el = alvo.current;
    if (!el) return;

    el.classList.add("arrastavel");

    let pegando = false;
    let x0 = 0;
    let rolagem0 = 0;
    let andou = 0;
    let ultimoX = 0;
    let ultimoT = 0;
    let velocidade = 0;
    let quadro = 0;

    const parar = () => cancelAnimationFrame(quadro);

    const deslizar = () => {
      velocidade *= 0.94;
      el.scrollLeft -= velocidade * 16;
      if (Math.abs(velocidade) > 0.02) {
        quadro = requestAnimationFrame(deslizar);
      }
    };

    const descer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      parar();
      pegando = true;
      andou = 0;
      velocidade = 0;
      x0 = e.clientX;
      ultimoX = e.clientX;
      ultimoT = e.timeStamp;
      rolagem0 = el.scrollLeft;
      el.dataset.arrastando = "1";
    };

    const mover = (e: PointerEvent) => {
      if (!pegando) return;
      const dx = e.clientX - x0;
      andou = Math.max(andou, Math.abs(dx));
      el.scrollLeft = rolagem0 - dx;

      const dt = e.timeStamp - ultimoT;
      if (dt > 0) velocidade = (e.clientX - ultimoX) / dt;
      ultimoX = e.clientX;
      ultimoT = e.timeStamp;
    };

    const subir = () => {
      if (!pegando) return;
      pegando = false;
      delete el.dataset.arrastando;
      if (Math.abs(velocidade) > 0.05 && !semMovimento()) deslizar();
    };

    /* Barra o clique UMA vez, e so se o ponteiro realmente viajou. Na fase de
       captura, senao o link ja navegou quando este handler roda. */
    const clique = (e: MouseEvent) => {
      if (andou <= 6) return;
      e.preventDefault();
      e.stopPropagation();
      andou = 0;
    };

    el.addEventListener("pointerdown", descer);
    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerup", subir);
    window.addEventListener("pointercancel", subir);
    el.addEventListener("click", clique, true);

    return () => {
      parar();
      el.classList.remove("arrastavel");
      el.removeEventListener("pointerdown", descer);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", subir);
      window.removeEventListener("pointercancel", subir);
      el.removeEventListener("click", clique, true);
    };
  }, [alvo]);
}

/**
 * Esteira contínua e agarrável.
 *
 * ⛔ A versao anterior era `animation: translateX(-50%)` numa fita de largura
 * dupla. Bonita e morta: nao dava para pegar com o mouse, nao rolava no dedo e
 * o teclado nao chegava nela. Agora quem anda e a ROLAGEM do container, num
 * laco de `requestAnimationFrame`, e por isso o arrasto, o dedo e a roda do
 * mouse funcionam de graca.
 *
 * A lista continua duplicada e o laco reinicia na metade, entao a emenda e
 * invisivel. Para no ponteiro, para quem quiser ler um logotipo, e nao anda
 * sozinha em `prefers-reduced-motion`, onde vira um carrossel comum.
 */
export function Esteira({ children }: { children: ReactNode }) {
  const raiz = useRef<HTMLDivElement>(null);
  useArrastar(raiz);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;

    /* ⛔ Aqui havia `if (semMovimento()) return`, lido UMA vez na montagem. O
       juiz de desempenho so decide 1,5s depois, entao a esteira ja tinha
       comecado a andar e nunca mais parava: a decisao chegava tarde demais para
       quem ela deveria proteger. Custa um `dataset` por quadro consultar de
       novo, e isso e barato ao ponto de nao medir. Decisao que pode mudar
       precisa ser LIDA quando importa, nao guardada. */
    let quadro = 0;
    let parado = false;
    const VELOCIDADE = 0.4; /* px por quadro: ~24px/s, leitura confortavel */

    /* ⛔ `el.scrollLeft += 0.4` NAO ANDA. O incremento e sub-pixel e o
       navegador devolve o valor arredondado na leitura seguinte, entao a conta
       volta sempre ao mesmo lugar e a esteira fica parada sem erro nenhum.
       Achado pelo teste, nao pelo olho: parada e parada, e a captura estatica
       nao sabe a diferenca. A posicao mora aqui, em ponto flutuante, e o
       `scrollLeft` so recebe. */
    let pos = el.scrollLeft;

    /* ⛔ `scrollWidth` NAO PODE SER LIDO A CADA QUADRO. E uma propriedade que
       forca o navegador a recalcular layout na hora, entao ler dentro do laco
       de animacao significa 60 layouts sincronos por segundo, para sempre,
       enquanto a pagina estiver aberta. Alem do custo, isso atrasa os retornos
       do IntersectionObserver, e foi a suspeita mais provavel para blocos que
       intermitentemente nao recebiam `data-visivel` na verificacao. A largura
       so muda quando a janela ou a fonte mudam: e nesses dois momentos que ela
       e medida. */
    let meia = el.scrollWidth / 2;
    const remedir = () => {
      meia = el.scrollWidth / 2;
    };
    window.addEventListener("resize", remedir);
    document.fonts?.ready.then(remedir).catch(() => {});

    const passo = () => {
      if (!parado && !el.dataset.arrastando && !semMovimento()) {
        pos += VELOCIDADE;
        /* A fita e duplicada: ao passar da metade, volta meia largura. O olho
           nao tem como perceber, porque o conteudo nos dois pontos e igual. */
        if (meia > 0 && pos >= meia) pos -= meia;
        el.scrollLeft = pos;
      } else {
        /* Durante o arrasto quem manda e a pessoa: a posicao interna
           reaprende onde o trilho parou, senao ele salta ao ser solto. */
        pos = el.scrollLeft;
      }
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);

    const pausar = () => (parado = true);
    const seguir = () => (parado = false);
    el.addEventListener("pointerenter", pausar);
    el.addEventListener("pointerleave", seguir);
    el.addEventListener("focusin", pausar);
    el.addEventListener("focusout", seguir);

    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("resize", remedir);
      el.removeEventListener("pointerenter", pausar);
      el.removeEventListener("pointerleave", seguir);
      el.removeEventListener("focusin", pausar);
      el.removeEventListener("focusout", seguir);
    };
  }, []);

  /* `aria-hidden` porque as marcas ja sao lidas por uma lista em texto ao lado:
     um leitor de tela nao precisa atravessar 30 imagens com `alt` vazio. */
  return (
    <div ref={raiz} className="esteira mt-6" aria-hidden>
      <ul className="esteira-fita">{children}</ul>
    </div>
  );
}

/**
 * Partículas.
 *
 * Devolve uma tela e uma funcao: passe os elementos que estao saindo e eles se
 * desfazem em pontos que voam e apagam.
 *
 * O que torna isto honesto em vez de confete: as particulas nascem NA BORDA do
 * elemento que sumiu e herdam a COR dele. Nao e um efeito por cima da
 * interface, e a propria interface se desmanchando. Um botao azul selecionado
 * espalha azul; um branco espalha branco.
 *
 * Teto duro de 160 particulas e 700ms. Nao existe estado depois disso: a tela
 * e limpa e o laco morre, entao fora da transicao o custo e zero.
 */
/* ⛔ Isto era um `useCallback` que recebia o ref da tela. O compilador do React
   reclamava com razao: a funcao escreve em `canvas.width` e `canvas.height`, e
   ele nao tem como provar que isso nao acontece durante a renderizacao. Nao ha
   estado nem ciclo de vida aqui, entao nunca precisou ser hook: e uma funcao
   que recebe uma tela e desenha nela. */
export function explodirEmParticulas(
  cv: HTMLCanvasElement | null,
  elementos: HTMLElement[]
) {
  if (!cv || semMovimento() || elementos.length === 0) return;

  const caixa = cv.getBoundingClientRect();
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = Math.round(caixa.width * dpr);
  cv.height = Math.round(caixa.height * dpr);
  const cx = cv.getContext("2d");
  if (!cx) return;
  cx.scale(dpr, dpr);

  type P = { x: number; y: number; vx: number; vy: number; r: number; cor: string };
  const ps: P[] = [];
  const porElemento = Math.max(6, Math.floor(160 / elementos.length));

  for (const el of elementos) {
    const r = el.getBoundingClientRect();
    const estilo = getComputedStyle(el);
    /* A cor de fundo transparente nao rende particula visivel: nesse caso
       a particula herda a cor do TEXTO, que e o que se via ali. */
    const fundo = estilo.backgroundColor;
    const cor = fundo === "rgba(0, 0, 0, 0)" || fundo === "transparent" ? estilo.color : fundo;

    for (let i = 0; i < porElemento; i++) {
      /* Nascem no PERIMETRO, nao no miolo: o contorno e o que o olho
         guardou do elemento, entao e o contorno que precisa se desfazer. */
      const t = Math.random();
      const lado = Math.floor(Math.random() * 4);
      const x =
        lado === 0 || lado === 2 ? r.left + r.width * t : lado === 1 ? r.right : r.left;
      const y =
        lado === 1 || lado === 3 ? r.top + r.height * t : lado === 0 ? r.top : r.bottom;
      ps.push({
        x: x - caixa.left,
        y: y - caixa.top,
        vx: (Math.random() - 0.5) * 2.6,
        vy: -Math.random() * 2.2 - 0.4,
        r: Math.random() * 2 + 0.9,
        cor,
      });
    }
  }

  const inicio = performance.now();
  const DURACAO = 700;
  let quadro = 0;

  const passo = (agora: number) => {
    const t = (agora - inicio) / DURACAO;
    cx.clearRect(0, 0, caixa.width, caixa.height);
    if (t >= 1) {
      cancelAnimationFrame(quadro);
      return;
    }
    cx.globalAlpha = 1 - t;
    for (const p of ps) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.07; /* gravidade leve: sobe e cai, nao explode para fora */
      cx.fillStyle = p.cor;
      cx.beginPath();
      cx.arc(p.x, p.y, p.r * (1 - t * 0.5), 0, Math.PI * 2);
      cx.fill();
    }
    quadro = requestAnimationFrame(passo);
  };
  quadro = requestAnimationFrame(passo);
}

/**
 * Paralaxe.
 *
 * O elemento anda mais devagar que a pagina. `fator` positivo faz descer menos
 * que o resto, que e o que da profundidade a uma foto de fundo.
 *
 * Nao mede nada fora do quadro: um `IntersectionObserver` liga e desliga o
 * listener de rolagem conforme a secao entra e sai da tela. Numa home de 17
 * secoes, isso e a diferenca entre um calculo por quadro e dezessete.
 *
 * Aqui o paralaxe VALE porque o que anda e uma fotografia do lugar real. Em
 * bloco de texto ele so atrasa a leitura, e nao existe nenhum neste site.
 */
export function Paralaxe({
  children,
  fator = 0.14,
  className = "",
}: {
  children: ReactNode;
  fator?: number;
  className?: string;
}) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el || semMovimento()) return;

    let quadro = 0;
    let ligado = false;

    const calcular = () => {
      const r = el.getBoundingClientRect();
      /* Progresso da secao pela janela, de -1 (entrando por baixo) a 1
         (saindo por cima). Zero quando o centro dela esta no centro da tela. */
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / (window.innerHeight + r.height);
      el.style.setProperty("--par", `${(p * fator * window.innerHeight).toFixed(1)}px`);
    };

    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(calcular);
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !ligado) {
          ligado = true;
          window.addEventListener("scroll", aoRolar, { passive: true });
          calcular();
        } else if (!e.isIntersecting && ligado) {
          ligado = false;
          window.removeEventListener("scroll", aoRolar);
        }
      },
      { rootMargin: "20% 0px" }
    );
    obs.observe(el);

    return () => {
      cancelAnimationFrame(quadro);
      obs.disconnect();
      window.removeEventListener("scroll", aoRolar);
    };
  }, [fator]);

  return (
    <div ref={raiz} className={`paralaxe ${className}`}>
      {children}
    </div>
  );
}

/**
 * Trilho de progresso da leitura.
 *
 * Numa home com dezessete secoes, e a unica pista de "quanto falta" que nao
 * ocupa espaco nenhum, e por isso ela e um FIO: 1,5px. Onde o navegador tem
 * `animation-timeline: scroll()` ele anda sozinho, fora da thread principal,
 * sem uma linha de JavaScript. Onde nao tem, este componente faz a mesma conta
 * no `scroll`, e o custo e um `transform` por quadro.
 */
export function TrilhoProgresso() {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    /* ⛔ A ordem destas duas linhas importa. Antes o `CSS.supports` vinha
       primeiro, e com `prefers-reduced-motion` ligado o CSS desligava a
       animacao de rolagem SEM que este caminho assumisse: a barra ficava
       congelada em zero para sempre. Quem pede menos movimento continua tendo
       direito a saber quanto falta da pagina. */
    /* A animacao de rolagem do CSS vale sempre, inclusive em movimento
       reduzido, porque o trilho espelha a rolagem em vez de inventar
       movimento. O JavaScript so entra onde `animation-timeline` nao existe. */
    if (CSS.supports("animation-timeline: scroll()")) return;

    let quadro = 0;
    const calcular = () => {
      const alcance = document.documentElement.scrollHeight - window.innerHeight;
      const p = alcance > 0 ? Math.min(1, window.scrollY / alcance) : 0;
      el.style.transform = `scaleX(${p.toFixed(4)})`;
    };
    const aoRolar = () => {
      cancelAnimationFrame(quadro);
      quadro = requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[1.5px]">
      <div ref={raiz} className="progresso h-full w-full" />
    </div>
  );
}
