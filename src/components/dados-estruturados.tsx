import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { FAQ, PLANOS } from "@/data/planos";
import { unidadeDo, type Obituario } from "@/data/obituarios";
import type { Unidade } from "@/data/unidades";

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

/**
 * `FuneralHome` da unidade, na página da própria unidade.
 *
 * O mesmo `@id` que a home emite: é a MESMA entidade, e repetir o identificador
 * é o que diz isso ao buscador. Aqui ela ganha `mainEntityOfPage`, que a home
 * não pode dar, porque é esta URL que fala sobre este local — e é o que sustenta
 * a busca por "funerária em Valinhos" resolver para esta página, e não para a
 * listagem genérica.
 */
export function DadosUnidade({ u }: { u: Unidade }) {
  const dados = {
    "@context": "https://schema.org",
    "@type": "FuneralHome",
    "@id": `${SITE.url}/unidades/${u.slug}#local`,
    name: `${SITE.nomeCompleto} · ${u.nome}`,
    url: `${SITE.url}/unidades/${u.slug}`,
    mainEntityOfPage: `${SITE.url}/unidades/${u.slug}`,
    parentOrganization: { "@id": `${SITE.url}/#organizacao` },
    telephone: u.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: u.logradouro,
      addressLocality: u.cidade,
      addressRegion: u.uf,
      ...(u.cep ? { postalCode: u.cep } : {}),
      addressCountry: "BR",
    },
    /* ⚠️ `geo` NÃO ENTRA. As coordenadas de `unidades.ts` são aproximadas: nível
       de endereço em três unidades, bairro em uma e centro de cidade em quatro.
       Elas servem para ordenar qual unidade está mais perto; publicá-las como
       `geo` seria afirmar ao Google uma localização que manda quem traça rota
       para o quarteirão errado. */
    areaServed: { "@type": "City", name: u.cidade },
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

/**
 * Dados estruturados de UMA despedida: `Person` mais o `Event` do velório.
 *
 * Por que os dois, e não só um: `Person` carrega `birthDate` e `deathDate`, que
 * é o que responde a busca por nome; `Event` carrega data, horário e endereço,
 * que é o que pode render o cartão com local e hora no resultado. Nenhum
 * concorrente da praça publica nem um nem outro.
 *
 * ⛔ `deathPlace` e `homeLocation` NÃO entram. O dado que a empresa tem é a
 * unidade que atende a família, não onde a pessoa morreu nem onde morava.
 * Preencher esses campos com a unidade seria afirmar ao Google uma coisa que
 * ninguém conferiu.
 *
 * ⚠️ Registro de demonstração sai sem JSON-LD nenhum. Marcação estruturada é
 * uma AFIRMAÇÃO a máquina, e afirmar a morte de uma pessoa inventada é o tipo
 * de dado que sobrevive à demonstração em cache de terceiro.
 */
export function DadosObituario({ o }: { o: Obituario }) {
  if (o.ehExemplo) return null;

  const u = unidadeDo(o);
  const endereco = {
    "@type": "PostalAddress",
    streetAddress: u.logradouro,
    addressLocality: u.cidade,
    addressRegion: u.uf,
    ...(u.cep ? { postalCode: u.cep } : {}),
    addressCountry: "BR",
  };

  const grafo = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/obituario/${o.slug}#pessoa`,
        name: o.nome,
        birthDate: o.dataNascimento,
        deathDate: o.dataFalecimento,
        url: `${SITE.url}/obituario/${o.slug}`,
      },
      {
        "@type": "Event",
        "@id": `${SITE.url}/obituario/${o.slug}#velorio`,
        name: `Velório de ${o.nome}`,
        about: { "@id": `${SITE.url}/obituario/${o.slug}#pessoa` },
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        startDate: `${o.dataVelorio}T${o.horaInicio}:00-03:00`,
        endDate: `${o.dataVelorio}T${o.horaTermino}:00-03:00`,
        organizer: { "@id": `${SITE.url}/#organizacao` },
        location: {
          "@type": "Place",
          name: `${SITE.nomeCompleto} · ${u.nome}`,
          address: endereco,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(grafo) }}
    />
  );
}
