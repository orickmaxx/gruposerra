# O que o Florees tem e o Grupo Serra não tem

> Auditoria feita em 02/09/2026 lendo os arquivos reais, não o site pelo navegador:
> `C:\Users\noname\Desktop\SITE FLOREES\index.html` (183 KB) e
> `C:\Users\noname\Desktop\SITE FLOREES\LP INSTITUCIONAL\index.html` (166 KB),
> mais as 14 páginas soltas do projeto. Comparado contra o HTML servido pelo nosso
> Next.js e contra o nosso código-fonte.
>
> Regra que usei: só entra na lista o que eu **conferi nos dois lados**. Onde o
> recurso existe no nosso código mas não aparece no HTML servido (porque vive num
> chunk de JS), eu conferi no fonte e **não** contei como lacuna.

---

## Resumo em uma linha

O nosso site ganha em **infraestrutura de busca** e perde em **tudo que envolve
gente**: foto, vídeo, voz, história, conteúdo editorial e captação de lead. Eles
construíram um site que **vende e mede**. Nós construímos um site que **informa**.

---

## 1. CONTEÚDO HUMANO — a lacuna mais grave

Não é falta de código. É falta de material, e é o que faz um site parecer feito
por robô.

| | Florees | Grupo Serra |
|---|---|---|
| Imagens de conteúdo | **28 arquivos**, 3,2 MB | **0** |
| Banner com versão vertical p/ celular | **4 pares** (`banner1-4` + `bannervert1-4`) | 0 |
| Vídeo | **2 arquivos**, 9,3 MB | 0 |
| Depoimento em **áudio** | **3 MP3** + player próprio construído | 0 |
| Fotos de perfil (depoimentos) | 6 arquivos | 9 (raspadas do Google) |
| Ilustração por plano | 5 arquivos `.webp` | 0 |

**O player de áudio deles não é o nativo do navegador.** São 34 referências no JS
a `currentTime`, `duration` e controles próprios: eles construíram o player para
que o depoimento em áudio tenha a cara do site. Um depoimento em áudio, com a voz
de quem perdeu alguém agradecendo, é a prova social mais forte que existe nesse
setor, e nós não temos nem o espaço reservado para ele.

---

## 2. SEÇÕES QUE ELES TÊM E NÓS NÃO

O site deles tem **16 seções na home**. O nosso tem 12. As que faltam:

### 2.1 Trust bar, logo abaixo do herói
Cinco selos em faixa, antes de qualquer venda:

> **+20 Anos de História** · **Empresa Licenciada** conforme a Lei Federal nº 13.261/16 ·
> **Plantão 24 horas** · **Campinas e Região** · **Sem Taxas Extras**

O selo de licença citando a **lei federal pelo número** é uma sacada séria: plano
funerário é setor regulado, e citar a lei responde a desconfiança antes de ela
virar pergunta. O Serra pode e deve citar a mesma lei.

### 2.2 Como Funciona
Passo a passo do que acontece quando a pessoa aciona o plano. Nós explicamos o que
está incluso, mas não explicamos **a sequência**.

### 2.3 Comparador / quiz de planos ("Qual Plano é o Ideal para Você?")
**42 ocorrências no JS.** É a peça de conversão mais trabalhada do site deles: em
vez de jogar três cartões de preço e torcer, o site pergunta e recomenda. Nós não
temos nada disso.

### 2.4 Garantias ("Tranquilidade Hoje, Amparo Quando Precisar")
Três promessas escritas para matar objeção de compra:
- **Sem Surpresas** — nada de custo escondido, o que está no contrato está garantido
- **Parcelas que Cabem no Bolso** — evita o desembolso alto na hora da dor
- **Atendimento 24h Garantido** — basta uma ligação

### 2.5 Números de impacto
`20+ anos` · `50K+ vidas acolhidas` · `98% famílias satisfeitas` · `24/7 plantão`,
com contador animado.

