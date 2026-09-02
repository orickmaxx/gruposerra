import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** O site atual do cliente nao tem robots.txt: devolve a pagina 404 do CMS. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
