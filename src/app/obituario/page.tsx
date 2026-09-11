import type { Metadata } from "next";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Faixa, Pendencia, Titulo } from "@/components/ui";
import { UNIDADES } from "@/data/unidades";
import { SITE } from "@/lib/site";
import { IconeLocal, IconeRelogio, IconeTelefone, IconeVela } from "@/components/icones";

const RESUMO =
  "Local e horário do velório e da despedida. Esta página não vende nada: sem pop-up, sem banner, sem oferta.";

export const metadata: Metadata = {
  title: "Obituário",
  description: RESUMO,
  alternates: { canonical: "/obituario" },
  openGraph: { title: "Obituário", description: RESUMO, url: "/obituario" },
};

/**
 * Obituário.
 *
 * ⛔ A REGRA 5 DO MANUAL VIVE AQUI: esta página NÃO VENDE NADA. Sem pop-up, sem
 * banner, sem CTA de plano, sem "aproveite e contrate". Quem chega aqui está no
 * pior dia da vida, procurando um endereço e um horário. Vender nesse momento é
 * o que os concorrentes fazem, e é exatamente por não fazer que este site ganha
 * a comparação onde ela importa.
 *
 * O único telefone que aparece é o do plantão, e ele aparece porque é SERVIÇO
 * para quem está aqui, não conversão.
 *
 * ⛔ E A SEGUNDA REGRA, MAIS DURA: NÃO EXISTE FALECIDO DE MENTIRA NESTA PÁGINA.
 * A listagem depende do sistema que a empresa já usa para publicar, e ele ainda
 * não está conectado. A tentação óbvia seria preencher com nomes de exemplo
 * para a página "ficar pronta" na demonstração. Inventar um obituário é
 * fabricar um registro sobre a morte de uma pessoa: não se faz, nem como
 * rascunho, nem com nome falso. A página mostra a ESTRUTURA e declara a lacuna.
 *
 * O que já está pronto e é o que dá valor de verdade a esta rota: cada falecido
 * ganhará `generateMetadata()` próprio em `/obituario/[slug]`, com Open Graph
 * individual. É isso que faz o link chegar inteiro no WhatsApp, com nome, local
 * e horário, em vez de chegar pelado como chega hoje no site antigo.
 */
