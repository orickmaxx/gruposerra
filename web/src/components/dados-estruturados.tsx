import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { FAQ, PLANOS } from "@/data/planos";

/**
 * Dados estruturados.
 *
 * A regua deste projeto sao os concorrentes diretos, medidos em 02/09/2026:
 * Flamboyant tinha 3 tipos de schema, Zelo 2, Parque das Flores nenhum. Aqui
 * saem 5 tipos, com FuneralHome POR UNIDADE, que e o que o Google usa na busca
 * local ("funeraria perto de mim"). Ver PRODUCT.md.
 */
export function DadosEstruturados() {
  const org = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organizacao`,
    name: SITE.nomeCompleto,
    legalName: SITE.razaoSocial,
    taxID: SITE.cnpj,
    url: SITE.url,
    slogan: SITE.slogan,
    /* foundingDate so entra quando o cliente provar 1961: dado estruturado
       errado e uma afirmacao ao Google, nao um detalhe de copy. */
    ...(SITE.fundacaoConfirmada ? { foundingDate: String(SITE.fundacao) } : {}),
    email: SITE.email,
    telephone: SITE.emergencia.tel,
    logo: `${SITE.url}/marca/logo-grupo-serra.png`,
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.linkedin],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.matriz.rua,
      addressLocality: SITE.matriz.cidade,
      addressRegion: SITE.matriz.uf,
      postalCode: SITE.matriz.cep,
      addressCountry: "BR",
    },
  };

  const site = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#site`,
    url: SITE.url,
    name: SITE.nomeCompleto,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE.url}/#organizacao` },
  };

  const unidades = UNIDADES.map((u) => ({
    "@type": "FuneralHome",
    "@id": `${SITE.url}/unidades/${u.slug}#local`,
    name: `${SITE.nomeCompleto} · ${u.nome}`,
    parentOrganization: { "@id": `${SITE.url}/#organizacao` },
    telephone: u.tel,
    url: `${SITE.url}/unidades/${u.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: u.logradouro,
      addressLocality: u.cidade,
      addressRegion: u.uf,
      ...(u.cep ? { postalCode: u.cep } : {}),
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: u.cidade },
    /* O balcao tem horario. O atendimento de obito nao fecha, e isso precisa
       aparecer para o Google tambem, nao so para o visitante. */
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "Atendimento de óbito, 24 horas",
      },
    ],
  }));

  const servico = {
    "@type": "Service",
    "@id": `${SITE.url}/planos#servico`,
    name: "Plano funerário Grupo Serra",
    serviceType: "Plano de assistência funerária",
    provider: { "@id": `${SITE.url}/#organizacao` },
    areaServed: [...new Set(UNIDADES.map((u) => u.cidade))].map((c) => ({
      "@type": "City",
      name: c,
    })),
    offers: PLANOS.map((p) => ({
      "@type": "Offer",
      name: p.nome,
      price: p.preco,
      priceCurrency: "BRL",
      url: `${SITE.url}/planos`,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.preco,
        priceCurrency: "BRL",
        unitCode: "MON",
        billingIncrement: 1,
      },
    })),
  };

  const perguntas = {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#duvidas`,
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.p,
      acceptedAnswer: { "@type": "Answer", text: f.r },
    })),
  };

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [org, site, servico, perguntas, ...unidades],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo) }}
    />
  );
}
