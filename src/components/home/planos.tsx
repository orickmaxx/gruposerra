import { INCLUSOS, PLANOS, PLANOS_ESPECIAIS } from "@/data/planos";
import { SITE } from "@/lib/site";
import { Botao, Faixa, Pendencia, Titulo } from "../ui";
import { IconeConfere, IconePata, IconeAmparo } from "../icones";

const brl = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function Planos() {
  return (
    <Faixa id="planos">
      <Titulo apoio="Todo plano inclui assistência 24 horas, traslado e cobertura nacional. O que muda de um para o outro é quanta gente entra e quanto da cerimônia já está pago.">
        Planos
      </Titulo>

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {PLANOS.map((p) => (
          <li key={p.slug} className="flex">
            <article
              className={`flex w-full flex-col rounded-serra-lg border bg-white p-7 transition-shadow hover:shadow-media ${
                p.destaque
                  ? "border-serra-400 shadow-media ring-1 ring-serra-200"
                  : "border-linha shadow-baixa"
              }`}
            >
              <h3 className="text-t3">{p.nome}</h3>
              <p className="mt-1.5 text-[0.9375rem] font-medium text-pedra-600">
                {p.chamada}
              </p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-[0.9375rem] text-pedra-600">a partir de</span>
              </p>
              <p className="numerais mt-0.5 flex items-baseline gap-1">
                <span className="font-display text-[1.375rem] font-medium text-pedra-600">
                  R$
                </span>
                <span className="font-display text-[2.75rem] leading-none font-semibold text-tinta">
                  {brl.format(p.preco!)}
                </span>
                <span className="text-[1.0625rem] text-pedra-600">/mês</span>
              </p>

              <p className="mt-5 border-t border-linha pt-5 text-[0.9375rem] leading-relaxed text-corpo">
                {p.descricao}
              </p>

              <ul className="mt-5 space-y-2.5">
                {p.destaques.map((d) => (
                  <li key={d} className="flex gap-2.5 text-[0.9375rem] text-corpo">
                    <IconeConfere className="mt-1 size-[1.05rem] shrink-0 text-serra-500" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <Botao
                  href={SITE.whatsapp.link}
                  externo
                  tom={p.destaque ? "azul" : "contorno"}
                  className="w-full"
                >
                  Falar sobre o {p.nome.replace("Serra ", "")}
                </Botao>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <ul className="mt-5 grid gap-5 sm:grid-cols-2">
        {PLANOS_ESPECIAIS.map((p) => {
          const Icone = p.slug === "serra-pet" ? IconePata : IconeAmparo;
          return (
            <li key={p.slug}>
              <article className="flex h-full gap-5 rounded-serra-lg border border-linha bg-white p-6 shadow-baixa">
                <Icone className="mt-0.5 size-7 shrink-0 text-pedra-500" />
                <div>
                  <h3 className="font-display text-[1.1875rem] font-semibold text-tinta">
                    {p.nome}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-corpo">
                    {p.descricao}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 max-w-[70ch]">
        <Pendencia>
          <strong className="font-semibold text-tinta">
            Falta publicar aqui:
          </strong>{" "}
          carência, limite de idade para entrar e a regra de reajuste. Esses
          números precisam vir do Grupo Serra antes de o site ir ao ar. Nenhum
          deles foi estimado.
        </Pendencia>
      </div>
    </Faixa>
  );
}

/**
 * Os 20 itens inclusos.
 *
 * Esta lista estava dentro de um comentario HTML na home do site atual: o
 * visitante nao via o que compra. Trazer de volta e o item 4 do briefing.
 * Nao vai em cards: e um inventario, e inventario se le em coluna.
 */
export function Inclusos() {
  return (
    <Faixa fundo="escuro">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
        <div>
          <Titulo
            claro
            apoio="Não é uma lista de vantagens escrita para o site. É o que a família recebe, item por item, quando aciona o plano."
          >
            O que já está pago quando você liga
          </Titulo>
        </div>

        <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
          {INCLUSOS.map(({ item, nota }) => (
            <li key={item} className="flex gap-3 border-b border-white/12 pb-3.5">
              <IconeConfere className="mt-1 size-[1.05rem] shrink-0 text-serra-300" />
              <span className="text-white">
                {item}
                {nota ? (
                  <span className="block text-[0.875rem] text-serra-200">{nota}</span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Faixa>
  );
}
