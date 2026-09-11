# Como a concorrência escreve

Levantado em 11/09/2026 lendo o HTML público dos sites. Citações são literais. Serve para duas
coisas: saber o que **não** repetir, e saber onde o Serra tem espaço.

> **Limite ético.** O Florees é concorrente direto na mesma praça (parte 0.1 do `CLAUDE.md`). Tudo
> aqui veio do site **publicado** deles. Aprender com a estrutura pública é legítimo e está
> documentado onde acontece. Dado interno de concorrente não entra neste arquivo nem no site.

Índice:
- [1. Grupo Zelo](#1-grupo-zelo--o-líder-nacional)
- [2. Plano Florees](#2-plano-florees--o-vizinho-de-campinas)
- [3. Bom Pastor](#3-grupo-bom-pastor--o-mais-transparente-do-setor)
- [4. Flamboyant e Parque das Flores](#4-flamboyant-e-parque-das-flores)
- [5. O clichê e o território vago](#5-o-clichê-do-setor-e-o-território-vago)

---

## 1. Grupo Zelo — o líder nacional

`grupozelo.com`. É a régua de acabamento do setor no Brasil, e o dono escolheu comparar-se a ele.

**Manchete da LP de venda:** *"Proteja sua família com o melhor plano funerário do Brasil."*
Apoio: *"Plano funerário completo com benefícios em vida."*

**O achado mais forte é lexical.** Contagem nas páginas comerciais:

> **"morte" = 0 · "morrer" = 0 · "falecimento" = 0 · "luto" = 0 · "enterro" = 0**
> "óbito" = 23, e **sempre em função administrativa** ("Central de Óbitos", "em caso de óbito").

Escreveram um site de funerária inteiro sem nomear o produto. O evento é apagado; sobra o processo.

**A frase mais trabalhada deles:**
> *"Sem burocracias. Sem gastos inesperados. Nas horas mais tristes, você cuida de quem você ama.
> Nós cuidamos de todo o resto."*

A promessa não é enterrar ninguém. É **"você não vai ter que resolver nada"**.

**Preço:** "A partir de R$ 44,90/mês" estático no template, mas o preço real vem por API por cidade
e o plano de entrada em Belo Horizonte é **R$ 55,90**. Todos os registros trazem
`"ocultar_valor": "true"`. Preço é isca, não informação.

**Objeções — o padrão do setor inteiro:** a objeção não existe na página de venda, ela é empurrada
para o blog e para o telefone.
- Carência: citada duas vezes no FAQ **sem nunca dizer o prazo**. Os 90 dias só existem num post de
  blog.
- Limite de idade: virou vantagem, mas só no blog (*"No Grupo Zelo, não há limite de idade"*).
- **Reajuste: zero ocorrências em todo o site público.**
- Cancelamento: só no blog (*"após 3 meses sem pagamento, o plano pode ser cancelado"*).
- A muleta universal é o asterisco: *"\*Consulte condições e disponibilidade na região."*

**Contradição interna aproveitável:** a LP diz *"Sem taxas extras — Não existem pagamentos
adicionais"*, e o FAQ diz *"se for em cemitério particular a família paga a diferença do valor
coberto pelo plano"*.

**Prova social:** só números, sempre os mesmos quatro: *"+ 4 MILHÕES de associados · + 2.000 cidades
· + 300 unidades próprias · cobertura nacional"*. **Nenhum depoimento, nenhuma nota, nenhuma
estrela, nenhum selo, nenhum rosto, nenhum nome de gente** — nem de cliente, nem de fundador.

**CTA dominante não é comprar, é falar com humano:** "Fale com vendedor", "FALE COM UM CONSULTOR",
três 0800. O "CONTRATE AGORA" da home aponta para `href="#"`.

**🎯 Os três contrastes acionáveis:**
1. **A página de velório online deles VENDE**: carrega cartão de plano com preço, CTA "Quero
   contratar um plano funerário" e faixa de promoção. A regra do obituário que não vende é o oposto
   literal do que o líder faz.
2. **Nenhum vestígio de proximidade.** Nenhum bairro, nenhum ponto de referência, nenhum "perto de
   você". Cidade é modal de estoque ("INDISPONÍVEL NA SUA REGIÃO").
3. **Zero prova social humana.** O Serra tem 9 avaliações com nome, foto e link.

---

## 2. Plano Florees — o vizinho de Campinas

`planoflorees.com.br`. Mesma praça, mesmo produto.

**🔴 A home não tem um único `<h1>`.** O primeiro viewport é um carrossel de 4 banners `.webp`: toda
a promessa de venda está dentro de pixels, ilegível para buscador e para leitor de tela. O primeiro
heading da página é um `<h2>Como Funciona</h2>`, já abaixo da dobra.

**O que funciona como manchete é o `<title>`:** *"Florees Planos Funerários - Cuidado e Dignidade em
Campinas"*. Barra superior: *"Atendimento humanizado 24h em Campinas e região"*.

**Barra de 5 selos logo abaixo do carrossel**, que é o verdadeiro bloco de argumentação:
*"+20 Anos de História" · "Empresa Licenciada / Conforme a Lei Federal nº 13.261/16" · "Plantão 24
horas" · "Campinas e Região" · "Sem Taxas Extras"*.

**O movimento retórico mais afiado deles:** o argumento financeiro duro sai da boca do cliente, não
da empresa. Depoimento assinado:
> *"uma hora alguém que amamos vai partir... o que menos queremos é ter que resolver papelada e pior
> ter que dispor de valores altíssimos"*

A versão institucional do mesmo medo é suavizada: *"Você paga pequenas mensalidades e evita o
desembolso de valores altíssimos"*. **Medo terceirizado ao depoimento é técnica, e é proibida aqui.**

**Preço:** todos terminam em `,90`. Âncora invertida pelo Pet a **R$ 14,90**, que aparece como
primeiro cartão e faz os familiares (R$ 66,90 a R$ 94,90) parecerem perto de um piso baixo. O mais
caro leva **"★ Mais Escolhido"**. A tabela chama preço de *"Investimento mensal\*"*.

**Carência: respondida, e melhor que o Serra faz hoje.**
> *"Sim, como em todo plano de assistência funerária. A cobertura para morte acidental é imediata, e
> para morte natural há um período de carência informado de forma clara no momento da contratação,
> sem letra miúda."* — **sem nenhum número.**

Reajuste, cancelamento e reembolso: **zero ocorrências**.

**Bordões:** *"cada detalhe"*, *"na hora da dor"*, *"sem surpresas"*, *"ato de amor"*, *"porto
seguro"*, *"ombro amigo"*, *"quem você ama"*. Vocabulário mais repetido: `família` 38, `cuidado` 20+,
`respeito` 13, `luto` 12, `serenidade` 7, `amor` 7.

**Tique tipográfico:** travessão longo no meio da frase, 40+ vezes (*"Retirada do corpo – com cuidado
e agilidade"*). O `CLAUDE.md` já proíbe isso no Serra. Diferenciação de graça.

**Onde são fortes:** sistema de copy consistente (rótulo + título emocional + subtítulo, dez vezes
sem exceção); "Como Funciona" em 3 passos no topo; tabela comparativa; **depoimentos em áudio** com
player, que ninguém na praça tem; fricção zero para contato.

**🎯 Onde o Serra ganha:**
1. **Um endereço só** (R. Padre Vieira, 1101, Centro). Nenhuma unidade, nenhum mapa, nenhuma lista de
   cidades. *"Atendemos principalmente em Campinas e região... faremos o possível para auxiliar."*
   Contra 8 unidades com telefone local, é o buraco maior deles.
2. **"Portal Do Cliente" não existe** — é o botão mais destacado do menu e rola para um formulário.
   Sem 2ª via, sem área do associado, sem obituário, sem homenagens.
3. **Nenhuma fotografia do próprio lugar.** Nem recepção, nem sala de velório.
4. Zero schema.org, 5 tags og, sem sitemap.
5. Descuidos visíveis: *"Arranjos florais **professionals**"*, o depoimento que chama a empresa de
   "Funerária **Flores**", páginas indexadas que hoje dão 404.

---

## 3. Grupo Bom Pastor — o mais transparente do setor

`grupobompastor.com.br` (Barueri/SP, escala nacional, não é de Campinas). Copy mais sofisticada do
levantamento, e **o único que responde às objeções na hora de vender**.

**Dois sites com estratégias opostas.** O institucional abre com *"Multiassistência para uma vida
tudo de bom!"* e **não contém a palavra "funerário" acima da dobra** — vende saúde, pet, socorro
veicular. A landing de conversão abre com *"Planos Funerários com valores baixíssimos"* e o selo
*"A partir de: 19,90/mês"*.

**Carência, com as palavras exatas:** *"24 horas para morte acidental (exceto suicídio) e de 100 dias
para morte natural"*.

**Limite de idade, plano a plano, dentro do card de preço** — é o único site do setor que faz isso:
*"Titular e cônjuge (até 65 anos)"*, *"Filhos Solteiros (até 35 anos)"*, *"Pai, mãe, sogro, sogra
(sem limite de idade)"*.

**Reajuste: ausente**, como em todos.

**Dois movimentos que valem estudar:**
- **Traduzem o jargão:** escrevem *"Urna (Caixão)"*, com a tradução entre parênteses. Reconhecem que
  o vocabulário do setor não é o da família. O Serra escreve "urna mortuária" seco.
- **Atacam de frente a objeção "estou pagando por algo que só serve quando eu morrer"** com
  benefícios em vida. ⛔ Mas o jeito deles inclui **sorteio semanal de R$ 1.000 dentro de plano
  funerário**, que aqui é proibido.

**CTA notável:** *"2ª Via de Boleto / Carnê"* fica no topo, **com o mesmo peso visual de "Seja Nosso
Cliente"**. Dado que boleto é a reclamação nº 1 do Serra, subir isso ao nível da venda é imitar o
melhor do setor, não inventar.

---

## 4. Flamboyant e Parque das Flores

**⚠️ Correções de fato sobre o `CLAUDE.md`:**
- `grupoparque.com.br` **não é de Campinas**. Redireciona para `camposantoparquedasflores.com.br`,
  que é o Campo Santo Parque das Flores de **Maceió/AL** (DDD 82). A régua da parte 6 do `CLAUDE.md`
  mede a empresa errada nessa coluna. O homônimo campineiro é `memorialparquedasflores.com.br`.
- Existem **duas Flamboyant**: `flamboyantgrupo.com.br` (a do Grupo Zelo) e
  `funerariaflamboyant.com.br`, que é outra operação disputando **Sumaré e Hortolândia**, onde o
  Serra tem unidade e o crematório.

**Flamboyant/Zelo** (`flamboyantgrupo.com.br`): o mais frio dos levantados. Tagline *"Valorize a
memória do seu ente querido."* — "valorize" é verbo de patrimônio, não de afeto. **Todos os CTAs são
"informações sobre", nenhum é "contratar"**, e os de plano apontam para fora, para o televendas do
Zelo. Preço: ausente. Objeções: ausentes. Depoimentos: zero. Lista "lanchonete" e "estacionamento"
como diferenciais de venda, sem uma linha de texto cada.

**Funerária Flamboyant** (`funerariaflamboyant.com.br`): a mais agressiva, e a única com verbo de
compra (**"Contratar agora"**). *"PLANO ASSISTÊNCIA FLAMBOYANT INDIVIDUAL 24 HORAS — Tranquilidade
por apenas R$ 14,90/mês"*. É a **única das cinco que ancora contra o funeral avulso**: *"um funeral
custa em média de R$ 3.000,00 a R$ 5.000,00 na Região Metropolitana de Campinas"*. E a única que
trata reajuste como argumento: *"sem reajuste nos 12 primeiros meses"*. Carência explícita: 90 dias
para morte natural, sem carência para acidental.

**Parque das Flores/Maceió:** vende **ambiente**, não emoção. *"um ambiente sereno e confortável"*,
cafeteria com nome próprio tratada como atributo. A palavra "morte" não aparece uma vez. Preço:
ausente. Objeções: nenhuma. Prova social: quase nula. **O site está em produção com um recado de
desenvolvedor visível ao público**: sob o título "Translado", o texto do card é *"Verificar a posição
das imagens e dos textos. O final dos parágrafos aparece cortado pela imagem."* Certificado TLS
quebrado. Compensa com blog de apoio ao luto sem venda acoplada, que é o único do gênero na amostra.

**Parque das Flores/Campinas:** três planos nomeados por metal, nenhum preço. Mas é o único que
**transforma objeção em benefício de venda**, em bullets: *"Sem Limite de Idade"*, *"Portabilidade"*,
*"Reembolso"*, *"Flexibilização"*. A portabilidade vem explicada: *"Tornar-se cliente sem carência
trazendo as duas últimas parcelas pagas"* — copy desenhada para roubar cliente de concorrente, e
quase inexplorada na praça.

---

## 5. O clichê do setor e o território vago

### O que todos dizem igual

1. **"ente querido"** — 100% dos sites.
2. **"cobertura nacional" + "atendimento 24 horas"** — ditos por todos com a mesma ênfase. Deixaram
   de diferenciar; são tabela de entrada.
3. **"humanizado" / "acolhimento" / "amparo" / "dignidade e respeito"** — o quarteto obrigatório.
   Todos usam ao menos três. **Nenhum prova nenhum.**
4. **"tranquilidade"** como benefício-fim.
5. **Contagem de anos como primeiro argumento** (50 / 45 / 40 anos).
6. **Eufemismo sistemático para morte.** "Morte" só é escrita quando é juridicamente obrigatório.
7. **Clube de descontos / "benefícios em vida"**, com quase a mesma frase, para resolver a mesma
   objeção.
8. **Lista de coberturas em bullets idênticos, na mesma ordem.**
9. **Botão genérico:** "Saiba Mais", "Ver mais", "Informações sobre".
10. **Nome de plano por metal, joia ou adjetivo vago.** Nenhum nome diz o que o plano faz.
11. **Ausência de urgência comercial.** Nenhum contador, nenhuma vaga limitada. Nisso o setor inteiro
    é sóbrio, e a regra do `CLAUDE.md` está alinhada ao padrão, não à frente dele.

### O que é raro ou ausente — onde o Serra pode ir

| Espaço aberto | Quem já ocupa |
|---|---|
| 🔴 **Regra de reajuste publicada** | 1 menção em 5 sites. Praticamente inexistente. |
| 🔴 **Carência dita onde se vende**, junto do preço | só Bom Pastor |
| 🔴 **Limite de idade por dependente, no card do plano** | só Bom Pastor |
| **Preço na home** | só Bom Pastor e Funerária Flamboyant. **O Serra já faz.** |
| **Depoimento real com nome e rosto** | só Bom Pastor. Zelo e Flamboyant: zero. **O Serra já tem 9.** |
| **Fotografia real do próprio lugar no 1º viewport** | **nenhum dos cinco.** O Serra já faz. |
| **Proximidade dita com bairro e telefone local** | nenhum |
| **Obituário tratado como peça compartilhável, sem venda** | nenhum (o Zelo faz o contrário) |
| **Conteúdo de apoio ao luto sem venda acoplada** | só Parque/Maceió |
| **2ª via de boleto como CTA de topo** | só Bom Pastor |
| **Traduzir o jargão do setor** | só Bom Pastor |
| **Portabilidade sem carência** | só Parque/Campinas |

### Em uma linha

O setor vende escala ou ambiente, e **todos escondem as três coisas que o cliente precisa saber:
carência, idade e reajuste**. O Serra não ganha em escala e não precisa. O território vago é o
contrário do clichê: **dizer o número que os outros omitem, e mostrar o lugar que os outros não
fotografam.** Onde eles escrevem "transparência", aqui dá para mostrar.
