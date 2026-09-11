# GRUPO SERRA — manual do repositório

Site novo do **Grupo Serra Funerárias**, Campinas/SP. Substitui `gruposerra.com.br`, que roda em
OctoberCMS num nginx de 2019 e não mede nada desde julho de 2023.

Este arquivo tem duas metades e elas servem a coisas diferentes:

- **Partes 0 a 3: como se trabalha aqui.** Regras, sistema de design, comandos de verificação e as
  armadilhas que já custaram rodada. É o que um agente precisa ler antes de tocar em qualquer linha.
- **Partes 4 a 8: o que se sabe sobre a empresa.** Dossiê levantado em 02/09/2026 por varredura do
  site antigo, consulta à Receita Federal e busca pública. Cada bloco diz **de onde veio o dado**.
  O que não foi confirmado está marcado `⚠️ NÃO CONFIRMADO` e **não vira texto no site** sem alguém
  do cliente validar.

Companheiros deste arquivo: `PRODUCT.md` (verdade de produto, usuários e princípios) e `README.md`
(como rodar, para humano).

---

## 0. LEIA ISTO PRIMEIRO

### 0.1 Conflito de interesse

> 🔴 O Grupo Serra é **concorrente direto do Florees** em Campinas: mesmo produto, mesma praça,
> mesmo tipo de cliente. **Não traga número, carteira, preço, script de venda, régua de cobrança ou
> qualquer dado interno do Florees para cá, nem o contrário.** Os dois projetos vivem em pastas
> separadas por esse motivo. Aprender com a ESTRUTURA pública do site deles é legítimo e está
> documentado onde acontece; copiar dado interno, não.

### 0.2 As sete regras inegociáveis

1. **Nada de número inventado.** Carência, limite de idade, reajuste, quantidade de associados,
   faturamento, ano de fundação. Se o cliente não confirmou, ou a interface **declara a lacuna**
   (componente `Pendencia`) ou o assunto não aparece. Omitir carência em página de venda de plano
   funerário é problema de Procon, não detalhe de design. Ver parte 7.
2. **Conteúdo nunca fica invisível.** Toda animação de entrada enriquece; nenhuma esconde. O estado
   inicial escondido só existe sob `html.js-revela`, classe que só o componente `Revelacao` liga
   depois de confirmar que vai observar. Sem JavaScript, em 3G ruim, de madrugada, a página inteira
   continua legível. Isso não é preferência, é o caso de uso principal.
3. **O telefone de 24 horas é o primeiro elemento acionável da página** e fica ao alcance do polegar
   em qualquer ponto de rolagem no celular.
4. **`prefers-reduced-motion: reduce` tira a ANIMAÇÃO, nunca a MUDANÇA DE ESTADO.** É a regra mais
   fácil de errar do projeto, e ela já foi errada aqui duas vezes. O ajuste pede menos **movimento**:
   o que enjoa é deslocamento, escala, rotação, paralaxe e zoom, não um fade de 200ms nem uma troca
   de cor. Então a lista de propriedades que ainda transicionam é **branca** (opacidade, cor, fundo,
   borda, sombra, filtro) e `transform` fica de fora, o que mata toda translação, giro e escala de
   uma vez. O ano aceso continua aceso, o cartão ativo continua marcado, a resposta escolhida
   continua azul: só não há percurso entre um estado e o outro. Efeito novo entra também na lista de
   exceções em `globals.css`.
5. **A página do obituário não vende nada.** Sem pop-up, sem banner, sem CTA de plano. Quem está ali
   está no pior dia da vida. Respeitar isso é o diferencial da casa contra os concorrentes.
6. **Cor de marca não é gosto.** Os hexadecimais saíram de medição pixel a pixel do logo real e das
   marcas das outras empresas do grupo. Ver 2.1.
7. **Zero emoji na interface.** Ícone é desenho, não caractere. Ver `src/components/icones.tsx`.

### 0.3 Rodar

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # produção
npx next start -p 4400
```

> ⚠️ **Nesta máquina o `next dev` não hidrata.** O socket de HMR morre com
> `ERR_INVALID_HTTP_RESPONSE` no handshake (algo local intercepta o upgrade de WebSocket) e o React
> nunca chega a anexar fiber nenhum: menu não abre, holofote não acende, revelação não roda. **A
> renderização e o CSS continuam corretos**, então o dev serve para revisar layout, mas
> **toda verificação de interação tem que rodar contra `next build` + `next start`.** Sintoma para
> reconhecer de novo: `Object.keys(document.body).filter(k => k.startsWith("__react"))` volta vazio.

### 0.4 Estrutura

```
GRUPO SERRA/
├── CLAUDE.md            este manual
├── PRODUCT.md           verdade de produto, usuários, princípios, régua de acabamento
├── README.md            como rodar, para humano
├── marca/               assets ORIGINAIS do cliente, baixados do servidor dele
├── public/
│   ├── marca/           logotipos do grupo, do Memorial e do Serra Pet
│   ├── fotos/           fotografia REAL das unidades e do Memorial
│   ├── depoimentos/     fotos de perfil das avaliações do Google
│   └── parceiros/       marcas do Clube de Benefícios
├── scripts/             captura e verificação com Playwright em Chrome de verdade
└── src/
    ├── app/             layout, home e 12 rotas, sitemap, robots, opengraph-image
    ├── components/      cabeçalho, rodapé, ui, ícones, movimento, JSON-LD
    │   └── home/        as 17 seções da home, uma por arquivo
    ├── data/            unidades, planos, inclusos, FAQ, depoimentos, benefícios, artigos
    └── lib/site.ts      FONTE ÚNICA dos dados da empresa