⚠️ Para o Serra isso **não pode ser copiado**: não temos número de associados nem
de atendimentos, e inventar é o tipo de coisa que vira processo. A seção é boa, o
conteúdo dela precisa vir do cliente.

### 2.6 Por Que Confiar em Nós
Três pilares: Amparo Familiar, Transparência e Respeito, Legado de Confiança.

### 2.7 Blog ("Palavras que Acolhem")
**Três artigos completos**, ~28 KB cada, com título e SEO próprios:
- Compreendendo as Fases do Luto
- A Importância do Planejamento Funerário
- 5 Maneiras Criativas de Honrar uma Memória

Conteúdo de luto é o que traz busca orgânica nesse setor o ano inteiro. O Serra tem
duas notícias no site velho e nós não trouxemos nenhuma.

### 2.8 Uma página por plano
**Seis páginas dedicadas** (`plano-jasmim`, `lirio`, `orquidea`, `pet`, `tulipa`,
`vital`), cada uma com `<title>` e Open Graph próprios. Nós temos **uma** rota de
planos, esboçada.

---

## 3. INFRA LEGAL E DE MEDIÇÃO — a lacuna mais cara

Aqui a LP deles está num patamar que o nosso site nem encostou.

### 3.1 Banner de cookies com Google Consent Mode v2
O `cookies.js` deles (7,2 KB) faz o certo:
- as tags de medição e publicidade entram com **consentimento NEGADO por padrão**,
  direto no `<head>`;
- o banner só dispara o `consent update` quando a pessoa decide;
- a escolha fica em `localStorage` (`florees_consent`);
- qualquer elemento com `[data-cookies-abrir]` reabre as preferências;
- expõe `window.floreesPodeMedir()` para o resto do site perguntar antes de medir.

**Nós temos a palavra "cookies" em quatro arquivos de texto e zero implementação.**
Isso é obrigação legal, não melhoria.

### 3.2 Política de privacidade e termos de uso de verdade
- `politica-de-privacidade.html` — **26.670 bytes**
- `termos-de-uso.html` — **21.775 bytes**
- `legal.css` — folha de estilo só para as páginas legais

O nosso `/privacidade` é uma página esboçada de uma tela.

### 3.3 Medição
| | LP Florees | Grupo Serra |
|---|---|---|
| Analytics | **22 ocorrências** | 0 |
| Meta Pixel | **6 ocorrências** | 0 |
| Consent Mode | **sim, v2** | 0 |

Sem isso, o site novo do Serra nasce cego, exatamente como o antigo, que está sem
medir nada desde julho de 2023.

### 3.4 Formulário de captação
A LP tem um formulário de lead funcionando: **nome, WhatsApp, cidade e número de
pessoas**, todos obrigatórios, com `novalidate` e validação própria, máscara de
telefone e mensagem de erro escrita em português de gente.

**O nosso site não tem um único formulário.** Ele não capta um lead sequer. Todo
contato depende de a pessoa clicar em telefone ou WhatsApp. Quem está pesquisando
plano às 23h, sem querer falar com ninguém ainda, não tem por onde deixar o contato.

### 3.5 Outras páginas que eles têm
- `404.html` desenhada (as duas: site e LP)
- `manutencao.html`
- `admin.php` com login, e `admin_switch.php` (liga/desliga a manutenção)
- `site.webmanifest` + `apple-touch-icon` na LP

---

## 4. DETALHES DE CRAFT QUE ELES ACERTAM

| Recurso | Florees | Nós |
|---|---|---|
| `<picture>` + `<source media>` (troca a arte no celular) | **4** | 0 |
| `width`+`height` em toda imagem (evita salto de layout) | 23 de 24 na LP | parcial |
| `fetchpriority` na imagem crítica | **3** | 0 |
| `loading="lazy"` | 27 | 11 |
| `preconnect` para fontes e CDN | **3** | 0 |
| Botão voltar ao topo | **sim** | não |
| Contador animado | **sim** | não |
| Carrossel no herói | **sim** | não |
| Carrossel do clube | **sim** | não |
| `alt=""` em imagem decorativa | LP: 11 | sim |

