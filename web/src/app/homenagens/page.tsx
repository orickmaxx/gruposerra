import type { Metadata } from "next";
import { ProximaEtapa } from "@/components/proxima-etapa";

export const metadata: Metadata = {
  title: "Homenagens",
  description: "O mural onde a família e os amigos deixam uma mensagem de carinho, com foto, publicada após aprovação.",
  alternates: { canonical: "/homenagens" },
  openGraph: { title: "Homenagens", description: "O mural onde a família e os amigos deixam uma mensagem de carinho, com foto, publicada após aprovação.", url: "/homenagens" },
};

export default function Pagina() {
  return (
    <ProximaEtapa
      titulo="Homenagens"
      resumo="O mural onde a família e os amigos deixam uma mensagem de carinho, com foto, publicada após aprovação."
      previsto={[
        "Mural com foto, mensagem e autoria",
        "Envio com moderação antes de publicar",
        "Busca por nome do homenageado",
        "Compartilhamento por WhatsApp e Facebook",
      ]}
    />
  );
}
