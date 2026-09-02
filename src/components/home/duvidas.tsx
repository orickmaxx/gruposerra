import { FAQ } from "@/data/planos";
import { SITE } from "@/lib/site";
import { Botao, Faixa, Titulo } from "../ui";
import { IconeAbaixo, IconeTelefone, IconeWhatsApp } from "../icones";

export function Duvidas() {
  return (
    <Faixa>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <Titulo apoio="As perguntas que mais chegam na central, respondidas sem rodeio.">
          Dúvidas frequentes
        </Titulo>

        <div className="divide-y divide-linha border-y border-linha">
          {FAQ.map((f) => (
            <details key={f.p} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 font-display text-[1.125rem] font-semibold text-tinta transition-colors hover:text-serra-600">
                {f.p}
                <IconeAbaixo className="mt-0.5 size-5 shrink-0 text-pedra-400 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="max-w-[68ch] pb-6 leading-relaxed text-corpo">{f.r}</p>
            </details>
          ))}
        </div>
      </div>
    </Faixa>
  );
}

export function Fechamento() {
  return (
    <Faixa fundo="escuro">
      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-t1 text-white">
            Se aconteceu agora, não precisa ler mais nada.
          </h2>
          <p className="mt-5 max-w-[54ch] text-lead text-serra-100">
            Ligue. Alguém atende, a qualquer hora, e conduz o resto. Você não
            precisa ter documento em mãos nem saber o que fazer.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergencia.rotulo}
            </Botao>
            <Botao
              href={`tel:${SITE.emergenciaAlt.tel}`}
              externo
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergenciaAlt.rotulo}
            </Botao>
          </div>
        </div>

        <div className="rounded-serra-lg border border-white/15 bg-white/[0.06] p-7">
          <h3 className="font-display text-[1.25rem] font-semibold text-white">
            Ainda dá tempo de planejar
          </h3>
          <p className="mt-3 leading-relaxed text-serra-100">
            Contratar antes é o que evita que a família tenha que decidir preço
            no pior dia. Fale com a equipe e monte a cobertura com calma.
          </p>
          <div className="mt-6">
            <Botao
              href={SITE.whatsapp.link}
              externo
              tom="claro"
              className="w-full"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              Falar sobre os planos
            </Botao>
          </div>
        </div>
      </div>
    </Faixa>
  );
}
