import Image from "next/image";
import { GOOGLE, TEMAS } from "@/data/depoimentos";
import { Rotulo, TituloCine } from "../ui";
import { IconeGoogle, IconeSeta } from "../icones";

/**
 * Prova social do Google, em forma agregada.
 *
 * ⛔ AQUI HAVIA UM CARROSSEL DE 9 DEPOIMENTOS COM NOME E FOTO DE PESSOAS REAIS,
 * e ele saiu por risco jurídico, não por design: a autorização de uso de nome e
 * imagem nunca foi confirmada com o cliente. Ver o cabeçalho de
 * `data/depoimentos.ts`. O que ficou aponta para o Google em vez de copiar dele.
 *
 * ⛔ E NÃO É SÓ UM CARROSSEL A MENOS. A seção deixou de ser client component:
 * sem estado, sem `useArrastar`, sem medir páginas a cada `resize`. É JavaScript
 * a menos na home inteira, e a home é a página que carrega mais.
 *
 * O peso visual foi mantido de propósito: o palco escuro continua sendo o
 * segundo momento da página, logo depois do herói, porque é ali que a prova
 * social precisa bater. O que mudou é que a prova agora é um agregado e um
 * link, não o rosto de nove pessoas que não assinaram nada.
 *
 * ⚠️ A NOTA SÓ APARECE QUANDO FOR CONFERIDA. `GOOGLE.notaConfirmada` está
 * false porque o 4,1 veio de agregador, não do perfil. Enquanto isso a seção
 * funciona sem número, e nada na tela afirma uma nota que ninguém abriu.
 */
export function Depoimentos() {
  return (
    <section
      id="depoimentos"
      className="palco aurora mosaico grao relative isolate overflow-hidden py-20 md:py-28"
    >
      <div aria-hidden className="fio-luz absolute inset-x-0 top-0 z-[1]" />

      {/* Marca d'agua: so o SIMBOLO, reto e centralizado. O logotipo inteiro,
          girado, lia como placeholder de gerador. Recortado do logo HD real. */}
      <Image
        src="/marca/simbolo-serra-branco.png"
        alt=""
        width={379}
        height={376}
        sizes="34rem"
        aria-hidden
        priority={false}
        className="pointer-events-none absolute top-1/2 left-1/2 w-[34rem] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.045]"
      />

      <div className="relative mx-auto max-w-[76rem] px-5" data-revela>
        <div className="text-center">
          <Rotulo claro>
            <IconeGoogle className="size-4 shrink-0" />
            Avaliações públicas no Google
          </Rotulo>
          <TituloCine className="mx-auto max-w-[20ch] text-t2 text-white">
            Quem já passou por isso conta melhor
          </TituloCine>
          <p className="mx-auto mt-5 max-w-[58ch] text-lead text-serra-100">
            As avaliações ficam no Google, onde são de quem escreveu. Aqui está o que elas repetem,
            e o caminho para ler todas por conta própria.
          </p>

          {GOOGLE.notaConfirmada ? (
            <p className="mt-8 inline-flex items-baseline gap-3 rounded-serra-lg border border-white/15 bg-white/[0.06] px-6 py-4">
              <span className="numerais font-display text-[2.75rem] leading-none font-extrabold text-white">
                {GOOGLE.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}
              </span>
              <span className="text-[0.9375rem] text-serra-100">
                de 5 no Google
                {GOOGLE.avaliacoes ? (
                  <span className="numerais"> · {GOOGLE.avaliacoes} avaliações</span>
                ) : null}
              </span>
            </p>
          ) : null}
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {TEMAS.map((t, i) => (
            <li key={t.titulo} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <article className="cartao-cine holofote holofote-escuro aro-luz relative flex w-full flex-col rounded-serra-xl border border-white/12 bg-white/[0.05] p-7 md:p-8">
                <h3 className="font-display text-[1.125rem] font-bold text-white">{t.titulo}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-serra-100">{t.texto}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-11 text-center">
          <a
            href={GOOGLE.perfil}
            target="_blank"
            rel="noopener noreferrer"
            className="ima varre vidro-escuro group inline-flex min-h-[3.25rem] items-center gap-3 rounded-serra border border-white/25 px-7 text-[1.0625rem] font-semibold text-white transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15"
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-white">
              <IconeGoogle className="size-4 shrink-0" />
            </span>
            Ler as avaliações no Google
            <IconeSeta className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
