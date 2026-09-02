import type { Metadata } from "next";
import { ProximaEtapa } from "@/components/proxima-etapa";

export const metadata: Metadata = {
  title: "Cremação",
  description: "Como funciona o processo no crematório próprio do grupo, o que a família precisa levar e o que decidir sobre as cinzas.",
  alternates: { canonical: "/cremacao" },
  openGraph: { title: "Cremação", description: "Como funciona o processo no crematório próprio do grupo, o que a família precisa levar e o que decidir sobre as cinzas.", url: "/cremacao" },
};

export default function Pagina() {
  return (
    <ProximaEtapa
      titulo="Cremação"
      resumo="Como funciona o processo no crematório próprio do grupo, o que a família precisa levar e o que decidir sobre as cinzas."
      previsto={[
        "O processo etapa por etapa, do velório à entrega das cinzas",
        "Documentos exigidos e a autorização da família, pela Lei Federal 6.015/73",
        "Destino das cinzas: levar para casa, espalhar ou columbário",
        "As posições das religiões, sem opinião da empresa",
        "O Complexo Memorial Hortolândia por dentro, quando houver fotos",
      ]}
    />
  );
}
