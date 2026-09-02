# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

**Next.js (App Router) + TypeScript.** Escolhido pelo dono em 02/09/2026, entre Next.js e Vite SPA.
O fator decisivo não foi preferência: a auditoria do site atual (ver `CLAUDE.md` seção 9.1) provou
que a página mais compartilhada da empresa, o obituário, chega ao WhatsApp sem título, sem imagem e
sem descrição, porque não existe nenhuma tag Open Graph. Só renderização no servidor resolve isso
por falecido, via `generateMetadata()` em `app/obituario/[slug]`. O mesmo mecanismo entrega sitemap,
`schema.org/FuneralHome` por unidade e o SEO local que hoje não existe.

Deploy alvo: ainda não definido (Vercel é o caminho natural, mas quem controla domínio e DNS do
cliente é uma pergunta em aberto, ver `CLAUDE.md` seção 12).

## Users

Três pessoas distintas, em estados emocionais opostos. Projetar para a média das três é o erro
clássico do setor.

1. **A pessoa que acabou de perder alguém.** Chega pelo celular, quase sempre de madrugada, muitas
   vezes chorando, às vezes dirigindo. Não está lendo, está procurando **um número de telefone**.
   Não pesquisa, não compara, não preenche formulário. Se demorar 5 segundos para achar o telefone,
   ela liga para a concorrência.
2. **O associado que quer resolver um problema de pagamento.** Quer a **2ª via do boleto** e nada
   mais. É a origem número 1 das reclamações no Reclame Aqui da empresa. Perfil mais velho, muitos
   com pouca familiaridade digital, e vários já frustrados por tentativas anteriores.
3. **Quem está pesquisando plano funerário com calma.** Normalmente entre 45 e 65 anos, decidindo
   pelos pais ou por si. Compara preço, o que está incluso e carência. É o único dos três que lê a
   página inteira, e é o único que gera receita nova.

Público secundário: **familiares e amigos** que recebem o link do velório por WhatsApp. Não são
clientes, mas são o maior volume de tráfego da empresa e hoje ninguém os enxerga.

## Product Purpose

Ser o canal digital do Grupo Serra: atender quem está no pior dia da vida, resolver o
autoatendimento de quem já é associado, e vender plano para quem está planejando.

Sucesso, em ordem de importância:
1. Ninguém precisar procurar o telefone de emergência.
2. A 2ª via do boleto sair sem ligar para a central.
3. Cada obituário compartilhado no WhatsApp aparecer como uma peça digna da marca.
4. O visitante entender o que o plano inclui antes de falar com um vendedor.

## Positioning

**65 anos e 8 unidades físicas na mesma região metropolitana.** O concorrente que mais assusta é o
Grupo Zelo (via Grupo Flamboyant), que tem cobertura nacional. O Serra não ganha em escala e não
deve tentar: ganha em **proximidade e permanência**, sendo a funerária que está no bairro há três
gerações. O site precisa vender vizinhança, não tamanho.

Segundo diferencial real: crematório próprio (Complexo Memorial Hortolândia, desde 2021), o que
permite oferecer cremação sem terceirizar.

## Operating Context

- **Atendimento de óbito é 24h, todos os dias.** O balcão é comercial (seg a sex, sábado meio
  período), mas o telefone nunca fecha. Essa assimetria precisa estar clara na interface, porque a
  pessoa às 3h da manhã não pode achar que está fechado.
- O tráfego real chega por **WhatsApp**, não por busca. O obituário circula em grupo de família.
- O ecossistema atual está espalhado em 6 plataformas (OctoberCMS, GreatPages, Bubble, Uppo, dois
  apps próprios em `gruposerra.app.br`, mais o site do crematório). O site novo é a chance de
  unificar, mas as integrações existentes seguem vivas até alguém migrar.
- A empresa **não mede nada desde julho de 2023**, quando o Google desligou o Universal Analytics
  que ainda está instalado. Qualquer decisão futura de produto começa sem série histórica.

## Capabilities and Constraints

**Confirmado e disponível para construir:**
- 8 unidades com endereço, telefone e horário (ver `CLAUDE.md` seção 2).
- Preços públicos de 3 planos: Serra Essencial R$ 18,90, Serra Pérola R$ 97,90, Serra Total
  R$ 132,90, todos "a partir de", mensais. Mais Tranquilidade, Empresarial e Serra Pet sem preço.
- Lista completa de **20 itens inclusos no plano** (seção 3.1 do dossiê). Hoje está enterrada num
  comentário HTML no site do cliente, e é o argumento de venda mais forte que a empresa tem.
- Serviços extras: cremação, repatriação, Serra Pet, locação de materiais de convalescença,
  Clube de Benefícios.
- Linha do tempo de expansão, 1961 a 2024.
- Missão, visão e valores, em texto oficial.
- 3 depoimentos assinados, com nome de cliente e de colaborador.

**Explicitamente indefinido, e proibido inventar:**
- **Carência, limite de idade e regra de reajuste dos planos.** Nenhum plano funerário existe sem
  isso, e o site atual não diz. Enquanto o cliente não responder, a interface reserva o espaço e
  não escreve número nenhum.
- Número de associados, de colaboradores e de famílias atendidas.
- Nome do fundador.
- Parceiros do Clube de Benefícios.
- Se a parceria com a Unimed ainda existe.
- **A data de 1961 não tem prova pública** (o CNPJ ativo é de 1992). Usar "desde 1961" só depois de
  o cliente confirmar, porque é claim institucional.

