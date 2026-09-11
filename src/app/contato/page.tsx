import type { Metadata } from "next";
import { HeroiPagina } from "@/components/heroi-pagina";
import { Botao, Faixa, Pendencia, Rotulo, Titulo } from "@/components/ui";
import { Formulario } from "@/components/home/formulario";
import { UNIDADES } from "@/data/unidades";
import { SITE } from "@/lib/site";
import {
  IconeBoleto,
  IconeEnvelope,
  IconeLocal,
  IconeRelogio,
  IconeSeta,
  IconeTelefone,
  IconeWhatsApp,
} from "@/components/icones";

const RESUMO =
  "Telefone de plantão 24 horas, WhatsApp, e-mail e as oito unidades com endereço e horário. Se for urgente, ligue: o telefone resolve mais rápido que qualquer formulário.";

const META =
  "Plantão de óbito 24 horas no (19) 3775-9752, WhatsApp, e-mail e as 8 unidades da região de Campinas com endereço e horário. Se for urgente, ligue.";

export const metadata: Metadata = {
  title: "Contato",
  description: META,
  alternates: { canonical: "/contato" },
  openGraph: { title: "Contato", description: META, url: "/contato" },
};

/**
 * Contato.
 *
 * ⛔ A hierarquia desta página é deliberada e contraria o costume: o TELEFONE
 * vem antes do formulário, e a página diz com todas as letras que ele resolve
 * mais rápido. Página de contato de agência costuma empurrar o formulário
 * primeiro porque formulário vira lead rastreável. Aqui, quem precisa de
 * funerária às três da manhã não preenche formulário, e fingir o contrário é
 * desenhar para o relatório em vez de para a pessoa.
 *
 * O formulário existe, e é o mesmo componente da home, para quem está
 * pesquisando com calma e prefere ser chamado.
 */

const CANAIS = [
  {
    Icone: IconeTelefone,
    rotulo: "Atendimento de óbito, 24 horas",
    valor: SITE.emergencia.rotulo,
    href: `tel:${SITE.emergencia.tel}`,
    nota: "Todos os dias, inclusive feriado.",
    destaque: true,
  },
  {
    Icone: IconeTelefone,
    rotulo: "Segundo número do plantão",
    valor: SITE.emergenciaAlt.rotulo,
    href: `tel:${SITE.emergenciaAlt.tel}`,
    nota: "Atende óbito em qualquer cidade, 24 horas.",
  },
  {
    Icone: IconeWhatsApp,
    rotulo: "WhatsApp",
    valor: SITE.whatsapp.rotulo,
    href: SITE.whatsapp.link,
    externo: true,
    nota: "Para dúvidas sobre plano, cremação e Serra Pet.",
  },
  {
    Icone: IconeEnvelope,
    rotulo: "E-mail",
    valor: SITE.email,
    href: `mailto:${SITE.email}`,
    nota: "Para assuntos que não têm pressa.",
  },
];

