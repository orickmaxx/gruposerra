import type { Metadata } from "next";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Botao, Faixa, Pendencia, Rotulo, Titulo } from "@/components/ui";
import { Contador } from "@/components/contador";
import { MapaUnidade } from "@/components/mapa-unidade";
import { UNIDADES, MEMORIAL } from "@/data/unidades";
import { SITE } from "@/lib/site";
import {
  IconeChama,
  IconeLocal,
  IconeRelogio,
  IconeSeta,
  IconeTelefone,
  IconeWhatsApp,
} from "@/components/icones";

const RESUMO =
  "São 8 unidades próprias na região metropolitana de Campinas, cada uma com equipe e telefone na própria cidade. O atendimento de óbito é 24 horas em todas, inclusive no feriado.";

const META =
  "Oito unidades próprias na região de Campinas: Valinhos, Vinhedo, Hortolândia, Artur Nogueira, Cosmópolis e Sumaré. Cada uma com telefone e equipe na cidade.";

export const metadata: Metadata = {
  title: "Unidades",
  description: META,
  alternates: { canonical: "/unidades" },
  openGraph: { title: "Unidades do Grupo Serra", description: META, url: "/unidades" },
};

/**
 * Unidades.
 *
 * A página com mais dado CONFIRMADO de todo o site: as oito unidades vêm do
 * material do próprio cliente, com endereço e telefone conferidos um a um. Por
 * isso ela não precisa de nenhuma promessa: a lista já é o argumento.
 *
 * ⛔ O CEP só aparece na matriz. Os outros sete não existem em lugar nenhum do
 * material do cliente e NÃO foram inventados para deixar o cartão simétrico.
 * Endereço errado numa página de funerária manda uma família para a rua errada
 * no pior dia da vida dela.
 */