```

**`src/lib/site.ts` é a fonte única.** Telefone, CNPJ, endereço, redes, slogan e a idade da empresa
saem de lá. Nada de repetir um telefone dentro de um componente.

---

## 1. COMO SE VERIFICA O TRABALHO AQUI

Captura bonita não é prova. Os quatro scripts abaixo existem porque cada um deles já pegou um
defeito que nenhuma captura mostraria.

| Comando | O que prova |
|---|---|
| `node scripts/verificar-cinema.mjs` | 20 checagens de que a camada de movimento **funciona no navegador**: holofote escreve `--mx`, ímã desloca o botão e respeita o teto de 7px, linha de título assenta em zero, **toda linha de título termina em espaço**, paralaxe escreve `--par`, trilho de progresso sai do zero, nenhuma cortina fica presa sobre a foto, nenhum bloco revelável fica invisível, **nenhum título em máscara fica escondido**, o sistema de título chegou à página inteira, e `prefers-reduced-motion` derruba tudo. Mais os efeitos de gesto: a esteira anda sozinha e se deixa arrastar, o trilho de depoimentos se arrasta **sem navegar** ao soltar, o relevo inclina dentro do teto de giro, o fio da linha do tempo se desenha até o fim, o simulador avança ao responder e volta, e as partículas **pintam pixels de verdade** na tela. |
| `node scripts/verificar-celular.mjs` | O celular com **toque de verdade** (perfil Pixel 7 do Playwright). Simulador respondendo no dedo, linha do tempo acendendo ao arrastar, carrossel e esteira no dedo, relevo 3D desligado sem ponteiro, foco por posição acendendo cartão, nada invisível, e a barra de ligar não cobrindo link nenhum. `REDUZIDO=1` roda tudo de novo com `prefers-reduced-motion`. |
| `node scripts/verificar-movimento.mjs` | Esteira, revelação, página legível sem JavaScript, carrossel rolável à mão em reduced-motion. |
| `node scripts/verificar-interacao.mjs` | Setas do carrossel no celular, ausência de autoplay, e a escolha automática da unidade mais perto por geolocalização. |
| `node scripts/verificar-novos.mjs` | Consent Mode v2 negado por padrão, banner com "Recusar", reabertura pelo rodapé, **duas abas concordando entre si**, formulário de lead, voltar ao topo e 404. |
| `node scripts/contraste-foto.mjs` | Contraste **medido no pixel** de todo texto que vive sobre fotografia. Recorta a área renderizada, devolve o PNG para dentro da própria página, desenha num canvas e lê os pixels. |
| `node scripts/tira.mjs` | Home inteira em fatias do tamanho do viewport. `W=390 H=844 SAIDA=... ` para celular. |
| `node scripts/tomada.mjs` | Uma tomada só, com `Y=` para a altura que interessa. |

Todos apontam para `http://127.0.0.1:4400` (o `next start`), por causa de 0.3. Os scripts de captura
já dispensam o banner de cookies via `localStorage`, senão ele tapa um terço de toda tomada.

**Números medidos na última rodada** (02/09/2026, produção, viewport 1440):

```
herói: manchete .................. 9,85:1   (mínimo 3:1, texto grande)
herói: parágrafo de apoio ........ 9,14:1   (mínimo 4,5:1)
herói: selo do Google ........... 10,39:1
herói: linha de cidades .......... 6,01:1
fecho: manchete ................. 10,12:1
fecho: parágrafo ................. 9,39:1
fecho: nota dos telefones ........ 6,09:1
fecho: painel de planejamento .... 7,67:1
```

### 1.1 Armadilhas que já custaram rodada

Cada uma destas já aconteceu neste repositório. Ler antes de repetir.

**⛔ CSS base fora de `@layer base` vence TODAS as utilities do Tailwind v4.**
`p { margin: 0 }` solto matou todo `mt-*` em parágrafo, e `a { color: inherit }` solto matou todo
`text-white` em link, deixando botão azul com texto escuro ilegível. Tudo que estiliza ELEMENTO fica
dentro de `@layer base`. Está comentado no topo de `src/app/globals.css`.

**⛔ Estado inicial escondido que não depende de `.js-revela` some para quem pediu reduced-motion.**
A cortina das fotos do Memorial nasceu com `scaleY(1)` por padrão e só abria sob `.js-revela`. Como
`Revelacao` não liga a classe quando `prefers-reduced-motion` está ativo, as quatro fotos ficavam
tapadas por um retângulo terracota **para sempre**. O padrão de qualquer véu é ABERTO; fechar é que
é o caso especial.

**⛔ Um título de herói preso ao `.js-revela` pisca.** A classe só entra no `<html>` depois do
primeiro paint: o título aparece pronto por um quadro, some e só então anima. O título do primeiro
viewport usa `entra-ja`, que anima por CSS puro com `animation-fill-mode: both`.

**⛔ `getComputedStyle().color` no Tailwind v4 devolve `color(srgb 1 1 1 / .8)`.** Um parser ingênuo
de `\d+` lê isso como RGB (1,1,1), ou seja, preto, e o relatório de contraste acusa 1,65:1 num texto
branco sobre azul-escuro. O medidor certo não lê cor declarada: compara o percentil 99,5 dos pixels
(as letras já compostas) com o percentil 62 (o fundo).

**⛔ Título em máscara COLA AS PALAVRAS na emenda das linhas.** Cada linha é um bloco vizinho, e
`textContent` não insere separador: o `<h1>` do herói chegava ao Google e ao leitor de tela como
`Estamos perto,e atendemos aqualquer hora.`. Invisível na tela, fatal no buscador, e este site
existe por causa do buscador. Cada linha menos a última termina em espaço, que o layout colapsa.
Conferir como um rastreador confere: `curl -s <url> | grep -o '<h1[^>]*>.*</h1>' | sed 's/<[^>]*>//g'`.

**⛔ Estado escondido que não se amarra ao mesmo ancestral que revela é bomba-relógio.** A regra era
`.js-revela .titulo-cine ... { opacity: 0 }`, e valia para qualquer título em máscara da página,
inclusive um que não vivesse dentro de um `[data-revela]`. Esse ficaria invisível **para sempre**,
sem um erro no console. Hoje o estado inicial exige `[data-revela]` acima, e a armadilha está fechada
na estrutura, não na disciplina de quem usar o componente depois.

**⛔ `mix-blend-mode: multiply` sobre foto já escurecida não dá azul, dá CINZA.** O véu de marca do
herói é opaco e empilhado, não multiplicado.

**⛔ `fullPage: true` não avisa quando estoura.** O Chrome corta em ~16384px e devolve a imagem
cortada como se fosse a página toda. A home no celular passa de 24 mil px. Por isso a captura sai em
segmentos e a altura é conferida contra o `scrollHeight` real.

**⛔ `position: fixed` só aparece uma vez numa captura de página inteira.** Para saber se a barra de
ligar tapa alguma coisa lá embaixo, a única prova é uma tomada do tamanho do viewport com a página
já rolada até o fim.

**⛔ Revelar só quem ENTRA na tela não basta.** Com um salto instantâneo até o fim da página
(Ctrl+End, link com âncora), 7 de 9 blocos ficavam com opacidade 0 para sempre, porque nunca chegaram
a intersectar nada. Quem JÁ PASSOU também tem que aparecer: é o teste do `top < innerHeight` em
`Revelacao`, mais uma varredura de segurança quando a rolagem para.

**⛔ Três manchas radiais coloridas num fundo claro são a assinatura visual de fundo gerado por IA.**
O dono reprovou na hora e estava certo. A `.aurora` que existe hoje é outra coisa e só vale porque é
outra coisa: um tom só, **exclusivamente sobre superfície escura**, e **em movimento**.

