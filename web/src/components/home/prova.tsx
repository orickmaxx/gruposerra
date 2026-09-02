import { SITE } from "@/lib/site";
import { Faixa, Pendencia, Titulo } from "../ui";

const HISTORIA: { ano: number; o: string; informado?: boolean }[] = [
  { ano: 1961, o: "Primeira unidade, em Campinas", informado: true },
  { ano: 1988, o: "Valinhos" },
  { ano: 1993, o: "Artur Nogueira" },
  { ano: 1994, o: "Vinhedo" },
  { ano: 2003, o: "Hortolândia" },
  { ano: 2015, o: "Cosmópolis" },
  { ano: 2019, o: "Campinas, unidade Padre Anchieta" },
  { ano: 2021, o: "Crematório próprio, em Hortolândia" },
  { ano: 2024, o: "Sumaré" },
];

export function Historia() {
  return (
    <Faixa>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-16">
        <div>
          <Titulo apoio="A empresa nasceu em Campinas e nunca saiu da região. Cada abertura ao lado é uma cidade onde passou a haver alguém do Serra por perto.">
            Sempre na mesma região
          </Titulo>
          <p className="mt-6 max-w-[56ch] leading-relaxed text-corpo">
            Missão declarada pela empresa: garantir que os contratos e as
            cerimônias sejam dignos e humanizados, e que a família tenha
            tranquilidade e conforto em um momento difícil.
          </p>

          <div className="mt-8 max-w-[56ch]">
            <Pendencia>
              <strong className="font-semibold text-tinta">
                Falta confirmar:
              </strong>{" "}
              esta linha do tempo é a que o próprio Grupo Serra publica. O ano de{" "}
              {SITE.fundacao} não tem documento público que o sustente, e o CNPJ
              ativo da empresa foi aberto em {SITE.cnpjDesde}. Enquanto não vier
              contrato social antigo, alvará ou matéria de jornal, o site não
              afirma &ldquo;desde {SITE.fundacao}&rdquo; em lugar nenhum.
            </Pendencia>
          </div>
        </div>

        <ol className="relative">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[3.75rem] w-px bg-linha sm:left-[4.5rem]"
          />
          {HISTORIA.map((h) => (
            <li key={h.ano} className="relative flex items-baseline gap-5 py-3 sm:gap-7">
              <span className="numerais w-[3.25rem] shrink-0 text-right font-display text-[1.0625rem] font-semibold text-serra-600 sm:w-16 sm:text-[1.125rem]">
                {h.ano}
              </span>
              <span
                aria-hidden
                className="absolute left-[3.75rem] size-2.5 -translate-x-1/2 translate-y-[0.55rem] rounded-full border-2 border-white bg-serra-400 sm:left-[4.5rem]"
              />
              <span className="pl-4 text-corpo sm:pl-6">
                {h.o}
                {h.informado ? (
                  <span className="block text-[0.8125rem] text-pedra-500">
                    informado pela empresa, sem documento público
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Faixa>
  );
}
