import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import {
  IconeEnvelope,
  IconeFacebook,
  IconeInstagram,
  IconeTelefone,
  IconeWhatsApp,
} from "./icones";

/**
 * Rodapé.
 *
 * ⛔ O que caiu: a coluna "O SITE" com treze links empilhados numa lista só,
 * de "Planos" a "Rever minha escolha de cookies". Ninguém varre treze itens
 * sem hierarquia, e o dono apontou isso.
 *
 * Agora são TRÊS grupos com nome, montados por assunto, e o jurídico desceu
 * para a linha de baixo, que é onde jurídico mora. É a mesma solução que o Bom
 * Pastor usa no mega-menu deles: Sobre / Produtos / Serviços e Benefícios /
 * Atendimento, cada um com três a cinco itens.
 */
const GRUPOS: { titulo: string; itens: { rotulo: string; href: string; externo?: boolean }[] }[] = [
  {
    titulo: "Planos e serviços",
    itens: [
      { rotulo: "Planos e preços", href: "/planos" },
      { rotulo: "Cremação", href: "/cremacao" },
      { rotulo: "Serra Pet", href: "/serra-pet" },
      { rotulo: "Clube de Benefícios", href: SITE.externos.beneficios, externo: true },
    ],
  },
  {
    titulo: "Para as famílias",
    itens: [
      { rotulo: "Obituário", href: "/obituario" },
      { rotulo: "Homenagens", href: "/homenagens" },
      { rotulo: "Unidades", href: "/unidades" },
      { rotulo: "Blog", href: "/blog" },
    ],
  },
  {
    titulo: "Já sou associado",
    itens: [
      { rotulo: "2ª via de boleto", href: SITE.externos.segundaVia, externo: true },
      { rotulo: "Falar com a equipe", href: "/contato" },
      {
        rotulo: "Complexo Memorial Hortolândia",
        href: SITE.externos.memorial,
        externo: true,
      },
    ],
  },
];

export function Rodape() {
  return (
    <footer className="faixa-escura malha-escura pb-28 text-serra-100 md:pb-24">
      <div className="mx-auto max-w-[80rem] px-5 py-16">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
          {/* --- marca e contato --- */}
          <div>
            <Image
              src="/marca/logo-grupo-serra-branco.png"
              alt={SITE.nomeCompleto}
              width={347}
              height={93}
              className="h-11 w-auto"
            />
            <p className="mt-5 max-w-sm font-display text-[1.25rem] leading-snug text-white">
              {SITE.slogan}
            </p>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-serra-200">
              Atendendo famílias na região metropolitana de Campinas{" "}
              {SITE.idadeTexto}, em {UNIDADES.length} unidades.
            </p>

            <ul className="mt-7 space-y-3.5">
              <li>
                <a
                  href={`tel:${SITE.emergencia.tel}`}
                  className="group flex items-start gap-3"
                >
                  <IconeTelefone className="mt-1 size-[1.15rem] shrink-0 text-serra-300" />
                  <span>
                    <span className="numerais block text-[1.125rem] font-semibold text-white transition-colors group-hover:text-serra-200">
                      {SITE.emergencia.rotulo}
                    </span>
                    <span className="text-[0.875rem] text-serra-200">
                      Atendimento de óbito, 24 horas
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.emergenciaAlt.tel}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <IconeTelefone className="size-[1.15rem] shrink-0 text-serra-300" />
                  <span className="numerais text-[1.0625rem] text-white">
                    {SITE.emergenciaAlt.rotulo}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <IconeWhatsApp className="size-[1.15rem] shrink-0 text-serra-300" />
                  <span className="numerais text-[1.0625rem] text-white">
                    {SITE.whatsapp.rotulo}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-white"
                >
                  <IconeEnvelope className="size-[1.15rem] shrink-0 text-serra-300" />
                  <span className="break-all text-white">{SITE.email}</span>
                </a>
              </li>
            </ul>

            <div className="mt-7 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-serra border border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
              >
                <IconeInstagram titulo="Instagram do Grupo Serra" className="size-[1.3rem]" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-serra border border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
              >
                <IconeFacebook titulo="Facebook do Grupo Serra" className="size-[1.3rem]" />
              </a>
            </div>
          </div>

          {/* --- tres grupos de navegacao, por assunto --- */}
          {GRUPOS.map((g) => (
            <nav key={g.titulo} aria-label={g.titulo}>
              <h2 className="text-[0.8125rem] font-bold tracking-[0.14em] text-serra-300 uppercase">
                {g.titulo}
              </h2>
              <ul className="mt-5 space-y-3">
                {g.itens.map((l) => (
                  <li key={l.rotulo}>
                    {l.externo ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-texto text-serra-100 transition-colors hover:text-white"
                      >
                        {l.rotulo}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="link-texto text-serra-100 transition-colors hover:text-white"
                      >
                        {l.rotulo}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/*
          As marcas do grupo, com o logotipo DE VERDADE de cada uma. O Complexo
          Memorial Hortolândia é empresa do grupo (CNPJ 34.503.357/0001-04) e o
          Serra Pet tem marca própria. Os dois arquivos vieram dos sites das
          próprias marcas, não são ícone desenhado fingindo de logotipo.
        */}
        <div className="mt-14 border-t border-white/12 pt-10">
          <h2 className="text-[0.8125rem] font-bold tracking-[0.14em] text-serra-300 uppercase">
            As marcas do grupo
          </h2>
          <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-8">
            <Image
              src="/marca/logo-grupo-serra-branco.png"
              alt={SITE.nomeCompleto}
              width={347}
              height={93}
              className="h-9 w-auto opacity-90"
            />
            <a
              href={SITE.externos.memorial}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Complexo Memorial Hortolândia, site da marca"
            >
              <Image
                src="/marca/logo-memorial.png"
                alt="Complexo Memorial Hortolândia, crematório"
                width={300}
                height={90}
                className="h-11 w-auto opacity-90 transition-opacity hover:opacity-100"
              />
            </a>
            <Link href="/serra-pet" aria-label="Serra Pet">
              <Image
                src="/marca/logo-serra-pet-branco.png"
                alt="Serra Pet, assistência funeral e cremação"
                width={962}
                height={237}
                className="h-9 w-auto opacity-90 transition-opacity hover:opacity-100"
              />
            </Link>
          </div>
        </div>

        {/* --- linha jurídica: é aqui que jurídico mora --- */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/12 pt-7 text-[0.875rem] leading-relaxed text-serra-300 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p>
              {SITE.razaoSocial} · CNPJ {SITE.cnpj}
            </p>
            <p className="mt-1">
              {SITE.matriz.rua}, {SITE.matriz.bairro}, {SITE.matriz.cidade}/
              {SITE.matriz.uf}, CEP {SITE.matriz.cep}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacidade" className="link-texto hover:text-white">
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos" className="link-texto hover:text-white">
                Termos de uso
              </Link>
            </li>
            <li>
              {/* Reabre o aviso de cookies. A LGPD exige que dê para mudar de
                  ideia depois, não só na primeira visita. */}
              <button
                type="button"
                data-cookies-abrir
                className="link-texto text-left hover:text-white"
              >
                Preferências de cookies
              </button>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