**⛔ Ímã com raio grande faz o botão fugir do cursor.** O teto é 7px, e o teste verifica isso.

**⛔ Tela pequena NÃO É CELULAR.** As capturas de celular usavam viewport de 390px e nada mais. Sem
`hasTouch`, o Chrome continua se declarando `hover: hover` e `pointer: fine`, então toda regra escrita
para `(hover: none)` e todo caminho de código de toque **nunca rodaram uma única vez**. O buraco durou
rodadas e só apareceu quando a verificação passou a usar o perfil de dispositivo do Playwright, que
liga toque, DPR e user agent juntos. É o que `verificar-celular.mjs` existe para impedir.

**⛔ `*{ transition-duration: 1ms !important }` sob reduced-motion não reduz movimento, apaga
feedback.** Era o que estava escrito. Com o ajuste ligado, o site perdia junto toda transição de cor,
de fundo, de borda e de opacidade: o cartão aceso e o apagado viravam a mesma coisa e a linha do tempo
deixava de "ir colorindo". Ver a regra 4 da parte 0.2.

**⛔ Linha do tempo é CATRACA, não holofote.** O observador apagava o ano ao sair do trilho
(`else agora.delete(i)`), então nunca havia mais de dois ou três acesos: a pessoa arrastava a história
inteira e a linha continuava do mesmo tamanho. O que está sendo desenhado é uma passagem de tempo, e
tempo não volta. Só `add`.

**⛔ `scrollWidth` dentro de um laço de animação força layout 60 vezes por segundo.** A esteira lia a
largura a cada quadro para saber onde reiniciar. Além do custo permanente, isso atrasa os retornos do
`IntersectionObserver`, e foi a suspeita mais provável para blocos que intermitentemente não recebiam
`data-visivel` na verificação. A largura só muda no `resize` e quando as fontes carregam.

**⛔ `el.scrollLeft += 0.4` NÃO ANDA.** O incremento é sub-pixel e o navegador devolve o valor
arredondado na leitura seguinte, então a conta volta sempre ao mesmo lugar e a esteira fica parada,
sem um erro sequer. Achado pelo teste, não pelo olho: parada é parada, e uma captura estática não
sabe a diferença. A posição mora numa variável em ponto flutuante e o `scrollLeft` só recebe.

**⛔ Efeito de canvas não é hook.** `explodirEmParticulas` nasceu como `useCallback` recebendo o ref
da tela, e o compilador do React reclamou com razão: a função escreve em `canvas.width`, e ele não
tem como provar que isso não acontece durante a renderização. Não havia estado nem ciclo de vida
ali. Era uma função que recebe uma tela e desenha nela.

**⛔ Perspectiva no cartão, não no palco, entorta a fileira.** Com `perspective` em cada cartão, cada
um vira o próprio mundo e três lado a lado parecem tortos. A perspectiva mora no trilho, a rotação no
cartão, e aí eles dividem o mesmo ponto de fuga. E **nunca** ponha `.relevo` no mesmo elemento que
`.cartao-cine` ou `.depo-cartao`: os dois escrevem `transform` e o último a ganhar apaga o outro.

**⛔ Teste que depende do estado deixado por outro teste mede o outro teste.** A checagem de duas
abas nasceu pendurada no bloco de LGPD, que a essa altura já tinha gravado `"recusado"`: a segunda
aba abria sem banner com toda razão, e o relatório acusava falha de uma coisa que estava certa. Cada
bloco de `verificar-novos.mjs` abre o próprio `browserContext`.

**⛔ Teste quebrado no repositório é pior que teste nenhum.** O rótulo do rodapé virou "Preferências
de cookies" numa rodada antiga e `verificar-novos.mjs` continuou procurando "Rever minha escolha",
falhando por 30 segundos de timeout. Vermelho que todo mundo aprende a ignorar deixa de ser sinal.

### 1.2 Regras de tom para qualquer texto do site

- Português claro, frase curta, **sem travessão no meio da frase**.
- Nunca prometer prazo, cobertura, carência ou preço que não esteja confirmado **por escrito** pelo
  cliente. Em funerária, promessa errada é processo.
- Sem humor. Sem urgência de e-commerce: nada de "últimas vagas" nem contador regressivo.
- O tom humano, sem eufemismo corporativo, é o que os depoimentos do Google elogiam. É ativo da
  marca, não estilo do redator.

---

## 2. SISTEMA DE DESIGN

Direção atual (revisada em 03/09/2026 e ampliada em 10/09/2026): **moderno, fluido e
cinematográfico**. A serifa editorial da primeira versão foi recusada por parecer "jurídica e
antiga". A versão seguinte, toda em superfície clara, foi recusada por estar "morta, sem cores" — e
o diagnóstico certo ali era estrutural, não de gosto: numa página em que TODA superfície é clara,
nada pode ser destaque, porque destaque é diferença. Faltava contraste de **valor**, não de
saturação. Foi isso que a camada cinema resolveu.

### 2.1 Cor

**As cores da MARCA** (medidas pixel a pixel no logo PNG e no favicon reais do cliente):

| Cor | Hex | Papel |
|---|---|---|
| 🔵 **Azul Serra** | `#0069A3` | 71 a 75% do logo e do favicon. É A cor da marca. |
| ⚫ **Cinza pedra** | `#74726C` | 13 a 22% do logo. Tipografia do logotipo. |

**Cor por serviço**, com as paletas REAIS das outras marcas do grupo (não escolhidas no olho):

| Cor | Hex | Serviço |
|---|---|---|
| Azul | `#0069A3` | institucional, planos, obituário |
| Terracota | `#6D3316` | cremação e Complexo Memorial Hortolândia |
| Dourado | `#C9B167` | Clube de Benefícios, e o acento do Memorial |
| Laranja | `#E75C0D` | Serra Pet |
| Verde | `#5CA038` | homenagens |
| Ciano | `#22B8D4` | luz de apoio sobre escuro: fio, aro, realce. **Nunca em texto corrido.** |

Brasão institucional (`brasao_servicos.png`, três faixas iguais): `#003865` · `#006300` · `#95692F`.

> ⚠️ **Contraste já corrigido, não desfazer:** `#C9B167` com texto branco dá 1,9:1. O dourado claro
> serve para superfície decorativa; o que leva texto branco é o dourado **escuro** (`#8A6A1F`, 4,9:1).
> O mesmo vale para `--color-pet-forte` e `--color-dourado-forte`.

