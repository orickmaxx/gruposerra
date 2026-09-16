import type { MetadataRoute } from "next";
import { URL_SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { ARTIGOS } from "@/data/artigos";
import { PLANOS, PLANOS_ESPECIAIS } from "@/data/planos";
import { OBITUARIOS } from "@/data/obituarios";

/**
 * O site atual do cliente nao tem sitemap.xml (HTTP 404). Ver CLAUDE.md 5.1.
 *
 * ⛔ `URL_SITE`, NAO `SITE.url`. Um sitemap servido de `gruposerra.vercel.app`
 * listando URLs de `www.gruposerra.com.br` esta declarando ao buscador um
 * conjunto de paginas que ele vai buscar no site ANTIGO. Mesma raiz do defeito
 * da previa do WhatsApp: endereco certo, dominio errado. Ver `lib/site.ts`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  const fixas = [
    { url: "/", priority: 1 },
    { url: "/planos", priority: 0.9 },
    { url: "/obituario", priority: 0.9 },
    { url: "/cremacao", priority: 0.8 },
    { url: "/unidades", priority: 0.8 },
    { url: "/homenagens", priority: 0.7 },
    { url: "/serra-pet", priority: 0.6 },
    { url: "/contato", priority: 0.6 },
    { url: "/blog", priority: 0.8 },
    { url: "/privacidade", priority: 0.3 },
    { url: "/termos", priority: 0.3 },
  ];

  return [
    ...fixas.map((f) => ({
      url: `${URL_SITE}${f.url}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: f.priority,
    })),
    ...ARTIGOS.map((a) => ({
      url: `${URL_SITE}/blog/${a.slug}`,
      lastModified: new Date(a.atualizado),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...[...PLANOS, ...PLANOS_ESPECIAIS].map((p) => ({
      url: `${URL_SITE}/planos/${p.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...UNIDADES.map((u) => ({
      url: `${URL_SITE}/unidades/${u.slug}`,
      lastModified: agora,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    /* ⛔ REGISTRO DE DEMONSTRAÇÃO NÃO ENTRA NO SITEMAP. Sitemap é um convite
       explícito ao buscador; convidar o Google para a página de um falecido
       inventado é publicar o registro, não simulá-lo. Hoje o filtro devolve
       lista vazia, e é a resposta certa: quando o sistema real entrar, os
       obituários de verdade passam a aparecer aqui sozinhos. */
    ...OBITUARIOS.filter((o) => !o.ehExemplo).map((o) => ({
      url: `${URL_SITE}/obituario/${o.slug}`,
      lastModified: new Date(`${o.dataFalecimento}T12:00:00`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
