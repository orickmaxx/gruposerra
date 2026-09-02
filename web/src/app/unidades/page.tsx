import type { Metadata } from "next";
import { ProximaEtapa } from "@/components/proxima-etapa";

export const metadata: Metadata = {
  title: "As 8 unidades",
  description: "Cada unidade com página própria, endereço completo, telefone local, horário e como chegar.",
  alternates: { canonical: "/unidades" },
  openGraph: { title: "As 8 unidades", description: "Cada unidade com página própria, endereço completo, telefone local, horário e como chegar.", url: "/unidades" },
};

export default function Pagina() {
  return (
    <ProximaEtapa
      titulo="As 8 unidades"
      resumo="Cada unidade com página própria, endereço completo, telefone local, horário e como chegar."
      previsto={[
        "Página por unidade em /unidades/[cidade], com schema FuneralHome",
        "Mapa e rota, para quem está indo agora",
        "CEP de cada unidade, que hoje só existe confirmado na matriz",
        "Fotos da fachada, para a pessoa reconhecer o lugar quando chegar",
      ]}
    />
  );
}
