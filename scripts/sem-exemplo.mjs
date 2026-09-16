/**
 * TRAVA DE BUILD: nada de demonstração vai ao ar indexado.
 *
 * ⛔ POR QUE ISTO EXISTE E NÃO BASTA UM COMENTÁRIO. Em 16/09/2026 o site ganhou
 * 8 obituários fictícios e uma maquete de painel, para a demonstração comercial.
 * As duas coisas contrariam a regra 1 do CLAUDE.md, e a autorização do dono tem
 * escopo fechado: só em demonstração, nunca em produção indexada.
 *
 * Escopo fechado por disciplina humana não é escopo fechado. Daqui a dois meses,
 * no dia de ligar `NEXT_PUBLIC_INDEXAVEL=1`, ninguém vai lembrar de apagar
 * `data/obituarios.ts`. Este script é o que lembra: com a indexação ligada e
 * qualquer registro de exemplo no bundle, o BUILD FALHA.
 *
 * ⛔ E ELE LÊ O BUNDLE, NÃO O CÓDIGO-FONTE. Alguém pode apagar o arquivo de
 * dados e deixar a rota; pode trocar o nome da flag; pode mover os registros
 * para outro módulo. O que importa é o que foi publicado, então a checagem é
 * feita no HTML e no JS que saíram de `next build`.
 *
 * Uso:
 *   node scripts/sem-exemplo.mjs              # com NEXT_PUBLIC_INDEXAVEL vazio: só relata
 *   NEXT_PUBLIC_INDEXAVEL=1 node scripts/...  # com a indexação ligada: falha se achar
 *
 * Em produção ele entra ANTES do build, no mesmo comando:
 *   node scripts/sem-exemplo.mjs && next build
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const RAIZ = process.cwd();
const SAIDA = path.join(RAIZ, ".next");
const INDEXAVEL = process.env.NEXT_PUBLIC_INDEXAVEL === "1";

/* As marcas que denunciam material de demonstração no que foi publicado.
   `ehExemplo` é o campo do tipo `Obituario`; sobrevive à minificação porque é
   chave de objeto serializada no payload do React. */
const MARCAS = [
  { chave: "ehExemplo", o_que: "registro de obituário de demonstração" },
  { chave: "Maquete de demonstração", o_que: "rodapé da maquete do painel" },
  { chave: "Registro de demonstração", o_que: "aviso da página de despedida" },
];

async function arquivos(dir, achados = []) {
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch {
    return achados;
  }
  for (const e of entradas) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      /* `cache` guarda artefato intermediário do Turbopack e `dev` é sobra de
         `next dev`. Nenhum dos dois é publicado, e varrer os dois produz falso
         positivo justamente no pior momento: depois de alguém apagar os
         arquivos de demonstração, quando o script precisa passar. */
      if (e.name === "cache" || e.name === "dev") continue;
      await arquivos(p, achados);
    } else if (/\.(html|js|rsc|json|txt)$/.test(e.name)) {
      achados.push(p);
    }
  }
  return achados;
}

try {
  await stat(SAIDA);
} catch {
  console.error("sem-exemplo: nao encontrei .next/. Rode `next build` antes.");
  process.exit(2);
}

const lista = await arquivos(SAIDA);
const encontrados = new Map();
let temRotaPainel = false;

for (const f of lista) {
  const rel = path.relative(RAIZ, f);
  if (/(^|[\\/])painel([\\/]|\.)/.test(rel)) temRotaPainel = true;

  const txt = await readFile(f, "utf8").catch(() => "");
  if (!txt) continue;
  for (const m of MARCAS) {
    if (txt.includes(m.chave)) {
      if (!encontrados.has(m.chave)) encontrados.set(m.chave, { ...m, onde: [] });
      const e = encontrados.get(m.chave);
      if (e.onde.length < 4) e.onde.push(rel);
    }
  }
}

const problemas = [];
for (const e of encontrados.values()) {
  problemas.push(`${e.o_que} (marca "${e.chave}") em ${e.onde.join(", ")}`);
}
if (temRotaPainel) problemas.push("a rota /painel foi publicada no build");

console.log(`sem-exemplo: NEXT_PUBLIC_INDEXAVEL=${process.env.NEXT_PUBLIC_INDEXAVEL ?? ""}`);
console.log(`sem-exemplo: ${lista.length} arquivos publicados varridos`);

if (problemas.length === 0) {
  console.log("ok    nenhum material de demonstracao no bundle");
  process.exit(0);
}

for (const p of problemas) console.log(`${INDEXAVEL ? "FALHA" : "aviso"}  ${p}`);

if (!INDEXAVEL) {
  console.log(
    "\nok    material de demonstracao presente, e a indexacao esta DESLIGADA.\n" +
      "      E o estado esperado para a demonstracao comercial. Este mesmo\n" +
      "      script FALHA o build no dia em que NEXT_PUBLIC_INDEXAVEL=1."
  );
  process.exit(0);
}

console.error(
  "\nBUILD INTERROMPIDO. A indexacao esta ligada e ainda ha material de\n" +
    "demonstracao publicado. Antes de ir ao ar:\n" +
    "  1. apague src/data/obituarios.ts e src/app/obituario/[slug]/, ou ligue\n" +
    "     o obituario ao sistema real de publicacao;\n" +
    "  2. apague src/app/painel/ e src/components/painel/;\n" +
    "  3. rode este script de novo.\n" +
    "Ver CLAUDE.md, o override da regra 1."
);
process.exit(1);
