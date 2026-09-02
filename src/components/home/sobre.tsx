import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { MolduraFoto } from "../moldura-foto";
import { Pendencia } from "../ui";
import { IconeCoracao } from "../icones";

/**
 * A história da empresa, a família e a equipe.
 *
 * Faltava inteira, e o dono cobrou com razao: um site de funeraria sem rosto,
 * sem historia e sem equipe e exatamente o que denuncia pagina gerada. E aqui
 * o rosto nao e enfeite, e o produto: a empresa vende proximidade contra um
 * concorrente de escala nacional.
 *
 * As pessoas citadas abaixo NAO foram inventadas. Sao os nomes que as proprias
 * familias escreveram nas avaliacoes publicas do Google (ver data/depoimentos).
 * E o ativo mais dificil de copiar que o Grupo Serra tem, e estava jogado fora.
 */

/** Nomes citados espontaneamente pelas familias nas 9 avaliacoes do Google. */
const CITADOS = [
  "Robson",
  "Anderson",
  "Rosemeire",
  "Thalia",
  "Jéssica",
  "Marli",
  "Luciana",
  "William",
  "Julio",
  "John",
  "Patricia",
  "Gabriel",
  "Amaury",
  "Marcio",
  "Diego",
];

export function Sobre() {
  return (
    <section id="sobre" className="bg-papel py-20 md:py-28">
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

            <div className="mt-8 max-w-[58ch]">
              <Pendencia>
                <strong className="font-semibold text-tinta">
                  Falta a história contada pela empresa:
                </strong>{" "}
                quem fundou, em que circunstância, e o que mudou de lá para cá.
                Nada aqui foi inventado, e o ano de {SITE.fundacao} continua sem
                documento público (o CNPJ ativo é de {SITE.cnpjDesde}).
              </Pendencia>
            </div>
          </div>

          <div className="grid gap-4">
            <MolduraFoto
              proporcao="16/10"
              titulo="Foto da família fundadora, ou da fachada da matriz"
              detalhe="Horizontal, mínimo 1600px de largura. É a primeira imagem humana do site."
            />
            <div className="grid grid-cols-2 gap-4">
              <MolduraFoto
                proporcao="1/1"
                titulo="Atendimento no balcão"
                detalhe="Alguém da equipe recebendo uma família."
              />
              <MolduraFoto
                proporcao="1/1"
                titulo="Sala de velório"
                detalhe="Interior do Memorial Hortolândia."
              />
            </div>
          </div>
        </div>

        {/* --- equipe --- */}
        <div className="mt-24" data-revela>
          <div className="max-w-[42ch]">
            <h2 className="text-t2">As pessoas que as famílias citam pelo nome</h2>
            <p className="mt-5 max-w-[62ch] text-lead text-pedra-600">
              Nas nove avaliações que este site publica, quinze colaboradores
              aparecem citados espontaneamente por quem foi atendido. Nenhum
              concorrente consegue copiar isso.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {CITADOS.map((n) => (
              <li
                key={n}
                className="rounded-full border border-serra-200 bg-serra-50 px-4 py-2 font-display text-[0.9375rem] font-bold text-serra-700"
              >
                {n}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MolduraFoto
              proporcao="3/4"
              titulo="Foto da equipe"
              detalhe="Retrato de quem atende, com nome e função."
            />
            <MolduraFoto proporcao="3/4" titulo="Foto da equipe" />
            <MolduraFoto proporcao="3/4" titulo="Foto da equipe" />
            <MolduraFoto
              proporcao="3/4"
              titulo="Foto da frota"
              detalhe="Carro assistencial, que aparece em vários depoimentos."
            />
          </div>

          <p className="mt-6 max-w-[70ch] text-[0.9375rem] leading-relaxed text-pedra-600">
            Os retratos entram nesses espaços quando o Grupo Serra enviar as
            imagens. Enquanto não chegarem, o site prefere o espaço declarado a
            uma foto de banco de imagens: numa funerária, foto genérica de
            pessoas sorrindo é pior do que foto nenhuma.
          </p>
        </div>
      </div>
    </section>
  );
}
