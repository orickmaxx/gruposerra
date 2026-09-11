---
name: comunicacao-serra
description: Escreve e revisa o texto COMERCIAL e editorial do site do Grupo Serra — manchete, subtítulo, rótulo de botão, texto de cartão, FAQ, meta descrição, mensagem pronta de WhatsApp, artigo de blog e legenda de foto. Não encosta em acessibilidade: alt e aria-label ficam de fora. Traz a voz da marca, o banco de fatos verificáveis, os gatilhos permitidos e proibidos, o sistema de CTA e o mapa de como os concorrentes (Zelo, Florees, Bom Pastor, Flamboyant, Parque das Flores) escrevem, para que o Serra não repita o clichê do setor e diga por que escolher esta funerária e não a outra. Ensina onde mora o acolhimento de verdade num site de funerária: no que o texto diz sobre o leitor, não nos adjetivos que a empresa usa para se descrever. Use SEMPRE que a tarefa mexer em palavra visível, mesmo que o pedido pareça pequeno ("troca esse título", "melhora esse parágrafo", "reescreve essa seção", "revisa a home", "o texto está fraco", "deixa mais acolhedor", "está frio", "está seco"), e mesmo quando vier junto de trabalho de layout. Use também antes de escrever texto novo para página nova, descrição de plano, e-mail, anúncio ou legenda de rede social do Grupo Serra.
---

# Comunicação do Grupo Serra

Esta skill existe porque o texto é a única parte do site que o cliente final realmente compara.
Ele abre três abas, vê três funerárias com a mesma foto de mãos dadas e as mesmas quatro palavras
(*humanizado, acolhimento, amparo, dignidade*), e escolhe por preço. Quando todo mundo diz a mesma
coisa, ninguém disse nada, e o barato ganha.

O trabalho aqui é o contrário disso: **dizer o que só o Grupo Serra pode dizer, e provar cada frase.**

Leia primeiro `CLAUDE.md` (partes 0.2, 1.2 e 4) e `PRODUCT.md`. Esta skill não substitui nenhum
dos dois. Ela é a camada de texto em cima deles.

---

## 0. O limite do trabalho: só palavra

O pedido que gera esta skill é sempre o mesmo, e ele é estreito de propósito: **melhorar o texto
sem mexer no site.** Então o diff obedece a uma regra dura:

> **Só muda string.** Nenhuma `className`, nenhuma tag, nenhum import, nenhum `style`, nenhuma
> prop que não seja texto, nenhum arquivo em `src/app/globals.css`.

O que pode mudar: texto dentro de JSX, valores de string em `src/data/*.ts`, `apoio=`, `rotulo=`,
`titulo=`, `legenda=`, `title`/`description` de metadata, e as mensagens prontas de WhatsApp em
`src/lib/site.ts`.

> ⛔ **`alt` e `aria-label` estão FORA. Nunca toque neles.** Não são comunicação, são acessibilidade:
> quem lê é uma pessoa cega, por leitor de tela, e o trabalho daquele texto é **descrever a imagem**,
> não vender nada. Reescrever um `alt` com critério de marketing troca a descrição do que está na
> foto por adjetivo de marca, e a pessoa perde a informação sem ninguém perceber. O mesmo vale para
> `aria-label`, `aria-describedby`, `role` e qualquer atributo `aria-*`. Se o texto de acessibilidade
> parecer ruim, **relate ao usuário e pare**: é outro trabalho, com outro critério, e provavelmente
> outra pessoa.

**Se o texto novo não couber, encurte o texto.** Não alargue o `max-w-[54ch]`, não troque
`text-t2` por `text-t3`, não acrescente um `<br>`. O layout foi medido no pixel e o contraste foi
verificado em cima da fotografia já renderizada. A palavra é a parte negociável, o continente não é.

Quando o texto certo genuinamente não couber no espaço que existe, **diga isso em vez de espremer
uma frase ruim**: "esta manchete precisa de 3 linhas e o componente foi escrito para 2" é um
resultado útil. Enfiar uma frase pior para caber não é.

