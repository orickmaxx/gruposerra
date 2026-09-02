import type { Metadata } from "next";
import { ProximaEtapa } from "@/components/proxima-etapa";

export const metadata: Metadata = {
  title: "Serra Pet",
  description: "Assistência e cremação para animais, com remoção 24 horas na região de Campinas.",
  alternates: { canonical: "/serra-pet" },
  openGraph: { title: "Serra Pet", description: "Assistência e cremação para animais, com remoção 24 horas na região de Campinas.", url: "/serra-pet" },
};

export default function Pagina() {
  return (
    <ProximaEtapa
      titulo="Serra Pet"
      resumo="Assistência e cremação para animais, com remoção 24 horas na região de Campinas."
      previsto={[
        "Plano Preventivo e plano Emergencial, lado a lado",
        "Cremação individual e coletiva, com a diferença explicada sem rodeio",
        "Urnas cinerárias e pingentes, o catálogo que hoje vive em outro domínio",
        "Unificar serrapet.com.br e pet.gruposerra.com.br num endereço só",
      ]}
    />
  );
}
