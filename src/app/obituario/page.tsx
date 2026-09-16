import type { Metadata } from "next";
import { metadados } from "@/lib/metadados";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Faixa, Titulo } from "@/components/ui";
import { ListaObituarios } from "@/components/obituario/lista";
import { UNIDADES } from "@/data/unidades";
import { SITE } from "@/lib/site";
import { IconeAlerta, IconeTelefone } from "@/components/icones";

const RESUMO =
  "Local e horário do velório e da despedida. Esta página não vende nada: sem pop-up, sem banner, sem oferta.";

const META =
  "Local e horário do velório e da despedida, nas 8 unidades da região de Campinas. Esta página não vende nada: sem pop-up, sem banner, sem oferta.";

export const metadata: Metadata = metadados({
  titulo: "Obituário",
  descricao: META,
  caminho: "/obituario",
});

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
 * ⚠️ REGISTROS DE DEMONSTRAÇÃO. A versão anterior desta página declarava a
 * lacuna com `Pendencia` e não mostrava nome nenhum, porque inventar obituário
 * é fabricar um registro sobre a morte de alguém. Em 16/09/2026 o dono decidiu
 * que a demonstração comercial precisa da página funcionando, e o override está
 * registrado no CLAUDE.md com escopo fechado: só com `ehExemplo`, só fora de
 * produção indexada. A trava é `scripts/sem-exemplo.mjs`, que quebra o build se
 * alguém tentar publicar isto indexado. O aviso abaixo é a parte que o
 * visitante vê; a trava é a parte que não depende de ninguém lembrar.
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
        <div className="mx-auto max-w-[72rem]">
          <Titulo
            centro
            rotulo="Buscar"
            apoio="Digite o nome da pessoa, ou escolha a unidade, para encontrar o local e o horário da cerimônia."
          >
            Procurar um velório
          </Titulo>

          <div className="mt-10">
            <AvisoDemonstracao />
          </div>

          <div className="mt-8">
            <ListaObituarios />
          </div>
        </div>
      </Faixa>

      <Faixa fundo="escuro">
        <div className="mx-auto max-w-[52rem] text-center">
          <Titulo
            claro
            centro
            apoio="Qualquer uma das oito unidades informa local e horário por telefone, a qualquer hora do dia ou da noite."
          >
            Prefere falar com alguém
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

/**
 * O aviso não usa `Pendencia` porque `Pendencia` diz "falta dado do cliente".
 * Aqui o caso é outro: o dado EXISTE na tela e é falso de propósito. Merece
 * texto próprio, no mesmo tom de bronze, dizendo exatamente isso.
 */
function AvisoDemonstracao() {
  return (
    <div className="flex items-start gap-3.5 rounded-serra border border-dashed border-bronze/60 bg-bronze/[0.07] px-5 py-4">
      <IconeAlerta className="mt-0.5 size-5 shrink-0 text-bronze-forte" />
      <p className="text-[0.9375rem] leading-relaxed text-pedra-700">
        <strong className="font-bold text-tinta">
          As despedidas abaixo são registros de demonstração.
        </strong>{" "}
        Os nomes são inventados e não correspondem a nenhuma pessoa. Servem para mostrar como a
        listagem, a busca e a página de cada despedida funcionam enquanto o sistema de publicação da
        empresa não está conectado. Nenhuma delas vai ao ar no site definitivo.
      </p>
    </div>
  );
}