---

## 1. Para quem você está escrevendo

Três pessoas em estados opostos usam o mesmo site. Escrever para a média das três é o erro clássico
do setor, e é o que faz um site de funerária soar como folheto de banco.

**1. Quem acabou de perder alguém.** Celular, de madrugada, muitas vezes chorando, às vezes
dirigindo. **Não está lendo.** Está procurando um número de telefone. Para essa pessoa o texto é
sinalização, não argumento: verbo no imperativo, frase de cinco palavras, o número visível dentro
do próprio botão. Nenhuma venda, nenhuma vantagem, nenhum adjetivo. Se você escreveu uma oração
subordinada, você escreveu para outra pessoa.

**2. O associado atrás da 2ª via do boleto.** Perfil mais velho, muitos com pouca familiaridade
digital, e boa parte **já frustrada** por tentativas anteriores: é a reclamação nº 1 da empresa no
Reclame Aqui. O texto aqui é instrução, não persuasão. Diga o que a pessoa precisa ter em mãos, o
que vai acontecer depois de cada clique e o que fazer se der errado. Nunca a culpe pelo erro.

**3. Quem pesquisa plano com calma.** Entre 45 e 65 anos, decidindo por si ou pelos pais. É o único
dos três que lê a página inteira, o único que compara com concorrente e o único que gera receita
nova. É para essa pessoa que vale escrever parágrafo, comparação, número e objeção respondida.

Antes de escrever qualquer linha, diga em uma frase qual dos três está do outro lado. Se a resposta
for "os três", a seção está mal definida, não o texto.

---

## 2. A tese: o que destaca o Grupo Serra

O setor inteiro vende **escala** ("4 milhões de associados", "2.000 cidades") ou **ambiente**
("sereno", "cafeteria", "sofisticado"). O Serra não ganha em nenhum dos dois e **não deve tentar**.

O território vago é ser **verificável e perto**. Cinco argumentos, e cada um é conferível por quem
está lendo — que é exatamente o que os concorrentes não conseguem oferecer:

1. **Oito unidades próprias, com endereço, bairro e telefone local.** O Florees tem um endereço só e
   escreve "atendemos *principalmente* em Campinas e região". O Zelo tem 300 unidades e não cita um
   único bairro em todo o site: para eles cidade é um modal de estoque. Proximidade não está no
   vocabulário de ninguém na praça. **É o argumento mais forte que a empresa tem, e ele se prova
   sozinho: é só a pessoa reconhecer a rua.**
2. **Crematório próprio**, o Complexo Memorial Hortolândia, desde 2021. Os concorrentes da praça
   terceirizam. Escreva a palavra "próprio", não o número 1.
3. **Plantão de óbito 24 horas que não fecha em feriado.** ⚠️ Sozinho isso **não diferencia nada**:
   os cinco concorrentes dizem a mesma coisa com a mesma ênfase. Só vira argumento quando vem
   colado na prova de proximidade ("o telefone da unidade da sua cidade, não um 0800").
4. **Gente com nome.** As nove avaliações reais do Google elogiam **pessoas**: Rosemeire, Robson,
   Anderson, Thalia, Julio, Patrícia. Uma delas conta um enterro resolvido em outra cidade com dez
   minutos de folga. O Zelo, líder nacional, **não tem um único depoimento** no site inteiro; a
   prova social dele é "4 milhões". Cliente com nome e rosto é território vago no setor.
   ⛔ Mas **não liste nomes de colaboradores no site**: o dono já mandou remover uma vez, porque
   quem for desligado amanhã vira problema de RH pendurado no HTML. O fato se conta sem a lista.
5. **O obituário não vende nada.** O Zelo põe cartão de plano com preço, CTA "Quero contratar um
   plano funerário" e faixa de promoção na página de velório online. Não fazer isso é diferencial de
   caráter, e é percebido.

