import { SITE } from "@/lib/site";
import { IconeFacebook, IconeInstagram, IconeSeta } from "../icones";

/**
 * Instagram e Facebook.
 *
 * ⛔ O que estava aqui antes: quatro molduras pontilhadas vazias escritas "Post
 * do feed" e um paragrafo explicando ao cliente como ligar um widget de
 * terceiro. Ou seja, 860px de tela ocupados por nada mais um recado interno
 * vazando para o visitante. O dono mandou tirar os avisos e estava certo.
 *
 * Agora e uma faixa curta que faz o unico trabalho que essa secao pode fazer
 * enquanto o feed nao esta conectado: mandar quem esta no site para o perfil.
 * Quando o widget do @serragrupo for ligado, o feed entra dentro deste mesmo
 * bloco, no lugar da grade de links.
 */
export function Instagram() {
  return (
    <section className="bg-white py-14 md:py-18" id="instagram">
      <div className="mx-auto max-w-[76rem] px-5" data-revela>
        <div className="overflow-hidden rounded-serra-xl border border-linha bg-papel">
          <div className="grid items-center gap-8 p-8 md:grid-cols-[1.2fr_auto] md:p-11">
            <div>
              <p className="text-[0.875rem] font-bold tracking-[0.14em] text-serra-600 uppercase">
                Acompanhe o dia a dia
              </p>
              <h2 className="mt-4 max-w-[20ch] text-t3">
                O Grupo Serra publica todo dia no Instagram
              </h2>
              <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-pedra-600">
                Planejamento antecipado, Serra Pet, campanhas e o que acontece
                nas unidades. É por lá que dá para ver a empresa funcionando.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="botao-cheio group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra px-6 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <IconeInstagram className="size-5 shrink-0" />
                @serragrupo
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-serra border border-serra-200 bg-white px-6 font-semibold text-serra-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-serra-400 hover:bg-serra-50"
              >
                <IconeFacebook className="size-5 shrink-0" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