**Seis degraus de superfície**, e a home nunca repete o mesmo em seções vizinhas: `branco`,
`papel` (azul-gelo `#EAF1F7`), `areia` (`#F9F4EC`), `azul` (azul cheio), `escuro` (quase preto
azulado) e as zonas quentes de marca (`mat-memorial-fundo`, `mat-clube-fundo`, `mat-pet-fundo`).

> A medição da versão anterior deu **75,5% da página em branco ou cinza e 2,1% de área com cor**,
> porque "papel" era 2% diferente do branco. Seis seções seguidas liam como um borrão único. Se
> alguém voltar a aproximar esses tons, o defeito volta junto.

### 2.2 Tipografia

- **Manrope** nos títulos (`--font-display`), **Inter** no texto (`--font-sans`), via `next/font`.
- **Barra de rolagem fina.** Era 11px de largura com 3px de borda, uma barra gorda para um cromo de
navegador. Hoje são 6px, sem trilho pintado. Quanto menos ela ocupa, mais sobra para a página, e 6px
continua sendo alvo de mouse aceitável.

**Corpo em 17px por padrão** (`--text-base: 1.0625rem`). O público é idoso e lê no celular, muitas
  vezes à noite. É requisito de produto, não conforto.
- Escala fluida por `clamp()`: `--text-lead`, `--text-t3`, `--text-t2`, `--text-t1`, `--text-hero`.
- Numerais tabulares (`.numerais`) em telefone, preço e data, para não dançarem entre estados.
- Alvo de toque mínimo de `3.25rem`, acima dos 44px recomendados.

### 2.3 A camada CINEMA

Vive no fim de `src/app/globals.css`, é acionada por classe e obedece a três regras: **todo
movimento carrega significado**, **toda superfície tem fonte de luz**, e **nada esconde conteúdo sem
JavaScript**.

| Classe | O que faz | Onde vale |
|---|---|---|
| `.grao` | Grão de filme por turbulência SVG inline (~400 bytes, zero requisição), em `overlay` | seção com foto |
| `.vinheta` | Escurece as quinas e não o centro | seção com foto |
| `.foto-marca` + `.foto-marca-veu` | Dessatura, escurece e joga o azul institucional por cima | foto de fundo |
| `.kenburns` | Zoom de 30s, escala 1 → 1,085. Devagar a ponto de não se conseguir apontar o que se move | foto de fundo |
| `.aurora` | Luz que se desloca em 22s. **Só sobre escuro, um tom só** | seção escura |
| `.mosaico` | Grade de 64px dissolvida por máscara radial | seção escura |
| `.holofote` (+ `.holofote-escuro`) | O cartão acende sob o ponteiro, **na cor `--luz` do serviço dele** | cartão |
| `.aro-luz` | Fio de 1px em gradiente na borda, via `mask-composite: exclude` | cartão |
| `.cartao-cine` | Sobe 8px e projeta sombra tingida na cor do próprio serviço | cartão |
| `.selo-icone` | O ícone do cartão acompanha o hover do cartão inteiro | ícone |
| `.numero-fantasma` | Número grande em contorno, atrás do conteúdo | passo numerado |
| `.varre` | Facho diagonal atravessa o botão em 780ms | botão |
| `.enche` | Botão de contorno se enche de cor a partir da base | botão |
| `.ima` | Botão acompanha o ponteiro por até 7px e volta com mola | CTA principal |
| `.paralaxe` | Fundo anda mais devagar que o texto | foto de fundo |
| `.titulo-cine` + `.linha-mascara` | Cabeça de seção sobe de dentro de uma máscara | **toda** seção |
| `.cortina` + `.cortina-veu` | Foto é descoberta por um véu que sobe, em sequência | grade de fotos |
| `.risco` | Sublinhado cresce pela esquerda e recolhe pela direita | link |
| `.progresso` | Trilho de leitura no topo, por `animation-timeline: scroll()` onde existe | janela |
| `.revela-texto` | Entrada escalonada de elemento solto, sem depender de pai | herói |
| `.revela-escala` | Revelação com aproximação de câmera. **Só em bloco grande**, senão vira tremor | bloco do Memorial |
| `.palco3d` + `.relevo` | Cartão inclina no eixo Z seguindo o ponteiro, com brilho especular correndo junto | depoimentos, linha do tempo |
| `.relevo-frente` / `.relevo-fundo` | O que salta e o que recua dentro do cartão inclinado | assinatura, ano |
| `.arrastavel` | Trilho que se pega com o mouse, com inércia ao soltar | todo carrossel |
| `.esteira` | Marquise que anda sozinha **e** aceita mouse, dedo, roda e teclado | marcas do Clube |
| `.particulas` | Tela onde as opções se desfazem ao trocar de pergunta | simulador |
| `.pergunta[data-fase]` | Pergunta sai desfocando e subindo, a próxima entra nítida de baixo | simulador |
| `.passo` | Barra de progresso do simulador, um traço por pergunta | simulador |
| `.lt-fio` + `.lt-halo` | O fio do ano **se desenha** da esquerda, e o marco pulsa uma vez | linha do tempo |
| `[data-emfoco="1"]` | Sob `(hover: none)`, o cartão no meio da tela acende como se estivesse sob o ponteiro | todo cartão, no celular |
| `.item-cascata` | Lista longa entra sendo CONTADA, 35ms por item | lista de 20 itens |

**No celular, `:hover` nunca acontece.** Holofote, aro de luz, varredura, elevação e sublinhado são
todos acionados por ponteiro, então o telefone recebia a página com metade dos efeitos desligados, sem
erro e sem ninguém notar numa captura. O substituto honesto do ponteiro numa tela de toque é a
**posição de leitura**: um `IntersectionObserver` com `rootMargin: "-45% 0px -45% 0px"` cria uma faixa
fina no meio da tela, e o cartão que a cruza recebe `data-emfoco`. O estado é mais discreto que o de
ponteiro de propósito (borda, aro, luz e ícone, mas **sem deslocar o cartão**): elevar o que passa
pelo meio da tela faria a página inteira pular durante a rolagem.

**Arrastar é obrigação, não cortesia.** As barras de rolagem dos carrosséis estão escondidas de
propósito, então sem arrasto a pessoa de desktop fica sem nenhuma forma direta de puxar o trilho: só
seta, só de página em página. `useArrastar` resolve os três detalhes que separam isso de um arrasto
que atrapalha: o clique só é barrado quando o ponteiro andou mais de 6px (arrastar 3px em cima de um
link não pode navegar), o `scroll-snap` é desligado durante o gesto (senão o trilho puxa de volta no
meio do caminho) e soltar em movimento continua o movimento e desacelera.

