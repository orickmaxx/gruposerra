import { SITE } from "@/lib/site";
import { MolduraFoto } from "../moldura-foto";
import { IconeInstagram, IconeSeta } from "../icones";

/**
 * Instagram.
 *
 * O Florees tem essa secao e o Grupo Serra nao tinha: o perfil @serragrupo
 * existe, tem 2.130 seguidores e publica com frequencia (65 anos, Setembro
 * Amarelo, Serra Pet, depoimentos). Deixar de fora e jogar fora prova social
 * que ja esta pronta.
 *
 * O FEED REAL entra por widget, exatamente como o Florees faz:
 *   1. criar conta gratuita em https://behold.so (ou snapwidget.com);
 *   2. conectar @serragrupo, que precisa ser conta PROFISSIONAL;
 *   3. colar o embed dentro de <div id="ig-widget"> e APAGAR as molduras.
 *
 * Ate la ficam os espacos declarados, no formato quadrado do proprio feed.
 * ⚠ O embed de terceiro carrega script externo: conferir com o dono antes de
 * ligar, porque isso mexe com LGPD e com a politica de cookies do site.
 */
export function Instagram() {
  return (
    <section className="bg-papel py-20 md:py-28" id="instagram">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[32ch]">
            <p className="inline-flex items-center gap-2 rounded-full bg-serra-500/10 px-4 py-2 text-[0.875rem] font-semibold text-serra-600">
              <IconeInstagram className="size-4 shrink-0" />
              Acompanhe o dia a dia
            </p>
            <h2 className="mt-5 text-t2">O Grupo Serra no Instagram</h2>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link-texto mt-4 inline-block font-display text-[1.125rem] font-bold text-serra-600"
            >
              @serragrupo
            </a>
          </div>

          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="botao-cheio group inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <IconeInstagram className="size-5 shrink-0" />
            Seguir no Instagram
            <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Aqui entra o <behold-widget> quando o feed for ligado. */}
        <div id="ig-widget" className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MolduraFoto proporcao="1/1" titulo="Post do feed" detalhe="Entra pelo widget" />
          <MolduraFoto proporcao="1/1" titulo="Post do feed" />
          <MolduraFoto proporcao="1/1" titulo="Post do feed" />
          <MolduraFoto proporcao="1/1" titulo="Post do feed" />
        </div>

        <p className="mt-6 max-w-[74ch] text-[0.9375rem] leading-relaxed text-pedra-600">
          O feed real entra por widget conectado à conta profissional do
          @serragrupo. Como isso carrega script de terceiro, precisa da sua
          aprovação e de uma linha na política de cookies antes de ir ao ar.
        </p>
      </div>
    </section>
  );
}
