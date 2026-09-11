# Banco de provas

O que pode ser escrito no site, e a fonte de cada coisa. **Nada que não esteja aqui vira texto.**

Levantado em 02/09/2026, concorrência reconferida em 11/09/2026. Se um dado envelhecer, corrija
aqui e no `CLAUDE.md` juntos, senão a skill começa a mentir com confiança.

Índice:
- [1. Liberado, com fonte](#1-liberado-com-fonte)
- [2. Proibido](#2-proibido)
- [3. Zona amarela](#3-zona-amarela)
- [4. Frases prontas já validadas](#4-frases-prontas-já-validadas)
- [5. Como declarar uma lacuna](#5-como-declarar-uma-lacuna)

---

## 1. Liberado, com fonte

### Identidade

| Fato | Como escrever | Fonte |
|---|---|---|
| Nome | **Grupo Serra** | marca |
| Razão social | Empresa Funerária e Plano Assistencial Serra Ltda | Receita Federal |
| CNPJ | 68.932.722/0001-18 | Receita Federal |
| Slogan | "Essencial nos momentos mais difíceis da vida." | cliente, literal |
| Idade | **`{SITE.idadeTexto}`** → "há mais de 30 anos" | CNPJ aberto em 07/10/1992 |
| Matriz | Rua Regente Feijó, 701, Centro, Campinas/SP | Receita Federal |

> ⛔ **Nunca escreva a idade na mão.** `SITE.idadeTexto` vira "desde 1961" sozinho no dia em que
> `fundacaoConfirmada` virar `true`. Texto escrito na mão não acompanha.

### Estrutura física

| Fato | Escrever assim | Fonte |
|---|---|---|
| 8 unidades próprias | `{UNIDADES.length}` unidades, em Campinas (2), Valinhos, Artur Nogueira, Vinhedo, Hortolândia, Cosmópolis e Sumaré | `src/data/unidades.ts`, com endereço e telefone de cada |
| Crematório próprio | "crematório próprio, no Complexo Memorial Hortolândia" | empresa do grupo, CNPJ 34.503.357/0001-04, inaugurado em agosto/2021 |
| Estrutura do Memorial | 4 salas de velório climatizadas, sala de homenagens, sala de despedida, crematório, velório virtual, espaço de café, estacionamento | site do Memorial |
| Plantão | "Óbito é atendido 24 horas, todos os dias, inclusive feriado" | site do cliente |
| Balcão | seg a sex 8h-18h (Valinhos, Vinhedo e Cosmópolis 8h-17h) | `unidades.ts` |

### Planos e cobertura

| Fato | Escrever assim | Fonte |
|---|---|---|
| Serra Essencial | "a partir de R$ 18,90 por mês" | LP do cliente, 02/09/2026 |
| Serra Pérola | "a partir de R$ 97,90 por mês" | idem |
| Serra Total | "a partir de R$ 132,90 por mês" | idem |
| Empresarial e Serra Pet | sem preço público, "sai por proposta" | idem |
| Em todos os planos | assistência 24 horas, traslado, cobertura nacional | idem |
| Traslado | "gratuito até 100 km" | idem |
| Quem entra | cônjuge, filhos, pais e sogros. Essencial aceita até 10 dependentes adicionais | idem |
| Cremação | "contratada como serviço adicional dentro do plano", podendo valer só para quem quiser | idem |
| Troca de plano | permitida, para mais ou para menos cobertura | idem |
| Serra Pet | até 3 pets, remoção 24h na região de Campinas, cremação individual ou coletiva, certificado | `serrapet.com.br` |

**Os 20 itens inclusos** estão em `PLANOS.INCLUSOS` (`src/data/planos.ts`) e saíram do HTML da home
antiga do cliente. É a lista mais forte que a empresa tem e pode ser citada inteira ou em parte.

### Texto institucional oficial, na íntegra

Escrito pelo próprio cliente. **Pode ser citado como declaração da empresa.** Usa o vocabulário do
setor de propósito, e isso é escolha do dono, não defeito a corrigir. Ver a parte 4.2 do `SKILL.md`.

> **Missão.** "Garantir que os contratos e as cerimônias fúnebres sejam dignas, humanizadas e
> proporcione aos clientes, familiares e amigos a tranquilidade e conforto, rompendo as barreiras
> em um momento difícil e de dor."

> **Visão.** "Ser reconhecida por nossos clientes, colaboradores e sociedade como uma empresa de
> tradição, sólida, moderna e permanente na prestação de serviço."

> **Valores.** "Nossos valores envolvem trabalhar de forma humanitária respeitando nossas
> tradições. Presamos pela transparência nas ações e qualidade em nosso trabalho. A atenção aos
> detalhes, respeito com as pessoas, o meio ambiente e sociedade. Procuramos constantemente a
> excelência na execução dos nossos processos."

**Slogan:** "Essencial nos momentos mais difíceis da vida."

> ⚠️ **O trecho que NÃO pode sair da aspas.** O texto do cliente continua: *"Valores como
> honestidade, ética e carinho pelas pessoas, nos transformaram na maior e mais tradicional empresa
> do setor de planos funerários da região de Campinas-SP."* **"A maior e mais tradicional" é
> superlativo não verificável**, e o Serra não é a maior da praça em escala (o Zelo, via Flamboyant,
> tem cobertura nacional). Citar dentro de aspas, atribuído à empresa, é uma coisa; o site afirmar
> isso em voz própria é outra, e essa não pode. Está na lista de perguntas ao cliente.

> ⚠️ O fecho da LP antiga, *"Deus permitiu a nós sermos a ponte de conforto e consolo na maior dor
> do ser humano"*, é do cliente e tem tom religioso explícito. **A decisão de manter isso no site
> novo ainda não foi tomada.** Não introduza tom religioso por conta própria; se o dono pedir, ele
> existe e é dele.

### Leis que podem ser citadas pelo número

- **Lei Federal nº 13.261/16** — regulamenta os planos de assistência funerária no Brasil.
- **Lei Federal nº 6.015/73** — exige autorização da família para cremação.

Cite a lei. ⛔ Não afirme condição da empresa perante ela ("licenciada", "certificada",
"regularizada"): não há documento em mãos.

### Prova social

- **9 avaliações reais do Google**, em `src/data/depoimentos.ts`, com nome do autor, foto, data e
  link para o Google de origem. Podem ser citadas literalmente.
- **Nota 4,1/5** na matriz de Campinas. ⚠️ Ver zona amarela.
- O que as avaliações descrevem, e pode ser dito em voz própria: paciência, explicação com calma,
  agilidade, respeito, equipe que resolve o que a família não consegue.

---

## 2. Proibido

Estas não entram em texto nenhum até o cliente responder por escrito. São as perguntas abertas da
parte 7 do `CLAUDE.md`.

| Proibido | Por quê |
|---|---|
| 🔴 **Carência** — qualquer prazo, qualquer faixa, e também "sem carência" e "sem letra miúda" | Não existe em nenhum material do cliente. Todo plano funerário tem. Omitir em página de venda é Procon; inventar é pior. |
| 🔴 **Limite de idade** de titular ou dependente | Idem. |
| 🔴 **Regra de reajuste** | Idem. É o silêncio mais completo do setor inteiro, e por isso o mais tentador de preencher. Não preencha. |
| 🔴 **"Desde 1961"**, "65 anos", "três gerações", "fundada em..." | Não há prova pública. O CNPJ ativo é de 1992. Sai de `SITE.idadeTexto`. |
| **Número de associados, de colaboradores, de famílias atendidas** | Nada é público. |
| **Nome do fundador** | Não levantado. |
| **Parceiros do Clube de Benefícios** | Não confirmados. |
| **Parceria com a Unimed** | Há um `unimed.png` no tema antigo. Não se sabe se ainda existe. |
| **Nome de colaborador** em texto do site | Decisão do dono: quem for desligado amanhã vira problema de RH no HTML. |
| **Horário de sábado** afirmado com certeza | O site antigo se contradiz: a home diz 8h-12h e a `/contato` diz 9h-12h. Use o que está em `unidades.ts` e não invente variação. |
| **Devolução, reembolso, cancelamento, portabilidade** | Nenhuma regra publicada. É tema de reclamação real da empresa; escrever errado piora. |
| **Comparação numérica com funeral avulso** | Existe um dado público de concorrente ("R$ 3.000 a R$ 5.000 na região de Campinas", Funerária Flamboyant) e a Abredif citada pelo Zelo. ⛔ Não use nenhum dos dois sem o cliente autorizar: é número de terceiro sobre o próprio mercado. |

---

## 3. Zona amarela

Verdadeiro até onde se sabe, mas **levantado por busca indexada, não aberto na mão**. Antes de virar
peça pública, alguém abre a página e confere.

- **Google 4,1/5** na matriz. Veio de agregadores. Falta a nota **por unidade**, e nota baixa isolada
  é o que aparece na busca por bairro.
- **Reclame Aqui**: 17 reclamações, 100% respondidas, 60% de solução, resposta média em 1 dia e 13
  horas, sem selo por volume insuficiente. A página dá 403 para leitura automatizada.
- **Instagram**: 2.130 seguidores em 02/09/2026.
- **Depoimentos assinados da LP do cliente** (Luciana Marcelino, Ricardo Jordão Santos, Alexandre
  Yoshio Tamanaha) citam colaboradores pelo nome. Falta confirmar autorização de uso.

---

## 4. Frases prontas já validadas

Aprovadas e no ar. Reutilize a construção, não necessariamente as palavras.

> "O Grupo Serra atende famílias na região de Campinas {SITE.idadeTexto}. São {UNIDADES.length}
> unidades com equipe própria, e o telefone do atendimento de óbito não fecha nunca, nem no fim de
> semana, nem no feriado."

> "Você não precisa ter documento em mãos nem saber o que dizer."

> "Contratar antes é o que evita que a família tenha que decidir preço no pior dia."

> "Tudo o que está no plano já está pago: não há conta para acertar naquele momento."

> "Certidão de óbito, autorizações e a orientação jurídica estão no plano. É a parte que mais trava
> família em luto, e é a que você não vai encostar."

O que essas frases têm em comum, e é a receita: **cada uma descreve uma consequência concreta na
vida de quem lê**, não uma qualidade da empresa.

---

## 5. Como declarar uma lacuna

Quando o texto precisar de um dado proibido, não desvie e não use asterisco. Use o componente
`Pendencia`, que existe para isso, e escreva a lacuna como informação:

- Diga **o que falta** ("a carência de cada plano").
- Diga **que foi perguntado**, se foi.
- Diga **o que fazer enquanto isso** (falar com a equipe, o telefone).

Isso é melhor que o "\*consulte condições" que o setor inteiro usa, por dois motivos: é verdade, e
o leitor nº 3 está procurando exatamente a informação que os outros escondem. Quem declara a lacuna
ganha a confiança que os outros tentam comprar com adjetivo.