**A hierarquia do título é a de um filme.** As duas pontas da página (herói e fecho) animam **linha
por linha**, com as quebras escolhidas à mão em `TituloCine linhas={[...]}`. As quatorze seções do
meio sobem **como um bloco só**, via `TituloCine` com `children`, o que dispensa quebra declarada e
portanto vale para qualquer texto, inclusive o que o cliente ainda vai trocar. `Titulo` já delega a
máscara sozinho: ninguém precisa lembrar.

> ⛔ Meio sistema aplicado é pior que sistema nenhum. A primeira versão desta camada tinha o gesto no
> herói e no fecho e faltava nas outras quatorze seções, mais três desenhos diferentes de rótulo na
> mesma página (pílula com ícone, versalete solto e o `Rotulo` novo). Lia como descuido, não como
> decisão. Hoje há **um** rótulo e **um** gesto de título, e `verificar-cinema.mjs` conta se o
> sistema chegou à página inteira.

**O JavaScript da camada cabe em `src/components/movimento.tsx`** e segue quatro regras: um listener
por documento (nunca um por cartão), nada roda sem ponteiro fino, nada roda com reduced-motion, e
toda escrita acontece dentro de `requestAnimationFrame` e vai para uma **custom property** que só
alimenta `transform` ou gradiente. Isso mantém o trabalho no compositor: zero layout, zero repaint.

> O `Holofote` começou como componente que envolvia cada seção. Virou listener único no documento:
> a conta por evento é a mesma (um `closest()` e um `rAF`), e delegar no documento faz o efeito valer
> em toda página do site, não só nas que alguém lembrou de embrulhar.

**Onde a fotografia entra.** As fotos são do próprio cliente, não banco de imagem: recepção, sala de
velório, columbário e café do Complexo Memorial Hortolândia, sala de atendimento, e a imagem que o
Serra Pet já usa. Nenhum concorrente da praça mostra o lugar no primeiro viewport — o Zelo abre com
ilustração, o Parque das Flores com banner de texto. Uma funerária vende presença física, e a única
prova disso é o lugar.

---

## 3. ARQUITETURA

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4. A escolha foi por
renderização no servidor, não por moda: a página mais compartilhada da empresa é o obituário, e ela
chega ao WhatsApp **pelada** hoje porque o site atual não tem uma única tag Open Graph. Só SSR
resolve isso por falecido, via `generateMetadata()`. O mesmo mecanismo entrega sitemap,
`schema.org/FuneralHome` por unidade e o SEO local que não existe.

**Componentes que carregam contrato, e não só marcação:**

- `ui.tsx` — `Faixa` (as seis superfícies), `Titulo`, `Rotulo`, `TituloCine`, `Botao`, `Pendencia`.
- `movimento.tsx` — `Holofote`, `Ima`, `Paralaxe`, `TrilhoProgresso`. Todos client, todos no layout.
- `revelacao.tsx` — o único observador de scroll da página inteira.
- `contador.tsx` — número que sobe ao entrar na tela. Hidrata com o valor FINAL, nunca com zero:
  começar em zero faria o HTML do servidor dizer "0 unidades próprias".
- `Pendencia` — **onde falta dado do cliente, a interface declara a lacuna** em vez de esconder ou
  chutar. É a regra 1 da parte 0.2 virando componente.

**Medição e LGPD.** Nenhum ID é inventado: GA4, GTM e Meta Pixel saem de variável de ambiente e,
enquanto não existirem, nada carrega. Consent Mode v2 entra **negado por padrão**, inline no
`<head>`, antes de qualquer tag. O banner tem "Aceitar" e "Recusar", os dois com o mesmo peso.

A escolha vive no `localStorage`, que é uma **loja externa**, e por isso o componente a lê com
`useSyncExternalStore`, não com um `useEffect` de montagem. A diferença é visível: duas abas do site
passaram a concordar entre si. Antes, aceitar numa não fechava o banner na outra, e a segunda seguia
com as tags desligadas. O valor tem três estados de propósito, e confundir dois deles quebra o
comportamento: `undefined` é "ainda não se sabe" (o que o servidor devolve), `null` é "não há escolha
guardada, abra o banner" e a string é a escolha. Se `undefined` e `null` fossem a mesma coisa, o HTML
do servidor traria o banner para quem já aceitou meses atrás. Coberto por `verificar-novos.mjs`.

**Indexação.** Enquanto `NEXT_PUBLIC_INDEXAVEL` não for `1`, toda página sai com `noindex` e o
`robots.txt` bloqueia tudo. `robots.txt` sozinho não basta: buscador que já conhece a URL ignora.
Homologação pública e indexável canibaliza a busca do cliente.

---

## 4. A EMPRESA

### 4.1 Identidade jurídica (Receita Federal via BrasilAPI, 02/09/2026)

| Campo | Valor |
|---|---|
| Razão social | **EMPRESA FUNERARIA E PLANO ASSISTENCIAL SERRA LTDA** |
| Nome fantasia | **GRUPO SERRA** |
| CNPJ | **68.932.722/0001-18** |
| Situação | ATIVA |
| Início de atividade | **07/10/1992** |
| Natureza jurídica | Sociedade Empresária Limitada |
| Porte | EMPRESA DE PEQUENO PORTE (EPP) |
| Capital social | R$ 10.000,00 |
| Simples Nacional | Sim |
| Endereço | Rua Regente Feijó, 701, Centro, Campinas/SP, CEP **13013-051** |
| Telefone na Receita | (19) 3234-9752 |
| CNAE principal | 9603-3/99 Atividades funerárias e serviços relacionados |
| CNAE secundário | 9603-3/04 Serviços de funerárias |
| Sócia-administradora | LUCIANA LOPES BRANDAO (entrada 08/02/2008) |

**Outra empresa do grupo:** COMPLEXO MEMORIAL HORTOLANDIA LTDA, CNPJ **34.503.357/0001-04**.
`⚠️ NÃO CONFIRMADO` se existem outros CNPJs; a estrutura societária completa não foi levantada.

> 🔴 **Divergência a resolver antes de escrever "desde 1961" em qualquer lugar.** O site atual e o
> Instagram dizem **1961** (o Instagram comemorou 65 anos em 2026, o que fecha). Mas o CNPJ que opera
> hoje foi aberto em **1992**. As duas coisas podem conviver (operação antiga, reestruturação
> societária depois), e ninguém vai processar por isso, mas **não existe prova pública de 1961**.
>
> Enquanto isso, `src/lib/site.ts` tem `fundacaoConfirmada: false` e o site só afirma o que o CNPJ
> sustenta: "há mais de 30 anos". **Vire para `true` quando o cliente entregar contrato social
> antigo, alvará ou matéria de jornal**, e as frases voltam sozinhas em todo o site.