**O sexto argumento é o mais raro e ainda está travado:** dizer **carência, limite de idade e
reajuste** ao lado do preço. Em cinco concorrentes levantados, reajuste aparece **uma vez**, e
carência junto do preço **uma vez**. O líder do país esconde a carência num post de blog. O dia em
que o cliente confirmar esses números (parte 7 do `CLAUDE.md`), o Serra será o único da praça a
publicá-los, e isso é copy e blindagem de Procon pelo mesmo movimento. **Até lá, ver a parte 5.**

---

## 3. O clichê do setor: onde o Serra desaparece

Levantado palavra por palavra nos sites de Zelo, Florees, Bom Pastor, Flamboyant e Parque das
Flores em 11/09/2026. Se a frase que você escreveu está aqui, ela existe idêntica em quatro
concorrentes e não comunica nada.

> ⚠️ **O que está proibido é a DIREÇÃO da frase, não a palavra.** Estas palavras viram clichê
> quando a empresa as usa **para se descrever**: "nosso atendimento é humanizado e acolhedor" é uma
> afirmação sobre nós, e quatro concorrentes já fizeram a mesma. As mesmas palavras são legítimas
> em dois lugares: **citando o texto institucional da própria empresa** (missão, visão e valores,
> ver `provas.md`) e **descrevendo o que a família recebe**, quando vier com o fato junto. Ler a
> parte 4.1 antes de aplicar esta tabela, senão o resultado é um site correto e gelado.

| Não escreva | Por quê |
|---|---|
| **"ente querido"** | Aparece em 100% dos sites do setor. É a expressão mais gasta que existe. |
| **"atendimento humanizado"** | Todos dizem. Nenhum prova. Mostre o que foi feito, não o adjetivo. |
| **"acolhimento", "amparo", "dignidade e respeito"** | O quarteto obrigatório do setor. Usar ao menos três é a regra da casa dos outros. |
| **"tranquilidade"** como benefício-fim | É o mesmo produto emocional que os cinco vendem com a mesma palavra. |
| **"a partida", "quem se foi", "aqueles que partiram"** | Eufemismo para não escrever o que aconteceu. O Zelo escreveu um site inteiro sem a palavra "morte". |
| **"Saiba mais", "Ver mais", "Informações sobre"** | O botão genérico domina o setor. Verbo de compra é raríssimo. Ver parte 6. |
| **"cada detalhe", "na hora da dor", "ato de amor", "porto seguro", "ombro amigo"** | Bordões do Florees e do Bom Pastor. |
| **"Nós cuidamos de todo o resto"** | Assinatura do Zelo **e** do Florees, quase palavra por palavra. Ver o exemplo 1 da parte 8. |
| **"cobertura nacional" e "24 horas" como diferencial** | São tabela de entrada. Todo mundo tem. Podem ser ditos como **fato**, nunca como vantagem. |
| **travessão no meio da frase** | Já é regra do `CLAUDE.md`, e agora tem bônus: o Florees usa mais de 40 vezes. É o tique tipográfico deles. |
| números sem fonte ("50 mil vidas acolhidas", "98% satisfeitas") | O setor está cheio. É exatamente o que o Serra não faz. Ver parte 5. |

**Teste do concorrente.** Antes de aprovar uma frase, pergunte: *o Zelo poderia colar esta frase no
site deles sem mudar uma vírgula?* Se puder, a frase não é sobre o Grupo Serra. Reescreva até que
só caiba aqui — normalmente porque ela passou a citar um endereço, um telefone, uma cidade, um ano,
o crematório próprio ou uma coisa que aconteceu de verdade.

---

## 4. A voz

**Frase curta. Português claro. Verbo concreto.** O tom humano e sem eufemismo corporativo é o que
as avaliações do Google elogiam. É ativo de marca, não estilo de redator.

- **Sem travessão no meio da frase.** Ponto final ou vírgula.
- **Sem humor.** Sem ironia, sem trocadilho.
- **Sem urgência de e-commerce.** Nada de contador, "últimas vagas", desconto piscando. O setor
  inteiro respeita isso, e quebrar essa regra destruiria a confiança de uma vez.
