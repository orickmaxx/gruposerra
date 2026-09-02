import Link from "next/link";
import { SITE } from "@/lib/site";
import { IconeSeta, IconeTelefone, IconeWhatsApp } from "@/components/icones";

/**
 * Página 404.
 *
 * Numa funerária, 404 não é piada de erro: pode ser alguém procurando o
 * obituário de quem morreu ontem, com o link errado que chegou no WhatsApp da
 * família. Então nada de "ops" nem de ilustração engraçadinha. A página pede
 * desculpa, dá o telefone e oferece os quatro caminhos que a pessoa provavelmente
 * queria.
 */
export default function NaoEncontrada() {
  return (
    <div className="malha">
      <div className="mx-auto max-w-[46rem] px-5 py-20 text-center md:py-28">
        <p className="numerais font-display text-[4rem] leading-none font-extrabold text-serra-200">
          404
        </p>
        <h1 className="mt-4 text-t1">Esta página não existe mais</h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-lead text-pedra-600">
          O endereço pode ter mudado, ou o link que você recebeu veio quebrado.
          Se você estava procurando informação de um velório, ligue: alguém
          atende agora e verifica para você.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${SITE.emergencia.tel}`}
            className="botao-cheio inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <IconeTelefone className="size-5 shrink-0" />
            <span className="numerais">{SITE.emergencia.rotulo}</span>
          </a>
          <a
            href={SITE.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mat-zap inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
          >
            <IconeWhatsApp className="size-5 shrink-0" />
            WhatsApp
          </a>
        </div>

        <ul className="mx-auto mt-14 grid max-w-[34rem] gap-3 text-left sm:grid-cols-2">
          {[
            { href: "/obituario", rotulo: "Obituário", texto: "Velórios em andamento" },
            { href: "/planos", rotulo: "Planos e preços", texto: "As três faixas e o que inclui" },
            { href: "/unidades", rotulo: "As 8 unidades", texto: "Endereço e telefone de cada uma" },
            { href: "/", rotulo: "Página inicial", texto: "Voltar ao começo" },
          ].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="cartao group flex h-full flex-col rounded-serra-lg border border-linha bg-white p-5 shadow-baixa"
              >
                <span className="inline-flex items-center gap-1.5 font-display font-bold text-tinta">
                  {l.rotulo}
                  <IconeSeta className="size-4 shrink-0 text-pedra-400 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="mt-1 text-[0.875rem] text-pedra-600">{l.texto}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