### 4.2 Posicionamento (texto do próprio cliente, verbatim)

- Slogan: **"Essencial nos momentos mais difíceis da vida."**
- Claim: *"Valores como honestidade, ética e carinho pelas pessoas, nos transformaram na maior e
  mais tradicional empresa do setor de planos funerários da região de Campinas-SP"*
- Fecho da LP de planos: *"Deus permitiu a nós sermos a ponte de conforto e consolo na maior dor do
  ser humano."* (tom religioso explícito; decidir com o cliente se mantém)
- **Missão:** contratos e cerimônias dignos e humanizados, que deem tranquilidade e conforto à
  família num momento difícil.
- **Visão:** ser reconhecida como empresa de tradição, sólida, moderna e permanente.
- **Valores:** trabalho humanitário respeitando as tradições, transparência, qualidade, atenção aos
  detalhes, respeito às pessoas, ao meio ambiente e à sociedade, busca por excelência.

### 4.3 Linha do tempo da expansão (página `/grupo` do site antigo)

| Ano | Marco | | Ano | Marco |
|---|---|---|---|---|
| 1961 | Primeira unidade, Campinas | | 2015 | Cosmópolis |
| 1988 | Valinhos | | 2019 | Campinas, unidade Padre Anchieta |
| 1993 | Artur Nogueira | | 2021 | Crematório em Hortolândia (agosto) |
| 1994 | Vinhedo | | 2024 | Sumaré ("Primavera Funerária") |
| 2003 | Hortolândia | | | |

`⚠️ NÃO CONFIRMADO`: nome do fundador, número de funcionários, número de associados, faturamento.
Nada disso é público e nada disso pode ser inventado.

### 4.4 Unidades (8, todas na Região Metropolitana de Campinas)

| # | Unidade | Endereço | Telefone |
|---|---|---|---|
| 1 | **Campinas — Matriz** | R. Regente Feijó, 701, Centro | (19) 3775-9752 |
| 2 | Campinas — Padre Anchieta | R. Batista Raffi, 75, Jardim Aparecida | (19) 3775-9753 |
| 3 | Artur Nogueira | R. Antônio Mateus, 1022, Centro | (19) 3827-2459 |
| 4 | Cosmópolis | R. Ramos de Azevedo, 21, Bela Vista | (19) 3872-2759 |
| 5 | Hortolândia | R. Osvaldo Ribeiro Carrilho, 95, Jd. Mirante | (19) 3809-2020 |
| 6 | Valinhos | Av. Dom Nery, 656, Vila Embaré | (19) 3869-3217 |
| 7 | Vinhedo | Av. Independência, 4630, Jd. Santa Rosa | (19) 3876-4847 |
| 8 | Sumaré | R. José Maria Miranda, 104, Centro | (19) 3828-2211 |

**Complexo Memorial Hortolândia** (crematório e velório, empresa do grupo): Av. Carlos Roberto
Prataviera, 2310, Jd. Nova Europa, Hortolândia/SP. Inaugurado em agosto/2021. Quatro salas de velório
climatizadas, sala de homenagens, sala de despedida, crematório, velório virtual, espaço de café e
estacionamento. Site próprio `memorialhortolandia.com.br` (bloqueia leitura automatizada, HTTP 403).

**Horários hoje no site antigo:** Campinas, Artur Nogueira, Hortolândia e Padre Anchieta seg a sex
8h-18h; Valinhos, Vinhedo e Cosmópolis 8h-17h; sábado 8h-12h. **Óbito 24h, todos os dias.**

> ⚠️ A página `/contato` do site antigo diz "sábado das 9h às 12h" e a home diz "8h às 12h".
> **O site antigo se contradiz.** Confirmar antes de replicar.

**Contatos oficiais:** emergência 24h (19) 3775-9752 e (19) 3234-9752 · WhatsApp (19) 99240-6881 ·
`contato@gruposerra.com.br` · traslado gratuito de até 100 km · cobertura nacional segundo a LP.

### 4.5 Serviços e produtos

**Os 20 itens inclusos no plano** (extraídos do HTML da home antiga): urna mortuária · sala de
velório · paramentação · coroa de flores · certidão de óbito · transporte gratuito até 100 km ·
velas · véu · carro assistencial · encomendação · kit café · terços · assistência ao luto ·
orientação jurídica · tanatopraxia · assistência local · crematório · cerimonial · músicos ·
ornamentação.

> 💡 Essa lista estava dentro de um **comentário HTML** na home antiga: quem entrava no site **não
> via** o que compra. Era o argumento de venda mais forte da empresa, invisível. Hoje é uma seção
> escura inteira da home nova.

**Além do plano:** cremação no crematório próprio (argumentos: custo menor, sem jazigo nem taxa de
manutenção, "100% ecológico"; destino das cinzas em casa, local afetivo ou columbário; a página
trata das posições religiosas e cita a **Lei Federal nº 6.015/73**, que exige autorização da
família) · repatriação · obituário online · mural de homenagens moderado · locação de materiais de
convalescença com desconto para associado · Clube de Benefícios (`beneficios.gruposerra.com.br`,
plataforma de terceiro, Uppo) · Serra Pet.

**Planos e preços** (LP `serra-planos.gruposerra.com.br`, conferido 02/09/2026):

| Plano | Preço | Descrição |
|---|---|---|
| **Serra Essencial** | a partir de **R$ 18,90/mês** | Personalizável, até 10 dependentes adicionais |
| **Serra Pérola** | a partir de **R$ 97,90/mês** | "Ideal para proteger a sua família" |
| **Serra Total** | a partir de **R$ 132,90/mês** | "Adequado para as necessidades da sua família" |
| **Plano Tranquilidade** | sem preço público | Cônjuge, filhos, pais, sogros e dependentes extras |
| **Plano Empresarial** | sem preço público | Cobertura para colaboradores da contratante |
| **Serra Pet** | sem preço público | Até 3 pets |

Comuns a todos: assistência 24h, atendimento humanizado, traslado, cobertura nacional. Cremação é
**adicional contratável** dentro do plano, podendo cobrir só algumas pessoas do grupo. Troca de plano
depois de contratado é permitida.

> `⚠️ NÃO CONFIRMADO E CRÍTICO:` **carência**, **limite de idade** e **regras de reajuste** não
> aparecem em lugar nenhum do site atual. Todo plano funerário tem. Ver regra 1 da parte 0.2.

