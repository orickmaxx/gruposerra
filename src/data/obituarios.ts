import { UNIDADES, type Unidade } from "./unidades";

/**
 * Obituários de DEMONSTRAÇÃO.
 *
 * ⛔ LEIA ISTO ANTES DE TOCAR NO ARQUIVO.
 *
 * A regra 1 do CLAUDE.md proíbe dado inventado, e o comentário original de
 * `/obituario` proibia falecido de mentira com todas as letras. Este arquivo é
 * um OVERRIDE consciente dessa regra, autorizado pelo dono em 16/09/2026, com
 * escopo fechado:
 *
 *   • vale SÓ para registro marcado `ehExemplo: true`;
 *   • vale SÓ em demonstração comercial, com o site em `noindex`;
 *   • NUNCA vai ao ar num site indexado.
 *
 * A trava não é este comentário. É `scripts/sem-exemplo.mjs`, que FALHA O BUILD
 * se `NEXT_PUBLIC_INDEXAVEL=1` e ainda houver qualquer registro com `ehExemplo`
 * no bundle. Comentário se ignora; build quebrado, não.
 *
 * Os nomes são inventados: combinações de sobrenomes que não correspondem a
 * pessoa conhecida da região. Cada registro carrega `ehExemplo`, a listagem
 * avisa em voz alta e a página individual leva marca d'água. Se algum nome
 * coincidir com alguém de verdade, é coincidência e o registro sai na hora.
 *
 * Quando o sistema real entrar, este arquivo é APAGADO, não editado.
 */

export type Obituario = {
  slug: string;
  nome: string;
  /** ISO `AAAA-MM-DD`. Alimenta `birthDate` do Person e o período de vida no OG. */
  dataNascimento: string;
  /** ISO `AAAA-MM-DD`. Alimenta `deathDate` do Person. */
  dataFalecimento: string;
  /** ISO `AAAA-MM-DD`. Dia da cerimônia, que pode não ser o do falecimento. */
  dataVelorio: string;
  /** `HH:MM`. */
  horaInicio: string;
  /**
   * `HH:MM`. Os DOIS horários aparecem, não só o de início: quem mora longe
   * decide pelo término se dá tempo de chegar.
   */
  horaTermino: string;
  /** `slug` de uma unidade real de `unidades.ts`. Nunca texto solto. */
  unidade: Unidade["slug"];
  localSepultamento: string;
  /** Uma frase da família. Curta de propósito: não é obituário de jornal. */
  texto: string;
  /** Marca de demonstração. É por este campo que o build é auditado. */
  ehExemplo: true;
};