O `<picture>` com `media` é o detalhe que mais me chamou atenção: eles não redimensionam
o banner no celular, eles **trocam a foto** por uma versão vertical, enquadrada para
retrato. É arte-direção responsiva de verdade, não CSS espremendo imagem.

---

## 5. ONDE NÓS GANHAMOS

Para a comparação ser honesta, o inverso também é verdade.

| | Grupo Serra | Site Florees | LP Florees |
|---|---|---|---|
| Tipos de schema.org | **12** | **0** | 7 |
| `FuneralHome` por unidade | **8** | 0 | 0 |
| `sitemap.xml` | **sim** | não | não |
| `robots.txt` | **sim** | não | não |
| Tags Open Graph | 10 | 6 | 10 |
| Tags Twitter | **8** | 0 | 2 |
| Peso do HTML (gzip) | **40 KB** | 184 KB bruto | 166 KB bruto |
| Depoimentos com link para a origem | **sim, 9** | não | não |
| Geolocalização escolhendo a unidade | **sim** | não | não |
| Renderização no servidor | **sim** | estático | estático |

O site principal do Florees **não tem um único dado estruturado**, nem sitemap, nem
robots. Nisso o nosso está bem à frente, e isso é o que decide busca local.

---

## 6. ORDEM DO QUE FAZER

Priorizado por quanto custa deixar como está, não por quanto é fácil.

### 🔴 Trava o lançamento
1. **Banner de cookies com Consent Mode v2.** Obrigação legal. Copiar a arquitetura
   do `cookies.js` deles, que já está resolvida.
2. **Política de privacidade e termos de uso reais**, com razão social, CNPJ e
   encarregado de dados.
3. **Formulário de captação de lead** com validação e máscara. Hoje o site perde
   todo visitante que não quer ligar agora.
4. **Analytics + GTM + Pixel**, atrás do consentimento.

### 🟡 Falta conteúdo, e conteúdo vem do cliente
5. **Fotografia**: fachada das 8 unidades, equipe, frota, interior do Memorial,
   atendimento. Os espaços já estão dimensionados no site.
6. **Depoimento em áudio ou vídeo** de uma família. É a peça mais forte do site deles.
7. **História da empresa** contada pela empresa: quem fundou, em que circunstância.
8. **Números reais** para a seção de impacto, ou a seção não entra.

### 🟢 Construção nossa, sem depender de ninguém
9. **Trust bar** abaixo do herói, citando a **Lei Federal nº 13.261/16**.
10. **Comparador de planos** que pergunta e recomenda, em vez de três cartões de preço.
11. **Seção "Como funciona"**, o passo a passo do acionamento.
12. **Seção de garantias**, matando as objeções de compra.
13. **Uma página por plano**, com OG próprio.
14. **Blog** com os artigos de luto e planejamento.
15. **`<picture>` com arte vertical** no celular, quando as fotos chegarem.
16. **404 desenhada**, botão voltar ao topo, `preconnect`, `fetchpriority`.

---

## 7. O QUE EU ERREI NAS RODADAS ANTERIORES

Registrado para não repetir:

1. **Grepei tokens de cor em vez de ler o site.** Nas duas primeiras rodadas eu
   extraí a paleta e as fontes do Florees e concluí que tinha "aprendido a
   referência". Não tinha lido uma seção sequer.
2. **Li o Clube de Benefícios com `fetch` simples e concluí que não havia lista de
   parceiros.** A página monta o catálogo por JS. São 9 categorias e 42 páginas.
3. **Não olhei a pasta do projeto.** `img/`, `videos/`, `depoimentos/`, as 6 páginas
   de plano, os 3 artigos e as páginas legais estavam ali o tempo todo.
4. **Não comparei o nosso contra o deles antes de declarar o trabalho pronto.**