export default function Pagina() {
  return (
    <>
      <HeroiPagina
        rotulo="Velórios e despedidas"
        titulo="Obituário"
        resumo={RESUMO}
        foto="/fotos/memorial-sala-velorio.webp"
        posicao="object-[40%_60%]"
      >
        <p
          className="revela-texto mt-10 flex max-w-[52ch] items-start gap-3 rounded-serra-lg border border-white/20 bg-[#04202f]/70 px-5 py-4 text-[0.9375rem] leading-relaxed text-white/80"
          style={{ ["--i" as string]: 3 }}
        >
          <IconeTelefone className="mt-0.5 size-5 shrink-0 text-onda-400" />
          <span>
            Se o falecimento foi agora, ligue para{" "}
            <a
              href={`tel:${SITE.emergencia.tel}`}
              className="numerais link-texto font-bold text-white"
            >
              {SITE.emergencia.rotulo}
            </a>
            . Atende 24 horas, todos os dias. Alguém assume tudo a partir daí.
          </span>
        </p>
      </HeroiPagina>

      <Faixa fundo="papel">
        <div className="mx-auto max-w-[52rem]">
          <Titulo centro rotulo="Buscar" apoio="Digite o nome da pessoa para encontrar o local e o horário da cerimônia.">
            Procurar um velório
          </Titulo>

          {/* Busca de verdade em forma, desligada em função: sem base conectada
              ela não pode prometer resultado. Fica `disabled` e explica, em vez
              de aceitar o nome e devolver "nada encontrado", que para quem está
              procurando um velório é uma resposta cruel e errada. */}
          <form className="mt-10">
            <label
              htmlFor="busca-obituario"
              className="block font-display text-[1.0625rem] font-bold text-tinta"
            >
              Busque pelo nome
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="busca-obituario"
                type="search"
                disabled
                placeholder="Nome da pessoa"
                className="min-h-[3.25rem] flex-1 rounded-serra border border-linha bg-white px-5 text-[1.0625rem] text-tinta placeholder:text-pedra-400 disabled:cursor-not-allowed disabled:bg-pedra-100"
              />
              <button
                type="submit"
                disabled
                className="botao-cheio min-h-[3.25rem] rounded-serra px-7 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buscar
              </button>
            </div>
          </form>

          <div className="mt-8">
            <Pendencia>
              <strong className="font-bold text-tinta">A listagem ainda não está conectada.</strong>{" "}
              Ela depende do sistema que a empresa já usa para publicar os velórios, e ligar os dois
              é a próxima etapa. Nenhum nome de exemplo foi colocado aqui: um obituário inventado é
              um registro falso sobre a morte de alguém, e isso não se faz nem em protótipo.
              Enquanto isso, o plantão informa local e horário por telefone, 24 horas.
            </Pendencia>
          </div>
        </div>
      </Faixa>

      <Faixa>
        <Titulo
          centro
          rotulo="O que vai aparecer aqui"
          apoio="Cada falecimento terá a própria página, e é ela que será compartilhada no WhatsApp pela família."
        >
          Como a página de cada despedida funciona
        </Titulo>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              Icone: IconeVela,
              titulo: "Nome, datas e idade",
              texto:
                "Nome completo, data de nascimento e de falecimento, e a idade. É o que a família procura primeiro para confirmar que é a pessoa certa.",
            },
            {
              Icone: IconeLocal,
              titulo: "Onde é a cerimônia",
              texto:
                "Endereço da sala de velório, com link para o mapa. Quem está dirigindo precisa disso em um toque, não em três.",
            },
            {
              Icone: IconeRelogio,
              titulo: "Início e término",
              texto:
                "Os dois horários, não só o de início. Quem mora longe decide se dá tempo de chegar pelo horário de término.",
            },
          ].map(({ Icone, titulo, texto }, i) => (
            <li key={titulo} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <article className="cartao-cine holofote flex w-full flex-col rounded-serra-lg border border-linha bg-white p-7 shadow-baixa">
                <span className="selo-icone inline-flex size-12 items-center justify-center rounded-serra bg-serra-500/10 text-serra-600">
                  <Icone className="size-6" />
                </span>
                <h2 className="mt-5 font-display text-[1.125rem] font-bold text-tinta">{titulo}</h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-pedra-600">{texto}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-[64rem] rounded-serra-lg border border-serra-200 bg-serra-50/60 p-6 md:p-7">
          <h3 className="font-display text-[1.0625rem] font-bold text-tinta">
            Por que isto muda alguma coisa
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-corpo">
            O obituário é a página mais compartilhada de qualquer site de funerária, e o
            compartilhamento acontece por WhatsApp, dezenas de vezes por dia. No site antigo esse
            link chega <strong className="font-bold text-tinta">pelado</strong>, sem título, sem
            imagem e sem descrição, porque não existe uma única tag Open Graph lá. Aqui cada
            despedida terá as suas, e o link chega com o nome da pessoa, o local e o horário já
            visíveis antes de alguém tocar nele.
          </p>
        </div>
      </Faixa>

      <Faixa fundo="escuro">
        <div className="mx-auto max-w-[52rem] text-center">
          <Titulo claro centro apoio="Qualquer uma das oito unidades informa local e horário por telefone, a qualquer hora do dia ou da noite.">
            Enquanto isso, é por telefone
          </Titulo>
          <ul className="mt-10 grid gap-x-6 gap-y-3 text-left sm:grid-cols-2">
            {UNIDADES.map((u) => (
              <li key={u.slug}>
                <a
                  href={`tel:${u.tel}`}
                  className="holofote holofote-escuro group flex items-center justify-between gap-3 rounded-serra border border-white/12 px-4 py-3 transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                >
                  <span className="text-[0.9375rem] text-white/75 group-hover:text-white">
                    {u.nome}
                  </span>
                  <span className="numerais text-[0.9375rem] font-bold whitespace-nowrap text-onda-400">
                    {u.telefone}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Faixa>
    </>
  );
}