export const OBITUARIOS: Obituario[] = [
  {
    slug: "benedita-alvim-rosseto",
    nome: "Benedita Alvim Rosseto",
    dataNascimento: "1938-03-22",
    dataFalecimento: "2026-09-15",
    dataVelorio: "2026-09-16",
    horaInicio: "09:00",
    horaTermino: "16:00",
    unidade: "campinas-centro",
    localSepultamento: "Cemitério da Saudade, Campinas",
    texto:
      "Mãe de quatro, avó de nove. Cuidou de todo mundo que apareceu na porta dela por quase noventa anos.",
    ehExemplo: true,
  },
  {
    slug: "oswaldo-marchetti-braz",
    nome: "Oswaldo Marchetti Braz",
    dataNascimento: "1941-11-08",
    dataFalecimento: "2026-09-15",
    dataVelorio: "2026-09-16",
    horaInicio: "14:00",
    horaTermino: "20:00",
    unidade: "valinhos",
    localSepultamento: "Cemitério Municipal de Valinhos",
    texto:
      "Trabalhou trinta e dois anos na mesma oficina. Deixa a esposa Aparecida, três filhos e a bicicleta que nunca deixou ninguém mexer.",
    ehExemplo: true,
  },
  {
    slug: "therezinha-pedrozo-galhardo",
    nome: "Therezinha Pedrozo Galhardo",
    dataNascimento: "1935-06-30",
    dataFalecimento: "2026-09-14",
    dataVelorio: "2026-09-15",
    horaInicio: "08:00",
    horaTermino: "15:00",
    unidade: "hortolandia",
    localSepultamento: "Cremação no Complexo Memorial Hortolândia",
    texto:
      "Professora aposentada. Alfabetizou duas gerações do bairro e guardava o nome de cada aluno.",
    ehExemplo: true,
  },
  {
    slug: "waldemar-siqueira-lombardi",
    nome: "Waldemar Siqueira Lombardi",
    dataNascimento: "1949-01-17",
    dataFalecimento: "2026-09-14",
    dataVelorio: "2026-09-15",
    horaInicio: "10:00",
    horaTermino: "17:00",
    unidade: "sumare",
    localSepultamento: "Cemitério Parque de Sumaré",
    texto:
      "Deixa a esposa Lourdes, dois filhos e cinco netos. Pediu que ninguém fosse de preto.",
    ehExemplo: true,
  },
  {
    slug: "neuza-fontanella-quirino",
    nome: "Neuza Fontanella Quirino",
    dataNascimento: "1944-09-02",
    dataFalecimento: "2026-09-13",
    dataVelorio: "2026-09-14",
    horaInicio: "13:00",
    horaTermino: "19:00",
    unidade: "vinhedo",
    localSepultamento: "Cemitério Municipal de Vinhedo",
    texto:
      "Costureira. Fez o vestido de casamento de meia Vinhedo e nunca cobrou de noiva sem dinheiro.",
    ehExemplo: true,
  },
  {
    slug: "antenor-brandolin-paiva",
    nome: "Antenor Brandolin Paiva",
    dataNascimento: "1952-04-11",
    dataFalecimento: "2026-09-13",
    dataVelorio: "2026-09-14",
    horaInicio: "09:30",
    horaTermino: "16:30",
    unidade: "campinas-padre-anchieta",
    localSepultamento: "Cremação no Complexo Memorial Hortolândia",
    texto:
      "Motorista de ônibus por vinte e oito anos na linha do Jardim Aparecida. Conhecia os passageiros pelo nome.",
    ehExemplo: true,
  },
  {
    slug: "iracema-dalbosco-vieira",
    nome: "Iracema Dalbosco Vieira",
    dataNascimento: "1933-12-05",
    dataFalecimento: "2026-09-12",
    dataVelorio: "2026-09-13",
    horaInicio: "08:00",
    horaTermino: "14:00",
    unidade: "artur-nogueira",
    localSepultamento: "Cemitério Municipal de Artur Nogueira",
    texto:
      "Noventa e dois anos, a maior parte deles na mesma rua. Deixa sete filhos, dezenove netos e vinte e três bisnetos.",
    ehExemplo: true,
  },
  {
    slug: "joaquim-tesseroli-esteves",
    nome: "Joaquim Tesseroli Esteves",
    dataNascimento: "1947-07-25",
    dataFalecimento: "2026-09-11",
    dataVelorio: "2026-09-12",
    horaInicio: "15:00",
    horaTermino: "21:00",
    unidade: "cosmopolis",
    localSepultamento: "Cemitério Municipal de Cosmópolis",
    texto:
      "Plantou laranja a vida inteira. A família pede que, no lugar de flores, se leve uma muda.",
    ehExemplo: true,
  },
];

/** Há algum registro de demonstração carregado? Usado pela trava de build. */
export const TEM_EXEMPLO = OBITUARIOS.some((o) => o.ehExemplo);

export function obituarioPorSlug(slug: string) {
  return OBITUARIOS.find((o) => o.slug === slug);
}

export function unidadeDo(o: Obituario) {
  /* `!` seguro: o tipo de `unidade` é `Unidade["slug"]` e o build quebra se
     alguém escrever um slug que não existe na lista de unidades. */
  return UNIDADES.find((u) => u.slug === o.unidade)!;
}

/** Idade em anos completos na data do falecimento. Derivada, nunca digitada. */
export function idadeAoFalecer(o: Obituario) {
  const n = new Date(`${o.dataNascimento}T12:00:00`);
  const f = new Date(`${o.dataFalecimento}T12:00:00`);
  let anos = f.getFullYear() - n.getFullYear();
  const mes = f.getMonth() - n.getMonth();
  if (mes < 0 || (mes === 0 && f.getDate() < n.getDate())) anos--;
  return anos;
}

/** "1938 – 2026". O travessão aqui é de período, não de aposto: é permitido. */
export function periodoDeVida(o: Obituario) {
  return `${o.dataNascimento.slice(0, 4)} – ${o.dataFalecimento.slice(0, 4)}`;
}

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/**
 * "14 de setembro de 2026".
 *
 * ⛔ Não use `toLocaleDateString`: o fuso do servidor e o do navegador não são
 * o mesmo, e uma data de velório que muda de dia entre o HTML e a hidratação
 * manda a família para a cerimônia errada. A formatação é feita na mão sobre a
 * string ISO, que não tem fuso nenhum.
 */
export function dataPorExtenso(iso: string) {
  const [ano, mes, dia] = iso.split("-");
  return `${Number(dia)} de ${MESES[Number(mes) - 1]} de ${ano}`;
}

/** "14/09", para o cartão da listagem, onde o ano é sempre o corrente. */
export function dataCurta(iso: string) {
  const [, mes, dia] = iso.split("-");
  return `${dia}/${mes}`;
}

/** Mais recente primeiro. É a ordem que uma família procurando espera. */
export const OBITUARIOS_RECENTES = [...OBITUARIOS].sort((a, b) =>
  b.dataFalecimento.localeCompare(a.dataFalecimento)
);
