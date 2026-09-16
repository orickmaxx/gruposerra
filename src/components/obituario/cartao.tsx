import Link from "next/link";
import {
  dataCurta,
  idadeAoFalecer,
  periodoDeVida,
  unidadeDo,
  type Obituario,
} from "@/data/obituarios";
import { IconeLocal, IconeRelogio } from "../icones";
import { Retrato } from "./retrato";

/**
 * Cartão de uma despedida na listagem.
 *
 * Mesma gramática dos cartões do resto do site (`cartao-cine`, `holofote`,
 * `item-cascata`), com duas diferenças de propósito:
 *
 *  1. SEM `aro-luz` e SEM `varre`. Os acabamentos de venda ficam de fora desta
 *     rota inteira. Ver a regra 5 do CLAUDE.md.
 *  2. O que o olho pega primeiro é NOME, depois DATA, depois UNIDADE, nessa
 *     ordem. Quem chega aqui está conferindo se é a pessoa certa e onde é.
 */
export function CartaoObituario({ o, indice = 0 }: { o: Obituario; indice?: number }) {
  const u = unidadeDo(o);

  return (
    <li className="item-cascata flex" style={{ ["--i" as string]: indice }}>
      <article className="cartao-cine holofote group relative flex w-full flex-col rounded-serra-lg border border-linha bg-white p-5 shadow-baixa">
        {o.ehExemplo ? <SeloExemplo /> : null}

        {/* ⛔ `pr-20` NÃO É FOLGA ESTÉTICA. O selo é `absolute` no canto, e sem
            essa reserva o nome passa POR BAIXO dele: "Therezinha Pedrozo
            Galhardo" cruzava a palavra EXEMPLO e as duas ficavam ilegíveis. */}
        <div className={`flex items-start gap-4 ${o.ehExemplo ? "pr-20" : ""}`}>
          <Retrato nome={o.nome} className="w-20 shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[1.0625rem] leading-snug font-bold text-tinta">
              {/* ⛔ SEM `link-texto` AQUI. O cartão inteiro é a área de clique
                  (o `inset-0` abaixo), então o sublinhado permanente não informa
                  nada que a superfície já não diga, e oito deles seguidos leem
                  como uma lista de links crus. A cor no hover basta. */}
              <Link
                href={`/obituario/${o.slug}`}
                className="transition-colors group-hover:text-serra-700"
              >
                {/* O link cobre o cartão inteiro, mas o alvo nomeado é o nome:
                    é o que o leitor de tela anuncia. */}
                <span className="absolute inset-0" aria-hidden />
                {o.nome}
              </Link>
            </h3>
            <p className="numerais mt-1 text-[0.875rem] text-pedra-600">
              {periodoDeVida(o)} · {idadeAoFalecer(o)} anos
            </p>
          </div>
        </div>

        <dl className="mt-4 space-y-2 border-t border-linha pt-4 text-[0.875rem] text-corpo">
          <div className="flex items-start gap-2.5">
            <dt className="shrink-0">
              <IconeRelogio className="mt-px size-4 text-serra-500" />
              <span className="sr-only">Velório</span>
            </dt>
            <dd className="numerais">
              {dataCurta(o.dataVelorio)}, {o.horaInicio} às {o.horaTermino}
            </dd>
          </div>
          <div className="flex items-start gap-2.5">
            <dt className="shrink-0">
              <IconeLocal className="mt-px size-4 text-serra-500" />
              <span className="sr-only">Unidade</span>
            </dt>
            <dd>{u.nome}</dd>
          </div>
        </dl>
      </article>
    </li>
  );
}

/**
 * Selo de demonstração.
 *
 * Discreto porque não pode poluir a leitura, e presente porque a página não
 * pode deixar dúvida sobre o que é. Cor do bronze, a mesma que `Pendencia` usa
 * no site inteiro para dizer "aqui falta dado de verdade".
 */
export function SeloExemplo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute top-3 right-3 z-[2] rounded-full border border-bronze/50 bg-bronze/10 px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.14em] text-bronze-forte uppercase ${className}`}
    >
      Exemplo
    </span>
  );
}
