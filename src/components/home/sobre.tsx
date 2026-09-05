import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { MolduraFoto } from "../moldura-foto";
import { IconeCoracao } from "../icones";

/**
 * A história da empresa, a família e a equipe.
 *
 * Faltava inteira, e o dono cobrou com razao: um site de funeraria sem rosto,
 * sem historia e sem equipe e exatamente o que denuncia pagina gerada. E aqui
 * o rosto nao e enfeite, e o produto: a empresa vende proximidade contra um
 * concorrente de escala nacional.
 *
 * ⛔ Aqui existia uma lista com os NOMES de quinze colaboradores, tirada das
 * avaliacoes do Google. O dono mandou remover e a razao dele e boa: se alguem
 * for desligado amanha, o site vira um problema de RH. A prova social continua,
 * o fato continua dito, e nenhum funcionario fica dependurado no HTML.
 */

export function Sobre() {
  return (
    <section id="sobre" className="bg-papel py-12 md:py-20">
      <div className="mx-auto max-w-[76rem] px-5">
        {/* --- historia --- */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16" data-revela>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-serra-500/10 px-4 py-2 text-[0.875rem] font-semibold text-serra-600">
              <IconeCoracao className="size-4 shrink-0" />
              Nossa história
            </p>

            <h2 className="mt-5 max-w-[20ch] text-t2">
              Uma família cuidando de outra, {SITE.idadeTexto}
            </h2>

            <div className="mt-6 max-w-[58ch] space-y-4 text-lead leading-relaxed text-corpo">
              <p>
                O Grupo Serra nasceu em Campinas para atender famílias no
                momento em que elas menos conseguem se organizar sozinhas. Não
                saiu da região desde então: cada uma das {UNIDADES.length}{" "}
                unidades foi aberta em uma cidade onde já havia gente daqui.
              </p>
              <p>
                A missão que a empresa declara é essa: garantir que o contrato e
                a cerimônia sejam dignos e humanizados, e que a família tenha
                tranquilidade e conforto num momento difícil. Não é frase de
                folheto. É o que as avaliações do Google descrevem, uma por uma,
                com nome e sobrenome de quem atendeu.
              </p>
            </div>

          </div>

          {/*
            As duas fotos de baixo sao REAIS e sao do proprio grupo: vieram do
            site do Complexo Memorial Hortolandia. A de cima continua reservada
            porque a matriz de Campinas e a equipe ainda nao foram fotografadas,
            e foto de banco de imagens aqui destruiria a confianca das outras
            duas.
          */}
          <div className="grid gap-4">
            <MolduraFoto
              proporcao="16/10"
              titulo="Foto da fachada da matriz, em Campinas"
              detalhe="Horizontal, mínimo 1600px de largura."
            />
            <div className="grid grid-cols-2 gap-4">
              <MolduraFoto
                proporcao="1/1"
                src="/fotos/memorial-atendimento.webp"
                alt="Sala de atendimento do Complexo Memorial Hortolândia"
                titulo="Sala de atendimento"
                legenda="Sala de atendimento do Memorial Hortolândia"
              />
              <MolduraFoto
                proporcao="1/1"
                src="/fotos/memorial-recepcao.webp"
                alt="Recepção do Complexo Memorial Hortolândia"
                titulo="Recepção do Memorial"
                legenda="Recepção do Memorial, em Hortolândia"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
