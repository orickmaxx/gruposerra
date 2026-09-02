import {
  BENEFICIOS_URL,
  CATEGORIAS,
  PAGINAS_DE_PARCEIROS,
  PARCEIROS,
} from "@/data/beneficios";
import { IconeEtiqueta, IconeSeta } from "../icones";

/**
 * Clube de Benefícios, resumido aqui e completo la.
 *
 * A home NAO tenta reproduzir o catalogo: sao 42 paginas de parceiros que se
 * atualizam sozinhas no clube. O que a home faz e provar que o clube existe e
 * vale a pena (categorias reais, parceiros reais, descontos como o proprio
 * clube anuncia) e mandar para la.
 *
 * ⚠ A leitura anterior deste mesmo endereco concluiu que "nao ha lista de
 * parceiros". Estava errado: a pagina monta o catalogo por JS, e fetch simples
 * so devolve a casca. Estes dados vieram de Chrome de verdade em 02/09/2026.
 *
 * Esta e a unica secao com cor quente do site inteiro, e e de proposito: e a
 * unica coisa alegre que uma funeraria tem para oferecer.
 */
export function Clube() {
  return (
    <section className="mat-clube-fundo overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <span className="mat-clube inline-flex size-14 items-center justify-center rounded-serra text-white">
              <IconeEtiqueta className="size-7" />
            </span>

            <h2 className="mt-6 text-t2">Ser associado dá desconto na vida toda</h2>

            <p className="mt-5 max-w-[54ch] text-lead text-pedra-600">
              O Clube de Benefícios do Grupo Serra é uma rede de parceiros
              exclusiva para quem tem plano. São{" "}
              <strong className="font-bold text-tinta">
                {PAGINAS_DE_PARCEIROS} páginas de parceiros
              </strong>{" "}
              em {CATEGORIAS.length} categorias, de posto de gasolina a resort.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {CATEGORIAS.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-clube/30 bg-white/70 px-3.5 py-1.5 text-[0.875rem] font-semibold text-clube-forte"
                >
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={BENEFICIOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mat-clube group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
              >
                Ver todos os benefícios
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={BENEFICIOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-serra border border-clube/40 bg-white px-6 font-semibold text-clube-forte transition-all duration-300 hover:-translate-y-0.5 hover:border-clube"
              >
                Acessar minha conta
              </a>
            </div>
          </div>

          {/* Amostra dos parceiros. Nao e o catalogo, e a prova de que ele existe. */}
          <ul className="grid gap-3 sm:grid-cols-2">
            {PARCEIROS.map((p) => (
              <li
                key={p.nome}
                className="cartao rounded-serra border border-clube/15 bg-white/85 p-4 shadow-baixa backdrop-blur-sm"
              >
                <p className="font-display text-[1rem] font-bold text-tinta">{p.nome}</p>
                <p className="mt-1 text-[0.875rem] leading-snug font-semibold text-clube-forte">
                  {p.oferta}
                </p>
                <p className="mt-1.5 text-[0.8125rem] text-pedra-600">{p.categoria}</p>
              </li>
            ))}
            <li className="flex items-center justify-center rounded-serra border border-dashed border-clube/40 p-4 text-center">
              <a
                href={BENEFICIOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="link-texto text-[0.9375rem] font-semibold text-clube-forte"
              >
                e mais {PAGINAS_DE_PARCEIROS - 1} páginas de parceiros
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