- **Sem exclamação.** Ela sempre soa a vendedor.
- **Segunda pessoa.** "Você liga", não "o cliente aciona a central".
- **Traduza o jargão.** O vocabulário é o da família, não o do funerário. "Encomendação",
  "paramentação" e "tanatopraxia" são palavras de dentro da empresa. Quando precisarem aparecer
  (a lista dos 20 itens inclusos é contrato, não copy), explique ao lado.
- **Adjetivo é dívida; fato é pagamento.** Toda vez que escrever "completo", "excelente",
  "diferenciado", troque pelo fato que fez você querer usar o adjetivo. Se não houver fato, corte.
- **Nomeie o que aconteceu quando a clareza importa.** Em contexto operacional, escreva "óbito" e
  "falecimento" sem rodeio: quem procura socorro às 3h precisa reconhecer a palavra na tela, e
  eufemismo ali custa segundos. Em contexto de luto, escolha a palavra mais suave **que continue
  sendo verdade**. O que não se faz nunca é usar eufemismo para **esconder um fato comercial**.
- **Números tabulares.** Telefone, preço e data usam a classe `numerais`, que já existe. Ao editar,
  não tire a classe junto.

### 4.1 O calor, e onde ele mora de verdade

Este site precisa ser **acolhedor**. Não é enfeite: metade de quem chega está em pânico, e a
pergunta que essa pessoa faz não é "esta empresa é confiável", é **"vão cuidar de mim?"**. Prova
responde à primeira. Só calor responde à segunda, e é a segunda que faz alguém ligar.

O erro fácil é achar que calor mora nas palavras quentes. Não mora: o setor inteiro já gastou
todas elas, e um site montado com *acolhimento, amparo, dignidade e humanizado* soa a folheto, não
a cuidado. Calor mora em três lugares, e nenhum deles é adjetivo.

**1. Direção.** Fale do leitor, não de si. É a regra que resolve quase tudo.

| Frio, apesar de parecer quente | Quente, sem uma única palavra quente |
|---|---|
| "Atendimento humanizado e acolhedor." | "Você não precisa ter documento em mãos nem saber o que dizer." |
| "Amparo em todos os momentos." | "Alguém atende e conduz o resto." |
| "Cuidamos de cada detalhe com respeito." | "Não há conta para acertar naquele momento." |

A coluna da direita é o site como ele já é nos melhores trechos. Nenhuma daquelas frases se elogia,
e todas antecipam um medo concreto e o tiram da frente. **É isso que as avaliações do Google
elogiam**, e é reproduzível: pense no que a pessoa está com medo de que aconteça, e diga que não vai
acontecer.

**2. Antecipação.** Nomeie o que a pessoa não sabe, antes de ela ter que admitir que não sabe.
"Quem nunca precisou não sabe o que acontece depois da ligação. É isto, na ordem." Isso é
hospitalidade: poupa alguém de fazer uma pergunta que envergonha. ⛔ Sem nunca soar condescendente:
a pessoa está em luto, não é ignorante.

**3. Permissão.** Diga que está tudo bem não saber, não ter decidido, não conseguir pensar agora.
"Cremar ou sepultar quase nunca é decisão de uma pessoa só" acolhe a família inteira sem pedir nada
em troca.

**O modo de falha a evitar é a frieza.** Um texto que só enuncia fato verificável lê como planilha,
e planilha não consola ninguém às 3 da manhã. Se ao reler a seção você não encontrar **nenhuma
frase escrita na direção da pessoa**, o texto está incompleto, mesmo que cada linha seja verdadeira
e nenhuma seja clichê. Prova e calor não competem por espaço: a prova sustenta, o calor recebe.

### 4.2 Missão, visão e valores: texto da casa

A empresa tem missão, visão e valores escritos, e eles usam o vocabulário do setor de propósito.
**Isso não é clichê a corrigir, é a voz institucional do cliente**, e ele é o dono dela. O texto
integral está em `provas.md`.