**Serra Pet** tem site próprio e mais moderno (`serrapet.com.br`, além de `pet.gruposerra.com.br`):
plano preventivo (cremação individual com cinzas devolvidas em urna, ou coletiva em espaço
ecológico, atendimento 24h, remoção na região de Campinas, certificado) e plano emergencial. Produtos:
urnas cinerárias, pingentes, plaquinhas. Frota própria.

### 4.6 Presença digital

| O quê | Endereço | Plataforma |
|---|---|---|
| Site institucional | `www.gruposerra.com.br` | OctoberCMS, nginx 1.15.9 |
| LP de planos | `serra-planos.gruposerra.com.br` | GreatPages (Cloudflare) |
| Checkout do plano | `gruposerraplanos.bubbleapps.io/version-test/...` | Bubble.io |
| Contratação | `gruposerra.app.br/serraplanos` | app próprio |
| 2ª via de boleto | `gruposerra.app.br/serra2viaboletos` | app próprio |
| Serra Pet | `pet.gruposerra.com.br` e `serrapet.com.br` | GreatPages |
| Clube de Benefícios | `beneficios.gruposerra.com.br` | Uppo Tecnologia |
| Crematório | `memorialhortolandia.com.br` | site separado |

> 🔴 **O checkout do plano aponta para `bubbleapps.io/version-test/`.** É o ambiente de TESTE do
> Bubble exposto como link de compra em produção. Se não for intencional, é venda escorrendo pelo
> ralo. Está na lista de perguntas ao cliente.

