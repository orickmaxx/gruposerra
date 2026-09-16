import Link from "next/link";
import { Faixa, Titulo } from "../ui";
import { CartaoObituario } from "../obituario/cartao";
import { OBITUARIOS_RECENTES } from "@/data/obituarios";
import { IconeSeta } from "../icones";

/**
 * Últimas despedidas na home.
 *
 * Entra entre a linha do tempo (areia) e as dúvidas (papel), em branco, para
 * não repetir superfície com nenhuma vizinha.
 *
 * ⛔ POR QUE ISTO NÃO É UMA SEÇÃO DE VENDA, mesmo estando na home: quem procura
 * um velório hoje entra pela home e não pelo menu, e três cartões aqui poupam a
 * essa pessoa um nível inteiro de navegação num momento em que ela não está em
 * condições de caçar link. O bloco não tem preço, não tem CTA de plano e não
 * tem botão de contratar. É a regra 5 valendo também fora de `/obituario`.
 *
 * ⚠️ Três, não oito. A home tem teto de 80 KB gzip (CLAUDE.md 6) e a listagem
 * completa mora na própria rota. Se algum dia isto precisar crescer, cresce lá.
 */
export function Despedidas() {
  const ultimas = OBITUARIOS_RECENTES.slice(0, 3);
  if (ultimas.length === 0) return null;

  return (
    <Faixa id="despedidas">
      <Titulo
        centro
        rotulo="Obituário"
        apoio="Local e horário das cerimônias em andamento nas oito unidades. Esta parte do site não vende nada."
      >
        Despedidas desta semana
      </Titulo>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ultimas.map((o, i) => (
          <CartaoObituario key={o.slug} o={o} indice={i} />
        ))}
      </ul>

      <div className="mt-10 text-center">
        <Link
          href="/obituario"
          className="link-texto inline-flex min-h-[3.25rem] items-center gap-2 text-[1.0625rem] font-semibold text-serra-700"
        >
          Ver todas as despedidas e buscar por nome
          <IconeSeta className="size-4" />
        </Link>
      </div>
    </Faixa>
  );
}