- **Citar é permitido e recomendado** onde o gênero pede (página institucional, "sobre").
  Quando citar, **cite como declaração da empresa**, não como afirmação sua sobre a empresa.
- ⛔ **Não reescreva a missão para "melhorar" o vocabulário dela**, e principalmente não comente a
  missão com ironia ou distanciamento. Já aconteceu aqui uma vez: o parágrafo virou "toda funerária
  escreve uma missão parecida", o que rebaixa o texto do próprio cliente dentro do site dele.
- O que você **pode** fazer é encostar prova nela: a missão diz uma coisa, e as avaliações do Google
  contam a mesma coisa acontecendo. Declaração mais evidência vale mais que declaração sozinha.

### O slogan

**"Essencial nos momentos mais difíceis da vida."** É oficial e se mantém, sempre literal. Mas
"momentos difíceis" **não** é vocabulário para o corpo do texto: aparece em todos os concorrentes.
A frase é assinatura, não matéria-prima.

---

## 5. O que nunca pode ser escrito

Em funerária, promessa errada sobre carência ou cobertura é processo, não é bug de conteúdo. Estas
são proibições, não preferências. A lista completa e a fonte de cada fato liberado estão em
**`references/provas.md`**, que deve ser lido antes de escrever qualquer número.

**Proibido em qualquer texto, até o cliente confirmar por escrito:**

- **Carência, limite de idade e regra de reajuste.** Nenhum número, nenhuma faixa, nem "sem
  carência", nem "sem letra miúda". Todo plano funerário tem carência; omitir em página de venda é
  problema de Procon, e inventar é pior.
- **"Desde 1961".** Não existe prova pública; o CNPJ ativo é de 1992. O site diz o que o CNPJ
  sustenta, e a frase sai sozinha de `SITE.idadeTexto`. **Nunca escreva o ano na mão.**
- **Número de associados, de colaboradores, de famílias atendidas.** Nada disso é público.
- **Nome do fundador**, parceiros do Clube de Benefícios, a parceria com a Unimed.
- **Nome de colaborador** em texto do site, mesmo elogiado no Google.

**Quando falta o dado, a interface declara a lacuna.** Existe um componente para isso, `Pendencia`,
e ele é a regra 1 do `CLAUDE.md` virando peça de tela. Declarar "a carência ainda não está
publicada, e perguntamos isso à empresa" é mais honesto que o asterisco "consulte condições" que o
setor inteiro usa, e converte melhor com o leitor nº 3, que é justamente quem procura a informação
escondida. **Se a única saída for inventar, a saída certa é não escrever a seção.**

---

## 6. CTA

O padrão do setor é o botão que não diz nada: "Saiba mais", "Ver mais", "Informações sobre planos",
"Fale com um consultor". Dos cinco concorrentes, **um** usa verbo de compra. O Zelo chega a ter um
"CONTRATE AGORA" na home cujo destino é `href="#"`.

**Regras:**

1. **O rótulo diz o que acontece no clique, nas palavras de quem lê.** "Ver planos e preços",
   "Abrir o obituário", "Falar sobre os planos". Não "Saiba mais".
2. **O telefone vence tudo.** Em qualquer página, em qualquer rolagem, no celular. O rótulo carrega
   o número visível, porque o número **é** a informação: `Ligar agora, (19) 3775-9752`.
3. **Uma ação principal por tela.** As secundárias existem, mas não competem em peso de texto.
4. **CTA de WhatsApp leva mensagem pronta escrita na voz de quem envia**, não na da empresa: "Olá,
   vim pelo site e gostaria de informações sobre o plano." Primeira pessoa, sem adjetivo.
5. **Nada de CTA de venda na página do obituário e nas homenagens.** Nem banner, nem pop-up, nem
   rodapé de plano. É regra de produto.
6. **Rótulo que promete uma tela precisa que a tela exista.** O Florees destaca "Portal Do Cliente"
   no menu e o botão rola para um formulário. Não faça isso.

