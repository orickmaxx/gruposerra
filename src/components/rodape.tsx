import Image from "next/image";
import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import {
  IconeEnvelope,
  IconeFacebook,
  IconeInstagram,
  IconeTelefone,
  IconeWhatsApp,
} from "./icones";

export function Rodape() {
  return (
    <footer className="faixa-escura malha-escura pb-28 text-serra-100 md:pb-0">
      <div className="mx-auto max-w-[76rem] px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.15fr_1fr_1fr]">
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

            <div className="mt-7 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-serra border border-white/20 transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <IconeInstagram titulo="Instagram do Grupo Serra" className="size-[1.3rem]" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center rounded-serra border border-white/20 transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <IconeFacebook titulo="Facebook do Grupo Serra" className="size-[1.3rem]" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-sans text-[0.8125rem] font-bold tracking-[0.14em] text-serra-300 uppercase">
              Atendimento
            </h2>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href={`tel:${SITE.emergencia.tel}`}
                  className="group flex items-start gap-3"
                >
                  <IconeTelefone className="mt-1 size-[1.15rem] shrink-0 text-serra-300" />
                  <span>
                    <span className="numerais block text-[1.125rem] font-semibold text-white">
                      {SITE.emergencia.rotulo}
                    </span>
                    <span className="text-[0.875rem] text-serra-200">
                      Óbito, 24 horas
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.emergenciaAlt.tel}`}
                  className="flex items-start gap-3"
                >
                  <IconeTelefone className="mt-1 size-[1.15rem] shrink-0 text-serra-300" />
                  <span className="numerais text-[1.125rem] font-semibold text-white">
                    {SITE.emergenciaAlt.rotulo}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3"
                >
                  <IconeWhatsApp className="mt-1 size-[1.15rem] shrink-0 text-serra-300" />
                  <span className="numerais text-[1.0625rem] text-white">
                    {SITE.whatsapp.rotulo}
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="flex items-start gap-3">
                  <IconeEnvelope className="mt-1 size-[1.15rem] shrink-0 text-serra-300" />
                  <span className="break-all text-white">{SITE.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-[0.8125rem] font-bold tracking-[0.14em] text-serra-300 uppercase">
              O site
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-texto text-serra-100 hover:text-white">
                    {l.rotulo}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={SITE.externos.segundaVia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-texto text-serra-100 hover:text-white"
                >
                  Segunda via de boleto
                </a>
              </li>
              <li>
                <a
                  href={SITE.externos.beneficios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-texto text-serra-100 hover:text-white"
                >
                  Clube de Benefícios
                </a>
              </li>
              <li>
                <a
                  href={SITE.externos.memorial}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-texto text-serra-100 hover:text-white"
                >
                  Complexo Memorial Hortolândia
                </a>
              </li>
              <li>
                <Link href="/privacidade" className="link-texto text-serra-100 hover:text-white">
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="link-texto text-serra-100 hover:text-white">
                  Termos de uso
                </Link>
              </li>
              <li>
                {/* Reabre o aviso de cookies. A LGPD exige que dê para mudar de
                    ideia depois, nao so na primeira visita. */}
                <button
                  type="button"
                  data-cookies-abrir
                  className="link-texto text-left text-serra-100 hover:text-white"
                >
                  Rever minha escolha de cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/12 pt-7 text-[0.875rem] leading-relaxed text-serra-300">
          <p>
            {SITE.razaoSocial} · CNPJ {SITE.cnpj}
          </p>
          <p className="mt-1">
            {SITE.matriz.rua}, {SITE.matriz.bairro}, {SITE.matriz.cidade}/
            {SITE.matriz.uf}, CEP {SITE.matriz.cep}
          </p>
        </div>
      </div>
    </footer>
  );
}
