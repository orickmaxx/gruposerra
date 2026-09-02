import Link from "next/link";
import { MEMORIAL } from "@/data/unidades";
import { Faixa, Titulo } from "../ui";
import {
  IconeAviao,
  IconeCama,
  IconeChama,
  IconeFolha,
  IconePata,
  IconeSeta,
} from "../icones";

/**
 * Serviços além do plano.
 *
 * ⛔ NAO e uma grade de seis cartoes iguais de icone + titulo + texto. Essa era
 * a versao anterior e a revisao derrubou com razao: o site ja usa cartao nas
 * acoes rapidas, nos planos, nas unidades e nos depoimentos, e mais uma grade
 * igual vira enchimento.
 *
 * Aqui a hierarquia e real: a CREMACAO ocupa um bloco proprio porque e o unico
 * servico com estrutura propria do grupo (o crematorio de Hortolandia) e o
 * unico que o concorrente de bairro nao tem. O resto e lista, porque lista e o
 * que informacao secundaria merece.
 *
 * A cor por servico continua herdada do site atual: dourado na cremacao, verde
 * nas homenagens. E sempre acompanhada de rotulo e icone, nunca sozinha.
 */

const OUTROS = [
  {
    href: "/homenagens",
    externo: false,
    Icone: IconeFolha,
    cor: "text-verde-forte",
    fundo: "bg-verde/10",
    titulo: "Homenagens",
    texto:
      "Um mural para deixar uma mensagem de carinho, com foto, e compartilhar com quem não pôde ir.",
  },
  {
    href: "/serra-pet",
    externo: false,
    Icone: IconePata,
    cor: "text-serra-600",
    fundo: "bg-serra-500/10",
    titulo: "Serra Pet",
    texto:
      "Remoção 24 horas na região, cremação individual ou coletiva, urna e certificado. Até 3 pets no plano.",
  },
  {
    href: "/contato",
    externo: false,
    Icone: IconeAviao,
    cor: "text-onda-500",
    fundo: "bg-onda-400/12",
    titulo: "Repatriação",
    texto:
      "Traslado do falecido até o país de origem, com a documentação conduzida pela equipe.",
  },
  {
    href: "/contato",
    externo: false,
    Icone: IconeCama,
    cor: "text-pedra-600",
    fundo: "bg-pedra-500/12",
    titulo: "Materiais de convalescença",
    texto:
      "Locação de cama hospitalar, cadeira de rodas, cadeira de banho, andador, muleta e suporte de soro. Associado tem desconto.",
  },
];

export function Servicos() {
  return (
    <Faixa>
      <Titulo apoio="O plano cobre a cerimônia. Estes são os serviços em volta dela, alguns inclusos, outros contratados à parte.">
        Além do plano
      </Titulo>

      {/* Cremação: bloco proprio, porque a estrutura e do grupo */}
      <article className="cartao mt-12 overflow-hidden rounded-serra-xl border border-bronze/25 bg-white shadow-media">
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <div className="p-8 md:p-10">
            <span className="mat-cremacao inline-flex size-14 items-center justify-center rounded-serra text-white">
              <IconeChama className="size-7" />
            </span>
            <h3 className="mt-6 text-t3">Cremação em crematório próprio</h3>
            <p className="mt-4 max-w-[52ch] leading-relaxed text-corpo">
              Desde {MEMORIAL.desde} o Grupo Serra faz a cremação na própria
              estrutura, no {MEMORIAL.nome}. Velório, cerimônia de despedida e
              cremação acontecem no mesmo lugar, sem a família ter que se
              deslocar entre empresas no pior dia.
            </p>
            <p className="mt-3 text-[0.9375rem] text-pedra-600">
              {MEMORIAL.logradouro}, {MEMORIAL.bairro}, {MEMORIAL.cidade}/
              {MEMORIAL.uf}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/cremacao"
                className="group inline-flex min-h-[3rem] items-center gap-2 rounded-serra bg-bronze-forte px-5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                Como funciona
                <IconeSeta className="size-[1.05rem] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={MEMORIAL.site}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3rem] items-center rounded-serra border border-bronze/40 px-5 font-semibold text-bronze-forte transition-all duration-300 hover:-translate-y-0.5 hover:border-bronze"
              >
                Ver o Memorial
              </a>
            </div>
          </div>

          <ul className="flex flex-col justify-center gap-3 border-t border-linha bg-papel p-8 md:border-t-0 md:border-l md:p-10">
            {MEMORIAL.estrutura.map((e) => (
              <li key={e} className="flex gap-3 text-[0.9375rem] text-corpo">
                <span
                  aria-hidden
                  className="mt-[0.62rem] size-1.5 shrink-0 rounded-full bg-bronze"
                />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </article>

      {/* O resto: lista, nao grade de cartoes */}
      <ul className="mt-6 divide-y divide-linha border-y border-linha">
        {OUTROS.map(({ href, Icone, cor, fundo, titulo, texto }) => (
          <li key={titulo}>
            <Link
              href={href}
              className="group flex items-start gap-5 py-6 transition-colors hover:bg-serra-50/60"
            >
              <span
                className={`inline-flex size-12 shrink-0 items-center justify-center rounded-serra ${fundo} ${cor}`}
              >
                <Icone className="size-6" />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-1.5 font-display text-[1.1875rem] font-bold text-tinta">
                  {titulo}
                  <IconeSeta className="size-[1.05rem] shrink-0 text-pedra-400 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="mt-1.5 block max-w-[74ch] text-[0.9375rem] leading-relaxed text-pedra-600">
                  {texto}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Faixa>
  );
}
