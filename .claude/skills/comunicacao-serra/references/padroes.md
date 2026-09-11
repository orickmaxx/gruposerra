# Padrões de texto

Fórmulas que funcionam aqui, e exemplos de antes e depois. Use como ponto de partida, não como
gabarito: a fórmula existe para você não começar do zero, e a boa frase quase sempre quebra um
pedaço dela.

Índice:
- [1. Manchete](#1-manchete)
- [2. Rótulo de CTA por intenção](#2-rótulo-de-cta-por-intenção)
- [3. Cabeça de seção](#3-cabeça-de-seção)
- [4. Objeção](#4-objeção)
- [5. Meta descrição](#5-meta-descrição)
- [6. Antes e depois](#6-antes-e-depois)
- [7. Lista de verificação](#7-lista-de-verificação-antes-de-entregar)

---

## 1. Manchete

Três construções, em ordem de preferência.

**a) O fato que ninguém mais pode dizer.** É a melhor, porque passa o teste do concorrente sozinha.

> "Estamos perto, e atendemos a qualquer hora." *(a do herói hoje, e funciona: proximidade +
> disponibilidade, as duas coisas que a empresa tem)*

**b) A pergunta que o leitor já está fazendo**, respondida no ato.

> "Aconteceu agora? É só ligar." *(a do fecho hoje)*

**c) A consequência concreta**, nunca a qualidade abstrata.

> "Uma família cuidando de outra, há mais de 30 anos."

**O que não fazer:**

- Manchete com adjetivo no lugar do fato: *"Atendimento humanizado e acolhedor"*. Quatro
  concorrentes já escreveram.
- Manchete institucional: *"Bem-vindo ao Grupo Serra"*. Ninguém chega num site de funerária para ser
  recebido.
- Manchete com superlativo: *"O melhor plano da região"*. Não é verificável e é o vocabulário do
  Zelo.
- Manchete com o produto no lugar da pessoa: *"Planos funerários em Campinas"* serve de `<title>`
  para o Google, não de manchete para gente.

**Regra de tamanho:** manchete de herói cabe em 3 linhas curtas, de 12 a 18 caracteres cada. Manchete
de seção cabe em 20 a 30 caracteres por linha. Se estourar, corte palavra, não aumente o bloco.

⛔ **Manchete de herói e de fecho vive em `TituloCine linhas={[...]}`.** Escreva as strings sem
espaço no fim: o componente insere o separador sozinho. Ver a parte 9 do `SKILL.md`.

---

## 2. Rótulo de CTA por intenção

O padrão do setor é o botão que não diz nada. Aqui o rótulo nomeia a ação e o resultado.

| Intenção do leitor | Escreva | Nunca |
|---|---|---|
| Socorro agora | **"Ligar agora, (19) 3775-9752"** | "Fale conosco", "Emergência" |
| Comparar planos | **"Ver planos e preços"** | "Saiba mais", "Conheça nossos planos" |
| Achar um velório | **"Abrir o obituário"** | "Acesse", "Clique aqui" |
| Tirar dúvida sem compromisso | **"Falar sobre os planos"** | "Fale com um consultor" |
| Resolver boleto | **"Pegar a 2ª via do boleto"** | "Área do cliente", "Portal" |
| Achar a unidade | **"Ver as 8 unidades"** | "Onde estamos", "Localização" |
| Contratar de fato | **"Contratar o plano"** | "Adquira já", "Garanta o seu" |

**Três detalhes que mudam a conversão:**

1. **O telefone aparece dentro do rótulo.** O número é a informação, não o botão. Quem está de
   madrugada lê o número antes de decidir clicar.
2. **Verbo no infinitivo, não no imperativo agressivo.** "Ver planos" convida; "Garanta já" empurra.
   A única exceção legítima é o socorro, onde "Ligar agora" é instrução, não pressão.
3. **A mensagem pronta do WhatsApp é copy também**, e vai na voz de quem envia:
   *"Olá, vim pelo site e gostaria de informações sobre o plano."* Primeira pessoa, sem adjetivo,
   sem "gostaria de solicitar uma simulação gratuita".

---

## 3. Cabeça de seção

O site já tem um sistema, e ele é bom: **rótulo curto + título + apoio**. Cumpra o sistema inteiro
ou não use nenhum dos três, porque meio sistema lê como descuido.

- **Rótulo** (`Rotulo` / prop `rotulo`): 1 a 3 palavras, nomeia o assunto. "O acionamento",
  "Planos e preços", "Compromisso". Não é frase e não leva verbo.
- **Título:** a promessa da seção, em até 6 palavras.
- **Apoio:** uma frase que responde "por que esta seção existe". É o lugar certo para o fato que não
  cabe no título.

> Rótulo: "O acionamento"
> Título: "Como funciona quando você precisa"
> Apoio: "Quem nunca precisou não sabe o que acontece depois da ligação. É isto, na ordem."

O apoio aí faz o trabalho mais difícil do site: nomeia a ignorância do leitor **sem humilhá-lo**.
Essa é a régua.

---

## 4. Objeção

O setor esconde objeção. Aqui ela é conteúdo, porque o leitor nº 3 está procurando exatamente ela.

**Estrutura de três partes:**

1. **A pergunta na voz do leitor**, com as palavras dele. "O que eu faço na hora que acontece?", não
   "Procedimento de acionamento".
2. **A resposta direta na primeira frase.** Sem preâmbulo, sem "com certeza!". A pessoa pode parar de
   ler depois da primeira linha e ainda ter a resposta.
3. **O que fazer a seguir**, se houver.

> **"O que eu faço na hora que acontece?"**
> "Liga para (19) 3775-9752 ou (19) 3234-9752, a qualquer hora, todo dia. Alguém atende e conduz o
> resto. Você não precisa saber de nada nem ter documento em mãos para fazer essa ligação."

**Quando a resposta honesta é "ainda não sabemos":** use `Pendencia`. Diga o que falta, diga que foi
perguntado, diga o que fazer enquanto isso. Ver `provas.md`, parte 5. ⛔ Nunca resolva com
*"consulte condições"* nem com *"sem letra miúda"*: as duas são as muletas do Zelo e do Florees, e
as duas prometem transparência sem entregar nenhuma.

---

## 5. Meta descrição

É o texto que aparece no Google e no WhatsApp. Não é resumo da página, é o motivo de clicar.

- 140 a 160 caracteres.
- **Comece pelo fato diferenciador**, não pelo nome da empresa.
- Inclua a cidade. O site vive de busca local.
- Nada de "Bem-vindo", "Confira", "Saiba mais".
- Preço público pode entrar, e converte.

> "Serra Essencial a partir de R$ 18,90, Pérola R$ 97,90 e Total R$ 132,90 por mês. Todos com
> assistência 24 horas, traslado e cobertura nacional, mais os 20 itens inclusos."

⚠️ Ao mudar a manchete de uma página, confira se a meta ainda descreve a mesma coisa. São textos
diferentes, em arquivos diferentes, e desencontram com facilidade.

---

## 6. Antes e depois

### a) O eco do concorrente

**Antes:** "É o passo 1. O resto é com a gente."

**Problema:** a assinatura do Zelo é *"Nós cuidamos de todo o resto"* e o Florees usa a mesma frase.
Os dois maiores concorrentes, quase palavra por palavra.

**Depois:** "É o passo 1. Do passo 2 em diante, ninguém da família precisa ligar para mais ninguém."

**Por quê:** troca a promessa genérica por uma específica que os quatro passos logo acima já
provaram. E "ninguém precisa ligar para mais ninguém" é uma consequência que a pessoa consegue
imaginar; "o resto" não é.

### b) O adjetivo que não paga

**Antes:** "Atendimento humanizado e acolhedor em todas as nossas unidades."

**Problema:** dois adjetivos do quarteto obrigatório do setor, e uma afirmação que a empresa faz
sobre si mesma.

**Depois:** "As avaliações do Google descrevem o atendimento uma por uma, com o nome de quem
atendeu."

**Por quê:** o mesmo argumento, dito por terceiro, com link para conferir. Deixa de ser adjetivo e
vira prova. ⛔ E não cita o nome do colaborador, que é proibido no site.

### c) O eufemismo que esconde

**Antes:** "Amparo no momento da partida do seu ente querido."

**Problema:** "partida" e "ente querido" de uma vez. É a frase mais genérica possível no setor, e não
diz o que a empresa faz.

**Depois:** "Óbito é atendido 24 horas, todos os dias, inclusive no feriado."

**Por quê:** quem lê às 3h da manhã precisa reconhecer a palavra na tela. Eufemismo ali custa
segundos.

### d) O número que enfraquece

**Antes:** "1 crematório próprio"

**Problema:** o número 1 não impressiona ninguém e ainda parece pouco.

**Depois:** "Próprio — crematório, em Hortolândia"

**Por quê:** o que vale é a **palavra**, não a contagem: crematório próprio é a única coisa que o
Serra faz e os concorrentes da praça terceirizam. *(Este já está corrigido no site; está aqui porque
o raciocínio se repete em toda métrica pequena.)*

### e) O diferencial dito como commodity

**Antes:** cartão de destaque com "Cobertura nacional".

**Problema:** os cinco concorrentes anunciam isso. Num site cujo argumento é proximidade, gastar um
dos três lugares nobres com o argumento de escala do adversário é desperdício.

**Depois:** mantenha "cobertura nacional" como **fato** dentro da lista do plano, e use o lugar
nobre para o que só o Serra tem: a unidade na cidade da pessoa, com telefone que atende ali.

---

## 7. Lista de verificação antes de entregar

- [ ] Passa no **teste do concorrente**? (o Zelo poderia colar esta frase sem mudar nada?)
- [ ] Todo número e toda data têm fonte em `provas.md`?
- [ ] Nenhuma menção a carência, limite de idade, reajuste ou "desde 1961"?
- [ ] Nenhum travessão no meio da frase? Nenhuma exclamação?
- [ ] Nenhum adjetivo do quarteto (*humanizado, acolhimento, amparo, dignidade*) usado para a
      empresa **se descrever**? (citar a missão do cliente é permitido, ver `provas.md`)
- [ ] **Tem pelo menos uma frase escrita na direção do leitor**, que antecipe um medo concreto e o
      tire da frente? Se só há fato verificável, o texto está correto e gelado.
- [ ] O CTA diz o que acontece no clique?
- [ ] Se é página de obituário ou homenagens: **nada de venda**?
- [ ] As interpolações (`{SITE.idadeTexto}`, `{UNIDADES.length}`) continuam de pé?
- [ ] Se mexeu em manchete de herói ou fecho: conferiu o `<h1>` com `curl | sed 's/<[^>]*>//g'`?
- [ ] O diff só tem string? Nenhuma `className`, nenhuma tag, nenhum import?
- [ ] **Nenhum `alt`, nenhum `aria-*`?** Acessibilidade não é comunicação e não se mexe aqui.
- [ ] `npm run build` passou?