---

## 7. Gatilhos: quais valem aqui

**Permitidos, porque são verdadeiros:**

- **Antecipação, sem culpa.** "Contratar antes é o que evita que a família tenha que decidir preço
  no pior dia." Descreve uma consequência real, não acusa ninguém.
- **Prova verificável.** Endereço, bairro, telefone local, ano, foto do lugar, avaliação com link
  para o Google de origem.
- **Sequência.** Quem nunca enterrou ninguém não sabe o que acontece depois da ligação, e essa
  ignorância é uma das coisas que mais assusta. Explicar a ordem dos acontecimentos acalma mais que
  qualquer adjetivo. É a seção "Como funciona", e é o melhor movimento do Florees também.
- **Reciprocidade de informação.** Publicar o que os outros escondem compra confiança de graça.
- **Autoridade legal.** A Lei Federal nº 13.261/16 rege o plano de assistência funerária e a Lei
  nº 6.015/73 trata da autorização da família para cremação. Citar a norma pelo número responde à
  desconfiança antes de ela virar pergunta. ⛔ Mas nunca escreva "empresa licenciada" ou
  "certificada": não há prova de registro em mãos, e isso é afirmação sobre a empresa, não sobre a
  lei.

**Proibidos:**

- **Medo.** "Uma hora vai acontecer com alguém que você ama." Nem na boca da empresa nem colada num
  depoimento para parecer que veio do cliente.
- **Culpa.** "Não deixe esse peso para sua família."
- **Escassez e urgência artificial.** Qualquer forma.
- **Sorteio, prêmio e raspadinha.** Existem no setor. Aqui não.
- **Religião**, enquanto o cliente não decidir. A LP antiga dele fecha com "Deus permitiu a nós
  sermos a ponte de conforto e consolo na maior dor do ser humano", e essa escolha ainda não foi
  confirmada para o site novo. Não introduza tom religioso por conta própria.

---

## 8. Dois defeitos que já estão no site

São os exemplos mais úteis que existem, porque vieram de texto bom escrito por gente atenta.

**Exemplo 1 — o eco acidental.** `src/components/home/confianca.tsx` fecha a seção "Como funciona"
com *"É o passo 1. O resto é com a gente."* A linha é boa e o ritmo é bom. O problema é que a
assinatura do Zelo é *"Nas horas mais tristes, você cuida de quem você ama. Nós cuidamos de todo o
resto"*, e o Florees usa *"Nas horas mais difíceis, você cuida de quem ama. Nós cuidamos de todo o
resto."* — os dois maiores concorrentes, quase palavra por palavra. Quem lê os três sites na mesma
tarde vê o Serra ecoando os outros dois.

O reparo não é buscar sinônimo, é **trocar a promessa vaga por uma específica**: o que o Serra faz
a partir do passo 1 é concreto (remoção, papelada, certidão, cerimônia) e já está escrito nos
quatro passos logo acima. A frase final deve apontar para isso, não repetir o genérico.

**Exemplo 2 — o diferencial dito como commodity.** "Cobertura nacional" aparece 6 vezes no site,
inclusive como um dos três cartões de "O que está garantido". É verdade e precisa estar lá, mas é
**exatamente o que os cinco concorrentes anunciam**, e é o único dos três cartões que não distingue
o Serra de ninguém. Dito como fato dentro da lista do plano: certo. Ocupando um dos três lugares de
maior destaque da seção de garantias: desperdício de espaço nobre, num site cujo argumento é o
oposto de escala.

---

## 9. Armadilhas técnicas de quem mexe em texto

Estas já custaram rodada neste repositório. Texto encosta em todas as três.

**⛔ Manchete em máscara cola as palavras, e o conserto já existe.** Manchetes de herói e de fecho
usam `<TituloCine linhas={["...", "...", "..."]} />`, uma linha por bloco. `textContent` não insere
separador, então o `<h1>` chegava ao Google como `Estamos perto,e atendemos aqualquer hora.`.