export default function Pagina() {
  const cidades = [...new Set(UNIDADES.map((u) => u.cidade))];
  /* Ver a nota em `home/topo.tsx`: "1 crematório" vira "Próprio", porque o
     numero enfraquece o unico argumento que a concorrencia nao tem. */
  const numeros: { v: number | string; s: string; r: string; I: typeof IconeLocal }[] = [
    { v: UNIDADES.length, s: "", r: "unidades próprias", I: IconeLocal },
    { v: cidades.length, s: "", r: "cidades atendidas", I: IconeLocal },
    { v: 24, s: "h", r: "plantão de óbito", I: IconeRelogio },
    { v: "Próprio", s: "", r: "crematório, em Hortolândia", I: IconeChama },
  ];

  return (
    <>
      <HeroiPagina
        rotulo="Onde estamos"
        linhas={["Oito unidades,", "a mesma região."]}
        resumo={RESUMO}
        foto="/fotos/memorial-recepcao.webp"
        posicao="object-[60%_center]"
        acoes={
          <>
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              ima
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              Plantão 24h, {SITE.emergencia.rotulo}
            </Botao>
            <Botao href="/contato" tom="vidro">
              Falar com a equipe
              <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Botao>
          </>
        }
      >
        <ul className="revela-texto mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/15 pt-9 md:grid-cols-4" style={{ ["--i" as string]: 4 }}>
          {numeros.map(({ v, s, r, I }) => (
            <li key={r} className="flex items-center gap-3.5">
              <I className="size-6 shrink-0 text-onda-400/80" />
              <span>
                <span className="block font-display text-[1.75rem] leading-none font-extrabold tracking-tight text-white">
                  {typeof v === "number" && v > 1 ? (
                    <Contador ate={v} sufixo={s} />
                  ) : (
                    <span className="numerais">{v}{s}</span>
                  )}
                </span>
                <span className="mt-1.5 block text-[0.8125rem] leading-tight text-white/60">{r}</span>
              </span>
            </li>
          ))}
        </ul>
      </HeroiPagina>

      <Faixa fundo="papel" id="lista">
        <Titulo
          centro
          rotulo="A lista completa"
          apoio="Endereço, telefone e horário de cada unidade. O telefone leva direto para a equipe daquela cidade, não para uma central."
        >
          Escolha a unidade mais perto
        </Titulo>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {UNIDADES.map((u, i) => (
            <li key={u.slug} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <article className="cartao-cine holofote aro-luz flex w-full flex-col rounded-serra-lg border border-linha bg-white p-6 shadow-baixa md:p-7">
                <div className="flex flex-wrap items-center gap-2.5">
                  {u.matriz ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-serra-500/10 px-3 py-1 text-[0.8125rem] font-bold text-serra-600">
                      <IconeLocal className="size-4 shrink-0" />
                      Matriz
                    </span>
                  ) : null}
                  <span className="numerais text-[0.8125rem] font-semibold text-pedra-500">
                    desde {u.desde}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-t3 font-bold text-tinta">{u.nome}</h2>

                <p className="mt-3 flex gap-2.5 text-[0.9375rem] leading-relaxed text-corpo">
                  <IconeLocal className="mt-0.5 size-[1.15rem] shrink-0 text-pedra-400" />
                  <span>
                    {u.logradouro}
                    <br />
                    {u.bairro}, {u.cidade}/{u.uf}
                    {u.cep ? ` · CEP ${u.cep}` : ""}
                  </span>
                </p>

                <p className="mt-2.5 flex gap-2.5 text-[0.9375rem] leading-relaxed text-corpo">
                  <IconeRelogio className="mt-0.5 size-[1.15rem] shrink-0 text-pedra-400" />
                  <span>
                    {u.horario}
                    <br />
                    <strong className="font-bold text-tinta">Óbito: 24 horas, todos os dias.</strong>
                  </span>
                </p>

                <MapaUnidade
                  className="mt-6"
                  nome={u.nome}
                  endereco={`${u.logradouro}, ${u.bairro}, ${u.cidade}/${u.uf}`}
                />

                <div className="mt-5 flex flex-wrap gap-3 border-t border-linha pt-5">
                  <a
                    href={`tel:${u.tel}`}
                    className="botao-cheio varre numerais inline-flex min-h-[3rem] flex-1 items-center justify-center gap-2.5 rounded-serra px-5 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <IconeTelefone className="size-5 shrink-0" />
                    {u.telefone}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Pendencia>
            O CEP só está confirmado na matriz, que é o endereço registrado na Receita Federal.
            Os das outras sete unidades não constam do material do cliente e não foram preenchidos
            por estimativa: endereço errado aqui manda uma família para a rua errada.
          </Pendencia>
        </div>
      </Faixa>

      <Faixa fundo="escuro" id="memorial">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <Rotulo claro>Empresa do grupo</Rotulo>
            <Titulo claro apoio={`Desde ${MEMORIAL.desde}, velório, cerimônia de despedida e cremação acontecem no mesmo lugar, sem a família ter que se deslocar entre empresas no pior dia.`}>
              {MEMORIAL.nome}
            </Titulo>

            <p className="mt-7 flex gap-2.5 text-[0.9375rem] text-white/70">
              <IconeLocal className="mt-0.5 size-[1.15rem] shrink-0 text-onda-400" />
              <span>
                {MEMORIAL.logradouro}
                <br />
                {MEMORIAL.bairro}, {MEMORIAL.cidade}/{MEMORIAL.uf}
              </span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Botao href="/cremacao" tom="claro">
                Como funciona a cremação
                <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </Botao>
              <Botao href={MEMORIAL.site} externo tom="vidro">
                Site do Memorial
              </Botao>
            </div>
          </div>

          <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {MEMORIAL.estrutura.map((e, i) => (
              <li
                key={e}
                className="item-cascata holofote holofote-escuro flex items-start gap-2.5 rounded-serra border border-white/12 bg-white/[0.06] px-4 py-3.5 text-[0.9375rem] text-white transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.12]"
                style={{ ["--i" as string]: i }}
              >
                <IconeChama className="mt-0.5 size-[1.05rem] shrink-0 text-onda-400" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Faixa>

      <Faixa>
        <div className="mx-auto max-w-[46rem] text-center">
          <Rotulo>Não sabe qual chamar</Rotulo>
          <Titulo centro apoio="Ligue para qualquer uma das oito. Quem atender resolve, e se for o caso passa para a unidade mais perto de onde você está.">
            Na dúvida, ligue para a matriz
          </Titulo>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              ima
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergencia.rotulo}
            </Botao>
            <Botao
              href={SITE.whatsapp.link}
              externo
              tom="zap"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              Falar no WhatsApp
            </Botao>
          </div>
        </div>
      </Faixa>
    </>
  );
}
