import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { UNIDADES } from "@/data/unidades";
import { ARTIGOS } from "@/data/artigos";
import { PLANOS, PLANOS_ESPECIAIS } from "@/data/planos";

/** O site atual do cliente nao tem sitemap.xml (HTTP 404). Ver CLAUDE.md 9.1. */
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
    { url: "/contato", priority: 0.6 },
    { url: "/privacidade", priority: 0.3 },
    { url: "/termos", priority: 0.3 },
  ];

  return [
    ...fixas.map((f) => ({
      url: `${SITE.url}${f.url}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: f.priority,
    })),
    ...ARTIGOS.map((a) => ({
      url: `${SITE.url}/blog/${a.slug}`,
      lastModified: new Date(a.atualizado),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...[...PLANOS, ...PLANOS_ESPECIAIS].map((p) => ({
      url: `${SITE.url}/planos/${p.slug}`,
      lastModified: agora,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...UNIDADES.map((u) => ({
      url: `${SITE.url}/unidades/${u.slug}`,
      lastModified: agora,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