**Redes:** Instagram [@serragrupo](https://www.instagram.com/serragrupo/) (2.130 seguidores em
02/09/2026; link na bio é um `bit.ly`, sem rastreio próprio) · Facebook
[/serragrupo](https://www.facebook.com/serragrupo/) e [/memorialhortolandia](https://www.facebook.com/memorialhortolandia/)
· LinkedIn [Funerária Grupo Serra](https://br.linkedin.com/company/funerária-grupo-serra).
Não existem YouTube, TikTok nem X. `⚠️` apenas não foram encontrados.

### 4.7 Reputação

> ⚠️ **Metodologia:** Reclame Aqui e Econodata bloqueiam leitura automatizada (403). Os números
> vieram de **busca indexada, não da página**. Antes de usar qualquer um em peça pública, **abra as
> páginas na mão**.

**Google:** nota média da Matriz de Campinas **4,1/5**. Elogios: atendimento atencioso, eficiência,
cuidado. Críticas: atendimento pontual de alguns colaboradores. `⚠️` Falta levantar a nota **por
unidade**: nota baixa isolada é o que aparece na busca por bairro.

**Reclame Aqui:** 17 reclamações · 100% respondidas · 60% de solução · nota 5,0 (base de 10) · 60%
voltaria a fazer negócio · resposta média em 1 dia e 13 horas · **sem selo**, volume insuficiente.

**Do que reclamam, em ordem:**
1. 🔴 **2ª via de boleto.** Campeão disparado. Vários títulos são literalmente sobre não conseguir o
   boleto para pagar.
2. Dificuldade de contato pela central e pelo WhatsApp.
3. Cancelamento e reembolso: explicações confusas, ausência de contrato assinado em mãos, e um caso
   de 42 dias de espera por reembolso menor que o gasto com o funeral.

> 🎯 **Isto é briefing de produto, não de site.** Reclamação de boleto é problema de
> autoatendimento. "2ª via em 3 cliques, sem login complicado" ataca a reclamação nº 1 da empresa e
> vale mais que qualquer seção institucional bonita.

**Depoimentos publicados pela própria empresa** (LP de planos), assinados: Luciana Marcelino, Ricardo
Jordão Santos e Alexandre Yoshio Tamanaha. Todos citam colaboradores **pelo nome** (Diego Mello,
Robson, Anderson). `⚠️` Confirmar autorização de uso do nome antes de reaproveitar.

### 4.8 Concorrência em Campinas

Cerca de 24 empresas de serviços funerários na cidade. Com site e plano ativo: **Grupo Parque das
Flores** (`grupoparque.com.br`), **Grupo Flamboyant** (`flamboyantgrupo.com.br`, hoje parte do
**Grupo Zelo**, cobertura nacional e clube "Du Benefícios"), **Bracalente**, **SETEC** (plano
municipal) e **Florees** (`planoflorees.com.br`, ver 0.1).

O Zelo é a referência de site do setor no Brasil e é o padrão contra o qual este site vai ser
comparado. O trunfo do Serra contra eles é o oposto de escala: **8 unidades na mesma região e nome
conhecido na praça**. O site precisa vender **proximidade**, não tamanho.

---

## 5. O SITE ANTIGO: A AUDITORIA QUE JUSTIFICA A TROCA

Tudo medido em 02/09/2026 por `curl` e leitura do HTML. Não é opinião de design.

### 5.1 SEO: praticamente invisível

- 🔴 **Todas as páginas com o mesmo `<title>`: "Grupo Serra Funerárias".** Testado uma a uma.
- 🔴 **Nenhuma página tem `<meta name="description">`.** Zero.
- 🔴 **`robots.txt` não existe** (devolve o 404 do OctoberCMS). **`sitemap.xml` não existe** (404).
- 🔴 **Nenhuma tag Open Graph.** Quando alguém compartilha um obituário no WhatsApp, e isso acontece
  dezenas de vezes por dia, **o link aparece pelado**. A página mais viral da empresa é a que menos
  se apresenta.
- Sem `schema.org`: as 8 unidades não têm `LocalBusiness` / `FuneralHome`, que é exatamente o que o
  Google usa para busca local.

### 5.2 Performance

CSS de **305 KB** e JS de **458 KB**, servidos **sem gzip nem brotli** (o servidor devolve
`Content-Length: 305007` mesmo com `Accept-Encoding: gzip, br`). São ~745 KB de texto que poderiam
ser ~120 KB. O CSS é o **Bootstrap inteiro concatenado** com o tema, com toda a paleta padrão sem uso.
Imagens em JPG/PNG sem `webp`, sem `srcset`, sem `loading="lazy"`. `Cache-Control: no-cache` no HTML.

### 5.3 Infraestrutura e analytics

**nginx 1.15.9 (Ubuntu)**, de março de 2019, fora de suporte, com anos de CVEs acumulados.
🔴 O Google Analytics é `UA-163314961-1`, **Universal Analytics, que o Google desligou em julho de
2023**: a empresa **não coleta uma única métrica há mais de 3 anos**. Sem pixel de Meta e sem GTM.

### 5.4 Um terço da home estava comentado

Dos 29,3 KB do HTML da home, **8,7 KB (30%) dentro de comentários HTML**, em **224 blocos**: a lista
completa dos 20 itens inclusos, a seção de materiais de convalescença, a seção do Clube de Benefícios
com "desconto de 50% no valor do plano familiar", e o item Notícias do menu. Não é código morto de
framework, é **conteúdo comercial que alguém escondeu e esqueceu**.

### 5.5 O resto

Aviso de COVID ainda no ar em setembro de 2026 ("É OBRIGATÓRIO USO DE MÁSCARA...") · contradição de
horário de sábado entre home e `/contato` · `/trabalhe-conosco` é só um campo de upload, sem uma
linha sobre a empresa · política de privacidade **não nomeia a empresa nem o CNPJ**, não indica DPO e
cita a LGPD uma única vez, de passagem · banner de cookies só com "Aceitar", sem recusar, o que não
atende à LGPD · ícones vindos de um **Font Awesome Kit** de terceiro que pode ser desligado sem aviso.

### 5.6 Mapa do site antigo

```
/ · /grupo · /cremacao · /obituario · /homenagens · /contato
/trabalhe-conosco · /politica-privacidade · /blog · /noticia/<slug>
```
Links externos do menu: O Plano · Serra Pet · Benefícios · 2ª Via Boleto · Memorial.
Agência que fez o site atual: **Agência Liv** (`agencialiv.com.br`), creditada no rodapé.

As duas páginas que geram tráfego de verdade são **`/obituario`** (nome, datas, idade, local e
horário de início e término da cerimônia, compartilhar no WhatsApp e Facebook, busca por nome; é a
página mais compartilhada de qualquer site de funerária) e **`/homenagens`** (mural com foto,
mensagem e autoria, publicado após aprovação).

---

## 6. A RÉGUA

Concorrentes medidos em 02/09/2026. A coluna do Serra foi **remedida em
10/09/2026**, depois da camada cinema, contra `next start`.

| | Serra novo | Flamboyant | Zelo | Parque das Flores |
|---|---|---|---|---|
| Tags Open Graph e Twitter | **19** (11 og, 8 twitter) | 10 | 6 | 0 |
| Tipos de schema.org distintos | **12** | 3 | 2 | 0 |
| `FuneralHome` por unidade | **8** | não | não | não |
| Título único por página | **sim** | sim | sim | não |
| Meta descrição | **sim** | sim | sim | **não** |
| Peso do HTML da home | **57,2 KB gzip** | 172 KB | 415 KB | 28 KB |
| sitemap.xml e robots.txt | **sim** | — | — | — |
| Fotografia real no 1º viewport | **sim** | não | não | não |

> A home passou de 30,2 para 57,2 KB gzip quando ganhou as seções novas e o
> JSON-LD por unidade. É crescimento honesto de conteúdo, não de framework, e
> ainda é um terço do Flamboyant e um sétimo do Zelo. **Se passar de 80 KB,
> vale cortar conteúdo, não comprimir mais.**

### 6.1 O que o site novo conserta, em ordem de retorno

1. **2ª via de boleto em destaque**, resolvida em poucos cliques. Ataca a reclamação nº 1.
2. **Telefone 24h fixo e clicável** em qualquer ponto de rolagem, no celular.
3. **Open Graph, título e descrição por página**, com imagem específica no obituário. Faz cada
   compartilhamento de velório no WhatsApp virar peça de marca.
4. **A lista do que o plano inclui de volta à superfície.** Estava pronta, só escondida.
5. **Preço e contratação no mesmo site**, e o checkout fora de uma URL `version-test`.
6. **GA4, GTM e pixel**, porque a empresa dirige no escuro há 3 anos.
7. **Schema `FuneralHome` por unidade**, sitemap e robots.
8. **Política de privacidade e banner de cookies em conformidade com a LGPD.**
9. **Fora o aviso de máscara.**
10. **Carência e regras declaradas com honestidade**, com o cliente validando.

---

## 7. O QUE AINDA FALTA PERGUNTAR AO CLIENTE

As três primeiras travam texto que já está no ar em homologação.

1. 🔴 **Carência, limite de idade e reajuste** de cada plano.
2. 🔴 A data de **1961** tem documento que comprove? (contrato social antigo, alvará, jornal)
3. 🔴 O checkout em `bubbleapps.io/version-test/` é intencional?
4. Qual o horário correto de **sábado**?
5. Quantos **associados** e quantos **colaboradores**? (para os números da home)
6. Quem são os **parceiros do Clube de Benefícios**?
7. Existe **logo em vetor** (SVG/AI/EPS)? Só há PNG de 485px, que serrilha em tela retina.
8. Quem responde pela **LGPD** na empresa (encarregado/DPO)?
9. Os depoimentos com nome de colaborador têm **autorização de uso**?
10. Quem administra domínios, DNS e hospedagem hoje? A Agência Liv ainda atende?
11. O que é a unidade de Sumaré? "Primavera Funerária" é marca à parte ou nome antigo?
12. A parceria com a **Unimed** (há um `unimed.png` no tema do site antigo) ainda existe?

---

## 8. FONTES E COMO RECONFERIR

| Dado | Fonte | Como reconferir |
|---|---|---|
| CNPJ, sócia, porte, endereço | Receita Federal via BrasilAPI | `curl https://brasilapi.com.br/api/cnpj/v1/68932722000118` |
| Paleta do site antigo | `themes/serra/assets/css/geral.css` | baixar e contar ocorrências de hex |
| Paleta da marca | `marca/logo_gruposerra_horizontal.png`, `marca/favicon.png` | contagem de pixels |
| Unidades, horários, serviços | home, `/grupo`, `/contato`, `/cremacao` do site antigo | abrir as páginas |
| Preços dos planos | `serra-planos.gruposerra.com.br` | abrir a LP |
| Títulos, meta, gzip, GA | medição por `curl` em 02/09/2026 | repetir os comandos |
| Google 4,1 | agregadores (funerariasbrasil, locaisdobrasil) | **abrir o perfil no Google Maps na mão** |
| Reclame Aqui | busca indexada, a página dá 403 | **abrir reclameaqui.com.br na mão** |
| Instagram 2.130 seguidores | perfil público, 02/09/2026 | abrir o perfil |
| Contraste do site novo | `node scripts/contraste-foto.mjs` | rodar contra `next start` |
| Movimento do site novo | `node scripts/verificar-cinema.mjs` | rodar contra `next start` |

**Assets de marca.** Os arquivos em `marca/` são os originais do cliente, não recriação; o
`logo_gruposerra_horizontal.png` foi conferido por md5 contra o arquivo servido em
`gruposerra.com.br`. **Continua faltando o vetor** (ver pergunta 7).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
