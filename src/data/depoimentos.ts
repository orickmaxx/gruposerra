/**
 * Avaliações do Google, em forma AGREGADA.
 *
 * ⛔ O QUE ESTAVA AQUI ANTES, E POR QUE SAIU. Este arquivo trazia 9 avaliações
 * do Google na íntegra, com o NOME e a FOTO de cada pessoa, raspadas dos links
 * que o dono mandou em 03/09/2026. O próprio comentário original avisava:
 * "confirmar com o Grupo Serra que há autorização para exibir nome e foto
 * dessas pessoas fora do Google".
 *
 * Essa autorização nunca chegou. Avaliação pública no Google é uma coisa;
 * republicar nome, rosto e texto de alguém em site comercial de terceiro é
 * outro uso, e quem responde por ele é o Grupo Serra, não o Google. Numa
 * empresa que vai colocar este site no ar com o nome dela, deixar isso
 * pendurado até alguém lembrar é transferir um risco jurídico para o cliente
 * sem avisar. Saiu em 16/09/2026, junto com as 9 fotos em `public/depoimentos/`.
 *
 * O que fica: a prova social AGREGADA e o link para a origem. Quem quiser ler
 * as avaliações lê no Google, que é onde elas são de quem escreveu.
 *
 * Para voltar a exibir depoimento assinado, o caminho é um só: autorização por
 * escrito de cada pessoa. Ver a pergunta 9 do CLAUDE.md.
 */

export const GOOGLE = {
  /**
   * Nota média da matriz de Campinas.
   *
   * ⚠️ `notaConfirmada: false` porque o 4,1 veio de AGREGADOR indexado
   * (funerariasbrasil, locaisdobrasil), não da página do Google, que bloqueia
   * leitura automatizada. Enquanto for false, o número NÃO aparece na tela:
   * publicar nota de avaliação lida de terceiro é afirmar um dado que ninguém
   * conferiu. Abra o perfil no Maps, confirme, e vire para true — a nota
   * aparece sozinha onde precisa.
   */
  nota: 4.1,
  notaConfirmada: false,

  /** Quantidade total de avaliações. NÃO SEI: não é público sem abrir o perfil. */
  avaliacoes: null as number | null,

  /**
   * Quantas avaliações o dono enviou em 03/09/2026, todas de 5 estrelas. Este
   * número É confirmado, mas não vai para a tela: nove é um número que trabalha
   * CONTRA a prova social. Fica registrado porque é o que sustenta a frase da
   * seção sobre o que as famílias mais citam.
   */
  enviadasPeloDono: 9,

  /**
   * Busca no Maps em vez da URL do perfil. O perfil tem um identificador que
   * não foi confirmado, e link quebrado numa seção de prova social é pior que
   * link nenhum. A busca resolve para a ficha da empresa e não afirma nada.
   */
  perfil:
    "https://www.google.com/maps/search/?api=1&query=Grupo+Serra+Funer%C3%A1rias+Campinas",
} as const;

/**
 * O que mais aparece nas avaliações, resumido pela própria casa.
 *
 * ⛔ ISTO NÃO É CITAÇÃO E NÃO PODE VIRAR CITAÇÃO. É a leitura que fizemos das
 * avaliações públicas, escrita em voz própria. No momento em que alguém colar
 * aqui um trecho de avaliação de alguém, o problema que este arquivo resolveu
 * volta inteiro.
 */
export const TEMAS = [
  {
    titulo: "Atendimento que acolhe",
    texto:
      "O elogio que mais se repete não é sobre preço nem sobre estrutura. É sobre como a família foi tratada na hora em que chegou.",
  },
  {
    titulo: "Resolvido no mesmo dia",
    texto:
      "Agilidade aparece em quase todas: documentação, remoção e cerimônia acertadas sem a família precisar correr atrás.",
  },
  {
    titulo: "Gente com nome",
    texto:
      "As avaliações citam os atendentes pelo primeiro nome. É o ativo mais difícil de copiar que uma funerária pode ter.",
  },
] as const;