**O espaço é inserido pelo próprio componente** (`src/components/ui.tsx`, no `map`: a última linha
vai crua, as outras vão com um espaço no fim). Então **escreva as strings do array normalmente, sem
espaço no fim** — acrescentar à mão duplica o espaço. A armadilha está fechada na estrutura.

O que continua sendo seu trabalho é **escolher as quebras**, que são decisão de ritmo e de layout, e
conferir o resultado como um rastreador confere:

```bash
curl -s http://127.0.0.1:4400/ | grep -o '<h1[^>]*>.*</h1>' | sed 's/<[^>]*>//g'
```

**⛔ O texto do título vem do array, o das outras seções não.** As duas pontas da página animam
linha por linha e precisam das quebras à mão. As quatorze seções do meio usam `TituloCine` com
`children` e aceitam qualquer texto. Não converta um no outro para "melhorar o texto".

**⛔ `SITE.idadeTexto` e `UNIDADES.length` são calculados.** "há mais de 30 anos" e "8 unidades"
aparecem interpolados de propósito, para que a frase se corrija sozinha quando o dado mudar.
Ao reescrever um parágrafo, **preserve a interpolação**. Trocar `{SITE.idadeTexto}` por "há mais de
30 anos" escrito na mão é regressão silenciosa.

**⛔ Meta descrição e manchete são textos diferentes.** `title` e `description` de cada rota vivem
em `generateMetadata()` e na constante `metadata` do arquivo de página. São o que aparece no Google
e no WhatsApp. Ao mudar a manchete de uma página, confira se a meta ainda descreve a mesma coisa.

---

## 10. Como trabalhar

1. **Leia o texto no lugar.** Abra o arquivo, veja a seção inteira e o que vem antes e depois.
   Nunca reescreva a partir do que o pedido citou: o pedido cita uma frase, a frase mora num ritmo.
2. **Nomeie o leitor** (parte 1) e o papel da seção. Uma frase, para você mesmo.
3. **Confira cada afirmação** contra `references/provas.md`. O que não tiver fonte vira `Pendencia`,
   vira fato menor que seja verdadeiro, ou sai.
4. **Aplique o teste do concorrente** (parte 3) em cada frase que sobrou.
5. **Escreva, e depois corte.** A primeira versão sempre tem um adjetivo a mais e uma oração
   subordinada que era para ser um ponto final.
6. **Confira o tamanho contra o que existe.** Manchete ganhou uma linha? Cartão estourou? Encurte o
   texto, não mexa na classe.
7. **Verifique.** `npm run build` precisa passar. Se a manchete de herói ou de fecho mudou, rode
   também o `grep` do `<h1>` acima e `node scripts/verificar-cinema.mjs`, que tem uma checagem
   específica para "toda linha de título termina em espaço". Lembre que **`next dev` não hidrata
   nesta máquina**: verificação roda contra `next build` + `npx next start -p 4400`.
8. **Entregue mostrando o antes e o depois**, com uma linha dizendo por que mudou. Quem aprova o
   texto é o dono, e ele decide melhor vendo o par do que vendo só o resultado.

---

## Arquivos de apoio

Leia sob demanda, não de véspera:

- **`references/provas.md`** — banco de fatos. O que pode ser afirmado, a fonte de cada dado, e a
  lista fechada do que é proibido escrever. **Leia sempre que o texto contiver um número, uma data,
  uma quantidade ou uma afirmação sobre a empresa.**
- **`references/concorrentes.md`** — o que cada concorrente diz, com citação literal: manchetes,
  CTAs, preços, como tratam objeção, o que escondem e onde são fracos. **Leia quando a tarefa for
  diferenciação, comparação, ou quando precisar decidir se uma frase é clichê.**
- **`references/padroes.md`** — fórmulas que funcionam aqui: estrutura de manchete, rótulo de CTA
  por intenção, como escrever a seção de objeções, e exemplos de antes e depois. **Leia ao escrever
  texto novo do zero.**