export default function Pagina() {
  return (
    <>
      <HeroiPagina
        rotulo="Fale com a gente"
        linhas={["Se for urgente,", "ligue."]}
        resumo={RESUMO}
        foto="/fotos/memorial-atendimento.webp"
        posicao="object-[35%_center]"
        acoes={
          <>
            <Botao
              href={`tel:${SITE.emergencia.tel}`}
              externo
              ima
              tom="claro"
              icone={<IconeTelefone className="size-5 shrink-0" />}
            >
              {SITE.emergencia.rotulo}
            </Botao>
            <Botao
              href={SITE.whatsapp.link}
              externo
              tom="vidro"
              icone={<IconeWhatsApp className="size-5 shrink-0" />}
            >
              WhatsApp
            </Botao>
          </>
        }
      />

      <Faixa fundo="papel">
        <Titulo centro rotulo="Canais" apoio="Quatro formas de falar com a equipe. A primeira é a que resolve na hora.">
          Por onde falar
        </Titulo>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {CANAIS.map((c, i) => (
            <li key={c.rotulo} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <a
                href={c.href}
                {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`cartao-cine holofote aro-luz flex w-full items-start gap-4 rounded-serra-lg p-6 md:p-7 ${
                  c.destaque
                    ? "mat-azul holofote-escuro text-white shadow-alta"
                    : "border border-linha bg-white shadow-baixa"
                }`}
              >
                <span
                  className={`selo-icone flex size-12 shrink-0 items-center justify-center rounded-serra ${
                    c.destaque ? "bg-white/15 text-white" : "bg-serra-500/10 text-serra-600"
                  }`}
                >
                  <c.Icone className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[0.8125rem] font-bold tracking-[0.12em] uppercase ${
                      c.destaque ? "text-serra-200" : "text-pedra-500"
                    }`}
                  >
                    {c.rotulo}
                  </span>
                  <span
                    className={`numerais mt-1.5 block font-display text-[1.375rem] leading-tight font-extrabold ${
                      c.destaque ? "text-white" : "text-tinta"
                    }`}
                  >
                    {c.valor}
                  </span>
                  <span
                    className={`mt-1.5 block text-[0.875rem] ${
                      c.destaque ? "text-serra-100/85" : "text-pedra-600"
                    }`}
                  >
                    {c.nota}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-serra-lg border border-dashed border-serra-300 bg-white px-6 py-5">
          <IconeBoleto className="size-6 shrink-0 text-serra-600" />
          <p className="flex-1 text-[0.9375rem] leading-relaxed text-corpo">
            <strong className="font-bold text-tinta">Já é associado e precisa da 2ª via do boleto?</strong>{" "}
            Não precisa ligar: resolve direto no sistema.
          </p>
          <Botao href={SITE.externos.segundaVia} externo tom="contorno">
            2ª via de boleto
            <IconeSeta className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Botao>
        </div>
      </Faixa>

      <Formulario />

      <Faixa fundo="areia" id="unidades">
        <Titulo
          centro
          rotulo="Presencial"
          apoio="Cada unidade tem equipe e telefone na própria cidade. O horário abaixo é o do balcão; o atendimento de óbito é 24 horas em todas."
        >
          As oito unidades
        </Titulo>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {UNIDADES.map((u, i) => (
            <li key={u.slug} className="item-cascata flex" style={{ ["--i" as string]: i }}>
              <article className="cartao-cine holofote flex w-full flex-col rounded-serra-lg border border-linha bg-white p-6 shadow-baixa">
                <h3 className="font-display text-[1.0625rem] font-bold text-tinta">{u.nome}</h3>
                <p className="mt-3 flex gap-2 text-[0.875rem] leading-relaxed text-corpo">
                  <IconeLocal className="mt-0.5 size-[1.05rem] shrink-0 text-pedra-400" />
                  <span>
                    {u.logradouro}
                    <br />
                    {u.bairro}, {u.cidade}/{u.uf}
                  </span>
                </p>
                <p className="mt-2.5 flex gap-2 text-[0.875rem] leading-relaxed text-pedra-600">
                  <IconeRelogio className="mt-0.5 size-[1.05rem] shrink-0 text-pedra-400" />
                  {u.horario}
                </p>
                <a
                  href={`tel:${u.tel}`}
                  className="numerais mt-auto flex min-h-[3rem] items-center justify-center gap-2 rounded-serra border border-serra-200 bg-serra-50 pt-0 font-semibold text-serra-700 transition-colors hover:border-serra-400 hover:bg-serra-100"
                >
                  <IconeTelefone className="size-[1.05rem] shrink-0" />
                  {u.telefone}
                </a>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 max-w-[64rem]">
          <Pendencia>
            O horário de <strong className="font-bold">sábado</strong> ainda precisa ser confirmado:
            a home do site antigo diz 8h às 12h e a página de contato dele diz 9h às 12h. Adotamos 8h
            por ser o que aparece duas vezes, mas o cliente precisa dizer qual vale.
          </Pendencia>
        </div>
      </Faixa>

      <Faixa fundo="escuro">
        <div className="mx-auto max-w-[52rem] text-center">
          <Rotulo claro>A empresa</Rotulo>
          <Titulo claro centro>
            Quem responde por este site
          </Titulo>
          <dl className="mt-10 grid gap-6 text-left sm:grid-cols-2">
            <div>
              <dt className="text-[0.8125rem] font-bold tracking-[0.12em] text-serra-300 uppercase">
                Razão social
              </dt>
              <dd className="mt-1.5 text-[0.9375rem] text-white">{SITE.razaoSocial}</dd>
            </div>
            <div>
              <dt className="text-[0.8125rem] font-bold tracking-[0.12em] text-serra-300 uppercase">
                CNPJ
              </dt>
              <dd className="numerais mt-1.5 text-[0.9375rem] text-white">{SITE.cnpj}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[0.8125rem] font-bold tracking-[0.12em] text-serra-300 uppercase">
                Endereço da matriz
              </dt>
              <dd className="mt-1.5 text-[0.9375rem] text-white">
                {SITE.matriz.rua}, {SITE.matriz.bairro}, {SITE.matriz.cidade}/{SITE.matriz.uf} · CEP{" "}
                <span className="numerais">{SITE.matriz.cep}</span>
              </dd>
            </div>
          </dl>
        </div>
      </Faixa>
    </>
  );
}