**Restrições técnicas herdadas:**
- Não existe logo em vetor. Só PNG de 485×130 em `marca/`. Em tela retina vai serrilhar até alguém
  entregar o SVG.
- O checkout atual do plano aponta para uma URL `version-test` do Bubble. Não replicar esse link
  sem o cliente confirmar que é intencional.

## Brand Commitments

- Nome: **Grupo Serra**. Razão social EMPRESA FUNERARIA E PLANO ASSISTENCIAL SERRA LTDA.
- Slogan oficial, a manter: **"Essencial nos momentos mais difíceis da vida."**
- Cores da marca, medidas pixel a pixel no logo e no favicon reais:
  **azul `#0069A3`** e **cinza pedra `#74726C`**.
- Sistema herdado de **cor por serviço**, a preservar: dourado `#A88952` = cremação,
  verde `#5CA038` = homenagens, azul = obituário e institucional.
- Assets reais disponíveis em `marca/`: logo horizontal colorido, versão branca para fundo escuro,
  favicon e brasão de 3 faixas (`#003865` / `#006300` / `#95692F`).
- **Voz:** humana e direta, sem eufemismo corporativo. Frase curta. **Sem travessão no meio da
  frase.** Sem humor. **Sem urgência de e-commerce**: nada de contador regressivo, "últimas vagas"
  ou desconto piscando. A empresa vende para quem está em luto, e parecer loja destrói a confiança.
- A LP de planos do cliente fecha com *"Deus permitiu a nós sermos a ponte de conforto e consolo na
  maior dor do ser humano."* O tom religioso é uma escolha do cliente, ainda não confirmada para o
  site novo.

### Preferência permanente: convenção, executada melhor que a dos outros

Decisão do dono em 02/09/2026, com um mundo visual autoral em cima da mesa e recusado. **O site
segue o padrão da categoria**, e não uma direção de autor: página clara, hierarquia previsível,
cards de serviço, faixa de depoimentos, o arranjo que o visitante já sabe ler. Isso é um
compromisso de marca, não uma concessão, e vale para todo trabalho futuro aqui. Executar reto, sem
ironia e sem contrabandear firula por baixo da convenção.

**A régua de acabamento são os concorrentes diretos**, escolhida pelo dono na mesma data: Grupo
Zelo, Parque das Flores e Grupo Flamboyant. É a comparação que o cliente final realmente faz,
porque os três aparecem na mesma busca do Google. O site do Serra tem que ganhar deles em cada
ponto mensurável. Estado dos adversários medido em 02/09/2026:

| Concorrente | Título | Meta descrição | Tags OG | schema.org | Peso | Resposta |
|---|---|---|---|---|---|---|
| Grupo Zelo | bom | sim | 6 | 2 | 415 KB | 0,68 s |
| Grupo Flamboyant | bom | sim | **10** | **3** | 172 KB | 1,33 s |
| Parque das Flores | só o nome | **nenhuma** | **0** | **0** | 28 KB | 0,91 s |

Piso a bater, portanto: **mais de 10 tags OG**, **mais de 3 tipos de schema**, e resposta **abaixo
de 0,68 s**. Como convenção foi a escolha, é nesses números e no acabamento que a diferença precisa
aparecer.

## Evidence on Hand

- **`CLAUDE.md` na raiz deste projeto**: dossiê completo de 12 seções levantado em 02/09/2026, com
  auditoria medida do site atual, paleta extraída dos arquivos reais, dados da Receita Federal,
  reputação e concorrência. É a fonte de verdade deste projeto.
- **`marca/`**: 4 arquivos de identidade, originais do servidor do cliente, conferidos por md5.
- Reputação pública: Google 4,1/5 na matriz. Reclame Aqui com 17 reclamações, 100% respondidas,
  60% de índice de solução, sem selo por volume insuficiente.

**Ausências que não podem virar invenção:** não há **nenhuma fotografia** do cliente (unidades,
equipe, frota, crematório). Não há vídeo. Não há depoimento em vídeo. Não há número de associados.
Decisão do dono em 02/09/2026: o protótipo é construído **sem fotografia**, com linguagem gráfica
(cor, tipografia, ilustração vetorial), e os espaços ficam dimensionados para receber as fotos
reais quando o cliente entregar.

## Product Principles

1. **O telefone de emergência vence qualquer outra coisa na tela.** Em qualquer ponto de rolagem,
   em qualquer página, no celular. Quem chega de madrugada não navega.
2. **A página do obituário não vende nada.** Sem pop-up, sem banner, sem CTA de plano. O visitante
   está no pior dia da vida dele. Respeitar isso é o diferencial competitivo, não uma concessão.
3. **Autoatendimento antes de institucional.** A 2ª via do boleto resolve a reclamação número 1 da
   empresa e vale mais do que qualquer seção "quem somos" bonita.
4. **Nada de número não confirmado.** Em funerária, promessa errada sobre carência ou cobertura é
   processo, não é bug de conteúdo.
5. **Proximidade, não escala.** Oito endereços de verdade, com bairro e telefone local, provam mais
   que qualquer adjetivo sobre tradição.

## Accessibility & Inclusion

Requisito de produto, não item de checklist: parte relevante do público são **pessoas idosas, em
estado emocional extremo, no celular, muitas vezes à noite**.

- Corpo de texto grande por padrão, com alvos de toque generosos.
- Contraste forte de verdade, testado, não estimado.
- Nada de informação transmitida só por cor: o sistema de cor por serviço sempre acompanha rótulo
  e ícone.
- Formulário tolerante a erro, com mensagem em português claro dizendo o que fazer.
- Movimento discreto e respeitando `prefers-reduced-motion`.
