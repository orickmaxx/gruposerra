import type { Metadata } from "next";
import { ProximaEtapa } from "@/components/proxima-etapa";

export const metadata: Metadata = {
  title: "Obituário",
  description: "Local e horário do velório e da despedida. Esta página não vende nada: sem pop-up, sem banner, sem oferta.",
  alternates: { canonical: "/obituario" },
  openGraph: { title: "Obituário", description: "Local e horário do velório e da despedida. Esta página não vende nada: sem pop-up, sem banner, sem oferta.", url: "/obituario" },
};

export default function Pagina() {
  return (
    <ProximaEtapa
      titulo="Obituário"
      resumo="Local e horário do velório e da despedida. Esta página não vende nada: sem pop-up, sem banner, sem oferta."
      previsto={[
        "Listagem por data, com busca por nome",
        "Página própria por falecido, com Open Graph próprio: é o que faz o link chegar inteiro no WhatsApp",
        "Início e término da cerimônia, com local e horário",
        "Compartilhar por WhatsApp e deixar uma homenagem",
        "Integração com o sistema que a empresa já usa para publicar",
      ]}
    />
  );
}
